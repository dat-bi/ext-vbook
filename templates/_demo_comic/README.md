# Comic Extension Mẫu (Comic Template)

Bản mẫu chuẩn dành cho các tiện ích đọc truyện tranh (Comic).

> [!TIP]
> **KHÔNG CẦN COPY THỦ CÔNG**: Hãy sử dụng lệnh `vbook create <name> -t comic` để tự động tạo một extension mới dựa trên bản mẫu này.

## Khác biệt so với Novel

| Tính chất | Novel (Truyện chữ) | Comic (Truyện tranh) |
|:---|:---|:---|
| **Dữ liệu chap** | HTML (văn bản) | Mảng chứa URL ảnh |
| **Mục lục** | Danh sách phẳng | Có thể chia theo Volume/Server |
| **Kích thước ảnh** | Nhỏ (Portrait) | Lớn (Full width) |

## Quy trình phát triển

1.  **Khởi tạo**: `vbook create my-comic -s https://manga-site.com -t comic`
2.  **Cấu hình**: Chỉnh sửa selectors trong `src/` (Tập trung vào phần lấy list ảnh trong `chap.js`).
3.  **Kiểm tra**: `vbook validate && vbook debug`
4.  **Phát hành**: `vbook publish --my`