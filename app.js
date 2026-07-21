/* ==========================================================================
   Z CRM SYSTEM v3 — EXPERT-GRADE REWRITE
   Full data-driven, enum-based, real-time sync, notification system
   ========================================================================== */

/* ---------- ENUMS & DISPLAY MAPPING (Data tách biệt Display) ---------- */

const STAGES = {
    KHACH_MOI:       { label: 'Khách Mới',              icon: '🆕', css: 'status-new' },
    TIEP_CAN:        { label: 'Đang Tiếp Cận',          icon: '📞', css: 'status-new' },
    PROPOSAL:        { label: 'Proposal & Báo Giá',      icon: '📋', css: 'status-proposal' },
    DANG_TRIEN_KHAI: { label: 'Đang Triển Khai',         icon: '⚡', css: 'status-active' },
    NGHIEM_THU:      { label: 'Nghiệm Thu (Thu Tiền)',    icon: '✅', css: 'status-delivered' },
    KHACH_CU:        { label: 'Khách Cũ (Retained)',      icon: '💎', css: 'status-retained' },
    NGUNG:           { label: 'Ngưng Triển Khai',         icon: '⏸️', css: 'status-paused' },
    CANCEL:          { label: 'Cancel / Hủy Deal',        icon: '❌', css: 'status-canceled' },
    CUU_NET:         { label: 'Cứu Net (Win-back)',       icon: '🚨', css: 'status-cuunet' }
};

const REMIND_STATUS = {
    DONE: { label: 'Đã Gọi',  css: 'badge-green' },
    WAIT: { label: 'Chờ',     css: 'badge-yellow' },
    MISS: { label: 'Vắng',    css: 'badge-red' },
    NONE: { label: '-',       css: 'badge-muted' }
};

const CALL_RESULTS = [
    'Quan tâm', 'Đã gửi Proposal', 'Chờ phản hồi', 'Hẹn gọi lại',
    'Thuê bao', 'Không nghe máy', 'Từ chối', 'Đã chốt HĐ', 'Cần Sếp hỗ trợ'
];

const CONTACT_TYPES = [
    { value: 'CALL',    label: 'Gọi điện' },
    { value: 'ZALO',    label: 'Nhắn Zalo' },
    { value: 'MEETING', label: 'Gặp trực tiếp' },
    { value: 'EMAIL',   label: 'Email' },
    { value: 'OTHER',   label: 'Khác' }
];

const FORECAST_WEIGHTS = {
    'Firm (100%)':    1.0,
    'Firm (90%)':     0.9,
    'Firm (85%)':     0.85,
    'Pipeline (70%)': 0.7,
    'Pipeline (50%)': 0.5,
    'Pipeline (40%)': 0.4,
    'Lost':           0
};

function stageDisplay(key) { return STAGES[key] || STAGES.KHACH_MOI; }
function remindDisplay(key) { return REMIND_STATUS[key] || REMIND_STATUS.NONE; }

/* ---------- DEFAULT DATA (CLEAN ENUM-BASED) ---------- */

const DEFAULT_STATE = {
    targetMoc1: 25000000,
    targetMoc2: 75000000,
    daysRemaining: 15,
    leads: [
        {
            id: 'L001', date: '21/07/2026', source: 'Ads Facebook',
            zaloName: 'Hằng Nguyễn', brand: 'Mỹ Phẩm Hằng Beauty', phone: '0981xxxxxx',
            activities: [
                { date: '2026-07-21 09:30', sale: 'Hường', type: 'CALL', note: 'Gọi lần 1: Hỏi gói Xstream & Báo giá', result: 'Quan tâm' },
                { date: '2026-07-21 11:00', sale: 'Hường', type: 'ZALO', note: 'Gửi Proposal 1 trang', result: 'Đã gửi Proposal' },
                { date: '2026-07-22 10:00', sale: 'Hường', type: 'CALL', note: 'Hẹn Call chốt HĐ', result: 'Hẹn gọi lại' }
            ],
            stage: 'PROPOSAL',
            customerClass: 'Hot (ICP)', category: 'Mỹ Phẩm', mhkd: 'B2C / Online Shop',
            customerInfo: 'Live mệt, tốn chi phí host, lead rớt sau gọi. Cần gói Xstream bám đuổi',
            followUpDate: '22/07/2026', slaDays: 1, slaStatus: 'Đúng Hạn', contactMethod: 'Zalo / Call',
            revenue: 16000000, forecastType: 'Firm (90%)', forecastDate: '2026-07-22',
            sale: 'Hường', sprintId: 'sprint1',
            remind1: 'DONE', remind2: 'DONE', showupStatus: 'DONE',
            lostReason: '', newAngle: '', cuuNetStatus: 'OK',
            attachments: []
        },
        {
            id: 'L002', date: '21/07/2026', source: 'TikTok Outbound',
            zaloName: 'Nam Đỗ', brand: 'Nam Shop Thời Trang', phone: '0912xxxxxx',
            activities: [
                { date: '2026-07-21 09:00', sale: 'Hường', type: 'CALL', note: 'Khai thác nỗi đau live', result: 'Quan tâm' },
                { date: '2026-07-21 14:00', sale: 'Hường', type: 'MEETING', note: 'Showup Demo Xstream', result: 'Đã gửi Proposal' },
                { date: '2026-07-23 10:00', sale: 'Hường', type: 'CALL', note: 'Chờ chốt HĐ', result: 'Hẹn gọi lại' }
            ],
            stage: 'DANG_TRIEN_KHAI',
            customerClass: 'Hot', category: 'Thời Trang', mhkd: 'B2C Shop',
            customerInfo: 'TikTok Shop view thấp, muốn chạy Xstream tự động',
            followUpDate: '21/07/2026', slaDays: 2, slaStatus: 'Đúng Hạn', contactMethod: 'Zalo Call',
            revenue: 12000000, forecastType: 'Firm (85%)', forecastDate: '2026-07-23',
            sale: 'Hường', sprintId: 'sprint1',
            remind1: 'DONE', remind2: 'DONE', showupStatus: 'DONE',
            lostReason: '', newAngle: '', cuuNetStatus: 'OK',
            attachments: []
        },
        {
            id: 'L003', date: '20/07/2026', source: 'Referral',
            zaloName: 'Minh Trần', brand: 'Điện Máy Minh Gia', phone: '0974xxxxxx',
            activities: [
                { date: '2026-07-20 10:00', sale: 'Hường', type: 'MEETING', note: 'Họp Zoom: Tư vấn Ecom Shopee', result: 'Quan tâm' },
                { date: '2026-07-21 09:00', sale: 'Hường', type: 'ZALO', note: 'Gửi Hợp Đồng', result: 'Đã gửi Proposal' },
                { date: '2026-07-21 15:00', sale: 'Hường', type: 'CALL', note: 'Đã thanh toán 100% đợt 1', result: 'Đã chốt HĐ' }
            ],
            stage: 'NGHIEM_THU',
            customerClass: 'VVIP (ICP)', category: 'Gia Dụng / Đồ Điện', mhkd: 'B2B & B2C',
            customerInfo: 'Cần vận hành gian hàng Shopee trọn gói + Chạy ads tối ưu',
            followUpDate: '25/07/2026', slaDays: 5, slaStatus: 'Đúng Hạn', contactMethod: 'Direct Meeting',
            revenue: 28000000, forecastType: 'Firm (100%)', forecastDate: '2026-07-20',
            sale: 'Hường', sprintId: 'sprint1',
            remind1: 'NONE', remind2: 'NONE', showupStatus: 'NONE',
            lostReason: '', newAngle: '', cuuNetStatus: 'OK',
            attachments: []
        },
        {
            id: 'L004', date: '19/07/2026', source: 'Event Agency',
            zaloName: 'Thu Mẹ Bé', brand: 'Thu Baby Store', phone: '0903xxxxxx',
            activities: [
                { date: '2026-07-19 10:00', sale: 'Hường', type: 'CALL', note: 'Review gian hàng', result: 'Quan tâm' },
                { date: '2026-07-20 14:00', sale: 'Hường', type: 'ZALO', note: 'Gửi Proposal Retain', result: 'Đã gửi Proposal' },
                { date: '2026-07-21 09:00', sale: 'Hường', type: 'CALL', note: 'Khách dời lịch ký sang tuần sau', result: 'Hẹn gọi lại' }
            ],
            stage: 'KHACH_CU',
            customerClass: 'Warm', category: 'Mẹ & Bé', mhkd: 'Retail / Chuỗi',
            customerInfo: 'Khách cũ tái ký hợp đồng vận hành Shopee đợt 2',
            followUpDate: '26/07/2026', slaDays: 0, slaStatus: 'Cảnh Báo', contactMethod: 'Zalo',
            revenue: 18000000, forecastType: 'Pipeline (70%)', forecastDate: '2026-07-25',
            sale: 'Hường', sprintId: 'sprint2',
            remind1: 'NONE', remind2: 'NONE', showupStatus: 'NONE',
            lostReason: '', newAngle: '', cuuNetStatus: 'OK',
            attachments: []
        },
        {
            id: 'L005', date: '18/07/2026', source: 'Ads Facebook',
            zaloName: 'Tuấn Nông Sản', brand: 'Nông Sản Xanh Tuấn', phone: '0945xxxxxx',
            activities: [
                { date: '2026-07-18 09:00', sale: 'Hường', type: 'CALL', note: 'Tư vấn Xstream', result: 'Quan tâm' },
                { date: '2026-07-19 10:00', sale: 'Hường', type: 'CALL', note: 'Khách dời lịch sang tháng sau', result: 'Hẹn gọi lại' }
            ],
            stage: 'NGUNG',
            customerClass: 'Cold', category: 'Nông Sản', mhkd: 'B2C Online',
            customerInfo: 'Kho tạm dừng nhập hàng, chờ giải quyết xong đợt cũ',
            followUpDate: '28/07/2026', slaDays: -2, slaStatus: 'Quá Hạn', contactMethod: 'Call',
            revenue: 10000000, forecastType: 'Pipeline (40%)', forecastDate: '2026-07-30',
            sale: 'Hường', sprintId: 'sprint4',
            remind1: 'DONE', remind2: 'WAIT', showupStatus: 'DONE',
            lostReason: '', newAngle: '', cuuNetStatus: 'OK',
            attachments: []
        },
        {
            id: 'L006', date: '17/07/2026', source: 'Outbound Zalo',
            zaloName: 'Hoàng Nam', brand: 'Hoàng Nam Menswear', phone: '0968xxxxxx',
            activities: [
                { date: '2026-07-17 10:00', sale: 'Hường', type: 'CALL', note: 'Pitching MT-GT', result: 'Quan tâm' },
                { date: '2026-07-18 09:00', sale: 'Hường', type: 'CALL', note: 'Khách báo hủy dự án', result: 'Từ chối' }
            ],
            stage: 'CANCEL',
            customerClass: 'Lost', category: 'Thời Trang', mhkd: 'B2C Offline',
            customerInfo: 'Thay đổi kế hoạch kinh doanh tập trung mở shop phố',
            followUpDate: '20/07/2026', slaDays: -5, slaStatus: 'Quá Hạn', contactMethod: 'Call',
            revenue: 0, forecastType: 'Lost', forecastDate: '2026-07-19',
            sale: 'Hường', sprintId: 'sprint1',
            remind1: 'NONE', remind2: 'NONE', showupStatus: 'NONE',
            lostReason: 'Chuyển ngân sách mở cửa hàng phố', newAngle: '', cuuNetStatus: 'CANCEL',
            attachments: []
        },
        {
            id: 'L007', date: '16/07/2026', source: 'TikTok Ads',
            zaloName: 'Mai Gia Dụng', brand: 'Mai Home Mart', phone: '0935xxxxxx',
            activities: [
                { date: '2026-07-16 10:00', sale: 'Hường', type: 'CALL', note: 'Tư vấn gói Xstream', result: 'Quan tâm' },
                { date: '2026-07-17 14:00', sale: 'Hường', type: 'ZALO', note: 'Gửi báo giá', result: 'Đã gửi Proposal' },
                { date: '2026-07-18 09:00', sale: 'Hường', type: 'CALL', note: 'Khách im lặng sau nhận giá → chuyển Cứu Net', result: 'Cần Sếp hỗ trợ' }
            ],
            stage: 'CUU_NET',
            customerClass: 'Cold', category: 'Gia Dụng', mhkd: 'B2C Online',
            customerInfo: 'Chê giá gói 1 tháng đắt so với thuê sinh viên live',
            followUpDate: '22/07/2026', slaDays: 1, slaStatus: 'Đúng Hạn', contactMethod: 'Zalo / Call',
            revenue: 14000000, forecastType: 'Pipeline (50%)', forecastDate: '2026-07-28',
            sale: 'Hường', sprintId: 'sprint3',
            remind1: 'DONE', remind2: 'MISS', showupStatus: 'MISS',
            lostReason: 'Chê giá gói 1 tháng đắt so với thuê sinh viên live',
            newAngle: 'Hường gọi lại: Phân tích ROI thực tế + Tặng 5 kịch bản live',
            cuuNetStatus: 'FOLLOWING',
            attachments: []
        }
    ],
    improvements: [
        {
            id: 'IMP01', author: 'Hường (Solo Sale)', date: '21/07/2026',
            problem: 'Khách chê giá gói Xstream 1 tháng.',
            solution: 'Tặng kèm 10 kịch bản live cho khách chốt trước ngày 05/08 để hỗ trợ cán mốc 25M.',
            budget: '0 VNĐ', status: 'approved', statusText: 'Sếp Phong Đã Duyệt'
        }
    ],
    checkins: [
        { date: '21/07/2026', sale: 'Hường', timeIn: '08:25 AM', targetCalls: '20 calls', timeOut: '17:35 PM', actualCalls: '22 calls', dealsWon: '1 Deal (14M)', status: 'OK' }
    ]
};

