import React, { useState } from 'react';
import { initialDepartments, doctorsRoster, mockOPRecords } from './data/hospitalData.js';
import { playHospitalChime } from './utils/audio.js';
import { Navbar } from './components/Navbar.jsx';
import { HeroSection } from './components/HeroSection.jsx';
import { QueueBoard } from './components/QueueBoard.jsx';
import { RegistrationForm } from './components/RegistrationForm.jsx';
import { TokenSlip } from './components/TokenSlip.jsx';
import { DoctorDirectory } from './components/DoctorDirectory.jsx';
import { PatientPortal } from './components/PatientPortal.jsx';
import { StaffDashboard } from './components/StaffDashboard.jsx';
import { Footer } from './components/Footer.jsx';

export function App() {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'queue', 'register', 'slip', 'doctors', 'records', 'staff'
  const [departments, setDepartments] = useState(initialDepartments);
  const [doctors] = useState(doctorsRoster);
  const [records, setRecords] = useState(mockOPRecords);
  const [activeAlertToken, setActiveAlertToken] = useState(null);
  const [lastGeneratedToken, setLastGeneratedToken] = useState(null);
  const [tokenCounter, setTokenCounter] = useState(120);

  // Calculate total waiting patients across all departments
  const waitingTotal = departments.reduce((sum, dep) => sum + dep.queue.length, 0);

  // Call Next Patient in a department cabin
  const handleCallNext = (depId) => {
    setDepartments(prevDeps => {
      return prevDeps.map(dep => {
        if (dep.id !== depId) return dep;
        if (dep.queue.length === 0) return dep;

        const [calledPatient, ...remainingQueue] = dep.queue;
        const newNextToken = remainingQueue.length > 0 ? remainingQueue[0].token : 'None';

        // Play authentic hospital chime sound
        playHospitalChime();

        // Set alert announcement banner
        setActiveAlertToken({
          token: calledPatient.token,
          patient: calledPatient.patientName,
          room: dep.room,
          depCode: dep.code,
          department: dep.name
        });

        // Clear announcement after 7 seconds
        setTimeout(() => {
          setActiveAlertToken(null);
        }, 7000);

        return {
          ...dep,
          currentToken: calledPatient.token,
          nextToken: newNextToken,
          queue: remainingQueue,
          status: 'In Consultation',
          statusColor: 'emerald'
        };
      });
    });
  };

  // Add new Outpatient registration & generate token
  const handleRegisterSuccess = (formData) => {
    const nextNum = tokenCounter + 1;
    setTokenCounter(nextNum);

    const generatedToken = `${formData.departmentCode}-${String(nextNum).padStart(3, '0')}`;
    const generatedOpId = `OP-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newQueueItem = {
      token: generatedToken,
      patientName: formData.patientName,
      status: 'Waiting',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      priority: formData.priority
    };

    // Place patient in queue (urgent/seniors get moved towards front)
    setDepartments(prev => prev.map(dep => {
      if (dep.code === formData.departmentCode) {
        let updatedQueue;
        if (formData.priority === 'Emergency') {
          updatedQueue = [newQueueItem, ...dep.queue];
        } else if (formData.priority === 'Senior Citizen' && dep.queue.length > 1) {
          updatedQueue = [dep.queue[0], newQueueItem, ...dep.queue.slice(1)];
        } else {
          updatedQueue = [...dep.queue, newQueueItem];
        }
        return {
          ...dep,
          queue: updatedQueue,
          nextToken: dep.queue.length === 0 ? generatedToken : dep.nextToken
        };
      }
      return dep;
    }));

    // Create a new patient OP medical record entry in records
    const newRecord = {
      token: generatedToken,
      opId: generatedOpId,
      patientName: formData.patientName,
      age: Number(formData.age),
      gender: formData.gender,
      phone: formData.phone,
      bloodGroup: formData.bloodGroup,
      department: formData.departmentName,
      doctor: formData.doctor,
      room: formData.room,
      visitDate: '05-Sep-2026',
      visitType: formData.priority === 'Emergency' ? 'Emergency Outpatient' : 'OPD Consultation',
      vitals: {
        bp: '122/82 mmHg',
        pulse: '74 bpm',
        spo2: '99%',
        temp: '98.6 °F',
        weight: '65 kg',
        bmi: '22.8 (Normal)'
      },
      symptoms: formData.symptoms || 'General Outpatient checkup and clinical evaluation.',
      diagnosis: 'Clinical Consultation in Progress (Initial OP Intake)',
      prescription: [
        { medicine: 'Multivitamin & Zinc Tab', timing: '1 - 0 - 0', instruction: 'Once daily after breakfast', duration: '15 Days' },
        { medicine: 'Hydration Oral Salts (ORS)', timing: 'As Needed', instruction: 'Dissolve in 1L fresh drinking water', duration: '3 Days' }
      ],
      recommendedTests: [
        { testName: 'Standard Vitals & Screening', status: 'Completed at Triage Desk' },
        { testName: 'Consultant Clinical Examination', status: 'In Waiting Queue' }
      ],
      doctorNotes: 'Patient registered at Outpatient Desk. Vitals stable. Awaiting specialist examination in cabin.'
    };

    setRecords(prev => ({
      ...prev,
      [generatedToken]: newRecord
    }));

    const tokenReceiptData = {
      ...formData,
      token: generatedToken,
      opId: generatedOpId,
      estimatedTime: formData.priority === 'Emergency' ? 'Immediate Fast-Track' : '15-20 Mins'
    };

    setLastGeneratedToken(tokenReceiptData);
    setActiveTab('slip');
  };

  // Add Fast-Track Urgent triage patient from staff console
  const handleAddUrgentPatient = (depId) => {
    const dep = departments.find(d => d.id === depId);
    if (!dep) return;

    const nextNum = tokenCounter + 1;
    setTokenCounter(nextNum);
    const emergencyToken = `${dep.code}-EMG-${nextNum}`;

    const emergencyPatient = {
      token: emergencyToken,
      patientName: 'Priority Walk-in (Triage)',
      status: 'Urgent',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      priority: 'Emergency'
    };

    setDepartments(prev => prev.map(d => {
      if (d.id === depId) {
        return {
          ...d,
          queue: [emergencyPatient, ...d.queue],
          nextToken: emergencyToken
        };
      }
      return d;
    }));

    alert(`Emergency triage token ${emergencyToken} inserted to the front of ${dep.name} queue.`);
  };

  // Reset demo queues
  const handleResetDemo = () => {
    setDepartments(initialDepartments);
    alert('OPD queues have been reset to demo baseline.');
  };

  // Pre-select doctor when clicking "Book OP Token" from doctor card
  const handleSelectDoctorForBooking = (doc) => {
    setActiveTab('register');
  };

  return (
    <div className="app-wrapper">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onOpenRegister={() => setActiveTab('register')}
        waitingTotal={waitingTotal}
      />

      {/* Hero only on overview */}
      {activeTab === 'overview' && (
        <HeroSection 
          setActiveTab={setActiveTab}
          onOpenRegister={() => setActiveTab('register')}
          waitingTotal={waitingTotal}
          activeDoctorsCount={doctors.length}
        />
      )}

      <main className="main-content">
        {/* Overview Tab shows Queue Board preview + Doctor highlights */}
        {activeTab === 'overview' && (
          <div>
            <QueueBoard 
              departments={departments}
              onCallNext={handleCallNext}
              activeAlertToken={activeAlertToken}
              onPlayChime={playHospitalChime}
            />

            <div style={{ marginTop: '48px' }}>
              <div className="section-header">
                <div>
                  <h2>👨‍⚕️ Today's Available OPD Specialists</h2>
                  <p>Our senior doctors are on duty across consulting cabins today.</p>
                </div>
                <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('doctors')}>
                  View Full Doctor Directory & Hours ▶
                </button>
              </div>

              <DoctorDirectory 
                doctors={doctors.slice(0, 3)} 
                onSelectDoctorForBooking={handleSelectDoctorForBooking}
              />
            </div>
          </div>
        )}

        {/* Live Queue Board Tab */}
        {activeTab === 'queue' && (
          <QueueBoard 
            departments={departments}
            onCallNext={handleCallNext}
            activeAlertToken={activeAlertToken}
            onPlayChime={playHospitalChime}
          />
        )}

        {/* Registration Form Tab */}
        {activeTab === 'register' && (
          <RegistrationForm 
            departments={departments}
            doctors={doctors}
            onRegisterSuccess={handleRegisterSuccess}
          />
        )}

        {/* Generated Token Slip Tab */}
        {activeTab === 'slip' && (
          <TokenSlip 
            tokenData={lastGeneratedToken}
            onBackToQueue={() => setActiveTab('queue')}
            onNewRegistration={() => setActiveTab('register')}
          />
        )}

        {/* Doctor Directory Tab */}
        {activeTab === 'doctors' && (
          <DoctorDirectory 
            doctors={doctors}
            onSelectDoctorForBooking={handleSelectDoctorForBooking}
          />
        )}

        {/* Patient OP Records & E-Prescription Tab */}
        {activeTab === 'records' && (
          <PatientPortal 
            records={records}
            initialToken={lastGeneratedToken ? lastGeneratedToken.token : 'CAR-104'}
          />
        )}

        {/* OPD Desk / Staff Controller Tab */}
        {activeTab === 'staff' && (
          <StaffDashboard 
            departments={departments}
            onCallNext={handleCallNext}
            onAddUrgentPatient={handleAddUrgentPatient}
            onResetDemo={handleResetDemo}
          />
        )}
      </main>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
