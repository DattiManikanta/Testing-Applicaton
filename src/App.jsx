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
import { VitalsScreen } from './components/VitalsScreen.jsx';
import { PharmacyScreen } from './components/PharmacyScreen.jsx';
import { StaffDashboard } from './components/StaffDashboard.jsx';
import { Footer } from './components/Footer.jsx';
import { LoginPage } from './components/LoginPage.jsx';
import { HIMSHomeDashboard } from './components/HIMSHomeDashboard.jsx';

export function App() {
  // Authentication State: null means show starting Login Screen
  const [currentUser, setCurrentUser] = useState(null);

  // Active module: defaults to 'hims_home' right after login!
  const [activeTab, setActiveTab] = useState('hims_home');
  const [departments, setDepartments] = useState(initialDepartments);
  const [doctors] = useState(doctorsRoster);
  const [records, setRecords] = useState(mockOPRecords);
  const [activeAlertToken, setActiveAlertToken] = useState(null);
  const [lastGeneratedToken, setLastGeneratedToken] = useState(null);
  const [tokenCounter, setTokenCounter] = useState(120);

  // Authentication Handlers
  const handleLogin = (user) => {
    setCurrentUser(user);
    setActiveTab('hims_home'); // Directly show the ATRI HIMS Tile Dashboard after login!
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('hims_home');
  };

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

    setDepartments(prevDeps => prevDeps.map(dep => {
      if (dep.code === formData.departmentCode) {
        return {
          ...dep,
          queue: [...dep.queue, newQueueItem],
          nextToken: dep.nextToken === 'None' ? generatedToken : dep.nextToken
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
      payment: formData.payment,
      visitDate: '07-Oct-2026',
      visitType: formData.priority === 'Emergency' ? 'Emergency Outpatient' : 'OPD Consultation',
      vitals: formData.vitals || {
        bp: '122/82 mmHg',
        pulse: '74 bpm',
        spo2: '99%',
        temp: '98.6 °F',
        weight: '65 kg',
        bmi: '22.8 (Normal)',
        bloodSugar: '110 mg/dL'
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
      doctorNotes: `Patient registered at Outpatient Desk. Vitals recorded: BP ${formData.vitals ? formData.vitals.bp : '120/80'}, SpO2 ${formData.vitals ? formData.vitals.spo2 : '99%'}. Paid ₹${formData.payment ? formData.payment.totalAmount : 800} via ${formData.payment ? formData.payment.paymentMethod : 'UPI'}. Awaiting examination.`
    };

    setRecords(prev => ({
      ...prev,
      [generatedToken]: newRecord
    }));

    const tokenReceiptData = {
      ...formData,
      payment: formData.payment,
      vitals: formData.vitals,
      token: generatedToken,
      opId: generatedOpId,
      estimatedTime: formData.priority === 'Emergency' ? 'Immediate Fast-Track' : '15-20 Mins'
    };

    setLastGeneratedToken(tokenReceiptData);
    setActiveTab('slip');
  };

  // Save vitals from separate Vitals Station module
  const handleSaveVitals = (token, vitalsData) => {
    setRecords(prev => {
      const patient = prev[token];
      if (!patient) return prev;
      return {
        ...prev,
        [token]: {
          ...patient,
          vitals: vitalsData,
          vitalsRecorded: true
        }
      };
    });
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

  // 1. If user is NOT logged in: Show the exact ATRI HIMS starting Login Screen!
  if (!currentUser) {
    return (
      <LoginPage 
        onLogin={handleLogin} 
      />
    );
  }

  // 2. Right after login: Show the exact ATRI HIMS Tile Dashboard!
  if (activeTab === 'hims_home') {
    return (
      <HIMSHomeDashboard 
        onSelectModule={(tab) => setActiveTab(tab)} 
        onLogout={handleLogout} 
      />
    );
  }

  // 3. Inside any hospital module: Show Navbar with "HIMS Home Tiles" button to easily return anytime!
  return (
    <div className="app-wrapper">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onOpenRegister={() => setActiveTab('register')}
        waitingTotal={waitingTotal}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <main className="main-content">
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
            onGoToVitals={() => setActiveTab('vitals')}
          />
        )}

        {/* Dedicated Nursing Triage & Vitals Station Module */}
        {activeTab === 'vitals' && (
          <VitalsScreen 
            records={records}
            onSaveVitals={handleSaveVitals}
            initialToken={lastGeneratedToken ? lastGeneratedToken.token : 'CAR-104'}
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

        {/* Pharmacy & Drug Dispensary Tab */}
        {activeTab === 'pharmacy' && (
          <PharmacyScreen 
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
