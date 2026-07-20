/* ==========================================================================
   Z CRM SYSTEM - FULL REAL-TIME DATA REACTION & SYNCHRONIZATION
   ========================================================================== */

// CENTRAL SINGLE SOURCE OF TRUTH (STATE)
const DEFAULT_TARGETS = {
    huyen: 12000000000,
    uyen: 6200000000,
    ngan: 1800000000
};

const INITIAL_LEADS = [
    {
        id: 'L001',
        customerCode: 'BHA-XSTREAM3T-0326-T4',
        shopBrand: 'Mỹ Phẩm Hằng Beauty',
        companyName: 'Công Ty TNHH Beauty Hằng',
        sale: 'Huyền',
        service: 'Xstream AI Live 3M',
        contractCode: 'HD-0326-BHA',
        contractFile: 'HD_BeautyHang_Signed.pdf',
        revenue: 4440559765,
        stage: '✅ Nghiệm Thu (Thu Tiền)',
        signDate: '21/07/2026',
        startDate: '01/08/2026',
        forecastType: 'Firm (100%)',
        forecastDate: '2026-07-22'
    },
    {
        id: 'L002',
        customerCode: 'NAM-XSTREAM1T-0326-T4',
        shopBrand: 'Nam Shop Thời Trang',
        companyName: 'Cá Nhân Đỗ Nam',
        sale: 'Uyên',
        service: 'Xstream AI Live 1M',
        contractCode: 'HD-0326-NAM',
        contractFile: 'HD_NamShop_Signed.pdf',
        revenue: 1856003515,
        stage: '✅ Nghiệm Thu (Thu Tiền)',
        signDate: '21/07/2026',
        startDate: '01/08/2026',
        forecastType: 'Firm (100%)',
        forecastDate: '2026-07-23'
    },
    {
        id: 'L003',
        customerCode: 'MINH-ECOM6T-0326-T4',
        shopBrand: 'Điện Máy Minh Gia',
        companyName: 'Công Ty Cổ Phần Minh Gia',
        sale: 'Ngân',
        service: 'Vận Hành Ecom Shopee 6M',
        contractCode: 'HD-0326-MINH',
        contractFile: 'HD_MinhGia_Signed.pdf',
        revenue: 1086292500,
        stage: '✅ Nghiệm Thu (Thu Tiền)',
        signDate: '20/07/2026',
        startDate: '25/07/2026',
        forecastType: 'Firm (100%)',
        forecastDate: '2026-07-20'
    },
    {
        id: 'L004',
        customerCode: 'LAN-ECOM3T-0326-T4',
        shopBrand: 'Gia Dụng Lan Anh',
        companyName: 'Cá Nhân Lan Anh',
        sale: 'Huyền',
        service: 'Vận Hành Ecom Shopee 3M',
        contractCode: 'HD-0326-LAN',
        contractFile: 'HD_LanAnh.pdf',
        revenue: 2500000000,
        stage: '⚡ Đang Triển Khai',
        signDate: '21/07/2026',
        startDate: '01/08/2026',
        forecastType: 'Firm (90%)',
        forecastDate: '2026-07-25'
    }
];

let currentFilters = {
    search: '',
    sale: 'all',
    service: 'all'
};

let CRMState = loadState();
let isUnlocked = false;
let pendingTabTarget = null;
const DEFAULT_PIN = "8888";

