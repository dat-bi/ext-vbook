# Video Extension Mẫu (Video Template)

Bản mẫu chuẩn dành cho các tiện ích xem phim / video.

> [!TIP]
> **KHÔNG CẦN COPY THỦ CÔNG**: Hãy sử dụng lệnh `vbook create <name> -t video` để tự động tạo một extension mới dựa trên bản mẫu này.

## Quy trình phát triển

1.  **Khởi tạo**: `vbook create my-video -s https://video-site.com -t video`
2.  **Cấu hình**: 
    -   `detail.js`: Đảm bảo trả về `format: "series"`.
    -   `chap.js`: Trả về danh sách các Server/Nguồn.
    -   `track.js`: Xử lý bóc tách link video thực tế (native hoặc auto/M3U8).
3.  **Kiểm tra**: `vbook validate && vbook test-all`
4.  **Phát hành**: `vbook publish --my`

## Files

- `plugin.json` — metadata & script mapping
- `icon.png` — 64x64 icon (replace TODO icon)
- `src/config.js` — BASE_URL (MUST use `let`, NOT `const`)
- `src/home.js` — home tabs
- `src/genre.js` — genre list
- `src/gen.js` — video list (newest, hot, by genre)
- `src/search.js` — search
- `src/detail.js` — video detail (returns `format: "series"`)
- `src/toc.js` — episode list (returns episode links & section headers)
- `src/chap.js` — returns list of streams/servers
- `src/track.js` — handles final media URL extraction (native/auto)

## Video Playback Flow

```text
chap.js
   ↓
List Track (mỗi track = 1 server / 1 nguồn)
   ↓
User chọn Track
   ↓
track.js
   ↓
Trả về:
    - data (url)
    - type (auto | native)
   ↓
Resolve URL
   ↓
┌───────────────┬──────────────────────┐
│ native        │ auto                 │
│               │                      │
│ Dùng trực tiếp│ Load WebView         │
│               │ → bắt request video  │
│               │ → lấy link thật      │
└───────────────┴──────────────────────┘
   ↓
Video URL cuối (m3u8 / mp4)
   ↓
Play bằng ExoPlayer
```