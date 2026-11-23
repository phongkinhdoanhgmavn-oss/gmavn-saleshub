// Câu hỏi và cách trả lời theo từng bước Sales Pipeline.
// who: 'ph' = Ba Mẹ hay hỏi Cô, 'cs' = Cô hỏi Ba Mẹ.
// say: lời Cô nói (copy được). Có thể là chuỗi hoặc { mmh12, mmh11, hyper } khi khác nhau theo khóa.
// points: ý chính để Sales nắm. avoid: điều tránh nói. next: câu hỏi tiếp theo để dẫn cuộc trò chuyện về phía trước.
// verify: chỗ dữ liệu chưa chắc, Sales hỏi lại trước khi dùng. {khóa} do app tự điền.
// Số tiền mỗi ngày, mỗi buổi tính từ giá niêm yết: Memohack 12 tháng 42.500.000đ, 1:1 12.500.000đ, Hyperhack 13.000.000đ.

export const PIPELINE_QA = {
  1: [
    {
      id: '1.q1', who: 'ph', q: 'GMA là gì? Bên mình dạy bé điều gì?',
      say: 'Dạ GMA Việt Nam là Học viện Trí tuệ Thiên tài, chuyên chương trình Memohack giúp bé rèn trí nhớ, sự tập trung và tự tin khi học. Bé học theo từng bước, có đo sóng não để biết nhịp của bé ở từng thời điểm. {xung} xin phép hỏi {goi} một chút về bé {be} để tư vấn đúng nhu cầu ạ.',
      points: ['Nói đúng 3 từ khóa: trí nhớ, tập trung, tự tin.', 'Đo sóng não là mốc để so với chính bé, không dùng để chẩn đoán.', 'Trả lời ngắn rồi hỏi lại ngay để chuyển sang khai thác nhu cầu.'],
      avoid: 'Không nói "học là giỏi", "tăng IQ", "chữa" bất cứ vấn đề gì của bé.',
      next: 'Bé nhà mình đang học lớp mấy và điều gì {goi} lo nhất ạ?',
    },
    {
      id: '1.q2', who: 'ph', q: 'Học phí bao nhiêu vậy?',
      say: 'Dạ GMA có 3 chương trình: Memohack 12 tháng 42,5 triệu, Memohack 1:1 trực tuyến 12,5 triệu và Hyperhack 13 triệu. Mỗi chương trình hợp với một nhu cầu khác nhau nên {xung} xin hỏi {goi} vài câu về bé {be} để chọn đúng, tránh {goi} tốn kém không cần thiết ạ.',
      points: ['Báo giá thật, không né, nhưng chưa đi sâu so sánh khi chưa biết nhu cầu.', 'Giá niêm yết, mọi giảm thêm phải báo Đại ca.', 'Báo giá chưa gồm 8% VAT. Chỉ nói khi khách hỏi hóa đơn.'],
      avoid: 'Không tự báo giảm giá hay "giá hôm nay".',
      next: 'Bé nhà mình đang học lớp mấy ạ? Ở nhà bé học thế nào?',
    },
    {
      id: '1.q3', who: 'ph', q: 'Con mấy tuổi thì học được?',
      say: 'Dạ chương trình phù hợp với bé từ 5 đến 15 tuổi ạ. {xung} xin hỏi bé {be} nhà mình đang bao nhiêu tuổi, học lớp mấy để {xung} gợi ý chương trình khớp nhất.',
      points: ['Hỏi tuổi và lớp để chọn khóa, không để khách tự loại mình.'],
      avoid: 'Không hứa kết quả theo độ tuổi.',
    },
    {
      id: '1.q4', who: 'ph', q: 'Học online hay offline?',
      say: {
        mmh12: 'Dạ Memohack 12 tháng gồm 96 buổi Online và 48 buổi Offline, tổng 144 buổi. Bé học online đều ở nhà, còn Offline thì {goi} đưa bé đến cơ sở Hà Đông hoặc Cầu Giấy ạ.',
        mmh11: 'Dạ Memohack 1:1 học 100% trực tuyến, bé học riêng với giáo viên 24 buổi, mỗi buổi 45 phút, lịch xếp theo gia đình mình ạ.',
        hyper: 'Dạ Hyperhack học 100% Online với Trainer chuyên biệt, 60 ngày, 120 buổi, bé học ngay tại nhà ạ.',
      },
      points: ['Phụ huynh Hà Nội muốn học trực tiếp: gợi Memohack 12 tháng (có Offline).', 'Phụ huynh bận hoặc ở xa: gợi 1:1 hoặc Hyperhack.'],
    },
    {
      id: '1.q5', who: 'ph', q: 'Bé nhà tôi hay mất tập trung, hay quên. Bên mình có giúp được không?',
      say: 'Dạ {xung} hiểu {goi} đang lo cho bé {be}. Nhiều Ba Mẹ cũng kể giống mình. Mỗi bé một nhịp riêng nên {xung} chưa dám nói trước điều gì. Cách tốt nhất là cho bé thử một buổi Trial có đo sóng não, {goi} nhìn tận mắt nhịp tập trung của bé rồi mình cùng quyết định ạ.',
      points: ['Đồng cảm trước, giải pháp sau.', 'Dùng Trial để "nhìn thấy" thay vì hứa.', 'Không dùng từ "tăng động", "rối loạn", "kém" cho bé.'],
      avoid: 'Không chẩn đoán, không gán nhãn, không hứa "sẽ hết".',
      next: 'Bé hay quên ở môn nào hoặc lúc nào nhất ạ?',
    },
    {
      id: '1.q6', who: 'ph', q: 'Có học thử không?',
      say: 'Dạ có ạ. GMA có buổi Trial kèm đo sóng não 90 phút, giá gốc 900.000đ nhưng {goi} đăng ký qua {xung} thì được miễn phí, hiện còn {suat} suất. {goi} cho {xung} xin ngày bé rảnh để {xung} giữ chỗ ạ.',
      points: ['Số suất đổi theo thời gian, nhập số đúng trong phần thông tin điền sẵn.', 'Chỉ nói "miễn phí" khi khách đăng ký qua Sales.'],
      next: 'Chủ nhật này hoặc [ngày khác] {goi} đưa bé đến được không ạ?',
    },
    {
      id: '1.q7', who: 'cs', q: 'Tin nhắn đầu tiên nên hỏi gì để khách trả lời?',
      say: 'Chào {goi}, {xung} là {tensales} bên GMA Việt Nam. {xung} thấy {goi} vừa quan tâm chương trình trí nhớ và tập trung cho bé. {goi} cho {xung} hỏi nhanh: bé {be} đang học lớp mấy, và điều {goi} đang lo nhất ở bé là gì ạ?',
      points: ['Chỉ 2 câu hỏi, dễ trả lời, không dài.', 'Gọi bằng tên, nhắc đúng điều khách đã quan tâm.', 'Gọi điện trong 10 phút nếu có số.'],
      avoid: 'Không gửi bảng giá hoặc video dài ở tin đầu.',
    },
    {
      id: '1.q8', who: 'ph', q: 'GMA khác gì trung tâm dạy thêm bình thường?',
      say: 'Dạ trung tâm dạy thêm thường tập trung phần "ngọn": thêm bài, thêm giờ, học thuộc, trong khi não bộ của bé chưa sẵn sàng nên dễ quá tải, bé mau quên và sợ học. GMA đi từ phần "gốc": huấn luyện và nâng cấp não bộ của bé trước, để trí nhớ, sự tập trung, cảm xúc ổn định thì việc học nhẹ nhàng và tự nhiên hơn. Bé học trong trạng thái vui vẻ, thư giãn, tích cực chứ không trong trạng thái đối phó. {xung} gửi {goi} bảng so sánh để {goi} dễ hình dung ạ.',
      points: ['Bảng so sánh đầy đủ nằm ở Kho > Phương pháp & điểm khác biệt, có nút Copy gửi Zalo.', 'Đối chiếu 4 ý: cách tiếp cận, vận hành não bộ, tâm lý của con, kết quả.', 'Nói về cách làm của GMA, không chê trung tâm hay trường khác.'],
      avoid: 'Không nói trường lớp hay giáo viên khác là sai. Không nhắc "100%" hay "nhanh gấp 3 lần" như lời hứa.',
      next: 'Ở nhà bé học xong có hay mệt, mau quên hoặc sợ học không ạ?',
    },
    {
      id: '1.q9', who: 'ph', q: 'Memohack là gì? "Học mà chơi" nghĩa là sao?',
      say: 'Dạ Memohack là phương pháp huấn luyện não bộ độc quyền của GMA cho bé từ 5 đến 15 tuổi. Bé học qua trải nghiệm "học mà chơi": bài Brain Gym vận động, game trí tuệ, kỹ thuật nhớ bằng hình ảnh (màn hình tâm trí) và nhạc sóng não để cân bằng hai bán cầu não. Mục tiêu là bé tiếp nhận thông tin bằng cả 6 giác quan tự nhiên nên việc học nhẹ nhàng và hứng thú hơn. Mỗi bé một nhịp riêng nên đây là mục tiêu luyện tập, không phải cam kết kết quả ạ.',
      points: ['3 nền tảng: đo sóng não Neuro Harmony M, nhạc sóng não độc quyền, Brain Gym và Bal-A-Vis-X.', '6 năng lực: ghi nhớ, tập trung, cảm xúc, khả năng hiểu, tiếp nhận thông tin, sự tự tin.', 'Các bài tập tên riêng: MemoDance, MemoEye, MemoStand, MemoKungfu, MemoState.', 'Hình 6 giác quan và công thức chuyển hóa có trong Kho > Phương pháp & điểm khác biệt.'],
      avoid: 'Không nói "chữa", không hứa kết quả theo thời gian.',
    },
    {
      id: '1.q10', who: 'ph', q: 'GMA là ai, có đáng tin không?',
      say: 'Dạ GMA là viết tắt của Genius Mind Academy, hình thành từ năm 2005 do nhóm nhà giáo dục của Tiến sĩ David Ting dẫn đầu tại Malaysia, với hơn 20 năm nghiên cứu về não bộ. GMA Việt Nam là đơn vị độc quyền triển khai chương trình tại Việt Nam, có 2 cơ sở ở Hà Đông và Cầu Giấy. {goi} cứ đến trực tiếp buổi Trial để xem thiết bị, lớp học và gặp chuyên gia ạ.',
      points: ['Thông tin lấy từ website GMA (trang Về chúng tôi).', 'Cơ sở 1: NO24 LK829 Khu đất dịch vụ Bờ Hội, La Khê, Hà Đông (đối diện số 10 Ngô Đình Mẫn). Cơ sở 2: Số 21 Trần Kim Xuyến, Yên Hòa, Cầu Giấy. Hotline 0981 586 907.', 'Cách tốt nhất tạo niềm tin: mời xem trực tiếp ở buổi Trial.'],
      avoid: 'Không nêu giải thưởng, chứng nhận hay con số chưa kiểm chứng.',
    },
  ],

  2: [
    {
      id: '2.q1', who: 'cs', q: 'Bé đang học lớp mấy, ở nhà bé học thế nào?',
      say: 'Dạ bé {be} đang học lớp mấy ạ? Ở nhà bé học bài thường mất bao lâu, và bé hay vướng ở đâu ạ?',
      points: ['Lắng nghe: bé ngồi học được bao lâu, có hay bị nhắc, môn nào khó.', 'Ghi lại đúng chữ của phụ huynh để dùng lại ở bước chốt.'],
      next: 'Điều gì làm {goi} lo nhất về việc học của bé ạ?',
    },
    {
      id: '2.q2', who: 'cs', q: 'Điều gì làm Ba Mẹ lo nhất?',
      say: 'Dạ điều {goi} lo nhất ở bé {be} hiện tại là gì ạ? Nếu chọn một điều {goi} muốn bé thay đổi trước thì là điều nào ạ?',
      points: ['Đây là câu quan trọng nhất cuộc gọi.', 'Nỗi lo hay gặp: hay quên, mất tập trung khi học, thiếu tự tin, học lâu mà không hiệu quả.', 'Nghe xong chọn 2 điểm của khóa khớp đúng nỗi lo đó.'],
      avoid: 'Không ngắt lời, không vội giới thiệu sản phẩm.',
      next: 'Gia đình mình đã thử cách nào cho bé chưa ạ?',
    },
    {
      id: '2.q3', who: 'cs', q: 'Gia đình đã thử cách nào cho bé chưa?',
      say: 'Dạ trước giờ gia đình mình đã thử cách nào cho bé {be} rồi ạ, và {goi} thấy cách đó như thế nào ạ?',
      points: ['Biết khách đã tốn gì để đừng đề xuất lặp lại.', 'Phụ huynh nào đã thử nhiều nơi: nhấn vào đo sóng não và mốc so với chính bé.'],
      next: 'Vậy mình thử một buổi Trial đo sóng não để nhìn nhịp thật của bé nhé ạ?',
    },
    {
      id: '2.q4', who: 'cs', q: 'Ai cùng quyết định cho bé đi học?',
      say: 'Dạ ngoài {goi}, gia đình mình còn ai cùng quyết định việc học của bé {be} không ạ? Nếu tiện, mình mời cả hai Ba Mẹ cùng đến Trial để cùng nghe kết quả ạ.',
      points: ['Hỏi sớm để người còn lại có mặt ở Trial, đỡ gặp "hỏi ý chồng/vợ" lúc chốt.', 'Ghi vào CRM tên người quyết định.'],
    },
    {
      id: '2.q5', who: 'ph', q: 'Sao có số điện thoại của tôi? Gọi có việc gì?',
      say: 'Dạ {xung} xin lỗi nếu làm phiền {goi}. {xung} gọi vì {goi} đã để lại thông tin quan tâm chương trình trí nhớ và tập trung cho bé {be}. {xung} chỉ xin 3 phút để hỏi nhu cầu, nếu chưa tiện {xung} xin hẹn giờ khác ạ.',
      points: ['Giữ giọng lịch sự, nêu đúng nguồn thông tin.', 'Phụ huynh đòi xóa số: xin lỗi và ghi nhận ngay, không thuyết phục thêm.'],
      avoid: 'Không nói mơ hồ về nguồn số điện thoại.',
    },
    {
      id: '2.q6', who: 'ph', q: 'Tôi đang bận, nói nhanh đi.',
      say: 'Dạ {xung} nói trong 30 giây ạ. GMA có chương trình giúp bé rèn trí nhớ và tập trung, và có buổi Trial đo sóng não 90 phút để {goi} nhìn nhịp thật của bé, {goi} đăng ký qua {xung} thì miễn phí. {goi} cho {xung} xin khung giờ {xung} gọi lại 3 phút để chọn lịch phù hợp ạ.',
      points: ['Tối đa 30 giây rồi xin lịch gọi lại.', 'Mục tiêu cuộc gọi bận chỉ là lấy giờ hẹn.'],
    },
    {
      id: '2.q7', who: 'ph', q: 'Gửi tài liệu qua Zalo cho tôi xem đi.',
      say: 'Dạ vâng ạ, {xung} gửi {goi} ngay. Để tài liệu đúng với bé {be}, {goi} cho {xung} hỏi nhanh bé đang học lớp mấy và điều {goi} lo nhất là gì để {xung} gửi phần phù hợp ạ. {xung} cũng giữ chỗ Trial miễn phí cho bé nếu {goi} tiện.',
      points: ['Đừng gửi tài liệu chung chung rồi im lặng.', 'Luôn kèm một câu hỏi và một bước tiếp theo.'],
    },
    {
      id: '2.q8', who: 'cs', q: 'Nên gợi ý khóa nào cho bé?',
      say: {
        mmh12: 'Từ những gì {goi} kể về bé {be}, {xung} thấy Memohack 12 tháng hợp vì bé được học bài bản, đo lại sóng não theo mốc và {goi} có lớp Parenting để cùng đồng hành. Mình cho bé thử Trial để xem nhịp của bé trước nhé ạ.',
        mmh11: 'Từ những gì {goi} kể về bé {be} và lịch của gia đình, {xung} thấy Memohack 1:1 trực tuyến hợp vì bé học riêng với giáo viên, lịch linh hoạt, 24 buổi trong khoảng 3 tháng. Mình cho bé thử Trial Online để xem nhé ạ.',
        hyper: 'Từ những gì {goi} kể về bé {be}, {xung} thấy Hyperhack hợp vì bé luyện đều mỗi ngày trong 60 ngày với Trainer chuyên biệt, học ngay tại nhà. Mình cho bé thử Trial để xem nhịp của bé trước nhé ạ.',
      },
      points: ['Bài bản, lâu dài, cả nhà cùng học: Memohack 12 tháng.', 'Cần người kèm riêng, lịch linh hoạt, muốn thử ngắn hạn: Memohack 1:1.', 'Muốn luyện dồn đều mỗi ngày, học tại nhà: Hyperhack.', 'Chưa chắc thì mời Trial rồi chốt khóa sau.'],
      avoid: 'Không gợi ý khóa đắt nhất khi nhu cầu chưa khớp.',
    },
    {
      id: '2.q9', who: 'cs', q: 'Ba Mẹ kể nỗi lo xong, chương trình đồng hành thế nào?',
      say: 'Dạ {xung} chia sẻ nhanh cách chương trình đồng hành với từng điều {goi} lo: bé học trước quên sau thì được luyện kỹ thuật nhớ bằng hình ảnh và "màn hình tâm trí"; bé mất tập trung thì có bài Brain Gym khởi động não trước khi học cùng nhạc sóng não; bé chán học thì bài tập thiết kế riêng, kết hợp vận động nên hứng thú hơn; bé mê điện thoại, game thì chương trình tạo những niềm vui học tập mới và {goi} có khóa ParentHack để đồng hành; bé cảm xúc thất thường thì có bài MemoState hít thở giúp bé bình tĩnh hơn; bé tiếp thu chậm thì được rèn cách tiếp nhận bằng đa giác quan. Điều nào {goi} thấy giống bé {be} nhất ạ?',
      points: ['Học trước quên sau: màn hình tâm trí, nhớ bằng hình ảnh.', 'Mất tập trung: Brain Gym, nhạc sóng não, sóng não BETA.', 'Chán học, sợ học: bài tập thiết kế riêng, học mà chơi.', 'Nghiện điện thoại, game: niềm vui học tập mới, khóa ParentHack cho Ba Mẹ.', 'Cảm xúc thất thường: MemoState thiền thở.', 'Tiếp thu chậm: kết hợp thị giác, thính giác, vận động (VAK).'],
      avoid: 'Không dùng từ "chữa", "khỏi". Nói là hỗ trợ và đồng hành.',
      next: 'Nếu chọn một điều muốn bé thay đổi trước, {goi} chọn điều nào ạ?',
    },
  ],

  3: [
    {
      id: '3.q1', who: 'ph', q: 'Trial có mất phí không?',
      say: 'Dạ buổi Trial kèm đo sóng não giá gốc là 900.000đ. {goi} đăng ký qua {xung} thì được miễn phí, hiện còn {suat} suất nên {xung} xin giữ chỗ cho bé {be} sớm ạ.',
      points: ['Đúng sự thật: 900.000đ, miễn phí khi đăng ký qua Sales, số suất có hạn.', 'Cập nhật số suất mỗi ngày trong phần thông tin điền sẵn.'],
      avoid: 'Không nói miễn phí khi khách tự đến không qua Sales.',
    },
    {
      id: '3.q2', who: 'ph', q: 'Trial diễn ra bao lâu, ở đâu, cần chuẩn bị gì?',
      say: {
        mmh12: 'Dạ buổi Trial kéo dài 90 phút vào Chủ nhật, tại cơ sở {coso} (Hà Đông hoặc Cầu Giấy). {goi} và bé có mặt sớm 10 phút, bé ăn nhẹ và ngủ đủ giấc để buổi đo thoải mái ạ.',
        mmh11: 'Dạ buổi Trial Online kéo dài 90 phút. {goi} cho bé ngồi nơi yên tĩnh, màn hình rõ, vào sớm 10 phút. Bé ăn nhẹ và ngủ đủ giấc để buổi đo thoải mái ạ.',
        hyper: 'Dạ buổi Trial kéo dài 90 phút vào Chủ nhật, tại cơ sở {coso} (Hà Đông hoặc Cầu Giấy). {goi} và bé có mặt sớm 10 phút, bé ăn nhẹ và ngủ đủ giấc để buổi đo thoải mái ạ.',
      },
      points: ['Địa chỉ và bản đồ có trong mẫu "Xác nhận Phụ huynh tới Trial Offline" ở Tin soạn sẵn.', 'Nhắc lịch hôm trước và sáng hôm đó.'],
    },
    {
      id: '3.q3', who: 'ph', q: 'Ba Mẹ có phải ngồi cùng bé không?',
      say: 'Dạ buổi Trial có phần bé trải nghiệm và phần {goi} tham gia chia sẻ về cách giúp con phát triển tư duy. {goi} đi cùng bé là tốt nhất ạ. Nếu bé lạ chỗ, {goi} cứ ngồi gần bé, các cô sẽ làm quen với bé từ từ ạ.',
      points: ['Phụ huynh đi cùng giúp bé yên tâm và tự nghe kết quả đo.', 'Hai Ba Mẹ cùng đến thì lúc quyết định đỡ vướng.'],
    },
    {
      id: '3.q4', who: 'ph', q: 'Đo sóng não là gì? Bé có đau hay có sao không?',
      say: 'Dạ bé chỉ đeo một thiết bị cảm biến nhẹ như băng đô, hoàn toàn không đau. Thiết bị Neuro Harmony M của Viện nghiên cứu não bộ Hàn Quốc chỉ thu nhận tín hiệu điện não tự nhiên của bé, không phát ra tia phóng xạ hay dòng điện kích thích. Thiết bị đã được chứng nhận an toàn 100%. Kết quả cho thấy nhịp tập trung và mức căng thẳng của bé ở thời điểm đó để làm mốc luyện tập, không phải chẩn đoán y khoa ạ.',
      points: ['Thông tin từ trang FAQ của GMA: không đau, không phát tia phóng xạ, không dòng điện kích thích.', 'Thiết bị phân tích hai bán cầu não, mức căng thẳng, tập trung, cân bằng năng lượng não, nhịp Gamma, Beta, SMR, Alpha, Theta, Delta.', 'Nhấn: làm mốc để so với chính bé, không phải chẩn đoán.'],
      avoid: 'Chỉ nói thiết bị "đã được chứng nhận an toàn 100%", không nêu tên chứng nhận cụ thể (FDA, CE). Không nói kết quả đo là chẩn đoán.',
    },
    {
      id: '3.q5', who: 'ph', q: 'Kết quả đo có nói bé bị bệnh hay tăng động không?',
      say: 'Dạ không ạ. Kết quả đo chỉ cho thấy nhịp tập trung và thư giãn của bé ở thời điểm đó, giống một mốc ban đầu để sau này so với chính bé. GMA không chẩn đoán bệnh, nếu {goi} lo về sức khỏe của bé thì mình nên trao đổi với bác sĩ ạ.',
      points: ['Đây là lằn ranh đỏ: không chẩn đoán, không gán nhãn.', 'Nói kết quả theo hướng "nhịp của bé", không dùng "tốt, xấu, bất thường".'],
      avoid: 'Tuyệt đối không dùng từ chẩn đoán hay nhãn bệnh.',
    },
    {
      id: '3.q6', who: 'ph', q: 'Bé nhà tôi nhút nhát, sợ lạ thì sao?',
      say: 'Dạ không sao ạ. Nhiều bé lần đầu cũng như vậy. Các cô sẽ cho bé làm quen từ từ, {goi} cứ ngồi gần bé, không ép bé làm gì cả. Bé thoải mái thì buổi đo sẽ đúng nhịp của bé hơn ạ.',
      points: ['Trấn an và nhấn vào việc không ép bé.', 'Báo trước cho Trainer đặc điểm của bé nếu phụ huynh đã chia sẻ.'],
    },
    {
      id: '3.q7', who: 'ph', q: 'Học thử xong tôi có phải đăng ký luôn không?',
      say: 'Dạ không ạ. Sau Trial {xung} sẽ gửi {goi} kết quả đo và đề xuất chương trình phù hợp với bé {be}. {goi} xem kỹ rồi cân nhắc, không có áp lực phải quyết định ngay ạ.',
      points: ['Không ép chốt tại chỗ. Gửi đề xuất trong ngày và hẹn lịch hỏi quyết định.'],
      next: 'Hôm nay {goi} thấy bé thế nào, điều gì {goi} ấn tượng nhất ạ?',
    },
    {
      id: '3.q8', who: 'cs', q: 'Sau buổi Trial hỏi Ba Mẹ điều gì?',
      say: 'Dạ hôm nay {goi} thấy bé {be} thế nào ạ? Điều gì {goi} ấn tượng nhất? Và sau 3 tháng {goi} mong bé thay đổi điều gì nhất ạ?',
      points: ['3 câu: cảm nhận, ấn tượng, mong muốn sau 3 tháng.', 'Ghi lại đúng từ của phụ huynh để dùng ở tin đề xuất và bước chốt.', 'Mốc 3 tháng khớp với lần đo lại sau 3 tháng.'],
      next: 'Với mong muốn đó, {xung} xin đề xuất chương trình [tên khóa], {xung} gửi chi tiết trong tin dưới nhé ạ.',
    },
    {
      id: '3.q9', who: 'ph', q: 'Bé không đến được hoặc muốn đổi lịch Trial thì sao?',
      say: 'Dạ không sao ạ. {goi} cho {xung} biết ngày khác bé rảnh, {xung} giữ lịch giúp. Nếu {goi} bận đi lại, bé có thể thử Trial Online cho tiện ạ.',
      points: ['Giữ chỗ cho khách trong lúc đổi lịch.', 'Gọi nhắc trước ngày mới.'],
    },
    {
      id: '3.q10', who: 'ph', q: 'Buổi Trial 90 phút gồm những gì? Ba Mẹ nhận được gì?',
      say: 'Dạ buổi 90 phút gồm 2 phần. 45 phút đầu bé đo sóng não EEG 3D tại phòng Lab bằng thiết bị cảm biến nhẹ như băng đô. 45 phút sau bé tham gia lớp trải nghiệm MemoSchool, {goi} ngồi cạnh quan sát phản xạ và sự hào hứng của bé. Cuối buổi chuyên gia đọc kết quả 1-1 cho {goi}, và {goi} nhận báo cáo sóng não cá nhân hóa kèm bảng phân tích định hướng giáo dục tại nhà dành riêng cho bé {be} ạ.',
      points: ['Chặng 1 (45 phút): đo sóng não EEG 3D.', 'Chặng 2 (45 phút): trải nghiệm lớp MemoSchool.', 'Quà kèm: báo cáo sóng não cá nhân hóa và bảng phân tích định hướng giáo dục tại nhà.', 'Sau buổi đo, chuyên gia tư vấn lộ trình phù hợp, Ba Mẹ cân nhắc rồi quyết định.', 'Hơn 700 phụ huynh đã đo sóng não và được tư vấn cá nhân hóa tại GMA VN (theo website).'],
      verify: 'Mô tả này theo buổi Trial Offline tại trung tâm. Với gói 1:1 Trial Online, Sales hỏi lại Trainer về cách đo và nội dung trước khi nói.',
    },
  ],

  4: [
    {
      id: '4.q1', who: 'ph', q: 'Các khóa khác nhau thế nào, bé tôi hợp khóa nào?',
      say: {
        mmh12: 'Dạ khóa 12 tháng là lộ trình bài bản: 144 buổi, đo sóng não 4 lần, coaching 1:1 và lớp Parenting để {goi} cùng đồng hành. So với 1:1 hay Hyperhack thì khóa này dài và đầy đủ nhất, có cả Offline ạ.',
        mmh11: 'Dạ gói 1:1 là bé học riêng với giáo viên, 24 buổi 45 phút, 100% online nên lịch rất linh hoạt. So với khóa 12 tháng thì ngắn hơn, tập trung kèm riêng, phù hợp khi gia đình cần lịch linh hoạt ạ.',
        hyper: 'Dạ Hyperhack là 60 ngày, 120 buổi online, bé luyện đều mỗi ngày với Trainer chuyên biệt. So với khóa 12 tháng thì ngắn ngày và tập trung hơn, so với 1:1 thì là chương trình luyện dày trong thời gian ngắn ạ.',
      },
      points: ['So sánh theo nhu cầu của bé, không so theo giá.', 'Bảng nhanh: Toàn diện dài hạn + Parenting; 1:1 kèm riêng linh hoạt; Hyperhack luyện dày 60 ngày.'],
    },
    {
      id: '4.q2', who: 'ph', q: 'Làm sao biết con có tiến bộ?',
      say: 'Dạ GMA đo sóng não theo mốc để so với chính bé chứ không so với bạn khác. Bé được đo ban đầu ở buổi Trial và đo lại sau 3 tháng, {goi} nhìn lại nhịp của bé qua số liệu và qua việc học hằng ngày ạ. Đây là mục tiêu luyện tập, mỗi bé một nhịp riêng nên {xung} không cam kết kết quả cụ thể ạ.',
      points: ['Mốc: đo ban đầu và đo lại sau 3 tháng. Memohack 12 tháng đo sóng não 4 lần trong năm.', 'So với chính bé, không so với bé khác.'],
      avoid: 'Không hứa điểm số, không hứa "chắc chắn tiến bộ".',
    },
    {
      id: '4.q3', who: 'ph', q: 'Học bao lâu thì thấy hiệu quả?',
      say: 'Dạ mỗi bé một nhịp nên {xung} không dám hứa một mốc cố định ạ. Với GMA, mốc đầu tiên để nhìn lại là sau 3 tháng luyện đều, lúc đó mình đo lại và so với lần đo ban đầu của bé {be}. Quan trọng là bé luyện đều và {goi} đồng hành cùng bé ạ.',
      points: ['Tránh con số thời gian chắc chắn.', 'Nhắc lại vai trò của sự đều đặn và sự đồng hành của Ba Mẹ.'],
      avoid: 'Không nói "sau 1 tháng là thấy" hay "cam kết".',
    },
    {
      id: '4.q4', who: 'ph', q: 'Con tôi đang học thêm nhiều, có đủ thời gian không?',
      say: {
        mmh12: 'Dạ khóa 12 tháng mỗi tuần bé học 2 buổi online trên website và 1 buổi offline tại Học viện, không quá nặng. {xung} sẽ xếp lịch theo lịch học thêm của bé {be} để bé không bị quá tải ạ.',
        mmh11: 'Dạ gói 1:1 mỗi buổi 45 phút và lịch xếp theo gia đình, mình chọn khung giờ bé rảnh nhất. {xung} sẽ xếp lịch với giáo viên để không đụng giờ học thêm của bé ạ.',
        hyper: 'Dạ Hyperhack mỗi ngày bé học 2 lần online, sáng và tối, mỗi lần khoảng 30 phút, học ngay tại nhà nên không mất thời gian đi lại. {goi} đồng hành cùng bé và gửi video luyện tập để giáo viên theo dõi ạ.',
      },
      points: ['Hỏi lịch cụ thể: ngày nào bé rảnh, giờ nào.', 'Memohack 12 tháng: 2 buổi online mỗi tuần (tổng 96 buổi) và 1 buổi offline mỗi tuần (tổng 48 buổi).', 'Hyperhack: 2 lần mỗi ngày, sáng và tối, khoảng 30 phút mỗi lần.'],
    },
    {
      id: '4.q5', who: 'ph', q: 'Mua cho 2 bé hoặc rủ bạn đăng ký chung có giảm không?',
      say: 'Dạ khóa Memohack 12 tháng có ưu đãi mua chung: 2 tài khoản giảm 5% trên tổng tiền, 3 tài khoản giảm 10% trên tổng tiền, nếu các tài khoản cùng thanh toán. {xung} xin tính cụ thể cho {goi} ở bảng giá ạ.',
      points: ['Chỉ áp dụng cho Memohack 12 tháng. Gói 1:1 và Hyperhack không áp dụng.', 'Tài khoản đã thanh toán trước không được tính lũy kế cho tài khoản mua sau.', 'Ví dụ: 2 tài khoản 85 triệu, giảm 5% là 4,25 triệu.'],
      avoid: 'Không hứa mua chung với người chưa chắc thanh toán cùng lúc.',
    },
    {
      id: '4.q6', who: 'ph', q: 'Có trả góp được không?',
      say: 'Dạ có ạ, {goi} có thể trả góp qua thẻ tín dụng, chia theo kỳ hạn 3, 6, 9, 12, 18 hoặc 24 tháng. Phí chuyển đổi tùy ngân hàng và kỳ hạn, {xung} tính cụ thể cho {goi} ở trang Báo giá để {goi} thấy số tiền mỗi tháng ạ.',
      points: ['Ví dụ phí: kỳ hạn 6 tháng thường 4,5%, 12 tháng 7%. Riêng MSB và MCredit có bảng phí khác.', 'Vào trang Báo giá, bật "Trả góp thẻ tín dụng", chọn kỳ hạn và ngân hàng để ra số tiền mỗi tháng.'],
    },
    {
      id: '4.q7', who: 'ph', q: 'Bên khác rẻ hơn, hoặc nơi khác cũng dạy trí nhớ thì sao?',
      say: 'Dạ {xung} hiểu {goi} muốn so sánh để chọn nơi tốt nhất cho bé {be}. {xung} không so với nơi khác, chỉ xin nói điều GMA làm: có đo sóng não theo mốc để so với chính bé, có giáo viên và Trainer theo bé, và {goi} được đồng hành qua lớp Parenting (với khóa 12 tháng). {goi} muốn so sánh, {xung} gợi ý {goi} hỏi nơi kia 3 điều: ai dạy bé, đo thế nào để biết bé tiến bộ, và nếu bé không hợp thì hỗ trợ ra sao ạ.',
      points: ['Không nói xấu đối thủ, đây là lằn ranh đỏ.', 'Đưa cho phụ huynh bộ 3 câu hỏi để họ tự so sánh khách quan.'],
      avoid: 'Không chê nơi khác, không so sánh giá bằng cách hạ GMA.',
    },
    {
      id: '4.q8', who: 'cs', q: 'Khi nào dừng nhắn nếu Ba Mẹ im lặng?',
      say: 'Dạ sau 3 tuần chăm sóc theo nhịp 3-1-3 mà {goi} chưa phản hồi, {xung} xin tạm dừng nhắn để không làm phiền. Khi nào bé {be} cần hỗ trợ về trí nhớ và tập trung, {goi} cứ nhắn {xung} nhé ạ.',
      points: ['Mỗi tuần 3 lần chạm, mỗi lần một giá trị khác nhau, trong 3 tuần.', 'Sau 3 tuần: khách phản hồi thì giữ hoặc lên nhóm G, im lặng thì hạ nhóm G.', 'Ghi CRM sau mỗi lần chạm.'],
      avoid: 'Không nhắn dồn dập, không nhắn cùng nội dung nhiều lần.',
    },
    {
      id: '4.q9', who: 'ph', q: 'Chương trình thay đổi bé theo những giai đoạn nào?',
      say: 'Dạ não bộ của bé được đồng hành thay đổi qua 4 tầng: đầu tiên là thay đổi hóa học (bé vui vẻ, thư giãn hơn khi học), rồi thay đổi cấu trúc (não bộ linh hoạt, giàu ý tưởng), thay đổi chức năng (chú ý, trí nhớ, tập trung) và cuối cùng là thay đổi phong cách sống (tính cách trưởng thành, tự giác học tập). Kết quả trước và sau được đánh giá bằng máy Brain Test và đo sóng não. Đây là mục tiêu luyện tập, mỗi bé một nhịp riêng ạ.',
      points: ['Công thức: năng lượng tích cực + não bộ linh hoạt + trí nhớ tập trung = học sinh tự chủ.', 'Hình công thức và 4 giai đoạn có trong Kho > Phương pháp & điểm khác biệt, có nút Copy.', 'Chuyên gia đo lại để so với chính bé, không so với bạn.'],
      avoid: 'Không hứa mốc thời gian cho từng giai đoạn.',
      verify: 'Tài liệu đào tạo gắn 4 giai đoạn với các mốc đo tháng 3, 6, 9, 12, còn website ghi bé được đo sau tháng 1, 3, 6 và 12. Anh chốt mốc để Sales nói đúng.',
    },
    {
      id: '4.q10', who: 'ph', q: 'Mỗi tuần bé học thế nào, ba mẹ cần dành bao nhiêu thời gian?',
      say: {
        mmh12: 'Dạ mỗi tháng bé học khoảng 4 buổi Offline tại trung tâm, mỗi buổi 90 phút, ca sáng hoặc chiều {goi} tự chọn. Online có 8 bài mỗi tháng, mỗi tuần mở 2 bài mới, mỗi bài 30 đến 40 phút. Ngoài ra có Zoom luyện tập 15 phút từ thứ 2 đến thứ 7 lúc 21h00, {goi} có buổi Parenting thứ 6 hằng tuần 21h15 đến 22h15, và buổi coaching 1:1 với chuyên gia {goi} đặt lịch trong tuần. Bài tập tại nhà chỉ khoảng 15 đến 20 phút mỗi ngày ạ.',
        mmh11: 'Dạ gói 1:1 khoảng 2 buổi mỗi tuần qua Zoom, mỗi buổi 45 phút, trọn khóa khoảng 3 tháng. Mỗi buổi gồm 10 phút học nhân cách, 10 phút game trí tuệ và kỹ thuật Memo, 20 phút Brainwave luyện sóng não và 5 phút luyện skill. Giữa các buổi bé có bài tập quay video gửi Trainer. Bộ học liệu (túi xách, sách hướng dẫn, bộ thẻ test, kính che mắt, đồng hồ bấm giờ) được gửi tận nhà ạ.',
        hyper: 'Dạ mỗi ngày bé học 2 buổi online tại nhà, mỗi buổi khoảng 30 phút: buổi sáng giúp bé tỉnh táo và tập trung, buổi tối giúp bé thư giãn và ngủ ngon hơn. {goi} đồng hành cùng bé, chuẩn bị tai nghe hoặc loa tốt và kính che mắt nếu cần ạ.',
      },
      points: ['Memohack 12 tháng: Offline 4 buổi/tháng, Online 8 bài/tháng, Zoom 15 phút thứ 2 đến thứ 7, Parenting thứ 6, coaching 1:1 (trừ thứ 6 và Chủ nhật).', 'Quy định học (kèm Quy định & Cam kết): Memohack 2 buổi online mỗi tuần và 1 buổi offline mỗi tuần. Hyperhack 2 lần mỗi ngày.', 'Hỏi lịch cụ thể của bé rồi mới nói con số.'],
    },
    {
      id: '4.q11', who: 'ph', q: 'Ai trực tiếp dạy bé? Trainer có chuyên môn không?',
      say: 'Dạ toàn bộ chuyên gia và Trainer của GMA VN đều có bằng Brain Trainer. Ví dụ Thầy Nguyễn Hải Long là Master Brain Trainer với hơn 20 năm kinh nghiệm đào tạo, cô Sarah Phương là chuyên gia huấn luyện não bộ quốc tế và đồng sáng lập GMA VN, cô Nguyễn Thị Ngọc là Leader Trainer với 20 năm trong ngành giáo dục. Sau khi đăng ký, Phòng Đào tạo phân công cô phụ trách riêng cho bé {be}, và {goi} được kết nối vào nhóm để trao đổi trực tiếp ạ.',
      points: ['Thông tin từ trang Đội ngũ chuyên gia trên website GMA.', 'Gói 1:1: Trainer riêng dành 100% sự chú ý cho một mình bé.'],
      avoid: 'Không hứa trước giáo viên cụ thể khi chưa được Phòng Đào tạo phân công.',
    },
    {
      id: '4.q12', who: 'ph', q: 'Hyperhack hỗ trợ bé như thế nào? Có thay thế can thiệp không?',
      say: 'Dạ Hyperhack là chương trình hỗ trợ phát triển não bộ, hỗ trợ bé tập trung, điều hòa cảm xúc và hành vi, học online tại nhà 60 ngày với chuyên gia và Trainer đồng hành. Chương trình không thay thế chẩn đoán, điều trị y tế hay can thiệp chuyên môn, và có thể đồng hành cùng trường hoặc trung tâm mà bé đang học. Lộ trình có 4 chặng: ngày 1 đến 15 làm quen và mở lòng, ngày 16 đến 30 kích hoạt song não, ngày 31 đến 45 điều hòa hành vi, ngày 46 đến 60 hòa nhập, sẵn sàng nền tảng chuyển tiếp sang Memohack ạ.',
      points: ['Mỗi buổi gồm 4 phần: công nghệ nghe kích hoạt và cân bằng não bộ, memoKUNGFU, memoEYE, memoSTATE.', 'GMA Global triển khai Hyperhack cho hơn 10.000 trẻ tại Châu Á trong hơn 20 năm (theo website).', 'Ba Mẹ đồng hành và học khóa ParentHack để hiểu tâm lý con.', 'Nếu Ba Mẹ tự nói về tình trạng của bé thì lắng nghe, nói chương trình hỗ trợ và có chuyên gia đồng hành. Cô không đặt tên hay gán nhãn cho bé.'],
      avoid: 'Không chẩn đoán, không gán nhãn, không hứa "cải thiện sau 2 đến 4 tuần". Website ghi đó là mục tiêu luyện tập, không phải cam kết.',
    },
  ],

  5: [
    {
      id: '5.q1', who: 'cs', q: 'Ba Mẹ muốn bắt đầu từ ngày nào?',
      say: 'Dạ {goi} chọn bắt đầu cho bé {be} từ [ngày A] hay [ngày B] để {xung} giữ chỗ ạ? {xung} gửi {goi} báo giá và mã QR để mình hoàn tất luôn nhé.',
      points: ['Hỏi lựa chọn A hoặc B thay vì hỏi "có đăng ký không".', 'Gửi báo giá bằng trang Báo giá, kèm QR.'],
    },
    {
      id: '5.q2', who: 'ph', q: 'Đắt quá!',
      say: {
        mmh12: 'Dạ {xung} hiểu {goi} cân nhắc, đây là khoản đầu tư lớn ạ. {xung} tính giúp {goi}: Memohack 12 tháng 42,5 triệu cho 144 buổi, tương đương khoảng 116.000đ mỗi ngày trong cả năm, chưa kể bé có 4 lần đo sóng não, coaching 1:1 và {goi} có lớp Parenting, kèm quà tặng trị giá 12 triệu. Nếu {goi} muốn chia nhỏ, {xung} hỗ trợ trả góp qua thẻ ạ.',
        mmh11: 'Dạ {xung} hiểu {goi} cân nhắc. {xung} tính giúp {goi}: gói 1:1 12,5 triệu cho 24 buổi, tương đương khoảng 520.000đ mỗi buổi 45 phút học riêng với giáo viên, kèm 12 buổi Offline tặng và Bộ học liệu Memohack Kits. Nếu {goi} muốn chia nhỏ, {xung} hỗ trợ trả góp qua thẻ ạ.',
        hyper: 'Dạ {xung} hiểu {goi} cân nhắc. {xung} tính giúp {goi}: Hyperhack 13 triệu cho 120 buổi trong 60 ngày, tương đương khoảng 108.000đ mỗi buổi, bé luyện đều với Trainer chuyên biệt tại nhà. Nếu {goi} muốn chia nhỏ, {xung} hỗ trợ trả góp qua thẻ ạ.',
      },
      points: ['Đồng cảm, rồi chia nhỏ giá trị thành đơn vị mỗi ngày hoặc mỗi buổi.', 'Nhắc lại điều phụ huynh lo ở bước 2 và gắn vào giá trị.', 'Có trả góp thẻ làm phương án chia nhỏ.'],
      avoid: 'Không tự giảm giá. Không so sánh "đắt hơn học thêm bình thường".',
      next: 'Điều {goi} thấy chưa hợp lý nhất là học phí hay là thời gian ạ?',
    },
    {
      id: '5.q3', who: 'ph', q: 'Giảm giá được không?',
      say: 'Dạ {xung} xin phép không tự quyết giá ạ. Với khóa 12 tháng, nếu {goi} đăng ký 2 hoặc 3 tài khoản cùng lúc thì có ưu đãi mua chung 5% hoặc 10%. Ngoài ra {xung} xin phép báo lãnh đạo xem có hỗ trợ thêm không, có kết quả {xung} nhắn {goi} ngay ạ.',
      points: ['Quy tắc: không tự giảm giá, báo Đại ca.', 'Mua chung chỉ cho Memohack 12 tháng.', 'Memohack 1:1: mức giảm tối đa 500.000đ mỗi tài khoản và phải được Đại ca duyệt.', 'Dùng nút "Copy tin xin duyệt" trong trang Báo giá để gửi Đại ca.'],
      avoid: 'Không hứa giảm trước khi Đại ca duyệt. Không nói "giá hôm nay".',
    },
    {
      id: '5.q4', who: 'ph', q: 'Để tôi suy nghĩ thêm.',
      say: 'Dạ vâng ạ, đây là quyết định quan trọng nên {goi} cân nhắc là đúng. {xung} xin hỏi để {xung} hỗ trợ đúng: điều {goi} đang cân nhắc nhất là gì ạ, là chương trình, học phí, hay thời gian của bé {be}? {xung} giải đáp luôn để {goi} quyết định thoải mái ạ.',
      points: ['Tìm ra lý do thật phía sau "suy nghĩ".', 'Sau khi giải đáp, hẹn một thời điểm cụ thể để hỏi lại.'],
      next: 'Vậy {xung} xin phép nhắn {goi} vào [ngày] để nghe ý kiến của {goi} nhé ạ?',
    },
    {
      id: '5.q5', who: 'ph', q: 'Tôi cần hỏi ý chồng/vợ.',
      say: 'Dạ {xung} hiểu ạ, việc của bé cần cả hai Ba Mẹ cùng đồng ý. {xung} gửi {goi} bản tóm tắt chương trình và kết quả đo của bé {be} để {goi} chia sẻ với gia đình. Nếu tiện, {xung} xin hẹn một cuộc gọi ngắn với cả hai Ba Mẹ vào [ngày] để {xung} giải đáp trực tiếp ạ.',
      points: ['Câu hỏi 2.q4 "ai cùng quyết định" ở bước 2 giúp tránh tình huống này.', 'Cung cấp tài liệu để phụ huynh tự trình bày lại.'],
    },
    {
      id: '5.q6', who: 'ph', q: 'Học không hợp hoặc không hiệu quả thì sao, có hoàn tiền không?',
      say: 'Dạ {xung} xin nói rõ để {goi} yên tâm quyết định ạ. Theo Quy định và Cam kết của GMA, khóa học sau khi đã đăng ký và kích hoạt tài khoản học tập thì không hoàn tiền, nên {xung} mời bé thử Trial trước để {goi} nhìn nhịp thật của bé rồi hãy cân nhắc. Trong lúc học, nếu bé gặp khó khăn, GMA hỗ trợ gia hạn một lần và bảo lưu một lần tối đa 60 ngày theo quy định, các cô luôn đồng hành cùng {goi} và bé ạ.',
      points: ['Quy định chính thức: khóa học đã mua không hoàn tiền sau khi tài khoản đã đăng ký và kích hoạt.', 'Bảo lưu: một lần duy nhất, tối đa 60 ngày, khi phụ huynh đề xuất bằng văn bản hoặc tin nhắn chính thức.', 'Gia hạn miễn phí: một lần duy nhất theo các trường hợp trong quy định, liên hệ Ban giáo vụ. Yêu cầu gia hạn trong vòng 10 ngày kể từ ngày hết hạn, sau đó tài khoản bị thu hồi.', 'Có thể gửi link Quy định và Cam kết: gmavietnam.com/refund-policy để phụ huynh tự đọc.'],
      avoid: 'Không nói "hoàn tiền 100%", "hoàn tiền sau 30 ngày" hay "đảm bảo kết quả". Đó là thông tin cũ, không đúng quy định hiện hành.',
    },
    {
      id: '5.q7', who: 'ph', q: 'Thanh toán thế nào? Chuyển khoản hay thẻ?',
      say: 'Dạ {goi} có thể quét mã QR chuyển khoản, hoặc trả góp qua thẻ tín dụng nếu muốn chia nhỏ ạ. {xung} gửi {goi} mã QR kèm nội dung chuyển khoản ngay. {goi} chuyển xong nhắn {xung} ảnh biên lai, {xung} báo kế toán xác nhận và giữ chỗ cho bé ạ.',
      points: ['Tạo bill và QR bằng trang Báo giá. Nội dung chuyển khoản sửa được.', 'Đơn từ 37 triệu: gợi ý chuyển vào tài khoản công ty. Đơn nhỏ hơn: tài khoản cá nhân.', 'Gửi bill cho kế toán và tag chị Hoàn để xác nhận tiền về.'],
    },
    {
      id: '5.q8', who: 'ph', q: 'Có xuất hóa đơn VAT không?',
      say: 'Dạ có ạ. Báo giá hiện chưa bao gồm 8% VAT, nếu {goi} cần xuất hóa đơn đỏ thì cộng thêm 8% vào tổng giá trị ạ. {goi} cho {xung} xin thông tin công ty để {xung} chuyển kế toán xuất hóa đơn.',
      points: ['Câu này lấy từ ghi chú trong báo giá.', 'Chỉ nói khi khách hỏi hóa đơn.'],
    },
    {
      id: '5.q9', who: 'ph', q: 'Gói này tặng kèm những gì?',
      say: {
        mmh12: 'Dạ khóa Memohack 12 tháng tặng kèm trị giá 12 triệu gồm: khóa ParentHack 15 bài dành cho cha mẹ trị giá 10 triệu, đo và đọc kết quả sóng não chuyên sâu cho bé trị giá 1 triệu, và Bộ học liệu Memohack Kits trị giá 1 triệu ạ.',
        mmh11: 'Dạ gói 1:1 tặng kèm 12 buổi Offline, mỗi tuần một buổi, bé học chung lớp Memohack tại trung tâm, {goi} tự chọn có tham gia hay không. Đây là quà tặng đồng hành nên không quy đổi ra tiền và không hoàn tiền. Ngoài ra bé còn có Bộ học liệu Memohack Kits gửi tận nhà ạ.',
        hyper: 'Dạ Hyperhack tặng kèm khóa ParentHack trị giá 4 triệu dành riêng cho Ba Mẹ, giúp {goi} hiểu tâm lý và đồng hành cùng bé một cách bình an hơn. Chương trình gồm online 60 ngày, 120 buổi với Trainer chuyên biệt và bộ ba bài tập memoKUNGFU, memoEYE, memoSTATE ạ.',
      },
      points: ['Nói quà tặng đúng danh sách, kèm giá trị nếu có.', 'Memohack 12 tháng còn có suất Offline bổ sung 5,5 triệu nếu khách muốn.', 'Gói 1:1: 12 buổi Offline là quà tặng, không quy đổi ra tiền, không hoàn tiền.', 'Số suất ưu đãi ParentHack có thể giới hạn mỗi tháng, kiểm tra trước khi hứa.'],
    },
    {
      id: '5.q10', who: 'cs', q: 'Còn điều gì Ba Mẹ băn khoăn trước khi quyết định?',
      say: 'Dạ trước khi {goi} quyết định cho bé {be}, còn điều gì {goi} băn khoăn không ạ? {xung} giải đáp hết để {goi} yên tâm nhé.',
      points: ['Hỏi sau khi đã trả lời xong các từ chối.', 'Nếu phụ huynh nói "không còn", chuyển luôn sang câu chốt: chọn ngày bắt đầu và gửi QR.'],
      next: 'Vậy mình bắt đầu từ [ngày A] hay [ngày B] để {xung} giữ chỗ ạ?',
    },
    {
      id: '5.q11', who: 'ph', q: 'Đăng ký rồi Ba Mẹ phải làm gì, có phải cam kết gì không?',
      say: 'Dạ khi kích hoạt tài khoản, {goi} sẽ ký Quy định và Cam kết sử dụng tài khoản học tập. Điểm chính: {goi} hoàn thành khóa ParentHack trong 2 tháng đầu, đảm bảo bé học đủ buổi theo lộ trình, đồng hành cùng bé luyện tập mỗi ngày và gửi video luyện tập lên nhóm lớp để giáo viên theo dõi. Các cô sẽ hướng dẫn {goi} từng bước ạ.',
      points: ['Memohack: 2 buổi online mỗi tuần (tổng 96 buổi) và 1 buổi offline mỗi tuần (tổng 48 buổi).', 'Hyperhack: 2 lần online mỗi ngày (tổng 60 ngày).', 'Nên gửi link Quy định và Cam kết trước khi chốt để phụ huynh đọc: gmavietnam.com/refund-policy.', 'Nội dung học trong hệ thống thuộc bản quyền GMA, không tải xuống hay chia sẻ.'],
      avoid: 'Không để phụ huynh hiểu nhầm là chỉ cần đóng tiền, còn việc luyện tập là của trung tâm.',
    },
  ],

  6: [
    {
      id: '6.q1', who: 'ph', q: 'Khi nào bé có lịch học, ai liên hệ với tôi?',
      say: 'Dạ sau khi kế toán xác nhận tiền về, {xung} sẽ tạo nhóm với {goi} và các cô. Đội ngũ Trainer sẽ hỗ trợ {goi} sắp xếp thời gian học phù hợp với lịch của bé {be}, từ đó các cô đồng hành cùng bé ạ. {goi} cho {xung} xin khung giờ bé rảnh trong tuần để {xung} chuyển các cô xếp lịch ạ.',
      points: ['Quy trình bàn giao: gửi bill cho Kế toán, gửi thông tin học viên cho Trainer, kích hoạt tài khoản, tạo nhóm với phụ huynh.', 'Dùng mẫu "Gửi Trainer xếp lịch học" trong Tin soạn sẵn.', 'Thời gian bắt đầu do đội ngũ Trainer sắp xếp cùng phụ huynh, không hứa ngày cụ thể.'],
    },
    {
      id: '6.q2', who: 'ph', q: 'Tài khoản học đăng nhập thế nào?',
      say: {
        mmh12: 'Dạ {xung} sẽ đăng ký kích hoạt tài khoản học cho bé {be} trên hệ thống MemoSchool. Thông tin đăng nhập sẽ được gửi về email {goi} đã đăng ký. {goi} kiểm tra email giúp {xung} nhé ạ.',
        mmh11: 'Dạ với gói 1:1, bé không cần kích hoạt tài khoản. {xung} sẽ báo bộ phận kinh doanh gửi mail thông báo khóa học và các cô xếp lịch học riêng cho bé ạ.',
        hyper: 'Dạ {xung} sẽ đăng ký kích hoạt tài khoản học cho bé {be} trên hệ thống MemoSchool. Thông tin đăng nhập sẽ được gửi về email {goi} đã đăng ký. {goi} kiểm tra email giúp {xung} nhé ạ.',
      },
      points: ['Memohack 12 tháng và Hyperhack: tạo hóa đơn kích hoạt trong Sales Hub, tải lên trang MemoSchool.', 'Gói 1:1: không kích hoạt tài khoản, chỉ tag Đại ca để gửi mail thông báo khóa học.'],
    },
    {
      id: '6.q3', who: 'ph', q: 'Khi nào đo sóng não lại?',
      say: {
        mmh12: 'Dạ bé {be} được đo ban đầu ở Trial, và đo lại 4 lần trong năm theo các mốc để {goi} thấy nhịp của bé thay đổi theo thời gian ạ. Gần đến mốc {xung} sẽ nhắn {goi} đặt lịch.',
        mmh11: 'Dạ bé {be} được đo ban đầu ở Trial và đo lại sau 3 tháng để so với lần đầu ạ. Gần đến mốc {xung} sẽ nhắn {goi} đặt lịch.',
        hyper: 'Dạ bé {be} được đo ban đầu ở Trial và đo lại sau 3 tháng để so với lần đầu ạ. Gần đến mốc {xung} sẽ nhắn {goi} đặt lịch.',
      },
      points: ['Nhắc mốc đo là cơ hội chăm sóc và xin giới thiệu.'],
      avoid: 'Không hứa kết quả lần đo sau.',
      verify: 'Website ghi Memohack 12 tháng đo sau tháng 1, 3, 6 và 12. Tài liệu đào tạo ghi tháng 3, 6, 9, 12. Anh chốt rồi Sales mới nói tháng cụ thể.',
    },
    {
      id: '6.q4', who: 'ph', q: 'Bé học không đều hoặc bỏ buổi thì sao? Có bảo lưu được không?',
      say: 'Dạ {goi} cứ báo các cô để xếp lại lịch phù hợp cho bé {be} ạ. Nếu gia đình gặp việc đột xuất, GMA hỗ trợ bảo lưu một lần duy nhất, tối đa 60 ngày, {goi} chỉ cần nhắn đề xuất bằng văn bản hoặc tin nhắn chính thức. Với lý do đặc biệt như bé ốm, {goi} báo trước ngày hết hạn từ 15 đến 30 ngày để GMA xem xét ạ.',
      points: ['Bảo lưu: một lần duy nhất, tối đa 60 ngày, khi có đề xuất bằng văn bản hoặc tin nhắn chính thức.', 'Trường hợp đặc biệt (bệnh lý hoặc lý do chính đáng): thông báo trước ngày hết hạn 15 đến 30 ngày.', 'Không trách phụ huynh, tập trung giúp bé giữ nhịp luyện đều.'],
      avoid: 'Không hứa bảo lưu quá 60 ngày hay nhiều lần.',
    },
    {
      id: '6.q5', who: 'ph', q: 'Tôi giới thiệu bạn thì có gì không?',
      say: 'Dạ {xung} cảm ơn {goi} đã tin tưởng và muốn giới thiệu cho bạn bè ạ. {goi} gửi {xung} thông tin liên hệ của người quen có bé cần hỗ trợ trí nhớ và tập trung, {xung} sẽ tư vấn thật chu đáo và cho {goi} biết kết quả ạ.',
      points: ['Không nêu hay hứa ưu đãi giới thiệu với phụ huynh. Ưu đãi hỏi anh Tuấn.', 'Ghi nhận người giới thiệu trong CRM để dùng ở bước 1.'],
      avoid: 'Không nói về quà hay giảm giá giới thiệu.',
    },
    {
      id: '6.q6', who: 'ph', q: 'Tôi muốn đăng ký thêm cho bé thứ hai thì sao?',
      say: 'Dạ {xung} xin chúc mừng bé {be} đã học tốt ạ. Nếu {goi} đăng ký thêm cho bé thứ hai, {xung} xin tư vấn chương trình phù hợp với bé. Riêng khóa Memohack 12 tháng có ưu đãi mua chung khi các tài khoản cùng thanh toán, {xung} tính cụ thể cho {goi} ạ.',
      points: ['Tài khoản đã thanh toán trước không được tính lũy kế cho tài khoản mua sau, nên ưu đãi mua chung cần cùng thời điểm.', 'Hỏi về nhu cầu của bé thứ hai trước khi gợi ý khóa.'],
      next: 'Bé thứ hai đang học lớp mấy, và {goi} lo điều gì nhất cho bé ạ?',
    },
    {
      id: '6.q7', who: 'cs', q: 'Khi nào xin giới thiệu và xin nhận xét?',
      say: 'Dạ {xung} rất vui vì bé {be} đang tiến bộ theo nhịp riêng. {goi} có thể chia sẻ vài dòng về trải nghiệm của bé với GMA không ạ? Và nếu {goi} có bạn bè có bé cần hỗ trợ trí nhớ và tập trung, {goi} cho {xung} xin liên hệ để {xung} tư vấn nhé ạ.',
      points: ['Thời điểm tốt: sau mốc đo đầu tiên hoặc khi phụ huynh tự khen.', 'Xin nhận xét trước, xin giới thiệu sau.'],
      avoid: 'Không xin giới thiệu khi phụ huynh đang phàn nàn.',
    },
    {
      id: '6.q8', who: 'ph', q: 'Tài khoản sắp hết hạn mà bé chưa học xong thì sao?',
      say: 'Dạ {goi} liên hệ Ban giáo vụ GMA để được hỗ trợ gia hạn kịp thời ạ. GMA gia hạn miễn phí một lần duy nhất theo quy định, và {goi} cần gửi yêu cầu trong vòng 10 ngày kể từ ngày hết hạn. {xung} cũng nhắn {goi} trước khi tài khoản của bé {be} đến hạn để mình chủ động ạ.',
      points: ['Gia hạn miễn phí chỉ một lần duy nhất. Quá 10 ngày kể từ ngày hết hạn thì tài khoản bị thu hồi.', 'Nhắc phụ huynh trước hạn là cơ hội chăm sóc.'],
      avoid: 'Không hứa gia hạn nhiều lần hoặc sau 10 ngày.',
    },
  ],
};