function loadState() {
    const saved = localStorage.getItem('Z_CRM_STATE_V7');
    if (saved) {
        try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return {
        targets: DEFAULT_TARGETS,
        daysRemaining: 10,
        leads: INITIAL_LEADS,
        improvements: [
            {
                id: 'IMP01',
                author: 'Hường (Solo Sale)',
                date: '21/07/2026',
                problem: 'Khách chê giá gói Xstream 1 tháng.',
                solution: 'Tặng kèm 10 kịch bản live cho khách chốt trước ngày 05/08 để hỗ trợ cán target 3 Sale.',
                budget: '0 VNĐ',
                status: 'approved',
                statusText: '✅ Sếp Phong Đã Duyệt'
            }
        ],
        checkins: [
            { date: '21/07/2026', sale: 'Huyền', timeIn: '08:25 AM', targetCalls: '30 calls', timeOut: '17:35 PM', actualCalls: '32 calls', dealsWon: '1 Deal (16M)', status: '✅ Chuẩn KPI' },
            { date: '21/07/2026', sale: 'Uyên', timeIn: '08:28 AM', targetCalls: '25 calls', timeOut: '17:30 PM', actualCalls: '26 calls', dealsWon: '1 Deal (12M)', status: '✅ Chuẩn KPI' },
            { date: '21/07/2026', sale: 'Ngân', timeIn: '08:30 AM', targetCalls: '25 calls', timeOut: '17:40 PM', actualCalls: '28 calls', dealsWon: '1 Deal (28M)', status: '✅ Chuẩn KPI' }
        ]
    };
}

function saveState() {
    localStorage.setItem('Z_CRM_STATE_V7', JSON.stringify(CRMState));
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
    syncDynamicRevenueMath();
    renderMasterLeads();
    renderForecastTable();
    renderRemindTable();
    renderCuuNetTable();
    renderImprovements();
    renderCheckins();
}

/* ==========================================================================
   1. DYNAMIC REAL-TIME DATA REACTION (DASHBOARD OVERVIEW LINKING)
   ========================================================================== */

function syncDynamicRevenueMath() {
    // 1. Calculate Won/Delivered Revenue for each of the 3 Sales dynamically from CRMState.leads
    let huyenActual = 0;
    let uyenActual = 0;
    let nganActual = 0;

    CRMState.leads.forEach(l => {
        const isWon = !l.stage || l.stage.includes('Nghiệm Thu') || l.stage.includes('Thu Tiền') || l.stage.includes('Won') || l.stage.includes('Triển Khai');
        const rev = l.revenue || 0;

        if (isWon) {
            if (l.sale.includes('Huyền') || l.sale.includes('Hường')) huyenActual += rev;
            else if (l.sale.includes('Uyên')) uyenActual += rev;
            else if (l.sale.includes('Ngân')) nganActual += rev;
        }
    });

    const huyenTarget = CRMState.targets.huyen;
    const uyenTarget = CRMState.targets.uyen;
    const nganTarget = CRMState.targets.ngan;

    const huyenRate = ((huyenActual / huyenTarget) * 100).toFixed(2);
    const uyenRate = ((uyenActual / uyenTarget) * 100).toFixed(2);
    const nganRate = ((nganActual / nganTarget) * 100).toFixed(2);

    const teamActual = huyenActual + uyenActual + nganActual;
    const teamTarget = huyenTarget + uyenTarget + nganTarget;
    const teamRate = ((teamActual / teamTarget) * 100).toFixed(1);

    const daysLeft = CRMState.daysRemaining;

    // Remaining daily needed
    const huyenDaily = Math.max(0, Math.round((huyenTarget - huyenActual) / daysLeft));
    const uyenDaily = Math.max(0, Math.round((uyenTarget - uyenActual) / daysLeft));
    const nganDaily = Math.max(0, Math.round((nganTarget - nganActual) / daysLeft));
    const teamDaily = Math.max(0, Math.round((teamTarget - teamActual) / daysLeft));

    // Update DOM Cards in Overview
    const huyenRevEl = document.getElementById('huyenRevenue');
    const huyenRateEl = document.getElementById('huyenRate');
    if (huyenRevEl) huyenRevEl.textContent = formatVNĐ(huyenActual);
    if (huyenRateEl) huyenRateEl.textContent = `Target: ${formatVNĐ(huyenTarget)} (Đạt ${huyenRate}%)`;
    const huyenProgressEl = document.querySelector('.sale-card.border-cyan .sale-progress-bar .progress');
    if (huyenProgressEl) huyenProgressEl.style.width = `${Math.min(100, huyenRate)}%`;
    const huyenDailyEl = document.querySelector('.daily-target-box.box-cyan .box-val');
    if (huyenDailyEl) huyenDailyEl.textContent = formatVNĐ(huyenDaily) + ' / Ngày';

    const uyenRevEl = document.getElementById('uyenRevenue');
    const uyenRateEl = document.getElementById('uyenRate');
    if (uyenRevEl) uyenRevEl.textContent = formatVNĐ(uyenActual);
    if (uyenRateEl) uyenRateEl.textContent = `Target: ${formatVNĐ(uyenTarget)} (Đạt ${uyenRate}%)`;
    const uyenProgressEl = document.querySelector('.sale-card.border-purple .sale-progress-bar .progress');
    if (uyenProgressEl) uyenProgressEl.style.width = `${Math.min(100, uyenRate)}%`;
    const uyenDailyEl = document.querySelector('.daily-target-box.box-purple .box-val');
    if (uyenDailyEl) uyenDailyEl.textContent = formatVNĐ(uyenDaily) + ' / Ngày';

    const nganRevEl = document.getElementById('nganRevenue');
    const nganRateEl = document.getElementById('nganRate');
    if (nganRevEl) nganRevEl.textContent = formatVNĐ(nganActual);
    if (nganRateEl) nganRateEl.textContent = `Target: ${formatVNĐ(nganTarget)} (Đạt ${nganRate}%)`;
    const nganProgressEl = document.querySelector('.sale-card.border-pink .sale-progress-bar .progress');
    if (nganProgressEl) nganProgressEl.style.width = `${Math.min(100, nganRate)}%`;
    const nganDailyEl = document.querySelector('.daily-target-box.box-pink .box-val');
    if (nganDailyEl) nganDailyEl.textContent = formatVNĐ(nganDaily) + ' / Ngày';

    // Top Banner Sync
    const teamDailyEl = document.querySelector('.runrate-banner .highlight-yellow');
    if (teamDailyEl) teamDailyEl.textContent = formatVNĐ(teamDaily) + ' / Ngày';

    const bannerInfoEl = document.querySelector('.runrate-banner .banner-info p');
    if (bannerInfoEl) bannerInfoEl.innerHTML = `Tổng doanh số đã thu: <strong>${formatVNĐ(teamActual)}</strong> / Plan ${formatVNĐ(teamTarget)} (Đạt ${teamRate}% Target Tháng 7)`;

    const bannerProgressEl = document.querySelector('.runrate-banner .overall-progress-bar .progress');
    if (bannerProgressEl) bannerProgressEl.style.width = `${Math.min(100, teamRate)}%`;

    const bannerLabelEl = document.querySelector('.runrate-banner .progress-label');
    if (bannerLabelEl) bannerLabelEl.textContent = `Tiến độ toàn team: ${teamRate}%`;

    // Sync Excel Matrix Table Rows dynamically
    renderMatrixReportRows(huyenActual, huyenRate, uyenActual, uyenRate, nganActual, nganRate, teamActual, teamRate, huyenDaily, uyenDaily, nganDaily);
}

function renderMatrixReportRows(huyenAct, huyenRate, uyenAct, uyenRate, nganAct, nganRate, teamAct, teamRate, huyenDaily, uyenDaily, nganDaily) {
    const tbody = document.getElementById('matrixTbody');
    if (!tbody) return;

    const huyenTarget = CRMState.targets.huyen;
    const uyenTarget = CRMState.targets.uyen;
    const nganTarget = CRMState.targets.ngan;
    const teamTarget = huyenTarget + uyenTarget + nganTarget;

    let html = `
        <tr class="row-header-section"><td colspan="14">I. KẾT QUẢ KINH DOANH</td></tr>
        <tr>
            <td>Doanh số</td><td style="text-align:center;">VNĐ</td>
            <td>${formatVNĐ(huyenTarget)}</td><td>${formatVNĐ(huyenAct)}</td><td><strong class="text-cyan">${huyenRate}%</strong></td>
            <td>${formatVNĐ(uyenTarget)}</td><td>${formatVNĐ(uyenAct)}</td><td><strong class="text-purple">${uyenRate}%</strong></td>
            <td>${formatVNĐ(nganTarget)}</td><td>${formatVNĐ(nganAct)}</td><td><strong class="text-pink">${nganRate}%</strong></td>
            <td>${formatVNĐ(teamTarget)}</td><td>${formatVNĐ(teamAct)}</td><td><strong class="text-green">${teamRate}%</strong></td>
        </tr>
        <tr>
            <td>SL Đơn hàng</td><td style="text-align:center;">Đơn</td>
            <td>10</td><td>319</td><td><strong class="text-cyan">3157.14%</strong></td>
            <td>0</td><td>118</td><td><strong class="text-purple">100%</strong></td>
            <td>10</td><td>128</td><td><strong class="text-pink">1266.82%</strong></td>
            <td>20</td><td>565</td><td><strong class="text-green">2825.00%</strong></td>
        </tr>

        <tr class="row-header-section"><td colspan="14">II. HOẠT ĐỘNG BÁN HÀNG</td></tr>
        <tr>
            <td>Khách đã chăm</td><td style="text-align:center;">Khách</td>
            <td>25</td><td>5</td><td><strong class="text-cyan">20.00%</strong></td>
            <td>5</td><td>1</td><td><strong class="text-purple">6.25%</strong></td>
            <td>5</td><td>1</td><td><strong class="text-pink">6.67%</strong></td>
            <td>35</td><td>7</td><td><strong class="text-green">20.00%</strong></td>
        </tr>

        <tr class="row-header-section"><td colspan="14">III. DỰ BÁO & QUẢN TRỊ (10 NGÀY CÒN LẠI)</td></tr>
        <tr class="row-highlight-yellow">
            <td>Doanh số/ngày cần đạt</td><td style="text-align:center;">VNĐ/Ngày</td>
            <td>${formatVNĐ(huyenDaily)}</td><td>${formatVNĐ(huyenDaily)}</td><td><strong class="text-cyan">CẦN ĐẠT</strong></td>
            <td>${formatVNĐ(uyenDaily)}</td><td>${formatVNĐ(uyenDaily)}</td><td><strong class="text-purple">CẦN ĐẠT</strong></td>
            <td>${formatVNĐ(nganDaily)}</td><td>${formatVNĐ(nganDaily)}</td><td><strong class="text-pink">CẦN ĐẠT</strong></td>
            <td>${formatVNĐ(huyenDaily + uyenDaily + nganDaily)}</td><td>${formatVNĐ(huyenDaily + uyenDaily + nganDaily)}</td><td><strong class="text-green">CẦN ĐẠT</strong></td>
        </tr>
    `;

    tbody.innerHTML = html;
}

/* ==========================================================================
   2. OVERVIEW MODE SWITCHER
   ========================================================================== */

function switchOverviewMode(mode) {
    const cardsEl = document.getElementById('overviewCardsMode');
    const excelEl = document.getElementById('overviewExcelMode');
    const tabs = document.querySelectorAll('.switch-tab');

    if (mode === 'cards') {
        cardsEl.classList.add('active');
        excelEl.classList.remove('active');
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
    } else {
        cardsEl.classList.remove('active');
        excelEl.classList.add('active');
        tabs[0].classList.remove('active');
        tabs[1].classList.add('active');
    }
}

/* ==========================================================================
   3. MASTER LEAD TRACKER (SALES EDITION)
   ========================================================================== */

function initFilterBar() {
    const searchInput = document.getElementById('searchInput');
    const saleSelect = document.getElementById('filterSale');
    const serviceSelect = document.getElementById('filterService');
    const resetBtn = document.getElementById('resetFilterBtn');

    if (searchInput) searchInput.addEventListener('input', (e) => { currentFilters.search = e.target.value.toLowerCase(); renderMasterLeads(); });
    if (saleSelect) saleSelect.addEventListener('change', (e) => { currentFilters.sale = e.target.value; renderMasterLeads(); });
    if (serviceSelect) serviceSelect.addEventListener('change', (e) => { currentFilters.service = e.target.value; renderMasterLeads(); });

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            currentFilters = { search: '', sale: 'all', service: 'all' };
            if (searchInput) searchInput.value = '';
            if (saleSelect) saleSelect.value = 'all';
            if (serviceSelect) serviceSelect.value = 'all';
            renderMasterLeads();
        });
    }
}

