# 04_demo.md — Script Contracts & Data Flow Reference

> Tài liệu này CHỈ chứa: contracts, data flow, directory structure.
> **Code mẫu thực tế** nằm trong `templates/_demo_novel/`, `templates/_demo_comic/`, `templates/_demo_video/`.
> Khi tạo extension mới → dùng `copy_demo` hoặc `create_extension_flow`, KHÔNG viết từ đầu.

---

## Directory Structure

```
ext-name/
├── plugin.json*       (required)
├── icon.png*          (64x64)
└── src/
    ├── config.js      (required — BASE_URL + CONFIG_URL override)
    ├── detail.js*     (required)
    ├── page.js*       (required — intermediary between detail and toc)
    ├── toc.js*        (required)
    ├── chap.js*       (required)
    ├── track.js*      (required if type = video)
    ├── home.js        (optional)
    ├── genre.js       (optional)
    ├── gen.js         (optional — generic list for home/genre)
    ├── search.js      (optional)
    └── comment.js     (optional)
```

---

## Data Flow

### Home / Genre → Book List

```
home.js → execute()
  └─ returns [{title, input, script}]
       └─ gen.js → execute(url=input, page="1")
            └─ returns [{name, link, cover, host}], next
                 └─ gen.js → execute(url=input, page=next)  ← loops until next=null
```

### Detail → TOC → Chapter

```
detail.js → execute(url)          → {name, cover, host, author, ongoing, ...}
page.js   → execute(url)          → [pageUrl1, pageUrl2, ...]   ← ALWAYS an array
toc.js    → execute(url)          → [{name, url, host}]         ← one call per page
chap.js   → execute(url)          → htmlString (novel/comic) or [{title, data}] (video)
track.js  → execute(url)          → {data, type, headers, host} ← video only
```

### Search

```
search.js → execute(key, page)    → [{name, link, cover, host}], next
```

---

## Script Contracts

| Script | Signature | Returns |
|--------|-----------|---------|
| `home` | `execute()` | `[{title*, input*, script*}]` |
| `genre` | `execute()` | `[{title*, input*, script*}]` |
| `gen` | `execute(url, page)` | `[{name*, link*, cover?, host?}]`, next? |
| `search` | `execute(key, page)` | `[{name*, link*, cover?, host?}]`, next? |
| `detail` | `execute(url)` | `{name*, cover, host, author, ongoing*, genres?, suggests?, comments?}` |
| `page` | `execute(url)` | `[urlString, ...]` — **ALWAYS array, min 1 element** |
| `toc` | `execute(url)` | `[{name*, url*, host?, pay?}]` |
| `chap` (novel) | `execute(url)` | `htmlString` |
| `chap` (video) | `execute(url)` | `[{title*, data*}]` |
| `track` | `execute(url)` | `{data*, type*, headers?, host?, timeSkip?}` |
| `comment` | `execute(input, next)` | `[{name, content, description}]`, next? |

> **`next`** phải là **string** hoặc **null** — KHÔNG phải number.

---

## plugin.json Fields

| Field | Required | Description |
|-------|----------|-------------|
| `metadata.name` | ✅ | Tên hiển thị |
| `metadata.author` | ✅ | Đọc từ `.env` |
| `metadata.version` | ✅ | Bắt đầu từ 1 |
| `metadata.source` | ✅ | Base URL |
| `metadata.regexp` | ✅ | Match detail URL only, kết thúc `\\/?$` |
| `metadata.type` | ✅ | `novel` / `comic` / `video` |
| `metadata.tag` | optional | `18+` nếu NSFW |
| `script.*` | ✅ | Paths không có prefix `src/` |

---

## config.js Pattern (Bắt buộc)

```js
// Dùng LET (không phải const) để VBook có thể inject CONFIG_URL
let BASE_URL = "https://domain.net";
try { if (CONFIG_URL) BASE_URL = CONFIG_URL; } catch (e) {}
```

---

## track.js Types

| `type` | Khi nào dùng |
|--------|--------------|
| `"native"` | URL direct: `.mp4`, `.m3u8` |
| `"auto"` | iframe/embed — VBook WebView tự bắt stream |

---

## Pre-publish Checklist (tự động khi gọi `publish`)

- [ ] Tất cả script trong `plugin.json` phải có file tương ứng
- [ ] Video type → phải có `track.js` + `chap.js`
- [ ] `config.js` dùng `let BASE_URL` + có `CONFIG_URL` override
- [ ] `page.js` phải tồn tại

> Xem code mẫu đầy đủ tại: `templates/_demo_novel/`, `templates/_demo_comic/`, `templates/_demo_video/`
