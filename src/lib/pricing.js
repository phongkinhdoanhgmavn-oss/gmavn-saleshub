import { fmtNum } from './format';
// Logic báo giá, chuyển từ bản cũ sang module riêng để dễ kiểm tra.
export const PACKAGES = [
  {
    id: 'memohack', name: 'Memohack 12 tháng', short: '12T', price: 42500000, days: 365, sessions: 144,
    desc: '144 buổi · 96 Online + 48 Offline', addon: 5500000, tone: '#eb7c16', groupEligible: true,
    includes: [
      '4 lần đo sóng não',
      'Coaching 1:1 chuyên sâu, không giới hạn',
      'Lớp Zoom hỗ trợ hàng ngày từ thứ 2 đến thứ 7',
      'Lớp Parenting cho cha mẹ vào thứ 6 hàng tuần',
      'Mục tiêu của chương trình: nhớ 100 từ / 60 giây',
    ],
    gifts: [
      { name: 'Khóa học ParentHack 15 bài (quà tặng cha mẹ)', value: 10000000 },
      { name: 'Đo và đọc kết quả sóng não chuyên sâu (quà tặng con)', value: 1000000 },
      { name: 'Bộ học liệu Memohack Kits (quà tặng con)', value: 1000000 },
    ],
  },
  {
    // Gói 1:1: 12,5tr, 24 buổi online x 45 phút. Mua kèm suất Offline bổ sung 2,2tr (tặng 1 bịt mắt hoặc 1 áo tùy chọn).
    id: 'memohack_3t_1v1', name: 'Memohack 3 tháng 1:1 trực tuyến', short: '3T 1:1', price: 12500000, days: 90, sessions: 24,
    desc: '24 buổi online 1:1 với giáo viên × 45 phút', addon: 2200000, addonNote: 'tặng 1 bịt mắt hoặc 1 áo tùy chọn', tone: '#8b5a36', maxDiscount: 500000,
    includes: ['24 buổi Online 1 kèm 1 với giáo viên, 45 phút/buổi', '4 chặng, 12 chủ đề nhân cách'],
    gifts: [
      { name: 'Bộ học liệu Memohack Kits', value: 1000000 },
      { name: '12 buổi Offline học chung lớp Memohack tại trung tâm', value: 0 }, // quà tặng đồng hành, không quy đổi ra tiền, không hoàn tiền
    ],
  },
  {
    id: 'hyperhack', name: 'Hyperhack (trẻ đặc biệt)', short: 'HH', price: 13000000, days: 60, sessions: 120,
    desc: '120 buổi Online · 60 ngày', addon: 0, tone: '#6b4226',
    includes: ['Chương trình online 60 ngày, 120 buổi', '100% Online với Trainer chuyên biệt', 'Bộ ba bài tập memoKUNGFU, memoEYE, memoSTATE'],
    gifts: [{ name: 'Khóa ParentHack dành cho Ba Mẹ', value: 4000000 }],
  },
];

/** Chính sách mua chung: 2 tài khoản giảm 5% tổng tiền, 3 tài khoản giảm 10% tổng tiền. Chỉ áp dụng cho Memohack 12 tháng (groupEligible). Gói 1:1 giảm tối đa maxDiscount mỗi tài khoản. */
export const GROUP_RULES = [
  { accounts: 2, rate: 0.05 },
  { accounts: 3, rate: 0.1 },
];
export const groupRateFor = (accounts) => [...GROUP_RULES].reverse().find((r) => accounts >= r.accounts)?.rate ?? 0;
export const giftValue = (p) => (p.gifts || []).reduce((a, g) => a + g.value, 0);

export const TENURES = [
  { id: 3, label: '3 tháng', rate: 0.03 },
  { id: 6, label: '6 tháng', rate: 0.045 },
  { id: 9, label: '9 tháng', rate: 0.057 },
  { id: 12, label: '12 tháng', rate: 0.07 },
  { id: 18, label: '18 tháng', rate: 0.1 },
  { id: 24, label: '24 tháng', rate: 0.1 },
];

