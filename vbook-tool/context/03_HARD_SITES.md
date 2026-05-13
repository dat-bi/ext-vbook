# 03_HARD_SITES.md - Hard Website Playbook

Use this when normal `fetch(url).html()` does not expose the data.

## Decision Tree

1. Try Node preflight for suspected API endpoints.
2. If content is JS-rendered, use Playwright or Chrome DevTools discovery.
3. If discovery finds stable API, write Rhino-safe `fetch()` code.
4. If API is not stable, use VBook `Engine.newBrowser()`.
5. Always verify final code with VBook `debug`.

## Site Patterns

### Static HTML

Use:

```js
var res = fetch(url);
var doc = res.html();
```

### GBK / Chinese Encoding

Use:

```js
var doc = res.html("gbk");
var text = res.text("gbk");
```

### Cloudflare / Anti Bot

Symptoms:

- HTML contains challenge page.
- Status 403/503.
- Static fetch has no content.

Use Browser API only if needed:

```js
var b = Engine.newBrowser();
try {
    b.setUserAgent(UserAgent.android());
    b.launch(url, 15000);
    var doc = b.html();
} finally {
    b.close();
}
```

### Next.js

Look for:

- `__NEXT_DATA__`
- `self.__next_f.push`
- API routes in network logs

Strategy:

- Prefer API routes found by Playwright/Chrome network capture.
- If content is in `self.__next_f.push`, extract and decode chunks.
- Do not ignore hidden content just because CSS has `opacity-0` or `h-0`.

### SvelteKit

Look for:

- `__SVELTEKIT_DATA__`
- `data-sveltekit`
- devalue-style payloads

Strategy:

- Prefer API endpoints.
- If payload is devalue, `JSON.parse` may fail. In Rhino, controlled `eval` can parse it:

```js
var dataArr = null;
eval("dataArr = " + raw + ";");
```

### Hidden API / XHR

Use Playwright/Chrome DevTools to capture:

- `/api/`
- `.json`
- XHR/fetch requests
- required headers
- cookies
- request body

Then test with Node preflight. If stable, convert to VBook `fetch()`.

### Login / Cookie / Session

Store cookie if VBook receives one:

```js
var setCookie = res.headers["set-cookie"];
try { if (setCookie) localStorage.setItem("cookie", setCookie + ""); } catch (e) {}
```

Reuse:

```js
var cookie = "";
try { cookie = localStorage.getItem("cookie") || ""; } catch (e) {}
var res = fetch(url, { headers: { Cookie: cookie } });
```

### Video / CDN

Prefer direct playable URLs:

- `.m3u8`
- `.mp4`
- native stream URL

For CDN guessing, test candidates with lightweight headers such as `Range: bytes=0-1`. Use `track.js`:

```js
return Response.success({
    data: streamUrl,
    type: "native",
    headers: {},
    host: BASE_URL
});
```

Fallback:

```js
type: "auto"
```

## Discovery Tool Guidance

- Node preflight: fastest for APIs and headers.
- Playwright: best for rendered DOM, clicks, waits, and network discovery.
- Chrome DevTools: best for detailed network, console, performance.
- VBook Browser API: final fallback or runtime-specific confirmation.

Never ship code based only on Playwright/Chrome. Always run VBook `debug`.
