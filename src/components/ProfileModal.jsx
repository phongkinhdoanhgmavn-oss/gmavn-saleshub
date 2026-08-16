import React, { useState } from 'react';
import { X, FileText, ExternalLink, ChevronDown, Award, Users, Brain, Star, CheckCircle2, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const profileData = {
  title: 'Hồ Sơ GMA Việt Nam',
  subtitle: 'Genius Mind Academy Vietnam — Cập nhật 2026',
  sections: [
    {
      id: 'intro',
      heading: '🧠 Giới thiệu GMA Việt Nam',
      image: '/gma_intro.png',
      content:
        'Genius Mind Academy Vietnam (GMA VN) là đối tác độc quyền của GMA HQ – trụ sở chính tại Malaysia. Thương hiệu quốc tế Genius Mind Academy đã có 20 năm hình thành và phát triển, hiện diện tại 16 quốc gia trên thế giới, giúp hơn 200.000 trẻ em phát triển trí não vượt trội.\n\nSứ mệnh: "Khai mở tiềm năng não bộ – Khóa học huấn luyện não bộ hàng đầu tại Việt Nam."',
      links: [
        { label: 'Website GMA Vietnam', url: 'https://gmavietnam.com/' },
        { label: 'Facebook Fanpage', url: 'https://www.facebook.com/profile.php?id=61571647816547' },
      ],
      highlights: [
        { text: "Video giới thiệu GMA VN: Khám phá hành trình 20 năm kiến tạo thế hệ thiên tài." }
      ]
    },
    {
      id: 'why',
      heading: '❓ Tại sao cần Huấn luyện Não bộ?',
      image: null,
      content:
        '❌ Sai lầm phổ biến của phụ huynh:\n• "Cứ lớn lên tự nhiên, não sẽ tự giỏi." → Não cần huấn luyện để "thức tỉnh" và hoạt động hiệu quả.\n• "Học thêm nhiều môn là đủ." → Nếu não chưa sẵn sàng, học thêm chỉ như đổ nước vào cốc thủng.\n• "Trí nhớ và sự tập trung là bẩm sinh." → Não có tính mềm dẻo (Neuroplasticity) → rèn luyện được.\n• "Chỉ trẻ đặc biệt mới cần huấn luyện não." → Trẻ bình thường cũng cần để học nhanh hơn, bớt quên, tự tin hơn.\n\n⭐ Giai đoạn vàng 5–15 tuổi là lúc não phát triển mạnh nhất, bỏ lỡ rất khó bù lại!',
      links: [],
    },
    {
      id: 'founder',
      heading: '🌟 Tiến Sĩ David Ting – Nhà sáng lập GMA',
      image: '/profile_images/page_06.png',
      content:
        'Tiến sĩ David Ting – Nhà sáng lập học viện GMA (Genius Mind Academy).\n\n• Hơn 40 năm kinh nghiệm trong ngành giáo dục.\n• Master Brain Trainer Quốc tế.\n• Được cấp chứng chỉ Huấn luyện viên não bộ từ Viện Khoa học Thần kinh Hàn Quốc.\n• Được chứng nhận là Nhà nghiên cứu não bộ bởi Bộ Y tế Malaysia.\n• Được vinh danh là một trong những Nhà giáo dục có ảnh hưởng tại Malaysia bởi NCAC.\n\n💬 "Trước khi chặt cây, bạn cần phải mài rìu. Tương tự như vậy, trước khi đi học, bạn nhất định phải rèn luyện não bộ."',
      links: [],
    },
    {
      id: 'expert-sarah',
      heading: '👩‍🏫 Cô Sarah Phương – Co-Founder & Brain Trainer',
      image: '/profile_images/page_10.png',
      content:
        'Cô Sarah Phương – Brain Trainer, Co-founder GMA Việt Nam.\n\n• Hơn 20 năm kinh nghiệm trong ngành giáo dục.\n• Được cấp bằng Brain Trainer – Thực hiện đo, phân tích sóng não & Đánh giá các chỉ số não bộ.\n• Founder Học viện Real Academy.\n• Nguyên Phó Tổng Giám đốc chuỗi Tiếng Anh AMES.\n• Trainer Chương trình Phát triển Tư duy của Mỹ (FasTracKids).\n• Nguyên Trưởng Bộ môn Tiếng Anh – Trường Đại học Quốc tế Bắc Hà.',
      links: [],
    },
    {
      id: 'expert-long',
      heading: '👨‍🏫 Thầy Nguyễn Hải Long – Co-Founder & Giám đốc Đào tạo',
      image: '/profile_images/page_11.png',
      content:
        'Thầy Nguyễn Hải Long – Brain Trainer, Co-founder GMA Việt Nam.\n\n• Hơn 20 năm kinh nghiệm trong ngành giáo dục.\n• Được cấp bằng Brain Trainer – Thực hiện đo, phân tích sóng não & Đánh giá các chỉ số não bộ.\n• Nguyên Giám đốc đào tạo Học viện Real Academy.\n• Nguyên Trainer tại FPT Software, FPT AFTECH, BSTA Việt Nam.',
      links: [],
    },
    {
      id: 'memohack',
      heading: '📚 Chương trình Memohack',
      image: null,
      content:
        'Đối tượng: Dành cho trẻ từ 5–15 tuổi.\n\nGiá trị mang lại:\n• Trí nhớ hình ảnh: Nhớ nhanh – nhớ lâu, học nhẹ nhàng thay vì học vẹt.\n• Não bộ linh hoạt: Chuyển đổi linh hoạt giữa tập trung – tưởng tượng – xử lý tình huống.\n• Nhân cách trưởng thành: Biết tự giác – kiên trì – tự tin – yêu thương.\n\nLộ trình: 48 buổi Offline + 96 buổi Online (12 tháng). Học phí: 42.500.000 VNĐ.',
      links: [
        { label: 'Landing Page Memohack', url: 'https://www.gmavietnam.vn/memohack' },
        { label: '▶ Video giới thiệu MemoSchool', url: 'https://youtu.be/btiGJB05LD4' },
        { label: '▶ Video khóa học Memohack', url: 'https://youtu.be/wYGS27COmM8' },
      ],
      highlights: [
        { text: "Bé Thủy An: Từ nhút nhát trở nên tự tin, tràn đầy năng lượng sau khóa học.", url: "https://www.facebook.com/reel/1153160240066289" },
        { text: "Kỷ lục: Học viên ghi nhớ 53/54 hình ảnh chỉ sau 4 buổi luyện tập đầu tiên.", url: "https://www.facebook.com/reel/1275692850184474" },
        { text: "Bé Trâm Anh: Ghi nhớ 40 hình siêu khó liên tiếp sau 6 tháng kiên trì.", url: "https://www.facebook.com/reel/1861334951109647" }
      ]
    },
    {
      id: 'memohack-method',
      heading: '🧪 Phương pháp Luyện Não bộ (Công thức 5-6-5)',
      image: null,
      content:
        '🔢 Công thức 5-6-5 của GMA:\n\n5️⃣ KÍCH HOẠT GIÁC QUAN\nThính giác • Xúc giác • Thị giác • Khứu giác • Vị giác\n\n6️⃣ CÂN BẰNG SÓNG NÃO\nTrí nhớ • Hiểu • Cảm xúc • Tiếp nhận • Tập trung • Tự tin\n\n5️⃣ VÙNG NĂNG LỰC ĐƯỢC NÂNG CAO\nNăng lượng não • Tốc độ não • Sức bền não • Kết nối não • Hình thành tế bào thần kinh\n\n📋 Nội dung trong lớp Memohack:\nNhảy → Trò chơi → Relax → MemoEye → Brainwave → MemoKungfu → MemoStand → MemoLight → Blindfold & Luyện tập thẻ',
      links: [],
      highlights: [
        { text: "Tại sao 1 năm? Thay đổi theo trình tự: Hóa học → Cấu trúc → Chức năng → Phong cách sống." },
        { text: "VAK: Học qua thính giác là bước 1 quan trọng nhất. Thị giác (V) → tiến tới cấp độ nâng cao." }
      ]
    },
    {
      id: 'results-students',
      heading: '🏆 Kết quả của Học viên',
      image: '/profile_images/page_28.png',
      content:
        '✅ Gia Thiện – Giải Quốc gia & Quốc tế.\n✅ Thủy An – Chuyển đổi 180 độ sự tự tin.\n✅ Bảo Ngọc – Cơn mưa điểm 10.\n✅ Bảo Phúc – Bứt phá kết quả sau 2 tháng.',
      highlights: [
        { text: "Bé Bảo Phúc: Cải thiện rõ rệt khả năng tập trung chỉ sau 2 tháng.", url: "https://www.facebook.com/reel/780098538020810" },
        { text: "Từ đội sổ lên xuất sắc: Hành trình bứt phá của học viên sau 3 tháng.", url: "https://www.facebook.com/reel/715701401425275" },
        { text: "Bé Trâm Anh nhớ 30 hình phức tạp sau 6 tháng huấn luyện.", url: "https://www.facebook.com/reel/772993085311603" }
      ]
    },
    {
      id: 'achievements',
      heading: '🏅 Thành tựu & Hoạt động',
      image: '/profile_images/page_07.png',
      content:
        '📊 Những kết quả tiêu biểu:\n• 100% học sinh có cải thiện rõ rệt.\n• Hơn 200 học sinh đăng ký học năm 2025.\n• Đối tác tin cậy của Hệ thống Tuệ Đức, B-Smart.',
      highlights: [
        { text: "GMA VN tại Tiểu Thần Toán 2025: Đồng hành cùng hơn 1.500 thí sinh.", url: "https://www.facebook.com/reel/772157301951651" },
        { text: "Review từ Chủ tịch Pathway Tuệ Đức: Khẳng định GMA là đơn vị tiên phong.", url: "https://www.facebook.com/share/v/16DoE7MRL3/" }
      ]
    },
    {
      id: 'feedback',
      heading: '💬 Phản hồi của Ba mẹ',
      image: null,
      content:
        'Ba mẹ học viên chia sẻ những thay đổi thực tế:\n• Con tự giác học bài không cần nhắc nhở.\n• Tập trung cao độ ngay cả trong môi trường ồn ào.\n• Bình tĩnh và biết điều tiết cảm xúc tốt hơn.',
      highlights: [
        { text: "Mẹ Nhật Linh: 'Bất ngờ vì con có thể nhớ lịch trình dày đặc mà không cần ghi chép'.", url: "https://www.facebook.com/reel/4203576859929452" },
        { text: "Ba mẹ hài lòng sau 6 tháng: Con tự giác, bình tĩnh và điểm số bứt phá.", url: "https://www.facebook.com/reel/621113974218050" }
      ]
    },
    {
      id: 'contact',
      heading: '📞 Liên hệ & Kênh truyền thông',
      image: null,
      content:
        'GMA Việt Nam – Học viện Trí tuệ Thiên tài\n📞 Hotline: 0981 586 907 (Mr. Tuấn)\n📍 CS1: La Khê, Hà Đông, Hà Nội\n📍 CS2: Trần Kim Xuyến, Cầu Giấy, Hà Nội',
      links: [
        { label: 'Website chính thức', url: 'https://gmavietnam.com/' },
        { label: 'TikTok @gma_vn', url: 'https://www.tiktok.com/@gma_vn' },
        { label: 'YouTube GMA Vietnam', url: 'https://www.youtube.com/@GMA_VietNam' },
      ],
    },
  ],
};

function Section({ section }) {
  const [open, setOpen] = useState(true);

  return (
    <motion.div 
      layout
      className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden mb-4"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 hover:bg-slate-50 transition-colors"
      >
        <span className="text-[16px] leading-tight flex items-center gap-2">
          {section.heading}
        </span>
        <div className={`p-1 rounded-full transition-transform duration-300 ${open ? 'rotate-180 bg-brand-orange/10 text-brand-orange' : 'bg-slate-100 text-slate-400'}`}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-5 pb-5 space-y-4 border-t border-slate-50 pt-2">
              {section.image && (
                <div className="relative group">
                  <img
                    src={section.image}
                    alt={section.heading}
                    className="w-full rounded-2xl object-cover mt-2 shadow-sm group-hover:shadow-md transition-shadow duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )}
              
              <p className="text-[14px] text-slate-600 leading-relaxed whitespace-pre-wrap">
                {section.content}
              </p>

              {section.highlights && section.highlights.length > 0 && (
                <div className="space-y-2 bg-brand-orange/5 p-4 rounded-2xl border border-brand-orange/10">
                  <h4 className="text-[12px] font-bold text-brand-orange uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Star className="w-3 h-3" /> Điểm chính
                  </h4>
                  {section.highlights.map((item, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex gap-2 items-start text-[13px] text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{item.text}</span>
                      </div>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-6 inline-flex items-center gap-1.5 text-[12px] font-bold text-brand-orange bg-white border border-brand-orange/20 px-3 py-1 rounded-full hover:bg-brand-orange hover:text-white transition-all"
                        >
                          <PlayCircle className="w-3.5 h-3.5" />
                          Xem video
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {section.links && section.links.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {section.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[13px] font-bold text-brand-blue bg-blue-50 hover:bg-brand-blue hover:text-white px-3 py-1.5 rounded-full transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ProfileModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-end sm:justify-center p-0 sm:p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        <motion.div
          initial={{ y: '100%', opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0.5 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-xl bg-slate-50 rounded-t-[2.5rem] sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[92vh]"
        >
          {/* Header */}
          <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-orange to-brand-accent rounded-2xl flex items-center justify-center shadow-premium">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-extrabold text-slate-900 text-xl leading-tight">{profileData.title}</h2>
                <p className="text-sm font-medium text-slate-500">{profileData.subtitle}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200 hover:text-slate-800 transition-all active:scale-90"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Stats Overlay Bar */}
          <div className="flex gap-4 px-6 py-4 bg-white/50 border-b border-slate-100 overflow-x-auto no-scrollbar">
            {[
              { icon: <Users className="w-4 h-4" />, label: '208+ Học viên', color: 'bg-orange-50 text-brand-orange' },
              { icon: <Brain className="w-4 h-4" />, label: '16 Quốc gia', color: 'bg-blue-50 text-brand-blue' },
              { icon: <Star className="w-4 h-4" />, label: '20 Năm KN', color: 'bg-purple-50 text-purple-600' },
              { icon: <Award className="w-4 h-4" />, label: 'ISO 9001', color: 'bg-green-50 text-green-600' },
            ].map((stat, i) => (
              <div key={i} className={`flex items-center gap-2 text-[12px] font-bold ${stat.color} px-4 py-2 rounded-2xl flex-shrink-0 shadow-sm whitespace-nowrap`}>
                {stat.icon}
                {stat.label}
              </div>
            ))}
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-5 custom-scrollbar bg-slate-50/50">
            <div className="space-y-1">
              {profileData.sections.map((section) => (
                <Section key={section.id} section={section} />
              ))}
            </div>
            
            {/* Footer space */}
            <div className="h-10" />
          </div>

          {/* Action Footer */}
          <div className="p-5 bg-white border-t border-slate-100 flex gap-3 shadow-top">
            <button 
              onClick={() => window.open('https://gmavietnam.com/', '_blank')}
              className="flex-1 bg-brand-blue text-white font-bold py-4 rounded-2xl shadow-premium hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-5 h-5" />
              Truy cập Website
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