/* ---------- STATE MANAGEMENT ---------- */

let currentFilters = { search: '', stage: 'all', source: 'all', category: 'all', sale: 'all', dateFrom: '', dateTo: '', period2026: 'all' };
let CRMState = loadState();
let isUnlocked = true;
let pendingTabTarget = null;
let selectedLeads = new Set();
const DEFAULT_PIN = "8888";

function loadState() {
    const saved = localStorage.getItem('Z_CRM_STATE_V3');
    if (saved) {
        try { return JSON.parse(saved); } catch (e) { console.error('State load error:', e); }
    }
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

function saveState() {
    try {
        const stateStr = JSON.stringify(CRMState);
        const sizeMB = (new Blob([stateStr]).size / 1024 / 1024).toFixed(2);
        if (parseFloat(sizeMB) > 4) {
            showToast('warning', 'Dung lượng lưu trữ', `Đang dùng ${sizeMB}MB / 5MB. Hãy xóa file audio cũ để tránh mất data.`);
        }
        localStorage.setItem('Z_CRM_STATE_V3', stateStr);
    } catch (e) {
        showToast('error', 'Lỗi lưu trữ', 'localStorage đã đầy! Hãy xóa bớt file đính kèm.');
    }
    renderAll();
}

/* ---------- APP INIT ---------- */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSecuritySystem();
    initThemeSwitcher();
    initFilterBar();
    initForms();
    initAddLeadSystem();
    initEditSystem();
    renderAll();
    checkStartupNotifications();
    startScheduledReminders();
});

function renderAll() {
    renderDashboardCards();
    renderSprintTimeline();
    renderTopDeals();
    renderMasterLeads();
    renderForecastTable();
    renderRemindTable();
    renderCuuNetTable();
    renderImprovements();
    renderCheckins();
}

/* ==========================================================================
   PHASE 3: DASHBOARD — 100% DATA-DRIVEN
   ========================================================================== */

function calcWeightedForecast() {
    return CRMState.leads.reduce((sum, l) => {
        const w = FORECAST_WEIGHTS[l.forecastType] ?? 0;
        return sum + (l.revenue || 0) * w;
    }, 0);
}

function calcActualRevenue() {
    return CRMState.leads
        .filter(l => l.stage === 'NGHIEM_THU')
        .reduce((sum, l) => sum + (l.revenue || 0), 0);
}

function calcShowupRate() {
    const showupLeads = CRMState.leads.filter(l => l.showupStatus && l.showupStatus !== 'NONE');
    if (showupLeads.length === 0) return 0;
    const attended = showupLeads.filter(l => l.showupStatus === 'DONE').length;
    return Math.round((attended / showupLeads.length) * 100);
}

function calcSLAAlerts() {
    return CRMState.leads.filter(l => l.slaDays <= 0 && l.stage !== 'CANCEL' && l.stage !== 'NGHIEM_THU').length;
}

