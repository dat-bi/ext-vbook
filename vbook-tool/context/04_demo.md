# 04_demo.md - Extension Contracts

Use templates from `templates/_demo_novel`, `templates/_demo_comic`, `templates/_demo_video`, `templates/_demo_translate`, and `templates/_demo_tts`. Do not write a new extension from nothing unless a template cannot fit.

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
   ├─ page.js      required for novel/comic/chinese_novel
   ├─ toc.js       required
   ├─ chap.js      required
   ├─ suggests.js  optional recommended-book list
   └─ track.js     required for video
```

Translate extensions use this smaller contract:

```text
extensions/<name>/
├─ plugin.json
└─ src/
   ├─ language_list.js
   ├─ language.js
   └─ translate.js
```

TTS extensions use this smaller contract:

```text
extensions/<name>/
├─ plugin.json
└─ src/
   ├─ voice_list.js
   ├─ voice.js
   └─ tts.js
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
| `suggests.js` | `execute(input)` | `[{name, link, cover, description?, host, tag?}]` |
| `page.js` novel/comic/chinese_novel | `execute(url)` | `[urlString, ...]` |
| `toc.js` | `execute(url)` | `[{name, url, host, pay?}]` |
| `chap.js` novel/comic | `execute(url)` | HTML string |
| `chap.js` video | `execute(url)` | `[{title, data}]` |
| `track.js` video | `execute(url)` | `{data, type, headers?, host?, timeSkip?}` |
| `language.js` translate | `execute()` | `[{id}, ...]` |
| `translate.js` translate | `execute(text, from, to, apiKey)` | translated string |
| `voice.js` TTS | `execute()` | `[{id, language}, ...]` |
| `tts.js` TTS | `execute(text, voice)` | audio base64 string |

## Data Flow

```text
home -> gen -> detail -> page -> toc -> chap
search -> detail -> page -> toc -> chap
genre -> gen -> detail -> page -> toc -> chap
detail.suggests -> suggests -> detail -> page -> toc -> chap
video: chap -> track
translate: language -> translate
tts: voice -> tts
```

## Translate Config

Translate extensions can declare primitive runtime flags directly in `plugin.json.config`:

```json
{
  "config": {
    "support_auto_detect": true,
    "max_line": 1000,
    "max_length": 50000,
    "required_api_key": false,
    "support_url": "https://provider.example"
  }
}
```

When the provider needs user input, add object config items. `default` is optional; omit it when the app should show an empty value.

```json
{
  "api_keys": { "title": "Gemini API Keys", "mode": "input", "format": "text" },
  "model": { "title": "Model", "mode": "input", "format": "text", "default": "default-model" },
  "temp": { "title": "Temperature", "mode": "input", "format": "number", "default": 0.5 }
}
```

Advanced translate configs often combine primitive app flags and interactive fields:

```json
{
  "config": {
    "support_auto_detect": true,
    "max_length": 20000,
    "max_line": 5000,
    "support_url": "https://gemini.google.com",
    "api_keys": { "title": "Gemini API Keys", "mode": "input", "format": "text" },
    "temp": { "title": "Temperature", "mode": "input", "format": "number", "default": 0.5 },
    "topP": { "title": "TopP", "mode": "input", "format": "number", "default": 0.5 },
    "topK": { "title": "TopK", "mode": "input", "format": "number", "default": 20 },
    "modelsavecache": { "title": "Cache models, one per line", "mode": "input", "format": "text", "default": "model-a\nmodel-b" },
    "listprompts": { "title": "Prompt names, one per line", "mode": "input", "format": "text" },
    "use_loc_name": { "title": "Use name filter? 1 yes, 2 no", "mode": "input", "format": "number", "default": 2 }
  }
}
```

Use helpers for multi-line lists and numeric fields:

```js
function configList(value, fallback) {
    if (typeof value === "undefined") return fallback || [];
    var raw = String(value).replace(/^"([\s\S]*)"$/, "$1");
    var lines = raw.split("\n");
    var out = [];
    for (var i = 0; i < lines.length; i++) {
        var s = lines[i].trim();
        if (s) out.push(s);
    }
    return out;
}

function configNumber(value, fallback, isFloat) {
    if (typeof value === "undefined") return fallback;
    var raw = String(value).replace(/"/g, "");
    var n = isFloat ? parseFloat(raw) : parseInt(raw, 10);
    return isNaN(n) ? fallback : n;
}
```

## TTS Config

TTS extensions commonly use:

```json
{
  "config": {
    "preload_size": 3,
    "max_length": 200,
    "required_api_key": false,
    "support_url": "https://provider.example"
  }
}
```

`tts.js` returns audio base64. If the provider returns a URL, fetch and convert only when the VBook runtime requires base64 for that provider path.

## config.js Pattern

```js
let BASE_URL = "https://domain.com";
try { if (CONFIG_URL) BASE_URL = CONFIG_URL; } catch (e) {}
```

## plugin.json Config Contract

Use `plugin.json.config` when the extension needs user-provided values such as host, username, password, API key, token, or model name. Each key becomes a global variable in VBook scripts.

```json
{
  "config": {
    "username": { "title": "Tai khoan", "mode": "input", "format": "text", "default": "" },
    "password": { "title": "Mat khau", "mode": "input", "format": "text", "default": "" }
  }
}
```

Required fields per config item:

- `title`: label shown in app config UI.
- `mode`: usually `input` for typed values.
- `format`: usually `text` or `number`; use the app-supported format only after testing.
- `default`: optional default value. Use string defaults for `format: "text"` and numeric defaults for `format: "number"`.

Sanitize config globals before use:

```js
function configText(name) {
    try {
        var raw = this[name];
        raw = raw === undefined || raw === null ? "" : String(raw);
        raw = raw.replace(/"/g, "").trim();
        return raw;
    } catch (e) {
        return "";
    }
}
```

If login returns `otp_required`, report/handle that state explicitly. Do not fake a token.

For host config, normalize quotes and fallback:

```js
var config_host = (function() {
    var raw = "";
    try { if (typeof host !== "undefined") raw = host; } catch (e) {}
    raw = String(raw || "").replace(/"/g, "").trim();
    return raw || "http://localhost:1122";
})();
```

## suggests Pattern

`detail.js` must not return recommended books directly as `suggests` actions. Use one source action:

```js
detail.suggests = [{
    title: "Truyen de xuat",
    input: JSON.stringify(recommendedBooks),
    script: "suggests.js"
}];
```

Then `suggests.js` parses that input and returns normal book items with `name`, `link`, `cover`, and `host`.

## page.js Minimum

Always create `page.js` for novel, comic, and chinese_novel extensions.

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
