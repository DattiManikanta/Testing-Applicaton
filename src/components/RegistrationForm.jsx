import React, { useState } from 'react';

export function RegistrationForm({ departments, doctors, onRegisterSuccess }) {
  // Step 1: Demographics & Department | Step 2: Nursing Triage & Vitals
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Patient Information
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: 'Male',
    phone: '',
    bloodGroup: 'B+',
    departmentCode: 'CAR',
    doctor: '',
    symptoms: '',
    priority: 'Regular'
  });

  // Step 2: Clinical Vitals & Triage
  const [vitalsData, setVitalsData] = useState({
    bpSystolic: '120',
    bpDiastolic: '80',
    pulse: '74',
    spo2: '99',
    temp: '98.6',
    weight: '68',
    height: '172',
    bloodSugar: '110',
    triageNotes: 'Patient conscious, alert and oriented. Normal breathing on room air.'
  });

  const [errors, setErrors] = useState({});

  // Filter doctors based on department selected
  const availableDoctors = doctors.filter(d => d.depCode === formData.departmentCode);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'departmentCode' ? { doctor: '' } : {})
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleVitalsChange = (e) => {
    const { name, value } = e.target;
    setVitalsData(prev => ({ ...prev, [name]: value }));
  };

  const handlePrioritySelect = (priority) => {
    setFormData(prev => ({ ...prev, priority }));
  };

  // Calculate BMI dynamically from height & weight
  const calculateBMI = (wt, ht) => {
    const w = parseFloat(wt);
    const h = parseFloat(ht) / 100; // cm to meters
    if (!w || !h || h <= 0) return '22.8 (Normal)';
    const bmiVal = (w / (h * h)).toFixed(1);
    let category = 'Normal';
    if (bmiVal < 18.5) category = 'Underweight';
    else if (bmiVal < 25) category = 'Normal';
    else if (bmiVal < 30) category = 'Overweight';
    else category = 'Obese';
    return `${bmiVal} (${category})`;
  };

  // Quick Vitals Presets for Demo
  const applyVitalsPreset = (preset) => {
    if (preset === 'normal') {
      setVitalsData({
        bpSystolic: '120',
        bpDiastolic: '80',
        pulse: '74',
        spo2: '99',
        temp: '98.6',
        weight: '68',
        height: '172',
        bloodSugar: '110',
        triageNotes: 'Vitals stable and within normal adult clinical limits.'
      });
    } else if (preset === 'hypertension') {
      setVitalsData({
        bpSystolic: '152',
        bpDiastolic: '94',
        pulse: '84',
        spo2: '98',
        temp: '98.4',
        weight: '78',
        height: '170',
        bloodSugar: '145',
        triageNotes: 'Elevated blood pressure observed. Patient alerted for cardiology evaluation.'
      });
    } else if (preset === 'fever') {
      setVitalsData({
        bpSystolic: '118',
        bpDiastolic: '78',
        pulse: '98',
        spo2: '97',
        temp: '101.4',
        weight: '62',
        height: '168',
        bloodSugar: '105',
        triageNotes: 'Febrile patient with mild tachycardia. Expedited to consultation.'
      });
    }
  };

  // Validate Step 1
  const handleProceedToVitals = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.patientName.trim()) newErrors.patientName = 'Patient full name is required';
    if (!formData.age || formData.age <= 0 || formData.age > 120) newErrors.age = 'Please enter a valid age';
    if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = 'Valid 10-digit phone number is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setCurrentStep(2);
  };

  // Final Submission on Step 2
  const handleFinalSubmit = (e) => {
    e.preventDefault();
    const selectedDep = departments.find(d => d.code === formData.departmentCode) || departments[0];
    const assignedDoc = formData.doctor || (availableDoctors[0] ? availableDoctors[0].name : selectedDep.doctor);

    const formattedVitals = {
      bp: `${vitalsData.bpSystolic}/${vitalsData.bpDiastolic} mmHg`,
      pulse: `${vitalsData.pulse} bpm`,
      spo2: `${vitalsData.spo2}%`,
      temp: `${vitalsData.temp} °F`,
      weight: `${vitalsData.weight} kg`,
      bmi: calculateBMI(vitalsData.weight, vitalsData.height),
      bloodSugar: `${vitalsData.bloodSugar} mg/dL`,
      triageNotes: vitalsData.triageNotes
    };

    onRegisterSuccess({
      ...formData,
      departmentName: selectedDep.name,
      doctor: assignedDoc,
      room: selectedDep.room,
      vitals: formattedVitals
    });
  };

  return (
    <div className="registration-section">
      <div className="section-header" style={{ justifyContent: 'center', textAlign: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <h2>📝 Outpatient (OP) Intake & Nursing Triage</h2>
        <p>2-Step OPD Registration: Patient Intake followed by Clinical Vitals Check.</p>
      </div>

      {/* Stepper Wizard Indicator */}
      <div style={{ maxWidth: '650px', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        <div 
          onClick={() => setCurrentStep(1)}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            cursor: 'pointer',
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            background: currentStep === 1 ? 'var(--primary)' : 'var(--emerald-light)',
            color: currentStep === 1 ? 'white' : '#065f46',
            fontWeight: 700,
            fontSize: '0.88rem'
          }}
        >
          <span>{currentStep > 1 ? '✓' : '1'}</span>
          <span>Step 1: Patient Registration</span>
        </div>

        <span style={{ color: 'var(--text-muted)' }}>➔</span>

        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            background: currentStep === 2 ? 'var(--primary)' : 'var(--bg-alt)',
            color: currentStep === 2 ? 'white' : 'var(--text-muted)',
            border: currentStep === 2 ? 'none' : '1px solid var(--border)',
            fontWeight: 700,
            fontSize: '0.88rem'
          }}
        >
          <span>2</span>
          <span>Step 2: Clinical Vitals & Triage</span>
        </div>
      </div>

      <div className="form-card">
        {/* ================= STEP 1: PATIENT DEMOGRAPHICS ================= */}
        {currentStep === 1 && (
          <form onSubmit={handleProceedToVitals}>
            {/* Priority Tier Switcher */}
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label">Consultation Priority Class</label>
              <div className="priority-options">
                <div 
                  className={`priority-btn ${formData.priority === 'Regular' ? 'active' : ''}`}
                  onClick={() => handlePrioritySelect('Regular')}
                >
                  🩺 Standard OP Consultation
                </div>
                <div 
                  className={`priority-btn ${formData.priority === 'Senior Citizen' ? 'active' : ''}`}
                  onClick={() => handlePrioritySelect('Senior Citizen')}
                >
                  👴 Senior Citizen (Fast-Track)
                </div>
                <div 
                  className={`priority-btn urgent ${formData.priority === 'Emergency' ? 'active' : ''}`}
                  onClick={() => handlePrioritySelect('Emergency')}
                >
                  🚨 Acute / Triage Urgent
                </div>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Patient Full Name <span className="req">*</span></label>
                <input
                  type="text"
                  name="patientName"
                  className="form-input"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.patientName}
                  onChange={handleChange}
                />
                {errors.patientName && <span style={{ color: 'var(--rose)', fontSize: '0.78rem' }}>{errors.patientName}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Age & Gender <span className="req">*</span></label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <input
                    type="number"
                    name="age"
                    className="form-input"
                    placeholder="Age (e.g. 34)"
                    value={formData.age}
                    onChange={handleChange}
                  />
                  <select
                    name="gender"
                    className="form-select"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {errors.age && <span style={{ color: 'var(--rose)', fontSize: '0.78rem' }}>{errors.age}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Contact Number <span className="req">*</span></label>
                <input
                  type="tel"
                  name="phone"
                  className="form-input"
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <span style={{ color: 'var(--rose)', fontSize: '0.78rem' }}>{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Blood Group</label>
                <select
                  name="bloodGroup"
                  className="form-select"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                >
                  <option value="A+">A +ve</option>
                  <option value="A-">A -ve</option>
                  <option value="B+">B +ve</option>
                  <option value="B-">B -ve</option>
                  <option value="O+">O +ve</option>
                  <option value="O-">O -ve</option>
                  <option value="AB+">AB +ve</option>
                  <option value="AB-">AB -ve</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Select OPD Department <span className="req">*</span></label>
                <select
                  name="departmentCode"
                  className="form-select"
                  value={formData.departmentCode}
                  onChange={handleChange}
                >
                  {departments.map(d => (
                    <option key={d.id} value={d.code}>
                      {d.name} ({d.room})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Consulting Doctor (Optional)</label>
                <select
                  name="doctor"
                  className="form-select"
                  value={formData.doctor}
                  onChange={handleChange}
                >
                  <option value="">Any Available Specialist</option>
                  {availableDoctors.map(doc => (
                    <option key={doc.id} value={doc.name}>
                      {doc.name} - {doc.degrees.split(',')[0]} ({doc.fee})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group full-width">
                <label className="form-label">Chief Complaint / Symptoms</label>
                <textarea
                  name="symptoms"
                  className="form-textarea"
                  placeholder="Briefly describe symptoms (e.g. Chest tightness, joint pain, fever, cough since 2 days)..."
                  value={formData.symptoms}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => setFormData({
                  patientName: 'Kunal Kapoor',
                  age: '38',
                  gender: 'Male',
                  phone: '9845012345',
                  bloodGroup: 'O+',
                  departmentCode: 'CAR',
                  doctor: 'Dr. Ananya Iyer',
                  symptoms: 'Mild palpitation after running, routine heart checkup',
                  priority: 'Regular'
                })}
              >
                ⚡ Fill Demo Patient
              </button>

              <button type="submit" className="btn btn-primary" style={{ padding: '12px 28px' }}>
                Proceed to Vitals Check (Step 2) ▶
              </button>
            </div>
          </form>
        )}

        {/* ================= STEP 2: CLINICAL VITALS RECORDING ================= */}
        {currentStep === 2 && (
          <form onSubmit={handleFinalSubmit}>
            {/* Patient Header Summary Bar */}
            <div style={{ 
              background: 'var(--bg-alt)', 
              border: '1px solid var(--border)', 
              borderRadius: 'var(--radius-md)', 
              padding: '14px 18px', 
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Active Patient:
                </span>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark)' }}>
                  {formData.patientName} ({formData.age} Yrs / {formData.gender})
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>
                  Dept: {departments.find(d => d.code === formData.departmentCode)?.name} • Priority: {formData.priority}
                </div>
              </div>

              {/* Quick Vitals Presets */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px' }}>
                  QUICK VITALS PRESETS:
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => applyVitalsPreset('normal')} style={{ fontSize: '0.74rem', padding: '4px 8px' }}>
                    Normal
                  </button>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => applyVitalsPreset('hypertension')} style={{ fontSize: '0.74rem', padding: '4px 8px', color: '#b91c1c' }}>
                    High BP
                  </button>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => applyVitalsPreset('fever')} style={{ fontSize: '0.74rem', padding: '4px 8px', color: '#d97706' }}>
                    Fever
                  </button>
                </div>
              </div>
            </div>

            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🩺</span> Triage Nurse Station — Clinical Vitals Measurement
            </h3>

            <div className="form-grid">
              {/* Blood Pressure */}
              <div className="form-group">
                <label className="form-label">
                  Blood Pressure (Systolic / Diastolic)
                  <span style={{ color: '#059669', fontSize: '0.75rem', fontWeight: 600, marginLeft: '6px' }}>Target: 120/80</span>
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <input
                    type="number"
                    name="bpSystolic"
                    className="form-input"
                    placeholder="Sys (e.g. 120)"
                    value={vitalsData.bpSystolic}
                    onChange={handleVitalsChange}
                  />
                  <input
                    type="number"
                    name="bpDiastolic"
                    className="form-input"
                    placeholder="Dia (e.g. 80)"
                    value={vitalsData.bpDiastolic}
                    onChange={handleVitalsChange}
                  />
                </div>
              </div>

              {/* Heart Rate / Pulse */}
              <div className="form-group">
                <label className="form-label">
                  Pulse / Heart Rate (bpm)
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginLeft: '6px' }}>Normal: 60-100</span>
                </label>
                <input
                  type="number"
                  name="pulse"
                  className="form-input"
                  placeholder="e.g. 74"
                  value={vitalsData.pulse}
                  onChange={handleVitalsChange}
                />
              </div>

              {/* Oxygen Saturation SpO2 */}
              <div className="form-group">
                <label className="form-label">
                  Oxygen Saturation SpO2 (%)
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginLeft: '6px' }}>Normal: 95-100%</span>
                </label>
                <input
                  type="number"
                  name="spo2"
                  className="form-input"
                  placeholder="e.g. 99"
                  value={vitalsData.spo2}
                  onChange={handleVitalsChange}
                />
              </div>

              {/* Body Temperature */}
              <div className="form-group">
                <label className="form-label">
                  Body Temperature (°F)
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginLeft: '6px' }}>Normal: 98.4 - 98.6°F</span>
                </label>
                <input
                  type="text"
                  name="temp"
                  className="form-input"
                  placeholder="e.g. 98.6"
                  value={vitalsData.temp}
                  onChange={handleVitalsChange}
                />
              </div>

              {/* Weight & Height with BMI Auto-Calculation */}
              <div className="form-group">
                <label className="form-label">
                  Weight (kg) & Height (cm)
                  <span style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 700, marginLeft: '6px' }}>
                    BMI: {calculateBMI(vitalsData.weight, vitalsData.height)}
                  </span>
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <input
                    type="number"
                    name="weight"
                    className="form-input"
                    placeholder="Weight (kg)"
                    value={vitalsData.weight}
                    onChange={handleVitalsChange}
                  />
                  <input
                    type="number"
                    name="height"
                    className="form-input"
                    placeholder="Height (cm)"
                    value={vitalsData.height}
                    onChange={handleVitalsChange}
                  />
                </div>
              </div>

              {/* Blood Sugar */}
              <div className="form-group">
                <label className="form-label">
                  Random Blood Sugar RBS (mg/dL)
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginLeft: '6px' }}>Target: &lt; 140</span>
                </label>
                <input
                  type="number"
                  name="bloodSugar"
                  className="form-input"
                  placeholder="e.g. 110"
                  value={vitalsData.bloodSugar}
                  onChange={handleVitalsChange}
                />
              </div>

              {/* Triage Nurse Notes */}
              <div className="form-group full-width">
                <label className="form-label">Nursing Triage Assessment Notes</label>
                <input
                  type="text"
                  name="triageNotes"
                  className="form-input"
                  placeholder="e.g. Patient conscious, oriented. No respiratory distress."
                  value={vitalsData.triageNotes}
                  onChange={handleVitalsChange}
                />
              </div>
            </div>

            <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => setCurrentStep(1)}
              >
                ◀ Back to Step 1 (Patient Info)
              </button>

              <button type="submit" className="btn btn-primary" style={{ padding: '12px 30px' }}>
                ✓ Complete Registration & Generate Token Slip ▶
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