export const BANKS = [
  'Vietcombank', 'Techcombank', 'BIDV', 'VietinBank', 'Sacombank', 'MB Bank', 'VPBank', 'ACB', 'SHB', 'VIB',
  'TPBank', 'Maritime Bank (MSB)', 'MCredit', 'Shinhan Bank', 'HSBC', 'SCB', 'OCB', 'HDBank', 'Eximbank',
];

export const fmt = (n) => fmtNum(n) + 'đ';
// Số gọn cho thanh cố định: 6.150.000 -> "6,15 tr"
export const fmtTr = (n) => (n ? `${String(Math.round(n / 1e4) / 100).replace('.', ',')} tr` : '0');
export const fmtShort = (n) => {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1).replace('.0', '').replace('.', ',')} triệu`;
  if (n >= 1e3) return `${Math.round(n / 1e3)}K`;
  return String(Math.round(n));
};

export function installmentFee(bank, tenureId, principal) {
  const t = TENURES.find((x) => x.id === tenureId);
  if (bank === 'MCredit') {
    if (principal >= 3000000) {
      const r = { 3: 0.0299, 6: 0.0599, 9: 0.0999, 12: 0.1249 }[tenureId] ?? 0;
      return Math.round(principal * r);
    }
    return principal >= 50000 ? 50000 : 0;
  }
  if (bank === 'Maritime Bank (MSB)') {
    const extra = [3, 6, 9, 12].includes(tenureId) ? 0.03 : 0;
    return Math.round(principal * (t.rate + extra));
  }
  return Math.round(principal * t.rate);
}

/**
 * items: { [pkgId]: { qty, addon } }
 */
export function calcQuote({ items, groupOn, customPct, customVnd, installment, tenureId, bank }) {
  let base = 0, addon = 0, qtyTotal = 0, days = 0, sessions = 0, groupQty = 0, groupBase = 0;
  const lines = [];
  for (const [id, cfg] of Object.entries(items)) {
    const p = PACKAGES.find((x) => x.id === id);
    if (!p) continue;
    const lineGross = ((cfg.price ?? p.price ?? 0) + (cfg.addon ? p.addon : 0)) * cfg.qty;
    base += (cfg.price ?? p.price ?? 0) * cfg.qty;
    if (cfg.addon) addon += p.addon * cfg.qty;
    qtyTotal += cfg.qty;
    if (p.groupEligible) { groupQty += cfg.qty; groupBase += lineGross; }
    lines.push({ p, qty: cfg.qty, gross: lineGross });
    days = Math.max(days, p.days);
    sessions += p.sessions * cfg.qty;
  }
  const gross = base + addon;
  // Mua chung: chỉ tính các suất Memohack 12 tháng
  const groupRate = groupOn ? groupRateFor(groupQty) : 0;
  const groupAmt = Math.round(groupBase * groupRate);
  // Giảm thêm: chia theo tỷ lệ giá từng dòng, gói có trần (1:1) bị cắt theo trần mỗi tài khoản
  const customRaw = Math.round(gross * (customPct / 100)) + customVnd;
  let customAmt = 0;
  for (const l of lines) {
    const share = gross ? (customRaw * l.gross) / gross : 0;
    customAmt += l.p.maxDiscount != null ? Math.min(share, l.p.maxDiscount * l.qty) : share;
  }
  customAmt = Math.round(customAmt);
  const customCapped = customAmt < customRaw;
  const discount = Math.min(gross, groupAmt + customAmt);
  const final = gross - discount;
  const effectivePct = gross ? (discount / gross) * 100 : 0;

  const principal = installment ? final : 0;
  const fee = installment ? installmentFee(bank, tenureId, principal) : 0;
  const monthly = installment ? Math.ceil((principal + fee) / tenureId) : 0;

  return {
    gross, groupAmt, customAmt, customRaw, customCapped, discount, final, effectivePct, qtyTotal, groupQty, groupRate,
    fee, total: final + fee, monthly,
    perDay: days ? final / days : 0,
    perSession: sessions ? final / sessions : 0,
    days, sessions,
  };
}