function renderDashboardCards() {
    const container = document.getElementById('dashboardCards');
    if (!container) return;

    const actualRev = calcActualRevenue();
    const weightedRev = calcWeightedForecast();
    const pctMoc1 = Math.min(100, Math.round((actualRev / CRMState.targetMoc1) * 100));
    const remainMoc1 = Math.max(0, CRMState.targetMoc1 - actualRev);

    const hotDeals = CRMState.leads.filter(l => l.forecastType.includes('Firm') && l.stage !== 'NGHIEM_THU' && l.stage !== 'CANCEL');
    const hotDealsTotal = hotDeals.reduce((s, l) => s + (l.revenue || 0), 0);

    const showupRate = calcShowupRate();
    const slaAlerts = calcSLAAlerts();

    container.innerHTML = `
        <div class="stat-card galaxy-card">
            <button class="btn btn-xs btn-glass" onclick="openEditTargetsModal()" style="position:absolute;top:16px;right:16px;z-index:2;" title="Sửa Target & KPI"><i class="fa-solid fa-pen"></i> Sửa Target</button>
            <div class="card-icon cyan"><i class="fa-solid fa-vault"></i></div>
            <div class="card-data">
                <span class="card-label">Doanh Thu Đã Thu (Mốc 1: 05/08)</span>
                <h2 class="card-value">${formatVND(actualRev)}</h2>
                <div class="progress-bar"><div class="progress" style="width:${pctMoc1}%"></div></div>
                <span class="card-sub">Đạt ${pctMoc1}% / Target ${formatVND(CRMState.targetMoc1)} — Còn ${CRMState.daysRemaining} ngày</span>
            </div>
        </div>
        <div class="stat-card galaxy-card">
            <div class="card-icon purple"><i class="fa-solid fa-chart-line"></i></div>
            <div class="card-data">
                <span class="card-label">Doanh Thu Dự Báo (Weighted Pipeline)</span>
                <h2 class="card-value">${formatVND(weightedRev)}</h2>
                <span class="card-sub">Tổng pipeline × xác suất chốt thực tế</span>
            </div>
        </div>
        <div class="stat-card galaxy-card">
            <div class="card-icon pink"><i class="fa-solid fa-fire"></i></div>
            <div class="card-data">
                <span class="card-label">Deal Nóng (Firm) Chờ Chốt</span>
                <h2 class="card-value">${formatVND(hotDealsTotal)}</h2>
                <span class="card-tag">${hotDeals.length} Deals Firm đang bám</span>
                <span class="card-sub">Dự kiến về trong Sprint hiện tại</span>
            </div>
        </div>
        <div class="stat-card galaxy-card">
            <div class="card-icon blue"><i class="fa-solid fa-phone-volume"></i></div>
            <div class="card-data">
                <span class="card-label">Tỷ Lệ Showup Live</span>
                <h2 class="card-value">${showupRate}%</h2>
                <span class="card-sub">Tính từ leads có lịch Showup</span>
            </div>
        </div>
        <div class="stat-card galaxy-card ${slaAlerts > 0 ? 'card-alert' : ''}">
            <div class="card-icon ${slaAlerts > 0 ? 'red' : 'green'}"><i class="fa-solid ${slaAlerts > 0 ? 'fa-triangle-exclamation' : 'fa-shield-check'}"></i></div>
            <div class="card-data">
                <span class="card-label">Cảnh Báo SLA</span>
                <h2 class="card-value">${slaAlerts > 0 ? slaAlerts + ' khách quá hạn' : 'Tất cả đúng hạn'}</h2>
                <span class="card-sub">${slaAlerts > 0 ? 'Cần follow-up ngay hôm nay!' : 'Không có khách nào quá hạn SLA'}</span>
            </div>
        </div>
    `;
}

function renderSprintTimeline() {
    const container = document.getElementById('sprintPanel');
    if (!container) return;

    const sprints = [
        { id: 'sprint1', label: 'Sprint 1 (21-23/07)', target: 10000000 },
        { id: 'sprint2', label: 'Sprint 2 (24-26/07)', target: 15000000 },
        { id: 'sprint3', label: 'Sprint 3 (27-29/07)', target: 12000000 },
        { id: 'sprint4', label: 'Sprint 4 (30/07-01/08)', target: 10000000 },
        { id: 'sprint5', label: 'Sprint 5 (02-04/08) — Cán 25M', target: 8000000 }
    ];

    const sprintHTML = sprints.map((sp, i) => {
        const spLeads = CRMState.leads.filter(l => l.sprintId === sp.id);
        const spRevenue = spLeads.reduce((s, l) => s + (l.revenue || 0), 0);
        const spDeals = spLeads.length;
        const pct = sp.target > 0 ? Math.round((spRevenue / sp.target) * 100) : 0;
        const isActive = i === 0;
        const isDone = pct >= 100;
        const statusClass = isDone ? 'status-green' : (isActive ? 'status-orange' : '');
        const statusText = isDone ? `Đạt ${pct}%` : (isActive ? 'Đang Chạy' : 'Sắp tới');

        return `
            <div class="sprint-item ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}">
                <div class="sprint-badge">${sp.label}</div>
                <div class="sprint-info">
                    <strong>Doanh thu: ${formatVND(spRevenue)}</strong> / Target ${formatVND(sp.target)}
                    <p>${spDeals} deal(s) trong Sprint</p>
                </div>
                <span class="status-pill ${statusClass}">${statusText}</span>
            </div>
        `;
    }).join('');

    container.innerHTML = `
        <div class="panel-header">
            <h3>Tiến Độ Doanh Số Chu Kỳ 3 Ngày</h3>
            <span class="panel-tag">Sprint Tracker</span>
        </div>
        ${sprintHTML}
    `;
}

function renderTopDeals() {
    const container = document.getElementById('topDealsPanel');
    if (!container) return;

    const topLeads = CRMState.leads
        .filter(l => l.stage !== 'CANCEL' && l.stage !== 'NGHIEM_THU' && l.revenue > 0)
        .sort((a, b) => {
            const wA = FORECAST_WEIGHTS[a.forecastType] ?? 0;
            const wB = FORECAST_WEIGHTS[b.forecastType] ?? 0;
            return (wB * b.revenue) - (wA * a.revenue);
        })
        .slice(0, 5);

    const rowsHTML = topLeads.map(l => `
        <tr>
            <td><span class="cust-primary">${esc(l.brand || l.zaloName)}</span><span class="cust-secondary">${esc(l.phone)}</span></td>
            <td>${esc(l.category)}</td>
            <td class="text-cyan font-bold">${formatVND(l.revenue)}</td>
            <td><span class="badge ${l.forecastType.includes('Firm') ? 'badge-hot' : 'badge-warm'}">${esc(l.forecastType)}</span></td>
            <td>${esc(l.forecastDate)}</td>
        </tr>
    `).join('');

    container.innerHTML = `
        <div class="panel-header">
            <h3>Top Deal Nóng Cần Sếp Duyệt Nhanh</h3>
            <button class="btn btn-sm btn-glass" onclick="switchTab('forecast')">Xem Forecast</button>
        </div>
        <table class="galaxy-table">
            <thead><tr><th>Khách Hàng</th><th>Ngành</th><th>Giá Trị</th><th>Tỷ Lệ</th><th>Dự Kiến Về</th></tr></thead>
            <tbody>${rowsHTML}</tbody>
        </table>
    `;
}

/* ==========================================================================
   MASTER LEAD TRACKER — 19 COL + ACTIVITY LOG + SLA SORT
   ========================================================================== */

function initFilterBar() {
    const ids = ['searchInput', 'filterStage', 'filterSource', 'filterCategory', 'filterSale', 'filterPeriod2026', 'filterDateFrom', 'filterDateTo'];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const event = (id === 'searchInput') ? 'input' : 'change';
        el.addEventListener(event, () => {
            currentFilters.search = (document.getElementById('searchInput')?.value || '').toLowerCase();
            currentFilters.stage = document.getElementById('filterStage')?.value || 'all';
            currentFilters.source = document.getElementById('filterSource')?.value || 'all';
            currentFilters.category = document.getElementById('filterCategory')?.value || 'all';
            currentFilters.sale = document.getElementById('filterSale')?.value || 'all';
            currentFilters.period2026 = document.getElementById('filterPeriod2026')?.value || 'all';
            currentFilters.dateFrom = document.getElementById('filterDateFrom')?.value || '';
            currentFilters.dateTo = document.getElementById('filterDateTo')?.value || '';
            renderMasterLeads();
        });
    });

    const resetBtn = document.getElementById('resetFilterBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            currentFilters = { search: '', stage: 'all', source: 'all', category: 'all', sale: 'all', dateFrom: '', dateTo: '', period2026: 'all' };
            ids.forEach(id => { const el = document.getElementById(id); if (el) el.value = id.startsWith('filterDate') ? '' : 'all'; });
            if (document.getElementById('searchInput')) document.getElementById('searchInput').value = '';
            renderMasterLeads();
        });
    }
}

