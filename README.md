# GÓC LỚP 12

Website tĩnh tiếng Việt dành cho học sinh lớp 12: cổng thông tin về áp lực học tập, tâm lý, định hướng tương lai, giải pháp, công cụ học tập, Góc học sinh và Góc Chill.

## Cấu trúc

```text
goc-lop-12/
├── index.html
├── ap-luc.html
├── giai-phap.html
├── cong-cu.html
├── goc-hoc-sinh.html
├── tim-ho-tro.html
├── goc-chill.html
└── assets/
    ├── css/
    │   └── style.css
    └── js/
        ├── main.js
        ├── advice.js
        ├── tools.js
        └── chill.js
```

## Các tính năng

- Điều hướng tương thích màn hình máy tính và điện thoại.
- Góc học sinh tạo gợi ý theo chủ đề/cảm xúc; phản hồi được tạo trong trình duyệt, không gửi lời nhắn lên máy chủ.
- Nút đọc gợi ý sử dụng giọng đọc có sẵn của trình duyệt (Web Speech API). Giọng tiếng Việt tùy thuộc thiết bị và trình duyệt.
- Công cụ học tập gồm danh sách việc cần làm (lưu cục bộ trong trình duyệt) và đồng hồ tập trung.
- Góc Chill có trò ghép cặp, câu đố vui và gợi ý hoạt động thư giãn ngắn.
- Không cần tài khoản, máy chủ ứng dụng hay khóa API.

## Chạy thử

Mở `index.html` trong trình duyệt. Để kiểm tra gần giống khi xuất bản, có thể dùng tiện ích Live Server trong VS Code.

## Đưa lên GitHub Pages

1. Tải ZIP này và giải nén.
2. Mở thư mục `goc-lop-12`.
3. Tải lên **các file và thư mục bên trong `goc-lop-12`** vào thư mục gốc repository để `index.html` nằm ngay ở thư mục gốc.
4. Trong GitHub, mở **Settings → Pages**.
5. Trong **Build and deployment**, chọn **Deploy from a branch**, chọn nhánh `main` và thư mục `/(root)`, rồi nhấn **Save**.
6. Chờ GitHub Pages hoàn tất triển khai, sau đó mở URL hiển thị tại Settings → Pages.

## Lưu ý

- Giữ nguyên cấu trúc `assets/css` và `assets/js`; các đường dẫn trong HTML tham chiếu đến đúng vị trí này.
- Nếu repository đang chứa website cũ, hãy sao lưu hoặc tạo nhánh trước khi thay thế.
- Góc học sinh sử dụng thư viện phản hồi viết sẵn theo chủ đề, cảm xúc và một số từ khóa. Đây chưa phải chatbot AI và không gửi lời nhắn đến máy chủ.
- Không nhập mật khẩu, địa chỉ nhà, số điện thoại hoặc thông tin nhận dạng cá nhân vào biểu mẫu chia sẻ.
- Các gợi ý trên website mang tính tham khảo, không thay thế hỗ trợ từ người lớn đáng tin cậy hay chuyên viên phù hợp.
