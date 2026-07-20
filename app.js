/* ==========================================================================
   Z CRM SYSTEM - 3-SALES VISUAL COMMAND CENTER & MATRIX INTEGRATION
   ========================================================================== */

// CENTRAL 3-SALE PERFORMANCE MATRIX DATA (EXACT REPLICA FROM EXCEL)
const MATRIX_DATA = {
    daysRemaining: 10,
    sales: {
        huyen: { name: 'Huyền (Hường)', targetRev: 12000000000, actualRev: 4440559765, rateRev: 37.00 },
        uyen: { name: 'Uyên', targetRev: 6200000000, actualRev: 1856003515, rateRev: 29.94 },
        ngan: { name: 'Ngân', targetRev: 1800000000, actualRev: 1086292500, rateRev: 60.35 }
    },
    sections: [
        {
            title: 'I. KẾT QUẢ KINH DOANH',
            rows: [
                {
                    name: 'Doanh số', unit: 'VNĐ',
                    huyen: { plan: 12000000000, act: 4440559765, rate: '37.00%' },
                    uyen: { plan: 6200000000, act: 1856003515, rate: '29.94%' },
                    ngan: { plan: 1800000000, act: 1086292500, rate: '60.35%' }
                },
                {
                    name: 'SL Đơn hàng', unit: 'Đơn',
                    huyen: { plan: 10, act: 319, rate: '3157.14%' },
                    uyen: { plan: 0, act: 118, rate: '0.00%' },
                    ngan: { plan: 10, act: 128, rate: '1266.82%' }
                },
                {
                    name: 'Giá trị đơn TB', unit: 'VNĐ/Đơn',
                    huyen: { plan: 178145872, act: 13920250, rate: '7.81%' },
                    uyen: { plan: 0, act: 15728843, rate: '0.00%' },
                    ngan: { plan: 178145872, act: 8486660, rate: '4.76%' }
                },
                {
                    name: 'Công nợ phải thu', unit: 'VNĐ',
                    huyen: { plan: 14898316424, act: 0, rate: '0.00%' },
                    uyen: { plan: 7865473342, act: 0, rate: '0.00%' },
                    ngan: { plan: 1825251173, act: 0, rate: '0.00%' }
                }
            ]
        },
        {
            title: 'II. HOẠT ĐỘNG BÁN HÀNG',
            rows: [
                {
                    name: 'Khách đã chăm', unit: 'Khách',
                    huyen: { plan: 25, act: 5, rate: '20.00%' },
                    uyen: { plan: 5, act: 1, rate: '6.25%' },
                    ngan: { plan: 5, act: 1, rate: '6.67%' }
                },
                {
                    name: 'Lượt chăm sóc', unit: 'Lượt',
                    huyen: { plan: 128, act: 2, rate: '1.56%' },
                    uyen: { plan: 33, act: 1, rate: '3.03%' },
                    ngan: { plan: 32, act: 0, rate: '0.00%' }
                },
                {
                    name: 'SL Mẫu gửi', unit: 'Mẫu',
                    huyen: { plan: 59, act: 2, rate: '3.39%' },
                    uyen: { plan: 20, act: 1, rate: '5.00%' },
                    ngan: { plan: 19, act: 0, rate: '0.00%' }
                },
                {
                    name: 'SL Báo giá', unit: 'Báo giá',
                    huyen: { plan: 45, act: 0, rate: '0.00%' },
                    uyen: { plan: 22, act: 0, rate: '0.00%' },
                    ngan: { plan: 1, act: 0, rate: '0.00%' }
                }
            ]
        },
        {
            title: 'III. HIỆU QUẢ CHUYỂN ĐỔI',
            rows: [
                {
                    name: 'Doanh số KH mới', unit: 'VNĐ',
                    huyen: { plan: 0, act: 0, rate: '0.00%' },
                    uyen: { plan: 0, act: 0, rate: '0.00%' },
                    ngan: { plan: 0, act: 0, rate: '0.00%' }
                },
                {
                    name: 'SL đơn KH mới', unit: 'Đơn',
                    huyen: { plan: 0, act: 0, rate: '0.00%' },
                    uyen: { plan: 0, act: 0, rate: '0.00%' },
                    ngan: { plan: 0, act: 0, rate: '0.00%' }
                },
                {
                    name: 'Tỷ lệ phản hồi mẫu', unit: '%',
                    huyen: { plan: 0, act: 0, rate: '0.00%' },
                    uyen: { plan: 0, act: 0, rate: '0.00%' },
                    ngan: { plan: 0, act: 0, rate: '0.00%' }
                },
                {
                    name: 'Tỷ lệ báo giá thành đơn', unit: '%',
                    huyen: { plan: 0, act: 0, rate: '0.00%' },
                    uyen: { plan: 0, act: 0, rate: '0.00%' },
                    ngan: { plan: 0, act: 0, rate: '0.00%' }
                }
            ]
        },
        {
            title: 'IV. DỰ BÁO & QUẢN TRỊ (10 NGÀY CÒN LẠI)',
            rows: [
                {
                    name: 'Doanh số/ngày cần đạt', unit: 'VNĐ/Ngày', isYellow: true,
                    huyen: { plan: '755,944,024 đ', act: '755,944,024 đ', rate: 'CẦN ĐẠT' },
                    uyen: { plan: '434,399,648 đ', act: '160,888,759 đ', rate: 'CẦN ĐẠT' },
                    ngan: { plan: '71,370,750 đ', act: '26,433,611 đ', rate: 'CẦN ĐẠT' }
                },
                {
                    name: 'Đơn/ngày cần đạt', unit: 'Đơn/Ngày', isYellow: true,
                    huyen: { plan: '0 Đơn', act: '-31 Đơn', rate: 'ĐẠT KPI' },
                    uyen: { plan: '0 Đơn', act: '-4 Đơn', rate: 'ĐẠT KPI' },
                    ngan: { plan: '0 Đơn', act: '-4 Đơn', rate: 'ĐẠT KPI' }
                },
                {
                    name: 'Đơn hàng dự kiến', unit: 'Đơn',
                    huyen: { plan: 5, act: 12, rate: '240%' },
                    uyen: { plan: 3, act: 5, rate: '166%' },
                    ngan: { plan: 2, act: 4, rate: '200%' }
                },
                {
                    name: 'Doanh số dự kiến', unit: 'VNĐ',
                    huyen: { plan: 5000000000, act: 6000000000, rate: '120%' },
                    uyen: { plan: 2500000000, act: 3000000000, rate: '120%' },
                    ngan: { plan: 1000000000, act: 1200000000, rate: '120%' }
                }
            ]
        }
    ]
};

