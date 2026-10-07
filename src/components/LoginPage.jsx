import React, { useState } from 'react';

// AtriBiz AB Logo Vector Component (Matching the screenshot precisely)
export function AtriBizLogo({ width = 120, height = 62 }) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 170 85" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', margin: '0 auto' }}
    >
      {/* Top Blue Orbital Ellipse Arc */}
      <path 
        d="M 18 42 C 16 18, 52 8, 96 8 C 132 8, 156 18, 158 32" 
        stroke="#0284c7" 
        strokeWidth="3.6" 
        strokeLinecap="round" 
        fill="none" 
      />
      {/* Bottom Red Orbital Ellipse Arc */}
      <path 
        d="M 154 44 C 154 66, 118 76, 76 76 C 36 76, 16 66, 14 52" 
        stroke="#dc2626" 
        strokeWidth="3.6" 
        strokeLinecap="round" 
        fill="none" 
      />
      {/* Red Letter 'A' */}
      <text 
        x="42" 
        y="58" 
        fontFamily="'Arial Black', Impact, sans-serif" 
        fontSize="48" 
        fontWeight="900" 
        fontStyle="italic"
        fill="#dc2626"
        letterSpacing="-2"
      >
        A
      </text>
      {/* Blue Letter 'B' */}
      <text 
        x="80" 
        y="58" 
        fontFamily="'Arial Black', Impact, sans-serif" 
        fontSize="48" 
        fontWeight="900" 
        fontStyle="italic"
        fill="#0284c7"
      >
        B
      </text>
      {/* Sharp Black Checkmark Sweeping Through */}
      <path 
        d="M 32 46 L 55 64 L 126 18" 
        stroke="#0f172a" 
        strokeWidth="6.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none" 
      />
    </svg>
  );
}

export function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [showForgotMsg, setShowForgotMsg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onLogin({
        id: 'ADMIN-ATRIBIZ-01',
        role: 'admin',
        roleName: 'System Administrator (Pharmacy / HIMS)',
        badgeColor: '#0284c7',
        icon: '🏥',
        name: username || 'Administrator',
        qualification: 'HIMS Master Controller',
        department: 'Central Pharmacy & OPD',
        initialTab: 'overview',
        email: 'info@atribiz.com'
      });
    }, 400);
  };

  return (
    <div className="atri-login-screen">
      {/* Top-Left Floating ATRIBIZ "AB" Logo */}
      <div className="atri-top-logo">
        <AtriBizLogo width={135} height={70} />
      </div>

      {/* Main Centered Login Pod Widget */}
      <div className="atri-login-container">
        {/* Top Header Plate with Logo */}
        <div className="atri-card-top-cap">
          <AtriBizLogo width={120} height={60} />
        </div>

        {/* Circular / Rounded Dark Slate Pod */}
        <div className="atri-card-dark-pod">
          <form onSubmit={handleSubmit} className="atri-form">
            {/* Username / Admin input */}
            <div className="atri-input-box">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="atri-field"
                autoFocus
                required
              />
            </div>

            {/* Password input */}
            <div className="atri-input-box">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="atri-field"
                required
              />
            </div>

            {/* Forgot Password Link */}
            <div className="atri-forgot-row">
              <button
                type="button"
                className="atri-forgot-link"
                onClick={() => setShowForgotMsg(!showForgotMsg)}
              >
                Forgot Password ?
              </button>
            </div>

            {/* Forgot Password Helper Popover */}
            {showForgotMsg && (
              <div className="atri-forgot-popover">
                <span>Contact IT Support: <strong>+91 7995881582</strong> or <strong>info@atribiz.com</strong></span>
              </div>
            )}

            {/* LOGIN Pill Button */}
            <div className="atri-btn-row">
              <button 
                type="submit" 
                className="atri-login-btn"
                disabled={loading}
              >
                {loading ? 'LOGGING IN...' : 'LOGIN'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <footer className="atri-footer-bar">
        <span>Developed and Supported by : </span>
        <a href="mailto:info@atribiz.com" className="atri-footer-highlight">AtriBiz Solutions LLP</a>
        <span>, info@atribiz.com, Phone: +91 7995881582.</span>
      </footer>
    </div>
  );
}
