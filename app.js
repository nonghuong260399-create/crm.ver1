/* ==========================================================================
   Z CRM SYSTEM - FULLY DYNAMIC DUAL-LINKED STATE & LOCALSTORAGE PERSISTENCE
   ========================================================================== */

// CENTRAL CRM STATE
const DEFAULT_STATE = {
    targetMoc1: 25000000,
    targetMoc2: 75000000,
    leads: [
        {
            id: 'L001',
            name: 'Chị Hằng (Mỹ Phẩm)',
            phone: '0981xxxxxx',
            channel: 'Shopee',
            service: 'Xstream Mũi Nhọn',
            stage: '4. Proposal & Giá',
            hotness: 'hot',
            revenue: 16000000,
            forecastType: 'Firm (90%)',
            forecastDate: '2026-07-22',
            nextActionDate: '2026-07-22',
            nextAction: 'Call chốt ưu đãi Mốc 1 + HĐ',
            sale: 'Hường',
            audioUrl: '',
            remind1: '✅ Đã Gọi',
            remind2: '✅ Nhắn Link',
            showupStatus: '✅ Đã Tham Gia',
            lostReason: '',
            newAngle: '',
            cuuNetStatus: 'Bình thường',
            sprintId: 'sprint1'
        },
        {
            id: 'L002',
            name: 'Anh Nam (Thời Trang)',
            phone: '0912xxxxxx',
            channel: 'TikTok Shop',
            service: 'Xstream Mũi Nhọn',
            stage: '3. Showup Ok',
            hotness: 'hot',
            revenue: 12000000,
            forecastType: 'Firm (85%)',
            forecastDate: '2026-07-23',
            nextActionDate: '2026-07-21',
            nextAction: 'Gửi kịch bản demo + Báo giá',
            sale: 'Hường',
            audioUrl: '',
            remind1: '✅ Đã Gọi',
            remind2: '✅ Nhắn Link',
            showupStatus: '✅ Đã Tham Gia',
            lostReason: '',
            newAngle: '',
            cuuNetStatus: 'Bình thường',
            sprintId: 'sprint1'
        },
        {
            id: 'L003',
            name: 'Chị Lan (Gia Dụng)',
            phone: '0903xxxxxx',
            channel: 'Shopee',
            service: 'Gói Ecom Shopee',
            stage: '5. Đàm Phán HĐ',
            hotness: 'hot',
            revenue: 25000000,
            forecastType: 'Pipeline (70%)',
            forecastDate: '2026-07-25',
            nextActionDate: '2026-07-22',
            nextAction: 'Hường gọi chốt hợp đồng',
            sale: 'Hường',
            audioUrl: '',
            remind1: '-',
            remind2: '-',
            showupStatus: '-',
            lostReason: '',
            newAngle: '',
            cuuNetStatus: 'Bình thường',
            sprintId: 'sprint2'
        },
        {
            id: 'L004',
            name: 'Chị Mai (Mẹ & Bé)',
            phone: '0935xxxxxx',
            channel: 'TikTok Shop',
            service: 'Xstream Mũi Nhọn',
            stage: '7. Cứu Net',
            hotness: 'cold',
            revenue: 14000000,
            forecastType: 'Pipeline (50%)',
            forecastDate: '2026-07-28',
            nextActionDate: '2026-07-22',
            nextAction: 'Hường nghe audio & gọi lại',
            sale: 'Hường',
            audioUrl: '',
            remind1: '✅ Đã Gọi',
            remind2: '❌ Vắng',
            showupStatus: '❌ Vắng Mặt',
            lostReason: 'Khách chê giá gói Xstream 1 tháng đắt so với thuê sinh viên live',
            newAngle: 'Hường gọi lại: Phân tích bài toán ROI tiết kiệm 50% chi phí + Tặng 5 kịch bản live',
            cuuNetStatus: '⏳ Đang Gọi Lại',
            sprintId: 'sprint3'
        }
    ],
    improvements: [
        {
            id: 'IMP01',
            author: 'Hường (Solo Sale)',
            date: '21/07/2026',
            problem: 'Khách chê giá gói Xstream 1 tháng.',
            solution: 'Tặng kèm 10 kịch bản live cho khách chốt trước ngày 05/08 để hỗ trợ cán mốc 25M.',
            budget: '0 VNĐ',
            status: 'approved',
            statusText: '✅ Sếp Phong Đã Duyệt'
        }
    ],
    checkins: [
        {
            date: '21/07/2026',
            sale: 'Hường',
            timeIn: '08:25 AM',
            targetCalls: '20 calls',
            timeOut: '17:35 PM',
            actualCalls: '22 calls',
            dealsWon: '1 Deal (14M)',
            status: '✅ Chuẩn KPI'
        }
    ]
};

