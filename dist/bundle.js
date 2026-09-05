// PulseCare Hospital Outpatient Single Standalone Bundle
const {
  useState,
  useEffect,
  useRef
} = React;

// --- src/data/hospitalData.js ---
// OPD Departments and their current room status
const initialDepartments = [{
  id: "dep-cardio",
  name: "Cardiology & Heart Care",
  shortName: "Cardiology",
  code: "CAR",
  room: "Cabin 101 (1st Floor)",
  doctor: "Dr. Ananya Iyer",
  specialty: "Senior Cardiologist",
  currentToken: "CAR-104",
  nextToken: "CAR-105",
  waitingCount: 5,
  avgWaitTime: "12 mins",
  status: "In Consultation",
  // In Consultation, Next Patient, Break
  statusColor: "emerald",
  icon: "heart-pulse",
  queue: [{
    token: "CAR-104",
    patientName: "Rajesh Kumar",
    status: "Inside",
    time: "09:15 AM",
    priority: "Regular"
  }, {
    token: "CAR-105",
    patientName: "Meenakshi S.",
    status: "Next",
    time: "09:30 AM",
    priority: "Senior Citizen"
  }, {
    token: "CAR-106",
    patientName: "Arjun Verma",
    status: "Waiting",
    time: "09:45 AM",
    priority: "Regular"
  }, {
    token: "CAR-107",
    patientName: "Kavita Rao",
    status: "Waiting",
    time: "10:00 AM",
    priority: "Regular"
  }, {
    token: "CAR-108",
    patientName: "Mohammed Farooq",
    status: "Waiting",
    time: "10:15 AM",
    priority: "Regular"
  }]
}, {
  id: "dep-ortho",
  name: "Orthopedics & Joint Clinic",
  shortName: "Orthopedics",
  code: "ORT",
  room: "Cabin 102 (1st Floor)",
  doctor: "Dr. Vikramaditya Rathore",
  specialty: "Consultant Orthopedic Surgeon",
  currentToken: "ORT-082",
  nextToken: "ORT-083",
  waitingCount: 4,
  avgWaitTime: "15 mins",
  status: "In Consultation",
  statusColor: "emerald",
  icon: "bone",
  queue: [{
    token: "ORT-082",
    patientName: "David D'Souza",
    status: "Inside",
    time: "09:20 AM",
    priority: "Regular"
  }, {
    token: "ORT-083",
    patientName: "Sunita Patel",
    status: "Next",
    time: "09:35 AM",
    priority: "Senior Citizen"
  }, {
    token: "ORT-084",
    patientName: "Harpreet Singh",
    status: "Waiting",
    time: "09:50 AM",
    priority: "Regular"
  }, {
    token: "ORT-085",
    patientName: "Priya Nair",
    status: "Waiting",
    time: "10:05 AM",
    priority: "Regular"
  }]
}, {
  id: "dep-genmed",
  name: "General Medicine & Health",
  shortName: "General Medicine",
  code: "GEN",
  room: "Cabin 103 (Ground Floor)",
  doctor: "Dr. Sandeep K. Banerjee",
  specialty: "Chief Physician & Diabetologist",
  currentToken: "GEN-211",
  nextToken: "GEN-212",
  waitingCount: 7,
  avgWaitTime: "8 mins",
  status: "In Consultation",
  statusColor: "emerald",
  icon: "stethoscope",
  queue: [{
    token: "GEN-211",
    patientName: "Gopal Krishna",
    status: "Inside",
    time: "09:10 AM",
    priority: "Regular"
  }, {
    token: "GEN-212",
    patientName: "Lakshmi Narayanan",
    status: "Next",
    time: "09:20 AM",
    priority: "Senior Citizen"
  }, {
    token: "GEN-213",
    patientName: "Rohan Sen",
    status: "Waiting",
    time: "09:30 AM",
    priority: "Regular"
  }, {
    token: "GEN-214",
    patientName: "Deepa Menon",
    status: "Waiting",
    time: "09:40 AM",
    priority: "Regular"
  }, {
    token: "GEN-215",
    patientName: "Amitabh Roy",
    status: "Waiting",
    time: "09:50 AM",
    priority: "Regular"
  }]
}, {
  id: "dep-ped",
  name: "Pediatrics & Child Wellness",
  shortName: "Pediatrics",
  code: "PED",
  room: "Cabin 104 (Ground Floor)",
  doctor: "Dr. Shalini Deshmukh",
  specialty: "Senior Pediatrician & Neonatologist",
  currentToken: "PED-049",
  nextToken: "PED-050",
  waitingCount: 3,
  avgWaitTime: "10 mins",
  status: "In Consultation",
  statusColor: "emerald",
  icon: "baby",
  queue: [{
    token: "PED-049",
    patientName: "Baby Aavya (Parent: Sneha)",
    status: "Inside",
    time: "09:25 AM",
    priority: "Child Care"
  }, {
    token: "PED-050",
    patientName: "Master Vihaan",
    status: "Next",
    time: "09:40 AM",
    priority: "Child Care"
  }, {
    token: "PED-051",
    patientName: "Baby Reyansh",
    status: "Waiting",
    time: "09:55 AM",
    priority: "Child Care"
  }]
}, {
  id: "dep-derma",
  name: "Dermatology & Skin Care",
  shortName: "Dermatology",
  code: "DER",
  room: "Cabin 105 (2nd Floor)",
  doctor: "Dr. Neil Chatterjee",
  specialty: "Cosmetic & Clinical Dermatologist",
  currentToken: "DER-031",
  nextToken: "DER-032",
  waitingCount: 2,
  avgWaitTime: "10 mins",
  status: "Next Patient",
  statusColor: "amber",
  icon: "sparkles",
  queue: [{
    token: "DER-031",
    patientName: "Neha Kapoor",
    status: "Completing",
    time: "09:15 AM",
    priority: "Regular"
  }, {
    token: "DER-032",
    patientName: "Aditya Jain",
    status: "Next",
    time: "09:30 AM",
    priority: "Regular"
  }, {
    token: "DER-033",
    patientName: "Simran Kaur",
    status: "Waiting",
    time: "09:45 AM",
    priority: "Regular"
  }]
}, {
  id: "dep-ent",
  name: "ENT & Head-Neck Clinic",
  shortName: "ENT",
  code: "ENT",
  room: "Cabin 106 (2nd Floor)",
  doctor: "Dr. Priya Sundaram",
  specialty: "ENT & Cochlear Implant Surgeon",
  currentToken: "ENT-055",
  nextToken: "ENT-056",
  waitingCount: 4,
  avgWaitTime: "14 mins",
  status: "In Consultation",
  statusColor: "emerald",
  icon: "ear",
  queue: [{
    token: "ENT-055",
    patientName: "Venkat Raman",
    status: "Inside",
    time: "09:18 AM",
    priority: "Regular"
  }, {
    token: "ENT-056",
    patientName: "Alka Pandey",
    status: "Next",
    time: "09:32 AM",
    priority: "Regular"
  }, {
    token: "ENT-057",
    patientName: "Karan Malhotra",
    status: "Waiting",
    time: "09:46 AM",
    priority: "Regular"
  }]
}];
const doctorsRoster = [{
  id: "doc-1",
  name: "Dr. Ananya Iyer",
  degrees: "MBBS, MD, DM (Cardiology), FACC",
  department: "Cardiology & Heart Care",
  depCode: "CAR",
  cabin: "Cabin 101 (1st Floor)",
  experience: "14+ Years",
  opdTimings: "Morning: 09:00 AM - 01:00 PM | Evening: 04:30 PM - 07:30 PM",
  fee: "₹700",
  rating: "4.9 (420+ reviews)",
  image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300",
  languages: "English, Hindi, Tamil",
  focus: "Coronary Angioplasty, Hypertension, Heart Failure, Preventive Cardiology"
}, {
  id: "doc-2",
  name: "Dr. Vikramaditya Rathore",
  degrees: "MBBS, MS (Orthopedics), M.Ch (Joint Replacement)",
  department: "Orthopedics & Joint Clinic",
  depCode: "ORT",
  cabin: "Cabin 102 (1st Floor)",
  experience: "18+ Years",
  opdTimings: "Morning: 09:30 AM - 01:30 PM | Evening: 05:00 PM - 08:00 PM",
  fee: "₹750",
  rating: "4.8 (380+ reviews)",
  image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300",
  languages: "English, Hindi, Punjabi",
  focus: "Robotic Knee Replacement, Arthroscopy, Spine Disorders, Sports Injury"
}, {
  id: "doc-3",
  name: "Dr. Sandeep K. Banerjee",
  degrees: "MBBS, MD (Internal Medicine), PGDD (Diabetes)",
  department: "General Medicine & Health",
  depCode: "GEN",
  cabin: "Cabin 103 (Ground Floor)",
  experience: "21+ Years",
  opdTimings: "Morning: 08:30 AM - 01:00 PM | Evening: 04:00 PM - 08:00 PM",
  fee: "₹600",
  rating: "4.9 (610+ reviews)",
  image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300",
  languages: "English, Hindi, Bengali",
  focus: "Diabetes Reversal, Infectious Diseases, Thyroid Management, Geriatric Care"
}, {
  id: "doc-4",
  name: "Dr. Shalini Deshmukh",
  degrees: "MBBS, DCH, DNB (Pediatrics), Fellowship Pediatric Critical Care",
  department: "Pediatrics & Child Wellness",
  depCode: "PED",
  cabin: "Cabin 104 (Ground Floor)",
  experience: "12+ Years",
  opdTimings: "Morning: 09:00 AM - 01:00 PM | Evening: 04:00 PM - 07:00 PM",
  fee: "₹650",
  rating: "5.0 (490+ reviews)",
  image: "https://images.unsplash.com/photo-1594824813501-4475989408b0?auto=format&fit=crop&q=80&w=300",
  languages: "English, Hindi, Marathi",
  focus: "Newborn Care, Pediatric Asthma, Vaccination Schedule, Growth Milestones"
}, {
  id: "doc-5",
  name: "Dr. Neil Chatterjee",
  degrees: "MBBS, MD (Dermatology, Venereology & Leprosy)",
  department: "Dermatology & Skin Care",
  depCode: "DER",
  cabin: "Cabin 105 (2nd Floor)",
  experience: "10+ Years",
  opdTimings: "Morning: 10:00 AM - 02:00 PM | Evening: 05:00 PM - 08:00 PM",
  fee: "₹650",
  rating: "4.7 (290+ reviews)",
  image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300",
  languages: "English, Hindi",
  focus: "Acne Therapies, Psoriasis, Hair Loss/PRP, Laser Aesthetic Medicine"
}, {
  id: "doc-6",
  name: "Dr. Priya Sundaram",
  degrees: "MBBS, MS (ENT), DNB (Otorhinolaryngology)",
  department: "ENT & Head-Neck Clinic",
  depCode: "ENT",
  cabin: "Cabin 106 (2nd Floor)",
  experience: "15+ Years",
  opdTimings: "Morning: 09:00 AM - 01:00 PM | Evening: 04:30 PM - 07:30 PM",
  fee: "₹700",
  rating: "4.8 (340+ reviews)",
  image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=300",
  languages: "English, Hindi, Tamil, Telugu",
  focus: "Microscopic Ear Surgery, Sinusitis Endoscopy, Sleep Apnea, Vertigo"
}];
const mockOPRecords = {
  "CAR-104": {
    token: "CAR-104",
    opId: "OP-2026-8812",
    patientName: "Rajesh Kumar",
    age: 52,
    gender: "Male",
    phone: "+91 98451 22910",
    bloodGroup: "B+",
    department: "Cardiology & Heart Care",
    doctor: "Dr. Ananya Iyer",
    room: "Cabin 101",
    visitDate: "05-Sep-2026",
    visitType: "Follow-up Consultation",
    vitals: {
      bp: "138/88 mmHg",
      pulse: "76 bpm",
      spo2: "98%",
      temp: "98.4 °F",
      weight: "74 kg",
      bmi: "25.2 (Normal)"
    },
    symptoms: "Mild chest tightness upon climbing stairs for 3 days; history of mild hypertension.",
    diagnosis: "Hypertensive Heart Disease (Mild, Stage 1) - Under Evaluation",
    prescription: [{
      medicine: "Telmisartan 40mg",
      timing: "1 - 0 - 0",
      instruction: "Once daily, morning after food",
      duration: "30 Days"
    }, {
      medicine: "Atorvastatin 10mg",
      timing: "0 - 0 - 1",
      instruction: "Night after dinner",
      duration: "30 Days"
    }, {
      medicine: "Ecosprin 75mg",
      timing: "0 - 1 - 0",
      instruction: "After lunch",
      duration: "30 Days"
    }],
    recommendedTests: [{
      testName: "12-Lead ECG",
      status: "Completed Today (Normal sinus rhythm)"
    }, {
      testName: "2D Echocardiography",
      status: "Scheduled 11:30 AM"
    }, {
      testName: "Lipid Profile & Serum Creatinine",
      status: "Fasting sample tomorrow"
    }],
    doctorNotes: "Low salt diet recommended (< 4g/day). 30 minutes brisk walking daily. Review in OPD after 3 weeks with 2D Echo report."
  },
  "GEN-211": {
    token: "GEN-211",
    opId: "OP-2026-8845",
    patientName: "Gopal Krishna",
    age: 46,
    gender: "Male",
    phone: "+91 98765 43210",
    bloodGroup: "O+",
    department: "General Medicine & Health",
    doctor: "Dr. Sandeep K. Banerjee",
    room: "Cabin 103",
    visitDate: "05-Sep-2026",
    visitType: "Routine OP Visit",
    vitals: {
      bp: "124/80 mmHg",
      pulse: "72 bpm",
      spo2: "99%",
      temp: "99.1 °F",
      weight: "68 kg",
      bmi: "23.5 (Normal)"
    },
    symptoms: "Fatigue, low grade evening fever for past 2 days, mild dry cough.",
    diagnosis: "Viral Upper Respiratory Tract Infection",
    prescription: [{
      medicine: "Paracetamol 650mg",
      timing: "1 - 1 - 1",
      instruction: "As needed for body aches/fever (SOS)",
      duration: "3 Days"
    }, {
      medicine: "Levocetirizine 5mg",
      timing: "0 - 0 - 1",
      instruction: "At bedtime",
      duration: "5 Days"
    }, {
      medicine: "Vitamin C + Zinc Chewable",
      timing: "1 - 0 - 0",
      instruction: "After breakfast",
      duration: "10 Days"
    }],
    recommendedTests: [{
      testName: "Complete Blood Count (CBC)",
      status: "Report Awaited (12:00 PM)"
    }, {
      testName: "CRP Qualitative",
      status: "Ordered"
    }],
    doctorNotes: "Hydrate well (minimum 3L warm water/fluids). Rest for 48 hours. If fever persists past day 4, report immediately."
  },
  "ORT-082": {
    token: "ORT-082",
    opId: "OP-2026-8790",
    patientName: "David D'Souza",
    age: 59,
    gender: "Male",
    phone: "+91 91234 56789",
    bloodGroup: "A+",
    department: "Orthopedics & Joint Clinic",
    doctor: "Dr. Vikramaditya Rathore",
    room: "Cabin 102",
    visitDate: "05-Sep-2026",
    visitType: "Orthopedic Review",
    vitals: {
      bp: "130/84 mmHg",
      pulse: "74 bpm",
      spo2: "98%",
      temp: "98.2 °F",
      weight: "82 kg",
      bmi: "27.1 (Overweight)"
    },
    symptoms: "Bilateral knee joint pain aggravated by squatting and descending stairs.",
    diagnosis: "Primary Knee Osteoarthritis (Grade II)",
    prescription: [{
      medicine: "Diacerein + Glucosamine",
      timing: "1 - 0 - 1",
      instruction: "After meals",
      duration: "60 Days"
    }, {
      medicine: "Etoricoxib 90mg",
      timing: "0 - 0 - 1",
      instruction: "SOS when pain is severe",
      duration: "5 Days max"
    }, {
      medicine: "Diclofenac Gel",
      timing: "Local",
      instruction: "Apply gently twice daily over knees",
      duration: "15 Days"
    }],
    recommendedTests: [{
      testName: "Digital X-Ray Both Knees (Standing AP & Lateral)",
      status: "Completed (Reduced joint space noted)"
    }, {
      testName: "Serum Vitamin D3 & Uric Acid",
      status: "Recommended"
    }],
    doctorNotes: "Quadriceps strengthening exercises demonstrated. Avoid cross-legged sitting. Weight management advice given."
  }
};

