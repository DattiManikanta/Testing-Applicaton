import React, { useState, useEffect } from 'react';
import { AtriBizLogo } from './LoginPage.jsx';

export function HIMSHomeDashboard({ onSelectModule, onLogout }) {
  const [loginTime, setLoginTime] = useState('');

  useEffect(() => {
    // Format timestamp like: 2026-10-07 11:40:27
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const formatted = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    setLoginTime(formatted);
  }, []);

  return (
    <div className="hims-home-screen">
      {/* Left Scenery: Indus Hospital Building */}
      <div className="atri-scenery-hospital">
        <img 
          src="./hospital_building.jpg" 
          alt="Indus Hospital Building" 
          className="atri-scenery-hospital-img" 
        />
        <div className="atri-scenery-hospital-label">
          <span className="atri-pulse-dot"></span>
          <span>Indus Hospital</span>
        </div>
      </div>

      {/* Right Scenery: Doctor Photo */}
      <div className="atri-scenery-doctor">
        <img 
          src="./doctor_profile.jpg" 
          alt="Doctor" 
          className="atri-scenery-doctor-img" 
        />
      </div>

      {/* Background Subtle Constellation / Plexus SVG Lines */}
      <svg className="atri-bg-plexus" viewBox="0 0 1000 800" fill="none" preserveAspectRatio="none">
        <circle cx="200" cy="220" r="4" fill="#38bdf8" opacity="0.5" />
        <circle cx="340" cy="180" r="5" fill="#38bdf8" opacity="0.6" />
        <circle cx="260" cy="380" r="4" fill="#38bdf8" opacity="0.4" />
        <circle cx="480" cy="280" r="5" fill="#38bdf8" opacity="0.5" />
        <circle cx="520" cy="460" r="4" fill="#38bdf8" opacity="0.4" />
        <circle cx="680" cy="260" r="4" fill="#38bdf8" opacity="0.5" />
        <circle cx="760" cy="420" r="5" fill="#38bdf8" opacity="0.4" />
        <line x1="200" y1="220" x2="340" y2="180" stroke="#38bdf8" strokeWidth="1" opacity="0.2" />
        <line x1="340" y1="180" x2="480" y2="280" stroke="#38bdf8" strokeWidth="1" opacity="0.2" />
        <line x1="260" y1="380" x2="520" y2="460" stroke="#38bdf8" strokeWidth="1" opacity="0.2" />
        <line x1="480" y1="280" x2="680" y2="260" stroke="#38bdf8" strokeWidth="1" opacity="0.2" />
        <line x1="680" y1="260" x2="760" y2="420" stroke="#38bdf8" strokeWidth="1" opacity="0.2" />
      </svg>

      {/* Top Header Bar */}
      <header className="hims-top-bar">
        {/* Left: AB Logo */}
        <div className="hims-top-logo">
          <AtriBizLogo width={125} height={60} />
        </div>

        {/* Center: Red Login Time */}
        <div className="hims-login-time">
          LogInTime: <span className="time-val">{loginTime || '2026-10-07 11:40:27'}</span>
        </div>

        {/* Right: Circular Blue LOGOUT Button */}
        <div className="hims-top-actions">
          <button 
            type="button" 
            className="hims-logout-circle-btn" 
            onClick={onLogout}
            title="Logout from ATRI HIMS"
          >
            <div className="hims-power-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                <line x1="12" y1="2" x2="12" y2="12" />
              </svg>
            </div>
            <span className="hims-logout-text">LOGOUT</span>
          </button>
        </div>
      </header>

      {/* Main Center Area with Headline & Metro Tile Grid */}
      <main className="hims-main-area">
        <div className="hims-content-wrapper">
          {/* Headline Text Banner */}
          <div className="hims-headline-banner">
            <h1 className="hims-headline-title">
              ATRI'S FUTURE READY<br />
              INTEGRATED HIMS
            </h1>
            <p className="hims-headline-desc">
              is designed to help organizations achieve IT resiliency,<br />
              be cost-efficient and drive business alignment.
            </p>
          </div>

          {/* 6-Column Metro / Windows Flat Grid */}
          <div className="hims-tile-grid">
            {/* ROW 1 */}
            <div className="hims-tile-spacer-row1"></div>

            {/* Col 4: ADMIN (Bright Green) */}
            <div 
              className="hims-tile hims-tile-green" 
              onClick={() => onSelectModule('staff')}
              title="Click to open Admin & OPD Desk Control"
            >
              <div className="hims-tile-icon-wrap">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2.2">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="9" r="2" fill="#0284c7" />
                  <path d="M8.5 16a3.5 3.5 0 0 1 7 0" fill="#0284c7" />
                  <line x1="12" y1="2" x2="12" y2="5" />
                  <line x1="12" y1="19" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="5" y2="12" />
                  <line x1="19" y1="12" x2="22" y2="12" />
                </svg>
              </div>
              <span className="hims-tile-label">ADMIN</span>
            </div>

            {/* Col 5: Photo HR Touch Screen */}
            <div 
              className="hims-tile hims-tile-img" 
              onClick={() => onSelectModule('doctors')}
              title="Hospital Human Resources & Consultants"
            >
              <img src="./tile_hr.jpg" alt="HR Network" className="hims-tile-photo" />
            </div>

            {/* Col 6: Empty in row 1 */}
            <div className="hims-tile-empty"></div>


            {/* ROW 2 */}
            {/* Col 1: Patient Management (Cyan Blue) */}
            <div 
              className="hims-tile hims-tile-cyan" 
              onClick={() => onSelectModule('queue')}
              title="Patient Management & OPD Queue"
            >
              <div className="hims-tile-icon-wrap">
                <svg width="46" height="46" viewBox="0 0 24 24" fill="none">
                  <circle cx="9" cy="7" r="3.5" fill="#ffffff" />
                  <path d="M3.5 18c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5" stroke="#ffffff" strokeWidth="2" fill="none" />
                  <circle cx="16" cy="9" r="3" fill="#ffffff" />
                  <path d="M12.5 18c.3-2 1.8-3.5 3.5-3.5 2 0 3.5 1.5 3.5 3.5" stroke="#ffffff" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <span className="hims-tile-label">Patient Management</span>
            </div>

            {/* Col 2: Photo Laptop Doctor */}
            <div 
              className="hims-tile hims-tile-img" 
              onClick={() => onSelectModule('register')}
              title="OP Registration & Clinical Desk"
            >
              <img src="./tile_laptop.jpg" alt="Doctor Laptop" className="hims-tile-photo" />
            </div>

            {/* Col 3: Photo Lab Flask */}
            <div 
              className="hims-tile hims-tile-img" 
              onClick={() => onSelectModule('records')}
              title="Diagnostic Laboratory & Testing"
            >
              <img src="./tile_flask.jpg" alt="Lab Flask" className="hims-tile-photo" />
            </div>

            {/* Col 4: Lab Management (Orange) */}
            <div 
              className="hims-tile hims-tile-orange" 
              onClick={() => onSelectModule('records')}
              title="Lab Management & Reports"
            >
              <div className="hims-tile-icon-wrap">
                <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 18h8" />
                  <path d="M3 22h18" />
                  <path d="M14 22a7 7 0 1 0 0-14h-1" />
                  <path d="M9 14h2" />
                  <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" fill="rgba(255,255,255,0.2)" />
                  <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
                </svg>
              </div>
              <span className="hims-tile-label">Lab Management</span>
            </div>

            {/* Col 5: Photo Pharmacy */}
            <div 
              className="hims-tile hims-tile-img" 
              onClick={() => onSelectModule('pharmacy')}
              title="Pharmacy Dispensary & Drugs"
            >
              <img src="./tile_pharmacy.jpg" alt="Pharmacy" className="hims-tile-photo" />
            </div>

            {/* Col 6: Credit Billing (Teal Blue) */}
            <div 
              className="hims-tile hims-tile-teal" 
              onClick={() => onSelectModule('slip')}
              title="Credit Billing & Cashier Desk"
            >
              <div className="hims-tile-icon-wrap">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="14" height="10" x="2" y="3" rx="2" />
                  <path d="M6 13v2" />
                  <path d="M10 13v2" />
                  <path d="M4 17h8" />
                  <rect width="8" height="6" x="14" y="14" rx="1" fill="rgba(255,255,255,0.2)" />
                  <line x1="16" x2="20" y1="12" y2="12" />
                </svg>
              </div>
              <span className="hims-tile-label">Credit Billing</span>
            </div>


            {/* ROW 3 */}
            <div className="hims-tile-empty"></div>
            <div className="hims-tile-empty"></div>

            {/* Col 3: CSSD (Magenta / Pink) */}
            <div 
              className="hims-tile hims-tile-magenta" 
              onClick={() => onSelectModule('vitals')}
              title="CSSD - Central Sterile Services Department"
            >
              <div className="hims-tile-icon-wrap">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                  <path d="M8 8 C8 4 16 4 16 8 Z" fill="#38bdf8" />
                  <circle cx="12" cy="9" r="3.5" fill="#fbcfe8" />
                  <rect x="9" y="9" width="6" height="3" rx="1" fill="#ffffff" />
                  <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" fill="#38bdf8" />
                </svg>
              </div>
              <span className="hims-tile-label">CSSD</span>
            </div>

            {/* Col 4: Nursing (Light Green) */}
            <div 
              className="hims-tile hims-tile-lightgreen" 
              onClick={() => onSelectModule('vitals')}
              title="Nursing Care & Vitals Station"
            >
              <div className="hims-tile-icon-wrap">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5 L15 5 L14 7 L10 7 Z" fill="#ffffff" />
                  <path d="M11.5 5.5 v2 M10.5 6.5 h2" stroke="#dc2626" strokeWidth="1.5" />
                  <circle cx="12" cy="10" r="3.5" fill="#fed7aa" />
                  <path d="M6 21c0-3.5 2.5-6 6-6s6 2.5 6 6" fill="#ffffff" />
                </svg>
              </div>
              <span className="hims-tile-label">Nursing</span>
            </div>

            {/* Col 5: Photo Puzzle Hands */}
            <div 
              className="hims-tile hims-tile-img" 
              onClick={() => onSelectModule('staff')}
              title="Operations & Administration Team"
            >
              <img src="./tile_puzzle.jpg" alt="Puzzle Strategy" className="hims-tile-photo" />
            </div>

            {/* Col 6: Human Resource (Purple) */}
            <div 
              className="hims-tile hims-tile-purple" 
              onClick={() => onSelectModule('doctors')}
              title="Human Resources & Medical Faculty"
            >
              <div className="hims-tile-icon-wrap">
                <svg width="46" height="46" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="7" r="3" fill="#ffffff" />
                  <path d="M7 19c0-2.8 2.2-5 5-5s5 2.2 5 5" fill="#ffffff" />
                  <circle cx="5" cy="9" r="2.2" fill="rgba(255,255,255,0.7)" />
                  <path d="M1 19c0-2.2 1.8-4 4-4 .8 0 1.5.2 2.2.6-.7 1-.9 2.2-.9 3.4" fill="rgba(255,255,255,0.7)" />
                  <circle cx="19" cy="9" r="2.2" fill="rgba(255,255,255,0.7)" />
                  <path d="M17.7 15.6c.7-.4 1.4-.6 2.3-.6 2.2 0 4 1.8 4 4h-5.4c0-1.2-.2-2.4-.9-3.4" fill="rgba(255,255,255,0.7)" />
                </svg>
              </div>
              <span className="hims-tile-label">Human Resource</span>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Footer Bar */}
      <footer className="atri-footer-bar">
        <span>Developed and Supported by : </span>
        <a href="mailto:info@atribiz.com" className="atri-footer-highlight">AtriBiz Solutions LLP</a>
        <span>, info@atribiz.com, Phone: +91 7995881582.</span>
      </footer>
    </div>
  );
}
