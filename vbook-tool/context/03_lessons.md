# 03_lessons.md - Lessons Index

Keep this file short. Add only reusable lessons that change future decisions.

## Current Lessons

1. Verify `icon.png` after scaffold. Some favicon downloads return HTML/SVG instead of PNG.
2. `regexp` should match detail URLs only and should be strict enough to avoid false matches.
3. `page.js` is required for novel/comic/chinese_novel. If no TOC pagination exists, return `[url]`.
4. Prefer stable API endpoints over brittle HTML selectors.
5. Use `fetch()` before `Engine.newBrowser()` unless JS rendering or protection requires a browser.
6. For AJAX/POST endpoints, copy required headers, body format, and cookies from discovery.
7. Sort chapters when API order is unstable.
8. Convert `.text()`, `.attr()`, `.html()` to JS strings with `+ ""`.
9. Avoid generic selectors unless verified on the real page.
10. Avoid `tagName()`, `is()`, and `tag()` in VBook scripts unless tested.
11. `debug` runs scripts from the current workspace payload only. If the installed app still fails after debug passes, run `test_all`, then `install`, then verify the app UI.
12. API-backed sources still need `metadata.regexp` and returned URLs that route through the app. Detail, TOC, and chapter URLs must match the scripts that consume them.
13. `detail.suggests` is an action list. For recommended books, return one action pointing to `suggests.js`; let `suggests.js` return book items.
14. Account/password APIs may still require OTP or session cookies. Add config fields for credentials, but do not invent an OTP bypass; cache/use real tokens or cookies only when the API returns them.
15. `plugin.json.config` keys become VBook script globals. Primitive config flags are valid. Object config fields need `title`, `mode`, and `format`; `default` is optional and should match the format when present.
16. `translate` and `tts` extensions do not use novel/comic detail-page selectors. Use `language.js`/`translate.js` and `voice.js`/`tts.js` contracts, with primitive config flags such as `max_length`, `required_api_key`, and `support_url`.

## Hard Site Notes

Detailed hard-site strategies live in `03_HARD_SITES.md`.

## Add New Lessons In This Format

```md
## Short Title

Problem: one sentence.

Signal: how to detect it.

Fix: concrete rule or code pattern.
```


---

## CSRF Cookie May Live On Request Or localCookie

Problem: Some sites set `_csrfToken` during `fetch(BASE_URL)`, but VBook may not expose `set-cookie` in `response.headers`; scripts that only read headers can fall back to `Engine.newBrowser()` and timeout.

Signal: Node/curl with CSRF works, VBook `fetch(BASE_URL)` returns 200 HTML, `response.headers["set-cookie"]` is empty, and debug times out near the browser launch timeout.

Fix: After `fetch()`, check `response.request.headers.cookie`/`Cookie`, then `localCookie.getCookie()`, extract `_csrfToken`, cache it in `localStorage`, and avoid Browser fallback unless those cookie sources fail.


---

## Dev Fetch May Hit Cloudflare While VBook Fetch Works

Problem: Local curl/Node discovery can receive a Cloudflare challenge page even when VBook `fetch()` on the device can access the real HTML.

Signal: curl output title is `Just a moment...`, but VBook `debug` for the same URL returns status 200 with real selectors/data.

Fix: Treat local curl/Node output as suspect for protected sites. Use a temporary VBook debug/probe script to inspect `response.status`, `response.url`, title, selector counts, and sample links, then convert findings into normal Rhino-safe parser code.

---

## WordPress wp-pagenavi May Omit last/larger Links

Problem: Some WordPress paginated posts expose only `.wp-pagenavi a.page` and `a.nextpostslink`, so parsers that depend on `.last` or `.larger` return only the first page.

Signal: The article has `link[rel=next]` and `.wp-pagenavi` with numbered links, but `.last`/`.larger` selectors are empty in VBook debug.

Fix: Parse the maximum page number from all `.wp-pagenavi a[href]` href suffixes and numeric link text, then build page URLs from a normalized base URL without a trailing slash.

---

## ChillAudio TTS Streams MP3 Over SAMI WebSocket

Problem: ChillAudio TTS has no public mp3 URL; audio is generated per text chunk through CapCut/SAMI WebSocket.

Signal: HAR shows `POST /wp-json/epub-reader/v1/parse-url` for chapter text, then `wss://sami-normal-sg.capcutapi.com/internal/api/v1/ws` messages with `event:"StartTask"`, `namespace:"TTS"`, `audio_config.format:"mp3"`, and binary opcode 2 frames.

Fix: For TTS extensions, return the configured speaker IDs from `voice.js`; in `tts.js`, send `StartTask` over WebSocket, collect binary MP3 frames until `TaskEnd`/`TaskFinished`, then base64-encode the combined audio bytes.

---

## VBook Browser loadHtml Argument Order May Differ From Docs

Problem: On the tested app/runtime, `Engine.newBrowser().loadHtml(baseUrl, html)` loaded the base URL string as page content, so inline scripts never ran and TTS polling timed out.

Signal: A probe with `loadHtml("https://site/", "<html>...</html>")` returned body text `https://site/`; `callJs(...)` also returned an HTML wrapper like `<html><body>value</body></html>`.

Fix: Probe Browser behavior on the target app before relying on docs. For this runtime, use `loadHtml(html, baseUrl)` and unwrap `callJs` results from the returned HTML body before comparing values.
