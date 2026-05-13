# Extension Mẫu (Novel Template)

Đây là bản mẫu chuẩn dành cho các tiện ích đọc truyện chữ (Novel). 

> [!TIP]
> **KHÔNG CẦN COPY THỦ CÔNG**: Hãy sử dụng lệnh `vbook create <name> -t novel` để tự động tạo một extension mới dựa trên bản mẫu này.

## Quy trình phát triển

1.  **Khởi tạo**: `vbook create my-extension -s https://site.com -t novel`
2.  **Cấu hình**: Chỉnh sửa các selectors trong thư mục `src/` (Title, Cover, Content...).
3.  **Kiểm tra**: Sử dụng `vbook validate` để check lỗi cú pháp Rhino.
4.  **Chạy thử**: `vbook debug src/detail.js -in "https://site.com/truyen-1"`
5.  **Phát hành**: `vbook publish --my`

## Files

- `plugin.json` — metadata & script mapping
- `icon.png` — 64x64 icon (replace TODO icon)
- `src/config.js` — BASE_URL (MUST use `let`, NOT `const`)
- `src/home.js` — home tabs
- `src/genre.js` — genre list
- `src/gen.js` — book list (newest, hot, by genre)
- `src/search.js` — search
- `src/detail.js` — book detail
- `src/toc.js` — chapter list
- `src/chap.js` — chapter content