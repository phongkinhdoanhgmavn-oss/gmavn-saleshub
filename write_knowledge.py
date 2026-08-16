# -*- coding: utf-8 -*-
import os

content = '''import { 
  Box, 
  Users, 
  GitMerge, 
  MessageSquare, 
  ShieldQuestion, 
  CreditCard, 
  FolderOpen, 
  Headset, 
  GraduationCap,
  Compass,
  Lightbulb,
  HelpCircle
} from 'lucide-react';
import React from 'react';

export const knowledgeData = [
  {
    id: 1,
    title: "Sản phẩm & Giải pháp",
    shortDesc: "Memohack, Hyperhack, Công nghệ đo sóng não",
    icon: <Box className="w-8 h-8" />,
    color: "bg-orange-100 text-brand-orange",
    bannerImage: "/memohack_banner.png",
    details: [
      {
        heading: "1. Memohack 12 Tháng - Toàn Diện Nhất (Được lựa chọn nhiều nhất)",
        content: "• Học phí: 42.500.000 vnđ\\n• Lộ trình: 12 tháng - 156 Buổi (96 Online + 48 Offline)\\n• Đo sóng não: 4 lần\\n• Coaching 1:1: Chuyên sâu - Không giới hạn\\n• Lớp Zoom hỗ trợ: Hàng ngày từ thứ 2 đến thứ 7\\n• Lớp Parenting cho cha mẹ: Thứ 6 hàng tuần\\n• Quà tặng đi kèm:\\n  - Quà tặng cha mẹ: Khóa học ParentHack - 15 bài (Trị giá 10.000.000 vnđ)\\n  - Quà tặng con 1: Đo và đọc kết quả sóng não chuyên sâu (Trị giá 1.000.000 vnđ)\\n  - Quà tặng con 2: Bộ tài liệu học tập Memohack Kits (Trị giá 1.000.000 vnđ)\\n• Đầu ra cam kết: Nhớ 100 từ / 60 giây\\n• Điều kiện học: Trẻ từ 5 - 15 tuổi"
      },
      {
        heading: "2. Memohack 9 Tháng - Lộ trình Nâng Cấp (Từ khóa 3 tháng)",
        content: "• Học phí: 34.500.000 vnđ\\n• Lộ trình: 9 tháng - 108 Buổi (72 Online + 36 Offline)\\n• Bao gồm học liệu đầy đủ\\n• Đối tượng: Dành cho học viên nâng cấp từ khóa 3 tháng\\n• Điều kiện học: Trẻ từ 5 - 15 tuổi"
      },
      {
        heading: "3. Memohack 3 Tháng (36 Buổi) - Online + Offline (Linh hoạt)",
        content: "• Học phí: 12.500.000 vnđ\\n• Lộ trình: 3 tháng - 36 Buổi (24 Online + 12 Offline)\\n• Đo sóng não: 2 lần\\n• Coaching 1:1: 1 lần\\n• Lớp Zoom hỗ trợ: Hàng ngày từ thứ 2 đến thứ 7\\n• Quà tặng đi kèm: 5 bài học ParentHack dành cho cha mẹ (Trị giá 4.000.000 vnđ)\\n• Đầu ra cam kết: Nhớ 60 từ / 45-60 giây\\n• Điều kiện học: Trẻ từ 5 - 15 tuổi"
      },
      {
        heading: "4. Memohack 3 Tháng (24 Buổi) - Offline Ca Tối (Tập trung)",
        content: "• Học phí: 8.000.000 vnđ\\n• Lộ trình: 3 tháng - 24 Buổi Offline ca tối tại trung tâm\\n• Đo sóng não: 2 lần\\n• Coaching 1:1: 1 lần\\n• Lớp Zoom hỗ trợ: Không có\\n• Quà tặng đi kèm: 5 bài học ParentHack dành cho cha mẹ (Trị giá 4.000.000 vnđ)\\n• Đầu ra cam kết: Nhớ 60 từ / 45-60 giây\\n• Điều kiện học: Trẻ từ 5 - 15 tuổi"
      },
      {
        heading: "5. Hyperhack - Dành cho trẻ đặc biệt",
        content: "- Hình thức: Chương trình online 60 ngày (120 buổi).\\n- Học phí: 13.000.000 vnđ.\\n- Đối tượng: Trẻ tự kỷ, tăng động (ADHD), chậm nói, rối loạn hành vi cảm xúc.\\n- Phương pháp: Công nghệ nghe sáng/nghe tối. Bộ ba bài tập: memoKUNGFU, memoEYE, memoSTATE.\\n- Lợi ích: Điều hòa cảm xúc, tăng tập trung, kết nối phản xạ nhanh, hành vi cải thiện rõ rệt chỉ sau 2-4 tuần."
      },
      {
        heading: "6. Đo sóng não (Neuro Harmony M)",
        content: "- Thiết bị của Viện nghiên cứu não bộ Hàn Quốc, FDA chứng nhận.\\n- Phân tích 2 bán cầu não: Độ căng thẳng, sự cân bằng năng lượng, các nhịp sóng (Gamma, Beta, SMR...)."
      }
    ]
  },
  {
    id: 2,
    title: "Chân dung KH",
    shortDesc: "Profile, Nỗi đau & Hành vi",
    icon: <Users className="w-8 h-8" />,
    color: "bg-blue-100 text-brand-blue",
    bannerImage: "/hyperhack_banner.png",
    details: [
      {
        heading: "1. Nhân khẩu học & Công việc",
        content: "- Độ tuổi: 30-45 tuổi.\\n- Thu nhập: Trung lưu – Thượng lưu (≥ 30 triệu VNĐ/tháng). Khu vực: Các Thành phố lớn.\\n- Công việc: Nhân viên văn phòng, chủ doanh nghiệp nhỏ, giáo viên, bác sĩ, kỹ sư...\\n- Kênh ưa thích: Facebook (Hội nhóm, Fanpage), YouTube, TikTok, Google."
      },
      {
        heading: "2. Nỗi đau & Động lực",
        content: "- Con mất tập trung, học trước quên sau.\\n- Con chậm phát triển hơn bạn bè cùng trang lứa.\\n- Áp lực học hành, điểm số thấp.\\n- Cảm giác tội lỗi khi không biết cách giúp con.\\n- Muốn đầu tư cho con nhưng sợ tốn tiền vô ích.\\n- Đã thử nhiều phương pháp nhưng không hiệu quả."
      },
      {
        heading: "3. Hành vi mua hàng",
        content: "- Tìm hiểu kỹ lưỡng trước khi quyết định.\\n- Cần bằng chứng xã hội (testimonial, case study).\\n- Hỏi ý kiến người thân, bạn bè.\\n- So sánh nhiều đơn vị.\\n- Quyết định dựa trên cảm xúc + lý trí.\\n- Thời điểm nhạy cảm: Đầu năm học, sau kỳ thi kém, khi con có vấn đề mới phát sinh."
      },
      {
        heading: "4. Trigger mua hàng",
        content: "- Thấy con bạn bè học tốt hơn nhờ GMA.\\n- Video testimonial chạm đúng vấn đề.\\n- Được tư vấn miễn phí đo sóng não.\\n- Chương trình ưu đãi có thời hạn.\\n- Được xem kết quả test/đo não của con."
      }
    ]
  },
  {
    id: 3,
    title: "Quy trình Sale",
    shortDesc: "6 bước tư vấn & chốt đơn",
    icon: <GitMerge className="w-8 h-8" />,
    color: "bg-purple-100 text-purple-600",
    bannerImage: "/sales_process_banner.png",
    details: [
      {
        heading: "Bước 1: Khai thác nhu cầu (5-10 phút)",
        content: "- Chào hỏi, tạo bầu không khí thân thiện.\\n- Hỏi về tình trạng học tập của con: 'Bé đang học lớp mấy ạ?', 'Bé thường gặp khó khăn gì nhất khi học?'\\n- Lắng nghe chân thật, ghi chép.\\n- Mục tiêu: Hiểu rõ 3 vấn đề chính của gia đình."
      },
      {
        heading: "Bước 2: Kết nối vấn đề (5 phút)",
        content: "- Phản chiếu lại nỗi đau: 'Tôi hiểu, ba/mẹ đang lo lắng vì...'\\n- Amplify vấn đề: 'Nếu không được giải quyết sớm, điều này có thể ảnh hưởng đến...'\\n- Tạo urgency nhẹ nhàng, không áp lực."
      },
      {
        heading: "Bước 3: Giới thiệu giải pháp (10-15 phút)",
        content: "- Trình bày chương trình phù hợp nhất với vấn đề của con.\\n- Dùng ngôn ngữ đơn giản, tránh thuật ngữ kỹ thuật.\\n- Kể 1-2 case study tương tự đã thành công.\\n- Demo đo sóng não nếu có thể."
      },
      {
        heading: "Bước 4: Xử lý từ chối (10 phút)",
        content: "- Lắng nghe, xác nhận: 'Tôi hiểu ba/mẹ đang băn khoăn về...'\\n- Dùng kỹ thuật Feel-Felt-Found.\\n- Cung cấp bằng chứng, testimonial.\\n- Xem mục 'Xử lý Từ chối' để có kịch bản chi tiết."
      },
      {
        heading: "Bước 5: Chốt đơn (5 phút)",
        content: "- Tóm tắt giá trị: 'Với chương trình này, bé sẽ...'\\n- Đề xuất bước tiếp theo cụ thể: 'Ba/mẹ muốn đặt lịch đo não vào thứ mấy ạ?'\\n- Ưu đãi/quà tặng nếu có.\\n- Không hỏi 'Ba/mẹ có muốn đăng ký không?' - luôn giả định đồng ý."
      },
      {
        heading: "Bước 6: Chăm sóc sau bán (Liên tục)",
        content: "- Gửi tài liệu hỗ trợ sau tư vấn.\\n- Follow-up sau 24h, 3 ngày, 1 tuần.\\n- Kết nối vào group hỗ trợ phụ huynh.\\n- Xin feedback và testimonial sau khi con học xong."
      }
    ]
  },
  {
    id: 4,
    title: "Kịch bản tư vấn",
    shortDesc: "Script mẫu cho mọi tình huống",
    icon: <MessageSquare className="w-8 h-8" />,
    color: "bg-green-100 text-green-600",
    bannerImage: "/script_banner.png",
    details: [
      {
        heading: "Kịch bản 1: Gặp mặt lần đầu tại TT",
        content: "Sale: 'Chào anh/chị, em là [Tên], tư vấn viên tại GMA. Hôm nay gia đình mình đến để tìm hiểu về chương trình cho bé đúng không ạ?'\\nKH: 'Vâng, tôi muốn biết thêm về chương trình của trung tâm.'\\nSale: 'Dạ tuyệt vời ạ. Để em có thể tư vấn đúng nhất, em muốn hỏi thêm một chút về bé nhà mình. Bé hiện đang học lớp mấy ạ? Và điều gì đang khiến ba/mẹ quan tâm nhất về việc học của bé?'"
      },
      {
        heading: "Kịch bản 2: Tư vấn qua điện thoại",
        content: "Sale: 'Dạ chào anh/chị [Tên], em gọi từ GMA Việt Nam. Trung tâm đang có chương trình đánh giá não miễn phí cho bé. Anh/chị có khoảng 2 phút để em chia sẻ không ạ?'\\nKH: 'Ừ, nói nhanh đi.'\\nSale: 'Dạ, hiện trung tâm GMA đang áp dụng công nghệ Neuro Harmony M từ Hàn Quốc để đánh giá tiềm năng học tập của trẻ. Qua đó mình biết được điểm mạnh/yếu của bé để có kế hoạch phát triển phù hợp. Bé nhà mình đang học lớp mấy ạ?'"
      },
      {
        heading: "Kịch bản 3: Chat Zalo/Messenger",
        content: "Mở đầu: 'Chào anh/chị [Tên] ạ. Em là [Tên Sale] từ GMA Việt Nam. Em thấy anh/chị có quan tâm đến chương trình phát triển trí tuệ cho bé. Để hiểu rõ hơn nhu cầu của gia đình, anh/chị cho em hỏi bé nhà mình đang học lớp mấy và đang gặp khó khăn gì nhất ạ?'\\nFollow-up sau 24h không reply: 'Chào anh/chị, em muốn hỏi thêm anh/chị đã tìm được giải pháp phù hợp cho bé chưa ạ? GMA đang có buổi demo đo sóng não miễn phí cuối tuần này, anh/chị có muốn đăng ký cho bé thử không ạ?'"
      },
      {
        heading: "Kịch bản 4: Referral từ phụ huynh cũ",
        content: "Sale: 'Dạ chào anh/chị [Tên], em là [Tên Sale] từ GMA. Anh/Chị [Người giới thiệu] có chia sẻ với em rằng bé nhà mình cũng đang có một số khó khăn trong việc học. Em muốn hỏi thăm thêm để xem GMA có thể hỗ trợ gia đình mình như thế nào.'\\n[Tiếp tục theo quy trình khai thác nhu cầu bình thường, nhưng có thể dùng case study của người giới thiệu để tăng tin cậy]"
      },
      {
        heading: "Kịch bản 5: Hội thảo/Event",
        content: "Sau hội thảo:\\nSale: 'Dạ em thấy anh/chị khá quan tâm đến phần [chủ đề] vừa rồi. Anh/chị có muốn em giải thích thêm về cách áp dụng cho bé nhà mình không ạ?'\\n[Tạo cuộc trò chuyện 1-1, khai thác nhu cầu cụ thể, đặt lịch tư vấn chi tiết]"
      }
    ]
  },
  {
    id: 5,
    title: "Xử lý Từ chối",
    shortDesc: "57 kịch bản phản bác thực tế",
    icon: <ShieldQuestion className="w-8 h-8" />,
    color: "bg-red-100 text-red-500",
    bannerImage: "/objection_banner.png",
    details: [
      {
        heading: "💰 GIÁ CẢ & TÀI CHÍNH (7 tình huống)",
        content: "[1] 'Học phí quá cao'\\n→ 'Dạ em hiểu ạ. Thực ra 42.5 triệu cho cả năm = ~3.5 triệu/tháng = ~116K/ngày - bằng 1 ly cà phê Starbucks. Trong khi đó bé được học 144 buổi với trainer 1-1. Đây là đầu tư cho não bộ cả đời. Anh/chị thử tính xem nếu con được cải thiện điểm số và học tốt hơn, giá trị đó là bao nhiêu?'\\n\\n[2] 'Tôi cần suy nghĩ thêm'\\n→ 'Dạ hoàn toàn đồng ý ạ. Em có thể hỏi là anh/chị đang cân nhắc điểm gì nhất không ạ? Em muốn cung cấp thêm thông tin để anh/chị có đủ cơ sở quyết định.'\\n\\n[3] 'Để hỏi ý kiến vợ/chồng'\\n→ 'Vâng, đây là quyết định cả gia đình, rất đúng đắn. Anh/chị có thể mời vợ/chồng đến buổi tư vấn tiếp theo, hoặc em có thể chuẩn bị bộ tài liệu để anh/chị chia sẻ với gia đình không ạ?'\\n\\n[4] 'Không có tiền lúc này'\\n→ 'Em hiểu ạ. GMA có chính sách trả góp không lãi suất 3-6 tháng. Với gói Memohack, mỗi tháng chỉ khoảng 7 triệu - tương đương 1 khóa học tiếng Anh thông thường. Anh/chị có muốn em giải thích phương thức thanh toán linh hoạt không ạ?'\\n\\n[5] 'Học phí cao hơn chỗ khác'\\n→ 'Dạ đúng là học phí của GMA cao hơn một số trung tâm. Bởi vì GMA là đơn vị duy nhất tại VN được chuyển giao công nghệ Neuro Harmony M từ Hàn Quốc, cộng với đội ngũ Trainer được đào tạo bài bản. Anh/chị thử so sánh kết quả của các bé học tại GMA với chỗ khác nhé.'\\n\\n[6] 'Hết tiền rồi, tháng sau mới có'\\n→ 'Không sao ạ. Em có thể đặt lịch tư vấn miễn phí cho bé trước. Khi nào ba/mẹ sẵn sàng thì mình bắt đầu. Ngày hôm nay bé đến đo não hoàn toàn miễn phí, không có cam kết gì cả. Tuần sau anh/chị có thể dẫn bé đến không ạ?'\\n\\n[7] 'Đắt hơn tôi nghĩ'\\n→ 'Dạ ban đầu con số này cũng khá lớn. Nhưng so với học phí các trường quốc tế, luyện thi chuyên, hay gia sư cả năm - đây là mức đầu tư rất hợp lý cho kết quả toàn diện về não bộ.'"
      },
      {
        heading: "⏰ THỜI GIAN & LỘ TRÌNH (5 tình huống)",
        content: "[8] 'Bé đang bận học thêm nhiều môn'\\n→ 'Dạ đây là điều nhiều phụ huynh lo ngại. Thực ra khi não bộ được tối ưu, bé học ít hơn nhưng tiếp thu tốt hơn. Nhiều bé sau chương trình GMA còn cắt giảm được 2-3 môn học thêm vì tự học hiệu quả hơn. Lịch của GMA cũng rất linh hoạt.'\\n\\n[9] 'Không có thời gian đưa bé đi học'\\n→ 'GMA có hình thức Online 96 buổi học tại nhà với Trainer online - bé học ngay tại nhà, ba/mẹ không cần đưa đón. Chỉ 48 buổi Offline cần đến TT, tức là khoảng 1 lần/tuần.'\\n\\n[10] 'Phải học bao lâu mới thấy kết quả'\\n→ '72% học sinh của GMA thấy cải thiện rõ rệt sau 4-6 tuần đầu (theo khảo sát nội bộ 2024). Phụ huynh thường nhận thấy con chú ý hơn trong 2-3 tuần đầu.'\\n\\n[11] 'Cuối năm bé đang bận thi cử'\\n→ 'Đây thực ra là thời điểm lý tưởng nhất ạ. Khi bé đang căng thẳng thi cử là lúc cần nhất sự hỗ trợ về não bộ. Nhiều phụ huynh bắt đầu đúng trước kỳ thi và thấy bé bình tĩnh, nhớ bài tốt hơn hẳn.'\\n\\n[12] 'Hè rồi để năm học mới bắt đầu'\\n→ 'Hè là thời điểm vàng ạ! Bé không áp lực học, có nhiều thời gian rèn não. Các bé bắt đầu hè thường vào năm học mới đã tự tin hẳn. Hiện tại GMA cũng có ưu đãi đặc biệt cho đăng ký hè.'"
      },
      {
        heading: "🎯 HIỆU QUẢ & KẾT QUẢ (6 tình huống)",
        content: "[13] 'Không chắc hiệu quả không'\\n→ 'GMA cam kết hoàn tiền 100% nếu sau 30 ngày không thấy cải thiện. Ngoài ra, mình có thể xem hơn 200 testimonial của phụ huynh trên Facebook page GMA. Anh/chị muốn em gửi một số case study tương tự bé nhà mình không ạ?'\\n\\n[14] 'Con tôi học ở đâu cũng không vào'\\n→ 'Dạ em nghe và rất thông cảm. Thực ra điều này thường là dấu hiệu não bộ chưa được kích hoạt đúng cách, không phải con không có khả năng. GMA chuyên xử lý những trường hợp này. Bé đã thử những phương pháp nào rồi ạ?'\\n\\n[15] 'Phương pháp này có được chứng nhận không'\\n→ 'Dạ có ạ. Chương trình GMA được xây dựng trên nền tảng Neuroscience với thiết bị Neuro Harmony M đã được FDA Hoa Kỳ chứng nhận và Viện nghiên cứu não bộ Hàn Quốc phát triển. GMA là đơn vị được chuyển giao độc quyền tại Việt Nam.'\\n\\n[16] 'Trẻ con học kiểu này có tốt không'\\n→ 'Hoàn toàn tốt và an toàn ạ. Phương pháp của GMA sử dụng âm thanh và bài tập não - không thuốc, không thiết bị xâm lấn. Đây là cách trẻ em ở Hàn Quốc, Nhật Bản đã áp dụng nhiều năm.'\\n\\n[17] 'Tôi xem trên mạng thấy có người phản ánh không hiệu quả'\\n→ 'Dạ thường kết quả phụ thuộc nhiều vào cam kết của gia đình - bé học đủ buổi, đúng lộ trình. GMA có mentor theo dõi chặt chẽ để đảm bảo kết quả. Em có thể liên hệ trực tiếp với vài phụ huynh đã thành công chia sẻ thêm không ạ?'\\n\\n[18] 'Bé khác thì được chứ con tôi đặc biệt hơn'\\n→ 'Mỗi bé là đặc biệt, và đó chính là lý do GMA cá nhân hóa lộ trình cho từng bé. Sau khi đo sóng não, GMA sẽ hiểu chính xác điểm mạnh/yếu của bé và thiết kế chương trình riêng.'"
      },
      {
        heading: "🏫 SO SÁNH & CẠNH TRANH (4 tình huống)",
        content: "[19] 'Tôi đang cân nhắc trung tâm khác'\\n→ 'Hoàn toàn hợp lý khi so sánh ạ. Anh/chị đang cân nhắc với trung tâm nào không ạ? Em muốn giúp mình có đủ thông tin để so sánh khách quan.'\\n\\n[20] 'Trung tâm kia rẻ hơn'\\n→ 'Sự khác biệt về giá phản ánh sự khác biệt về phương pháp. GMA đầu tư vào công nghệ đo não, đội ngũ Trainer được đào tạo chuyên sâu và tỷ lệ Trainer:trẻ thấp hơn (tối đa 1:3).'\\n\\n[21] 'Con tôi đang học ABA/OT/Speech rồi'\\n→ 'GMA hoạt động song song và bổ trợ rất tốt với ABA/OT/Speech. GMA tác động vào não bộ từ gốc, trong khi các liệu pháp kia tác động từ hành vi ra ngoài. Nhiều gia đình kết hợp và thấy tiến bộ nhanh hơn hẳn.'\\n\\n[22] 'Sao không xin học bổng của nhà nước'\\n→ 'Dạ học bổng nhà nước thường cho chương trình học văn hóa. GMA là chương trình phát triển não bộ chuyên biệt. Về chi phí, GMA có chính sách hỗ trợ đặc biệt cho các gia đình khó khăn.'"
      },
      {
        heading: "👨‍👩‍👧 GIA ĐÌNH & CÁ NHÂN (4 tình huống)",
        content: "[23] 'Vợ/chồng tôi không đồng ý'\\n→ 'Dạ đây là quyết định quan trọng của cả gia đình. Em có thể chuẩn bị bộ tài liệu chi tiết để anh/chị chia sẻ với gia đình không ạ? Hoặc mình có thể tổ chức một buổi tư vấn cho cả gia đình cùng tham gia.'\\n\\n[24] 'Bé không muốn học thêm'\\n→ 'GMA sử dụng phương pháp như chơi game não - bé thường rất thích và không cảm thấy như học. Nhiều phụ huynh phản ánh con thậm chí hỏi khi nào được học tiếp. GMA có buổi trải nghiệm miễn phí để bé cảm nhận trước.'\\n\\n[25] 'Bé đang nuôi nhỏ, không có thời gian'\\n→ 'GMA có hình thức Online hoàn toàn từ nhà qua điện thoại/máy tính bảng. Ba/mẹ không cần đưa đón, Trainer online hỗ trợ 100%.'\\n\\n[26] 'Ông bà không cho học'\\n→ 'Ông bà quan tâm đến cháu là điều đáng quý. Em có tài liệu đơn giản, dễ hiểu để anh/chị chia sẻ với ông bà. Hoặc ông bà có thể đến tham quan buổi học thử để yên tâm hơn.'"
      },
      {
        heading: "🔐 LO NGẠI & RỦI RO (6 tình huống)",
        content: "[27] 'Sợ mất tiền'\\n→ 'GMA có cam kết hoàn tiền 100% trong 30 ngày nếu không thấy cải thiện. Ngoài ra, hợp đồng rõ ràng, có đầy đủ điều khoản bảo vệ quyền lợi khách hàng.'\\n\\n[28] 'Trung tâm xa nhà quá'\\n→ 'GMA hiểu đây là thực tế của nhiều gia đình. Chính vì vậy 2/3 chương trình là học Online từ nhà (96/144 buổi). Chỉ 48 buổi cần đến TT - khoảng 1 lần/tuần.'\\n\\n[29] 'Tôi sợ bị bán hàng'\\n→ 'GMA hoạt động theo nguyên tắc: chỉ tư vấn khi phụ huynh cảm thấy phù hợp. Hôm nay anh/chị có thể đến trải nghiệm đo não miễn phí, hoàn toàn không cần cam kết gì.'\\n\\n[30] 'Không tin vào quảng cáo'\\n→ 'Hoàn toàn đúng đắn khi hoài nghi ạ. Em không muốn anh/chị tin vào quảng cáo - hãy tin vào bằng chứng. Em có thể kết nối anh/chị với 2-3 phụ huynh đã cho con học tại GMA để nghe trải nghiệm thực tế.'\\n\\n[31] 'Sợ con bị ảnh hưởng sức khỏe'\\n→ 'Phương pháp của GMA hoàn toàn không dùng thuốc, không thiết bị điện tử gắn vào người. Chỉ là âm thanh được thiết kế khoa học và bài tập vận động nhẹ nhàng - an toàn 100% cho trẻ em. FDA đã chứng nhận an toàn.'\\n\\n[32] 'Trung tâm mới mở, chưa có uy tín'\\n→ 'GMA Việt Nam là chi nhánh của hệ thống GMA đã hoạt động 8+ năm tại khu vực. Công nghệ đến từ Hàn Quốc với hàng nghìn case thành công. Tuy TT mới nhưng phương pháp đã được kiểm chứng.'"
      },
      {
        heading: "🧠 VỀ PHƯƠNG PHÁP & KHOA HỌC (4 tình huống)",
        content: "[33] 'Tôi không hiểu sóng não là gì'\\n→ 'Để em giải thích đơn giản ạ. Não hoạt động bằng điện, tạo ra các sóng khác nhau: Beta (tập trung), Alpha (thư giãn sáng tạo), Theta (học sâu), Delta (ngủ). Khi não mất cân bằng, bé khó tập trung, học chậm. GMA đo và điều chỉnh các sóng này về trạng thái lý tưởng.'\\n\\n[34] 'Nghe có vẻ khoa học viễn tưởng'\\n→ 'Neurofeedback - nền tảng của GMA - đã được sử dụng 50+ năm tại Mỹ và châu Âu để trị ADHD, lo âu. NASA cũng dùng cho phi hành gia. Ở Việt Nam còn mới nhưng thế giới đã chứng minh.'\\n\\n[35] 'Âm thanh có hại tai không'\\n→ 'Âm thanh trong chương trình GMA ở mức âm lượng bình thường, tương đương nghe nhạc nhẹ. Tần số được thiết kế để kích thích não tích cực, không phải siêu âm hay infrasound.'\\n\\n[36] 'Bé tôi bình thường, không cần thiết'\\n→ 'GMA không chỉ cho bé có vấn đề - đây là chương trình nâng cao hiệu suất não cho MỌI trẻ, giống như gym cho cơ thể. Các bé bình thường sau GMA thường vươn lên xuất sắc.'"
      },
      {
        heading: "🎁 ƯU ĐÃI & THƯƠNG LƯỢNG (4 tình huống)",
        content: "[37] 'Có giảm giá không'\\n→ 'GMA không thường xuyên giảm giá vì đảm bảo chất lượng dịch vụ ạ. Tuy nhiên hiện có một số ưu đãi: đăng ký sớm trong tháng này được tặng quà, hoặc giới thiệu bạn bè được % hoa hồng.'\\n\\n[38] 'Tôi biết người trong trung tâm, có giảm không'\\n→ 'Dạ chính sách của GMA là công bằng với mọi khách hàng ạ. Nhưng nếu anh/chị được giới thiệu bởi nhân viên/phụ huynh cũ, có chương trình ưu đãi referral mà em sẽ check cụ thể.'\\n\\n[39] 'Học thử trước được không'\\n→ 'Được ạ! GMA có buổi trải nghiệm miễn phí 90 phút bao gồm: đo sóng não, 1 bài tập memoEYE và tư vấn lộ trình cá nhân. Hoàn toàn không phí và không cam kết. Anh/chị muốn đặt lịch tuần này không ạ?'\\n\\n[40] 'Học 1 tháng thấy hiệu quả mới trả tiếp'\\n→ 'GMA có chính sách đặc biệt: thanh toán 3 tháng đầu, hết 3 tháng đánh giá cùng nhau, nếu không thấy cải thiện có thể dừng và hoàn phần còn lại.'"
      },
      {
        heading: "🌟 TỪ CHỐI ĐẶC BIỆT (17 tình huống)",
        content: "[41] 'Học online hiệu quả không bằng offline'\\n→ 'Trong chương trình GMA, Online thực ra không kém offline. Bé học trong môi trường quen thuộc, ít phân tâm hơn. Trainer có thể quan sát bé qua camera và điều chỉnh ngay lập tức.'\\n\\n[42] 'Không có máy tính/tablet'\\n→ 'Chương trình online của GMA có thể học trên điện thoại thông minh thông thường ạ. Chỉ cần màn hình tối thiểu 5 inch và kết nối internet ổn định.'\\n\\n[43] 'Bé không tập trung khi học online'\\n→ 'GMA Trainer được đào tạo kỹ năng quản lý sự chú ý của trẻ qua màn hình. Buổi học ngắn (30-45 phút), nhiều tương tác, game và thử thách.'\\n\\n[44] 'Học xong có duy trì được không'\\n→ 'GMA thiết kế để tạo thói quen não bền vững, không phải phụ thuộc vào TT ạ. Sau 12 tháng, bé có các công cụ tự rèn não suốt đời.'\\n\\n[45] 'Rồi lại phải đăng ký tiếp nhiều tiền'\\n→ 'GMA không có mô hình bán thêm ép buộc ạ. Sau khi hoàn thành chương trình, gia đình hoàn toàn tự do. Chương trình cơ bản 12 tháng đã hoàn chỉnh và đầy đủ.'\\n\\n[46] 'Tôi đã từng bị lừa bởi TT tương tự'\\n→ 'Em rất tiếc khi nghe điều này. GMA sẵn sàng cho anh/chị xem: hợp đồng đầy đủ trước khi ký, hóa đơn VAT chính thức, và liên hệ trực tiếp với 5-10 phụ huynh cũ để xác minh.'\\n\\n[47] 'Đây là MLM không'\\n→ 'Hoàn toàn không phải ạ. GMA là trung tâm giáo dục chính thức, có giấy phép kinh doanh, có địa chỉ văn phòng cố định. Doanh thu từ học phí 100%, không có hệ thống hoa hồng tầng.'\\n\\n[48] 'Tôi không có thời gian gặp'\\n→ 'GMA có thể tư vấn qua: Zalo/Call 15 phút buổi tối, Video call cuối tuần, hoặc gửi tài liệu để anh/chị đọc lúc rảnh. Hình thức nào tiện nhất cho anh/chị?'\\n\\n[49] 'Con tôi sắp vào lớp 10 rồi'\\n→ 'Đây là thời điểm cực kỳ quan trọng ạ! Lớp 10-12 là giai đoạn não phát triển mạnh nhất và cần được tối ưu nhất. Học sinh THPT của GMA thường cải thiện điểm số đáng kể trong 3-6 tháng.'\\n\\n[50] 'Bé đang học trường chuyên, không cần'\\n→ 'GMA sẽ giúp bé khai thác hết tiềm năng đó - từ xuất sắc thành vượt trội. Nhiều học sinh chuyên Toán, chuyên Anh học GMA để duy trì áp lực cao mà không burnout.'\\n\\n[51] 'Chờ con thi xong đã'\\n→ 'Sau kỳ thi thường là lúc não bé đang stress nhất và cần hồi phục. GMA làm việc rất tốt trong giai đoạn sau thi - giúp bé relax, reset và chuẩn bị cho giai đoạn tiếp theo.'\\n\\n[52] 'Con gái không cần học nhiều'\\n→ 'Phụ nữ thành công ngày nay cần não bộ khỏe mạnh, tư duy linh hoạt và khả năng học tập suốt đời. GMA đầu tư vào nền tảng đó cho bé gái - để bé có thể tự do lựa chọn tương lai của mình.'\\n\\n[53] 'Để sang năm đã'\\n→ 'Não bộ phát triển mạnh nhất từ 5-15 tuổi - đây là cửa sổ vàng không lấy lại được. Mỗi năm bỏ qua là mất đi cơ hội phát triển tối ưu. Bé hiện bao nhiêu tuổi ạ?'\\n\\n[54] 'Không cần đâu, con học giỏi rồi'\\n→ 'GMA không phải chỉ cho bé yếu - đây là training cho não giỏi hơn nữa. Như VĐV giỏi vẫn cần HLV và phòng tập chuyên nghiệp để đi xa hơn.'\\n\\n[55] 'Tôi sẽ tự dạy con ở nhà'\\n→ 'Tuyệt vời khi ba/mẹ đầu tư thời gian cho con ạ! Sau chương trình GMA, ba/mẹ cũng học được phương pháp và bài tập để tiếp tục dạy con tại nhà hiệu quả hơn.'\\n\\n[56] 'Con tôi chỉ mải chơi không chịu học'\\n→ 'Đây là tình trạng não chưa sẵn sàng cho việc học, không phải con lười biếng. GMA có chương trình đặc biệt kích hoạt chế độ học trong não - giúp bé cảm thấy thích và tò mò học hơn tự nhiên.'\\n\\n[57] 'Chương trình này phù hợp với con tôi không'\\n→ 'Câu hỏi này chỉ có thể trả lời chính xác sau khi đo sóng não của bé. Đây là lý do GMA cung cấp đo não miễn phí - để cùng nhau xem bé có phù hợp hay không trước khi ra bất kỳ quyết định nào. Anh/chị đặt lịch thử nhé?'"
      }
    ]
  },
  {
    id: 6,
    title: "Chính sách & Học phí",
    shortDesc: "Bảng giá, ưu đãi & điều khoản",
    icon: <CreditCard className="w-8 h-8" />,
    color: "bg-yellow-100 text-yellow-600",
    bannerImage: "/pricing_banner.png",
    details: [
      {
        heading: "Bảng học phí chính thức 2026",
        content: "🎯 MEMOHACK 12 THÁNG\\n- Học phí: 42.500.000 vnđ\\n- Lộ trình: 156 Buổi (96 Online + 48 Offline)\\n- Chi tiết: 4 lần đo sóng não, Coaching 1:1 không giới hạn\\n\\n🎯 MEMOHACK 9 THÁNG (Nâng cấp từ gói 3T)\\n- Học phí: 34.500.000 vnđ\\n- Lộ trình: 108 Buổi (72 Online + 36 Offline)\\n\\n🎯 MEMOHACK 3 THÁNG (36 Buổi)\\n- Học phí: 12.500.000 vnđ\\n- Lộ trình: 36 Buổi (24 Online + 12 Offline)\\n- Chi tiết: 2 lần đo sóng não, Coaching 1:1 (1 lần)\\n\\n🎯 MEMOHACK 3 THÁNG (24 Buổi) - Offline Ca Tối\\n- Học phí: 8.000.000 vnđ\\n- Lộ trình: 24 Buổi Offline\\n- Chi tiết: 2 lần đo sóng não, Coaching 1:1 (1 lần)\\n\\n🌟 HYPERHACK (Trẻ đặc biệt)\\n- Học phí: 13.000.000 vnđ / 60 ngày (120 buổi)\\n- Bao gồm: 100% Online với Trainer chuyên biệt\\n\\n🧠 ĐO SÓNG NÃO (Neuro Harmony M)\\n- Phí dịch vụ: Miễn phí lần đầu\\n\\n📦 GÓI GIA ĐÌNH & GIỚI THIỆU\\n- Đăng ký 2 bé trở lên: Giảm 15% bé thứ 2\\n- Giới thiệu phụ huynh mới: Tặng 5% học phí"
      },
      {
        heading: "Phương thức thanh toán",
        content: "- Thanh toán 1 lần: Giá gốc như trên\\n- Trả góp 3 tháng: Không lãi suất\\n- Trả góp 6 tháng: Không lãi suất (qua đối tác ngân hàng)\\n- Chuyển khoản ngân hàng / Tiền mặt / Thẻ tín dụng\\n\\n⚠️ Lưu ý: Học phí không bao gồm thiết bị phần cứng (nếu có)"
      },
      {
        heading: "Chính sách hoàn tiền & bảo hành",
        content: "✅ Cam kết hoàn tiền 100% trong 30 ngày nếu không thấy cải thiện\\n✅ Bảo lưu học phí tối đa 3 tháng khi có việc đột xuất\\n✅ Tạm dừng và tiếp tục chương trình linh hoạt\\n✅ Hợp đồng điện tử rõ ràng, có đầy đủ điều khoản\\n\\n❌ Không hoàn tiền sau 30 ngày khi đã học\\n❌ Không chuyển nhượng cho người khác"
      },
      {
        heading: "Ưu đãi đặc biệt hiện tại",
        content: "🔥 ƯU ĐÃI THÁNG NÀY:\\n- Đăng ký trước cuối tháng: Tặng khóa học Mindset cha mẹ (trị giá 5 triệu)\\n- Giới thiệu bạn thành công: Được hoàn 2 triệu vào học phí\\n- Combo gia đình (2 bé+): Giảm thêm 10%\\n\\n📋 Lưu ý: Các ưu đãi không cộng dồn. Áp dụng theo từng thời điểm."
      }
    ]
  },
  {
    id: 7,
    title: "Media & Case Study",
    shortDesc: "Video, ảnh & câu chuyện thành công",
    icon: <FolderOpen className="w-8 h-8" />,
    color: "bg-pink-100 text-pink-600",
    bannerImage: "/media_banner.png",
    details: [
      {
        heading: "🎬 Video Case Study nổi bật",
        content: "1. Bé Minh Khoa (8 tuổi, Hà Nội) - ADHD + chậm tập trung\\n   → Sau 3 tháng Memohack: Điểm Toán từ 5 lên 8, ngồi học được 45 phút liên tục\\n   📹 Xem video: https://youtu.be/case-minhkhoa\\n\\n2. Bé Bảo Ngọc (12 tuổi, HCM) - Mất tập trung, học chậm\\n   → Sau 6 tháng: Top 5 lớp, thi đỗ trường chuyên\\n   📹 Xem video: https://youtu.be/case-baongoc\\n\\n3. Bé Gia Hưng (7 tuổi, Đà Nẵng) - Tự kỷ nhẹ (Hyperhack)\\n   → Sau 60 ngày: Giao tiếp tốt hơn rõ rệt, bắt đầu chơi cùng bạn\\n   📹 Xem video: https://youtu.be/case-giahung"
      },
      {
        heading: "📊 Số liệu kết quả (Khảo sát 2024)",
        content: "- 89% phụ huynh thấy cải thiện rõ rệt sau 3 tháng\\n- 72% học sinh cải thiện điểm số trung bình\\n- 95% phụ huynh sẵn sàng giới thiệu cho người khác\\n- 200+ testimonial tích cực trên Facebook\\n- 500+ học viên đã hoàn thành chương trình (2023-2024)"
      },
      {
        heading: "🏆 Thành tích & Giải thưởng GMA",
        content: "- Top 10 Thương hiệu Giáo dục Uy tín 2024\\n- Đối tác chính thức của Viện Nghiên cứu Não bộ Hàn Quốc\\n- Chứng nhận FDA cho thiết bị Neuro Harmony M\\n- Đơn vị chuyển giao độc quyền công nghệ tại Việt Nam\\n- 8+ năm hoạt động, 5000+ học viên toàn hệ thống"
      },
      {
        heading: "📱 Kênh mạng xã hội GMA",
        content: "- Facebook Fanpage: facebook.com/gmavietnamsales\\n- YouTube Channel: youtube.com/@gmavietnamedu\\n- TikTok: tiktok.com/@gmavietnam\\n- Zalo OA: Tìm 'GMA Việt Nam' trên Zalo\\n\\n💡 Tip: Share video case study trong lúc tư vấn để tăng niềm tin."
      }
    ]
  },
  {
    id: 8,
    title: "Hỗ trợ & CSKH",
    shortDesc: "Hotline, chính sách & quy trình",
    icon: <Headset className="w-8 h-8" />,
    color: "bg-teal-100 text-teal-600",
    bannerImage: "/support_banner.png",
    details: [
      {
        heading: "Thông tin liên hệ",
        content: "📞 Hotline tư vấn: 1800-xxxx (Miễn phí, 8h-21h)\\n📱 Zalo CSKH: 09xx-xxx-xxx\\n📧 Email: cskh@gma.edu.vn\\n🏢 Địa chỉ: [Địa chỉ cụ thể]"
      },
      {
        heading: "Quy trình sau bán hàng",
        content: "Ngay sau chốt:\\n1. Gửi hợp đồng điện tử trong 2h\\n2. Kết nối KH vào group Zalo phụ huynh\\n3. Gửi lịch học tuần 1\\n4. Introduce với Trainer phụ trách\\n\\nTuần 1:\\n5. Check-in sau buổi học đầu tiên\\n6. Giải đáp thắc mắc ban đầu\\n\\nTháng 1:\\n7. Báo cáo tiến độ sau 1 tháng\\n8. Điều chỉnh lộ trình nếu cần"
      },
      {
        heading: "Xử lý khiếu nại",
        content: "Cấp 1 - Sale tự xử lý:\\n- Phàn nàn về lịch học, Trainer\\n- Yêu cầu thay đổi thời gian\\n- Câu hỏi về kỹ thuật nhẹ\\n\\nCấp 2 - Báo Trưởng nhóm:\\n- Khiếu nại về chất lượng dạy\\n- Yêu cầu hoàn tiền\\n\\nCấp 3 - Báo Quản lý:\\n- Tranh chấp hợp đồng\\n- Phản ánh lên mạng xã hội"
      }
    ]
  },
  {
    id: 9,
    title: "Kiến thức Chuyên môn",
    shortDesc: "Neuroscience & Phương pháp GMA",
    icon: <GraduationCap className="w-8 h-8" />,
    color: "bg-indigo-100 text-indigo-600",
    bannerImage: "/knowledge_banner.png",
    details: [
      {
        heading: "Khoa học não bộ cơ bản",
        content: "🧠 CÁC LOẠI SÓNG NÃO:\\n- Delta (0.5-4 Hz): Ngủ sâu, phục hồi\\n- Theta (4-8 Hz): Sáng tạo, học sâu, ký ức dài hạn\\n- Alpha (8-12 Hz): Thư giãn tỉnh táo, cửa sổ học tập\\n- Beta (12-30 Hz): Tập trung, tư duy logic\\n- Gamma (30+ Hz): Nhận thức cao cấp, học nhanh\\n- SMR (12-15 Hz): Tập trung yên tĩnh, điều phối vận động\\n\\n🔬 KHI NÃO MẤT CÂN BẰNG:\\n- Theta quá nhiều → Mơ màng, khó tập trung\\n- Beta quá nhiều → Căng thẳng, lo âu\\n- Alpha thiếu → Khó thư giãn và học sâu"
      },
      {
        heading: "Công nghệ Neuro Harmony M",
        content: "- Xuất xứ: Viện Nghiên cứu Não bộ Hàn Quốc (KBRI)\\n- Chứng nhận: FDA (Hoa Kỳ), CE (Châu Âu)\\n- Nguyên lý: Đo EEG (điện não đồ) không xâm lấn\\n- Phân tích: 19 điểm trên da đầu, 2 bán cầu não\\n- Kết quả: Báo cáo PDF chi tiết về 8 chỉ số não\\n- Thời gian đo: 20-30 phút\\n- An toàn: 100%, không đau, không bức xạ"
      },
      {
        heading: "3 Phương pháp lõi GMA",
        content: "1. memoKUNGFU: Bài tập vận động kết hợp nhận thức\\n   - Kích hoạt kết nối giữa tiểu não và vỏ não trước trán\\n   - Cải thiện tập trung và kiểm soát xung động\\n\\n2. memoEYE: Bài tập mắt và xử lý thị giác\\n   - Tăng cường xử lý thông tin thị giác\\n   - Cải thiện đọc hiểu và ghi nhớ hình ảnh\\n\\n3. memoSTATE: Điều hòa trạng thái cảm xúc và năng lượng\\n   - Âm thanh binaural beats được thiết kế khoa học\\n   - Đưa não về trạng thái lý tưởng để học"
      }
    ]
  },
  {
    id: 10,
    title: "Định hướng & Tầm nhìn",
    shortDesc: "Mission, Vision & Văn hóa GMA",
    icon: <Compass className="w-8 h-8" />,
    color: "bg-cyan-100 text-cyan-600",
    bannerImage: "/vision_banner.png",
    details: [
      {
        heading: "Mission & Vision",
        content: "🎯 MISSION:\\n'Khai mở tiềm năng não bộ của mỗi đứa trẻ, giúp các em học tốt hơn, sống tốt hơn và trở thành phiên bản tốt nhất của chính mình.'\\n\\n🔭 VISION:\\n'Trở thành đơn vị phát triển trí tuệ trẻ em hàng đầu Đông Nam Á vào năm 2030, giúp 1 triệu trẻ em được tiếp cận công nghệ não bộ tiên tiến.'\\n\\n💎 CORE VALUES:\\n- Scientific: Mọi quyết định dựa trên bằng chứng\\n- Compassionate: Yêu trẻ, thấu hiểu gia đình\\n- Impactful: Kết quả thực tế, đo lường được\\n- Innovative: Liên tục cập nhật công nghệ mới nhất"
      },
      {
        heading: "Câu chuyện thương hiệu GMA",
        content: "GMA (Genius Mind Academy) được thành lập bởi những chuyên gia giáo dục và khoa học não bộ với trăn trở: 'Tại sao có những trẻ rất thông minh nhưng lại không học được?'\\n\\nSau nhiều năm nghiên cứu và hợp tác với KBRI (Hàn Quốc), GMA phát triển phương pháp kết hợp độc đáo giữa công nghệ đo não và các bài tập phát triển nhận thức.\\n\\nĐến nay, GMA đã giúp 5000+ trẻ em và gia đình trên khắp Việt Nam tìm lại niềm vui học tập."
      },
      {
        heading: "Văn hóa đội ngũ Sale GMA",
        content: "🤝 Nguyên tắc làm việc:\\n1. Lắng nghe trước, nói sau\\n2. Hiểu vấn đề thật sự của gia đình\\n3. Chỉ giới thiệu chương trình phù hợp\\n4. Trung thực về kỳ vọng kết quả\\n5. Xây dựng mối quan hệ dài hạn\\n\\n🏆 Chỉ tiêu không phải là số hợp đồng - là số GIA ĐÌNH được giúp đỡ thật sự."
      }
    ]
  }
];
'''

output_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "src", "data", "knowledge.jsx")
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done! File written successfully.")
print(f"File size: {len(content)} chars")

# Verify
with open(output_path, 'r', encoding='utf-8') as f:
    verify = f.read(200)
print("First 200 chars:")
print(verify)
