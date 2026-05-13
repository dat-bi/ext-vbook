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
