// Phương pháp và điểm khác biệt của GMA, lấy nguyên văn từ website gmavietnam.com (trang chủ, trang chương trình).
// Đây là lời mô tả phương pháp và mục tiêu luyện tập. Khi nói với Ba Mẹ không dùng như lời hứa kết quả.

export const METHOD_NOTE = 'Nội dung lấy từ website GMA VN. Khi tư vấn, nói đây là mục tiêu luyện tập của chương trình, mỗi bé một nhịp riêng, không hứa kết quả cụ thể. Các câu có "100%" hoặc "nhanh gấp 3 lần" chỉ dùng để hiểu phương pháp, không nhắc lại như lời cam kết.';

// 1. So sánh giáo dục truyền thống và giáo dục não bộ GMA
export const COMPARE = {
  title: 'So sánh: Giáo dục truyền thống và Giáo dục não bộ GMA VN',
  intro: 'Khi con học trước quên sau, mất tập trung hay sợ học, bản chất không phải do con "lười" hay "kém". Việc của chúng ta là lựa chọn con đường giáo dục đúng đắn cho con.',
  trad: {
    badge: 'Giáo dục truyền thống',
    title: 'Tập trung "Phần Ngọn" & Nhồi nhét kiến thức',
    rows: [
      ['Cách tiếp cận', 'Tăng ca học thêm, ép con học thuộc lòng và làm bài tập liên tục khi não bộ con chưa sẵn sàng.'],
      ['Vận hành não bộ', 'Chưa được huấn luyện & nâng cấp não bộ mà đã nạp lượng lớn kiến thức → Não bộ quá tải, con mau quên, sợ học và mất tập trung.'],
      ['Tâm lý của con', 'Căng thẳng, lo âu vì áp lực điểm số, học trong trạng thái đối phó, mệt mỏi và cạn kiệt năng lượng.'],
      ['Kết quả', 'Kiến thức trôi đi sau mỗi kỳ thi, con thụ động và dần đánh mất niềm say mê khám phá tự nhiên.'],
    ],
    outcome: 'Hậu quả: Con kiệt sức, sợ học, ba mẹ mệt mỏi đôn đốc mỗi ngày.',
  },
  gma: {
    badge: 'Giáo dục não bộ GMA VN',
    title: 'Huấn Luyện & Nâng Cấp Não Bộ Từ Gốc Rễ',
    rows: [
      ['Triết lý cốt lõi', 'Tập trung vào não bộ là gốc rễ của sự phát triển một con người. Khi não bộ được huấn luyện và nâng cấp, việc học hay tiếp thu mọi kiến thức đều trở nên đơn giản & tự nhiên.'],
      ['6 năng lực não bộ', 'GMA VN giúp con phát triển toàn diện 6 năng lực não bộ:', ['Trí nhớ sâu', 'Nhận thức bản chất', 'Cảm xúc ổn định', 'Tiếp nhận thông tin', 'Tập trung bền bỉ', 'Sự tự tin nội tại']],
      ['Tâm lý của con', 'Happy – Relax – Positive (Vui vẻ, thư giãn, tích cực), tâm trí thảnh thơi mở rộng khả năng tiếp thu sâu.'],
      ['Kết quả', 'Con tự giác học tập 100%, phản xạ nhạy bén, nhớ lâu hiểu sâu và tự tin bứt phá vượt trội trọn đời.'],
    ],
    outcome: 'Kết quả: Não bộ được nâng cấp → Việc học trở nên đơn giản, con hạnh phúc và tự giác trọn đời.',
  },
};

// 2. Phương pháp Memohack độc quyền: học mà chơi, 6 giác quan
export const SENSES = {
  title: 'Phương pháp Memohack độc quyền: "Học mà chơi"',
  heading: 'Đánh thức tiềm năng não bộ qua trải nghiệm "Học mà chơi"',
  intro: 'Giải phóng con khỏi phương pháp nhồi nhét thụ động, khai mở trọn vẹn 6 giác quan tiếp nhận tự nhiên.',
  tableTitle: 'Cửa ngõ tiếp nhận 6 giác quan tự nhiên (GMA Brain Method)',
  senses: [
    ['Thính giác', 'Hearing', 'Cải thiện học tập'],
    ['Thị giác', 'Seeing', 'Cải thiện tốc độ'],
    ['Xúc giác', 'Feeling', 'Cải thiện cảm giác'],
    ['Khứu giác', 'Smelling', 'Cải thiện kỹ năng'],
    ['Vị giác', 'Tasting', 'Khả năng quan sát'],
    ['Trực giác', 'Inspiration', 'Tạo ra các ý tưởng mới'],
  ],
  points: [
    ['Kích hoạt & cân bằng 2 bán cầu não', 'Não bộ vận hành đồng bộ, tư duy nhạy bén và toàn diện.'],
    ['Tăng cường tập trung & tốc độ học tập', 'Khả năng ghi nhớ hình ảnh sâu, tiếp thu bài nhanh gấp 3 lần.'],
    ['Đặc biệt phát triển nhân cách trưởng thành', 'Tự lập, tự tin và tự giác học tập trọn đời.'],
  ],
  exclusive: ['Công nghệ kích hoạt & cân bằng não bộ', 'Ứng dụng Brain Gym – Balavisx'],
  orbit: ['Tiếp nhận', 'Hiểu sâu', 'Tập trung', 'Ghi nhớ', 'Cảm xúc', 'Tự tin'],
};

