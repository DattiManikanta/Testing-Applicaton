import React from 'react';

export function TokenSlip({ tokenData, onBackToQueue, onNewRegistration }) {
  if (!tokenData) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="token-slip-wrapper">
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <span style={{ 
          background: 'var(--emerald-light)', 
          color: '#065f46', 
          padding: '6px 16px', 
          borderRadius: 'var(--radius-full)', 
          fontWeight: 700, 
          fontSize: '0.85rem' 
        }}>
          ✓ Registration Completed Successfully
        </span>
      </div>

      <div className="token-slip-container" id="printable-slip">
        {/* Slip Header */}
        <div className="token-slip-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '4px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              <path d="M12 5v14"/>
              <path d="M5 12h14"/>
            </svg>
            <h3 className="slip-hospital-title">PULSECARE HEALTH CITY</h3>
          </div>
          <p className="slip-tagline">NABH Accredited Tertiary Care Center • Outpatient Department (OPD)</p>
          <p style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>
            Central OPD Wing, Level 1 • Helpdesk: +91 80 2400 1100
          </p>
        </div>

        {/* Hero Token Number */}
        <div className="token-hero-badge">
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            OUTPATIENT CONSULTATION TOKEN
          </div>
          <div className="token-number-hero">
            {tokenData.token}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <span style={{ 
              background: tokenData.priority === 'Emergency' ? 'var(--rose-light)' : 'var(--primary-light)', 
              color: tokenData.priority === 'Emergency' ? '#b91c1c' : 'var(--primary-hover)', 
              padding: '2px 10px', 
              borderRadius: 'var(--radius-full)', 
              fontSize: '0.75rem', 
              fontWeight: 700 
            }}>
              {tokenData.priority} Queue
            </span>
            <span style={{ background: '#f1f5f9', color: '#475569', padding: '2px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 }}>
              Est. Time: {tokenData.estimatedTime || '15-20 Mins'}
            </span>
          </div>
        </div>

        {/* Slip Body Details */}
        <div className="token-slip-body">
          <div className="slip-detail-row">
            <span className="slip-label">OP Registration ID:</span>
            <span className="slip-val">{tokenData.opId || 'OP-2026-9041'}</span>
          </div>
          <div className="slip-detail-row">
            <span className="slip-label">Patient Name:</span>
            <span className="slip-val">{tokenData.patientName}</span>
          </div>
          <div className="slip-detail-row">
            <span className="slip-label">Age / Gender / Blood:</span>
            <span className="slip-val">{tokenData.age} Yrs / {tokenData.gender} / {tokenData.bloodGroup}</span>
          </div>
          <div className="slip-detail-row">
            <span className="slip-label">Contact Mobile:</span>
            <span className="slip-val">{tokenData.phone}</span>
          </div>
          <div className="slip-detail-row">
            <span className="slip-label">Department:</span>
            <span className="slip-val">{tokenData.departmentName}</span>
          </div>
          <div className="slip-detail-row">
            <span className="slip-label">Consulting Doctor:</span>
            <span className="slip-val">{tokenData.doctor}</span>
          </div>
          <div className="slip-detail-row">
            <span className="slip-label">Assigned Room:</span>
            <span className="slip-val" style={{ color: 'var(--primary)' }}>{tokenData.room}</span>
          </div>
          <div className="slip-detail-row">
            <span className="slip-label">Registered At:</span>
            <span className="slip-val">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (05-Sep-2026)</span>
          </div>

          {/* Triage Clinical Vitals at Registration */}
          {tokenData.vitals && (
            <div style={{ marginTop: '14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                🩺 Clinical Vitals Recorded at OP Triage:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', fontSize: '0.78rem' }}>
                <div>BP: <strong>{tokenData.vitals.bp}</strong></div>
                <div>Pulse: <strong>{tokenData.vitals.pulse}</strong></div>
                <div>SpO2: <strong>{tokenData.vitals.spo2}</strong></div>
                <div>Temp: <strong>{tokenData.vitals.temp}</strong></div>
                <div>Weight: <strong>{tokenData.vitals.weight}</strong></div>
                <div>BMI: <strong>{tokenData.vitals.bmi ? tokenData.vitals.bmi.split(' ')[0] : '22.8'}</strong></div>
                <div>Sugar: <strong>{tokenData.vitals.bloodSugar || '110 mg/dL'}</strong></div>
                <div style={{ color: '#059669', fontWeight: 700 }}>Triage: Verified ✓</div>
              </div>
            </div>
          )}

          {/* Barcode & Instructions */}
          <div style={{ marginTop: '20px', textAlign: 'center', borderTop: '1px dashed #cbd5e1', paddingTop: '16px' }}>
            {/* SVG Barcode simulation */}
            <svg width="240" height="42" viewBox="0 0 240 42" style={{ display: 'inline-block' }}>
              <rect x="0" y="0" width="4" height="40" fill="#0f172a" />
              <rect x="8" y="0" width="2" height="40" fill="#0f172a" />
              <rect x="14" y="0" width="6" height="40" fill="#0f172a" />
              <rect x="24" y="0" width="3" height="40" fill="#0f172a" />
              <rect x="32" y="0" width="8" height="40" fill="#0f172a" />
              <rect x="44" y="0" width="3" height="40" fill="#0f172a" />
              <rect x="52" y="0" width="5" height="40" fill="#0f172a" />
              <rect x="62" y="0" width="2" height="40" fill="#0f172a" />
              <rect x="68" y="0" width="7" height="40" fill="#0f172a" />
              <rect x="80" y="0" width="4" height="40" fill="#0f172a" />
              <rect x="90" y="0" width="6" height="40" fill="#0f172a" />
              <rect x="100" y="0" width="2" height="40" fill="#0f172a" />
              <rect x="108" y="0" width="5" height="40" fill="#0f172a" />
              <rect x="118" y="0" width="7" height="40" fill="#0f172a" />
              <rect x="130" y="0" width="3" height="40" fill="#0f172a" />
              <rect x="138" y="0" width="6" height="40" fill="#0f172a" />
              <rect x="150" y="0" width="2" height="40" fill="#0f172a" />
              <rect x="158" y="0" width="8" height="40" fill="#0f172a" />
              <rect x="172" y="0" width="4" height="40" fill="#0f172a" />
              <rect x="182" y="0" width="5" height="40" fill="#0f172a" />
              <rect x="194" y="0" width="3" height="40" fill="#0f172a" />
              <rect x="202" y="0" width="7" height="40" fill="#0f172a" />
              <rect x="214" y="0" width="4" height="40" fill="#0f172a" />
              <rect x="224" y="0" width="6" height="40" fill="#0f172a" />
              <rect x="234" y="0" width="4" height="40" fill="#0f172a" />
            </svg>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginTop: '4px' }}>
              *{tokenData.opId || 'OP-2026-9041'}*
            </div>
            <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '10px', fontStyle: 'italic' }}>
              Please be seated in the <strong>{tokenData.departmentName} Waiting Lounge</strong>. When your token is called on the lobby screen, proceed inside.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="token-slip-footer">
          <span>Valid for today's OPD consultation only.</span>
          <span style={{ fontWeight: 700 }}>PulseCare OPD Desk</span>
        </div>
      </div>

      {/* Slip Actions */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '20px' }}>
        <button className="btn btn-primary" onClick={handlePrint}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
          Print / Save Token Slip
        </button>
        <button className="btn btn-secondary" onClick={onBackToQueue}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
          Track in Live Queue
        </button>
        <button className="btn btn-secondary" onClick={onNewRegistration}>
          + Register Another Patient
        </button>
      </div>
    </div>
  );
}
