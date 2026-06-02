# 05_repair.md - Repair Guide

Use this when an existing extension is broken.

## Required Order

1. `check_env`
2. Read `plugin.json` and relevant `src/*.js`.
3. Reproduce with `debug --json`.
4. Inspect/discover the current website.
5. Fix code.
6. `validate`
7. Re-run failing `debug`.
8. `test_all --from <step>`
9. `install` when validating behavior inside the app UI.
10. `build --bump`
11. `publish`

## Failure Map

| Symptom | First script to test |
| --- | --- |
| Detail page not recognized | `detail.js` |
| Empty home/list | `home.js`, then `gen.js` |
| Search empty | `search.js` |
| No chapters | `page.js`, then `toc.js` |
| Chapter unreadable | `chap.js` |
| Debug passes but app cannot open/read | `install`, then URL/regexp routing |
| Suggested/recommended books open wrong | `detail.js`, then `suggests.js` |
| Video not playing | `chap.js`, then `track.js` |
| Translate not working | `language.js`, then `translate.js` |
| TTS not speaking | `voice.js`, then `tts.js` |

## Diagnose Before Editing

Do not edit selectors from memory.

Use:

- VBook `debug --json` for the real exception.
- `analyze` / `inspect` / DOM tree for current structure.
- Node preflight for suspected API endpoints.
- Playwright/Chrome DevTools discovery for JS-rendered or hard sites.

## Common Fixes

### Selector changed

```js
var name = doc.select("REAL_SELECTOR_FROM_INSPECT").text() + "";
```

### Domain changed

Update both:

- `src/config.js`
- `plugin.json.metadata.source`
- `plugin.json.metadata.regexp`

### Encoding issue

```js
var doc = res.html("gbk");
var text = res.text("gbk");
```

### Fetch cannot see content

Use Browser API:

```js
var b = Engine.newBrowser();
try {
    b.setUserAgent(UserAgent.android());
    b.launch(url, 12000);
    var doc = b.html();
} finally {
    b.close();
}
```

### API found

Prefer API over HTML selectors if it is stable. Test API with Node preflight, then convert to Rhino-safe `fetch()`.

### CSRF cookie hidden

If Node/curl works after adding `_csrfToken`, but VBook debug times out while
trying to initialize a browser session, verify cookie sources on the device
before using `Engine.newBrowser()`:

```js
var response = fetch(BASE_URL);
var cookie = "";
try { cookie = response.headers["set-cookie"] || response.headers["Set-Cookie"] || ""; } catch (e) {}
try {
    if (!cookie && response.request && response.request.headers) {
        cookie = response.request.headers.cookie || response.request.headers.Cookie || "";
    }
} catch (e2) {}
try { if (!cookie) cookie = localCookie.getCookie() || ""; } catch (e3) {}
```

Extract `_csrfToken` from that cookie and cache it in `localStorage`.

### Debug passes but app UI still fails

`debug` sends a temporary payload to the device. It does not update the installed extension.

Run:

```bash
vbook validate
vbook debug src/detail.js -in "<real-detail-url>" --json
vbook debug src/toc.js -in "<real-toc-url>" --json
vbook debug src/chap.js -in "<real-chapter-url>" --json
vbook test-all --json
vbook install
```

If the app still cannot route, check `plugin.json.metadata.regexp` and make sure every returned `link`/`url` is accepted by the script that consumes it.

### Suggested books are wrong

`detail.suggests` is a list of actions, not book results. Use one action that calls `suggests.js`:

```js
suggests: [{
    title: "Truyen de xuat",
    input: JSON.stringify(recommendedBooks),
    script: "suggests.js"
}]
```

`suggests.js` returns the book list.

### Login needs account/password

Inspect the real login API first. Add `plugin.json.config.username` and `plugin.json.config.password`, sanitize those globals in `config.js`, and only use tokens/cookies returned by the real response. If the API returns OTP-required, do not invent an OTP bypass.

Config checklist:

- For object config fields, `plugin.json.config.<key>.title` exists.
- `mode` is set, usually `input`.
- `format` is set, usually `text` or `number`.
- `default` is optional. If present, match it to `format`: string for `text`, number for `number`.
- `config.js` reads the config global defensively and strips extra quotes.
- Multi-line text config is parsed with `String(value).replace(/^"([\s\S]*)"$/, "$1").split("\n")`.
- Number config is parsed with `parseFloat` or `parseInt` after stripping quotes.
- Secrets from HAR can be used for reproduction, but prefer user config and runtime login when the site supports it.

### Translate/TTS extension broken

Do not use novel/comic selectors for these types.

Translate:

```bash
vbook debug src/language.js --json
vbook debug src/translate.js -in "hello world" en vi "" --json
```

TTS:

```bash
vbook debug src/voice.js --json
vbook debug src/tts.js -in "xin chao" vi-VN --json
```

Check `plugin.json.metadata.type`, `plugin.json.script`, and the primitive config flags:

- translate: `support_auto_detect`, `max_line`, `max_length`, `required_api_key`, `support_url`.
- tts: `preload_size`, `max_length`, `required_api_key`, `support_url`.

## Publish Rule

Only publish after:

- `validate` has 0 errors.
- failing script debug passes.
- `test_all` passes or the skipped steps are explicitly irrelevant.
- `install` passes when the issue was observed in the app UI.
- `metadata.version` was bumped.
