# GMA Sales Hub

Kho công cụ cho đội Sales GMA Việt Nam. Dùng trên điện thoại và máy tính.

## Công cụ
- **Báo giá & trả góp**: chọn gói, ưu đãi mua chung (2 tài khoản -5%, 3 tài khoản -10%), tạo bill kèm mã QR chuyển khoản (VietQR) để lưu ảnh gửi phụ huynh.
- **Tin soạn sẵn**: điền thông tin, copy tin gửi nhóm Kinh Doanh x Kế toán, Kinh Doanh x Trainer.
- **KPI và thu nhập**: nhập doanh thu thực thu, xem hoa hồng, thưởng, mốc kế tiếp.
- **Kho**: sản phẩm, xử lý từ chối, quy trình, chính sách.

## Chạy thử
```
npm install
npm run dev
```

## Chỉnh nội dung
- Thông tin liên hệ, tài khoản nhận tiền, ưu đãi đang chạy: `src/config.js`
- Gói, giá, quà tặng, chính sách mua chung: `src/lib/pricing.js`
- Mẫu tin soạn sẵn và người được tag: `src/data/messageTemplates.js`
- Công thức KPI: `src/lib/kpi.js`
- Nội dung Kho: `src/data/knowledge.json`, `src/data/objections.json`

Công nghệ: Vite, React, Tailwind CSS.
