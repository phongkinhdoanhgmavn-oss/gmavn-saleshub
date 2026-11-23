// Kiến thức lấy từ tài liệu đào tạo "GMA Việt Nam · Học viện Trí tuệ Thiên tài" (artifact của anh Tuấn).
// Giữ nguyên ý và câu chữ của tài liệu. Muốn sửa nội dung Kho, sửa tại đây.

// Nhóm hiển thị trong Kho, theo thứ tự
export const GROUPS = [
  { id: 'sp', title: 'Sản phẩm & giá' },
  { id: 'ban', title: 'Bán hàng' },
  { id: 'sau', title: 'Sau khi chốt' },
  { id: 'luat', title: 'Quy tắc & kiến thức' },
  { id: 'lk', title: 'Liên kết' },
];

export const GOLDEN_RULES = [
  'Không chẩn đoán trẻ, không gán nhãn.',
  'Không hứa quá, không cam kết kết quả hay điểm số.',
  'Không tự giảm giá: báo Đại ca.',
  'Không lộ thông tin phụ huynh.',
  'Không nói sai khoa học.',
];

// Bàn giao sau khi khách thanh toán, 2 luồng. link: trang trong app; href: trang bên ngoài.
const HANDOFF_COMMON = [
  { title: 'Tạo bill và mã QR', desc: 'Tạo bill và mã QR trên Sales Hub: tên khóa, số tiền, nội dung chuyển khoản, ưu đãi nếu có. Gửi mã QR cho phụ huynh.', actions: [{ to: '/bao-gia', label: 'Mở Báo giá' }] },
  { title: 'Kinh doanh x Kế toán', desc: 'Gửi bill, tag Kế toán và chị Hoàn xác nhận tiền về.', actions: [{ to: '/tin-soan?tpl=ketoan', label: 'Soạn tin cho Kế toán' }] },
  { title: 'Sales x Trainer', desc: 'Gửi thông tin học viên. Phòng Đào tạo phân công các cô care.', actions: [{ to: '/tin-soan?tpl=trainer', label: 'Soạn tin cho Trainer' }] },
];
const HANDOFF_LAST = { title: 'Nhóm mới với phụ huynh', desc: 'Sales tạo nhóm với phụ huynh và các cô, giới thiệu. Từ bước này, các cô care bé về sau.' };

export const HANDOFF_FLOWS = [
  {
    id: 'full', label: 'Memohack 12 tháng & Hyperhack',
    steps: [
      ...HANDOFF_COMMON,
      {
        title: 'GMA SALEs nội bộ',
        desc: 'Kích hoạt tài khoản MemoSchool: tạo hóa đơn trên Sales Hub, điền thông tin khách rồi tải ảnh xuống. Mở trang kích hoạt, điền thông tin học viên và tải hóa đơn lên. Sau đó tag Đại ca.',
        actions: [
          { to: '/hoa-don', label: 'Tạo hóa đơn' },
          { href: 'https://memoschool.com/memoschool-vietnam/', label: 'Mở trang kích hoạt tài khoản' },
        ],
      },
      HANDOFF_LAST,
    ],
  },
  {
    id: 'one', label: 'Memohack 1:1 trực tuyến',
    steps: [
      ...HANDOFF_COMMON,
      { title: 'GMA SALEs nội bộ', desc: 'Không cần kích hoạt tài khoản. Tag Đại ca để gửi mail thông báo khóa học.' },
      HANDOFF_LAST,
    ],
  },
];

