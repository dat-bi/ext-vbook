# 📚 VBook Extensions Hub

Chào mừng bạn đến với kho lưu trữ tiện ích mở rộng (extensions) dành cho ứng dụng **VBook**. Đây là trung tâm quản lý các plugin cho Truyện chữ, Truyện tranh và các nguồn nội dung từ Trung Quốc/Quốc tế.

Dự án này được xây dựng và quản lý bằng quy chuẩn chuyên nghiệp, đi kèm với các công cụ hỗ trợ phát triển tối ưu cho AI và lập trình viên.

---

## 📲 Cách sử dụng trên ứng dụng VBook

Để cài đặt các tiện ích này vào ứng dụng VBook trên điện thoại:

1. Copy địa chỉ URL của danh sách plugin (registry):
   `https://raw.githubusercontent.com/dat-bi/ext-vbook/main/plugin.json`
2. Mở ứng dụng **VBook** → **Cài đặt** → **Kho tiện ích**.
3. Nhấn **Thêm kho** và dán URL vào.
4. Làm mới danh sách và bắt đầu cài đặt các tiện ích bạn muốn!

---

## 📂 Cấu trúc dự án

- **[`/extensions`](file:///d:/github/ext-vbookb/extensions)**: Thành phần cốt lõi của dự án. Chứa mã nguồn của tất cả các tiện ích đã hỗ trợ. Mỗi tiện ích bao gồm các script tối ưu: Trang chủ (Home), Chi tiết (Detail), Mục lục (TOC), và Nội dung chương (Chap).
- **[`/templates`](file:///d:/github/ext-vbookb/templates)**: Chứa các mẫu `_demo_*` dùng để scaffold extension mới; không publish vào kho plugin.
- **[`/assets`](file:///d:/github/ext-vbookb/assets)**: Chứa tài nguyên dùng chung như ảnh bìa và file mẫu không phải plugin.
- **[`/vbook-tool`](file:///d:/github/ext-vbookb/vbook-tool)**: Bộ công cụ CLI chuyên nghiệp cho lập trình viên (và AI). Bao gồm các tính năng tự động tạo khung (scaffold), kiểm tra tương thích Rhino, và đồng bộ kiểm tra trên thiết bị thật.
- **[`/vbook-tool/context`](file:///d:/github/ext-vbookb/vbook-tool/context)**: Tiêu chuẩn phát triển dành cho AI. Chứa bootstrap đầu phiên, quy tắc Rhino runtime, workflow, contract script và playbook xử lý web khó.
- **[`plugin.json`](file:///d:/github/ext-vbookb/plugin.json)**: Danh sách tổng hợp toàn bộ tiện ích, giúp đồng bộ hóa dữ liệu với ứng dụng di động.

---

## 🛠 Dành cho nhà phát triển (Developers)

Chúng tôi sử dụng quy trình phát triển hỗ trợ bởi AI để đảm bảo các tiện ích luôn hoạt động ổn định và chính xác.

### Bắt đầu nhanh

1. **Cài đặt công cụ**:
   ```bash
   cd vbook-tool
   npm install
   # (Tùy chọn) npm link  # nếu bạn muốn dùng lệnh `vbook` global
   ```

2. **Cấu hình**:
   Copy `.env.example` (hoặc tạo file `.env`) trong thư mục `vbook-tool/` và thiết lập `VBOOK_IP` theo địa chỉ IP hiển thị tại tab "Web Server" trên ứng dụng VBook.

3. **Chạy CLI ổn định trên mọi máy (không cần PATH / npm link)**:
   - Windows (PowerShell): `.\vbook-tool\vbook.ps1 <command>`
   - Windows (CMD): `.\vbook-tool\vbook.cmd <command>`
   - macOS/Linux: `./vbook-tool/vbook <command>`

3. **Tìm hiểu quy trình**:
   Vui lòng đọc kỹ [Bootstrap đầu phiên](file:///d:/github/ext-vbookb/vbook-tool/context/00_BOOTSTRAP.md), [Quy trình làm việc tiêu chuẩn](file:///d:/github/ext-vbookb/vbook-tool/context/02_workflow.md) và [Các ràng buộc Rhino Runtime](file:///d:/github/ext-vbookb/vbook-tool/context/01_runtime.md) trước khi đóng góp.

Để xem chi tiết các lệnh CLI, hãy tham khảo [VBook Tool README](file:///d:/github/ext-vbookb/vbook-tool/README.md).

---

## 🛡️ Tiêu chuẩn phát triển

Tất cả tiện ích trong kho lưu trữ này phải tuân thủ các tiêu chuẩn chất lượng:
- **Tương thích Rhino**: Không sử dụng `async/await`, optional chaining (`?.`), hoặc nullish coalescing (`??`).
- **An toàn dữ liệu (Null-Safety)**: Luôn chuẩn hóa dữ liệu sau khi parse bằng Java-string (`+ ""`).
- **Hợp đồng dữ liệu**: Đảm bảo kết quả trả về từ hàm `execute()` đúng định dạng yêu cầu của hệ thống.

---

## 🤝 Đóng góp

Chúng tôi luôn hoan nghênh các tiện ích mới! Vui lòng sử dụng lệnh `vbook create` để tạo khung dự án mới, đảm bảo tiện ích của bạn khớp với cấu trúc và tiêu chuẩn chất lượng của dự án.

---

*Được quản lý bởi **B** — Dành cho cộng đồng VBook.*