// --- src/utils/audio.js ---
// Web Audio API Hospital OPD Chime Synthesizer
// Produces a soothing 2-tone melodic chime (similar to hospital lobby call announcements)

function playHospitalChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    // First tone (E5 ~ 659 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, now);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.18, now + 0.05);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.55);

    // Second tone (B5 ~ 987 Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(987.77, now + 0.22);
    gain2.gain.setValueAtTime(0, now + 0.22);
    gain2.gain.linearRampToValueAtTime(0.22, now + 0.27);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.95);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.22);
    osc2.stop(now + 1.0);
  } catch (e) {
    console.warn("Audio chime playback error:", e);
  }
}

// --- src/components/Navbar.jsx ---

function Navbar({
  activeTab,
  setActiveTab,
  onOpenRegister,
  waitingTotal
}) {
  return /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("div", {
    className: "top-emergency-bar"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "emergency-chip"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pulse-dot"
  }), "24/7 OP Emergency & Triage Hotline: 1800-419-9999"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#cbd5e1',
      fontSize: '0.8rem'
    }
  }, "OPD Hours Today: ", /*#__PURE__*/React.createElement("strong", null, "08:00 AM - 08:00 PM"), " | Central Pharmacy & Diagnostics Open")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      fontSize: '0.8rem',
      color: '#94a3b8'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Live OPD Server: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#34d399'
    }
  }, "Connected \u25CF")), /*#__PURE__*/React.createElement("span", null, "Waiting Tokens: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#38bdf8'
    }
  }, waitingTotal)))), /*#__PURE__*/React.createElement("nav", {
    className: "hospital-navbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand-logo",
    onClick: () => setActiveTab('overview')
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo-badge"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "brand-text"
  }, /*#__PURE__*/React.createElement("h1", null, "PulseCare ", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "Health")), /*#__PURE__*/React.createElement("p", null, "Outpatient (OPD) & Specialty Medical Center"))), /*#__PURE__*/React.createElement("div", {
    className: "nav-links"
  }, /*#__PURE__*/React.createElement("button", {
    className: `nav-item ${activeTab === 'overview' ? 'active' : ''}`,
    onClick: () => setActiveTab('overview')
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "9 22 9 12 15 12 15 22"
  })), "Hospital Home"), /*#__PURE__*/React.createElement("button", {
    className: `nav-item ${activeTab === 'queue' ? 'active' : ''}`,
    onClick: () => setActiveTab('queue')
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "20",
    height: "14",
    x: "2",
    y: "3",
    rx: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    x2: "16",
    y1: "21",
    y2: "21"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    x2: "12",
    y1: "17",
    y2: "21"
  })), "Live OPD Queue"), /*#__PURE__*/React.createElement("button", {
    className: `nav-item ${activeTab === 'register' ? 'active' : ''}`,
    onClick: () => setActiveTab('register')
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "7",
    r: "4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "19",
    x2: "19",
    y1: "8",
    y2: "14"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "22",
    x2: "16",
    y1: "11",
    y2: "11"
  })), "New OP Registration"), /*#__PURE__*/React.createElement("button", {
    className: `nav-item ${activeTab === 'doctors' ? 'active' : ''}`,
    onClick: () => setActiveTab('doctors')
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "20",
    cy: "10",
    r: "2"
  })), "Doctor Schedule"), /*#__PURE__*/React.createElement("button", {
    className: `nav-item ${activeTab === 'records' ? 'active' : ''}`,
    onClick: () => setActiveTab('records')
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "14 2 14 8 20 8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    x2: "8",
    y1: "13",
    y2: "13"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    x2: "8",
    y1: "17",
    y2: "17"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "10 9 9 9 8 9"
  })), "OP Records & Rx"), /*#__PURE__*/React.createElement("button", {
    className: `nav-item ${activeTab === 'staff' ? 'active' : ''}`,
    onClick: () => setActiveTab('staff'),
    style: {
      color: '#0d9488'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  })), "OPD Desk Control")), /*#__PURE__*/React.createElement("div", {
    className: "nav-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: onOpenRegister
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "12",
    x2: "12",
    y1: "5",
    y2: "19"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "5",
    x2: "19",
    y1: "12",
    y2: "12"
  })), "Get OP Token"))));
}