function renderMasterLeads() {
    const tbody = document.getElementById('masterLeadsTbody');
    if (!tbody) return;

    let filtered = CRMState.leads.filter(l => {
        const isArchivedFilter = currentFilters.stage === 'ARCHIVED';
        if (isArchivedFilter) {
            if (!l._archived) return false;
        } else {
            if (l._archived) return false;
        }

        const matchSearch = !currentFilters.search ||
            (l.zaloName || '').toLowerCase().includes(currentFilters.search) ||
            (l.brand || '').toLowerCase().includes(currentFilters.search) ||
            (l.phone || '').includes(currentFilters.search) ||
            (l.source || '').toLowerCase().includes(currentFilters.search);

        const matchStage = isArchivedFilter || currentFilters.stage === 'all' || l.stage === currentFilters.stage;
        const matchSource = currentFilters.source === 'all' || (l.source || '').toLowerCase().includes(currentFilters.source.toLowerCase());
        const matchCategory = currentFilters.category === 'all' || (l.category || '').toLowerCase().includes(currentFilters.category.toLowerCase());
        const matchSale = currentFilters.sale === 'all' || (l.sale || '').toLowerCase().includes(currentFilters.sale.toLowerCase());

        // 2026 Period Filter
        let matchPeriod = true;
        if (currentFilters.period2026 !== 'all') {
            const dateStr = l.date || '';
            if (currentFilters.period2026.startsWith('T')) {
                const monthNum = parseInt(currentFilters.period2026.split('_')[0].substring(1));
                const monthStr = String(monthNum).padStart(2, '0');
                matchPeriod = dateStr.includes(`/${monthStr}/2026`) || dateStr.startsWith(`2026-${monthStr}`);
            } else if (currentFilters.period2026.startsWith('Q')) {
                const qNum = parseInt(currentFilters.period2026.substring(1, 2));
                const startM = (qNum - 1) * 3 + 1;
                const months = [startM, startM + 1, startM + 2].map(m => String(m).padStart(2, '0'));
                matchPeriod = months.some(m => dateStr.includes(`/${m}/2026`) || dateStr.startsWith(`2026-${m}`));
            }
        }

        return matchSearch && matchStage && matchSource && matchCategory && matchSale && matchPeriod;
    });

    // SLA auto-sort: quá hạn lên đầu
    filtered.sort((a, b) => (a.slaDays || 999) - (b.slaDays || 999));

    // Update bulk toolbar
    updateBulkToolbar();

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="20" style="text-align:center;padding:32px;color:var(--text-muted);">Không tìm thấy khách hàng nào phù hợp bộ lọc.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(l => {
        const sd = stageDisplay(l.stage);
        const actCount = l.activities ? l.activities.length : 0;
        const slaRowClass = l.slaDays <= 0 ? 'row-sla-overdue' : (l.slaDays <= 2 ? 'row-sla-warning' : '');
        const isSelected = selectedLeads.has(l.id);

        const act1 = l.activities?.[0];
        const act2 = l.activities?.[1];
        const act3 = l.activities?.[2];
        const lastResult = (l.activities && l.activities.length > 0) ? l.activities[l.activities.length - 1].result : (l.stageResult || 'Đã tiếp cận');

        return `
        <tr class="${slaRowClass} ${isSelected ? 'row-selected' : ''}" data-lead-id="${l.id}">
            <td class="td-checkbox" onclick="event.stopPropagation()">
                <input type="checkbox" class="lead-checkbox" value="${l.id}" ${isSelected ? 'checked' : ''} onchange="toggleLeadSelect('${l.id}', this.checked)">
            </td>
            <td class="td-clickable" onclick="openLeadDetail('${l.id}')">${esc(l.date)}</td>
            <td class="td-clickable" onclick="openLeadDetail('${l.id}')"><span class="badge badge-purple">${esc(l.source)}</span></td>
            <td class="td-clickable" onclick="openLeadDetail('${l.id}')"><strong>${esc(l.zaloName)}</strong></td>
            <td class="td-clickable" onclick="openLeadDetail('${l.id}')"><span class="cust-primary">${esc(l.brand)}</span></td>
            <td class="td-clickable" onclick="openLeadDetail('${l.id}')"><span class="cust-secondary">${esc(l.phone)}</span></td>
            <td style="max-width:140px;font-size:11px;" title="${act1 ? esc(act1.date + ' - ' + act1.note) : ''}">${act1 ? esc(act1.note) : '-'}</td>
            <td style="max-width:140px;font-size:11px;" title="${act2 ? esc(act2.date + ' - ' + act2.note) : ''}">${act2 ? esc(act2.note) : '-'}</td>
            <td style="max-width:140px;font-size:11px;">
                ${act3 ? esc(act3.note) : '-'}
                ${actCount > 3 ? `<span class="badge badge-muted" style="margin-left:4px;">+${actCount - 3}</span>` : ''}
                <button class="btn btn-xs btn-glass" style="margin-left:4px;" onclick="event.stopPropagation();openActivityLog('${l.id}')" title="Xem & Ghi chú">+</button>
            </td>
            <td class="td-clickable" onclick="openLeadDetail('${l.id}')"><span class="cust-primary" style="font-size:12px;">${esc(lastResult)}</span></td>
            <td class="td-clickable" onclick="openLeadDetail('${l.id}')"><span class="badge ${getHotBadge(l.customerClass)}">${esc(l.customerClass)}</span></td>
            <td>${esc(l.category)}</td>
            <td>${esc(l.mhkd)}</td>
            <td>
                <div class="audio-cell">
                    ${l.attachments && l.attachments.some(a => a.type === 'audio')
                        ? `<button class="btn btn-xs btn-purple" onclick="event.stopPropagation();playAttachedAudio('${l.id}')">Nghe</button>`
                        : `<button class="btn btn-xs btn-glass" onclick="event.stopPropagation();playMockAudio('${esc(l.brand)}')">Audio</button>`
                    }
                    <label class="btn btn-xs btn-glass upload-btn" title="Upload Audio" onclick="event.stopPropagation()">
                        Up<input type="file" accept="audio/*" onchange="handleAudioUpload(event, '${l.id}')" hidden>
                    </label>
                </div>
            </td>
            <td style="max-width:180px;font-size:11px;white-space:normal;">${esc(l.customerInfo)}</td>
            <td><span class="status-pill ${sd.css}">${sd.icon} ${sd.label}</span></td>
            <td><strong>${esc(l.followUpDate)}</strong></td>
            <td style="text-align:center;"><strong>${l.slaDays} ngày</strong></td>
            <td><span class="sla-pill ${getSlaCss(l.slaStatus)}">${esc(l.slaStatus)}</span></td>
            <td>
                ${esc(l.contactMethod)}
                <button class="btn btn-xs btn-galaxy" style="margin-left:6px;" onclick="event.stopPropagation();openEditLeadModal('${l.id}')" title="Sửa tất cả biến"><i class="fa-solid fa-pen"></i></button>
            </td>
        </tr>`;
    }).join('');
}

/* ---------- MULTI-SELECT & BULK ACTIONS ---------- */

function toggleLeadSelect(leadId, checked) {
    if (checked) selectedLeads.add(leadId);
    else selectedLeads.delete(leadId);
    updateBulkToolbar();
    // Update row visual
    const row = document.querySelector(`tr[data-lead-id="${leadId}"]`);
    if (row) row.classList.toggle('row-selected', checked);
    // Update select-all checkbox
    const selectAll = document.getElementById('selectAllLeads');
    if (selectAll) {
        const allCheckboxes = document.querySelectorAll('.lead-checkbox');
        selectAll.checked = allCheckboxes.length > 0 && selectedLeads.size === allCheckboxes.length;
        selectAll.indeterminate = selectedLeads.size > 0 && selectedLeads.size < allCheckboxes.length;
    }
}

function toggleSelectAll(checked) {
    const checkboxes = document.querySelectorAll('.lead-checkbox');
    checkboxes.forEach(cb => {
        cb.checked = checked;
        if (checked) selectedLeads.add(cb.value);
        else selectedLeads.delete(cb.value);
        const row = document.querySelector(`tr[data-lead-id="${cb.value}"]`);
        if (row) row.classList.toggle('row-selected', checked);
    });
    updateBulkToolbar();
}

function updateBulkToolbar() {
    const toolbar = document.getElementById('bulkToolbar');
    if (!toolbar) return;
    if (selectedLeads.size > 0) {
        toolbar.classList.add('active');
        document.getElementById('bulkCount').textContent = selectedLeads.size;
    } else {
        toolbar.classList.remove('active');
    }
}

function bulkDelete() {
    if (selectedLeads.size === 0) return;
    if (!confirm(`Bạn chắc chắn muốn XOÁ VĨNH VIỄN ${selectedLeads.size} khách hàng? Hành động này không thể hoàn tác!`)) return;
    CRMState.leads = CRMState.leads.filter(l => !selectedLeads.has(l.id));
    showToast('success', 'Đã xóa', `${selectedLeads.size} khách hàng đã được xóa khỏi hệ thống.`);
    selectedLeads.clear();
    saveState();
}

function bulkArchive() {
    if (selectedLeads.size === 0) return;
    let count = 0;
    CRMState.leads.forEach(l => {
        if (selectedLeads.has(l.id)) { l._archived = true; count++; }
    });
    showToast('info', 'Đã lưu trữ', `${count} khách hàng đã chuyển vào Lưu Trữ. Bạn có thể chọn "Khách Đã Lưu Trữ" ở bộ lọc Pipeline để xem và lấy lại bất kỳ lúc nào.`);
    selectedLeads.clear();
    saveState();
}

