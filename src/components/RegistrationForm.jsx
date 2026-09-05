import React, { useState } from 'react';

export function RegistrationForm({ departments, doctors, onRegisterSuccess }) {
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

  const [errors, setErrors] = useState({});

  // Filter doctors based on department selected
  const availableDoctors = doctors.filter(d => d.depCode === formData.departmentCode);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset doctor when department changes
      ...(name === 'departmentCode' ? { doctor: '' } : {})
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePrioritySelect = (priority) => {
    setFormData(prev => ({ ...prev, priority }));
  };

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

    // Auto assign doctor if not chosen
    const selectedDep = departments.find(d => d.code === formData.departmentCode) || departments[0];
    const assignedDoc = formData.doctor || (availableDoctors[0] ? availableDoctors[0].name : selectedDep.doctor);

    onRegisterSuccess({
      ...formData,
      departmentName: selectedDep.name,
      doctor: assignedDoc,
      room: selectedDep.room
    });
  };

  return (
    <div className="registration-section">
      <div className="section-header" style={{ justifyContent: 'center', textAlign: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <h2>📝 Outpatient (OP) Patient Registration</h2>
        <p>Generate your digital OPD consultation token. Fast-track options for seniors and emergencies.</p>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
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

          <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
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
                symptoms: 'Mild palpitation after running, regular checkup',
                priority: 'Regular'
              })}
              title="Auto-fill realistic details for quick testing"
            >
              ⚡ Fill Demo Data
            </button>

            <button type="submit" className="btn btn-primary" style={{ padding: '12px 28px' }}>
              Generate Digital OP Token Slip ▶
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