// 3. Công thức chuyển hóa năng lực học tập (mục tiêu khóa 1 năm)
export const FORMULA = {
  title: 'Công thức chuyển hóa năng lực học tập (mục tiêu khóa 1 năm)',
  tag: '#memohack™ Mục tiêu khóa học 1 năm',
  intro: 'Khi não bộ được giải phóng khỏi áp lực căng thẳng và được kích hoạt đúng cách, mọi việc học đều trở nên tự nhiên, vui vẻ và hào hứng.',
  parts: [
    ['Năng lượng tích cực & Tính cách trưởng thành', ['Tâm trí vui vẻ, thư giãn khi học bài', 'Hết cáu gắt, tự điều hòa cảm xúc', 'Giải tỏa 100% áp lực, ức chế học tập']],
    ['Não bộ linh hoạt & Giàu ý tưởng', ['Kích hoạt trực giác & tư duy sáng tạo', 'Truyền cảm hứng, nảy sinh ý tưởng mới', 'Cân bằng song não & tăng sức bền tư duy']],
    ['Trí nhớ tuyệt vời & Tập trung cao độ', ['Cải thiện chú ý, ngồi học tự giác 30–45 phút', 'Tạo hình ảnh tâm trí & sơ đồ tư duy', 'Ghi nhớ sâu, ôn bài nhanh gấp 3 lần']],
  ],
  result: ['Học sinh xuất sắc & Tự chủ', 'Con tự tin làm chủ việc học trọn đời mà không cần ba mẹ phải thúc ép hay quát mắng.'],
  stages: [
    ['Giai đoạn 1', 'Thay đổi Hóa học'],
    ['Giai đoạn 2', 'Thay đổi Cấu trúc'],
    ['Giai đoạn 3', 'Thay đổi Chức năng'],
    ['Đích đến trọn đời', 'Thay đổi Phong cách sống'],
  ],
};

// 4. Ba nền tảng và 6 năng lực (trang Memohack Toàn Diện)
export const FOUNDATIONS = {
  title: 'Ba nền tảng và 6 năng lực của Memohack',
  platforms: [
    ['Đo sóng não Neuro Harmony M', 'Thiết bị của Viện nghiên cứu não bộ Hàn Quốc. Phân tích hai bán cầu não và các chỉ số căng thẳng, tập trung, cân bằng năng lượng não, nhịp Gamma, Beta, SMR, Alpha, Theta, Delta. Ba mẹ nhận báo cáo chi tiết và tư vấn cá nhân hóa.'],
    ['Nhạc sóng não độc quyền', 'Giúp cân bằng não bộ.'],
    ['Brain Gym và Bal-A-Vis-X', 'Brain Gym được GMA VN triển khai qua các bài MemoDance, MemoEye, MemoStand, MemoKungfu... giúp kích hoạt và kết nối các vùng não. Bal-A-Vis-X (do Bill Hubert phát triển) luyện phối hợp vận động, thăng bằng và thị giác qua tung bắt bóng, gõ nhịp. Hai phương pháp hỗ trợ cân bằng hai bán cầu não, tăng tập trung, tăng phản xạ, giảm căng thẳng và đưa não bộ vào trạng thái sẵn sàng trước khi học.'],
  ],
  abilities: [
    ['Ghi nhớ siêu tốc', 'Làm chủ màn hình tâm trí, mã hóa dữ liệu thành hình ảnh sống động, giúp con nhớ sâu và không bị quên vặt.'],
    ['Tập trung cao độ (sóng não BETA)', 'Kích hoạt vùng suy nghĩ bậc cao, rèn khả năng duy trì chú ý bền bỉ ngay cả trong môi trường xao nhãng.'],
    ['Cân bằng cảm xúc (MemoState)', 'Phương pháp thiền thở giúp con tự điều hòa tâm lý, giảm cáu gắt và hình thành tâm thế điềm tĩnh.'],
    ['Khả năng hiểu sâu', 'Tăng tốc độ giải mã thông tin, hiểu bản chất vấn đề từ gốc rễ thay vì học vẹt hay học gạo đối phó.'],
    ['Tiếp nhận thông tin đa giác quan (VAK)', 'Kết hợp nhịp nhàng Thị giác (V), Thính giác (A) và Vận động (K), mở rộng dung lượng đón nhận kiến thức.'],
    ['Sự tự tin tỏa sáng', 'Tự tin phát biểu trước đám đông, độc lập trong bài vở và hình thành nhân cách trưởng thành, tử tế.'],
  ],
};

// Chữ thuần để copy gửi phụ huynh
export const compareText = () => [
  COMPARE.title,
  '',
  `${COMPARE.trad.badge}: ${COMPARE.trad.title}`,
  ...COMPARE.trad.rows.map(([k, v]) => `- ${k}: ${v}`),
  COMPARE.trad.outcome,
  '',
  `${COMPARE.gma.badge}: ${COMPARE.gma.title}`,
  ...COMPARE.gma.rows.map(([k, v, chips]) => `- ${k}: ${v}${chips ? ' ' + chips.join(', ') + '.' : ''}`),
  COMPARE.gma.outcome,
].join('\n');

export const sensesText = () => [
  SENSES.heading,
  SENSES.intro,
  '',
  SENSES.tableTitle,
  ...SENSES.senses.map(([vi, en, b]) => `- ${vi} (${en}): ${b}`),
  '',
  ...SENSES.points.map(([k, v]) => `- ${k}: ${v}`),
  '',
  `Độc quyền huấn luyện não bộ tại GMA Việt Nam: ${SENSES.exclusive.join('; ')}.`,
].join('\n');

export const formulaText = () => [
  `${FORMULA.tag}`,
  FORMULA.title,
  FORMULA.intro,
  '',
  ...FORMULA.parts.flatMap(([t, rows]) => [`${t}:`, ...rows.map((r) => `- ${r}`)]),
  '',
  `= ${FORMULA.result[0]}: ${FORMULA.result[1]}`,
  '',
  FORMULA.stages.map(([a, b]) => `${a}: ${b}`).join(' → '),
].join('\n');