function bulkRestore() {
    if (selectedLeads.size === 0) return;
    let count = 0;
    CRMState.leads.forEach(l => {
        if (selectedLeads.has(l.id)) { l._archived = false; count++; }
    });
    showToast('success', 'Đã khôi phục', `${count} khách hàng đã được đưa trở lại danh sách làm việc!`);
    selectedLeads.clear();
    saveState();
}

function restoreSingleLead(leadId) {
    const lead = CRMState.leads.find(l => l.id === leadId);
    if (!lead) return;
    lead._archived = false;
    saveState();
    showToast('success', 'Đã khôi phục', `Khách hàng ${lead.brand || lead.zaloName} đã được quay lại danh sách chính!`);
}

function bulkChangeStage(newStage) {
    if (selectedLeads.size === 0) return;
    let count = 0;
    CRMState.leads.forEach(l => {
        if (selectedLeads.has(l.id)) { l.stage = newStage; count++; }
    });
    const sd = stageDisplay(newStage);
    showToast('success', 'Đã cập nhật', `${count} khách đã chuyển sang "${sd.label}". Dashboard tự động cập nhật.`);
    selectedLeads.clear();
    saveState();
}

function cancelBulkSelect() {
    selectedLeads.clear();
    document.querySelectorAll('.lead-checkbox').forEach(cb => cb.checked = false);
    const selectAll = document.getElementById('selectAllLeads');
    if (selectAll) { selectAll.checked = false; selectAll.indeterminate = false; }
    updateBulkToolbar();
    renderMasterLeads();
}

/* ---------- CUSTOMER DETAIL MODAL ---------- */

function openLeadDetail(leadId) {
    const lead = CRMState.leads.find(l => l.id === leadId);
    if (!lead) return;
    const sd = stageDisplay(lead.stage);
    const modal = document.getElementById('leadDetailModal');

    // Build activity timeline HTML
    let activitiesHTML = '';
    if (lead.activities && lead.activities.length > 0) {
        activitiesHTML = lead.activities.map(a => `
            <div class="activity-entry">
                <div class="activity-time">${esc(a.date)}</div>
                <div class="activity-body">
                    <span class="badge badge-purple" style="font-size:10px;">${esc(a.type)}</span>
                    <span class="activity-sale">${esc(a.sale)}</span>
                    <p class="activity-note">${esc(a.note)}</p>
                    <span class="badge ${a.result === 'Từ chối' ? 'badge-hot' : 'badge-warm'}" style="font-size:10px;">${esc(a.result)}</span>
                </div>
            </div>
        `).join('');
    } else {
        activitiesHTML = '<p style="color:var(--text-muted);text-align:center;padding:16px;">Chưa có lịch sử tiếp xúc</p>';
    }

    // Build attachments
    let attachHTML = '';
    if (lead.attachments && lead.attachments.length > 0) {
        attachHTML = lead.attachments.map((a, i) => `
            <div class="attach-item">
                <i class="fa-solid ${a.type === 'audio' ? 'fa-headphones' : 'fa-file'}"></i>
                <span>${esc(a.name)}</span>
                <span class="badge badge-muted">${esc(a.date)}</span>
                ${a.type === 'audio' ? `<button class="btn btn-xs btn-purple" onclick="event.stopPropagation(); let au=new Audio('${a.data.substring(0,50)}'); playAttachedAudio('${lead.id}')">Nghe</button>` : ''}
            </div>
        `).join('');
    } else {
        attachHTML = '<p style="color:var(--text-muted);font-size:12px;">Chưa có file đính kèm</p>';
    }

    const weightedRev = (lead.revenue || 0) * (FORECAST_WEIGHTS[lead.forecastType] ?? 0);

    document.getElementById('leadDetailContent').innerHTML = `
        <div class="detail-header">
            <div class="detail-brand">
                <h2>${esc(lead.brand || lead.zaloName)}</h2>
                <span class="status-pill ${sd.css}">${sd.icon} ${sd.label}</span>
                <span class="badge ${getHotBadge(lead.customerClass)}">${esc(lead.customerClass)}</span>
                ${lead._archived ? '<span class="badge badge-muted">📦 Đã Lưu Trữ</span>' : ''}
            </div>
            <div class="detail-meta">
                <span>ID: ${esc(lead.id)}</span> · <span>Ngày tạo: ${esc(lead.date)}</span> · <span>Sale: <strong>${esc(lead.sale)}</strong></span>
            </div>
        </div>

        <div class="detail-grid">
            <div class="detail-section">
                <h4>Thông Tin Liên Hệ</h4>
                <div class="detail-row"><span class="detail-label">Tên Zalo</span><span class="detail-value">${esc(lead.zaloName)}</span></div>
                <div class="detail-row"><span class="detail-label">Brand / Shop</span><span class="detail-value"><strong>${esc(lead.brand)}</strong></span></div>
                <div class="detail-row"><span class="detail-label">SĐT / Zalo</span><span class="detail-value">${esc(lead.phone)}</span></div>
                <div class="detail-row"><span class="detail-label">Nguồn</span><span class="detail-value"><span class="badge badge-purple">${esc(lead.source)}</span></span></div>
                <div class="detail-row"><span class="detail-label">Liên hệ qua</span><span class="detail-value">${esc(lead.contactMethod)}</span></div>
            </div>

            <div class="detail-section">
                <h4>Thông Tin Kinh Doanh</h4>
                <div class="detail-row"><span class="detail-label">Ngành hàng</span><span class="detail-value">${esc(lead.category)}</span></div>
                <div class="detail-row"><span class="detail-label">Mô hình KD</span><span class="detail-value">${esc(lead.mhkd)}</span></div>
                <div class="detail-row"><span class="detail-label">Doanh thu dự kiến</span><span class="detail-value text-cyan font-bold">${formatVND(lead.revenue)}</span></div>
                <div class="detail-row"><span class="detail-label">Forecast</span><span class="detail-value"><span class="badge ${(lead.forecastType || '').includes('Firm') ? 'badge-hot' : 'badge-warm'}">${esc(lead.forecastType)}</span></span></div>
                <div class="detail-row"><span class="detail-label">DT có trọng số</span><span class="detail-value font-bold">${formatVND(weightedRev)}</span></div>
                <div class="detail-row"><span class="detail-label">Sprint</span><span class="detail-value">${esc(lead.sprintId)}</span></div>
            </div>

            <div class="detail-section">
                <h4>Trạng Thái & SLA</h4>
                <div class="detail-row"><span class="detail-label">Pipeline</span><span class="detail-value"><span class="status-pill ${sd.css}">${sd.icon} ${sd.label}</span></span></div>
                <div class="detail-row"><span class="detail-label">Follow-up</span><span class="detail-value"><strong>${esc(lead.followUpDate)}</strong></span></div>
                <div class="detail-row"><span class="detail-label">SLA còn lại</span><span class="detail-value"><strong style="color:${lead.slaDays <= 0 ? 'var(--red-rose)' : (lead.slaDays <= 2 ? 'var(--yellow-amber)' : 'var(--green-emerald)')}">${lead.slaDays} ngày</strong></span></div>
                <div class="detail-row"><span class="detail-label">Trạng thái SLA</span><span class="detail-value"><span class="sla-pill ${getSlaCss(lead.slaStatus)}">${esc(lead.slaStatus)}</span></span></div>
            </div>

            <div class="detail-section">
                <h4>Nhu Cầu / Pain Point</h4>
                <p class="detail-info">${esc(lead.customerInfo) || 'Chưa ghi nhận'}</p>
                ${lead.lostReason ? `<div class="detail-row"><span class="detail-label">Lý do mất deal</span><span class="detail-value" style="color:var(--red-rose);">${esc(lead.lostReason)}</span></div>` : ''}
                ${lead.newAngle ? `<div class="detail-row"><span class="detail-label">Angle cứu net</span><span class="detail-value" style="color:var(--cyan-neon);">${esc(lead.newAngle)}</span></div>` : ''}
            </div>
        </div>

        <div class="detail-section" style="margin-top:20px;">
            <h4>Lịch Sử Tiếp Xúc (${lead.activities?.length || 0} lần)</h4>
            <div class="activity-timeline">${activitiesHTML}</div>
            <button class="btn btn-sm btn-galaxy" onclick="closeLeadDetail(); openActivityLog('${lead.id}');"><i class="fa-solid fa-plus"></i> Ghi Nhanh Tiếp Xúc Mới</button>
        </div>

        <div class="detail-section" style="margin-top:16px;">
            <h4>File Đính Kèm (${lead.attachments?.length || 0})</h4>
            <div class="attach-list">${attachHTML}</div>
        </div>

        <div class="detail-actions">
            ${lead._archived ? `
                <button class="btn btn-green" onclick="restoreSingleLead('${lead.id}'); closeLeadDetail();"><i class="fa-solid fa-rotate-left"></i> Khôi Phục Về Danh Sách Bán Hàng</button>
            ` : `
                <button class="btn btn-galaxy" onclick="closeLeadDetail(); openActivityLog('${lead.id}');"><i class="fa-solid fa-pen"></i> Ghi Chú Mới</button>
                <button class="btn btn-purple" onclick="quickStageAdvance('${lead.id}'); closeLeadDetail();"><i class="fa-solid fa-arrow-right"></i> Chuyển Nghiệm Thu</button>
            `}
            <button class="btn btn-glass" style="color:var(--red-rose);" onclick="if(confirm('Xóa ${esc(lead.brand)} khỏi hệ thống?')) { deleteSingleLead('${lead.id}'); closeLeadDetail(); }"><i class="fa-solid fa-trash"></i> Xóa</button>
        </div>
    `;

    modal.classList.add('active');
}

