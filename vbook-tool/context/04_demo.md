# 04_demo.md - Extension Contracts

Use templates from `templates/_demo_novel`, `templates/_demo_comic`, and `templates/_demo_video`. Do not write a new extension from nothing unless a template cannot fit.

## Directory Contract

```text
extensions/<name>/
├─ plugin.json
├─ icon.png
├─ plugin.zip
└─ src/
   ├─ config.js
   ├─ home.js      optional
   ├─ genre.js     optional
   ├─ gen.js       optional list parser
   ├─ search.js    optional
   ├─ detail.js    required
   ├─ page.js      required
   ├─ toc.js       required
   ├─ chap.js      required
   └─ track.js     required for video
```

## plugin.json Contract

```json
{
  "metadata": {
    "name": "Display Name",
    "author": "B",
    "version": 1,
    "source": "https://domain.com",
    "regexp": "https?:\\/\\/(?:www\\.)?domain\\.com\\/truyen\\/[a-zA-Z0-9-]+\\/?$",
    "description": "...",
    "locale": "vi_VN",
    "language": "javascript",
    "type": "novel"
  },
  "script": {
    "detail": "detail.js",
    "page": "page.js",
    "toc": "toc.js",
    "chap": "chap.js"
  }
}
```

Rules:

- `script.*` values are file names only, never `src/file.js`.
- `regexp` should match detail pages, not every URL on the site.
- Increment `metadata.version` before publishing a changed extension.

## Script Return Contracts

| Script | Signature | Return |
| --- | --- | --- |
| `home.js` | `execute()` | `[{title, input, script}]` |
| `genre.js` | `execute()` | `[{title, input, script}]` |
| `gen.js` | `execute(url, page)` | `[{name, link, cover, host}], nextPage` |
| `search.js` | `execute(key, page)` | `[{name, link, cover, host}], nextPage` |
| `detail.js` | `execute(url)` | `{name, cover, host, author, description, detail, ongoing, genres?, suggests?, comments?}` |
| `page.js` | `execute(url)` | `[urlString, ...]` |
| `toc.js` | `execute(url)` | `[{name, url, host, pay?}]` |
| `chap.js` novel/comic | `execute(url)` | HTML string |
| `chap.js` video | `execute(url)` | `[{title, data}]` |
| `track.js` video | `execute(url)` | `{data, type, headers?, host?, timeSkip?}` |

## Data Flow

```text
home -> gen -> detail -> page -> toc -> chap
search -> detail -> page -> toc -> chap
genre -> gen -> detail -> page -> toc -> chap
video: chap -> track
```

## config.js Pattern

```js
let BASE_URL = "https://domain.com";
try { if (CONFIG_URL) BASE_URL = CONFIG_URL; } catch (e) {}
```

## page.js Minimum

Always create `page.js`.

```js
load("config.js");

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:www\.)?([^\/]+)/, BASE_URL);
    if (url.slice(-1) === "/") url = url.slice(0, -1);
    return Response.success([url]);
}
```

## Common Output Rules

- `host` should be the base URL.
- `ongoing: true` means still updating.
- `ongoing: false` means completed.
- VIP/locked chapters can include `pay: true`.
- `nextPage` must be string or `null`.