export const LINKS = [
  { label: 'Website chính thức', value: 'https://gmavietnam.com/', url: 'https://gmavietnam.com/' },
  { label: 'Trang giới thiệu Memohack', value: 'https://www.gmavietnam.vn/memohack', url: 'https://www.gmavietnam.vn/memohack' },
  { label: 'Facebook GMA Việt Nam', value: 'https://www.facebook.com/profile.php?id=61571647816547', url: 'https://www.facebook.com/profile.php?id=61571647816547' },
  { label: 'TikTok @gma_vn', value: 'https://www.tiktok.com/@gma_vn', url: 'https://www.tiktok.com/@gma_vn' },
  { label: 'YouTube GMA VietNam', value: 'https://www.youtube.com/@GMA_VietNam', url: 'https://www.youtube.com/@GMA_VietNam' },
  { label: 'Tổng hợp tất cả liên kết', value: 'https://beacons.ai/gmavn', url: 'https://beacons.ai/gmavn' },
  { label: 'Google Maps: tìm tên', value: 'GMA Việt Nam - Học viện Trí tuệ Thiên tài' },
];

// Mỗi mục: nội dung chữ (details) hiển thị dạng thu phóng; kind đặc biệt hiển thị bằng giao diện riêng.
export const ARTIFACT_SECTIONS = [
  {
    id: 'lo-trinh', group: 'sp', icon: 'Map', title: 'Lộ trình khóa học',
    shortDesc: 'Memohack 12 tháng, 1:1 và mốc đo sóng não',
    details: [
      {
        heading: 'Memohack Toàn Diện 12 tháng',
        content: '- 96 bài học Online trong 12 tháng, 8 bài mỗi tháng.\n- Mỗi bài gồm bài học, thực hành, kích hoạt Brainwave.\n- Kết hợp 48 buổi Offline (tổng 144 buổi).',
      },
      {
        heading: 'Memohack 1:1 trực tuyến',
        content: '- 24 buổi Online 1 kèm 1 với giáo viên, mỗi buổi 45 phút.\n- 4 chặng và 12 chủ đề nhân cách.\n- Lộ trình cập nhật ngày 30/09/2026.',
      },
      {
        heading: 'Mốc đo sóng não và 4 giai đoạn thay đổi',
        content: 'Mỗi bé một nhịp riêng: đo theo mốc để so với chính con. Đây là mục tiêu luyện tập, không phải cam kết.\n\n- Tháng 3, đo lần 1: giai đoạn Hóa học. Vào nhịp dễ chịu hơn.\n- Tháng 6, đo lần 2: giai đoạn Cấu trúc. Giữ chú ý lâu hơn.\n- Tháng 9, đo lần 3: giai đoạn Chức năng. Tập trung, nhớ, tự tin hơn.\n- Tháng 12, đo lần 4: giai đoạn Phong cách sống. Thói quen tốt thành nếp.',
      },
    ],
  },
  {
    id: 'hanh-trinh', group: 'ban', icon: 'Route', title: 'Hành trình 6 hạng mục',
    shortDesc: 'Từ một cái tên đến chốt đơn và giới thiệu',
    details: [
      {
        heading: 'Sáu hạng mục',
        content: '1. Tạo phễu: Thu hút phụ huynh.\n2. Tiếp cận: Gọi trong 10 phút.\n3. Trải nghiệm: Trial, đo sóng não.\n4. Chăm sóc: Nhịp 3-1-3.\n5. Chốt đơn: Một lần thanh toán.\n6. Sau bán: Đo mốc, giới thiệu.\n\nKhách hài lòng giới thiệu phụ huynh quen, quay lại hạng mục 1.',
      },
      {
        heading: 'Nhớ nhé',
        content: '- G càng nhỏ, càng gần chốt.\n- Ghi CRM ngay sau mỗi lần tương tác.',
      },
    ],
  },
  {
    id: 'nhom-g', group: 'ban', icon: 'Gauge', title: 'Phân nhóm khách G0 đến G6',
    shortDesc: 'G càng nhỏ càng gần chốt',
    kind: 'gscale',
    details: [
      {
        heading: 'Thang nhóm G',
        content: 'G càng nhỏ, càng gần chốt.\n\n- G0: Đã chốt, sang hạng mục 5 và 6.\n- G1: Rất tiềm năng, quyết định trong 1 đến 3 ngày.\n- G2: Tiềm năng cao, 1 đến 2 tuần.\n- G3: Trung bình, 1 đến 3 tháng.\n- G4.5: Đã đồng ý dự Trial, chưa đến.\n- G4: Mới đủ thông tin, chưa dự Trial.\n- G5: Lead lạnh, Marketing nuôi.\n- G6: Không phù hợp, loại khỏi danh sách.',
      },
    ],
  },
  {
    id: 'tu-van-5', group: 'ban', icon: 'ListOrdered', title: 'Khung tư vấn 5 bước',
    shortDesc: 'Hỏi, đồng cảm, giải pháp, định vị, chốt',
    details: [
      {
        heading: 'Năm bước tư vấn',
        content: 'Đi từ nhu cầu của phụ huynh trước khi nói sản phẩm.\n\n1. Hỏi và nghe: Hỏi mềm, nghe nhiều hơn nói.\n2. Đồng cảm: Gật đầu với cảm xúc trước.\n3. Giải pháp: Chọn 2 đến 3 điểm bán khớp nỗi đau.\n4. Định vị: Toàn Diện hay 1:1, hợp với con thế nào.\n5. Chốt: Một bước tiếp theo rõ ràng.',
      },
      {
        heading: 'Nhớ nhé',
        content: '- Hỏi trước, nói sau.\n- Cuộc nào cũng kết thúc bằng một bước tiếp theo rõ ràng.',
      },
    ],
  },
  {
    id: 'nhip-313', group: 'ban', icon: 'Repeat', title: 'Nhịp chăm sóc 3-1-3',
    shortDesc: '3 lần mỗi tuần, 3 tuần, rồi đánh giá',
    details: [
      {
        heading: 'Cách chạy nhịp 3-1-3',
        content: '3 lần mỗi tuần, trong 3 tuần, rồi đánh giá.\n\n- Tuần 1: 3 lần chạm, mỗi lần một giá trị khác nhau.\n- Tuần 2: 3 lần chạm, mỗi lần một giá trị khác nhau.\n- Tuần 3: 3 lần chạm, mỗi lần một giá trị khác nhau.\n- Sau 3 tuần là bước ĐÁNH GIÁ.',
      },
      {
        heading: 'Sau 3 tuần đánh giá thế nào',
        content: '- Khách quan tâm: giữ nguyên nhóm G hoặc lên nhóm.\n- Khách chưa phản hồi: hạ nhóm G.',
      },
    ],
  },
  {
    id: 'ban-giao', group: 'sau', icon: 'PackageCheck', title: 'Bàn giao sau khi thanh toán',
    shortDesc: '5 bước, có checklist và nút soạn tin',
    kind: 'handoff',
    details: [
      {
        heading: 'Các bước bàn giao',
        content: HANDOFF_FLOWS.map((f) => `${f.label}\n` + f.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.desc}`).join('\n')).join('\n\n'),
      },
    ],
  },
  {
    id: 'vung-an-toan', group: 'luat', icon: 'ShieldAlert', title: 'Vùng an toàn',
    shortDesc: 'Những điều tuyệt đối không làm khi tư vấn',
    kind: 'rules',
    details: [
      {
        heading: 'Quy tắc vùng an toàn',
        content: GOLDEN_RULES.map((r) => `- ${r}`).join('\n') + '\n\nChạm một điều trong số này là chưa đạt.',
      },
      {
        heading: 'Nhớ nhé',
        content: '- Con số tiến bộ là mục tiêu luyện tập, không phải cam kết. Mỗi con một nhịp riêng.\n- Không toxic, không nói xấu đồng nghiệp. Đây là lằn ranh đỏ số 1.',
      },
    ],
  },
  {
    id: 'lien-ket', group: 'lk', icon: 'Link2', title: 'Liên kết GMA VN',
    shortDesc: 'Website, mạng xã hội, bấm để copy gửi phụ huynh',
    kind: 'links',
    details: [
      {
        heading: 'Liên kết chính thức',
        content: LINKS.map((l) => `- ${l.label}: ${l.value}`).join('\n'),
      },
    ],
  },
];