function closeLeadDetail() {
    document.getElementById('leadDetailModal').classList.remove('active');
}

function deleteSingleLead(leadId) {
    CRMState.leads = CRMState.leads.filter(l => l.id !== leadId);
    selectedLeads.delete(leadId);
    saveState();
    showToast('success', 'Đã xóa', 'Khách hàng đã được xóa khỏi hệ thống.');
}

/* ---------- ACTIVITY LOG POPUP ---------- */

function openActivityLog(leadId) {
    const lead = CRMState.leads.find(l => l.id === leadId);
    if (!lead) return;

    const modal = document.getElementById('activityModal');
    document.getElementById('activityLeadName').textContent = `${lead.brand || lead.zaloName} — ${lead.phone}`;

    // Render timeline
    const timeline = document.getElementById('activityTimeline');
    if (lead.activities && lead.activities.length > 0) {
        timeline.innerHTML = lead.activities.map((a, i) => `
            <div class="activity-entry">
                <div class="activity-time">${esc(a.date)}</div>
                <div class="activity-body">
                    <span class="badge badge-purple" style="font-size:10px;">${esc(a.type)}</span>
                    <span class="activity-sale">${esc(a.sale)}</span>
                    <p class="activity-note">${esc(a.note)}</p>
                    <span class="badge ${a.result === 'Từ chối' ? 'badge-hot' : 'badge-warm'}" style="font-size:10px;">${esc(a.result)}</span>
                </div>
            </div>
        `).join('');
    } else {
        timeline.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:20px;">Chưa có lịch sử tiếp xúc</p>';
    }

    // Set lead ID for quick log form
    document.getElementById('quickLogLeadId').value = leadId;
    modal.classList.add('active');
}

function closeActivityModal() {
    document.getElementById('activityModal').classList.remove('active');
}

function submitQuickLog() {
    const leadId = document.getElementById('quickLogLeadId').value;
    const type = document.getElementById('quickLogType').value;
    const result = document.getElementById('quickLogResult').value;
    const note = document.getElementById('quickLogNote').value.trim();

    if (!note) { alert('Vui lòng ghi chú nội dung cuộc gọi!'); return; }

    const lead = CRMState.leads.find(l => l.id === leadId);
    if (!lead) return;

    if (!lead.activities) lead.activities = [];
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

    lead.activities.push({
        date: dateStr,
        sale: 'Hường',
        type: type,
        note: note,
        result: result
    });

    saveState();
    document.getElementById('quickLogNote').value = '';
    openActivityLog(leadId); // Refresh timeline
    showToast('success', 'Đã ghi chú', `Lưu vết tiếp xúc cho ${lead.brand || lead.zaloName} thành công!`);
}

/* ---------- ADD NEW LEAD ---------- */

function initAddLeadSystem() {
    const openBtn = document.getElementById('openAddLeadBtn');
    if (openBtn) openBtn.addEventListener('click', () => document.getElementById('addLeadModal').classList.add('active'));

    const form = document.getElementById('addLeadForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const newLead = {
                id: 'L' + Date.now(),
                date: new Date().toLocaleDateString('vi-VN'),
                source: document.getElementById('newSource').value,
                zaloName: document.getElementById('newZaloName').value.trim(),
                brand: document.getElementById('newBrand').value.trim(),
                phone: document.getElementById('newPhone').value.trim(),
                activities: [],
                stage: 'KHACH_MOI',
                customerClass: 'Warm', category: document.getElementById('newCategory').value,
                mhkd: 'B2C Online',
                customerInfo: document.getElementById('newInfo').value.trim(),
                followUpDate: document.getElementById('newFollowUp').value || '',
                slaDays: 3, slaStatus: 'Đúng Hạn', contactMethod: 'Zalo / Call',
                revenue: parseFloat(document.getElementById('newRevenue').value) || 0,
                forecastType: 'Pipeline (50%)', forecastDate: '',
                sale: document.getElementById('newSale').value || 'Hường',
                sprintId: 'sprint2',
                remind1: 'NONE', remind2: 'NONE', showupStatus: 'NONE',
                lostReason: '', newAngle: '', cuuNetStatus: 'OK',
                attachments: []
            };

            CRMState.leads.unshift(newLead);
            saveState();
            closeAddLeadModal();
            form.reset();
            showToast('success', 'Thêm Lead mới', `${newLead.brand || newLead.zaloName} đã được thêm vào hệ thống!`);
        });
    }
}

function closeAddLeadModal() {
    document.getElementById('addLeadModal').classList.remove('active');
}

/* ---------- AUDIO UPLOAD (BASE64 PERSIST) ---------- */

function handleAudioUpload(event, leadId) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
        showToast('warning', 'File quá lớn', 'Audio tối đa 5MB. Hãy nén file trước khi upload.');
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
        const lead = CRMState.leads.find(l => l.id === leadId);
        if (!lead) return;
        if (!lead.attachments) lead.attachments = [];
        lead.attachments.push({
            type: 'audio',
            name: file.name,
            data: reader.result,
            date: new Date().toLocaleDateString('vi-VN')
        });
        saveState();
        showToast('success', 'Upload thành công', `File "${file.name}" đã lưu cho ${lead.brand || lead.zaloName}. Không mất khi refresh!`);
    };
    reader.readAsDataURL(file);
}

function playAttachedAudio(leadId) {
    const lead = CRMState.leads.find(l => l.id === leadId);
    if (!lead) return;
    const audio = lead.attachments?.find(a => a.type === 'audio');
    if (!audio) return;

    const modal = document.getElementById('audioModal');
    const player = document.getElementById('realAudioPlayer');
    document.getElementById('audioCustomerTitle').textContent = `File Ghi Âm: ${lead.brand || lead.zaloName}`;
    document.getElementById('audioMetaInfo').textContent = `${audio.name} — Uploaded ${audio.date}`;
    player.src = audio.data;
    modal.classList.add('active');
    player.play().catch(() => {});
}

function playMockAudio(name) {
    const modal = document.getElementById('audioModal');
    document.getElementById('audioCustomerTitle').textContent = `Ghi Âm: ${name}`;
    document.getElementById('audioMetaInfo').textContent = `Bấm "Upload" trên bảng Lead để chọn file ghi âm thực tế`;
    document.getElementById('realAudioPlayer').src = '';
    modal.classList.add('active');
}

function closeAudioModal() {
    document.getElementById('realAudioPlayer').pause();
    document.getElementById('audioModal').classList.remove('active');
}

/* ==========================================================================
   OTHER TABS (PRESERVED — chỉ fix enum display)
   ========================================================================== */

function renderForecastTable() {
    const tbody = document.getElementById('forecastTableBody');
    if (!tbody) return;

    tbody.innerHTML = CRMState.leads
        .filter(l => l.stage !== 'CANCEL' && l.revenue > 0)
        .map((l, i) => {
        const sd = stageDisplay(l.stage);
        return `
        <tr>
            <td>${i + 1}</td>
            <td><span class="cust-primary">${esc(l.brand || l.zaloName)}</span></td>
            <td>${esc(l.category)}</td>
            <td class="text-gradient font-bold">${formatVND(l.revenue)}</td>
            <td><span class="badge ${l.forecastType.includes('Firm') ? 'badge-hot' : 'badge-warm'}">${esc(l.forecastType)}</span></td>
            <td>${esc(l.forecastDate)}</td>
            <td>${esc(l.sale)}</td>
            <td>${l.activities?.length ? esc(l.activities[l.activities.length-1].date.slice(5,10)) : '-'}</td>
            <td>
                <button class="btn btn-xs ${l.stage === 'NGHIEM_THU' ? 'btn-green' : 'btn-purple'}" onclick="quickStageAdvance('${l.id}')">
                    ${l.stage === 'NGHIEM_THU' ? 'Đã Thu Tiền' : 'Chuyển Nghiệm Thu'}
                </button>
            </td>
        </tr>`;
    }).join('');
}

