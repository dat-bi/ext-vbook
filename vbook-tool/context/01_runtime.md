# 01_runtime.md - VBook Rhino Runtime

Read this before writing any `src/*.js` file.

For the complete app API map, read `01_runtime_api.md`.

## Must

- Every script must define `function execute(...)`.
- Return data only through `Response.success(...)` or `Response.error(...)`.
- Convert Java strings before returning: append `+ ""` after `.text()`, `.attr()`, `.html()`.
- `nextPage` must be `String(...)` or `null`, never a number.
- `chap.js` for novel/comic returns an HTML string, not an object.
- Always normalize relative URLs to absolute URLs.
- Always close browser instances in `finally`.

## Never Use

These are unsafe or unsupported in the VBook Rhino runtime:

- `async` / `await`
- optional chaining: `obj?.a`
- nullish coalescing: `a ?? b`
- spread: `fn(...args)`, `[...arr]`
- default params: `function f(a = 1)`
- `import` / `export`
- `String.matchAll`
- `Promise.any`, `Promise.allSettled`

## Safe Replacements

```js
// default value
page = page !== undefined ? page : "1";

// optional access
var title = obj && obj.title ? obj.title : "";

// array copy
var copy = arr.slice();

// function spread
fn.apply(null, args);
```

## Core APIs

```js
Response.success(data);
Response.success(data, nextPage);
Response.error(message);

var res = fetch(url, {
    method: "GET",
    headers: {},
    queries: {},
    body: "",
    timeout: 15000
});

res.ok;
res.status;
res.text();
res.text("gbk");
res.html();
res.html("gbk");
res.json();
```

## DOM API

```js
var doc = res.html();
var text = doc.select("selector").text() + "";
var href = doc.select("a").attr("href") + "";
var html = doc.select(".content").html() + "";
doc.select("script, style, .ads").remove();
```

Avoid unsupported Jsoup-style helpers unless verified in VBook:

- `tagName()`
- `is()`
- `tag()`
- `doc.body()`

Use selectors instead:

```js
var body = doc.select("body");
```

## Browser API

Use only when `fetch()` cannot see the real content.

```js
var b = Engine.newBrowser();
try {
    b.setUserAgent(UserAgent.android());
    b.block(["*.png", "*.jpg", "*.gif", "*.woff"]);
    b.launch(url, 12000);
    var doc = b.html();
    return Response.success(doc.select("body").html() + "");
} finally {
    b.close();
}
```

## Storage / Cookie Pattern

```js
var cookie = "";
try { cookie = localStorage.getItem("cookie") || ""; } catch (e) {}

var res = fetch(url, { headers: { Cookie: cookie } });
var setCookie = res.headers["set-cookie"];
try {
    if (setCookie) localStorage.setItem("cookie", setCookie + "");
} catch (e) {}
```
