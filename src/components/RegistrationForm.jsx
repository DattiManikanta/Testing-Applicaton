import React, { useState, useEffect } from 'react';

export function RegistrationForm({ departments, doctors, onRegisterSuccess }) {
  // Step 1: Demographics, Department & Payment | Step 2: Nursing Triage & Vitals
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

  // Step 1: Payment Information
  const [paymentData, setPaymentData] = useState({
    consultationFee: 700,
    regFee: 100,
    paymentMethod: 'UPI', // 'UPI', 'Cash', 'Card', 'Insurance'
    paymentStatus: 'Paid',
    transactionId: `TXN-${Math.floor(100000 + Math.random() * 900000)}`
  });

  // Step 2: Clinical Vitals Entity
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

  // Auto-sync consultation fee when department or doctor changes
  useEffect(() => {
    const selectedDoc = doctors.find(d => d.name === formData.doctor);
    if (selectedDoc) {
      const parsedFee = parseInt(selectedDoc.fee.replace(/\D/g, ''), 10) || 700;
      setPaymentData(prev => ({ ...prev, consultationFee: parsedFee }));
    } else if (availableDoctors[0]) {
      const parsedFee = parseInt(availableDoctors[0].fee.replace(/\D/g, ''), 10) || 700;
      setPaymentData(prev => ({ ...prev, consultationFee: parsedFee }));
    }
  }, [formData.departmentCode, formData.doctor]);

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

  const handlePaymentMethodSelect = (method) => {
    setPaymentData(prev => ({
      ...prev,
      paymentMethod: method,
      transactionId: `TXN-${Math.floor(100000 + Math.random() * 900000)}`
    }));
  };

  const handleVitalsChange = (e) => {
    const { name, value } = e.target;
    setVitalsData(prev => ({ ...prev, [name]: value }));
  };

  const handlePrioritySelect = (priority) => {
    setFormData(prev => ({ ...prev, priority }));
  };

  // Calculate BMI dynamically
  const calculateBMI = (wt, ht) => {
    const w = parseFloat(wt);
    const h = parseFloat(ht) / 100;
    if (!w || !h || h <= 0) return '23.0 (Normal)';
    const bmiVal = (w / (h * h)).toFixed(1);
    let category = 'Normal';
    if (bmiVal < 18.5) category = 'Underweight';
    else if (bmiVal < 25) category = 'Normal';
    else if (bmiVal < 30) category = 'Overweight';
    else category = 'Obese';
    return `${bmiVal} (${category})`;
  };

  // Quick Vitals Presets
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

  // Validate Step 1 (Registration + Payment)
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

  // Final Submission on Step 2 (Vitals complete -> Print Registration & Vitals Form)
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
      height: `${vitalsData.height} cm`,
      bmi: calculateBMI(vitalsData.weight, vitalsData.height),
      bloodSugar: `${vitalsData.bloodSugar} mg/dL`,
      triageNotes: vitalsData.triageNotes
    };

    const totalAmount = paymentData.consultationFee + paymentData.regFee;

    onRegisterSuccess({
      ...formData,
      departmentName: selectedDep.name,
      doctor: assignedDoc,
      room: selectedDep.room,
      payment: {
        ...paymentData,
        totalAmount: totalAmount
      },
      vitals: formattedVitals
    });
  };

  const totalPayable = paymentData.consultationFee + paymentData.regFee;

  return (
    <div className="registration-section">
      <div className="section-header" style={{ justifyContent: 'center', textAlign: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <h2>📝 Outpatient (OP) Registration, Payment & Vitals Intake</h2>
        <p>Step 1: Patient Details & Payment ➔ Step 2: Clinical Vitals Check ➔ Step 3: Print Form</p>
      </div>

      {/* Stepper Wizard Header */}
      <div style={{ maxWidth: '700px', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
        <div 
          onClick={() => setCurrentStep(1)}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            cursor: 'pointer',
            padding: '8px 18px',
            borderRadius: 'var(--radius-full)',
            background: currentStep === 1 ? 'var(--primary)' : 'var(--emerald-light)',
            color: currentStep === 1 ? 'white' : '#065f46',
            fontWeight: 700,
            fontSize: '0.88rem'
          }}
        >
          <span>{currentStep > 1 ? '✓' : '1'}</span>
          <span>Step 1: Patient Info & Payment</span>
        </div>

        <span style={{ color: 'var(--text-muted)' }}>➔</span>

        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            padding: '8px 18px',
            borderRadius: 'var(--radius-full)',
            background: currentStep === 2 ? 'var(--primary)' : 'var(--bg-alt)',
            color: currentStep === 2 ? 'white' : 'var(--text-muted)',
            border: currentStep === 2 ? 'none' : '1px solid var(--border)',
            fontWeight: 700,
            fontSize: '0.88rem'
          }}
        >
          <span>2</span>
          <span>Step 2: Add Clinical Vitals Entity</span>
        </div>
      </div>

      <div className="form-card">
        {/* ================= STEP 1: PATIENT REGISTRATION & PAYMENT ================= */}
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
                <label className="form-label">Contact Mobile <span className="req">*</span></label>
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
                <label className="form-label">OPD Department <span className="req">*</span></label>
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
                <label className="form-label">Consulting Doctor</label>
                <select
                  name="doctor"
                  className="form-select"
                  value={formData.doctor}
                  onChange={handleChange}
                >
                  <option value="">Any Available Specialist</option>
                  {availableDoctors.map(doc => (
                    <option key={doc.id} value={doc.name}>
                      {doc.name} ({doc.fee})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group full-width">
                <label className="form-label">Chief Complaint / Symptoms</label>
                <input
                  type="text"
                  name="symptoms"
                  className="form-input"
                  placeholder="e.g. Chest tightness, fever, joint pain, general checkup..."
                  value={formData.symptoms}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* ================= PAYMENT BILLING BOX (AT REGISTRATION) ================= */}
            <div style={{ 
              marginTop: '24px', 
              background: '#f8fafc', 
              border: '2px solid #e2e8f0', 
              borderRadius: 'var(--radius-lg)', 
              padding: '20px 24px' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.25rem' }}>💳</span>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark)' }}>
                      OP Consultation Billing & Registration Fee
                    </h3>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Mandatory outpatient registration counter payment.
                    </p>
                  </div>
                </div>
                <span style={{ 
                  background: 'var(--emerald-light)', 
                  color: '#065f46', 
                  padding: '3px 10px', 
                  borderRadius: 'var(--radius-full)', 
                  fontSize: '0.76rem', 
                  fontWeight: 800 
                }}>
                  READY FOR COLLECTION
                </span>
              </div>

              {/* Fee Breakdown */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '16px', background: 'white', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>Doctor Consultation Fee:</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--dark)' }}>₹{paymentData.consultationFee}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>One-Time OP Registration Card:</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--dark)' }}>₹{paymentData.regFee}</div>
                </div>
                <div style={{ borderLeft: '2px solid var(--border)', paddingLeft: '14px' }}>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 700 }}>TOTAL AMOUNT PAYABLE:</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary)' }}>₹{totalPayable}</div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>
                  Select Counter Payment Method:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                  <div 
                    className={`priority-btn ${paymentData.paymentMethod === 'UPI' ? 'active' : ''}`}
                    onClick={() => handlePaymentMethodSelect('UPI')}
                  >
                    📱 UPI / QR (GPay)
                  </div>
                  <div 
                    className={`priority-btn ${paymentData.paymentMethod === 'Cash' ? 'active' : ''}`}
                    onClick={() => handlePaymentMethodSelect('Cash')}
                  >
                    💵 Cash Counter
                  </div>
                  <div 
                    className={`priority-btn ${paymentData.paymentMethod === 'Card' ? 'active' : ''}`}
                    onClick={() => handlePaymentMethodSelect('Card')}
                  >
                    💳 Debit / Credit Card
                  </div>
                  <div 
                    className={`priority-btn ${paymentData.paymentMethod === 'Insurance' ? 'active' : ''}`}
                    onClick={() => handlePaymentMethodSelect('Insurance')}
                  >
                    🛡️ TPA Insurance
                  </div>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '8px' }}>
                  Receipt Ref: <strong>{paymentData.transactionId}</strong> • Status: <strong style={{ color: '#059669' }}>Payment Verified & Settled ✓</strong>
                </div>
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

              <button type="submit" className="btn btn-primary" style={{ padding: '13px 30px', fontSize: '0.96rem' }}>
                Collect Payment (₹{totalPayable}) & Proceed to Vitals Entry (Step 2) ▶
              </button>
            </div>
          </form>
        )}

        {/* ================= STEP 2: CLINICAL VITALS ENTITY ================= */}
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
                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Patient Registration & Payment Confirmed:
                </span>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark)' }}>
                  {formData.patientName} ({formData.age} Yrs / {formData.gender})
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>
                  Dept: {departments.find(d => d.code === formData.departmentCode)?.name} • Doctor: {formData.doctor || 'Assigned'}
                </div>
              </div>

              {/* Payment Summary Tag */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ background: '#dcfce7', color: '#15803d', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontWeight: 800, fontSize: '0.82rem' }}>
                  PAID: ₹{totalPayable} via {paymentData.paymentMethod} ✓
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Ref: {paymentData.transactionId}
                </div>
              </div>
            </div>

            {/* Quick Vitals Presets Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>🩺</span> Nursing Triage Station — Add Clinical Vitals Entity
              </h3>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>QUICK PRESET:</span>
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
                  placeholder="e.g. Patient conscious, oriented. No acute respiratory distress."
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
                ◀ Back to Step 1 (Edit Registration / Payment)
              </button>

              <button type="submit" className="btn btn-emerald" style={{ padding: '13px 32px', fontSize: '0.96rem' }}>
                🖨️ Complete & Print Registration + Vitals Form ▶
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