function renderMasterLeads() {
    const tbody = document.getElementById('masterLeadsTbody');
    if (!tbody) return;

    const filteredLeads = CRMState.leads.filter(l => {
        const matchSearch = !currentFilters.search || 
            l.customerCode.toLowerCase().includes(currentFilters.search) || 
            l.shopBrand.toLowerCase().includes(currentFilters.search) || 
            l.companyName.toLowerCase().includes(currentFilters.search);

        const matchSale = !currentFilters.sale || currentFilters.sale === 'all' || l.sale.toLowerCase().includes(currentFilters.sale.toLowerCase());
        const matchService = !currentFilters.service || currentFilters.service === 'all' || l.service.toLowerCase().includes(currentFilters.service.toLowerCase());

        return matchSearch && matchSale && matchService;
    });

    if (filteredLeads.length === 0) {
        tbody.innerHTML = `<tr><td colspan="11" style="text-align:center; padding: 24px; color: var(--text-muted);">Không tìm thấy hợp đồng nào.</td></tr>`;
        return;
    }

    tbody.innerHTML = filteredLeads.map((l, index) => `
        <tr>
            <td>${index + 1}</td>
            <td><span class="code-pill">${escapeHtml(l.customerCode)}</span></td>
            <td><strong>${escapeHtml(l.shopBrand)}</strong></td>
            <td><span class="cust-primary">${escapeHtml(l.companyName)}</span></td>
            <td><span class="badge ${getSaleBadgeClass(l.sale)}">${escapeHtml(l.sale)}</span></td>
            <td>${escapeHtml(l.service)}</td>
            <td><span class="cust-secondary">${escapeHtml(l.contractCode)}</span></td>
            <td class="text-cyan font-bold">${formatVNĐ(l.revenue)}</td>
            <td>${escapeHtml(l.signDate)}</td>
            <td>${escapeHtml(l.startDate)}</td>
            <td>
                <div style="display:flex; gap: 6px;">
                    <button class="btn btn-xs btn-purple" title="Sửa doanh thu" onclick="editLead('${l.id}')">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="btn btn-xs btn-pink" title="Xóa hợp đồng" onclick="deleteLead('${l.id}', '${escapeHtml(l.shopBrand)}')">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function getSaleBadgeClass(sale) {
    if (sale.includes('Huyền') || sale.includes('Hường')) return 'badge-hot';
    if (sale.includes('Uyên')) return 'badge-purple';
    return 'badge-warm';
}

/* ==========================================================================
   4. ADD, EDIT & DELETE LEAD SYSTEM (REACTS DIRECTLY WITH OVERVIEW)
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
            const sale = document.getElementById('newSale').value;
            const service = document.getElementById('newService').value;
            const revenue = parseFloat(document.getElementById('newRevenue').value) || 0;
            let code = document.getElementById('newCustomerCode').value.trim();

            if (!code) {
                const acronym = shopBrand.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 3) || 'CUST';
                code = `${acronym}-${service.includes('Xstream') ? 'XSTREAM' : 'ECOM'}-0726-T4`;
            }

            const newLead = {
                id: 'L' + Date.now(),
                customerCode: code,
                shopBrand: shopBrand,
                companyName: companyName,
                sale: sale,
                service: service,
                contractCode: document.getElementById('newContractCode').value.trim() || 'HD-' + Date.now().toString().slice(-4),
                revenue: revenue,
                stage: '✅ Nghiệm Thu (Thu Tiền)',
                signDate: document.getElementById('newSignDate').value || '21/07/2026',
                startDate: '01/08/2026',
                forecastType: 'Firm (100%)',
                forecastDate: '2026-07-21'
            };

            CRMState.leads.unshift(newLead);
            saveState();
            closeAddLeadModal();
            form.reset();
            alert(`🎉 Đã thêm hợp đồng mới cho ${shopBrand} (Sale: ${sale}) với doanh thu ${formatVNĐ(revenue)}! Báo cáo Dashboard Overview đã được tính toán lại tự động.`);
        });
    }
}

function closeAddLeadModal() {
    document.getElementById('addLeadModal').classList.remove('active');
}

function deleteLead(leadId, shopBrand) {
    if (confirm(`⚠️ XÓA hợp đồng "${shopBrand}" khỏi danh sách? Báo cáo Overview sẽ tự động cập nhật lại.`)) {
        CRMState.leads = CRMState.leads.filter(l => l.id !== leadId);
        saveState();
        alert(`✅ Đã xóa hợp đồng "${shopBrand}" thành công!`);
    }
}

function editLead(leadId) {
    const lead = CRMState.leads.find(l => l.id === leadId);
    if (!lead) return;

    const newRev = prompt(`Sửa doanh thu hợp đồng ${lead.shopBrand} (VNĐ):`, lead.revenue);
    if (newRev !== null && !isNaN(parseFloat(newRev))) {
        lead.revenue = parseFloat(newRev);
        saveState();
        alert(`✅ Đã cập nhật doanh thu cho ${lead.shopBrand} thành ${formatVNĐ(lead.revenue)}! Báo cáo Overview đã được đồng bộ tự động.`);
    }
}

/* ==========================================================================
   5. OTHER DETAILED TABS (PRESERVED INTACT)
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
            <td><strong>${escapeHtml(l.sale)}</strong></td>
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
            <td><strong>${escapeHtml(l.sale)}</strong></td>
            <td>21/07 14:00</td>
            <td><span class="badge badge-green">✅ Đã Gọi</span></td>
            <td><span class="badge badge-green">✅ Nhắn Link</span></td>
            <td><span class="badge badge-green">✅ Đã Tham Gia</span></td>
            <td>Call nhắc chốt HĐ</td>
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
            <td><strong>${escapeHtml(l.sale)}</strong></td>
            <td>${escapeHtml(l.service)}</td>
            <td>
                <button class="btn btn-xs btn-purple" onclick="playMockAudio('${escapeHtml(l.shopBrand)}')">
                    Nghe Audio Cuộc Gọi
                </button>
            </td>
            <td>Chưa phân tích rõ bài toán ROI</td>
            <td><strong>Hường gọi lại: Phân tích ROI thực tế + Tặng 5 kịch bản live</strong></td>
            <td><span class="badge badge-yellow">⏳ Đang Bám Chốt</span></td>
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
        alert(`🎉 Chúc mừng ${lead.sale}! Đã chuyển ${lead.shopBrand} sang Nghiệm Thu (${formatVNĐ(lead.revenue)})! Báo cáo Overview đã tự động cập nhật.`);
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
        'dashboard': { title: '3-SALES EXECUTIVE COMMAND CENTER', subtitle: 'Trung tâm điều hành doanh số & chỉ số hiệu suất 3 Sale (Huyền - Uyên - Ngân)' },
        'forecast': { title: 'Chu Kỳ 3 Ngày & Deal Forecasting', subtitle: 'Đo lường & dự báo số deal về trong chu kỳ 3 ngày (3 Sale)' },
        'improvements': { title: 'Hộp Đề Xuất Cải Tiến', subtitle: 'Gửi khuyến nghị kịch bản & ưu đãi cho 2 Sếp phê duyệt' },
        'leads': { title: 'Master Lead & Hợp Đồng Tracker (Phân Cho 3 Sale)', subtitle: 'Theo dõi thông tin chi tiết từng hợp đồng phân bổ cho 3 Sale: Huyền (Hường), Uyên, Ngân.' },
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
        alert('Check-in thành công 08:25 AM! Chúc Team 3 Sale bùng nổ KPI!');
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
