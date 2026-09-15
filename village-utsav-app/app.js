/**
 * ============================================================================
 * MANA VOORU UTSAVAM // FESTIVAL HUB & CHANDA SPLITTER
 * Comprehensive Village Festival, Expense & Chanda Management Engine
 * ============================================================================
 */

(() => {
  'use strict';

  // --- STORAGE KEYS ---
  const STORAGE_PREFIX = 'mana_utsav_';
  const KEY_FESTIVAL = STORAGE_PREFIX + 'current_festival';
  const KEY_EXPENSES = STORAGE_PREFIX + 'expenses_';
  const KEY_CHANDA = STORAGE_PREFIX + 'chanda_';
  const KEY_MEMBERS = STORAGE_PREFIX + 'members_';
  const KEY_LADDU = STORAGE_PREFIX + 'laddu_';
  const KEY_PHOTOS = STORAGE_PREFIX + 'photos_';
  const KEY_THEME = STORAGE_PREFIX + 'theme';

  // --- STATE ---
  let currentFestival = localStorage.getItem(KEY_FESTIVAL) || 'vinayaka-chavithi-2026';
  let expenses = [];
  let chandaList = [];
  let committeeMembers = [];
  let ladduAuction = { winner: 'Sri Rama Rao', amount: 25000, status: 'PAID' };
  let photos = [];
  let currentPhotoFilter = 'ALL';
  let activeLightboxPhotoId = null;

  // --- DOM ELEMENTS ---
  const el = {
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    themeIcon: document.getElementById('themeIcon'),
    festivalSelect: document.getElementById('festivalSelect'),
    heroFestivalTitle: document.getElementById('heroFestivalTitle'),
    heroFestivalSub: document.getElementById('heroFestivalSub'),
    heroShareWhatsAppBtn: document.getElementById('heroShareWhatsAppBtn'),
    heroUploadPhotoBtn: document.getElementById('heroUploadPhotoBtn'),
    quickAddExpenseBtn: document.getElementById('quickAddExpenseBtn'),
    quickAddChandaBtn: document.getElementById('quickAddChandaBtn'),

    // Badges & KPIs
    badgeExpenseCount: document.getElementById('badgeExpenseCount'),
    badgeChandaCount: document.getElementById('badgeChandaCount'),
    badgePhotoCount: document.getElementById('badgePhotoCount'),
    kpiTotalChanda: document.getElementById('kpiTotalChanda'),
    kpiChandaDonorsCount: document.getElementById('kpiChandaDonorsCount'),
    kpiChandaPendingAmount: document.getElementById('kpiChandaPendingAmount'),
    kpiTotalExpenses: document.getElementById('kpiTotalExpenses'),
    kpiExpenseItemsCount: document.getElementById('kpiExpenseItemsCount'),
    kpiNetBalance: document.getElementById('kpiNetBalance'),
    kpiBalanceIcon: document.getElementById('kpiBalanceIcon'),
    kpiBalanceStatus: document.getElementById('kpiBalanceStatus'),
    kpiPerPersonShare: document.getElementById('kpiPerPersonShare'),
    kpiCommitteeMembersCount: document.getElementById('kpiCommitteeMembersCount'),

    // Navigation Tabs
    navTabs: document.querySelectorAll('.nav-tab'),
    tabPanes: document.querySelectorAll('.tab-pane'),

    // Dashboard Tab
    dashboardCategoryBars: document.getElementById('dashboardCategoryBars'),
    dashboardRecentChandaList: document.getElementById('dashboardRecentChandaList'),
    dashboardPhotoGrid: document.getElementById('dashboardPhotoGrid'),
    dashViewAllExpensesBtn: document.getElementById('dashViewAllExpensesBtn'),
    dashViewAllChandaBtn: document.getElementById('dashViewAllChandaBtn'),
    dashViewAllPhotosBtn: document.getElementById('dashViewAllPhotosBtn'),

    // Expenses Tab
    expenseSearchInput: document.getElementById('expenseSearchInput'),
    expenseCategoryFilter: document.getElementById('expenseCategoryFilter'),
    openAddExpenseModalBtn: document.getElementById('openAddExpenseModalBtn'),
    expensesTableBody: document.getElementById('expensesTableBody'),
    manageMembersBtn: document.getElementById('manageMembersBtn'),
    splitCountBadge: document.getElementById('splitCountBadge'),
    splitTotalIncurred: document.getElementById('splitTotalIncurred'),
    splitPerPersonAmount: document.getElementById('splitPerPersonAmount'),
    memberShareList: document.getElementById('memberShareList'),
    settlementMatrixList: document.getElementById('settlementMatrixList'),
    ladduWinnerName: document.getElementById('ladduWinnerName'),
    ladduBidAmount: document.getElementById('ladduBidAmount'),
    ladduStatusBadge: document.getElementById('ladduStatusBadge'),
    editLadduBtn: document.getElementById('editLadduBtn'),

    // Chanda Tab
    chandaSearchInput: document.getElementById('chandaSearchInput'),
    chandaStatusFilter: document.getElementById('chandaStatusFilter'),
    openAddChandaModalBtn: document.getElementById('openAddChandaModalBtn'),
    chandaTableBody: document.getElementById('chandaTableBody'),

    // Gallery Tab
    galleryFilterChips: document.getElementById('galleryFilterChips'),
    openUploadPhotoModalBtn: document.getElementById('openUploadPhotoModalBtn'),
    mainPhotoGrid: document.getElementById('mainPhotoGrid'),

    // Reports Tab
    whatsappReportTextArea: document.getElementById('whatsappReportTextArea'),
    copyWhatsAppTextBtn: document.getElementById('copyWhatsAppTextBtn'),
    openWhatsAppDirectBtn: document.getElementById('openWhatsAppDirectBtn'),
    printNoticeBoardBtn: document.getElementById('printNoticeBoardBtn'),
    exportBackupJsonBtn: document.getElementById('exportBackupJsonBtn'),
    importBackupJsonInput: document.getElementById('importBackupJsonInput'),

    // Notice Board Slip
    noticeStatChanda: document.getElementById('noticeStatChanda'),
    noticeStatExpense: document.getElementById('noticeStatExpense'),
    noticeStatBalance: document.getElementById('noticeStatBalance'),
    noticeStatLaddu: document.getElementById('noticeStatLaddu'),
    noticeExpenseTableBody: document.getElementById('noticeExpenseTableBody'),
    noticeChandaTableBody: document.getElementById('noticeChandaTableBody'),
    noticePrintDate: document.getElementById('noticePrintDate'),

    // Modals
    modalChanda: document.getElementById('modalChanda'),
    formChanda: document.getElementById('formChanda'),
    modalChandaTitle: document.getElementById('modalChandaTitle'),
    modalExpense: document.getElementById('modalExpense'),
    formExpense: document.getElementById('formExpense'),
    modalExpenseTitle: document.getElementById('modalExpenseTitle'),
    modalPhoto: document.getElementById('modalPhoto'),
    formPhoto: document.getElementById('formPhoto'),
    photoDropzone: document.getElementById('photoDropzone'),
    photoFileInput: document.getElementById('photoFileInput'),
    photoPreviewContainer: document.getElementById('photoPreviewContainer'),
    modalMembers: document.getElementById('modalMembers'),
    committeeMembersList: document.getElementById('committeeMembersList'),
    newMemberNameInput: document.getElementById('newMemberNameInput'),
    addMemberBtn: document.getElementById('addMemberBtn'),
    modalLaddu: document.getElementById('modalLaddu'),
    formLaddu: document.getElementById('formLaddu'),
    inputLadduWinner: document.getElementById('inputLadduWinner'),
    inputLadduAmount: document.getElementById('inputLadduAmount'),
    inputLadduStatus: document.getElementById('inputLadduStatus'),

    // PWA Install Elements
    installPhoneBtn: document.getElementById('installPhoneBtn'),
    modalInstall: document.getElementById('modalInstall'),
    pwaTriggerInstallBtn: document.getElementById('pwaTriggerInstallBtn'),
    phoneAccessUrlDisplay: document.getElementById('phoneAccessUrlDisplay'),

    // Lightbox
    lightboxModal: document.getElementById('lightboxModal'),
    lightboxImage: document.getElementById('lightboxImage'),
    lightboxCaption: document.getElementById('lightboxCaption'),
    lightboxCloseBtn: document.getElementById('lightboxCloseBtn'),
    lightboxDownloadBtn: document.getElementById('lightboxDownloadBtn'),
    lightboxDeleteBtn: document.getElementById('lightboxDeleteBtn')
  };

  let deferredPrompt = null;

  // --- INITIALIZATION ---
  function init() {
    initTheme();
    initPWA();
    loadFestivalData();
    setupEventListeners();
    renderAll();
  }

  // --- PWA (PROGRESSIVE WEB APP) INSTALLATION ---
  function initPWA() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(console.warn);
      });
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      if (el.pwaTriggerInstallBtn) {
        el.pwaTriggerInstallBtn.textContent = '⚡ Click to Install App on This Device Now';
      }
    });

    if (el.installPhoneBtn) {
      el.installPhoneBtn.addEventListener('click', () => {
        if (el.phoneAccessUrlDisplay) {
          const host = window.location.hostname;
          const port = window.location.port || '4000';
          if (host !== 'localhost' && host !== '127.0.0.1') {
            el.phoneAccessUrlDisplay.textContent = `http://${host}:${port}`;
          } else {
            el.phoneAccessUrlDisplay.textContent = `http://10.150.250.111:4000`;
          }
        }
        openModal(el.modalInstall);
      });
    }

    if (el.pwaTriggerInstallBtn) {
      el.pwaTriggerInstallBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const choice = await deferredPrompt.userChoice;
          if (choice && choice.outcome === 'accepted') {
            closeModal(el.modalInstall);
          }
          deferredPrompt = null;
        } else {
          alert('📱 To install onto your mobile phone:\n1. Open http://10.150.250.111:4000 on your phone\n2. On Android Chrome: Tap (⋮) -> "Install App" or "Add to Home screen"\n3. On iPhone Safari: Tap Share (⎋) -> "Add to Home screen"');
        }
      });
    }
  }

  // --- THEME ---
  function initTheme() {
    const savedTheme = localStorage.getItem(KEY_THEME) || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    el.themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

    el.themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem(KEY_THEME, next);
      el.themeIcon.textContent = next === 'dark' ? '☀️' : '🌙';
    });
  }

  // --- DATA LOADING & DEFAULTS ---
  function loadFestivalData() {
    // Current Festival
    el.festivalSelect.value = currentFestival;
    updateHeroBannerTitles();

    // Expenses
    const savedExpenses = localStorage.getItem(KEY_EXPENSES + currentFestival);
    if (savedExpenses) {
      try { expenses = JSON.parse(savedExpenses); } catch(e) { expenses = []; }
    } else {
      expenses = getDefaultExpenses(currentFestival);
      saveExpenses();
    }

    // Chanda Donors
    const savedChanda = localStorage.getItem(KEY_CHANDA + currentFestival);
    if (savedChanda) {
      try { chandaList = JSON.parse(savedChanda); } catch(e) { chandaList = []; }
    } else {
      chandaList = getDefaultChanda(currentFestival);
      saveChanda();
    }

    // Committee Members
    const savedMembers = localStorage.getItem(KEY_MEMBERS + currentFestival);
    if (savedMembers) {
      try { committeeMembers = JSON.parse(savedMembers); } catch(e) { committeeMembers = []; }
    } else {
      committeeMembers = ['Ramesh (President)', 'Suresh (Secretary)', 'Kalyan (Treasurer)', 'Venkatesh', 'Anand', 'Prasad'];
      saveMembers();
    }

    // Laddu Auction
    const savedLaddu = localStorage.getItem(KEY_LADDU + currentFestival);
    if (savedLaddu) {
      try { ladduAuction = JSON.parse(savedLaddu); } catch(e) { ladduAuction = { winner: 'Sri Rama Rao', amount: 25000, status: 'PAID' }; }
    } else {
      ladduAuction = { winner: 'Sri Rama Rao (Main Road)', amount: 25000, status: 'PAID' };
      saveLaddu();
    }

    // Photos
    const savedPhotos = localStorage.getItem(KEY_PHOTOS + currentFestival);
    if (savedPhotos) {
      try { photos = JSON.parse(savedPhotos); } catch(e) { photos = []; }
    } else {
      photos = getDefaultPhotos(currentFestival);
      savePhotos();
    }
  }

  function updateHeroBannerTitles() {
    const festName = el.festivalSelect.options[el.festivalSelect.selectedIndex].text;
    el.heroFestivalTitle.textContent = festName + ' Utsavam';
    el.heroFestivalSub.textContent = `Village festival financial accounting, photo memories, and automated expense splitting for ${festName}.`;
    if (el.noticePrintDate) {
      el.noticePrintDate.textContent = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    }
  }

  function saveExpenses() {
    localStorage.setItem(KEY_EXPENSES + currentFestival, JSON.stringify(expenses));
  }

  function saveChanda() {
    localStorage.setItem(KEY_CHANDA + currentFestival, JSON.stringify(chandaList));
  }

  function saveMembers() {
    localStorage.setItem(KEY_MEMBERS + currentFestival, JSON.stringify(committeeMembers));
  }

  function saveLaddu() {
    localStorage.setItem(KEY_LADDU + currentFestival, JSON.stringify(ladduAuction));
  }

  function savePhotos() {
    localStorage.setItem(KEY_PHOTOS + currentFestival, JSON.stringify(photos));
  }

  // --- DEFAULT DATA GENERATOR ---
  function getDefaultExpenses(fest) {
    if (fest === 'vinayaka-chavithi-2026') {
      return [
        { id: 'exp_1', festival: fest, category: 'Vigraham', title: '8ft Clay Vinayaka Vigraham & Transport', amount: 18000, paidBy: 'Ramesh (President)', date: '2026-09-01', vendor: 'Sri Vinayaka Silpa Sala', receiptUrl: '' },
        { id: 'exp_2', festival: fest, category: 'Mandapam', title: 'Grand Mandapam, Stage & Floral Decor', amount: 14500, paidBy: 'Suresh (Secretary)', date: '2026-09-02', vendor: 'Balaji Mandapam & Flowers', receiptUrl: '' },
        { id: 'exp_3', festival: fest, category: 'Sound & DJ', title: 'DJ Sound System, Mic, Serial Lights & Genset', amount: 12000, paidBy: 'Kalyan (Treasurer)', date: '2026-09-02', vendor: 'Sai Sound & Lights', receiptUrl: '' },
        { id: 'exp_4', festival: fest, category: 'Pooja & Pandit', title: 'Pandit Ji Dakshina & 9 Days Pooja Samagri', amount: 6500, paidBy: 'Venkatesh', date: '2026-09-03', vendor: 'Brahmin Sabha & Kirana', receiptUrl: '' },
        { id: 'exp_5', festival: fest, category: 'Prasadam & Food', title: 'Grand Annadanam & Daily Evening Prasadam', amount: 16000, paidBy: 'Anand', date: '2026-09-05', vendor: 'Annapurna Catering', receiptUrl: '' },
        { id: 'exp_6', festival: fest, category: 'Laddu Auction', title: '21kg Special Prasadam Laddu Preparation', amount: 5500, paidBy: 'Prasad', date: '2026-09-08', vendor: 'Tirumala Sweets', receiptUrl: '' },
        { id: 'exp_7', festival: fest, category: 'Nimajjanam', title: 'Procession Tractor, Dappu Band & Crackers', amount: 8500, paidBy: 'Ramesh (President)', date: '2026-09-09', vendor: 'Local Dappu Sangham', receiptUrl: '' }
      ];
    }
    return [
      { id: 'exp_1', festival: fest, category: 'Pooja & Pandit', title: 'Temple Pooja & Decoration', amount: 5000, paidBy: 'Ramesh (President)', date: '2026-01-14', vendor: 'Local Temple', receiptUrl: '' }
    ];
  }

  function getDefaultChanda(fest) {
    return [
      { id: 'ch_1', festival: fest, name: 'Sri Rama Rao', house: '1-12, Main Road', phone: '9848012345', pledged: 5000, paid: 5000, paymentMode: 'UPI / PhonePe', date: '2026-08-25', notes: 'Chief Patron' },
      { id: 'ch_2', festival: fest, name: 'K. Satyanarayana', house: '2-45, Temple Street', phone: '9440123456', pledged: 3000, paid: 3000, paymentMode: 'Cash', date: '2026-08-26', notes: 'Given in hand' },
      { id: 'ch_3', festival: fest, name: 'V. Krishna Murthy', house: '3-18, Gandhi Nagar', phone: '9988776655', pledged: 2500, paid: 2500, paymentMode: 'UPI / PhonePe', date: '2026-08-27', notes: 'GPay transfer' },
      { id: 'ch_4', festival: fest, name: 'B. Venkat Ramana', house: '1-88, School Road', phone: '9876543210', pledged: 2000, paid: 2000, paymentMode: 'Cash', date: '2026-08-28', notes: '' },
      { id: 'ch_5', festival: fest, name: 'D. Subba Rao', house: '4-05, Panchayat Lane', phone: '9123456789', pledged: 2000, paid: 1500, paymentMode: 'Cash', date: '2026-08-28', notes: 'Balance 500 pending' },
      { id: 'ch_6', festival: fest, name: 'P. Appala Naidu', house: '2-90, Bazar Street', phone: '9490987654', pledged: 1500, paid: 1500, paymentMode: 'UPI / PhonePe', date: '2026-08-29', notes: 'PhonePe' },
      { id: 'ch_7', festival: fest, name: 'M. Sanyasi Rao', house: '3-62, Temple Street', phone: '9849112233', pledged: 1000, paid: 1000, paymentMode: 'Cash', date: '2026-08-30', notes: '' },
      { id: 'ch_8', festival: fest, name: 'N. Chandra Sekhar', house: '1-33, Main Road', phone: '9885544332', pledged: 1000, paid: 1000, paymentMode: 'Cash', date: '2026-08-30', notes: '' },
      { id: 'ch_9', festival: fest, name: 'Ch. Jagannadham', house: '2-14, R.K. Street', phone: '9701234567', pledged: 1000, paid: 500, paymentMode: 'Cash', date: '2026-08-31', notes: 'Partial payment' },
      { id: 'ch_10', festival: fest, name: 'G. Mohan Reddy', house: '5-21, High School Road', phone: '9959876543', pledged: 1000, paid: 0, paymentMode: 'Cash', date: '2026-08-31', notes: 'Will pay during Nimajjanam' }
    ];
  }

  function getDefaultPhotos(fest) {
    // Generate festive SVG data URLs so the app has working pictures out of the box
    return [
      {
        id: 'photo_1',
        festival: fest,
        category: 'Pooja',
        caption: 'Clay Vinayaka Vigraham Pranapratishta Pooja',
        uploader: 'Suresh (Secretary)',
        date: '2026-09-03',
        dataUrl: createFestiveSvgDataUrl('🚩 8ft Clay Vinayaka', 'Pranapratishta Morning Pooja', '#f59e0b', '#dc2626')
      },
      {
        id: 'photo_2',
        festival: fest,
        category: 'Pooja',
        caption: 'Grand Evening Floral Mandapam with Serial Lights',
        uploader: 'Kalyan (Treasurer)',
        date: '2026-09-04',
        dataUrl: createFestiveSvgDataUrl('✨ Mandapam & Lights', 'Evening Grand Aarti & Darshanam', '#e11d48', '#9333ea')
      },
      {
        id: 'photo_3',
        festival: fest,
        category: 'Annadanam',
        caption: 'Community Mahaprasadam Annadanam for 500+ Villagers',
        uploader: 'Anand',
        date: '2026-09-06',
        dataUrl: createFestiveSvgDataUrl('🍲 Maha Annadanam', 'Village Community Dining Hall', '#059669', '#10b981')
      },
      {
        id: 'photo_4',
        festival: fest,
        category: 'Laddu',
        caption: 'Annual 21kg Prasadam Laddu Auction Celebration',
        uploader: 'Ramesh (President)',
        date: '2026-09-08',
        dataUrl: createFestiveSvgDataUrl('🏆 21kg Laddu Auction', 'Won by Sri Rama Rao for ₹25,000', '#ea580c', '#f59e0b')
      },
      {
        id: 'photo_5',
        festival: fest,
        category: 'Nimajjanam',
        caption: 'Procession with Dappu Band & Colorful Nimajjanam Shobha Yatra',
        uploader: 'Youth Committee',
        date: '2026-09-09',
        dataUrl: createFestiveSvgDataUrl('🚜 Grand Nimajjanam', 'Shobha Yatra & Lake Immersion', '#7c3aed', '#2563eb')
      }
    ];
  }

  function createFestiveSvgDataUrl(title, subtitle, color1, color2) {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${color1}"/>
            <stop offset="100%" stop-color="${color2}"/>
          </linearGradient>
          <pattern id="pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1.5" fill="rgba(255,255,255,0.15)"/>
          </pattern>
        </defs>
        <rect width="800" height="600" fill="url(#grad)"/>
        <rect width="800" height="600" fill="url(#pattern)"/>
        <circle cx="400" cy="260" r="140" fill="rgba(255,255,255,0.1)"/>
        <circle cx="400" cy="260" r="110" fill="rgba(255,255,255,0.12)"/>
        <text x="400" y="270" font-family="'Outfit', sans-serif" font-size="84" text-anchor="middle" fill="#ffffff" font-weight="bold">🪔</text>
        <text x="400" y="420" font-family="'Outfit', sans-serif" font-size="34" font-weight="800" text-anchor="middle" fill="#ffffff" letter-spacing="1">${title}</text>
        <text x="400" y="465" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="500" text-anchor="middle" fill="rgba(255,255,255,0.9)">${subtitle}</text>
        <rect x="250" y="500" width="300" height="36" rx="18" fill="rgba(0,0,0,0.25)"/>
        <text x="400" y="524" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700" text-anchor="middle" fill="#fef08a">MANA VOORU UTSAV MEMORY</text>
      </svg>
    `;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  // --- RENDER ALL SECTIONS ---
  function renderAll() {
    renderKPIs();
    renderDashboard();
    renderExpenses();
    renderChanda();
    renderGallery();
    renderSmartSplit();
    renderReports();
  }

  // --- KPIS & BALANCES ---
  function renderKPIs() {
    // Chanda Math
    const totalChandaPaid = chandaList.reduce((sum, item) => sum + Number(item.paid || 0), 0);
    const totalChandaPledged = chandaList.reduce((sum, item) => sum + Number(item.pledged || 0), 0);
    const chandaPending = Math.max(0, totalChandaPledged - totalChandaPaid);
    const donorCount = chandaList.length;

    // Expenses Math
    const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const expenseCount = expenses.length;

    // Laddu Auction Math (Counts as Income if Paid)
    const ladduContribution = (ladduAuction.status === 'PAID') ? Number(ladduAuction.amount || 0) : 0;
    const totalIncome = totalChandaPaid + ladduContribution;

    // Net Balance
    const netBalance = totalIncome - totalExpenses;

    // Split per Member
    const memberCount = Math.max(1, committeeMembers.length);
    const perPersonShare = Math.round(totalExpenses / memberCount);

    // Update DOM KPIs
    el.kpiTotalChanda.textContent = formatCurrency(totalIncome);
    el.kpiChandaDonorsCount.textContent = `${donorCount} Donors`;
    el.kpiChandaPendingAmount.textContent = `${formatCurrency(chandaPending)} Pending`;

    el.kpiTotalExpenses.textContent = formatCurrency(totalExpenses);
    el.kpiExpenseItemsCount.textContent = `${expenseCount} Items`;

    el.kpiNetBalance.textContent = (netBalance >= 0 ? '+' : '') + formatCurrency(netBalance);
    if (netBalance >= 0) {
      el.kpiNetBalance.style.color = 'var(--festive-emerald)';
      el.kpiBalanceIcon.className = 'metric-icon-box emerald';
      el.kpiBalanceIcon.textContent = '⚖️';
      el.kpiBalanceStatus.textContent = 'Surplus funds safely in hand';
    } else {
      el.kpiNetBalance.style.color = 'var(--festive-crimson)';
      el.kpiBalanceIcon.className = 'metric-icon-box crimson';
      el.kpiBalanceIcon.textContent = '⚠️';
      el.kpiBalanceStatus.textContent = 'Deficit: Requires collection';
    }

    el.kpiPerPersonShare.textContent = formatCurrency(perPersonShare);
    el.kpiCommitteeMembersCount.textContent = memberCount;

    // Tab Badges
    el.badgeExpenseCount.textContent = expenseCount;
    el.badgeChandaCount.textContent = donorCount;
    el.badgePhotoCount.textContent = photos.length;
  }

  // --- DASHBOARD TAB ---
  function renderDashboard() {
    // 1. Category Bar Breakdown
    const categories = ['Vigraham', 'Mandapam', 'Sound & DJ', 'Pooja & Pandit', 'Prasadam & Food', 'Laddu Auction', 'Nimajjanam', 'Misc'];
    const totalExpenses = Math.max(1, expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0));
    
    let barsHtml = '';
    categories.forEach(cat => {
      const catTotal = expenses
        .filter(e => e.category === cat)
        .reduce((sum, e) => sum + Number(e.amount || 0), 0);
      
      if (catTotal > 0) {
        const pct = Math.round((catTotal / totalExpenses) * 100);
        barsHtml += `
          <div class="category-bar-item">
            <div class="category-bar-label">
              <span>${cat}</span>
              <span style="font-family: var(--font-mono);">${formatCurrency(catTotal)} (${pct}%)</span>
            </div>
            <div class="category-bar-track">
              <div class="category-bar-fill" style="width: ${pct}%;"></div>
            </div>
          </div>
        `;
      }
    });

    el.dashboardCategoryBars.innerHTML = barsHtml || '<div class="empty-state">No expense records yet</div>';

    // 2. Recent Chanda Contributors
    const recentDonors = [...chandaList].reverse().slice(0, 5);
    let donorsHtml = '';
    recentDonors.forEach(donor => {
      donorsHtml += `
        <div class="settlement-item">
          <div class="settlement-left">
            <div style="font-weight: 700;">${escapeHtml(donor.name)}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${escapeHtml(donor.house || 'Village')}</div>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="settlement-amount">${formatCurrency(donor.paid)}</span>
            <span class="badge ${donor.paid >= donor.pledged ? 'badge-paid' : (donor.paid > 0 ? 'badge-partial' : 'badge-pending')}">
              ${donor.paid >= donor.pledged ? 'PAID' : 'DUE'}
            </span>
          </div>
        </div>
      `;
    });
    el.dashboardRecentChandaList.innerHTML = donorsHtml || '<div class="empty-state">No donors added yet</div>';

    // 3. Recent Photos Preview (3 items)
    const recentPhotos = photos.slice(0, 3);
    let photosHtml = '';
    recentPhotos.forEach(p => {
      photosHtml += renderPhotoCardHtml(p);
    });
    el.dashboardPhotoGrid.innerHTML = photosHtml || '<div class="empty-state">No photos uploaded yet</div>';
  }

  // --- EXPENSES TAB & TABLE ---
  function renderExpenses() {
    const searchTerm = (el.expenseSearchInput.value || '').toLowerCase().trim();
    const catFilter = el.expenseCategoryFilter.value;

    const filtered = expenses.filter(item => {
      const matchesSearch = !searchTerm ||
        (item.title && item.title.toLowerCase().includes(searchTerm)) ||
        (item.paidBy && item.paidBy.toLowerCase().includes(searchTerm)) ||
        (item.vendor && item.vendor.toLowerCase().includes(searchTerm));
      
      const matchesCategory = catFilter === 'ALL' || item.category === catFilter;
      return matchesSearch && matchesCategory;
    });

    if (filtered.length === 0) {
      el.expensesTableBody.innerHTML = `
        <tr>
          <td colspan="7" class="empty-state">
            <div class="empty-state-icon">📉</div>
            <div>No matching expenses found</div>
          </td>
        </tr>
      `;
      return;
    }

    let rowsHtml = '';
    filtered.forEach(exp => {
      rowsHtml += `
        <tr>
          <td style="white-space: nowrap; color: var(--text-muted); font-size: 0.82rem;">${exp.date || '-'}</td>
          <td><span class="badge badge-category">${escapeHtml(exp.category)}</span></td>
          <td>
            <div style="font-weight: 700; color: var(--text-primary);">${escapeHtml(exp.title)}</div>
            ${exp.vendor ? `<div style="font-size: 0.75rem; color: var(--text-muted);">Shop: ${escapeHtml(exp.vendor)}</div>` : ''}
          </td>
          <td>
            <span style="font-weight: 600; color: var(--festive-gold);">${escapeHtml(exp.paidBy || 'Committee')}</span>
          </td>
          <td style="font-family: var(--font-mono); font-weight: 800; color: var(--text-primary); font-size: 0.95rem;">
            ${formatCurrency(exp.amount)}
          </td>
          <td>
            ${exp.receiptUrl ? `<a href="${exp.receiptUrl}" target="_blank" class="badge badge-paid">Receipt 📄</a>` : `<span style="color: var(--text-muted); font-size: 0.78rem;">No bill</span>`}
          </td>
          <td>
            <button class="btn btn-secondary btn-sm" style="color: #f43f5e; padding: 4px 8px;" onclick="window.manaUtsav.deleteExpense('${exp.id}')">
              🗑 Delete
            </button>
          </td>
        </tr>
      `;
    });

    el.expensesTableBody.innerHTML = rowsHtml;
  }

  // --- SMART EXPENSE SPLITTER CALCULATION ---
  function renderSmartSplit() {
    const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const memberCount = Math.max(1, committeeMembers.length);
    const perPersonShare = Math.round(totalExpenses / memberCount);

    el.splitCountBadge.textContent = `${memberCount} Members`;
    el.splitTotalIncurred.textContent = formatCurrency(totalExpenses);
    el.splitPerPersonAmount.textContent = formatCurrency(perPersonShare);

    // Compute for each member: how much they personally paid
    const memberBalances = committeeMembers.map(name => {
      const paidByThisMember = expenses
        .filter(e => (e.paidBy || '').trim().toLowerCase() === name.trim().toLowerCase())
        .reduce((sum, e) => sum + Number(e.amount || 0), 0);
      
      const balance = paidByThisMember - perPersonShare; // > 0 means overpaid, < 0 means owes
      return {
        name,
        paid: paidByThisMember,
        balance
      };
    });

    // 1. Member Ledger List
    let ledgerHtml = '';
    memberBalances.forEach(m => {
      let statusBadge = '';
      let statusText = '';
      if (m.balance > 0) {
        statusBadge = `<span class="badge badge-paid">+ Will Receive ${formatCurrency(m.balance)}</span>`;
        statusText = `<span style="color: var(--festive-emerald); font-weight: 700;">Overpaid by ${formatCurrency(m.balance)}</span>`;
      } else if (m.balance < 0) {
        statusBadge = `<span class="badge badge-pending">- Needs to Pay ${formatCurrency(Math.abs(m.balance))}</span>`;
        statusText = `<span style="color: var(--festive-crimson); font-weight: 700;">Owes ${formatCurrency(Math.abs(m.balance))}</span>`;
      } else {
        statusBadge = `<span class="badge badge-paid">Settled ✓</span>`;
        statusText = `<span style="color: var(--text-muted);">Exact share</span>`;
      }

      ledgerHtml += `
        <div class="settlement-item">
          <div class="settlement-left">
            <div>
              <div style="font-weight: 800;">${escapeHtml(m.name)}</div>
              <div style="font-size: 0.76rem; color: var(--text-muted);">Paid: ${formatCurrency(m.paid)} (Fair Share: ${formatCurrency(perPersonShare)})</div>
            </div>
          </div>
          <div>${statusBadge}</div>
        </div>
      `;
    });
    el.memberShareList.innerHTML = ledgerHtml;

    // 2. Settlement Matrix (Greedy Debtor -> Creditor Algorithm)
    const settlements = calculateSettlementTransactions(memberBalances);
    let matrixHtml = '';
    if (settlements.length === 0) {
      matrixHtml = `<div class="empty-state" style="padding: 24px 10px;">✨ All members are completely settled!</div>`;
    } else {
      settlements.forEach(s => {
        matrixHtml += `
          <div class="settlement-item">
            <div class="settlement-left">
              <span style="font-weight: 700; color: var(--festive-crimson);">${escapeHtml(s.from)}</span>
              <span class="settlement-arrow">➔ pays ➔</span>
              <span style="font-weight: 700; color: var(--festive-emerald);">${escapeHtml(s.to)}</span>
            </div>
            <div class="settlement-amount">${formatCurrency(s.amount)}</div>
          </div>
        `;
      });
    }
    el.settlementMatrixList.innerHTML = matrixHtml;

    // 3. Laddu Card
    el.ladduWinnerName.textContent = ladduAuction.winner || 'None';
    el.ladduBidAmount.textContent = formatCurrency(ladduAuction.amount || 0);
    el.ladduStatusBadge.className = ladduAuction.status === 'PAID' ? 'badge badge-paid' : 'badge badge-pending';
    el.ladduStatusBadge.textContent = ladduAuction.status;
  }

  function calculateSettlementTransactions(balances) {
    const debtors = [];
    const creditors = [];

    balances.forEach(b => {
      if (b.balance < -1) {
        debtors.push({ name: b.name, owes: Math.abs(b.balance) });
      } else if (b.balance > 1) {
        creditors.push({ name: b.name, receives: b.balance });
      }
    });

    const transactions = [];
    let i = 0, j = 0;

    while (i < debtors.length && j < creditors.length) {
      const debtor = debtors[i];
      const creditor = creditors[j];
      const amount = Math.min(debtor.owes, creditor.receives);

      if (amount > 0) {
        transactions.push({
          from: debtor.name,
          to: creditor.name,
          amount: Math.round(amount)
        });
      }

      debtor.owes -= amount;
      creditor.receives -= amount;

      if (debtor.owes < 1) i++;
      if (creditor.receives < 1) j++;
    }

    return transactions;
  }

  // --- CHANDA TAB & TABLE ---
  function renderChanda() {
    const searchTerm = (el.chandaSearchInput.value || '').toLowerCase().trim();
    const statusFilter = el.chandaStatusFilter.value;

    const filtered = chandaList.filter(item => {
      const matchesSearch = !searchTerm ||
        (item.name && item.name.toLowerCase().includes(searchTerm)) ||
        (item.house && item.house.toLowerCase().includes(searchTerm)) ||
        (item.phone && item.phone.includes(searchTerm));
      
      let status = 'PENDING';
      if (item.paid >= item.pledged) status = 'PAID';
      else if (item.paid > 0) status = 'PARTIAL';

      const matchesStatus = statusFilter === 'ALL' || status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    if (filtered.length === 0) {
      el.chandaTableBody.innerHTML = `
        <tr>
          <td colspan="10" class="empty-state">
            <div class="empty-state-icon">📜</div>
            <div>No chanda donor records found</div>
          </td>
        </tr>
      `;
      return;
    }

    let rowsHtml = '';
    filtered.forEach((donor, idx) => {
      let statusBadge = '<span class="badge badge-pending">PENDING</span>';
      if (donor.paid >= donor.pledged) {
        statusBadge = '<span class="badge badge-paid">PAID ✓</span>';
      } else if (donor.paid > 0) {
        statusBadge = `<span class="badge badge-partial">PARTIAL (${formatCurrency(donor.pledged - donor.paid)} due)</span>`;
      }

      rowsHtml += `
        <tr>
          <td style="color: var(--text-muted); font-size: 0.8rem;">${idx + 1}</td>
          <td>
            <div style="font-weight: 800; color: var(--text-primary); font-size: 0.95rem;">${escapeHtml(donor.name)}</div>
            ${donor.notes ? `<div style="font-size: 0.74rem; color: var(--text-secondary);">${escapeHtml(donor.notes)}</div>` : ''}
          </td>
          <td>${escapeHtml(donor.house || '-')}</td>
          <td style="font-family: var(--font-mono); font-size: 0.82rem;">${escapeHtml(donor.phone || '-')}</td>
          <td style="font-family: var(--font-mono); font-weight: 600;">${formatCurrency(donor.pledged)}</td>
          <td style="font-family: var(--font-mono); font-weight: 800; color: var(--festive-gold); font-size: 1rem;">
            ${formatCurrency(donor.paid)}
          </td>
          <td>
            <span class="badge badge-category" style="background: rgba(255,255,255,0.06); color: var(--text-secondary); border: none;">
              ${escapeHtml(donor.paymentMode || 'Cash')}
            </span>
          </td>
          <td>${statusBadge}</td>
          <td>
            <button class="btn btn-whatsapp btn-sm" style="padding: 4px 8px; font-size: 0.74rem;" onclick="window.manaUtsav.sendWhatsAppReceipt('${donor.id}')">
              📲 Receipt
            </button>
          </td>
          <td>
            <button class="btn btn-secondary btn-sm" style="color: #f43f5e; padding: 4px 8px;" onclick="window.manaUtsav.deleteChanda('${donor.id}')">
              🗑
            </button>
          </td>
        </tr>
      `;
    });

    el.chandaTableBody.innerHTML = rowsHtml;
  }

  // --- GALLERY TAB ---
  function renderGallery() {
    const filtered = photos.filter(p => {
      if (currentPhotoFilter === 'ALL') return true;
      return p.category === currentPhotoFilter;
    });

    if (filtered.length === 0) {
      el.mainPhotoGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">📸</div>
          <h3>No photos in this category yet</h3>
          <p style="margin-top: 6px;">Click "Upload New Photos" to add memories from your mobile phone</p>
        </div>
      `;
      return;
    }

    let gridHtml = '';
    filtered.forEach(p => {
      gridHtml += renderPhotoCardHtml(p);
    });
    el.mainPhotoGrid.innerHTML = gridHtml;
  }

  function renderPhotoCardHtml(p) {
    return `
      <div class="photo-card" onclick="window.manaUtsav.openLightbox('${p.id}')">
        <div class="photo-thumb-wrapper">
          <img src="${p.dataUrl}" alt="${escapeHtml(p.caption || 'Festival Photo')}" loading="lazy">
          <span class="photo-badge-category">${escapeHtml(p.category)}</span>
        </div>
        <div class="photo-meta-info">
          <div class="photo-title">${escapeHtml(p.caption || 'Festival Memory')}</div>
          <div class="photo-footer">
            <span>By ${escapeHtml(p.uploader || 'Villager')}</span>
            <span>${p.date || ''}</span>
          </div>
        </div>
      </div>
    `;
  }

  // --- NOTICE BOARD & WHATSAPP REPORTS TAB ---
  function renderReports() {
    const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const totalChandaPaid = chandaList.reduce((sum, item) => sum + Number(item.paid || 0), 0);
    const ladduContribution = (ladduAuction.status === 'PAID') ? Number(ladduAuction.amount || 0) : 0;
    const totalIncome = totalChandaPaid + ladduContribution;
    const balance = totalIncome - totalExpenses;
    const festName = el.festivalSelect.options[el.festivalSelect.selectedIndex].text;

    // 1. WhatsApp Summary Text
    let waText = `🚩 *MANA VOORU ${festName.toUpperCase()}* 🚩\n`;
    waText += `గ్రామ ఉత్సవాల ఆదాయ - వ్యయాల సంపూర్ణ నివేదిక\n`;
    waText += `----------------------------------------\n`;
    waText += `💰 *మొత్తం ఆదాయం (Total Income):* ${formatCurrency(totalIncome)}\n`;
    waText += `   • చందాలు (Chanda Collected): ${formatCurrency(totalChandaPaid)} (${chandaList.length} Donors)\n`;
    if (ladduContribution > 0) {
      waText += `   • లడ్డు వేలం (Laddu Auction): ${formatCurrency(ladduContribution)} (${ladduAuction.winner})\n`;
    }
    waText += `📉 *మొత్తం ఖర్చులు (Total Expenses):* ${formatCurrency(totalExpenses)}\n`;
    waText += `⚖️ *మిగిలిన నిల్వ (Net Balance):* ${formatCurrency(balance)} (${balance >= 0 ? 'మిగులు / Surplus' : 'లోటు / Deficit'})\n`;
    waText += `----------------------------------------\n`;
    waText += `*ప్రధాన ఖర్చుల వివరాలు:*\n`;
    expenses.slice(0, 6).forEach((e, idx) => {
      waText += `${idx + 1}. ${e.title}: ${formatCurrency(e.amount)} (${e.paidBy})\n`;
    });
    if (expenses.length > 6) {
      waText += `...మరియు ఇతర ఖర్చులు (${expenses.length - 6} రకాలు)\n`;
    }
    waText += `----------------------------------------\n`;
    waText += `గ్రామ యువజన సంఘం మరియు ఉత్సవ కమిటీ సభ్యులందరికీ ధన్యవాదాలు! 🙏✨\n`;
    waText += `(వివరాలు మన గ్రామ పోర్టల్ నుండి రూపొందించబడినవి)`;

    el.whatsappReportTextArea.value = waText;

    // 2. Temple Notice Board Printable Content
    el.noticeStatChanda.textContent = formatCurrency(totalIncome);
    el.noticeStatExpense.textContent = formatCurrency(totalExpenses);
    el.noticeStatBalance.textContent = formatCurrency(balance);
    el.noticeStatLaddu.textContent = formatCurrency(ladduAuction.amount || 0);

    let noticeExpHtml = '';
    expenses.forEach(e => {
      noticeExpHtml += `
        <tr>
          <td><strong>${escapeHtml(e.title)}</strong> (${escapeHtml(e.category)})</td>
          <td>${escapeHtml(e.paidBy)}</td>
          <td style="font-weight: bold; text-align: right;">${formatCurrency(e.amount)}</td>
        </tr>
      `;
    });
    el.noticeExpenseTableBody.innerHTML = noticeExpHtml || '<tr><td colspan="3">ఖర్చులు లేవు</td></tr>';

    let noticeChandaHtml = '';
    // Sort donors by highest contribution
    const topDonors = [...chandaList].sort((a, b) => b.paid - a.paid).slice(0, 15);
    topDonors.forEach(d => {
      noticeChandaHtml += `
        <tr>
          <td><strong>${escapeHtml(d.name)}</strong></td>
          <td>${escapeHtml(d.house || '-')}</td>
          <td style="font-weight: bold; color: #b45309; text-align: right;">${formatCurrency(d.paid)}</td>
        </tr>
      `;
    });
    el.noticeChandaTableBody.innerHTML = noticeChandaHtml || '<tr><td colspan="3">దాతలు లేరు</td></tr>';
  }

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
    // Festival switcher change
    el.festivalSelect.addEventListener('change', (e) => {
      currentFestival = e.target.value;
      localStorage.setItem(KEY_FESTIVAL, currentFestival);
      loadFestivalData();
      renderAll();
    });

    // Nav Tabs
    el.navTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        el.navTabs.forEach(t => t.classList.remove('active'));
        el.tabPanes.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const tabKey = tab.getAttribute('data-tab');
        const pane = document.getElementById('pane-' + tabKey);
        if (pane) pane.classList.add('active');
      });
    });

    // Quick Action Buttons
    el.quickAddExpenseBtn.addEventListener('click', () => openModal(el.modalExpense));
    el.quickAddChandaBtn.addEventListener('click', () => openModal(el.modalChanda));
    el.openAddExpenseModalBtn.addEventListener('click', () => openModal(el.modalExpense));
    el.openAddChandaModalBtn.addEventListener('click', () => openModal(el.modalChanda));
    el.openUploadPhotoModalBtn.addEventListener('click', () => openModal(el.modalPhoto));
    el.heroUploadPhotoBtn.addEventListener('click', () => openModal(el.modalPhoto));

    // Dashboard Jump buttons
    el.dashViewAllExpensesBtn.addEventListener('click', () => switchTab('expenses'));
    el.dashViewAllChandaBtn.addEventListener('click', () => switchTab('chanda'));
    el.dashViewAllPhotosBtn.addEventListener('click', () => switchTab('gallery'));
    el.heroShareWhatsAppBtn.addEventListener('click', () => switchTab('reports'));

    // Committee Members Modal
    el.manageMembersBtn.addEventListener('click', () => {
      renderMembersList();
      openModal(el.modalMembers);
    });

    el.addMemberBtn.addEventListener('click', () => {
      const name = el.newMemberNameInput.value.trim();
      if (name && !committeeMembers.includes(name)) {
        committeeMembers.push(name);
        saveMembers();
        el.newMemberNameInput.value = '';
        renderMembersList();
        renderSmartSplit();
        renderKPIs();
      }
    });

    // Laddu Modal
    el.editLadduBtn.addEventListener('click', () => {
      el.inputLadduWinner.value = ladduAuction.winner;
      el.inputLadduAmount.value = ladduAuction.amount;
      el.inputLadduStatus.value = ladduAuction.status;
      openModal(el.modalLaddu);
    });

    el.formLaddu.addEventListener('submit', (e) => {
      e.preventDefault();
      ladduAuction.winner = el.inputLadduWinner.value.trim();
      ladduAuction.amount = Number(el.inputLadduAmount.value || 0);
      ladduAuction.status = el.inputLadduStatus.value;
      saveLaddu();
      closeModal(el.modalLaddu);
      renderAll();
    });

    // Search & Filter
    el.expenseSearchInput.addEventListener('input', renderExpenses);
    el.expenseCategoryFilter.addEventListener('change', renderExpenses);
    el.chandaSearchInput.addEventListener('input', renderChanda);
    el.chandaStatusFilter.addEventListener('change', renderChanda);

    // Gallery Filter Chips
    el.galleryFilterChips.querySelectorAll('.chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        el.galleryFilterChips.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentPhotoFilter = btn.getAttribute('data-filter');
        renderGallery();
      });
    });

    // Modal Close buttons
    document.querySelectorAll('[data-close]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-close');
        const modal = document.getElementById(modalId);
        if (modal) closeModal(modal);
      });
    });

    // Add Expense Form
    el.formExpense.addEventListener('submit', handleExpenseSubmit);

    // Add Chanda Form
    el.formChanda.addEventListener('submit', handleChandaSubmit);

    // Photo Upload & Dropzone
    setupPhotoUpload();

    // Reports Actions
    el.copyWhatsAppTextBtn.addEventListener('click', () => {
      el.whatsappReportTextArea.select();
      navigator.clipboard.writeText(el.whatsappReportTextArea.value).then(() => {
        const old = el.copyWhatsAppTextBtn.textContent;
        el.copyWhatsAppTextBtn.textContent = '✓ Copied to Clipboard!';
        setTimeout(() => el.copyWhatsAppTextBtn.textContent = old, 2000);
      });
    });

    el.openWhatsAppDirectBtn.addEventListener('click', () => {
      const text = encodeURIComponent(el.whatsappReportTextArea.value);
      window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    });

    el.printNoticeBoardBtn.addEventListener('click', () => {
      window.print();
    });

    // Backup & Restore
    el.exportBackupJsonBtn.addEventListener('click', exportBackup);
    el.importBackupJsonInput.addEventListener('change', importBackup);

    // Lightbox Controls
    el.lightboxCloseBtn.addEventListener('click', () => closeModal(el.lightboxModal));
    el.lightboxModal.addEventListener('click', (e) => {
      if (e.target === el.lightboxModal) closeModal(el.lightboxModal);
    });
    el.lightboxDeleteBtn.addEventListener('click', () => {
      if (activeLightboxPhotoId) {
        photos = photos.filter(p => p.id !== activeLightboxPhotoId);
        savePhotos();
        closeModal(el.lightboxModal);
        renderGallery();
        renderDashboard();
        renderKPIs();
      }
    });
    el.lightboxDownloadBtn.addEventListener('click', () => {
      if (activeLightboxPhotoId) {
        const p = photos.find(item => item.id === activeLightboxPhotoId);
        if (p) {
          const a = document.createElement('a');
          a.href = p.dataUrl;
          a.download = `festival_photo_${p.id}.jpg`;
          a.click();
        }
      }
    });
  }

  // --- SUBMISSIONS ---
  function handleExpenseSubmit(e) {
    e.preventDefault();
    const newExpense = {
      id: 'exp_' + Date.now(),
      festival: currentFestival,
      category: document.getElementById('expenseCategory').value,
      title: document.getElementById('expenseTitle').value.trim(),
      amount: Number(document.getElementById('expenseAmount').value || 0),
      paidBy: document.getElementById('expensePaidBy').value.trim(),
      date: document.getElementById('expenseDate').value || new Date().toISOString().split('T')[0],
      vendor: document.getElementById('expenseVendor').value.trim(),
      receiptUrl: ''
    };

    // Auto add payer to committee members if not present
    if (newExpense.paidBy && !committeeMembers.includes(newExpense.paidBy)) {
      committeeMembers.push(newExpense.paidBy);
      saveMembers();
    }

    expenses.unshift(newExpense);
    saveExpenses();
    el.formExpense.reset();
    closeModal(el.modalExpense);
    renderAll();
  }

  function handleChandaSubmit(e) {
    e.preventDefault();
    const newChanda = {
      id: 'ch_' + Date.now(),
      festival: currentFestival,
      name: document.getElementById('chandaName').value.trim(),
      house: document.getElementById('chandaHouse').value.trim(),
      phone: document.getElementById('chandaPhone').value.trim(),
      pledged: Number(document.getElementById('chandaPledged').value || 0),
      paid: Number(document.getElementById('chandaPaid').value || 0),
      paymentMode: document.getElementById('chandaPaymentMode').value,
      date: document.getElementById('chandaDate').value || new Date().toISOString().split('T')[0],
      notes: document.getElementById('chandaNotes').value.trim()
    };

    chandaList.unshift(newChanda);
    saveChanda();
    el.formChanda.reset();
    closeModal(el.modalChanda);
    renderAll();
  }

  // --- PHOTO UPLOAD & CANVAS COMPRESSION ---
  let pendingPhotoDataUrls = [];

  function setupPhotoUpload() {
    el.photoDropzone.addEventListener('click', () => el.photoFileInput.click());

    el.photoDropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      el.photoDropzone.classList.add('drag-over');
    });

    el.photoDropzone.addEventListener('dragleave', () => {
      el.photoDropzone.classList.remove('drag-over');
    });

    el.photoDropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      el.photoDropzone.classList.remove('drag-over');
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processUploadedFiles(e.dataTransfer.files);
      }
    });

    el.photoFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        processUploadedFiles(e.target.files);
      }
    });

    el.formPhoto.addEventListener('submit', (e) => {
      e.preventDefault();
      if (pendingPhotoDataUrls.length === 0) {
        alert('Please select at least one photo to upload!');
        return;
      }

      const festTag = document.getElementById('photoTagFestival').value;
      const category = document.getElementById('photoCategory').value;
      const uploader = document.getElementById('photoUploader').value.trim() || 'Village Member';
      const caption = document.getElementById('photoCaption').value.trim() || `${category} Celebration`;

      pendingPhotoDataUrls.forEach((dataUrl, idx) => {
        photos.unshift({
          id: 'photo_' + Date.now() + '_' + idx,
          festival: festTag,
          category,
          uploader,
          caption,
          date: new Date().toISOString().split('T')[0],
          dataUrl
        });
      });

      savePhotos();
      pendingPhotoDataUrls = [];
      el.photoPreviewContainer.innerHTML = '';
      el.formPhoto.reset();
      closeModal(el.modalPhoto);
      renderAll();
    });
  }

  function processUploadedFiles(files) {
    pendingPhotoDataUrls = [];
    el.photoPreviewContainer.innerHTML = '';

    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // Client-side canvas compression to max 1280px width/height and quality 0.82
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDimension = 1280;

          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          pendingPhotoDataUrls.push(compressedDataUrl);

          // Add mini preview
          const thumb = document.createElement('img');
          thumb.src = compressedDataUrl;
          thumb.style.width = '64px';
          thumb.style.height = '64px';
          thumb.style.objectFit = 'cover';
          thumb.style.borderRadius = '6px';
          thumb.style.border = '1px solid var(--border-color)';
          el.photoPreviewContainer.appendChild(thumb);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  // --- COMMITTEE MEMBERS LIST MODAL ---
  function renderMembersList() {
    let listHtml = '';
    committeeMembers.forEach((m, idx) => {
      listHtml += `
        <div style="display: flex; align-items: center; justify-content: space-between; background: var(--bg-surface-elevated); padding: 8px 12px; border-radius: 6px;">
          <span style="font-weight: 600;">${escapeHtml(m)}</span>
          <button class="btn btn-secondary btn-sm" style="color: #f43f5e; padding: 2px 6px;" onclick="window.manaUtsav.removeMember(${idx})">
            ✕
          </button>
        </div>
      `;
    });
    el.committeeMembersList.innerHTML = listHtml || '<div>No members added yet</div>';
  }

  // --- BACKUP & RESTORE ---
  function exportBackup() {
    const data = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      festival: currentFestival,
      expenses,
      chandaList,
      committeeMembers,
      ladduAuction,
      photos
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mana_utsavam_backup_${currentFestival}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function importBackup(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.expenses) expenses = data.expenses;
        if (data.chandaList) chandaList = data.chandaList;
        if (data.committeeMembers) committeeMembers = data.committeeMembers;
        if (data.ladduAuction) ladduAuction = data.ladduAuction;
        if (data.photos) photos = data.photos;

        saveExpenses();
        saveChanda();
        saveMembers();
        saveLaddu();
        savePhotos();
        renderAll();
        alert('Data successfully restored from backup!');
      } catch(err) {
        alert('Invalid backup JSON file: ' + err.message);
      }
    };
    reader.readAsText(file);
  }

  // --- HELPERS ---
  function openModal(modal) {
    modal.classList.add('active');
  }

  function closeModal(modal) {
    modal.classList.remove('active');
  }

  function switchTab(tabKey) {
    el.navTabs.forEach(t => {
      if (t.getAttribute('data-tab') === tabKey) t.classList.add('active');
      else t.classList.remove('active');
    });
    el.tabPanes.forEach(p => {
      if (p.id === 'pane-' + tabKey) p.classList.add('active');
      else p.classList.remove('active');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function formatCurrency(num) {
    return '₹' + Number(num || 0).toLocaleString('en-IN');
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --- GLOBAL EXPORTS FOR INLINE ONCLICK HANDLERS ---
  window.manaUtsav = {
    deleteExpense: (id) => {
      if (confirm('Are you sure you want to delete this expense entry?')) {
        expenses = expenses.filter(e => e.id !== id);
        saveExpenses();
        renderAll();
      }
    },
    deleteChanda: (id) => {
      if (confirm('Are you sure you want to delete this donor record?')) {
        chandaList = chandaList.filter(c => c.id !== id);
        saveChanda();
        renderAll();
      }
    },
    removeMember: (idx) => {
      committeeMembers.splice(idx, 1);
      saveMembers();
      renderMembersList();
      renderSmartSplit();
      renderKPIs();
    },
    sendWhatsAppReceipt: (id) => {
      const donor = chandaList.find(c => c.id === id);
      if (!donor) return;

      const festName = el.festivalSelect.options[el.festivalSelect.selectedIndex].text;
      let msg = `🚩 *ధన్యవాదాలు (Thank You)* 🚩\n\n`;
      msg += `శ్రీ/శ్రీమతి *${donor.name}* గారికి,\n`;
      msg += `మన ఊరు *${festName}* సందర్భంగా మీరు అందజేసిన చందా వివరాలు:\n`;
      msg += `------------------------------------\n`;
      msg += `💰 ఇచ్చిన మొత్తం: *${formatCurrency(donor.paid)}*\n`;
      if (donor.pledged > donor.paid) {
        msg += `⏳ మిగిలిన బకాయి: *${formatCurrency(donor.pledged - donor.paid)}*\n`;
      }
      msg += `💳 పేమెంట్ విధానం: ${donor.paymentMode}\n`;
      msg += `📅 తేదీ: ${donor.date || new Date().toISOString().split('T')[0]}\n`;
      msg += `------------------------------------\n`;
      msg += `గ్రామ ఉత్సవ కమిటీ మీ సహాయానికి హృదయపూర్వక ధన్యవాదాలు తెలియజేస్తోంది! 🙏✨`;

      const encoded = encodeURIComponent(msg);
      const url = donor.phone ? `https://api.whatsapp.com/send?phone=${donor.phone}&text=${encoded}` : `https://api.whatsapp.com/send?text=${encoded}`;
      window.open(url, '_blank');
    },
    openLightbox: (photoId) => {
      const photo = photos.find(p => p.id === photoId);
      if (!photo) return;
      activeLightboxPhotoId = photo.id;
      el.lightboxImage.src = photo.dataUrl;
      el.lightboxCaption.textContent = `${photo.caption || 'Festival Photo'} (${photo.category}) - Uploaded by ${photo.uploader || 'Villager'}`;
      openModal(el.lightboxModal);
    }
  };

  // Run app on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
