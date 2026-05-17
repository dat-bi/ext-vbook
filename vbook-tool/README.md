# 🚀 VBook CLI Tool v2.0

Bộ công cụ CLI chuyên nghiệp để phát triển, kiểm thử và phát hành các tiện ích mở rộng (extensions) cho ứng dụng VBook. Công cụ này được thiết kế tối ưu cho quy trình làm việc kết hợp giữa Lập trình viên và AI.

---

## 🛠 Cài đặt & Thiết lập

### 1. Cài đặt môi trường
```bash
cd vbook-tool
npm install
# (Tùy chọn) npm link     # Nếu bạn muốn dùng lệnh `vbook` global
```

### 2. Cấu hình nhanh (.env)
Tạo file `.env` trong thư mục `vbook-tool/` với các nội dung sau:
```env
author=TenCuaBan             # Tên tác giả mặc định cho extension mới
VBOOK_IP=192.168.1.XX       # IP fallback, lấy từ tab "Web Server" trong app VBook
VBOOK_IPS=192.168.1.10,192.168.1.11  # Tùy chọn: nhiều IP, tool tự chọn máy đang online
VBOOK_PORT=8080             # Mặc định là 8080
GITHUB_REPO=user/repo       # Repo GitHub để gen link tải plugin.zip
```

### 3. Chạy CLI ổn định (không cần PATH / npm link)
- Windows (PowerShell): `.\vbook.ps1 <command>`
- Windows (CMD): `.\vbook.cmd <command>`
- macOS/Linux: `./vbook <command>`

---

## 📋 Danh sách lệnh (Command Reference)

| Lệnh | Mô tả | Ví dụ |
|:---|:---|:---|
| `vbook check-env` | Kiểm tra kết nối với thiết bị và file .env | `vbook check-env` |
| `vbook analyze` | AI tự động tìm CSS Selector từ URL | `vbook analyze <url>` |
| `vbook create` | Tạo nhanh khung extension từ Template | `vbook create my-ext` |
| `vbook validate` | Kiểm tra lỗi cú pháp và tương thích Rhino | `vbook validate` |
| `vbook debug` | Chạy thử 1 file script duy nhất lên máy thật | `vbook debug src/toc.js` |
| `vbook test-all` | Chạy chuỗi kiểm thử tự động (Home -> Chap) | `vbook test-all` |
| `vbook install` | Cài đặt nóng extension đang sửa lên máy | `vbook install` |
| `vbook build` | Nén extension thành file `plugin.zip` | `vbook build --bump` |
| `vbook publish` | Build và cập nhật danh sách Registry tổng | `vbook publish --my` |

---

## 🏗️ Lệnh `vbook create` — Khởi tạo Extension thông minh

Lệnh `vbook create` hiện đã được nâng cấp để sử dụng các bản mẫu (demos) chất lượng cao thay vì các bản mẫu thô sơ.

### Cách hoạt động:
1.  **Nhận diện loại**: Dựa trên tham số `-t` (`novel`, `comic`, `video`), công cụ sẽ tìm thư mục mẫu tương ứng trong `templates/_demo_<type>`.
2.  **Sao chép và Thay thế**: Toàn bộ mã nguồn mẫu sẽ được copy sang extension mới. Các giá trị placeholders sẽ được tự động đổi tên:
    -   `DEMO_NOVEL`, `DEMO_VIDEO`... -> Tên extension của bạn.
    -   `TODO_AUTHOR` -> Tên tác giả lấy từ `.env`.
    -   `https://TODO_DOMAIN.net` -> URL trang web bạn cung cấp.
3.  **Hỗ trợ Tự động**: Nếu file script sử dụng `BASE_URL` mà chưa định nghĩa, công cụ sẽ tự động chèn định nghĩa URL gốc vào đầu file.

### Ví dụ:
```bash
# Tạo extension truyện chữ
vbook create my-novel -s https://novel-site.com -t novel

# Tạo extension phim/video
vbook create my-movie -s https://movie-site.com -t video
```

---

## 💡 Quy trình làm việc tiêu chuẩn

1. **Khởi tạo**: Sử dụng `vbook analyze` để lấy gợi ý selector, sau đó `vbook create` để tạo folder.
2. **Phát triển**: Viết mã trong thư mục `src/`.
3. **Kiểm tra**: Chạy `vbook validate` thường xuyên để tránh lỗi Rhino (không dùng `async`, `await`, `?.`, `??`).
4. **Debug**: Sử dụng `vbook debug` để xem kết quả trả về của từng script trên máy thật.
5. **Publish**: Khi đã ổn định, dùng `vbook publish --my` để nén và cập nhật vào file `plugin.json` tổng của dự án.

---

## 🛡️ Quy tắc & Ràng buộc quan trọng

### 1. Quy tắc thư mục (Directory Rules)
- `templates/_demo_novel`, `templates/_demo_comic`, `templates/_demo_video` là **Template/Demo** để scaffold extension mới.
- `extensions/` chỉ chứa plugin thật. Lệnh `publish` và `build` hàng loạt chỉ quét `extensions/`, không quét `templates/`.

### 2. Logic Publish thông minh
Lệnh `vbook publish` đi kèm với các cơ chế tối ưu:
- **`--my`**: Chỉ build những extension có `author` khớp với tên bạn trong `.env`.
- **Tự động bỏ qua (Skip)**: Nếu `version` trong `plugin.json` của extension bằng hoặc nhỏ hơn version đang có trên Registry (`plugin.json` gốc), công cụ sẽ không build lại file zip để tiết kiệm tài nguyên. Bạn cần tăng version (bump version) nếu muốn cập nhật bản mới.

### 3. Ràng buộc Rhino Runtime
Do VBook chạy trên engine Rhino, bạn **tuyệt đối không** được sử dụng các cú pháp JavaScript hiện đại sau:
- ❌ `async` / `await`
- ❌ Optional chaining (`obj?.prop`)
- ❌ Nullish coalescing (`a ?? b`)
- ❌ Spread operator trong gọi hàm (`func(...args)`)
- ❌ Default parameters (`function f(a=1)`)

---

## 🔌 Tích hợp MCP Server (Cho AI)
Công cụ này tích hợp sẵn một MCP Server tại `vbook-tool/vbook-mcp-server.js`. Khi kết nối với các AI Agent (như Claude, Antigravity), AI có thể tự động thực hiện toàn bộ quy trình từ phân tích, code đến kiểm thử trên thiết bị thật của bạn.

---
*Phát triển bởi B - Tối ưu cho AI-First Development.*