function renderRemindTable() {
    const tbody = document.querySelector('#remind-tab .galaxy-table tbody');
    if (!tbody) return;
    const xLeads = CRMState.leads.filter(l => l.remind1 !== 'NONE' || l.remind2 !== 'NONE');

    tbody.innerHTML = xLeads.map((l, i) => {
        const r1 = remindDisplay(l.remind1);
        const r2 = remindDisplay(l.remind2);
        const su = remindDisplay(l.showupStatus);
        return `
        <tr>
            <td>${i+1}</td>
            <td><span class="cust-primary">${esc(l.brand || l.zaloName)}</span></td>
            <td>${esc(l.phone)}</td>
            <td>14:00</td>
            <td><span class="badge ${r1.css}">${r1.label}</span></td>
            <td><span class="badge ${r2.css}">${r2.label}</span></td>
            <td><span class="badge ${su.css}">${su.label}</span></td>
            <td>${l.activities?.length ? esc(l.activities[l.activities.length-1].note) : '-'}</td>
            <td>${esc(l.sale)}</td>
        </tr>`;
    }).join('');
}

function renderCuuNetTable() {
    const tbody = document.querySelector('#cuunet-tab .galaxy-table tbody');
    if (!tbody) return;
    const cuuLeads = CRMState.leads.filter(l => l.stage === 'CUU_NET' || l.stage === 'CANCEL' || l.cuuNetStatus === 'FOLLOWING');

    tbody.innerHTML = cuuLeads.map((l, i) => `
        <tr>
            <td>${i+1}</td>
            <td><span class="cust-primary">${esc(l.brand || l.zaloName)}</span></td>
            <td>${esc(l.category)}</td>
            <td>
                ${l.attachments?.some(a => a.type === 'audio')
                    ? `<button class="btn btn-xs btn-purple" onclick="playAttachedAudio('${l.id}')">Nghe Audio</button>`
                    : `<button class="btn btn-xs btn-glass" onclick="playMockAudio('${esc(l.brand)}')">Audio</button>`
                }
            </td>
            <td>${esc(l.lostReason || 'Chưa phân tích rõ')}</td>
            <td><strong>${esc(l.newAngle || 'Đang phân tích angle cứu net')}</strong></td>
            <td><span class="badge badge-yellow">${l.cuuNetStatus === 'FOLLOWING' ? 'Đang Gọi Lại' : (l.cuuNetStatus === 'CANCEL' ? 'Đã Hủy' : 'Chờ xử lý')}</span></td>
        </tr>
    `).join('');
}

function renderImprovements() {
    const list = document.querySelector('.improvement-list');
    if (!list) return;
    list.innerHTML = CRMState.improvements.map(imp => `
        <div class="improvement-card">
            <div class="card-header">
                <span class="author">${esc(imp.author)} - ${esc(imp.date)}</span>
                <span class="badge ${imp.status === 'approved' ? 'badge-approved' : 'badge-pending'}">${imp.status === 'approved' ? '✅ ' : '⏳ '}${esc(imp.statusText)}</span>
            </div>
            <div class="card-body">
                <strong>Vấn đề:</strong> ${esc(imp.problem)}
                <p><strong>Đề xuất:</strong> ${esc(imp.solution)}</p>
            </div>
        </div>
    `).join('');
}

function renderCheckins() {
    const tbody = document.querySelector('#checkin-tab .galaxy-table tbody');
    if (!tbody) return;
    tbody.innerHTML = CRMState.checkins.map((c, i) => `
        <tr>
            <td>${i+1}</td>
            <td>${esc(c.date)}</td>
            <td><strong>${esc(c.sale)}</strong></td>
            <td>${esc(c.timeIn)}</td>
            <td>${esc(c.targetCalls)}</td>
            <td>${esc(c.timeOut)}</td>
            <td>${esc(c.actualCalls)}</td>
            <td>${esc(c.dealsWon)}</td>
            <td><span class="badge badge-green">${c.status === 'OK' ? '✅ Chuẩn KPI' : esc(c.status)}</span></td>
        </tr>
    `).join('');
}

/* ==========================================================================
   TOAST NOTIFICATION SYSTEM
   ========================================================================== */

