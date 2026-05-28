# 03_lessons.md - Lessons Index

Keep this file short. Add only reusable lessons that change future decisions.

## Current Lessons

1. Verify `icon.png` after scaffold. Some favicon downloads return HTML/SVG instead of PNG.
2. `regexp` should match detail URLs only and should be strict enough to avoid false matches.
3. `page.js` is required. If no TOC pagination exists, return `[url]`.
4. Prefer stable API endpoints over brittle HTML selectors.
5. Use `fetch()` before `Engine.newBrowser()` unless JS rendering or protection requires a browser.
6. For AJAX/POST endpoints, copy required headers, body format, and cookies from discovery.
7. Sort chapters when API order is unstable.
8. Convert `.text()`, `.attr()`, `.html()` to JS strings with `+ ""`.
9. Avoid generic selectors unless verified on the real page.
10. Avoid `tagName()`, `is()`, and `tag()` in VBook scripts unless tested.

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