// MASTER LEADS ASSIGNED TO 3 SALES
const DEFAULT_LEADS = [
    {
        id: 'L001',
        customerCode: 'BHA-XSTREAM3T-0326-T4',
        shopBrand: 'Mỹ Phẩm Hằng Beauty',
        companyName: 'Công Ty TNHH Beauty Hằng',
        sale: 'Huyền',
        service: 'Xstream AI Live 3M',
        contractCode: 'HD-0326-BHA',
        revenue: 16000000,
        signDate: '21/07/2026',
        startDate: '01/08/2026',
        forecastType: 'Firm (90%)',
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
        revenue: 12000000,
        signDate: '21/07/2026',
        startDate: '01/08/2026',
        forecastType: 'Firm (85%)',
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
        revenue: 28000000,
        signDate: '20/07/2026',
        startDate: '25/07/2026',
        forecastType: 'Firm (100%)',
        forecastDate: '2026-07-20'
    }
];

let CRMState = loadState();
let isUnlocked = false;
let pendingTabTarget = null;
const DEFAULT_PIN = "8888";

function loadState() {
    const saved = localStorage.getItem('Z_CRM_STATE_V6');
    if (saved) {
        try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return {
        matrix: MATRIX_DATA,
        leads: DEFAULT_LEADS,
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
    localStorage.setItem('Z_CRM_STATE_V6', JSON.stringify(CRMState));
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
    renderMatrixReport();
    renderMasterLeads();
    renderForecastTable();
    renderRemindTable();
    renderCuuNetTable();
    renderImprovements();
    renderCheckins();
}

/* ==========================================================================
   1. DASHBOARD MATRIX & OVERVIEW MODE SWITCHER
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

function renderMatrixReport() {
    const tbody = document.getElementById('matrixTbody');
    if (!tbody) return;

    let html = '';

    CRMState.matrix.sections.forEach(section => {
        html += `
            <tr class="row-header-section">
                <td colspan="14">${escapeHtml(section.title)}</td>
            </tr>
        `;

        section.rows.forEach(r => {
            const isYellowClass = r.isYellow ? 'row-highlight-yellow' : '';

            const totalPlan = typeof r.huyen.plan === 'number' ? (r.huyen.plan + r.uyen.plan + r.ngan.plan) : r.huyen.plan;
            const totalAct = typeof r.huyen.act === 'number' ? (r.huyen.act + r.uyen.act + r.ngan.act) : r.huyen.act;
            const totalRate = (typeof totalPlan === 'number' && totalPlan > 0) ? ((totalAct / totalPlan) * 100).toFixed(2) + '%' : r.huyen.rate;

            html += `
                <tr class="${isYellowClass}">
                    <td>${escapeHtml(r.name)}</td>
                    <td style="text-align:center;">${escapeHtml(r.unit)}</td>

                    <!-- SALE 1: HUYỀN -->
                    <td>${formatVal(r.huyen.plan, r.unit)}</td>
                    <td>${formatVal(r.huyen.act, r.unit)}</td>
                    <td><strong class="text-cyan">${escapeHtml(r.huyen.rate)}</strong></td>

                    <!-- SALE 2: UYÊN -->
                    <td>${formatVal(r.uyen.plan, r.unit)}</td>
                    <td>${formatVal(r.uyen.act, r.unit)}</td>
                    <td><strong class="text-purple">${escapeHtml(r.uyen.rate)}</strong></td>

                    <!-- SALE 3: NGÂN -->
                    <td>${formatVal(r.ngan.plan, r.unit)}</td>
                    <td>${formatVal(r.ngan.act, r.unit)}</td>
                    <td><strong class="text-pink">${escapeHtml(r.ngan.rate)}</strong></td>

                    <!-- TỔNG TEAM -->
                    <td>${formatVal(totalPlan, r.unit)}</td>
                    <td>${formatVal(totalAct, r.unit)}</td>
                    <td><strong class="text-green">${escapeHtml(totalRate)}</strong></td>
                </tr>
            `;
        });
    });

    tbody.innerHTML = html;
}

function formatVal(val, unit) {
    if (typeof val === 'string') return val;
    if (typeof val === 'number') {
        if (unit.includes('VNĐ')) return val.toLocaleString('vi-VN') + ' đ';
        return val.toLocaleString('vi-VN');
    }
    return val || 0;
}

/* ==========================================================================
   2. MASTER LEAD TRACKER - FILTERED BY 3 SALES
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
        tbody.innerHTML = `<tr><td colspan="11" style="text-align:center; padding: 24px; color: var(--text-muted);">Không tìm thấy hợp đồng nào cho bộ lọc này.</td></tr>`;
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
                signDate: document.getElementById('newSignDate').value || '21/07/2026',
                startDate: '01/08/2026',
                forecastType: 'Firm (100%)',
                forecastDate: '2026-07-21'
            };

            CRMState.leads.unshift(newLead);
            saveState();
            closeAddLeadModal();
            form.reset();
            alert(`🎉 Đã thêm hợp đồng mới cho ${shopBrand} (Sale: ${sale}) với mã ${code}!`);
        });
    }
}

function closeAddLeadModal() {
    document.getElementById('addLeadModal').classList.remove('active');
}

function deleteLead(leadId, shopBrand) {
    if (confirm(`⚠️ XÓA hợp đồng "${shopBrand}" khỏi danh sách?`)) {
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
        alert(`🎉 Chúc mừng ${lead.sale}! Đã chuyển ${lead.shopBrand} sang Nghiệm Thu (${formatVNĐ(lead.revenue)})!`);
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
