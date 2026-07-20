/* ==========================================================================
   GALAXY GRADIENT CRM SYSTEM - APP LOGIC (WITH DAY/NIGHT THEME SWITCHER)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSecuritySystem();
    initThemeSwitcher();
});

let isUnlocked = false;
let pendingTabTarget = null;
const DEFAULT_PIN = "8888";
const uploadedAudios = {};

/* ==========================================================================
   THEME SWITCHER (CHẾ ĐỘ NGÀY / ĐÊM)
   ========================================================================== */

function initThemeSwitcher() {
    const themeBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeToggleText');
    const appBody = document.getElementById('appBody');

    themeBtn.addEventListener('click', () => {
        if (appBody.classList.contains('dark-mode')) {
            // Switch to Light Mode
            appBody.classList.remove('dark-mode');
            appBody.classList.add('light-mode');
            themeIcon.className = 'fa-solid fa-moon';
            themeText.textContent = 'Chế Độ Đêm';
        } else {
            // Switch to Dark Galaxy Mode
            appBody.classList.remove('light-mode');
            appBody.classList.add('dark-mode');
            themeIcon.className = 'fa-solid fa-sun';
            themeText.textContent = 'Chế Độ Ngày';
        }
    });
}

/* ==========================================================================
   NAVIGATION SYSTEM
   ========================================================================== */

function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const tabTarget = item.getAttribute('data-tab');
            const isProtected = item.classList.contains('protected');

            if (isProtected && !isUnlocked) {
                pendingTabTarget = tabTarget;
                openSecurityModal();
            } else {
                switchTab(tabTarget);
            }
        });
    });
}

function switchTab(tabId) {
    document.querySelectorAll('.nav-item').forEach(nav => {
        if (nav.getAttribute('data-tab') === tabId) {
            nav.classList.add('active');
        } else {
            nav.classList.remove('active');
        }
    });

    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    const activeContent = document.getElementById(`${tabId}-tab`);
    if (activeContent) {
        activeContent.classList.add('active');
    }

    updatePageTitle(tabId);
}

function updatePageTitle(tabId) {
    const titleEl = document.getElementById('pageTitle');
    const subtitleEl = document.getElementById('pageSubtitle');

    const titles = {
        'dashboard': { title: '📊 Dashboard Overview Sếp', subtitle: 'Đo lường doanh số mốc 25M (trước 05/08) & 75M (Tháng 8)' },
        'forecast': { title: '🚀 Chu Kỳ 3 Ngày & Deal Forecasting', subtitle: 'Đo lường & dự báo số deal về trong chu kỳ 3 ngày (Solo Sale)' },
        'improvements': { title: '💡 Hộp Đề Xuất Cải Tiến', subtitle: 'Gửi khuyến nghị kịch bản & ưu đãi cho 2 Sếp phê duyệt' },
        'leads': { title: '📋 Master Lead Tracker', subtitle: 'Phễu quản lý lead & tích hợp Upload file ghi âm cuộc gọi' },
        'remind': { title: '📞 Call Remind & Showup Tracker', subtitle: 'Quản lý lịch nhắc 24h & 2h cho gói Xstream' },
        'cuunet': { title: '🚨 Leader Cứu Net & File Audio', subtitle: 'Nghe lại ghi âm cuộc gọi & chuyển angle chốt mới' },
        'checkin': { title: '⏰ Remind & Chấm Công Daily', subtitle: 'Điểm danh Check-in sáng 08:30 & Check-out chiều 17:30' }
    };

    if (titles[tabId]) {
        titleEl.textContent = titles[tabId].title;
        subtitleEl.textContent = titles[tabId].subtitle;
    }
}

/* ==========================================================================
   SECURITY MODAL GATE
   ========================================================================== */

function initSecuritySystem() {
    const submitBtn = document.getElementById('submitPinBtn');
    const cancelBtn = document.getElementById('cancelPinBtn');
    const lockBtn = document.getElementById('lockSystemBtn');
    const pinInput = document.getElementById('pinInput');
    const errorEl = document.getElementById('pinError');

    submitBtn.addEventListener('click', verifyPin);
    pinInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') verifyPin();
    });

    cancelBtn.addEventListener('click', closeSecurityModal);

    lockBtn.addEventListener('click', () => {
        isUnlocked = false;
        switchTab('dashboard');
        alert('Hệ thống CRM đã được khóa bảo mật! (PIN: 8888)');
    });

    function verifyPin() {
        if (pinInput.value === DEFAULT_PIN) {
            isUnlocked = true;
            errorEl.style.display = 'none';
            closeSecurityModal();
            if (pendingTabTarget) {
                switchTab(pendingTabTarget);
                pendingTabTarget = null;
            }
        } else {
            errorEl.style.display = 'block';
            pinInput.value = '';
            pinInput.focus();
        }
    }
}

function openSecurityModal() {
    const pinInput = document.getElementById('pinInput');
    const errorEl = document.getElementById('pinError');
    errorEl.style.display = 'none';
    pinInput.value = '';
    document.getElementById('securityModal').classList.add('active');
    setTimeout(() => pinInput.focus(), 100);
}

function closeSecurityModal() {
    document.getElementById('securityModal').classList.remove('active');
}

/* ==========================================================================
   AUDIO UPLOAD & PLAYBACK SYSTEM
   ========================================================================== */

function uploadAudio(event, customerName) {
    const file = event.target.files[0];
    if (file) {
        const audioUrl = URL.createObjectURL(file);
        uploadedAudios[customerName] = audioUrl;
        alert(`✅ Đã lưu file ghi âm "${file.name}" cho khách hàng ${customerName}! Bạn có thể bấm "Nghe Cuộc Gọi" để phát trực tiếp.`);
    }
}

function playAudio(customerName) {
    const modal = document.getElementById('audioModal');
    const audioPlayer = document.getElementById('realAudioPlayer');
    document.getElementById('audioCustomerTitle').textContent = `🎙️ Ghi Âm Cuộc Gọi: ${customerName}`;

    if (uploadedAudios[customerName]) {
        audioPlayer.src = uploadedAudios[customerName];
        document.getElementById('audioMetaInfo').textContent = `File ghi âm thực tế vừa được tải lên`;
    } else {
        document.getElementById('audioMetaInfo').textContent = `File ghi âm mặc định (Chưa có file mới upload)`;
        audioPlayer.src = "";
    }

    modal.classList.add('active');
    audioPlayer.play().catch(() => {});
}

function closeAudioModal() {
    const audioPlayer = document.getElementById('realAudioPlayer');
    audioPlayer.pause();
    document.getElementById('audioModal').classList.remove('active');
}

/* ==========================================================================
   DAILY CHECK-IN / CHECK-OUT TRIGGER
   ========================================================================== */

function doCheckIn(type) {
    if (type === 'in') {
        alert('✅ Check-in thành công 08:25 AM! Chúc Hường chốt bùng nổ 25M trước 05/08!');
    } else {
        alert('🌙 Check-out thành công 17:35 PM! Đã lưu tiến độ làm việc trong ngày!');
    }
}

document.getElementById('checkInQuickBtn').addEventListener('click', () => {
    if (!isUnlocked) {
        pendingTabTarget = 'checkin';
        openSecurityModal();
    } else {
        switchTab('checkin');
    }
});