// --- src/components/HeroSection.jsx ---

function HeroSection({
  setActiveTab,
  onOpenRegister,
  waitingTotal,
  activeDoctorsCount
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "hero-banner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-pill"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: '#38bdf8'
    }
  }), "Next-Gen Outpatient (OPD) System"), /*#__PURE__*/React.createElement("h2", {
    className: "hero-title"
  }, "Smart & Seamless ", /*#__PURE__*/React.createElement("span", {
    className: "highlight"
  }, "OP Patient Care"), ", Real-Time Queue & Digital Records."), /*#__PURE__*/React.createElement("p", {
    className: "hero-desc"
  }, "PulseCare Hospital provides zero-delay outpatient services. Register online in 60 seconds, track your consultation token from your mobile, consult top specialists, and access instant digital prescriptions."), /*#__PURE__*/React.createElement("div", {
    className: "hero-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: onOpenRegister,
    style: {
      padding: '13px 26px',
      fontSize: '0.96rem'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "7",
    r: "4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "19",
    x2: "19",
    y1: "8",
    y2: "14"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "22",
    x2: "16",
    y1: "11",
    y2: "11"
  })), "Register OP Patient / Get Token"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => setActiveTab('queue'),
    style: {
      padding: '13px 24px',
      fontSize: '0.96rem'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "20",
    height: "14",
    x: "2",
    y: "3",
    rx: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    x2: "16",
    y1: "21",
    y2: "21"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    x2: "12",
    y1: "17",
    y2: "21"
  })), "View Live Waiting Lobby"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => setActiveTab('records'),
    style: {
      background: 'rgba(255,255,255,0.1)',
      color: 'white',
      borderColor: 'rgba(255,255,255,0.2)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    x2: "16.65",
    y1: "21",
    ライ2: "16.65"
  })), "View OP Prescription")), /*#__PURE__*/React.createElement("div", {
    className: "hero-stats-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-num"
  }, "348 ", /*#__PURE__*/React.createElement("span", {
    className: "unit"
  }, "+")), /*#__PURE__*/React.createElement("div", {
    className: "stat-lbl"
  }, "Today's OP Consultations")), /*#__PURE__*/React.createElement("div", {
    className: "stat-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-num"
  }, activeDoctorsCount, " ", /*#__PURE__*/React.createElement("span", {
    className: "unit"
  }, "active")), /*#__PURE__*/React.createElement("div", {
    className: "stat-lbl"
  }, "Specialists in OPD Cabins")), /*#__PURE__*/React.createElement("div", {
    className: "stat-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-num"
  }, waitingTotal, " ", /*#__PURE__*/React.createElement("span", {
    className: "unit"
  }, "patients")), /*#__PURE__*/React.createElement("div", {
    className: "stat-lbl"
  }, "Tokens Currently in Queue")), /*#__PURE__*/React.createElement("div", {
    className: "stat-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-num"
  }, "12 ", /*#__PURE__*/React.createElement("span", {
    className: "unit"
  }, "mins")), /*#__PURE__*/React.createElement("div", {
    className: "stat-lbl"
  }, "Avg Consultation Turnaround"))))));
}

// --- src/components/QueueBoard.jsx ---

