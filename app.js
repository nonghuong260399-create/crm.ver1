/* ==========================================================================
   Z CRM SYSTEM - SALES EDITION WITH ADD & DELETE LEAD FUNCTIONALITY
   ========================================================================== */

// CENTRAL CRM STATE WITH SALES-FOCUSED LEADS
const DEFAULT_STATE = {
    targetMoc1: 25000000,
    targetMoc2: 75000000,
    leads: [
        {
            id: 'L001',
            customerCode: 'BHA-XSTREAM3T-0326-T4',
            shopBrand: 'Mỹ Phẩm Hằng Beauty',
            companyName: 'Công Ty TNHH Beauty Hằng',
            service: 'Xstream AI Live 3M',
            contractCode: 'HD-0326-BHA',
            contractFile: 'HD_BeautyHang_Signed.pdf',
            revenue: 16000000,
            signDate: '21/07/2026',
            startDate: '01/08/2026',
            endDate: '01/11/2026',
            stage: '⚡ Đang Triển Khai',
            forecastType: 'Firm (90%)',
            forecastDate: '2026-07-22',
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
            customerCode: 'NAM-XSTREAM1T-0326-T4',
            shopBrand: 'Nam Shop Thời Trang',
            companyName: 'Cá Nhân Đỗ Nam',
            service: 'Xstream AI Live 1M',
            contractCode: 'HD-0326-NAM',
            contractFile: 'HD_NamShop_Signed.pdf',
            revenue: 12000000,
            signDate: '21/07/2026',
            startDate: '01/08/2026',
            endDate: '01/09/2026',
            stage: '⚡ Đang Triển Khai',
            forecastType: 'Firm (85%)',
            forecastDate: '2026-07-23',
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
            customerCode: 'MINH-ECOM6T-0326-T4',
            shopBrand: 'Điện Máy Minh Gia',
            companyName: 'Công Ty Cổ Phần Minh Gia',
            service: 'Vận Hành Ecom Shopee 6M',
            contractCode: 'HD-0326-MINH',
            contractFile: 'HD_MinhGia_Signed.pdf',
            revenue: 28000000,
            signDate: '20/07/2026',
            startDate: '25/07/2026',
            endDate: '25/01/2027',
            stage: '✅ Nghiệm Thu (Thu Tiền)',
            forecastType: 'Firm (100%)',
            forecastDate: '2026-07-20',
            sale: 'Hường',
            audioUrl: '',
            remind1: '-',
            remind2: '-',
            showupStatus: '-',
            lostReason: '',
            newAngle: '',
            cuuNetStatus: 'Bình thường',
            sprintId: 'sprint1'
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

// Filter State
let currentFilters = {
    search: '',
    service: 'all'
};

let CRMState = loadState();
let isUnlocked = false;
let pendingTabTarget = null;
const DEFAULT_PIN = "8888";

function loadState() {
    const saved = localStorage.getItem('Z_CRM_STATE_V4');
    if (saved) {
        try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

function saveState() {
    localStorage.setItem('Z_CRM_STATE_V4', JSON.stringify(CRMState));
    renderAll();
}

/* ==========================================================================
   APP INITIALIZATION & RENDER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSecuritySystem();
    initThemeSwitcher();
    initFilterBar();
    initForms();
    initAddLeadSystem();
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
   1. DASHBOARD STATS (DYNAMIC REVENUE MATH)
   ========================================================================== */

function renderDashboardStats() {
    const actualWon = CRMState.leads
        .filter(l => l.stage && (l.stage.includes('Nghiệm Thu') || l.stage.includes('Thu Tiền') || l.stage.includes('Won')))
        .reduce((sum, l) => sum + (l.revenue || 0), 0);

    const percentWon = Math.min(100, Math.round((actualWon / CRMState.targetMoc1) * 100));
    const remainingWon = Math.max(0, CRMState.targetMoc1 - actualWon);

    const moc1ValEl = document.querySelector('#dashboard-tab .stat-card:nth-child(1) .card-value');
    const moc1ProgEl = document.querySelector('#dashboard-tab .stat-card:nth-child(1) .progress');
    const moc1SubEl = document.querySelector('#dashboard-tab .stat-card:nth-child(1) .card-sub');

    if (moc1ValEl) moc1ValEl.textContent = formatVNĐ(actualWon);
    if (moc1ProgEl) moc1ProgEl.style.width = `${percentWon}%`;
    if (moc1SubEl) moc1SubEl.textContent = `Đạt ${percentWon}% - Còn thiếu ${formatVNĐ(remainingWon)} (15 Ngày)`;

    // Render Top Hot Deals
    const topDealsTbody = document.querySelector('#dashboard-tab .galaxy-table tbody');
    if (topDealsTbody) {
        const hotLeads = CRMState.leads.slice(0, 4);
        topDealsTbody.innerHTML = hotLeads.map(l => `
            <tr>
                <td><span class="cust-primary">${escapeHtml(l.shopBrand)}</span><span class="cust-secondary">${escapeHtml(l.customerCode)}</span></td>
                <td>${escapeHtml(l.service)}</td>
                <td class="text-cyan">${formatVNĐ(l.revenue)}</td>
                <td><span class="badge badge-hot">${l.forecastType || 'Firm (90%)'}</span></td>
                <td>${escapeHtml(l.forecastDate || '22/07/2026')}</td>
            </tr>
        `).join('');
    }
}

/* ==========================================================================
   2. MASTER LEAD TRACKER - STREAMLINED SALES EDITION (10 COLUMNS)
   ========================================================================== */

function initFilterBar() {
    const searchInput = document.getElementById('searchInput');
    const serviceSelect = document.getElementById('filterService');
    const resetBtn = document.getElementById('resetFilterBtn');

    if (searchInput) searchInput.addEventListener('input', (e) => { currentFilters.search = e.target.value.toLowerCase(); renderMasterLeads(); });
    if (serviceSelect) serviceSelect.addEventListener('change', (e) => { currentFilters.service = e.target.value; renderMasterLeads(); });

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            currentFilters = { search: '', service: 'all' };
            if (searchInput) searchInput.value = '';
            if (serviceSelect) serviceSelect.value = 'all';
            renderMasterLeads();
        });
    }
}

function renderMasterLeads() {
    const tbody = document.getElementById('masterLeadsTbody');
    if (!tbody) return;

    // Filter Logic
    const filteredLeads = CRMState.leads.filter(l => {
        const matchSearch = !currentFilters.search || 
            l.customerCode.toLowerCase().includes(currentFilters.search) || 
            l.shopBrand.toLowerCase().includes(currentFilters.search) || 
            l.companyName.toLowerCase().includes(currentFilters.search) || 
            l.contractCode.toLowerCase().includes(currentFilters.search);

        const matchService = currentFilters.service === 'all' || l.service.toLowerCase().includes(currentFilters.service.toLowerCase());

        return matchSearch && matchService;
    });

    if (filteredLeads.length === 0) {
        tbody.innerHTML = `<tr><td colspan="12" style="text-align:center; padding: 24px; color: var(--text-muted);">Không tìm thấy khách hàng nào. Bấm "Thêm Hợp Đồng / Khách Mới" để tạo mới!</td></tr>`;
        return;
    }

    tbody.innerHTML = filteredLeads.map((l, index) => `
        <tr>
            <td>${index + 1}</td>
            <td><span class="code-pill">${escapeHtml(l.customerCode)}</span></td>
            <td><strong>${escapeHtml(l.shopBrand)}</strong></td>
            <td><span class="cust-primary">${escapeHtml(l.companyName)}</span></td>
            <td>${escapeHtml(l.service)}</td>
            <td><span class="cust-secondary">${escapeHtml(l.contractCode || 'HD-PENDING')}</span></td>
            <td>
                <a href="#" class="btn btn-xs btn-glass" onclick="alert('File Hợp Đồng: ${escapeHtml(l.contractFile || 'Chưa tải lên')}')">
                    <i class="fa-solid fa-file-pdf"></i> ${escapeHtml(l.contractFile || 'Chi tiết HĐ')}
                </a>
            </td>
            <td class="text-cyan font-bold">${formatVNĐ(l.revenue)}</td>
            <td>${escapeHtml(l.signDate || '21/07/2026')}</td>
            <td>${escapeHtml(l.startDate || '01/08/2026')}</td>
            <td>${escapeHtml(l.endDate || '01/11/2026')}</td>
            <td>
                <div style="display:flex; gap: 6px;">
                    <button class="btn btn-xs btn-purple" title="Sửa thông tin" onclick="editLead('${l.id}')">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="btn btn-xs btn-pink" title="Xóa khách" onclick="deleteLead('${l.id}', '${escapeHtml(l.shopBrand)}')">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

/* ==========================================================================
   3. ADD & DELETE LEAD SYSTEM
   ========================================================================== */

function initAddLeadSystem() {
    const openBtn = document.getElementById('openAddLeadModalBtn');
    const modal = document.getElementById('addLeadModal');
    const form = document.getElementById('addLeadForm');

    if (openBtn) openBtn.addEventListener('click', () => modal.classList.add('active'));

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const shopBrand = document.getElementById('newShopBrand').value.trim();
            const companyName = document.getElementById('newCompanyName').value.trim();
            const service = document.getElementById('newService').value;
            const revenue = parseFloat(document.getElementById('newRevenue').value) || 0;
            let code = document.getElementById('newCustomerCode').value.trim();

            if (!code) {
                // Auto generate formula code e.g. BHA-XSTREAM3T-0726-T4
                const acronym = shopBrand.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 3) || 'CUST';
                code = `${acronym}-${service.includes('Xstream') ? 'XSTREAM' : 'ECOM'}-0726-T4`;
            }

            const newLead = {
                id: 'L' + Date.now(),
                customerCode: code,
                shopBrand: shopBrand,
                companyName: companyName,
                service: service,
                contractCode: document.getElementById('newContractCode').value.trim() || 'HD-' + Date.now().toString().slice(-4),
                contractFile: document.getElementById('newContractFile').value.trim() || 'HD_Signed.pdf',
                revenue: revenue,
                signDate: document.getElementById('newSignDate').value || '21/07/2026',
                startDate: document.getElementById('newStartDate').value || '01/08/2026',
                endDate: '01/11/2026',
                stage: '✅ Nghiệm Thu (Thu Tiền)',
                forecastType: 'Firm (100%)',
                forecastDate: '2026-07-21',
                sale: 'Hường'
            };

            CRMState.leads.unshift(newLead);
            saveState();
            closeAddLeadModal();
            form.reset();
            alert(`🎉 Đã thêm thành công khách hàng "${shopBrand}" với mã ${code}! Doanh thu Dashboard đã được tính tự động.`);
        });
    }
}

function closeAddLeadModal() {
    document.getElementById('addLeadModal').classList.remove('active');
}

function deleteLead(leadId, shopBrand) {
    if (confirm(`⚠️ Bạn có chắc chắn muốn XÓA khách hàng "${shopBrand}" khỏi hệ thống không? Action này không thể hoàn tác.`)) {
        CRMState.leads = CRMState.leads.filter(l => l.id !== leadId);
        saveState();
        alert(`✅ Đã xóa khách hàng "${shopBrand}" thành công!`);
    }
}

function editLead(leadId) {
    const lead = CRMState.leads.find(l => l.id === leadId);
    if (!lead) return;

    const newRev = prompt(`Sửa doanh thu cho ${lead.shopBrand} (VNĐ):`, lead.revenue);
    if (newRev !== null && !isNaN(parseFloat(newRev))) {
        lead.revenue = parseFloat(newRev);
        saveState();
        alert(`✅ Đã cập nhật doanh thu cho ${lead.shopBrand} thành ${formatVNĐ(lead.revenue)}!`);
    }
}

/* ==========================================================================
   4. FORECAST, REMIND & OTHER TABLES
   ========================================================================== */

function renderForecastTable() {
    const tbody = document.getElementById('forecastTableBody');
    if (!tbody) return;

    tbody.innerHTML = CRMState.leads.map((l, index) => `
        <tr>
            <td>${index + 1}</td>
            <td><span class="cust-primary">${escapeHtml(l.shopBrand)}</span></td>
            <td>${escapeHtml(l.service)}</td>
            <td class="text-gradient">${formatVNĐ(l.revenue)}</td>
            <td><span class="badge ${l.forecastType && l.forecastType.includes('Firm') ? 'badge-hot' : 'badge-warm'}">${escapeHtml(l.forecastType || 'Firm (90%)')}</span></td>
            <td>${escapeHtml(l.forecastDate || '22/07/2026')}</td>
            <td>${escapeHtml(l.sale || 'Hường')}</td>
            <td>21/07 14:00</td>
            <td>
                <button class="btn btn-xs btn-green" onclick="quickStageAdvance('${l.id}')">
                    Đã Thu Tiền
                </button>
            </td>
        </tr>
    `).join('');
}

function renderRemindTable() {
    const tbody = document.querySelector('#remind-tab .galaxy-table tbody');
    if (!tbody) return;

    const xstreamLeads = CRMState.leads.filter(l => l.service.toLowerCase().includes('xstream'));

    tbody.innerHTML = xstreamLeads.map((l, index) => `
        <tr>
            <td>${index + 1}</td>
            <td><span class="cust-primary">${escapeHtml(l.shopBrand)}</span></td>
            <td>${escapeHtml(l.customerCode)}</td>
            <td>21/07 14:00</td>
            <td><span class="badge badge-green">✅ Đã Gọi</span></td>
            <td><span class="badge badge-green">✅ Nhắn Link</span></td>
            <td><span class="badge badge-green">✅ Đã Tham Gia</span></td>
            <td>Call nhắc chốt HĐ</td>
            <td>${escapeHtml(l.sale || 'Hường')}</td>
        </tr>
    `).join('');
}

function renderCuuNetTable() {
    const tbody = document.querySelector('#cuunet-tab .galaxy-table tbody');
    if (!tbody) return;

    tbody.innerHTML = CRMState.leads.map((l, index) => `
        <tr>
            <td>${index + 1}</td>
            <td><span class="cust-primary">${escapeHtml(l.shopBrand)}</span></td>
            <td>${escapeHtml(l.service)}</td>
            <td>
                <button class="btn btn-xs btn-purple" onclick="playMockAudio('${escapeHtml(l.shopBrand)}')">
                    Nghe Audio Cuộc Gọi
                </button>
            </td>
            <td>${escapeHtml(l.lostReason || 'Chưa phân tích rõ bài toán ROI')}</td>
            <td><strong>${escapeHtml(l.newAngle || 'Hường gọi lại: Phân tích ROI thực tế + Tặng 5 kịch bản live')}</strong></td>
            <td><span class="badge badge-yellow">${escapeHtml(l.cuuNetStatus || '⏳ Đang Bám Chốt')}</span></td>
        </tr>
    `).join('');
}

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

function playMockAudio(name) {
    const modal = document.getElementById('audioModal');
    document.getElementById('audioCustomerTitle').textContent = `Ghi Âm Cuộc Gọi: ${name}`;
    document.getElementById('audioMetaInfo').textContent = `File ghi âm cuộc gọi đính kèm hợp đồng`;
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
        lead.stage = '✅ Nghiệm Thu (Thu Tiền)';
        saveState();
        alert(`🎉 Chúc mừng Hường! Đã chuyển ${lead.shopBrand} sang Nghiệm Thu (${formatVNĐ(lead.revenue)})! Doanh thu Dashboard đã được cộng tự động.`);
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
   NAVIGATION & THEME & SECURITY
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
        'dashboard': { title: 'Dashboard Overview Sếp', subtitle: 'Đo lường doanh số mốc 25M (trước 05/08) & 75M (Tháng 8)' },
        'forecast': { title: 'Chu Kỳ 3 Ngày & Deal Forecasting', subtitle: 'Đo lường & dự báo số deal về trong chu kỳ 3 ngày (Solo Sale)' },
        'improvements': { title: 'Hộp Đề Xuất Cải Tiến', subtitle: 'Gửi khuyến nghị kịch bản & ưu đãi cho 2 Sếp phê duyệt' },
        'leads': { title: 'Master Lead & Hợp Đồng Tracker (Sales Edition)', subtitle: 'Tối ưu tinh gọn cho Sale bám deal. Hỗ trợ Thêm Khách mới & Xóa Lead trực tiếp.' },
        'remind': { title: 'Call Remind & Showup Tracker', subtitle: 'Quản lý lịch nhắc 24h & 2h cho gói Xstream' },
        'cuunet': { title: 'Leader Cứu Net & File Audio', subtitle: 'Nghe lại ghi âm cuộc gọi & chuyển angle chốt mới' },
        'checkin': { title: 'Remind & Chấm Công Daily', subtitle: 'Điểm danh Check-in sáng 08:30 & Check-out chiều 17:30' }
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
        alert('Check-in thành công 08:25 AM! Chúc Hường chốt bùng nổ 25M trước 05/08!');
    } else {
        alert('Check-out thành công 17:35 PM! Đã lưu tiến độ làm việc trong ngày!');
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
   HELPERS
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
