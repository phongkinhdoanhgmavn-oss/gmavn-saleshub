import { PIPELINE_QA } from './pipelineQa';

// Kịch bản theo Sales Pipeline GMA VN. Xưng "Cô/Thầy", gọi phụ huynh là "Ba/Mẹ + tên".
// Chỗ {khóa} do app tự điền từ thông tin Sales và phụ huynh; chỗ [ngoặc vuông] Sales tự điền thêm.
// Muốn sửa lời kịch bản, sửa tại đây.

export const COURSES = [
  { id: 'mmh12', label: 'Memohack 12 tháng' },
  { id: 'mmh11', label: 'Memohack 1:1' },
  { id: 'hyper', label: 'Hyperhack' },
];

// Khóa gợi ý từ báo giá gần nhất
export const QUOTE_TO_COURSE = { memohack: 'mmh12', memohack_3t_1v1: 'mmh11', hyperhack: 'hyper' };

export const QUICK_FACTS = [
  'Trial + Đo sóng não: 90 phút. Giá 900.000đ, đăng ký qua Sales thì miễn phí (còn {suat} suất).',
  'Memohack 12 tháng và Hyperhack: Trial Offline vào Chủ nhật, tại cơ sở Hà Đông hoặc Cầu Giấy.',
  'Memohack 1:1 trực tuyến: Trial Online.',
  'Mốc đo sóng não: đo ban đầu (ở Trial) và đo lại sau 3 tháng. Memohack 12 tháng đo 4 lần trong năm (website ghi tháng 1, 3, 6, 12, tài liệu đào tạo ghi tháng 3, 6, 9, 12, chờ anh chốt).',
  'Không tự giảm giá, không hứa kết quả, không chẩn đoán hay gán nhãn cho bé. Không nói về ưu đãi giới thiệu với phụ huynh.',
];

export const CHOOSE_COURSE = [
  { course: 'Memohack 12 tháng (42,5 triệu)', fit: 'Muốn con học bài bản, lâu dài, cả nhà cùng đồng hành.', point: '144 buổi (96 Online + 48 Offline), 4 lần đo sóng não, coaching 1:1 không giới hạn, lớp Parenting cho Ba Mẹ, quà tặng kèm trị giá 12 triệu. Mục tiêu của chương trình: nhớ 100 từ trong 60 giây.' },
  { course: 'Memohack 1:1 trực tuyến (12,5 triệu)', fit: 'Muốn có người kèm riêng, lịch linh hoạt, học tại nhà.', point: '24 buổi Online 1 kèm 1 với giáo viên, 45 phút mỗi buổi, 4 chặng, 12 chủ đề nhân cách.' },
  { course: 'Hyperhack (13 triệu)', fit: 'Muốn chương trình tập trung ngắn ngày, rèn thói quen học.', point: '60 ngày, 120 buổi Online với Trainer chuyên biệt, bộ ba memoKUNGFU, memoEYE, memoSTATE.' },
];

