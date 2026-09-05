# PulseCare Health City — Hospital Outpatient (OP/OPD) Demo System

A modern, interactive Hospital Outpatient Management System and Patient Portal built with **React.js**.

## 🌟 Key Features for Demo:

1. **Live OPD Token Waiting Lobby Screen**:
   - Multi-room board displaying consulting cabins (Cardiology, Ortho, General Medicine, Pediatrics, Dermatology, ENT).
   - "Now Serving" vs "Next in Line" indicators.
   - Real-time sound chime synthesizer (via Web Audio API) when patients are called.
   - Live announcement alerts.

2. **Instant OP Patient Registration**:
   - Fast intake form with patient demographics, symptoms, and priority triage (Standard OP, Senior Citizen Fast-Track, Emergency Walk-in).
   - Instant generation of an authentic **Digital OP Token Slip** with barcode, token number, estimated time, and assigned cabin.
   - One-click print/PDF option.

3. **Consultant Doctors Schedule & Cabin Roster**:
   - Detailed doctor profile cards, specialties, qualifications, OPD morning/evening hours, and consultation fees.
   - Quick filter by medical department.
   - Direct "Book OP Token" shortcut.

4. **Patient OP Records & E-Prescription Viewer**:
   - Search by Token (e.g. `CAR-104`, `GEN-211`, `ORT-082`, or your newly registered token).
   - Recorded clinical vitals dashboard (Blood Pressure, Heart Rate, SpO2, Temperature, Weight, BMI).
   - Doctor's provisional diagnosis and digital prescription (Rx) table.
   - Recommended diagnostic and lab test orders.

5. **Hospital Staff & Queue Control Console (Demo Admin)**:
   - Interactive dispatcher console to advance queue tokens ("Call Next Patient").
   - Inject emergency triage patients to front of queue.
   - Reset demo queues.

---

## 🚀 How to Run Locally

### Option 1: Instant Launch (Zero Installation Required)
Using the built-in Python web server:
```bash
py -m http.server 3000
```
Then open [http://localhost:3000](http://localhost:3000) in any modern browser!

### Option 2: With Vite & Node.js
If Node.js is installed:
```bash
npm install
npm run dev
```
