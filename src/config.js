// Thông tin dùng chung. Sửa tại đây, không cần đụng vào giao diện.
export const CONTACT = {
  hotline: '0981 586 907',
  hotlineHref: 'tel:0981586907',
  zaloHref: 'https://zalo.me/0981586907',
  branches: [
    { name: 'Cơ sở Hà Đông', area: 'Hà Đông, Hà Nội' },
    { name: 'Cơ sở Cầu Giấy', area: 'Cầu Giấy, Hà Nội' },
  ],
};

// Tài khoản nhận thanh toán (lấy từ bản cũ). bankBin = mã 6 số của ngân hàng theo chuẩn VietQR.
// Lưu ý: dữ liệu này nằm trong mã web nên ai mở web cũng xem được; khi có đăng nhập sẽ chuyển ra nơi kín hơn.
export const BANK_ACCOUNTS = {
  company: {
    label: 'Tài khoản công ty',
    bankBin: '970422',
    number: '226661368',
    holder: 'CTCP GIAO DUC GMA VIET NAM',
    bankName: 'MB Bank',
    shortName: 'MB Bank',
  },
  personal: {
    label: 'Tài khoản cá nhân',
    bankBin: '970415',
    number: '103884261840',
    holder: 'TRƯƠNG THỊ THU HOÀN',
    bankName: 'VietinBank CN Đô Thành - PGD Hoàng Văn Thụ',
    shortName: 'VietinBank',
  },
};
// Thông tin in ở chân hóa đơn kích hoạt tài khoản MemoSchool.
export const INVOICE = {
  email: 'phongkinhdoanh.gmavn@gmail.com',
  address: 'NO24 - LK829 Khu đất dịch vụ Bờ Hội, La Khê, Hà Đông, Hà Nội, Việt Nam',
  phone: '+84 981 586 907',
  siteText: 'GMAVIETNAM.COM',
  siteUrl: 'https://gmavietnam.com/',
  firstNo: 65, // số hóa đơn đầu tiên của Sales Hub (mẫu gần nhất là #64)
  taxPct: 0,
  account: 'personal', // luôn in tài khoản cá nhân
  // Giá cố định in trên hóa đơn, không sửa tay
  products: [
    { id: 'memohack', label: 'Memohack 12 tháng', name: 'Sản phẩm Memohack', price: 37500000 },
    { id: 'hyperhack', label: 'Hyperhack', name: 'Sản phẩm Hyperhack', price: 13000000 },
  ],
};
// Quy tắc cũ: đơn từ mức này trở lên thì chuyển vào tài khoản công ty.
export const COMPANY_ACCOUNT_THRESHOLD = 37000000;

// TẠM: anh chỉnh lại theo chính sách thật.
export const POLICY = {
  maxSelfDiscountPct: 0, // Quy tắc trong tài liệu đào tạo: không tự giảm giá, mọi ưu đãi phải báo Đại ca duyệt
  vatNote: 'Báo giá chưa bao gồm 8% VAT. Nếu cần xuất hóa đơn đỏ, vui lòng cộng thêm 8% vào tổng giá trị.',
};

// Ưu đãi ghim đầu trang Hôm nay. Để trống thì không hiện gì. Khi có ưu đãi mới, thêm vào đây, hết hạn (expires) tự ẩn.
// Ví dụ: { id: 'p1', title: 'Ưu đãi tháng 12', lines: ['...'], expires: '2026-12-31' }
export const PROMOS = [];