function showToast(type, title, message, duration = 6000) {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;
    const iconMap = { success: 'fa-circle-check', warning: 'fa-triangle-exclamation', error: 'fa-circle-xmark', info: 'fa-circle-info' };
    toast.innerHTML = `
        <div class="toast-icon"><i class="fa-solid ${iconMap[type] || iconMap.info}"></i></div>
        <div class="toast-body">
            <strong class="toast-title">${esc(title)}</strong>
            <p class="toast-msg">${esc(message)}</p>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;

    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); }, duration);
}

function checkStartupNotifications() {
    // SLA alerts
    const overdueLeads = CRMState.leads.filter(l => l.slaDays <= 0 && l.stage !== 'CANCEL' && l.stage !== 'NGHIEM_THU');
    if (overdueLeads.length > 0) {
        const names = overdueLeads.map(l => `${l.brand} (SLA: ${l.slaDays} ngày)`).join(', ');
        showToast('warning', `${overdueLeads.length} khách quá hạn SLA!`, names, 10000);
    }

    // Upcoming follow-ups today
    const today = new Date().toLocaleDateString('vi-VN');
    const followUps = CRMState.leads.filter(l => l.followUpDate === today && l.stage !== 'CANCEL' && l.stage !== 'NGHIEM_THU');
    if (followUps.length > 0) {
        showToast('info', `${followUps.length} khách cần follow-up hôm nay`, followUps.map(l => l.brand || l.zaloName).join(', '), 8000);
    }
}

function startScheduledReminders() {
    // Check every 30 minutes for scheduled reminders
    setInterval(() => {
        const now = new Date();
        const h = now.getHours();
        const m = now.getMinutes();

        if (h === 8 && m >= 25 && m <= 35) {
            const total = CRMState.leads.filter(l => l.stage !== 'CANCEL' && l.stage !== 'NGHIEM_THU').length;
            showToast('info', 'Chào buổi sáng!', `Hôm nay có ${total} khách đang theo dõi. Bắt đầu Check-in!`);
        }
        if (h === 11 && m >= 0 && m <= 5) {
            const firmDeals = CRMState.leads.filter(l => l.forecastType.includes('Firm') && l.stage !== 'NGHIEM_THU').length;
            showToast('info', 'Nhắc buổi trưa', `${firmDeals} deal Firm đang chờ chốt Sprint này`);
        }
        if (h === 14 && m >= 0 && m <= 5) {
            showToast('warning', 'Giờ Call Remind Xstream!', 'Kiểm tra danh sách khách cần gọi nhắc Showup 2h');
        }
        if (h === 17 && m >= 0 && m <= 5) {
            showToast('info', 'Chuẩn bị Check-out!', 'Cập nhật kết quả cuộc gọi hôm nay trước khi ra về');
        }
    }, 60000 * 30); // Check every 30 min
}

/* ==========================================================================
   ACTIONS & EVENTS
   ========================================================================== */

function quickStageAdvance(leadId) {
    const lead = CRMState.leads.find(l => l.id === leadId);
    if (!lead) return;
    lead.stage = 'NGHIEM_THU';
    saveState();
    showToast('success', 'Chúc mừng!', `${lead.brand || lead.zaloName} đã chuyển Nghiệm Thu (${formatVND(lead.revenue)})! Dashboard tự động cập nhật.`);
}

function initForms() {
    const impForm = document.getElementById('improvementForm');
    if (impForm) {
        const btn = impForm.querySelector('button');
        if (btn) btn.onclick = () => {
            const textareas = impForm.querySelectorAll('textarea');
            const problem = textareas[0].value.trim();
            const solution = textareas[1].value.trim();
            if (!problem || !solution) { alert('Vui lòng điền đầy đủ Vấn đề và Đề xuất!'); return; }

            CRMState.improvements.unshift({
                id: 'IMP' + Date.now(), author: 'Hường (Solo Sale)', date: new Date().toLocaleDateString('vi-VN'),
                problem, solution, budget: '0 VNĐ', status: 'pending', statusText: 'Chờ 2 Sếp Duyệt'
            });
            textareas[0].value = ''; textareas[1].value = '';
            saveState();
            showToast('success', 'Đề xuất đã gửi', 'Đã gửi đến 2 Sếp thành công!');
        };
    }
}

/* ==========================================================================
   NAV / THEME / SECURITY
   ========================================================================== */

function initThemeSwitcher() {
    const themeBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeToggleText');
    const body = document.getElementById('appBody');

    themeBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.replace('dark-mode', 'light-mode');
            themeIcon.className = 'fa-solid fa-moon'; themeText.textContent = 'Chế Độ Đêm';
        } else {
            body.classList.replace('light-mode', 'dark-mode');
            themeIcon.className = 'fa-solid fa-sun'; themeText.textContent = 'Chế Độ Ngày';
        }
    });
}

function initNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const tab = item.getAttribute('data-tab');
            if (item.classList.contains('protected') && !isUnlocked) {
                pendingTabTarget = tab; openSecurityModal();
            } else { switchTab(tab); }
        });
    });
}

function switchTab(tabId) {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.toggle('active', n.getAttribute('data-tab') === tabId));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    const el = document.getElementById(`${tabId}-tab`);
    if (el) el.classList.add('active');
    updatePageTitle(tabId);
}

function updatePageTitle(tabId) {
    const t = document.getElementById('pageTitle');
    const s = document.getElementById('pageSubtitle');
    const map = {
        'dashboard': ['Dashboard Overview Sếp', 'Đo lường doanh số mốc 25M (trước 05/08) & 75M (Tháng 8) — Real-time'],
        'forecast': ['Chu Kỳ 3 Ngày & Deal Forecasting', 'Đo lường & dự báo số deal về trong chu kỳ 3 ngày'],
        'improvements': ['Hộp Đề Xuất Cải Tiến', 'Gửi khuyến nghị kịch bản & ưu đãi cho 2 Sếp phê duyệt'],
        'leads': ['Master Lead Tracker', 'Theo dõi 19 cột chuẩn + Activity Log + SLA tự động cảnh báo'],
        'remind': ['Call Remind & Showup Tracker', 'Quản lý lịch nhắc 24h & 2h cho gói Xstream'],
        'cuunet': ['Leader Cứu Net & File Audio', 'Nghe lại ghi âm cuộc gọi & chuyển angle chốt mới'],
        'checkin': ['Remind & Chấm Công Daily', 'Điểm danh Check-in sáng 08:30 & Check-out chiều 17:30']
    };
    if (map[tabId]) { t.textContent = map[tabId][0]; s.textContent = map[tabId][1]; }
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
        isUnlocked = false; switchTab('dashboard');
        showToast('info', 'Đã khóa CRM', 'Hệ thống đã được khóa bảo mật (PIN: 8888)');
    });

    function verifyPin() {
        if (pinInput.value === DEFAULT_PIN) {
            isUnlocked = true; errorEl.style.display = 'none'; closeSecurityModal();
            if (pendingTabTarget) { switchTab(pendingTabTarget); pendingTabTarget = null; }
        } else { errorEl.style.display = 'block'; pinInput.value = ''; pinInput.focus(); }
    }
}

function openSecurityModal() {
    const pin = document.getElementById('pinInput');
    document.getElementById('pinError').style.display = 'none';
    pin.value = '';
    document.getElementById('securityModal').classList.add('active');
    setTimeout(() => pin.focus(), 100);
}

function closeSecurityModal() {
    document.getElementById('securityModal').classList.remove('active');
}

function doCheckIn(type) {
    if (type === 'in') {
        showToast('success', 'Check-in thành công', `${new Date().toLocaleTimeString('vi-VN')} — Chúc Sale chốt bùng nổ!`);
    } else {
        showToast('info', 'Check-out thành công', `${new Date().toLocaleTimeString('vi-VN')} — Đã lưu tiến độ làm việc!`);
    }
}

document.getElementById('checkInQuickBtn').addEventListener('click', () => {
    if (!isUnlocked) { pendingTabTarget = 'checkin'; openSecurityModal(); }
    else { switchTab('checkin'); }
});

/* ==========================================================================
   HELPERS
   ========================================================================== */

function formatVND(n) { return (n || 0).toLocaleString('vi-VN') + ' đ'; }
function esc(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
}
function getHotBadge(cls) {
    if (!cls) return 'badge-cold';
    if (cls.includes('Hot') || cls.includes('VVIP') || cls.includes('ICP')) return 'badge-hot';
    if (cls.includes('Warm')) return 'badge-warm';
    return 'badge-cold';
}
function getSlaCss(s) {
    if (!s) return 'sla-ok';
    if (s.includes('Đúng')) return 'sla-ok';
    if (s.includes('Cảnh Báo')) return 'sla-warning';
    return 'sla-overdue';
}

/* ==========================================================================
   VARIABLE EDITING SYSTEM (EDIT LEAD & EDIT TARGETS)
   ========================================================================== */

function initEditSystem() {
    // Edit Targets Form submit
    const targetsForm = document.getElementById('editTargetsForm');
    if (targetsForm) {
        targetsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const moc1 = parseFloat(document.getElementById('targetMoc1Input').value) || 0;
            const moc2 = parseFloat(document.getElementById('targetMoc2Input').value) || 0;
            const days = parseInt(document.getElementById('daysRemainingInput').value) || 0;

            CRMState.targetMoc1 = moc1;
            CRMState.targetMoc2 = moc2;
            CRMState.daysRemaining = days;

            saveState();
            closeEditTargetsModal();
            showToast('success', 'Đã cập nhật Target', 'Các biến Target & KPI đã được lưu và cập nhật trên Dashboard!');
        });
    }

    // Edit Lead Form submit
    const leadForm = document.getElementById('editLeadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const leadId = document.getElementById('editLeadId').value;
            const lead = CRMState.leads.find(l => l.id === leadId);
            if (!lead) return;

            lead.zaloName = document.getElementById('editZaloName').value.trim();
            lead.brand = document.getElementById('editBrand').value.trim();
            lead.phone = document.getElementById('editPhone').value.trim();
            lead.source = document.getElementById('editSource').value;
            lead.stage = document.getElementById('editStage').value;
            lead.customerClass = document.getElementById('editCustomerClass').value;
            lead.category = document.getElementById('editCategory').value;
            lead.mhkd = document.getElementById('editMhkd').value.trim();
            lead.revenue = parseFloat(document.getElementById('editRevenue').value) || 0;
            lead.forecastType = document.getElementById('editForecastType').value;
            lead.sale = document.getElementById('editSale').value;
            lead.sprintId = document.getElementById('editSprintId').value;
            lead.followUpDate = document.getElementById('editFollowUpDate').value.trim();
            lead.slaDays = parseInt(document.getElementById('editSlaDays').value) || 0;
            lead.slaStatus = document.getElementById('editSlaStatus').value;
            lead.contactMethod = document.getElementById('editContactMethod').value.trim();
            lead.customerInfo = document.getElementById('editCustomerInfo').value.trim();
            lead.lostReason = document.getElementById('editLostReason').value.trim();
            lead.newAngle = document.getElementById('editNewAngle').value.trim();

            saveState();
            closeEditLeadModal();
            showToast('success', 'Đã lưu biến', `Thông tin khách hàng ${lead.brand || lead.zaloName} đã được cập nhật thành công!`);
        });
    }
}

function openEditTargetsModal() {
    document.getElementById('targetMoc1Input').value = CRMState.targetMoc1 || 25000000;
    document.getElementById('targetMoc2Input').value = CRMState.targetMoc2 || 75000000;
    document.getElementById('daysRemainingInput').value = CRMState.daysRemaining || 15;
    document.getElementById('editTargetsModal').classList.add('active');
}

function closeEditTargetsModal() {
    document.getElementById('editTargetsModal').classList.remove('active');
}

function openEditLeadModal(leadId) {
    const lead = CRMState.leads.find(l => l.id === leadId);
    if (!lead) return;

    document.getElementById('editLeadId').value = lead.id;
    document.getElementById('editZaloName').value = lead.zaloName || '';
    document.getElementById('editBrand').value = lead.brand || '';
    document.getElementById('editPhone').value = lead.phone || '';
    document.getElementById('editSource').value = lead.source || 'Ads Facebook';
    document.getElementById('editStage').value = lead.stage || 'KHACH_MOI';
    document.getElementById('editCustomerClass').value = lead.customerClass || 'Hot';
    document.getElementById('editCategory').value = lead.category || 'Mỹ Phẩm';
    document.getElementById('editMhkd').value = lead.mhkd || 'B2C Online';
    document.getElementById('editRevenue').value = lead.revenue || 0;
    document.getElementById('editForecastType').value = lead.forecastType || 'Pipeline (50%)';
    document.getElementById('editSale').value = lead.sale || 'Hường';
    document.getElementById('editSprintId').value = lead.sprintId || 'sprint1';
    document.getElementById('editFollowUpDate').value = lead.followUpDate || '';
    document.getElementById('editSlaDays').value = lead.slaDays ?? 3;
    document.getElementById('editSlaStatus').value = lead.slaStatus || 'Đúng Hạn';
    document.getElementById('editContactMethod').value = lead.contactMethod || 'Zalo';
    document.getElementById('editCustomerInfo').value = lead.customerInfo || '';
    document.getElementById('editLostReason').value = lead.lostReason || '';
    document.getElementById('editNewAngle').value = lead.newAngle || '';

    document.getElementById('editLeadModal').classList.add('active');
}

function closeEditLeadModal() {
    document.getElementById('editLeadModal').classList.remove('active');
}

