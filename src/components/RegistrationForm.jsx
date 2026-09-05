import React, { useState, useEffect } from 'react';

export function RegistrationForm({ departments, doctors, onRegisterSuccess, onGoToVitals }) {
  // Patient Information
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

  // Payment Information (Registration Time Payment Only)
  const [paymentData, setPaymentData] = useState({
    consultationFee: 700,
    regFee: 100,
    paymentMethod: 'UPI', // 'UPI', 'Cash', 'Card', 'Insurance'
    paymentStatus: 'Paid',
    transactionId: `TXN-${Math.floor(100000 + Math.random() * 900000)}`
  });

  const [errors, setErrors] = useState({});

  // Filter doctors based on department selected
  const availableDoctors = doctors.filter(d => d.depCode === formData.departmentCode);

  // Auto-sync consultation fee when doctor changes
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

  const handlePrioritySelect = (priority) => {
    setFormData(prev => ({ ...prev, priority }));
  };

  // Handle Registration & Payment Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.patientName.trim()) newErrors.patientName = 'Patient full name is required';
    if (!formData.age || formData.age <= 0 || formData.age > 120) newErrors.age = 'Please enter a valid age';
    if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = 'Valid 10-digit phone number is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const selectedDep = departments.find(d => d.code === formData.departmentCode) || departments[0];
    const assignedDoc = formData.doctor || (availableDoctors[0] ? availableDoctors[0].name : selectedDep.doctor);
    const totalAmount = paymentData.consultationFee + paymentData.regFee;

    onRegisterSuccess({
      ...formData,
      departmentName: selectedDep.name,
      doctor: assignedDoc,
      room: selectedDep.room,
      payment: {
        ...paymentData,
        totalAmount: totalAmount
      }
    });
  };

  const totalPayable = paymentData.consultationFee + paymentData.regFee;

  return (
    <div className="registration-section">
      <div className="section-header" style={{ justifyContent: 'center', textAlign: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <h2>📝 Outpatient (OP) Patient Registration & Counter Payment</h2>
        <p>Register new outpatient and complete consultation billing payment. (Vitals recorded separately at Nursing Triage)</p>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          {/* Priority Class */}
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
              <label className="form-label">Contact Mobile Number <span className="req">*</span></label>
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
                placeholder="e.g. Chest discomfort, recurrent fever, knee joint pain..."
                value={formData.symptoms}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* ================= PAYMENT BILLING BOX (REGISTRATION TIME ONLY) ================= */}
          <div style={{ 
            marginTop: '24px', 
            background: '#f8fafc', 
            border: '2px solid #e2e8f0', 
            borderRadius: 'var(--radius-lg)', 
            padding: '22px 24px' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.3rem' }}>💳</span>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark)' }}>
                    Registration Counter Billing & Fee Collection
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Registration fee & Doctor consultation charge.
                  </p>
                </div>
              </div>
              <span style={{ 
                background: '#dcfce7', 
                color: '#15803d', 
                padding: '4px 12px', 
                borderRadius: 'var(--radius-full)', 
                fontSize: '0.76rem', 
                fontWeight: 800 
              }}>
                COUNTER PAYMENT REQUIRED
              </span>
            </div>

            {/* Fee Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '16px', background: 'white', padding: '14px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>Doctor Consultation Fee:</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--dark)' }}>₹{paymentData.consultationFee}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>Hospital OP Registration Card:</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--dark)' }}>₹{paymentData.regFee}</div>
              </div>
              <div style={{ borderLeft: '2px solid var(--border)', paddingLeft: '14px' }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 700 }}>TOTAL AMOUNT TO PAY:</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary)' }}>₹{totalPayable}</div>
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
                  💵 Cash at Counter
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
              <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '8px' }}>
                Receipt Ref: <strong>{paymentData.transactionId}</strong> • Status: <strong style={{ color: '#059669' }}>Counter Payment Collected & Settled ✓</strong>
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
                symptoms: 'Mild chest tightness upon climbing stairs',
                priority: 'Regular'
              })}
            >
              ⚡ Fill Demo Patient
            </button>

            <button type="submit" className="btn btn-primary" style={{ padding: '13px 32px', fontSize: '0.98rem' }}>
              ✓ Complete Registration & Collect Payment (₹{totalPayable}) ▶
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