function QueueBoard({
  departments,
  onCallNext,
  activeAlertToken,
  onPlayChime
}) {
  const [filterQuery, setFilterQuery] = useState('');
  const filtered = departments.filter(dep => dep.name.toLowerCase().includes(filterQuery.toLowerCase()) || dep.doctor.toLowerCase().includes(filterQuery.toLowerCase()) || dep.room.toLowerCase().includes(filterQuery.toLowerCase()) || dep.currentToken.toLowerCase().includes(filterQuery.toLowerCase()));
  return /*#__PURE__*/React.createElement("div", {
    className: "queue-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "\uD83C\uDFE5 Live Outpatient (OPD) Waiting Board"), /*#__PURE__*/React.createElement("p", null, "Real-time token status across all outpatient consulting cabins. Updated dynamically.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '10px',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-input",
    placeholder: "Filter department, room or token...",
    value: filterQuery,
    onChange: e => setFilterQuery(e.target.value),
    style: {
      width: '260px',
      padding: '8px 12px',
      fontSize: '0.85rem'
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-sm",
    onClick: onPlayChime,
    title: "Test announcement chime",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15.54 8.46a5 5 0 0 1 0 7.07"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.07 4.93a10 10 0 0 1 0 14.14"
  })), "Lobby Chime"))), activeAlertToken && /*#__PURE__*/React.createElement("div", {
    className: "announcement-banner"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '1.2rem'
    }
  }, "\uD83D\uDD14"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "ATTENTION PLEASE:"), " Token ", /*#__PURE__*/React.createElement("strong", {
    style: {
      textDecoration: 'underline'
    }
  }, activeAlertToken.token), " (", activeAlertToken.patient, ") please proceed to ", /*#__PURE__*/React.createElement("strong", null, activeAlertToken.room), ".")), /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'rgba(255,255,255,0.2)',
      padding: '2px 8px',
      borderRadius: '4px',
      fontSize: '0.75rem'
    }
  }, "NOW CALLING")), /*#__PURE__*/React.createElement("div", {
    className: "queue-board-grid"
  }, filtered.map(dep => {
    const isFlashed = activeAlertToken && activeAlertToken.depCode === dep.code;
    return /*#__PURE__*/React.createElement("div", {
      key: dep.id,
      className: `queue-card ${isFlashed ? 'flash-active' : ''}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "room-badge-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "cabin-tag"
    }, dep.room), /*#__PURE__*/React.createElement("span", {
      className: `status-indicator ${dep.statusColor || 'emerald'}`
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: 'currentColor'
      }
    }), dep.status)), /*#__PURE__*/React.createElement("h3", {
      className: "department-title"
    }, dep.name), /*#__PURE__*/React.createElement("div", {
      className: "doctor-subtext"
    }, /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "7",
      r: "4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M5.5 21a8.38 8.38 0 0 1 13 0"
    })), dep.doctor, " \u2022 ", dep.specialty), /*#__PURE__*/React.createElement("div", {
      className: "token-spotlight-box"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "token-big-label"
    }, "Now Serving"), /*#__PURE__*/React.createElement("div", {
      className: "token-big-number"
    }, dep.currentToken || 'None')), /*#__PURE__*/React.createElement("div", {
      className: "token-next-col"
    }, /*#__PURE__*/React.createElement("div", {
      className: "token-big-label"
    }, "Next In Line"), /*#__PURE__*/React.createElement("div", {
      className: "token-next-num"
    }, dep.nextToken || 'None'))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: '14px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '0.75rem',
        fontWeight: 600,
        color: 'var(--text-muted)',
        marginBottom: '6px',
        textTransform: 'uppercase'
      }
    }, "Queue Line (", dep.queue.length, " in waiting)"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: '6px',
        flexWrap: 'wrap'
      }
    }, dep.queue.slice(0, 4).map((item, idx) => /*#__PURE__*/React.createElement("span", {
      key: item.token,
      style: {
        fontSize: '0.75rem',
        padding: '3px 8px',
        background: idx === 0 ? 'var(--primary-light)' : 'var(--bg-alt)',
        color: idx === 0 ? 'var(--primary)' : 'var(--text-main)',
        fontWeight: idx === 0 ? 700 : 500,
        borderRadius: '6px',
        border: '1px solid var(--border)'
      },
      title: `${item.patientName} (${item.priority})`
    }, item.token, " ", item.priority === 'Senior Citizen' ? '👴' : '')), dep.queue.length > 4 && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '0.75rem',
        padding: '3px 6px',
        color: 'var(--text-muted)'
      }
    }, "+", dep.queue.length - 4, " more"))), /*#__PURE__*/React.createElement("div", {
      className: "queue-submeta"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wait-pill"
    }, /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "12 6 12 12 16 14"
    })), "Est. Wait: ", /*#__PURE__*/React.createElement("strong", null, dep.avgWaitTime)), onCallNext && /*#__PURE__*/React.createElement("button", {
      className: "btn btn-secondary btn-sm",
      onClick: () => onCallNext(dep.id),
      style: {
        fontSize: '0.78rem',
        padding: '4px 10px'
      }
    }, "Call Next Token \u25B6")));
  })));
}

// --- src/components/RegistrationForm.jsx ---

function RegistrationForm({
  departments,
  doctors,
  onRegisterSuccess
}) {
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
  const handleChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset doctor when department changes
      ...(name === 'departmentCode' ? {
        doctor: ''
      } : {})
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  const handlePrioritySelect = priority => {
    setFormData(prev => ({
      ...prev,
      priority
    }));
  };
  const handleSubmit = e => {
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
  return /*#__PURE__*/React.createElement("div", {
    className: "registration-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-header",
    style: {
      justifyContent: 'center',
      textAlign: 'center',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("h2", null, "\uD83D\uDCDD Outpatient (OP) Patient Registration"), /*#__PURE__*/React.createElement("p", null, "Generate your digital OPD consultation token. Fast-track options for seniors and emergencies.")), /*#__PURE__*/React.createElement("div", {
    className: "form-card"
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group",
    style: {
      marginBottom: '20px'
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Consultation Priority Class"), /*#__PURE__*/React.createElement("div", {
    className: "priority-options"
  }, /*#__PURE__*/React.createElement("div", {
    className: `priority-btn ${formData.priority === 'Regular' ? 'active' : ''}`,
    onClick: () => handlePrioritySelect('Regular')
  }, "\uD83E\uDE7A Standard OP Consultation"), /*#__PURE__*/React.createElement("div", {
    className: `priority-btn ${formData.priority === 'Senior Citizen' ? 'active' : ''}`,
    onClick: () => handlePrioritySelect('Senior Citizen')
  }, "\uD83D\uDC74 Senior Citizen (Fast-Track)"), /*#__PURE__*/React.createElement("div", {
    className: `priority-btn urgent ${formData.priority === 'Emergency' ? 'active' : ''}`,
    onClick: () => handlePrioritySelect('Emergency')
  }, "\uD83D\uDEA8 Acute / Triage Urgent"))), /*#__PURE__*/React.createElement("div", {
    className: "form-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Patient Full Name ", /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*")), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "patientName",
    className: "form-input",
    placeholder: "e.g. Rahul Sharma",
    value: formData.patientName,
    onChange: handleChange
  }), errors.patientName && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--rose)',
      fontSize: '0.78rem'
    }
  }, errors.patientName)), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Age & Gender ", /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    name: "age",
    className: "form-input",
    placeholder: "Age (e.g. 34)",
    value: formData.age,
    onChange: handleChange
  }), /*#__PURE__*/React.createElement("select", {
    name: "gender",
    className: "form-select",
    value: formData.gender,
    onChange: handleChange
  }, /*#__PURE__*/React.createElement("option", {
    value: "Male"
  }, "Male"), /*#__PURE__*/React.createElement("option", {
    value: "Female"
  }, "Female"), /*#__PURE__*/React.createElement("option", {
    value: "Other"
  }, "Other"))), errors.age && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--rose)',
      fontSize: '0.78rem'
    }
  }, errors.age)), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Contact Number ", /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*")), /*#__PURE__*/React.createElement("input", {
    type: "tel",
    name: "phone",
    className: "form-input",
    placeholder: "e.g. 9876543210",
    value: formData.phone,
    onChange: handleChange
  }), errors.phone && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--rose)',
      fontSize: '0.78rem'
    }
  }, errors.phone)), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Blood Group"), /*#__PURE__*/React.createElement("select", {
    name: "bloodGroup",
    className: "form-select",
    value: formData.bloodGroup,
    onChange: handleChange
  }, /*#__PURE__*/React.createElement("option", {
    value: "A+"
  }, "A +ve"), /*#__PURE__*/React.createElement("option", {
    value: "A-"
  }, "A -ve"), /*#__PURE__*/React.createElement("option", {
    value: "B+"
  }, "B +ve"), /*#__PURE__*/React.createElement("option", {
    value: "B-"
  }, "B -ve"), /*#__PURE__*/React.createElement("option", {
    value: "O+"
  }, "O +ve"), /*#__PURE__*/React.createElement("option", {
    value: "O-"
  }, "O -ve"), /*#__PURE__*/React.createElement("option", {
    value: "AB+"
  }, "AB +ve"), /*#__PURE__*/React.createElement("option", {
    value: "AB-"
  }, "AB -ve"))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Select OPD Department ", /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*")), /*#__PURE__*/React.createElement("select", {
    name: "departmentCode",
    className: "form-select",
    value: formData.departmentCode,
    onChange: handleChange
  }, departments.map(d => /*#__PURE__*/React.createElement("option", {
    key: d.id,
    value: d.code
  }, d.name, " (", d.room, ")")))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Consulting Doctor (Optional)"), /*#__PURE__*/React.createElement("select", {
    name: "doctor",
    className: "form-select",
    value: formData.doctor,
    onChange: handleChange
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Any Available Specialist"), availableDoctors.map(doc => /*#__PURE__*/React.createElement("option", {
    key: doc.id,
    value: doc.name
  }, doc.name, " - ", doc.degrees.split(',')[0], " (", doc.fee, ")")))), /*#__PURE__*/React.createElement("div", {
    className: "form-group full-width"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Chief Complaint / Symptoms"), /*#__PURE__*/React.createElement("textarea", {
    name: "symptoms",
    className: "form-textarea",
    placeholder: "Briefly describe symptoms (e.g. Chest tightness, joint pain, fever, cough since 2 days)...",
    value: formData.symptoms,
    onChange: handleChange
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '28px',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-secondary",
    onClick: () => setFormData({
      patientName: 'Kunal Kapoor',
      age: '38',
      gender: 'Male',
      phone: '9845012345',
      bloodGroup: 'O+',
      departmentCode: 'CAR',
      doctor: 'Dr. Ananya Iyer',
      symptoms: 'Mild palpitation after running, regular checkup',
      priority: 'Regular'
    }),
    title: "Auto-fill realistic details for quick testing"
  }, "\u26A1 Fill Demo Data"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    style: {
      padding: '12px 28px'
    }
  }, "Generate Digital OP Token Slip \u25B6")))));
}

// --- src/components/TokenSlip.jsx ---

function TokenSlip({
  tokenData,
  onBackToQueue,
  onNewRegistration
}) {
  if (!tokenData) return null;
  const handlePrint = () => {
    window.print();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "token-slip-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: '16px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--emerald-light)',
      color: '#065f46',
      padding: '6px 16px',
      borderRadius: 'var(--radius-full)',
      fontWeight: 700,
      fontSize: '0.85rem'
    }
  }, "\u2713 Registration Completed Successfully")), /*#__PURE__*/React.createElement("div", {
    className: "token-slip-container",
    id: "printable-slip"
  }, /*#__PURE__*/React.createElement("div", {
    className: "token-slip-header"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      marginBottom: '4px'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "slip-hospital-title"
  }, "PULSECARE HEALTH CITY")), /*#__PURE__*/React.createElement("p", {
    className: "slip-tagline"
  }, "NABH Accredited Tertiary Care Center \u2022 Outpatient Department (OPD)"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '0.72rem',
      color: '#94a3b8',
      marginTop: '2px'
    }
  }, "Central OPD Wing, Level 1 \u2022 Helpdesk: +91 80 2400 1100")), /*#__PURE__*/React.createElement("div", {
    className: "token-hero-badge"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.78rem',
      fontWeight: 700,
      color: 'var(--text-muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em'
    }
  }, "OUTPATIENT CONSULTATION TOKEN"), /*#__PURE__*/React.createElement("div", {
    className: "token-number-hero"
  }, tokenData.token), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: tokenData.priority === 'Emergency' ? 'var(--rose-light)' : 'var(--primary-light)',
      color: tokenData.priority === 'Emergency' ? '#b91c1c' : 'var(--primary-hover)',
      padding: '2px 10px',
      borderRadius: 'var(--radius-full)',
      fontSize: '0.75rem',
      fontWeight: 700
    }
  }, tokenData.priority, " Queue"), /*#__PURE__*/React.createElement("span", {
    style: {
      background: '#f1f5f9',
      color: '#475569',
      padding: '2px 10px',
      borderRadius: 'var(--radius-full)',
      fontSize: '0.75rem',
      fontWeight: 600
    }
  }, "Est. Time: ", tokenData.estimatedTime || '15-20 Mins'))), /*#__PURE__*/React.createElement("div", {
    className: "token-slip-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "slip-detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "slip-label"
  }, "OP Registration ID:"), /*#__PURE__*/React.createElement("span", {
    className: "slip-val"
  }, tokenData.opId || 'OP-2026-9041')), /*#__PURE__*/React.createElement("div", {
    className: "slip-detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "slip-label"
  }, "Patient Name:"), /*#__PURE__*/React.createElement("span", {
    className: "slip-val"
  }, tokenData.patientName)), /*#__PURE__*/React.createElement("div", {
    className: "slip-detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "slip-label"
  }, "Age / Gender / Blood:"), /*#__PURE__*/React.createElement("span", {
    className: "slip-val"
  }, tokenData.age, " Yrs / ", tokenData.gender, " / ", tokenData.bloodGroup)), /*#__PURE__*/React.createElement("div", {
    className: "slip-detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "slip-label"
  }, "Contact Mobile:"), /*#__PURE__*/React.createElement("span", {
    className: "slip-val"
  }, tokenData.phone)), /*#__PURE__*/React.createElement("div", {
    className: "slip-detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "slip-label"
  }, "Department:"), /*#__PURE__*/React.createElement("span", {
    className: "slip-val"
  }, tokenData.departmentName)), /*#__PURE__*/React.createElement("div", {
    className: "slip-detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "slip-label"
  }, "Consulting Doctor:"), /*#__PURE__*/React.createElement("span", {
    className: "slip-val"
  }, tokenData.doctor)), /*#__PURE__*/React.createElement("div", {
    className: "slip-detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "slip-label"
  }, "Assigned Room:"), /*#__PURE__*/React.createElement("span", {
    className: "slip-val",
    style: {
      color: 'var(--primary)'
    }
  }, tokenData.room)), /*#__PURE__*/React.createElement("div", {
    className: "slip-detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "slip-label"
  }, "Registered At:"), /*#__PURE__*/React.createElement("span", {
    className: "slip-val"
  }, new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  }), " (05-Sep-2026)")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '20px',
      textAlign: 'center',
      borderTop: '1px dashed #cbd5e1',
      paddingTop: '16px'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "240",
    height: "42",
    viewBox: "0 0 240 42",
    style: {
      display: 'inline-block'
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "0",
    width: "4",
    height: "40",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "8",
    y: "0",
    width: "2",
    height: "40",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "0",
    width: "6",
    height: "40",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "24",
    y: "0",
    width: "3",
    height: "40",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "32",
    y: "0",
    width: "8",
    height: "40",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "44",
    y: "0",
    width: "3",
    height: "40",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "52",
    y: "0",
    width: "5",
    height: "40",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "62",
    y: "0",
    width: "2",
    height: "40",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "68",
    y: "0",
    width: "7",
    height: "40",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "80",
    y: "0",
    width: "4",
    height: "40",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "90",
    y: "0",
    width: "6",
    height: "40",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "100",
    y: "0",
    width: "2",
    height: "40",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "108",
    y: "0",
    width: "5",
    height: "40",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "118",
    y: "0",
    width: "7",
    height: "40",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "130",
    y: "0",
    width: "3",
    height: "40",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "138",
    y: "0",
    width: "6",
    height: "40",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "150",
    y: "0",
    width: "2",
    height: "40",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "158",
    y: "0",
    width: "8",
    height: "40",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "172",
    y: "0",
    width: "4",
    height: "40",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "182",
    y: "0",
    width: "5",
    height: "40",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "194",
    y: "0",
    width: "3",
    height: "40",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "202",
    y: "0",
    width: "7",
    height: "40",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "214",
    y: "0",
    width: "4",
    height: "40",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "224",
    y: "0",
    width: "6",
    height: "40",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "234",
    y: "0",
    width: "4",
    height: "40",
    fill: "#0f172a"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.74rem',
      color: 'var(--text-muted)',
      letterSpacing: '0.12em',
      marginTop: '4px'
    }
  }, "*", tokenData.opId || 'OP-2026-9041', "*"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '0.75rem',
      color: '#64748b',
      marginTop: '10px',
      fontStyle: 'italic'
    }
  }, "Please be seated in the ", /*#__PURE__*/React.createElement("strong", null, tokenData.departmentName, " Waiting Lounge"), ". When your token is called on the lobby screen, proceed inside."))), /*#__PURE__*/React.createElement("div", {
    className: "token-slip-footer"
  }, /*#__PURE__*/React.createElement("span", null, "Valid for today's OPD consultation only."), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700
    }
  }, "PulseCare OPD Desk"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      gap: '14px',
      marginTop: '20px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: handlePrint
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 6 2 18 2 18 9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "12",
    height: "8",
    x: "6",
    y: "14"
  })), "Print / Save Token Slip"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: onBackToQueue
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "20",
    height: "14",
    x: "2",
    y: "3",
    rx: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    x2: "16",
    y1: "21",
    y2: "21"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    x2: "12",
    y1: "17",
    y2: "21"
  })), "Track in Live Queue"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: onNewRegistration
  }, "+ Register Another Patient")));
}

// --- src/components/DoctorDirectory.jsx ---

function DoctorDirectory({
  doctors,
  onSelectDoctorForBooking
}) {
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const departments = [{
    code: 'ALL',
    label: 'All Specialties'
  }, {
    code: 'CAR',
    label: 'Cardiology'
  }, {
    code: 'ORT',
    label: 'Orthopedics'
  }, {
    code: 'GEN',
    label: 'General Medicine'
  }, {
    code: 'PED',
    label: 'Pediatrics'
  }, {
    code: 'DER',
    label: 'Dermatology'
  }, {
    code: 'ENT',
    label: 'ENT Clinic'
  }];
  const filteredDoctors = doctors.filter(doc => {
    const matchesDept = selectedDept === 'ALL' || doc.depCode === selectedDept;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || doc.department.toLowerCase().includes(searchQuery.toLowerCase()) || doc.focus.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "doctors-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "\uD83D\uDC68\u200D\u2695\uFE0F Specialist Doctors & OPD Schedule"), /*#__PURE__*/React.createElement("p", null, "Consult with our board-certified senior consultants across specialized outpatient cabins.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-input",
    placeholder: "Search doctor or clinical focus...",
    value: searchQuery,
    onChange: e => setSearchQuery(e.target.value),
    style: {
      width: '260px'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
      marginBottom: '24px'
    }
  }, departments.map(dept => /*#__PURE__*/React.createElement("button", {
    key: dept.code,
    className: `btn btn-sm ${selectedDept === dept.code ? 'btn-primary' : 'btn-secondary'}`,
    onClick: () => setSelectedDept(dept.code)
  }, dept.label))), /*#__PURE__*/React.createElement("div", {
    className: "doctors-grid"
  }, filteredDoctors.map(doc => /*#__PURE__*/React.createElement("div", {
    key: doc.id,
    className: "doctor-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "doctor-top-row"
  }, /*#__PURE__*/React.createElement("img", {
    src: doc.image,
    alt: doc.name,
    className: "doc-avatar"
  }), /*#__PURE__*/React.createElement("div", {
    className: "doc-info"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "doc-name"
  }, doc.name), /*#__PURE__*/React.createElement("span", {
    className: "doc-dep-chip"
  }, doc.department), /*#__PURE__*/React.createElement("p", {
    className: "doc-degrees"
  }, doc.degrees), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.78rem',
      color: '#059669',
      fontWeight: 600,
      marginTop: '4px'
    }
  }, "\u2605 ", doc.rating, " \u2022 ", doc.experience, " Experience"))), /*#__PURE__*/React.createElement("div", {
    className: "doc-middle-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "doc-meta-item"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--primary)',
      fontWeight: 600
    }
  }, "\uD83D\uDCCD Cabin:"), /*#__PURE__*/React.createElement("span", null, doc.cabin)), /*#__PURE__*/React.createElement("div", {
    className: "doc-meta-item"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--primary)',
      fontWeight: 600
    }
  }, "\u23F0 OPD Hours:"), /*#__PURE__*/React.createElement("span", null, doc.opdTimings)), /*#__PURE__*/React.createElement("div", {
    className: "doc-meta-item"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--primary)',
      fontWeight: 600
    }
  }, "\uD83D\uDDE3\uFE0F Speaks:"), /*#__PURE__*/React.createElement("span", null, doc.languages)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-muted)',
      marginTop: '8px',
      borderTop: '1px solid #f1f5f9',
      paddingTop: '6px'
    }
  }, /*#__PURE__*/React.createElement("strong", null, "Clinical Focus:"), " ", doc.focus)), /*#__PURE__*/React.createElement("div", {
    className: "doctor-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "doc-fee"
  }, doc.fee, " ", /*#__PURE__*/React.createElement("span", null, "/ Consultation")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm",
    onClick: () => onSelectDoctorForBooking(doc)
  }, "Book OP Token \u25B6"))))));
}

// --- src/components/PatientPortal.jsx ---

function PatientPortal({
  records,
  initialToken
}) {
  const [searchToken, setSearchToken] = useState(initialToken || 'CAR-104');
  const [activeRecord, setActiveRecord] = useState(records[searchToken] || records['CAR-104']);
  const handleSearch = tokenToFind => {
    const key = (tokenToFind || searchToken).trim().toUpperCase();
    if (records[key]) {
      setActiveRecord(records[key]);
      setSearchToken(key);
    } else {
      alert(`No outpatient record found for Token ID "${key}". Try demo tokens: CAR-104, GEN-211, or ORT-082.`);
    }
  };
  const handlePrintRx = () => {
    window.print();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "portal-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "\uD83D\uDCCB Patient OP Medical Records & E-Prescription"), /*#__PURE__*/React.createElement("p", null, "Retrieve consultation notes, clinical vitals, digital prescriptions, and laboratory orders."))), /*#__PURE__*/React.createElement("div", {
    className: "lookup-box"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.82rem',
      fontWeight: 700,
      color: 'var(--text-muted)',
      display: 'block',
      marginBottom: '6px'
    }
  }, "ENTER OP TOKEN NUMBER OR REGISTRATION ID:"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-input",
    placeholder: "e.g. CAR-104 or GEN-211",
    value: searchToken,
    onChange: e => setSearchToken(e.target.value),
    style: {
      fontSize: '1.05rem',
      fontWeight: 700,
      letterSpacing: '0.04em'
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => handleSearch(searchToken)
  }, "Fetch OP Record \u25B6")), /*#__PURE__*/React.createElement("div", {
    className: "quick-tokens-list"
  }, /*#__PURE__*/React.createElement("span", null, "Quick Demo Patients:"), /*#__PURE__*/React.createElement("button", {
    className: "quick-token-chip",
    onClick: () => handleSearch('CAR-104')
  }, "CAR-104 (Rajesh Kumar - Cardiology)"), /*#__PURE__*/React.createElement("button", {
    className: "quick-token-chip",
    onClick: () => handleSearch('GEN-211')
  }, "GEN-211 (Gopal Krishna - General Med)"), /*#__PURE__*/React.createElement("button", {
    className: "quick-token-chip",
    onClick: () => handleSearch('ORT-082')
  }, "ORT-082 (David D'Souza - Orthopedics)")))), activeRecord && /*#__PURE__*/React.createElement("div", {
    className: "prescription-card",
    id: "printable-rx"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      borderBottom: '2px solid var(--border)',
      paddingBottom: '20px',
      marginBottom: '20px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '1.4rem'
    }
  }, "\uD83C\uDFE5"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: '1.3rem',
      fontWeight: 800,
      color: 'var(--dark)'
    }
  }, "PULSECARE HEALTH CITY"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.8rem',
      color: 'var(--text-muted)'
    }
  }, "Outpatient Department \u2022 Consultation Record & E-Prescription")))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--primary-light)',
      color: 'var(--primary)',
      fontWeight: 800,
      fontSize: '1rem',
      padding: '4px 12px',
      borderRadius: '8px'
    }
  }, "Token: ", activeRecord.token), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-muted)',
      marginTop: '4px'
    }
  }, "OP ID: ", /*#__PURE__*/React.createElement("strong", null, activeRecord.opId), " | Date: ", /*#__PURE__*/React.createElement("strong", null, activeRecord.visitDate)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
      background: 'var(--bg-alt)',
      padding: '16px 20px',
      borderRadius: 'var(--radius-md)',
      marginBottom: '24px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.76rem',
      fontWeight: 700,
      color: 'var(--text-muted)',
      textTransform: 'uppercase'
    }
  }, "Patient Information"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '1.05rem',
      fontWeight: 700,
      color: 'var(--dark)',
      marginTop: '2px'
    }
  }, activeRecord.patientName, " (", activeRecord.age, " Yrs / ", activeRecord.gender, ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.82rem',
      color: '#475569'
    }
  }, "Contact: ", activeRecord.phone, " | Blood: ", /*#__PURE__*/React.createElement("strong", null, activeRecord.bloodGroup))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.76rem',
      fontWeight: 700,
      color: 'var(--text-muted)',
      textTransform: 'uppercase'
    }
  }, "Attending Specialist"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '1.05rem',
      fontWeight: 700,
      color: 'var(--dark)',
      marginTop: '2px'
    }
  }, activeRecord.doctor), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.82rem',
      color: '#475569'
    }
  }, activeRecord.department, " \u2022 ", /*#__PURE__*/React.createElement("strong", null, activeRecord.room)))), /*#__PURE__*/React.createElement("h4", {
    style: {
      fontSize: '0.92rem',
      fontWeight: 700,
      color: 'var(--dark)',
      marginBottom: '10px'
    }
  }, "\uD83E\uDE7A Recorded OP Clinical Vitals"), /*#__PURE__*/React.createElement("div", {
    className: "vitals-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vital-tile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vital-label"
  }, "Blood Pressure"), /*#__PURE__*/React.createElement("div", {
    className: "vital-val",
    style: {
      color: '#0284c7'
    }
  }, activeRecord.vitals.bp), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--text-muted)'
    }
  }, "Target: 120/80")), /*#__PURE__*/React.createElement("div", {
    className: "vital-tile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vital-label"
  }, "Pulse / Heart Rate"), /*#__PURE__*/React.createElement("div", {
    className: "vital-val",
    style: {
      color: '#10b981'
    }
  }, activeRecord.vitals.pulse), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--text-muted)'
    }
  }, "Regular Sinus")), /*#__PURE__*/React.createElement("div", {
    className: "vital-tile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vital-label"
  }, "Oxygen SpO2"), /*#__PURE__*/React.createElement("div", {
    className: "vital-val",
    style: {
      color: '#0d9488'
    }
  }, activeRecord.vitals.spo2), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--text-muted)'
    }
  }, "Room Air")), /*#__PURE__*/React.createElement("div", {
    className: "vital-tile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vital-label"
  }, "Body Temp"), /*#__PURE__*/React.createElement("div", {
    className: "vital-val"
  }, activeRecord.vitals.temp), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--text-muted)'
    }
  }, "Oral Digital")), /*#__PURE__*/React.createElement("div", {
    className: "vital-tile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vital-label"
  }, "Weight"), /*#__PURE__*/React.createElement("div", {
    className: "vital-val"
  }, activeRecord.vitals.weight), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--text-muted)'
    }
  }, "Electronic Scale")), /*#__PURE__*/React.createElement("div", {
    className: "vital-tile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vital-label"
  }, "BMI Ratio"), /*#__PURE__*/React.createElement("div", {
    className: "vital-val",
    style: {
      fontSize: '1.05rem'
    }
  }, activeRecord.vitals.bmi), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--text-muted)'
    }
  }, "Body Mass Index"))), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '20px 0',
      padding: '16px',
      background: '#f8fafc',
      borderLeft: '4px solid var(--primary)',
      borderRadius: '0 8px 8px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.82rem',
      fontWeight: 700,
      color: 'var(--text-muted)'
    }
  }, "CHIEF COMPLAINT:"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '0.9rem',
      color: 'var(--text-main)',
      marginTop: '2px',
      marginBottom: '8px'
    }
  }, activeRecord.symptoms), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.82rem',
      fontWeight: 700,
      color: 'var(--primary)'
    }
  }, "PROVISIONAL DIAGNOSIS:"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '0.98rem',
      fontWeight: 700,
      color: 'var(--dark)',
      marginTop: '2px'
    }
  }, activeRecord.diagnosis)), /*#__PURE__*/React.createElement("h4", {
    style: {
      fontSize: '0.95rem',
      fontWeight: 800,
      color: 'var(--dark)',
      marginTop: '26px'
    }
  }, "\uD83D\uDC8A Prescribed Medications (Rx)"), /*#__PURE__*/React.createElement("table", {
    className: "rx-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "#"), /*#__PURE__*/React.createElement("th", null, "Medicine & Strength"), /*#__PURE__*/React.createElement("th", null, "Dosage Frequency"), /*#__PURE__*/React.createElement("th", null, "Instructions / Timing"), /*#__PURE__*/React.createElement("th", null, "Duration"))), /*#__PURE__*/React.createElement("tbody", null, activeRecord.prescription.map((med, idx) => /*#__PURE__*/React.createElement("tr", {
    key: idx
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, idx + 1)), /*#__PURE__*/React.createElement("td", {
    style: {
      fontWeight: 700,
      color: 'var(--dark)'
    }
  }, med.medicine), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--primary-light)',
      color: 'var(--primary)',
      padding: '2px 8px',
      borderRadius: '4px',
      fontWeight: 700
    }
  }, med.timing)), /*#__PURE__*/React.createElement("td", null, med.instruction), /*#__PURE__*/React.createElement("td", {
    style: {
      fontWeight: 600
    }
  }, med.duration))))), activeRecord.recommendedTests && activeRecord.recommendedTests.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '20px'
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontSize: '0.92rem',
      fontWeight: 700,
      color: 'var(--dark)',
      marginBottom: '10px'
    }
  }, "\uD83D\uDD2C Outpatient Investigations & Diagnostic Orders"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap'
    }
  }, activeRecord.recommendedTests.map((t, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    style: {
      background: '#f8fafc',
      border: '1px solid var(--border)',
      padding: '8px 14px',
      borderRadius: '8px',
      fontSize: '0.82rem'
    }
  }, /*#__PURE__*/React.createElement("strong", null, t.testName), ": ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#0d9488'
    }
  }, t.status))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '22px',
      borderTop: '1px solid var(--border)',
      paddingTop: '16px'
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontSize: '0.85rem',
      fontWeight: 700,
      color: 'var(--text-muted)'
    }
  }, "PHYSICIAN LIFESTYLE & FOLLOW-UP INSTRUCTIONS:"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '0.88rem',
      color: '#334155',
      marginTop: '4px'
    }
  }, activeRecord.doctorNotes)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '24px',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-sm",
    onClick: handlePrintRx
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 6 2 18 2 18 9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "12",
    height: "8",
    x: "6",
    y: "14"
  })), "Print OP Prescription"))));
}

// --- src/components/StaffDashboard.jsx ---

function StaffDashboard({
  departments,
  onCallNext,
  onCompleteConsultation,
  onAddUrgentPatient,
  onResetDemo
}) {
  const totalWaiting = departments.reduce((acc, d) => acc + d.queue.length, 0);
  return /*#__PURE__*/React.createElement("div", {
    className: "staff-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "\uD83C\uDF9B\uFE0F Hospital OPD Desk & Queue Controller (Demo Mode)"), /*#__PURE__*/React.createElement("p", null, "Simulate outpatient operations: call next token, admit emergency walk-ins, and inspect live doctor cabin queues.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-sm",
    onClick: onResetDemo
  }, "\uD83D\uDD04 Reset Demo Queues"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '16px',
      marginBottom: '24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "vital-tile",
    style: {
      borderLeft: '4px solid var(--primary)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "vital-label"
  }, "Active OPD Cabins"), /*#__PURE__*/React.createElement("div", {
    className: "vital-val",
    style: {
      color: 'var(--primary)'
    }
  }, departments.length, " Rooms")), /*#__PURE__*/React.createElement("div", {
    className: "vital-tile",
    style: {
      borderLeft: '4px solid var(--amber)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "vital-label"
  }, "Patients in Waiting Line"), /*#__PURE__*/React.createElement("div", {
    className: "vital-val",
    style: {
      color: 'var(--amber)'
    }
  }, totalWaiting, " Patients")), /*#__PURE__*/React.createElement("div", {
    className: "vital-tile",
    style: {
      borderLeft: '4px solid var(--emerald)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "vital-label"
  }, "Consultations Completed"), /*#__PURE__*/React.createElement("div", {
    className: "vital-val",
    style: {
      color: 'var(--emerald)'
    }
  }, "284 Done")), /*#__PURE__*/React.createElement("div", {
    className: "vital-tile",
    style: {
      borderLeft: '4px solid var(--rose)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "vital-label"
  }, "Fast-Track / Triage"), /*#__PURE__*/React.createElement("div", {
    className: "vital-val",
    style: {
      color: 'var(--rose)'
    }
  }, "Active 24x7"))), /*#__PURE__*/React.createElement("div", {
    className: "staff-console-card"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: '1.15rem',
      fontWeight: 800,
      color: 'var(--dark)'
    }
  }, "Live Cabin Queue Status & Dispatcher"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.8rem',
      color: 'var(--text-muted)'
    }
  }, "Click \"Call Next Token\" to advance room queue & broadcast announcement chime.")), /*#__PURE__*/React.createElement("table", {
    className: "staff-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "OPD Room & Department"), /*#__PURE__*/React.createElement("th", null, "Attending Doctor"), /*#__PURE__*/React.createElement("th", null, "Now In Cabin"), /*#__PURE__*/React.createElement("th", null, "Next Up"), /*#__PURE__*/React.createElement("th", null, "In Waiting"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'right'
    }
  }, "Demo Queue Actions"))), /*#__PURE__*/React.createElement("tbody", null, departments.map(dep => /*#__PURE__*/React.createElement("tr", {
    key: dep.id
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, dep.room), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-muted)'
    }
  }, dep.name)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, dep.doctor), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-muted)'
    }
  }, dep.specialty)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Space Grotesk, sans-serif',
      fontWeight: 800,
      fontSize: '1.1rem',
      color: 'var(--primary)',
      background: 'var(--primary-light)',
      padding: '2px 8px',
      borderRadius: '6px'
    }
  }, dep.currentToken || 'Empty')), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: 'var(--dark)'
    }
  }, dep.nextToken || 'None')), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: dep.queue.length > 3 ? 'var(--amber)' : 'inherit'
    }
  }, dep.queue.length, " patients")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: `status-indicator ${dep.statusColor || 'emerald'}`
  }, dep.status)), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm",
    onClick: () => onCallNext(dep.id),
    disabled: dep.queue.length === 0,
    title: "Advance token & ring chime",
    style: {
      opacity: dep.queue.length === 0 ? 0.5 : 1
    }
  }, "\u25B6 Call Next Token"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-sm",
    onClick: () => onAddUrgentPatient(dep.id),
    title: "Inject an urgent triage patient to front of queue"
  }, "+ Fast-Track Triage")))))))));
}

// --- src/components/Footer.jsx ---

function Footer({
  setActiveTab
}) {
  return /*#__PURE__*/React.createElement("footer", {
    className: "hospital-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-col"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo-badge",
    style: {
      width: '36px',
      height: '36px'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
  }))), /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'white',
      fontSize: '1.2rem',
      fontWeight: 800
    }
  }, "PulseCare Health City")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '0.85rem',
      color: '#94a3b8',
      lineHeight: 1.6,
      marginBottom: '14px'
    }
  }, "A premier multi-speciality tertiary hospital and outpatient center dedicated to fast, compassionate, and digital clinical excellence. NABH and NABL accredited."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: '#1e293b',
      border: '1px solid #334155',
      color: '#38bdf8',
      padding: '3px 10px',
      borderRadius: '4px',
      fontSize: '0.74rem',
      fontWeight: 700
    }
  }, "NABH ACCREDITED"), /*#__PURE__*/React.createElement("span", {
    style: {
      background: '#1e293b',
      border: '1px solid #334155',
      color: '#34d399',
      padding: '3px 10px',
      borderRadius: '4px',
      fontSize: '0.74rem',
      fontWeight: 700
    }
  }, "NABL CERTIFIED LABS"), /*#__PURE__*/React.createElement("span", {
    style: {
      background: '#1e293b',
      border: '1px solid #334155',
      color: '#f59e0b',
      padding: '3px 10px',
      borderRadius: '4px',
      fontSize: '0.74rem',
      fontWeight: 700
    }
  }, "ISO 9001:2015"))), /*#__PURE__*/React.createElement("div", {
    className: "footer-col"
  }, /*#__PURE__*/React.createElement("h4", null, "OPD Navigation"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#queue",
    onClick: e => {
      e.preventDefault();
      setActiveTab('queue');
    },
    style: {
      color: '#94a3b8',
      textDecoration: 'none'
    }
  }, "Live Token Queue Display")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#register",
    onClick: e => {
      e.preventDefault();
      setActiveTab('register');
    },
    style: {
      color: '#94a3b8',
      textDecoration: 'none'
    }
  }, "Patient OP Registration")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#doctors",
    onClick: e => {
      e.preventDefault();
      setActiveTab('doctors');
    },
    style: {
      color: '#94a3b8',
      textDecoration: 'none'
    }
  }, "Consultant Doctors Schedule")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#records",
    onClick: e => {
      e.preventDefault();
      setActiveTab('records');
    },
    style: {
      color: '#94a3b8',
      textDecoration: 'none'
    }
  }, "Prescription & Vitals Portal")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#staff",
    onClick: e => {
      e.preventDefault();
      setActiveTab('staff');
    },
    style: {
      color: '#94a3b8',
      textDecoration: 'none'
    }
  }, "OPD Desk Admin Console")))), /*#__PURE__*/React.createElement("div", {
    className: "footer-col"
  }, /*#__PURE__*/React.createElement("h4", null, "Specialties"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Cardiology & Cath Lab"), /*#__PURE__*/React.createElement("li", null, "Orthopedics & Joint Care"), /*#__PURE__*/React.createElement("li", null, "General & Internal Medicine"), /*#__PURE__*/React.createElement("li", null, "Pediatrics & Neonatology"), /*#__PURE__*/React.createElement("li", null, "Dermatology & Skin Clinic"), /*#__PURE__*/React.createElement("li", null, "ENT & Head-Neck Surgery"))), /*#__PURE__*/React.createElement("div", {
    className: "footer-col"
  }, /*#__PURE__*/React.createElement("h4", null, "Emergency & Helpdesk"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#ef4444'
    }
  }, "24x7 Ambulance:"), " 1800-419-9999"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "OPD Helpdesk:"), " +91 80 2400 1100"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Email:"), " opd.desk@pulsecarehospital.com"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Address:"), " Health City Campus, Medical Center Blvd, Sector 4"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "OPD Timings:"), " Mon - Sat: 8:00 AM - 8:00 PM (Sun Emergency Only)")))), /*#__PURE__*/React.createElement("div", {
    className: "footer-bottom"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 PulseCare Health City. Demo Outpatient Management System."), /*#__PURE__*/React.createElement("span", null, "Built with React.js \u2022 Secure HIPAA & EHR Standards Compliant Demo")));
}

// --- src/App.jsx ---

function App() {
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
  const handleCallNext = depId => {
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
  const handleRegisterSuccess = formData => {
    const nextNum = tokenCounter + 1;
    setTokenCounter(nextNum);
    const generatedToken = `${formData.departmentCode}-${String(nextNum).padStart(3, '0')}`;
    const generatedOpId = `OP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newQueueItem = {
      token: generatedToken,
      patientName: formData.patientName,
      status: 'Waiting',
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),
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
      prescription: [{
        medicine: 'Multivitamin & Zinc Tab',
        timing: '1 - 0 - 0',
        instruction: 'Once daily after breakfast',
        duration: '15 Days'
      }, {
        medicine: 'Hydration Oral Salts (ORS)',
        timing: 'As Needed',
        instruction: 'Dissolve in 1L fresh drinking water',
        duration: '3 Days'
      }],
      recommendedTests: [{
        testName: 'Standard Vitals & Screening',
        status: 'Completed at Triage Desk'
      }, {
        testName: 'Consultant Clinical Examination',
        status: 'In Waiting Queue'
      }],
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
  const handleAddUrgentPatient = depId => {
    const dep = departments.find(d => d.id === depId);
    if (!dep) return;
    const nextNum = tokenCounter + 1;
    setTokenCounter(nextNum);
    const emergencyToken = `${dep.code}-EMG-${nextNum}`;
    const emergencyPatient = {
      token: emergencyToken,
      patientName: 'Priority Walk-in (Triage)',
      status: 'Urgent',
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),
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
  const handleSelectDoctorForBooking = doc => {
    setActiveTab('register');
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "app-wrapper"
  }, /*#__PURE__*/React.createElement(Navbar, {
    activeTab: activeTab,
    setActiveTab: setActiveTab,
    onOpenRegister: () => setActiveTab('register'),
    waitingTotal: waitingTotal
  }), activeTab === 'overview' && /*#__PURE__*/React.createElement(HeroSection, {
    setActiveTab: setActiveTab,
    onOpenRegister: () => setActiveTab('register'),
    waitingTotal: waitingTotal,
    activeDoctorsCount: doctors.length
  }), /*#__PURE__*/React.createElement("main", {
    className: "main-content"
  }, activeTab === 'overview' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(QueueBoard, {
    departments: departments,
    onCallNext: handleCallNext,
    activeAlertToken: activeAlertToken,
    onPlayChime: playHospitalChime
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '48px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "\uD83D\uDC68\u200D\u2695\uFE0F Today's Available OPD Specialists"), /*#__PURE__*/React.createElement("p", null, "Our senior doctors are on duty across consulting cabins today.")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-sm",
    onClick: () => setActiveTab('doctors')
  }, "View Full Doctor Directory & Hours \u25B6")), /*#__PURE__*/React.createElement(DoctorDirectory, {
    doctors: doctors.slice(0, 3),
    onSelectDoctorForBooking: handleSelectDoctorForBooking
  }))), activeTab === 'queue' && /*#__PURE__*/React.createElement(QueueBoard, {
    departments: departments,
    onCallNext: handleCallNext,
    activeAlertToken: activeAlertToken,
    onPlayChime: playHospitalChime
  }), activeTab === 'register' && /*#__PURE__*/React.createElement(RegistrationForm, {
    departments: departments,
    doctors: doctors,
    onRegisterSuccess: handleRegisterSuccess
  }), activeTab === 'slip' && /*#__PURE__*/React.createElement(TokenSlip, {
    tokenData: lastGeneratedToken,
    onBackToQueue: () => setActiveTab('queue'),
    onNewRegistration: () => setActiveTab('register')
  }), activeTab === 'doctors' && /*#__PURE__*/React.createElement(DoctorDirectory, {
    doctors: doctors,
    onSelectDoctorForBooking: handleSelectDoctorForBooking
  }), activeTab === 'records' && /*#__PURE__*/React.createElement(PatientPortal, {
    records: records,
    initialToken: lastGeneratedToken ? lastGeneratedToken.token : 'CAR-104'
  }), activeTab === 'staff' && /*#__PURE__*/React.createElement(StaffDashboard, {
    departments: departments,
    onCallNext: handleCallNext,
    onAddUrgentPatient: handleAddUrgentPatient,
    onResetDemo: handleResetDemo
  })), /*#__PURE__*/React.createElement(Footer, {
    setActiveTab: setActiveTab
  }));
}

// --- Mount to DOM ---
const rootContainer = document.getElementById('root');
if (rootContainer) {
  const root = ReactDOM.createRoot(rootContainer);
  root.render(React.createElement(App));
}