// item: { id, title, when, text } hoặc { byCourse: { mmh12, mmh11, hyper } } khi khác nhau theo khóa
const PIPELINE_RAW = [
  {
    n: 1, id: 'phễu', title: 'Tạo phễu', short: 'Lead mới',
    goal: 'Liên hệ lead trong 10 phút. Gắn nhóm G4 (đủ thông tin) hoặc G5 (lạnh, chuyển Marketing).',
    items: [
      { id: '1.1', title: 'Lead mới từ form hoặc inbox', when: 'Zalo, Messenger',
        text: 'Chào {goi}, {xung} là {tensales} bên GMA Việt Nam ạ. {xung} thấy {goi} vừa quan tâm đến chương trình phát triển trí nhớ và tập trung cho bé. Để {xung} tư vấn đúng, {goi} cho {xung} hỏi bé {be} đang học lớp mấy và điều {goi} đang lo nhất ở bé là gì ạ?' },
      { id: '1.2', title: 'Phụ huynh cũ giới thiệu', when: 'Zalo hoặc gọi',
        text: 'Chào {goi}, {xung} là {tensales} bên GMA Việt Nam. {goi} [Người giới thiệu] có nhắc đến gia đình mình và bé {be}. {xung} xin phép hỏi thăm để xem GMA hỗ trợ được gì cho bé ạ.' },
      { id: '1.3', title: 'Sau hội thảo hoặc sự kiện', when: 'Zalo',
        text: 'Chào {goi}, {xung} là {tensales} bên GMA. {xung} thấy {goi} khá quan tâm phần [chủ đề] hôm nay. {xung} gửi {goi} cách áp dụng nhanh cho bé nhé. {goi} tiện nghe máy lúc nào ạ?' },
    ],
  },
  {
    n: 2, id: 'tiep-can', title: 'Tiếp cận', short: 'Gọi trong 10 phút',
    goal: 'Hiểu nhu cầu bằng 3 câu hỏi, chọn khóa gợi ý, hẹn lịch Trial.',
    showChooseCourse: true,
    items: [
      { id: '2.1', title: 'Kịch bản gọi điện (khoảng 3 phút)', when: 'Điện thoại',
        text: [
          '1. Mở đầu: "Dạ {xung} chào {goi}, {xung} là {tensales} bên GMA Việt Nam. {xung} gọi vì {goi} vừa để lại thông tin cho bé {be}. {goi} tiện nói chuyện 3 phút không ạ?"',
          '2. Hỏi 3 câu, nghe nhiều hơn nói:',
          '- "Bé {be} đang học lớp mấy, ở nhà bé học thế nào ạ?"',
          '- "Điều gì làm {goi} lo nhất về việc học của bé ạ?"',
          '- "Gia đình mình đã thử cách nào chưa ạ?"',
          '3. Đồng cảm một câu: "Dạ {xung} hiểu, nhiều Ba Mẹ cũng có điều lo giống mình."',
          '4. Chọn khóa theo bảng "Chọn khóa nào", nói 2 điểm khớp nhất với điều {goi} vừa kể.',
          '5. Mời Trial và chốt giờ (câu mời ở mục 2.4).',
        ].join('\n') },
      { id: '2.2', title: 'Gọi không nghe máy', when: 'Nhắn Zalo ngay sau cuộc gọi',
        text: 'Chào {goi}, {xung} là {tensales} bên GMA Việt Nam. {xung} vừa gọi để hỏi về bé {be}. Khi nào {goi} tiện, {xung} gọi lại 3 phút giúp {goi} nhé. {goi} cho {xung} xin khung giờ phù hợp ạ.' },
      { id: '2.3', title: 'Gọi lại lần 2', when: 'Sau 1 ngày',
        text: '{xung} chào {goi}. Hôm qua {xung} chưa gặp được {goi}. {xung} chỉ cần 3 phút để hỏi nhu cầu của bé và gửi lịch Trial phù hợp. {goi} cho {xung} biết giờ nào tiện ạ.' },
      { id: '2.4', title: 'Câu mời Trial và đo sóng não', when: 'Cuối cuộc gọi hoặc nhắn Zalo',
        byCourse: {
          mmh12: 'GMA có buổi Trial và đo sóng não 90 phút vào Chủ nhật tại cơ sở {coso}. Giá 900.000đ, nhưng {goi} đăng ký qua {xung} thì được miễn phí, hiện còn {suat} suất. {xung} giữ chỗ cho bé {be} vào {ngay} nhé ạ?',
          mmh11: 'GMA có buổi Trial và đo sóng não Online 90 phút. Giá 900.000đ, nhưng {goi} đăng ký qua {xung} thì được miễn phí, hiện còn {suat} suất. {goi} tiện {ngay} lúc {gio} không ạ để {xung} xếp lịch cho bé {be}?',
          hyper: 'GMA có buổi Trial và đo sóng não 90 phút vào Chủ nhật tại cơ sở {coso}. Giá 900.000đ, nhưng {goi} đăng ký qua {xung} thì được miễn phí, hiện còn {suat} suất. {xung} giữ chỗ cho bé {be} vào {ngay} nhé ạ?',
        } },
    ],
  },
  {
    n: 3, id: 'trai-nghiem', title: 'Trải nghiệm', short: 'Trial và đo sóng não',
    goal: 'Ba Mẹ và bé đến Trial, hiểu kết quả đo là nhịp của bé hôm nay, không phải chẩn đoán. G4.5 là đã đồng ý dự Trial, chưa đến.',
    items: [
      { id: '3.1', title: 'Xác nhận lịch Trial', when: 'Gửi ngay khi hẹn xong',
        link: { to: '/tin-soan?tpl=trial', label: 'Mở mẫu xác nhận Trial Offline' },
        byCourse: {
          mmh12: 'Dùng mẫu "Xác nhận Phụ huynh tới Trial Offline" trong Tin soạn sẵn. Mẫu tự điền địa điểm, link bản đồ, giờ kết thúc và giờ đến.',
          mmh11: '{xung} xác nhận lịch Trial Online cho bé {be}: {ngay}, {gio} (90 phút). Link tham gia: [link]. {goi} vào sớm 10 phút (lúc {gioden}) và để bé ngồi nơi yên tĩnh, có màn hình rõ nhé ạ.',
          hyper: 'Dùng mẫu "Xác nhận Phụ huynh tới Trial Offline" trong Tin soạn sẵn. Mẫu tự điền địa điểm, link bản đồ, giờ kết thúc và giờ đến.',
        } },
      { id: '3.2', title: 'Nhắc lịch', when: 'Hôm trước và sáng hôm đó',
        text: '{xung} nhắc {goi}, [mai/hôm nay] {gio} bé {be} có buổi Trial [tại cơ sở {coso} / Online]. {goi} có mặt lúc {gioden} nhé. Bé nhớ ăn nhẹ và ngủ đủ giấc để buổi đo thoải mái ạ. Có thay đổi {goi} nhắn {xung} sớm nhé.' },
      { id: '3.3', title: 'Lời mở đầu buổi đo', when: 'Nói trực tiếp với Ba Mẹ',
        text: '"Buổi đo hôm nay cho thấy nhịp tập trung và thư giãn của bé {be} ở thời điểm này. Đây là mốc luyện tập, không phải chẩn đoán, mỗi bé một nhịp riêng. {xung} sẽ cùng {goi} đọc kết quả."' },
      { id: '3.4', title: 'Sau Trial: gửi đề xuất', when: 'Ngay trong ngày',
        byCourse: {
          mmh12: 'Cảm ơn {goi} đã đưa bé {be} đến hôm nay. Bé hợp tác rất tốt ạ. Từ nhịp bé hôm nay, {xung} đề xuất lộ trình Memohack 12 tháng: bé học đều 8 buổi mỗi tháng, đo sóng não 4 lần trong năm để so với chính bé, và {goi} có lớp Parenting để cùng đồng hành. {xung} gửi chi tiết trong tin dưới nhé.',
          mmh11: 'Cảm ơn {goi} đã cho bé {be} tham gia hôm nay. Với lịch của gia đình mình, {xung} đề xuất Memohack 1:1 trực tuyến: 24 buổi, mỗi buổi 45 phút, bé học riêng với giáo viên theo 4 chặng, đo lại sau 3 tháng. Lịch học linh hoạt theo gia đình. {xung} gửi chi tiết trong tin dưới nhé.',
          hyper: [
            'Cảm ơn {goi} đã đưa bé {be} đến hôm nay. {xung} đề xuất Hyperhack vì giá trị của chương trình nằm ở việc luyện đều mỗi ngày:',
            '• Mỗi ngày 2 buổi ngắn khoảng 30 phút: buổi sáng giúp bé tỉnh táo và tập trung, buổi tối giúp bé thư giãn và ngủ ngon hơn.',
            '• Bộ ba bài tập memoKUNGFU, memoEYE, memoSTATE giúp cân bằng hai bán cầu não, rèn phản xạ và đưa bé vào trạng thái sẵn sàng học.',
            '• Có chuyên gia và Trainer đồng hành, {goi} cũng được học khóa ParentHack để hiểu và đồng hành cùng bé.',
            'Ví dụ minh họa từ chia sẻ của một phụ huynh: "Trước đây mỗi buổi học là một cuộc chiến. Sau vài tuần con chủ động ngồi vào bàn, tâm trạng vui vẻ hơn." Mỗi bé một nhịp riêng nên {xung} chia sẻ để {goi} tham khảo cho bé {be} ạ.',
            '{xung} gửi chi tiết trong tin dưới nhé.',
          ].join('\n'),
        } },
      { id: '3.5', title: 'Bé chưa đến Trial', when: 'G4.5 vắng',
        text: '{xung} chào {goi}. Hôm nay {xung} chưa gặp được bé {be}. {xung} giữ lịch cho mình sang [ngày khác] được không ạ? Nếu bận, {xung} có thể sắp xếp buổi Online cho tiện.' },
    ],
  },
  {
    n: 4, id: 'cham-soc', title: 'Chăm sóc', short: 'Nhịp 3-1-3',
    goal: '3 lần chạm mỗi tuần, trong 3 tuần, mỗi lần một giá trị khác nhau. Sau 3 tuần đánh giá: quan tâm thì giữ hoặc lên nhóm G, chưa phản hồi thì hạ nhóm G. Ghi CRM sau mỗi lần chạm.',
    items: [
      { id: '4.1', title: 'Tuần 1, lần 1: gửi lại kết quả đo', when: 'Ngày 1',
        text: 'Chào {goi}, {xung} gửi lại kết quả đo hôm trước của bé {be}. Đây là mốc để so với chính bé về sau ạ.' },
      { id: '4.2', title: 'Tuần 1, lần 2: mẹo nhỏ', when: 'Ngày 3',
        text: 'Mẹo nhỏ cho bé {be}: trước khi học, bé hít sâu 3 nhịp, đặt bút xuống, nhìn một điểm 10 giây. {goi} thử 3 ngày rồi kể {xung} nghe nhé.' },
      { id: '4.3', title: 'Tuần 1, lần 3: hỏi thăm', when: 'Ngày 5',
        text: 'Dạo này bé {be} học thế nào rồi ạ? Có điều gì {goi} muốn {xung} hỗ trợ không ạ?' },
      { id: '4.4', title: 'Tuần 2, lần 1 và 3: lộ trình theo khóa', when: 'Ngày 8 và ngày 12',
        byCourse: {
          mmh12: 'Điểm khác của lộ trình 12 tháng là bé học đều và đo lại theo các mốc, {goi} có lớp Parenting để cùng đồng hành. {goi} muốn {xung} gửi lộ trình 4 giai đoạn không ạ?',
          mmh11: 'Gói 1:1 hợp khi gia đình cần lịch linh hoạt: 24 buổi, 45 phút mỗi buổi, bé học riêng với giáo viên. {xung} xếp thử lịch tuần tới cho {goi} xem nhé?',
          hyper: 'Hyperhack là 60 ngày luyện đều với Trainer chuyên biệt, học 100% online ngay tại nhà. {xung} gửi {goi} một đoạn minh họa một buổi học nhé?',
        } },
      { id: '4.5', title: 'Tuần 2, lần 2: câu chuyện một bé', when: 'Ngày 10',
        text: '{xung} chia sẻ {goi} một câu chuyện nhỏ: một bé [lớp, hoàn cảnh], sau [thời gian] luyện đều đã [thay đổi cụ thể, không nêu số liệu cam kết]. Mỗi bé một nhịp, {xung} chia sẻ để {goi} tham khảo cho bé {be} ạ. (Ẩn danh, đã xin phép phụ huynh bé đó.)' },
      { id: '4.6', title: 'Tuần 3, lần 1: ưu đãi theo khóa', when: 'Ngày 15',
        byCourse: {
          mmh12: 'Hiện khóa 12 tháng có quà tặng kèm trị giá 12 triệu. Nếu gia đình có thêm bạn cùng tham gia, {xung} tư vấn ưu đãi mua chung cho {goi} ạ.',
          mmh11: 'Gói 1:1 kèm Bộ học liệu Memohack Kits. Nếu muốn học thêm buổi Offline, {xung} báo {goi} suất bổ sung ạ.',
          hyper: 'Hyperhack có Trainer chuyên biệt theo bé suốt 60 ngày. {xung} giữ lịch bắt đầu cho gia đình mình nhé?',
        } },
      { id: '4.7', title: 'Tuần 3, lần 2: giải đáp thắc mắc', when: 'Ngày 17',
        text: '{xung} thấy nhiều Ba Mẹ hay hỏi [câu hỏi thường gặp]. {xung} trả lời nhanh để {goi} tham khảo: [câu trả lời ngắn]. {goi} còn băn khoăn điều gì, {xung} giải đáp ngay ạ.' },
      { id: '4.8', title: 'Tuần 3, lần 3: hỏi quyết định', when: 'Ngày 19',
        text: '{xung} chào {goi}. {xung} gửi lại lộ trình [tên khóa] cho bé {be}. {goi} cho {xung} xin ý kiến: mình muốn bắt đầu vào [ngày] hay cần {xung} giải đáp thêm điều gì trước ạ?' },
      { id: '4.9', title: 'Sau 3 tuần: im lặng, đóng vòng', when: 'Khách chưa phản hồi, hạ nhóm G',
        text: '{xung} chào {goi}. {xung} hiểu {goi} đang bận nên {xung} xin tạm dừng nhắn để không làm phiền. Khi nào bé {be} cần hỗ trợ về trí nhớ và tập trung, {goi} cứ nhắn {xung} nhé. Chúc bé học tốt ạ!' },
    ],
  },
  {
    n: 5, id: 'chot-don', title: 'Chốt đơn', short: 'Báo giá, QR, thanh toán',
    goal: 'Gửi báo giá, QR, nhận tiền, đúng chính sách giá. Dùng trang Báo giá để tạo báo giá và QR.',
    notes: [
      'Mua chung chỉ áp dụng cho Memohack 12 tháng: 2 tài khoản giảm 5%, 3 tài khoản giảm 10%. Gói 1:1 và Hyperhack không áp dụng.',
      'Memohack 1:1: giảm tối đa 500.000đ mỗi tài khoản, phải báo Đại ca duyệt.',
      'Không tự giảm giá. Mọi giảm thêm báo Đại ca trước khi nói với phụ huynh.',
      'Đơn từ 37 triệu: gợi ý chuyển vào tài khoản công ty.',
    ],
    items: [
      { id: '5.1', title: 'Gửi báo giá và chốt mềm', when: 'Sau khi Ba Mẹ đồng ý lộ trình',
        link: { to: '/bao-gia', label: 'Mở Báo giá' },
        byCourse: {
          mmh12: 'Dạ {xung} gửi {goi} báo giá Memohack 12 tháng (42.500.000đ) cho bé {be}: 144 buổi, 4 lần đo sóng não, coaching 1:1 và lớp Parenting, kèm quà tặng trị giá 12 triệu. {goi} chọn bắt đầu từ [ngày A] hay [ngày B] để {xung} giữ chỗ ạ?',
          mmh11: 'Dạ {xung} gửi {goi} báo giá Memohack 1:1 (12.500.000đ): 24 buổi Online 45 phút, học riêng với giáo viên, kèm Bộ học liệu Memohack Kits. {goi} chọn bé {be} học lịch [A] hay [B] để {xung} xếp giáo viên ạ?',
          hyper: 'Dạ {xung} gửi {goi} báo giá Hyperhack (13.000.000đ): 60 ngày, 120 buổi Online với Trainer chuyên biệt. {goi} chọn bé {be} bắt đầu từ [ngày A] hay [ngày B] để {xung} giữ chỗ ạ?',
        } },
      { id: '5.2', title: 'Gửi mã QR thanh toán', when: 'Khi Ba Mẹ đồng ý',
        text: 'Dạ {xung} gửi {goi} mã QR thanh toán [số tiền]. {goi} chuyển xong nhắn {xung} ảnh biên lai, {xung} báo kế toán xác nhận và giữ chỗ cho bé {be} ạ.' },
      { id: '5.3', title: 'Từ chối: "Đắt quá"', when: 'Đầy đủ trong Kho, mục Xử lý từ chối',
        text: '{xung} hiểu {goi} cân nhắc. {xung} tính giúp {goi}: khóa này tương đương khoảng [số tiền]/ngày và có [điều khớp nỗi lo của {goi}]. {goi} muốn {xung} chia trả góp qua thẻ không ạ?' },
      { id: '5.4', title: 'Từ chối: "Để suy nghĩ thêm"', when: '',
        text: 'Dạ được ạ. {goi} đang cân nhắc điều gì nhất ạ? {xung} giải đáp luôn để mình quyết định thoải mái.' },
      { id: '5.5', title: 'Từ chối: "Hỏi ý chồng/vợ"', when: '',
        text: 'Dạ {xung} hiểu. {xung} gửi bản tóm tắt để {goi} chia sẻ với gia đình. {xung} đặt lịch gọi lại [ngày] nhé?' },
    ],
  },
  {
    n: 6, id: 'sau-ban', title: 'Sau bán', short: 'Đo mốc, giới thiệu',
    goal: 'Bàn giao đúng quy trình, giữ khách hài lòng, xin giới thiệu (không nêu ưu đãi).',
    items: [
      { id: '6.1', title: 'Cảm ơn và bàn giao', when: 'Ngay khi tiền về (bàn giao nội bộ xem mục Bàn giao sau khi thanh toán)',
        text: 'Dạ {xung} cảm ơn {goi} đã tin tưởng GMA. {xung} xin tạo nhóm với {goi} và các cô để chăm bé {be}. Từ hôm nay các cô sẽ đồng hành cùng bé ạ.' },
      { id: '6.2', title: 'Nhắc mốc đo', when: 'Trước mốc đo',
        byCourse: {
          mmh12: 'Sắp đến mốc đo sóng não [tháng ...] của bé {be}. {xung} đặt lịch đo cho mình nhé ạ.',
          mmh11: 'Sắp đến mốc đo sau 3 tháng của bé {be}. {xung} đặt lịch đo để so với lần đầu của bé nhé ạ.',
          hyper: 'Sắp đến mốc đo sau 3 tháng của bé {be}. {xung} đặt lịch đo để so với lần đầu của bé nhé ạ.',
        } },
      { id: '6.3', title: 'Xin giới thiệu', when: 'Sau mốc đo đầu tiên, hoặc khi Ba Mẹ khen',
        text: '{xung} rất vui vì bé {be} đang tiến bộ theo nhịp riêng. Nếu {goi} có bạn bè có bé cần hỗ trợ trí nhớ và tập trung, {goi} cho {xung} xin liên hệ để {xung} tư vấn nhé. {xung} cảm ơn {goi} trước ạ.' },
      { id: '6.4', title: 'Xin nhận xét', when: '',
        text: '{goi} có thể chia sẻ vài dòng về trải nghiệm của bé {be} với GMA không ạ? {xung} cảm ơn {goi} rất nhiều.' },
    ],
  },
];

// Mỗi bước gồm câu hỏi và cách trả lời (qa) rồi tin nhắn mẫu (items)
export const PIPELINE = PIPELINE_RAW.map((st) => ({ ...st, qa: PIPELINE_QA[st.n] ?? [] }));

const NL = String.fromCharCode(10);
const qaText = (qa) => [qa.q, typeof qa.say === 'string' ? qa.say : Object.values(qa.say).join(NL), ...(qa.points ?? [])].join(NL);

/** Dạng chữ thuần cho tìm kiếm trong Kho */
export const pipelineSearchDetails = () =>
  PIPELINE.map((st) => ({
    heading: `Bước ${st.n}. ${st.title}`,
    content: [...st.qa.map(qaText), ...st.items.map((it) => it.title + NL + (it.text ?? Object.values(it.byCourse).join(NL)))].join(NL + NL),
  }));
