# 🚩 Mana Vooru Utsavam (మన ఊరు ఉత్సవం)

A modern, mobile-first community web portal and Progressive Web App (PWA) for Indian village festivals (Vinayaka Chavithi, Sankranti, Dasara, Diwali, etc.).

---

## ✨ Key Capabilities

1. **📸 Festival Photo Memories Gallery**:
   - Upload photos directly from mobile cameras.
   - Client-side canvas compression to store high-res photos without exhausting browser storage.
   - Category filtering (*Pooja & Mandapam*, *Laddu Auction*, *Annadanam*, *Nimajjanam Procession*).
   - Full-screen lightbox viewer with download and delete options.

2. **💰 Vinayaka Chavithi Expenses & Smart Splitter**:
   - Categorized tracking: Vigraham, Mandapam, Sound & DJ, Pooja & Pandit, Annadanam, Laddu, Nimajjanam, and Misc.
   - **Automated Equal Split**: Computes exact per-person fair share (`Total Expenses ÷ Committee Members`).
   - **Settlement Matrix**: Solves "Who owes whom" with minimal peer-to-peer transfers.
   - **Laddu Auction Tracker**: Winner name, winning bid amount, and payment status.

3. **📜 Chanda / Donors Register**:
   - Family contribution directory with pledged vs paid amounts.
   - **1-Click WhatsApp Receipts**: Generates personalized Telugu WhatsApp receipt messages to send directly to donors.

4. **📢 Village Notice Board & WhatsApp Report**:
   - 1-Click formatted WhatsApp group summary with festival emojis.
   - Clean A4 printable audit statement for temple notice boards.
   - Complete JSON backup and restore.

5. **📲 Installable Mobile App (PWA)**:
   - Install directly to Android and iPhone home screens.
   - Fast offline caching via Service Worker.

---

## 🚀 How to Run Locally

1. Double-click `start_app.bat` or run:
   ```bash
   node server.cjs
   ```
2. Open in your browser:
   ```
   http://localhost:4000
   ```
3. Connect from any mobile phone on your Wi-Fi hotspot:
   ```
   http://<YOUR_PC_IP>:4000
   ```
