// Bước 3B: buổi Trial 1:1 Online 45 phút và giao tiếp cơ bản. Chắt lọc từ file "Kịch bản Trial 1:1 Memohack Online (A Tuấn gợi ý Ver 1 - 17.11)".
// Xưng "Cô/Thầy", gọi phụ huynh là "Ba/Mẹ + tên". Chỗ {khóa} app tự điền, [ngoặc vuông] Sales tự điền.
export const TRIAL_STAGE = {
  "n": "3B",
  "id": "trial-online",
  "title": "Trial 1:1 Online và giao tiếp cơ bản",
  "short": "Khung 45 phút, xử lý khi Ba Mẹ im lặng",
  "goal": "Kịch bản buổi Trial 1:1 Online 45 phút (Sales mở đầu và chốt, Trainer dẫn trải nghiệm) và cách giao tiếp cơ bản: xử lý khi Ba Mẹ im lặng, tình huống khó, chọn giọng nói, phân vân, cách gọi và nhắn mời Trial. Các tình huống im lặng, tương tác khó, chọn giọng nói và mục mời Trial dùng được cho cả 3 khóa.",
  "tabLabels": {
    "qa": "Ba Mẹ nói, tình huống và cách đáp",
    "msg": "Lời thoại và mẫu"
  },
  "notes": [
    "Xưng hô: xưng “Cô” (hoặc “Thầy”), không xưng “em”, “mình” hay “cháu”. Gọi phụ huynh là “Ba/Mẹ [tên]”; gọi bé bằng tên hoặc “con”. Người dẫn buổi Trial Online là Trainer. Trainer và chuyên gia là hai vị trí khác nhau, không gọi lẫn.",
    "Mỗi lượt hỏi 1 câu mở, tối đa 2. Không hỏi dồn.",
    "Nói điểm sáng của bé trước, điểm cần rèn sau. Gọi vấn đề là “phần con cần rèn thêm”, không gán nhãn “kém” hay “yếu”.",
    "Không cam kết kết quả. Dùng “thường thấy”, “nhiều bạn”, “khi luyện đều”.",
    "Quy tắc giá: nói chi tiết giá trị trước, báo học phí sau. Không báo giá trong buổi Trial nếu chưa nói xong giá trị.",
    "Trial Online 1:1 dài 45 phút (đã chốt). Giờ trống buổi tối của Trainer: xem lịch rồi mới hẹn, không báo sẵn thứ."
  ],
  "items": [
    {
      "id": "T1",
      "title": "Khung 45 phút và ai dẫn",
      "when": "Sales mở đầu, nối giải pháp và chốt. Trainer dẫn trải nghiệm và trả kết quả.",
      "text": "0–5 phút: 1. Mở đầu và khám phá (Sales)\n5–30 phút: Bé trải nghiệm cùng Trainer (Trainer (Sales quan sát, ghi chú))\n30–35 phút: 2. Trả kết quả (Trainer)\n35–39 phút: 3. Nối vấn đề với giải pháp (Sales)\n39–42 phút: 4. Giới thiệu chương trình (Sales)\n42–45 phút: 5. Chốt bước tiếp theo (Sales)"
    },
    {
      "id": "T1.7",
      "title": "Chuẩn bị trước buổi",
      "when": "Sales và Trainer",
      "text": "- Sales, trước buổi 1 ngày: Đọc thông tin lead: tuổi, lớp, điều Ba Mẹ đã ghi (ví dụ “muốn con tự tin, tự giác”).\n- Sales, trước buổi 1 ngày: Chọn bảng vấn đề đúng với mục tiêu đó, không dùng mặc định “Mất tập trung”.\n- Sales, trước buổi 1 ngày: Chọn 1–2 case Before/After cùng nhóm tuổi và vấn đề.\n- Sales, trước buổi 1 ngày: Gửi nhắc Ba Mẹ: ngồi cạnh con, bật camera, chuẩn bị sẵn điều muốn hỏi.\n- Trainer, được phân công trước ít nhất 24 giờ: Nhận thông tin bé và mục tiêu của Ba Mẹ từ Sales.\n- Trainer, trước buổi: Chuẩn bị các phần trải nghiệm (ví dụ video về nhân cách, test trí nhớ hình ảnh) và mẫu nhận xét.\n- Trainer, trước buổi: Thử âm thanh, hình ảnh và link họp.\n- Cả hai, 15 phút trước giờ: Vào phòng sớm, thống nhất ai nói gì ở từng phút theo bảng thời gian."
    },
    {
      "id": "T2.1",
      "title": "Giai đoạn 1 (0–5 phút, Sales): Lời mở đầu",
      "text": "Dạ {xung} chào {goi}, chào bé {be} ạ. Buổi học thử hôm nay có 3 phần. Một, 30 phút đầu {be} trải nghiệm cùng Trainer [tên]. Hai, 15 phút sau Trainer sẽ nhận xét về con. Ba, {goi} ngồi cạnh quan sát con, để cuối buổi mình trao đổi cụ thể hơn ạ.",
      "note": "Mục tiêu: làm Ba Mẹ yên tâm và ghi lại 3 điều Ba Mẹ nói, để các giai đoạn sau dùng đúng từ ngữ của họ."
    },
    {
      "id": "T2.2",
      "title": "Giai đoạn 1: 3 câu khám phá (hỏi từng câu)",
      "text": "(1) Nỗi lo lớn nhất: “Điều {goi} lo nhất ở {be} lúc này là gì ạ?”\n(2) Hành vi gây khó: “Lúc {be} học bài ở nhà, điều gì làm {goi} thấy mệt nhất ạ?”\n(3) Mục tiêu mong muốn: “Sau khoảng 3 tháng, {goi} mong thấy {be} khác đi điều gì ạ?”",
      "note": "Sau mỗi câu trả lời tóm lại một câu: “{xung} ghi nhận là [từ của Ba Mẹ], đúng không ạ?” rồi ghi vào 3 ô [Nỗi lo], [Hành vi], [Mục tiêu]. Ba Mẹ ít nói: hỏi tối đa 3 câu, không ép (xem mục F và H)."
    },
    {
      "id": "T2.3",
      "title": "Giai đoạn 1: Bàn giao cho Trainer",
      "text": "{xung} xin phép chuyển {be} cho Trainer [tên] nhé. {goi} cứ ngồi cạnh quan sát, 30 phút nữa mình gặp lại ạ."
    },
    {
      "id": "T2.4",
      "title": "Giai đoạn 2 (30–35 phút, Trainer): Mỗi phần trải nghiệm đọc theo 5 bước",
      "text": "(1) Điểm sáng: “Ở phần [tên phần trải nghiệm], {be} làm rất tốt ở [điểm cụ thể Trainer quan sát được].”\n(2) Điểm cần rèn: “Phần Trainer thấy {be} còn cần rèn thêm là [vấn đề].”\n(3) Biểu hiện: “Những bạn như vậy thường hay [biểu hiện], đúng với điều {goi} vừa chia sẻ là [trích lại từ Giai đoạn 1].”\n(4) Tác động: “Nếu để lâu, điều này có thể ảnh hưởng tới [việc học hoặc giao tiếp, điều Ba Mẹ quan tâm].”\n(5) Xác nhận: “{goi} thấy mô tả này có giống {be} ở nhà không ạ?”",
      "note": "Chỉ hỏi 1 câu xác nhận ở cuối mỗi phần, không hỏi dồn 3–4 câu như bản cũ. Chỉ nêu 1 vấn đề trọng tâm. Giữ từ khóa Ba Mẹ dùng (ví dụ “hay quên”, “phải nhắc”) để dùng ở Giai đoạn 3 và 5. Ban Giáo Vụ góp ý: dùng “Trainer”, không dùng “chuyên gia”."
    },
    {
      "id": "T2.5",
      "title": "Giai đoạn 2: Sau khi Ba Mẹ trả lời",
      "text": "{xung} hiểu ạ, nhiều Ba Mẹ cũng từng như {goi}. {goi} có muốn chia sẻ thêm điều gì {xung} chưa hỏi không ạ?",
      "note": "Đồng cảm trước, rồi mới mở thêm."
    },
    {
      "id": "T2.6",
      "title": "Giai đoạn 2: Phần test trí nhớ hình ảnh",
      "text": "Ở phần test trí nhớ hình ảnh, {be} nhớ được [kết quả]. Điều này cho Trainer thấy [ý nghĩa bằng ngôn ngữ đời thường]."
    },
    {
      "id": "T2.7",
      "title": "Giai đoạn 2: Chốt giai đoạn",
      "text": "Như vậy điều cần ưu tiên với {be} là [1 vấn đề trọng tâm]."
    },
    {
      "id": "T2.8",
      "title": "Giai đoạn 3 (35–39 phút, Sales): Nối vấn đề với giải pháp, nói giá trị trước",
      "text": "(1) Gọi tên vấn đề bằng lời nhẹ: “{be} đang cần được rèn thêm phần [vấn đề trọng tâm].”\n(2) Giới thiệu chương trình bằng giá trị: “Memohack 1:1 Online là chương trình {be} học riêng với giáo viên, [24 buổi trong khoảng 3 tháng], lịch linh hoạt theo gia đình, được đo sóng não ban đầu và đo lại sau 3 tháng để {goi} so với chính bé. Chương trình được thiết kế để hỗ trợ đúng phần này.”\n(3) Nói về thời gian, không cam kết: “Mỗi bạn một nhịp, nên Trainer sẽ theo dõi hằng tuần để điều chỉnh.”\n(4) Kể một case Before/After (xem T2.9).",
      "note": "KHÔNG NÓI: “cải thiện rất nhanh”, “chắc chắn”, “cam kết”; “trí nhớ ngắn hạn kém”, “tập trung kém” (thay bằng “phần con cần rèn thêm”); không so sánh con với bé khác bằng tên thật hoặc khi chưa được phép. Memohack hay Hyperhack phụ thuộc nhóm vấn đề và tuổi (xem mục Chọn khóa nào). Không báo giá ở bước này. CẦN XÁC NHẬN: bản gốc có câu “nhiều bạn tiến bộ rõ sau khoảng 4–8 tuần khi luyện đều”, em chưa đưa vào lời thoại vì là con số chưa kiểm chứng; anh chốt thì em thêm."
    },
    {
      "id": "T2.9",
      "title": "Giai đoạn 3: Case Before/After",
      "text": "{xung} có một bạn học viên [tên viết tắt, đã được Ba Mẹ đồng ý], [tuổi], lúc đầu cũng [biểu hiện giống con]. Sau [thời gian] luyện đều, bạn ấy [thay đổi cụ thể, quan sát được]. {goi} thấy tình huống đó có gần với {be} không ạ?",
      "note": "Ban Giáo Vụ góp ý: ở chỗ này xưng “Cô”, không xưng “em”. Chọn 1–2 case cùng nhóm tuổi và vấn đề."
    },
    {
      "id": "T2.10",
      "title": "Giai đoạn 4 (39–42 phút, Sales): Giới thiệu chương trình",
      "text": "Học gì: “Mỗi buổi {be} làm các nhiệm vụ ngắn, vừa sức, giống buổi hôm nay: [nêu 1–2 hoạt động đã trải nghiệm].”\nHọc thế nào: “Con học online với Trainer hướng dẫn, [số buổi mỗi tuần], mỗi buổi [thời lượng].”\nAi theo dõi: “Trainer theo dõi tiến độ hằng tuần và gửi {goi} nhận xét, nên {goi} biết con đang tiến bộ ở đâu.”\nVì sao online: “Học online giúp con giữ nhịp đều đặn, không bị gián đoạn vì đi lại.”\nNối lại mong muốn: “Với mong muốn của {goi} là [mục tiêu ở Giai đoạn 1], lộ trình sẽ bắt đầu từ [điểm đầu tiên].”",
      "note": "Chưa báo học phí ở bước này. Nếu Ba Mẹ hỏi: nói đủ giá trị trước rồi mới báo, hoặc hẹn 15 phút tư vấn lộ trình ở Giai đoạn 5 (xem T3.14)."
    },
    {
      "id": "T2.11",
      "title": "Giai đoạn 5 (42–45 phút, Sales): Tóm tắt 3 ý và hỏi cảm nhận",
      "text": "{xung} tóm lại 3 ý để {goi} nắm nhé. Một, {be} đang cần rèn thêm [vấn đề]. Hai, Memohack hỗ trợ đúng phần này bằng [cách]. Ba, con học online cùng Trainer, có theo dõi hằng tuần. {goi} và {be} thấy buổi hôm nay thế nào ạ?",
      "note": "Bản gốc ghi “Hôm nay mình đã hiểu rõ vấn đề của con…”, Ban Giáo Vụ góp ý đổi “mình” thành “Ba/Mẹ [tên]”."
    },
    {
      "id": "T2.12",
      "title": "Giai đoạn 5: Đặt mốc tiếp theo (cho 2 lựa chọn giờ, không hỏi mở)",
      "text": "{xung} sẽ gửi báo cáo của {be} cho {goi} qua Zalo trước [giờ] [hôm nay hoặc ngày mai]. {xung} xin hẹn {goi} 15 phút vào [ngày giờ A] hoặc [ngày giờ B] để {xung} cùng {goi} xem lộ trình phù hợp với {be}. {goi} tiện giờ nào hơn ạ?",
      "note": "Bản cũ chỉ hứa gửi báo cáo, không có giờ. Sau buổi, cập nhật CRM trong ngày: 3 câu trả lời Giai đoạn 1, vấn đề trọng tâm, mốc đã hẹn."
    },
    {
      "id": "T2.13",
      "title": "Giai đoạn 5: Phương án khác nếu Ba Mẹ muốn gặp trực tiếp",
      "text": "Mời Ba Mẹ trải nghiệm hoặc đo sóng não tại cơ sở Hà Đông hoặc Cầu Giấy (buổi gần nhất thường vào Chủ nhật). Ba Mẹ ở xa thì nhắc lại lựa chọn học Online 1:1.",
      "note": "Trial Offline sau buổi Online là bước đã có trong mục tiêu bản gốc nhưng bản cũ không nhắc tới."
    },
    {
      "id": "T7.1",
      "title": "Mở đầu gọi điện",
      "text": "Dạ {xung} chào {goi}, {xung} là {tensales}, bên Ban Giáo Vụ của Học viện Trí tuệ Thiên Tài Việt Nam GMA ạ. {goi} có tiện cho {xung} chia sẻ 3 đến 5 phút không ạ?"
    },
    {
      "id": "T7.2",
      "title": "Nhắc lại nhu cầu cũ (lead cũ)",
      "text": "Trước đây {xung} thấy {goi} có tìm hiểu phương pháp giúp bé {be} cải thiện tập trung, ghi nhớ để kết quả học tập tốt hơn. Đợt này bé có tiến bộ hơn chưa ạ?"
    },
    {
      "id": "T7.3",
      "title": "Nhắc lại nhu cầu cũ (lead quan tâm đo não bộ)",
      "text": "Trước đây {xung} thấy {goi} quan tâm việc đo sức khỏe não bộ để biết mức độ tập trung, ghi nhớ và cách tư duy của con thiên hướng Não Trái hay Não Phải, để có cách đồng hành phù hợp. Đợt đó {goi} mong muốn con được cải thiện phần nào ạ?"
    },
    {
      "id": "T7.4",
      "title": "Lead để lại thông tin trên fanpage",
      "text": "{xung} thấy {goi} có để lại thông tin trên fanpage, muốn được tư vấn hỗ trợ bé {be} cải thiện tập trung và ghi nhớ. Hiện tại {goi} có tiện không ạ, {xung} xin chia sẻ 3 đến 5 phút."
    },
    {
      "id": "T7.5",
      "title": "Hỏi nhanh để hiểu bé",
      "text": "“Bé nhà mình năm nay mấy tuổi rồi ạ?” rồi “{goi} thấy bé hay quên ở một môn cụ thể nào không ạ, hay môn nào bé cũng hay quên ạ?” rồi xác nhận mục tiêu: “Vậy {goi} muốn nâng cao khả năng tập trung, ghi nhớ của bé để kết quả học tập tốt hơn, đúng không ạ?”"
    },
    {
      "id": "T7.6",
      "title": "Tặng ebook vẽ bằng 2 tay",
      "text": "{xung} kết nối Zalo để gửi {goi} ebook tập vẽ bằng 2 tay, {goi} in cho bé luyện ở nhà ạ. Nếu luyện đều, bài tập này hỗ trợ tốt cho não bộ, giúp con kéo dài thời gian tập trung và ghi nhớ tốt hơn ạ."
    },
    {
      "id": "T7.7",
      "title": "Mời đo sóng não (giá trị trước)",
      "text": "Ngoài ra với bé [số tuổi] tuổi, GMA có chương trình đo sức khỏe não bộ, gọi là đo sóng não. Kết quả cho biết mức độ tập trung, ghi nhớ của con đang ở đâu, các chuyên gia GMA đọc kết quả cho {goi}. {goi} cũng biết con tư duy thiên hướng Não Trái hay Não Phải, và con có cân bằng không, để mình định hướng cách học phù hợp nhất cho bé ạ. [Giá và ưu đãi nói sau phần giá trị này, xem mục 2.4.]"
    },
    {
      "id": "T7.8",
      "title": "Hỏi khu vực, chốt lịch",
      "text": "Buổi đo gần nhất vào Chủ nhật tuần này, tại 2 cơ sở Hà Đông và Cầu Giấy. {goi} đang ở khu vực nào ạ?"
    },
    {
      "id": "T7.9",
      "title": "Ba Mẹ ở xa cơ sở (ví dụ Hoàng Mai)",
      "text": "Đi lại cả 2 cơ sở sẽ hơi xa một chút, nhưng {goi} có thể sắp xếp để biết sức khỏe não bộ của {be} và trải nghiệm xem bạn có hợp phương pháp không, sau đó nhà mình cân nhắc sau ạ."
    },
    {
      "id": "T7.10",
      "title": "Mời Trial Online 1:1 (lead đã đăng ký trước nhưng chưa tham gia được)",
      "text": "Đợt này GMA có thêm hình thức học thử trải nghiệm Online 45 phút, 1 kèm 1 với Trainer vào buổi tối trong tuần. {goi} tham gia cùng bé trong lúc học, cuối buổi được nghe nhận xét và lời khuyên trực tiếp từ Trainer. Hiện {xung} còn trống lịch [ngày giờ còn trống, xem lịch Trainer]. Mình tham gia được buổi nào ạ?"
    },
    {
      "id": "T7.11",
      "title": "Không nhất thiết đến cơ sở",
      "text": "Mình không nhất thiết phải đến cơ sở ạ, GMA có các buổi học trực tuyến online 1 cô 1 trò."
    }
  ],
  "qa": [
    {
      "id": "T3.1",
      "who": "noi",
      "q": "Cô cứ nói đi, tôi nghe.",
      "say": "Dạ, hôm nay chủ yếu để {be} trải nghiệm, nên {xung} hỏi {goi} vài câu ngắn để Trainer hiểu con hơn. Điều {goi} lo nhất ở {be} lúc này là gì ạ?",
      "points": [
        "Giai đoạn: 1. Mở đầu",
        "Ba Mẹ có thể đang nghĩ: Muốn biết mình sắp bị chào bán gì"
      ]
    },
    {
      "id": "T3.2",
      "who": "noi",
      "q": "Con bị gì thì cô nói luôn đi.",
      "say": "{xung} hiểu {goi} muốn biết sớm. Để nói đúng về con, {xung} cần thấy con làm trước. Cuối buổi Trainer nhận xét cụ thể ạ. Trước đó, {be} hay gặp khó ở việc gì khi học ạ?",
      "points": [
        "Giai đoạn: 1. Mở đầu",
        "Ba Mẹ có thể đang nghĩ: Muốn có kết luận nhanh"
      ]
    },
    {
      "id": "T3.3",
      "who": "noi",
      "q": "Con bình thường thôi, tôi cho thử cho vui.",
      "say": "Dạ, {be} sẵn sàng thử là điểm rất tốt ạ. {goi} mong buổi hôm nay cho {goi} thấy điều gì ở con ạ?",
      "points": [
        "Giai đoạn: 1. Mở đầu",
        "Ba Mẹ có thể đang nghĩ: Không muốn con bị gán là có vấn đề"
      ]
    },
    {
      "id": "T3.4",
      "who": "noi",
      "q": "Tôi bận lắm, 45 phút có xong không?",
      "say": "Dạ buổi đúng 45 phút. {goi} chỉ cần ngồi cạnh, không phải làm gì. 15 phút cuối Trainer nhận xét luôn, {goi} không phải chờ thêm ạ.",
      "points": [
        "Giai đoạn: 1. Mở đầu",
        "Ba Mẹ có thể đang nghĩ: Sợ mất thời gian"
      ]
    },
    {
      "id": "T3.5",
      "who": "noi",
      "q": "Con ngại lắm, chưa chắc chịu học.",
      "say": "Trainer quen với các bạn ngại ạ, buổi đầu con chưa cần nói nhiều. {goi} cứ để con làm theo nhịp của con nhé.",
      "points": [
        "Giai đoạn: 1. Mở đầu",
        "Ba Mẹ có thể đang nghĩ: Lo con không hợp tác"
      ]
    },
    {
      "id": "T3.6",
      "who": "noi",
      "q": "Ừ đúng, ở nhà cũng thế.",
      "say": "“{xung} cảm ơn {goi} đã xác nhận. Ở nhà tình huống đó hay xảy ra lúc nào nhất ạ?” (Lấy ví dụ cụ thể, rồi nối sang tác động.)",
      "points": [
        "Giai đoạn: 2. Trả kết quả",
        "Ba Mẹ có thể đang nghĩ: Đã sẵn sàng nghe tiếp"
      ]
    },
    {
      "id": "T3.7",
      "who": "noi",
      "q": "Không, ở nhà con khác, ở lớp mới thế.",
      "say": "{xung} hiểu, nhiều bạn ở nhà khác ở lớp. Hôm nay Trainer quan sát được [điều quan sát]. Cô giáo ở lớp có nhận xét tương tự không ạ?",
      "points": [
        "Giai đoạn: 2. Trả kết quả",
        "Ba Mẹ có thể đang nghĩ: Chưa muốn nhận, hoặc thật sự khác"
      ]
    },
    {
      "id": "T3.8",
      "who": "noi",
      "q": "Vậy con tôi có vấn đề à?",
      "say": "Dạ không ạ. Đây là phần con cần được rèn thêm, nhiều bạn cùng tuổi cũng vậy. Điểm sáng của {be} là [điểm sáng], còn phần cần rèn thì có cách luyện cụ thể ạ.",
      "points": [
        "Giai đoạn: 2. Trả kết quả",
        "Ba Mẹ có thể đang nghĩ: Lo lắng, tự trách"
      ]
    },
    {
      "id": "T3.9",
      "who": "noi",
      "q": "Tôi cho đi học thêm nhiều rồi mà có khá đâu.",
      "say": "“{xung} hiểu {goi} đã thử nhiều nên mới lo. Các lớp trước, {goi} thấy chưa hợp ở điểm nào ạ?” (Nghe rồi dùng chính câu trả lời đó ở Giai đoạn 3.)",
      "points": [
        "Giai đoạn: 2. Trả kết quả",
        "Ba Mẹ có thể đang nghĩ: Đã thất vọng với lớp khác"
      ]
    },
    {
      "id": "T3.10",
      "who": "noi",
      "q": "Thế nguyên nhân là do đâu?",
      "say": "Dạ [nguyên nhân 1 câu, ngôn ngữ đời thường, Trainer đưa ra]. {xung} nói để {goi} hiểu hướng, chi tiết Trainer sẽ gửi trong báo cáo ạ.",
      "points": [
        "Giai đoạn: 2. Trả kết quả",
        "Ba Mẹ có thể đang nghĩ: Muốn một lời giải thích"
      ]
    },
    {
      "id": "T3.11",
      "who": "noi",
      "q": "Chỗ nào cũng nói thế để bán khóa.",
      "say": "Dạ {xung} hiểu {goi} cẩn thận. Vì vậy {xung} không hứa kết quả, chỉ nói điều {goi} vừa thấy trong buổi. Phần nào {goi} thấy đúng, phần nào chưa đúng với con ạ?",
      "points": [
        "Giai đoạn: 3. Nối với giải pháp",
        "Ba Mẹ có thể đang nghĩ: Nghi ngờ"
      ]
    },
    {
      "id": "T3.12",
      "who": "noi",
      "q": "Bao lâu thì thấy con tiến bộ?",
      "say": "“Mỗi bạn một nhịp ạ. Trainer theo dõi hằng tuần để {goi} thấy được, và có mốc đo lại để so với chính {be}. Thay đổi nào {goi} muốn thấy đầu tiên ạ?” [Bản gốc có “sau khoảng 4–8 tuần khi luyện đều”: CẦN XÁC NHẬN trước khi nói.]",
      "points": [
        "Giai đoạn: 3. Nối với giải pháp",
        "Ba Mẹ có thể đang nghĩ: Muốn có mốc thời gian"
      ]
    },
    {
      "id": "T3.13",
      "who": "noi",
      "q": "Cô có đảm bảo con tiến bộ không?",
      "say": "{xung} không dám đảm bảo kết quả vì còn phụ thuộc con luyện đều ạ. Điều {xung} nói chắc được là Trainer theo dõi sát và báo lại hằng tuần [đúng theo chính sách GMA, Ban Giáo Vụ xác nhận].",
      "points": [
        "Giai đoạn: 3. Nối với giải pháp",
        "Ba Mẹ có thể đang nghĩ: Muốn có cam kết"
      ]
    },
    {
      "id": "T3.14",
      "who": "noi",
      "q": "Học phí bao nhiêu?",
      "say": "Dạ {xung} xin nói giá trị trước để {goi} cân đối ạ: với Memohack 1:1 Online, {be} học riêng với giáo viên, lịch linh hoạt, [24 buổi trong khoảng 3 tháng], được đo sóng não ban đầu và đo lại sau 3 tháng, kèm quà tặng Kits và 12 buổi Offline học chung lớp Memohack tại trung tâm (quà tặng, không quy đổi ra tiền). Sau đó {xung} báo học phí đúng lộ trình của {be}. {xung} xin hẹn {goi} 15 phút vào [ngày giờ] để tính cụ thể. Khi chọn lớp cho con, {goi} quan tâm nhất điều gì ạ?",
      "points": [
        "Giai đoạn: 4. Giới thiệu chương trình",
        "Ba Mẹ có thể đang nghĩ: Cần cân đối chi phí"
      ]
    },
    {
      "id": "T3.15",
      "who": "noi",
      "q": "Học online có hiệu quả bằng học trực tiếp không?",
      "say": "Buổi hôm nay chính là mẫu học online ạ. {goi} thấy {be} [điều quan sát được]. Nếu sau này {goi} muốn gặp trực tiếp, {xung} sắp lịch tại cơ sở sau ạ.",
      "points": [
        "Giai đoạn: 4. Giới thiệu chương trình",
        "Ba Mẹ có thể đang nghĩ: Nghi ngờ hình thức online"
      ]
    },
    {
      "id": "T3.16",
      "who": "noi",
      "q": "Phải học bao nhiêu buổi?",
      "say": "[Số buổi, Ban Giáo Vụ điền]. Mỗi buổi ngắn, Trainer xếp theo lịch của con. Nhà mình thường rảnh buổi nào ạ?",
      "points": [
        "Giai đoạn: 4. Giới thiệu chương trình",
        "Ba Mẹ có thể đang nghĩ: Lo tốn thời gian"
      ]
    },
    {
      "id": "T3.17",
      "who": "noi",
      "q": "Để tôi về hỏi chồng.",
      "say": "Ba của bé cùng quyết là rất tốt ạ. {xung} gửi báo cáo của {be} để Ba xem cùng. {xung} xin hẹn 15 phút vào [giờ A] hoặc [giờ B], nếu Ba tiện thì {xung} trao đổi cùng cả Ba và Mẹ luôn ạ?",
      "points": [
        "Giai đoạn: 5. Chốt",
        "Ba Mẹ có thể đang nghĩ: Cần người cùng quyết định"
      ]
    },
    {
      "id": "T3.18",
      "who": "noi",
      "q": "Để tôi xem lại, có gì tôi báo.",
      "say": "Dạ vâng. Để {goi} xem lại dễ hơn, {xung} gửi báo cáo trước [giờ]. {xung} xin hẹn [giờ A] hoặc [giờ B] để {goi} hỏi điều còn lăn tăn. {goi} tiện giờ nào ạ?",
      "points": [
        "Giai đoạn: 5. Chốt",
        "Ba Mẹ có thể đang nghĩ: Đẩy lùi, chưa rõ lý do"
      ]
    },
    {
      "id": "T3.19",
      "who": "noi",
      "q": "Thôi, tôi chưa có nhu cầu.",
      "say": "“{xung} tôn trọng quyết định của {goi} ạ. {xung} vẫn gửi báo cáo của {be} để {goi} giữ. {xung} xin hỏi để rút kinh nghiệm: điều gì khiến {goi} chưa thấy cần ạ?” Sau đó dừng, không nài thêm.",
      "points": [
        "Giai đoạn: 5. Chốt",
        "Ba Mẹ có thể đang nghĩ: Từ chối thẳng"
      ]
    },
    {
      "id": "T3.20",
      "who": "noi",
      "q": "Con thích học đấy, tôi thấy ổn.",
      "say": "{xung} mừng lắm ạ. Bước tiếp theo, {xung} xin hẹn {goi} [giờ A] hoặc [giờ B] để chọn lộ trình và lịch học cho {be}.",
      "points": [
        "Giai đoạn: 5. Chốt",
        "Ba Mẹ có thể đang nghĩ: Sẵn sàng"
      ]
    },
    {
      "id": "T4.1",
      "who": "tt",
      "q": "Ngại, chưa quen",
      "say": "Hạ áp lực bằng câu chọn dễ trả lời (bước 1 của thang phá băng bên dưới).",
      "points": [
        "Dấu hiệu hoặc khi dùng: Chỉ “dạ”, cười, nhìn xuống"
      ]
    },
    {
      "id": "T4.2",
      "who": "tt",
      "q": "Đang quan sát, chưa tin",
      "say": "Để {goi} quan sát, cuối buổi đưa kết quả cụ thể và hỏi 1 câu về điều {goi} vừa thấy.",
      "points": [
        "Dấu hiệu hoặc khi dùng: Nhìn con chăm chú, ít biểu cảm"
      ]
    },
    {
      "id": "T4.3",
      "who": "tt",
      "q": "Đang bận, đa nhiệm",
      "say": "{goi} đang tiện nghe {xung} trong 5 phút không ạ? Nếu bận, {xung} hẹn lại giờ khác cho {goi} ạ.",
      "points": [
        "Dấu hiệu hoặc khi dùng: Nhìn chỗ khác, có tiếng ồn, trả lời trễ"
      ]
    },
    {
      "id": "T4.4",
      "who": "tt",
      "q": "Chưa muốn học, không đồng tình",
      "say": "Giữ giọng chia sẻ, không đẩy. Hỏi: “Điều gì chưa hợp với {goi} ạ?”",
      "points": [
        "Dấu hiệu hoặc khi dùng: Trả lời cụt, thái độ lạnh"
      ]
    },
    {
      "id": "T4.5",
      "who": "tt",
      "q": "Giao hết cho Cô và Trainer",
      "say": "Giải thích vai trò: “Phần {goi} nói về con giúp Trainer đi đúng hướng hơn ạ.”",
      "points": [
        "Dấu hiệu hoặc khi dùng: “Cô cứ làm đi, tôi nghe”"
      ]
    },
    {
      "id": "T4.6",
      "who": "tt",
      "q": "Thang phá băng, bước 1: Câu chọn",
      "say": "Ở nhà {be} hay quên bài hay hay ngồi không yên hơn ạ?",
      "points": [
        "Dấu hiệu hoặc khi dùng: Dùng lần lượt 4 bước, bước 4 không hỏi thêm"
      ]
    },
    {
      "id": "T4.7",
      "who": "tt",
      "q": "Bước 2: Thang điểm",
      "say": "{goi} chấm {be} tự giác mấy điểm trên thang 10 ạ?",
      "points": []
    },
    {
      "id": "T4.8",
      "who": "tt",
      "q": "Bước 3: Chia sẻ rồi hỏi “có giống”",
      "say": "{xung} gặp nhiều Ba Mẹ kể con phải nhắc mãi mới ngồi vào học. Nhà mình có giống vậy không ạ?",
      "points": []
    },
    {
      "id": "T4.9",
      "who": "tt",
      "q": "Bước 4: Nhường chỗ",
      "say": "“{goi} cứ quan sát {be} thêm chút nhé, cuối buổi {xung} và Trainer sẽ trao đổi cùng {goi} ạ.” Sau buổi chốt bằng báo cáo viết.",
      "points": [
        "Dấu hiệu hoặc khi dùng: Không hỏi thêm"
      ]
    },
    {
      "id": "T4.10",
      "who": "tt",
      "q": "Im lặng ở Giai đoạn 1",
      "say": "Dùng ngay bước 1 (câu chọn), không hỏi câu mở.",
      "points": [
        "Dấu hiệu hoặc khi dùng: Mở đầu và khám phá"
      ]
    },
    {
      "id": "T4.11",
      "who": "tt",
      "q": "Im lặng ở Giai đoạn 2",
      "say": "Hỏi xong thì dừng khoảng 5 giây. {goi} đang nghĩ, đừng nói chen.",
      "points": [
        "Dấu hiệu hoặc khi dùng: Trả kết quả"
      ]
    },
    {
      "id": "T4.12",
      "who": "tt",
      "q": "Im lặng ở Giai đoạn 5",
      "say": "{goi} muốn {xung} gửi báo cáo trước rồi mình hẹn sau, hay mình chốt giờ luôn ạ?",
      "points": [
        "Dấu hiệu hoặc khi dùng: Sau khi đề xuất mốc hẹn"
      ]
    },
    {
      "id": "T4.13",
      "who": "tt",
      "q": "Tin Zalo khi Ba Mẹ im cả buổi",
      "say": "Chào {goi}, {xung} là {tensales}, {xung} gửi {goi} báo cáo buổi học thử của bé {be}. {goi} chọn giúp {xung} một ý gần với {be} nhất: A. Hay quên bài. B. Khó ngồi yên. C. Ngại phát biểu. D. Ý khác. {goi} trả lời một chữ cái là đủ ạ.",
      "points": [
        "Dấu hiệu hoặc khi dùng: Gửi trong ngày"
      ]
    },
    {
      "id": "T5.1",
      "who": "tt",
      "q": "Ba Mẹ chỉ “dạ”, “vâng” liên tục",
      "say": "Phần nào hôm nay {be} có vẻ thích nhất ạ?",
      "points": [
        "Cách xử lý: Chuyển sang câu hỏi về con hoặc câu chọn"
      ]
    },
    {
      "id": "T5.2",
      "who": "tt",
      "q": "Ba Mẹ tắt camera, không hiện hình",
      "say": "{goi} ngồi trong khung hình cùng con một chút để Trainer thấy con thoải mái hơn được không ạ?",
      "points": [
        "Cách xử lý: Mời nhẹ, không yêu cầu"
      ]
    },
    {
      "id": "T5.3",
      "who": "tt",
      "q": "Ba Mẹ làm việc khác, nhìn điện thoại",
      "say": "Phần nhận xét 15 phút cuối là phần quan trọng với {goi}. {goi} tiện ngồi cùng con lúc đó không, hay mình hẹn giờ khác ạ?",
      "points": [
        "Cách xử lý: Nhấn phần Ba Mẹ cần nghe nhất, đề nghị hẹn lại"
      ]
    },
    {
      "id": "T5.4",
      "who": "tt",
      "q": "Ba Mẹ nói thay con, ngắt lời con",
      "say": "{goi} để {be} thử trả lời trước nhé, {goi} bổ sung sau giúp {xung} ạ.",
      "points": [
        "Cách xử lý: Đồng cảm, xin để con thử"
      ]
    },
    {
      "id": "T5.5",
      "who": "tt",
      "q": "Ba Mẹ chê con trước mặt con",
      "say": "{xung} thấy {goi} rất để tâm. Phần {goi} lo, {xung} xin trao đổi riêng với {goi} ở cuối buổi ạ.",
      "points": [
        "Cách xử lý: Chuyển sang điểm sáng, hẹn nói riêng"
      ]
    },
    {
      "id": "T5.6",
      "who": "tt",
      "q": "Có Ba hoặc ông bà ngồi cùng, ý kiến khác nhau",
      "say": "{xung} xin hỏi cả Ba và Mẹ: mỗi người thấy {be} nổi bật ở điểm nào ạ?",
      "points": [
        "Cách xử lý: Hỏi từng người, không chọn phe"
      ]
    },
    {
      "id": "T5.7",
      "who": "tt",
      "q": "Ba Mẹ than phiền dài, lan man",
      "say": "{xung} tóm lại {goi} lo hai điều: [A] và [B]. {goi} muốn {xung} ưu tiên điều nào trước ạ?",
      "points": [
        "Cách xử lý: Tóm 1 câu, chọn 1 việc"
      ]
    },
    {
      "id": "T5.8",
      "who": "tt",
      "q": "Bé không hợp tác, khóc, chán",
      "say": "Bạn nào buổi đầu cũng có lúc như vậy ạ. Ở nhà, lúc nào {be} thoải mái nhất ạ?",
      "points": [
        "Cách xử lý: Trainer đổi hoạt động, cho nghỉ 1 phút; Sales trấn an Ba Mẹ"
      ]
    },
    {
      "id": "T5.9",
      "who": "tt",
      "q": "Ba Mẹ hỏi giá ngay từ đầu",
      "say": "{xung} sẽ nói rõ cuối buổi, gồm chương trình {be} được học và những gì {goi} nhận được, rồi mới tới học phí để {goi} có đủ thông tin. Trước đó, {goi} quan tâm nhất điều gì khi chọn lớp cho con ạ?",
      "points": [
        "Cách xử lý: Hẹn nói rõ cuối buổi, nói giá trị trước rồi mới báo học phí, hỏi lại điều Ba Mẹ quan tâm"
      ]
    },
    {
      "id": "T5.10",
      "who": "tt",
      "q": "Mất mạng, lag, rớt cuộc gọi",
      "say": "Gửi link dự phòng, hẹn bù",
      "points": [],
      "verify": "Quy trình dự phòng khi mất mạng, lag, rớt cuộc gọi chưa có. Ban Giáo Vụ điền rồi mới dùng."
    },
    {
      "id": "T5.11",
      "who": "tt",
      "q": "Kho câu hỏi: hỏi về con (dễ trả lời nhất)",
      "say": "{be} thích làm gì nhất vào cuối tuần ạ?",
      "points": [
        "Cách xử lý: Ba Mẹ ngại, mới bắt đầu"
      ]
    },
    {
      "id": "T5.12",
      "who": "tt",
      "q": "Kho câu hỏi: câu chọn",
      "say": "Con học bài buổi sáng hay buổi tối thì tỉnh hơn ạ?",
      "points": [
        "Cách xử lý: Ba Mẹ chỉ “dạ”"
      ]
    },
    {
      "id": "T5.13",
      "who": "tt",
      "q": "Kho câu hỏi: thang điểm",
      "say": "{goi} chấm {be} mấy điểm trên thang 10 ở việc [A] ạ?",
      "points": [
        "Cách xử lý: Ba Mẹ khó diễn đạt"
      ]
    },
    {
      "id": "T5.14",
      "who": "tt",
      "q": "Kho câu hỏi: nhớ lại một lần cụ thể (gợi điểm sáng)",
      "say": "Lần gần nhất {be} làm điều gì khiến {goi} tự hào ạ?",
      "points": [
        "Cách xử lý: Ba Mẹ đang lo, nói toàn điều xấu"
      ]
    },
    {
      "id": "T5.15",
      "who": "tt",
      "q": "Kho câu hỏi: quan sát ngay trong buổi",
      "say": "{goi} thấy con phản ứng thế nào ở phần vừa rồi ạ?",
      "points": [
        "Cách xử lý: Ba Mẹ đang xem nhưng im"
      ]
    },
    {
      "id": "T5.16",
      "who": "tt",
      "q": "Kho câu hỏi: hướng tới tương lai",
      "say": "Nếu 3 tháng nữa con tiến bộ, {goi} sẽ thấy con làm khác điều gì ạ?",
      "points": [
        "Cách xử lý: Ba Mẹ chưa rõ mong muốn"
      ]
    },
    {
      "id": "T5.17",
      "who": "tt",
      "q": "Kho câu hỏi: xin phép trước khi hỏi",
      "say": "{xung} hỏi {goi} một chút về {be}, {goi} có tiện không ạ?",
      "points": [
        "Cách xử lý: Ba Mẹ ngại bị hỏi nhiều"
      ]
    },
    {
      "id": "T6.1",
      "who": "tt",
      "q": "Giọng chia sẻ",
      "say": "{xung} gặp nhiều Ba Mẹ kể bé ở nhà học trước quên sau. Không biết ở nhà {be} có như vậy không ạ?",
      "points": [
        "Cách dùng: Kể một tình huống của các bé khác, chưa nhắc tên chương trình, kết bằng 1 câu hỏi mở."
      ]
    },
    {
      "id": "T6.2",
      "who": "tt",
      "q": "Giọng giải pháp",
      "say": "Đi tiếp Giai đoạn 3 và 4.",
      "points": [
        "Cách dùng: Nêu vấn đề, nguyên nhân, chương trình hỗ trợ (giá trị trước), rồi bước tiếp theo."
      ]
    },
    {
      "id": "T6.3",
      "who": "tt",
      "q": "Ba Mẹ tương tác cao, ít hỏi về khóa học",
      "say": "Kể tình huống của bé khác, chưa nhắc tên chương trình. Chờ tín hiệu của Ba Mẹ rồi mới chuyển sang giải pháp.",
      "points": [
        "Cách dùng: Giọng chia sẻ"
      ]
    },
    {
      "id": "T6.4",
      "who": "tt",
      "q": "Ba Mẹ tương tác cao, chủ động hỏi về khóa học",
      "say": "Trả lời thẳng điều Ba Mẹ hỏi, giá trị trước. Đi tiếp Giai đoạn 3 và 4.",
      "points": [
        "Cách dùng: Giọng giải pháp"
      ]
    },
    {
      "id": "T6.5",
      "who": "tt",
      "q": "Ba Mẹ tương tác thấp, ít hỏi về khóa học",
      "say": "Hỏi tối đa 3 câu mở, không ép. Dùng giọng chia sẻ; Ba Mẹ cởi mở hơn thì mới sang giọng giải pháp.",
      "points": [
        "Cách dùng: Câu hỏi mở rồi giọng chia sẻ"
      ]
    },
    {
      "id": "T6.6",
      "who": "tt",
      "q": "Ba Mẹ tương tác thấp nhưng hỏi thẳng về khóa học",
      "say": "Trả lời ngắn gọn rồi hỏi lại 1 câu mở.",
      "points": [
        "Cách dùng: Đáp ngắn, hỏi lại một câu"
      ]
    },
    {
      "id": "T6.7",
      "who": "tt",
      "q": "Ba Mẹ ngại chia sẻ",
      "say": "(1) Chia sẻ trước một tình huống của bé khác: “Nhiều Ba Mẹ kể với {xung} là…”. (2) Hỏi bằng thang điểm hoặc câu chọn. (3) Hỏi về con, không hỏi về Ba Mẹ. (4) Cho Ba Mẹ quan sát trước, đến Giai đoạn 2 mới hỏi 1 câu xác nhận. (5) Vẫn ngại: giữ giọng chia sẻ, chốt bằng báo cáo viết ở Giai đoạn 5.",
      "points": [
        "Cách dùng: 5 cách theo thứ tự"
      ]
    },
    {
      "id": "T6.8",
      "who": "tt",
      "q": "“Ba Mẹ cần suy nghĩ thêm”",
      "say": "Dạ vâng, {xung} hiểu ạ. Để {goi} cân nhắc dễ hơn, {goi} đang còn lăn tăn điều gì nhất: nội dung, thời gian hay việc {be} có hợp không ạ?",
      "points": [
        "Cách dùng: Hỏi điều đang lăn tăn"
      ]
    },
    {
      "id": "T6.9",
      "who": "tt",
      "q": "“Con đã học nhiều lớp rồi, sợ quá tải”",
      "say": "{xung} hiểu ạ. Buổi học ngắn, nhiệm vụ vừa sức, và Trainer sẽ xếp nhịp theo lịch của con. {goi} muốn {xung} gợi ý lịch thế nào cho khỏi nặng ạ?",
      "points": [
        "Cách dùng: Nói về nhịp học nhẹ, hỏi lịch"
      ]
    },
    {
      "id": "T6.10",
      "who": "tt",
      "q": "“Học online sợ con không tập trung”",
      "say": "Đúng là nhiều Ba Mẹ lo điều này ạ. Trong 30 phút hôm nay, {goi} thấy {be} giữ được [điều quan sát được] chứ ạ?",
      "points": [
        "Cách dùng: Dùng điều vừa quan sát trong buổi"
      ]
    },
    {
      "id": "T6.11",
      "who": "tt",
      "q": "“Ở xa cơ sở, khó đi lại”",
      "say": "Với nhà mình, học Online 1:1 là lựa chọn thuận tiện, không cần đi lại. Nếu sau này {goi} muốn gặp trực tiếp, {xung} sắp lịch sau ạ.",
      "points": [
        "Cách dùng: Gợi ý Online 1:1"
      ]
    },
    {
      "id": "T6.12",
      "who": "tt",
      "q": "Quy tắc chung",
      "say": "Không ép chốt khi Ba Mẹ chưa nói ra được lý do. Nếu vẫn do dự, quay về mốc hẹn 15 phút ở Giai đoạn 5.",
      "points": [
        "Cách dùng: Nghe hết, đồng cảm một câu, trả lời ngắn, quay lại mong muốn của Ba Mẹ"
      ]
    }
  ]
};
