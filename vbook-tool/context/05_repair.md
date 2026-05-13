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
9. `build --bump`
10. `publish`

## Failure Map

| Symptom | First script to test |
| --- | --- |
| Detail page not recognized | `detail.js` |
| Empty home/list | `home.js`, then `gen.js` |
| Search empty | `search.js` |
| No chapters | `page.js`, then `toc.js` |
| Chapter unreadable | `chap.js` |
| Video not playing | `chap.js`, then `track.js` |

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

## Publish Rule

Only publish after:

- `validate` has 0 errors.
- failing script debug passes.
- `test_all` passes or the skipped steps are explicitly irrelevant.
- `metadata.version` was bumped.