// State Manager
let CRMState = loadState();
let isUnlocked = false;
let pendingTabTarget = null;
const DEFAULT_PIN = "8888";

function loadState() {
    const saved = localStorage.getItem('Z_CRM_STATE_V1');
    if (saved) {
        try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

function saveState() {
    localStorage.setItem('Z_CRM_STATE_V1', JSON.stringify(CRMState));
    renderAll();
}

/* ==========================================================================
   APP INITIALIZATION & RENDER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSecuritySystem();
    initThemeSwitcher();
    initForms();
    renderAll();
});

function renderAll() {
    renderDashboardStats();
    renderMasterLeads();
    renderForecastTable();
    renderRemindTable();
    renderCuuNetTable();
    renderImprovements();
    renderCheckins();
}

/* ==========================================================================
   1. DASHBOARD STATS (DYNAMIC LINKING)
   ========================================================================== */

function renderDashboardStats() {
    // Calculate Actual Revenue Won
    const actualWon = CRMState.leads
        .filter(l => l.stage.includes('Won') || l.stage.includes('Đã Thu'))
        .reduce((sum, l) => sum + (l.revenue || 0), 14000000); // 14M default demo won

    // Calculate Pipeline Forecast for Sprint 1
    const sprint1Forecast = CRMState.leads
        .filter(l => l.sprintId === 'sprint1')
        .reduce((sum, l) => sum + (l.revenue || 0), 0);

    const percentWon = Math.min(100, Math.round((actualWon / CRMState.targetMoc1) * 100));
    const remainingWon = Math.max(0, CRMState.targetMoc1 - actualWon);

    // Update Card Values
    const moc1ValEl = document.querySelector('#dashboard-tab .stat-card:nth-child(1) .card-value');
    const moc1ProgEl = document.querySelector('#dashboard-tab .stat-card:nth-child(1) .progress');
    const moc1SubEl = document.querySelector('#dashboard-tab .stat-card:nth-child(1) .card-sub');

    if (moc1ValEl) moc1ValEl.textContent = formatVNĐ(actualWon);
    if (moc1ProgEl) moc1ProgEl.style.width = `${percentWon}%`;
    if (moc1SubEl) moc1SubEl.textContent = `Đạt ${percentWon}% - Còn thiếu ${formatVNĐ(remainingWon)} (15 Ngày)`;

    // Top Hot Deals in Dashboard
    const topDealsTbody = document.querySelector('#dashboard-tab .galaxy-table tbody');
    if (topDealsTbody) {
        const hotLeads = CRMState.leads.filter(l => l.hotness === 'hot' || l.forecastType.includes('Firm')).slice(0, 4);
        topDealsTbody.innerHTML = hotLeads.map(l => `
            <tr>
                <td><strong>${escapeHtml(l.name)}</strong></td>
                <td>${escapeHtml(l.service)}</td>
                <td class="text-cyan">${formatVNĐ(l.revenue)}</td>
                <td><span class="badge badge-hot">${l.forecastType}</span></td>
                <td>${escapeHtml(l.forecastDate)}</td>
            </tr>
        `).join('');
    }
}

/* ==========================================================================
   2. MASTER LEAD TRACKER (WITH AUDIO STORAGE & DYNAMIC LINK)
   ========================================================================== */

function renderMasterLeads() {
    const tbody = document.querySelector('#leads-tab .galaxy-table tbody');
    if (!tbody) return;

    tbody.innerHTML = CRMState.leads.map((l, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>21/07</td>
            <td><strong>${escapeHtml(l.name)}</strong></td>
            <td>${escapeHtml(l.phone)}</td>
            <td>${escapeHtml(l.service)}</td>
            <td><span class="status-pill ${getStagePillClass(l.stage)}">${escapeHtml(l.stage)}</span></td>
            <td><span class="badge ${l.hotness === 'hot' ? 'badge-hot' : 'badge-cold'}">${l.hotness === 'hot' ? '🔥 Hot' : '❄️ Cold'}</span></td>
            <td class="text-cyan">${formatVNĐ(l.revenue)}</td>
            <td>
                <div class="audio-cell">
                    ${l.audioUrl ? 
                        `<button class="btn btn-xs btn-purple" onclick="playRealAudio('${l.id}')"><i class="fa-solid fa-play"></i> Nghe Audio</button>` :
                        `<button class="btn btn-xs btn-glass" onclick="playMockAudio('${escapeHtml(l.name)}')"><i class="fa-solid fa-headphones"></i> Demo</button>`
                    }
                    <label class="btn btn-xs btn-glass upload-btn" title="Upload file audio từ máy">
                        <i class="fa-solid fa-upload"></i> Thêm File
                        <input type="file" accept="audio/*" onchange="handleAudioUpload(event, '${l.id}')" hidden>
                    </label>
                </div>
            </td>
            <td>${escapeHtml(l.nextActionDate)} (${escapeHtml(l.nextAction)})</td>
            <td>${escapeHtml(l.sale)}</td>
        </tr>
    `).join('');
}

/* ==========================================================================
   3. 3-DAY SPRINT & DEAL FORECASTING TABLE
   ========================================================================== */

function renderForecastTable() {
    const tbody = document.getElementById('forecastTableBody');
    if (!tbody) return;

    tbody.innerHTML = CRMState.leads.map((l, index) => `
        <tr>
            <td>${index + 1}</td>
            <td><strong>${escapeHtml(l.name)}</strong></td>
            <td>${escapeHtml(l.service)}</td>
            <td class="text-gradient">${formatVNĐ(l.revenue)}</td>
            <td><span class="badge ${l.forecastType.includes('Firm') ? 'badge-hot' : 'badge-warm'}">${escapeHtml(l.forecastType)}</span></td>
            <td>${escapeHtml(l.forecastDate)}</td>
            <td>${escapeHtml(l.sale)}</td>
            <td>21/07 14:00</td>
            <td>
                <button class="btn btn-xs ${l.forecastType.includes('Firm') ? 'btn-green' : 'btn-purple'}" onclick="quickStageAdvance('${l.id}')">
                    ${l.forecastType.includes('Firm') ? 'Gửi HĐ Chốt' : 'Hường Gọi Chốt'}
                </button>
            </td>
        </tr>
    `).join('');
}

/* ==========================================================================
   4. CALL REMIND & SHOWUP TRACKER (LINKED FROM XSTREAM LEADS)
   ========================================================================== */

function renderRemindTable() {
    const tbody = document.querySelector('#remind-tab .galaxy-table tbody');
    if (!tbody) return;

    const xstreamLeads = CRMState.leads.filter(l => l.service.toLowerCase().includes('xstream'));

    tbody.innerHTML = xstreamLeads.map((l, index) => `
        <tr>
            <td>${index + 1}</td>
            <td><strong>${escapeHtml(l.name)}</strong></td>
            <td>${escapeHtml(l.phone)}</td>
            <td>21/07 14:00</td>
            <td><span class="badge badge-green">${escapeHtml(l.remind1 || '✅ Đã Gọi')}</span></td>
            <td><span class="badge badge-green">${escapeHtml(l.remind2 || '✅ Nhắn Link')}</span></td>
            <td><span class="badge badge-green">${escapeHtml(l.showupStatus || '✅ Đã Tham Gia')}</span></td>
            <td>${escapeHtml(l.nextAction)}</td>
            <td>${escapeHtml(l.sale)}</td>
        </tr>
    `).join('');
}

/* ==========================================================================
   5. CỨU NET & FILE GHI ÂM (LINKED FROM CLOSED LOST / CỨU NET LEADS)
   ========================================================================== */

function renderCuuNetTable() {
    const tbody = document.querySelector('#cuunet-tab .galaxy-table tbody');
    if (!tbody) return;

    const cuuNetLeads = CRMState.leads.filter(l => l.stage.includes('Cứu Net') || l.stage.includes('Lost') || l.cuuNetStatus !== 'Bình thường');

    tbody.innerHTML = cuuNetLeads.map((l, index) => `
        <tr>
            <td>${index + 1}</td>
            <td><strong>${escapeHtml(l.name)}</strong></td>
            <td>${escapeHtml(l.service)}</td>
            <td>
                <button class="btn btn-xs btn-purple" onclick="playRealAudio('${l.id}')">
                    <i class="fa-solid fa-play"></i> Nghe Audio Cuộc Gọi
                </button>
            </td>
            <td>${escapeHtml(l.lostReason || 'Chưa phân tích rõ bài toán ROI tiết kiệm 50% chi phí')}</td>
            <td><strong>${escapeHtml(l.newAngle || 'Hường gọi lại: Phân tích ROI thực tế + Tặng 5 kịch bản live')}</strong></td>
            <td><span class="badge badge-yellow">${escapeHtml(l.cuuNetStatus || '⏳ Đang Gọi Lại')}</span></td>
        </tr>
    `).join('');
}

/* ==========================================================================
   6. IMPROVEMENTS & CHECKINS
   ========================================================================== */

function renderImprovements() {
    const listContainer = document.querySelector('.improvement-list');
    if (!listContainer) return;

    listContainer.innerHTML = CRMState.improvements.map(imp => `
        <div class="improvement-card">
            <div class="card-header">
                <span class="author">${escapeHtml(imp.author)} - ${escapeHtml(imp.date)}</span>
                <span class="badge ${imp.status === 'approved' ? 'badge-approved' : 'badge-pending'}">${escapeHtml(imp.statusText)}</span>
            </div>
            <div class="card-body">
                <strong>Vấn đề:</strong> ${escapeHtml(imp.problem)}
                <p><strong>Đề xuất:</strong> ${escapeHtml(imp.solution)}</p>
            </div>
        </div>
    `).join('');
}

function renderCheckins() {
    const tbody = document.querySelector('#checkin-tab .galaxy-table tbody');
    if (!tbody) return;

    tbody.innerHTML = CRMState.checkins.map((c, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${escapeHtml(c.date)}</td>
            <td><strong>${escapeHtml(c.sale)}</strong></td>
            <td>${escapeHtml(c.timeIn)}</td>
            <td>${escapeHtml(c.targetCalls)}</td>
            <td>${escapeHtml(c.timeOut)}</td>
            <td>${escapeHtml(c.actualCalls)}</td>
            <td>${escapeHtml(c.dealsWon)}</td>
            <td><span class="badge badge-green">${escapeHtml(c.status)}</span></td>
        </tr>
    `).join('');
}

/* ==========================================================================
   ACTIONS & EVENT HANDLERS
   ========================================================================== */

function handleAudioUpload(event, leadId) {
    const file = event.target.files[0];
    if (file) {
        const audioUrl = URL.createObjectURL(file);
        const lead = CRMState.leads.find(l => l.id === leadId);
        if (lead) {
            lead.audioUrl = audioUrl;
            saveState();
            alert(`✅ Đã lưu và liên kết file ghi âm "${file.name}" cho ${lead.name}! Tất cả các trang CRM đã được đồng bộ.`);
        }
    }
}

function playRealAudio(leadId) {
    const lead = CRMState.leads.find(l => l.id === leadId);
    if (!lead) return;

    const modal = document.getElementById('audioModal');
    const player = document.getElementById('realAudioPlayer');
    document.getElementById('audioCustomerTitle').textContent = `🎙️ File Ghi Âm: ${lead.name}`;

    if (lead.audioUrl) {
        player.src = lead.audioUrl;
        document.getElementById('audioMetaInfo').textContent = `File ghi âm thực tế đã tải lên`;
    } else {
        document.getElementById('audioMetaInfo').textContent = `File ghi âm mẫu (Bấm "Thêm File" trên bảng để tải file thực tế)`;
        player.src = "";
    }

    modal.classList.add('active');
    player.play().catch(() => {});
}

function playMockAudio(name) {
    const modal = document.getElementById('audioModal');
    document.getElementById('audioCustomerTitle').textContent = `🎙️ Ghi Âm Mẫu: ${name}`;
    document.getElementById('audioMetaInfo').textContent = `Bấm "Thêm File" để tải file audio thực tế của bạn lên`;
    modal.classList.add('active');
}

function closeAudioModal() {
    const player = document.getElementById('realAudioPlayer');
    player.pause();
    document.getElementById('audioModal').classList.remove('active');
}

function quickStageAdvance(leadId) {
    const lead = CRMState.leads.find(l => l.id === leadId);
    if (lead) {
        lead.stage = '6. Closed Won (Đã Thu Tiền)';
        saveState();
        alert(`🎉 Chúc mừng Hường! Đã chốt thành công deal ${lead.name} (${formatVNĐ(lead.revenue)})! Doanh thu Dashboard đã được cộng tự động.`);
    }
}

function initForms() {
    const impForm = document.getElementById('improvementForm');
    if (impForm) {
        const btn = impForm.querySelector('button');
        if (btn) {
            btn.onclick = () => {
                const textareas = impForm.querySelectorAll('textarea');
                const problem = textareas[0].value.trim();
                const solution = textareas[1].value.trim();

                if (!problem || !solution) {
                    alert('Vui lòng điền đầy đủ Vấn đề và Đề xuất!');
                    return;
                }

                CRMState.improvements.unshift({
                    id: 'IMP' + Date.now(),
                    author: 'Hường (Solo Sale)',
                    date: '21/07/2026',
                    problem: problem,
                    solution: solution,
                    budget: '0 VNĐ',
                    status: 'pending',
                    statusText: '⏳ Chờ 2 Sếp Duyệt'
                });

                textareas[0].value = '';
                textareas[1].value = '';
                saveState();
                alert('✅ Đã gửi đề xuất đến 2 Sếp thành công!');
            };
        }
    }
}

/* ==========================================================================
   NAVIGATION & SECURITY SYSTEMS
   ========================================================================== */

function initThemeSwitcher() {
    const themeBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeToggleText');
    const appBody = document.getElementById('appBody');

    themeBtn.addEventListener('click', () => {
        if (appBody.classList.contains('dark-mode')) {
            appBody.classList.remove('dark-mode');
            appBody.classList.add('light-mode');
            themeIcon.className = 'fa-solid fa-moon';
            themeText.textContent = 'Chế Độ Đêm';
        } else {
            appBody.classList.remove('light-mode');
            appBody.classList.add('dark-mode');
            themeIcon.className = 'fa-solid fa-sun';
            themeText.textContent = 'Chế Độ Ngày';
        }
    });
}

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
        nav.classList.toggle('active', nav.getAttribute('data-tab') === tabId);
    });

    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    const activeContent = document.getElementById(`${tabId}-tab`);
    if (activeContent) activeContent.classList.add('active');

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

function initSecuritySystem() {
    const submitBtn = document.getElementById('submitPinBtn');
    const cancelBtn = document.getElementById('cancelPinBtn');
    const lockBtn = document.getElementById('lockSystemBtn');
    const pinInput = document.getElementById('pinInput');
    const errorEl = document.getElementById('pinError');

    submitBtn.addEventListener('click', verifyPin);
    pinInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') verifyPin(); });
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

/* ==========================================================================
   HELPERS & UTILS
   ========================================================================== */

function formatVNĐ(num) {
    return (num || 0).toLocaleString('vi-VN') + ' đ';
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, function(m) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
}

function getStagePillClass(stage) {
    if (stage.includes('Won') || stage.includes('Thu Tiền')) return 'status-green';
    if (stage.includes('Proposal') || stage.includes('Giá')) return 'status-purple';
    if (stage.includes('Showup')) return 'status-orange';
    if (stage.includes('Cứu Net') || stage.includes('Lost')) return 'status-red';
    return 'status-purple';
}
