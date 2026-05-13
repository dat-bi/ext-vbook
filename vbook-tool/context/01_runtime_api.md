# 01_runtime_api.md - VBook API Reference

Use this file when implementing unfamiliar VBook APIs. Keep `01_runtime.md` as the required quick rules; use this file as the full function map.

## Response API

```js
Response.success(data);          // { code: 0, data: data }
Response.success(data, next);    // { code: 0, data: data, data2: next }
Response.error(message);         // { code: 1, data: message }
```

## fetch API

```js
fetch(url);
fetch(url, {
    method: "GET",
    headers: {},
    queries: {},
    body: "",
    timeout: 15000
});
```

Returns `HttpResponse`.

## HttpResponse API

```js
res.ok;                  // boolean
res.status;              // number
res.statusText;          // string
res.url;                 // final URL
res.headers;             // object
res.header("name");      // string
res.request;             // HttpRequest

res.text();
res.text("gbk");
res.html();
res.html("gbk");
res.json();
res.base64();
res.blob();
```

## HttpRequest API

```js
res.request.url;
res.request.headers;
```

## Http Builder API

```js
Http.get(url)
    .headers({})
    .params({})
    .queries({})
    .timeout(15000)
    .string("utf-8");

Http.get(url).html("gbk");
Http.get(url).blob();
Http.get(url).url();

Http.post(url)
    .headers({})
    .queries({})
    .body("a=1&b=2")
    .timeout(15000)
    .string("utf-8");

Http.post(url).binary(base64, "image/png");
Http.post(url).html("utf-8");
Http.post(url).blob();
Http.post(url).url();
```

## Html API

```js
Html.parse(htmlString);
Html.clean(htmlString, ["script", "style"]);
```

## HtmlElement API

```js
el.select("css");
el.attr("href");
el.text();
el.html();
el.attributes();
el.remove();
el.toString();
```

Important: before returning strings to `Response.success`, convert Java strings:

```js
var title = el.text() + "";
var href = el.attr("href") + "";
var html = el.html() + "";
```

Avoid unless verified:

```js
el.tagName();
el.is();
el.tag();
doc.body();
```

## HtmlElements API

```js
elements.length;
elements.size();
elements.isEmpty();
elements.get(0);
elements.first();
elements.last();
elements.select("css");
elements.attr("href");
elements.text();
elements.html();
elements.remove();

elements.forEach(function (el) {});
elements.map(function (el) { return el.text() + ""; });
```

## Engine / Browser API

```js
var b = Engine.newBrowser();
```

Browser methods:

```js
b.setUserAgent(UserAgent.android());
b.launch(url, 12000);          // sync navigation
b.launchAsync(url);            // async start
b.loadHtml(baseUrl, html);
b.html();
b.html(12000);
b.block(["*.png", "*.jpg"]);
b.waitUrl(["*api*"], 8000);
b.urls();
b.callJs("document.title", 5000);
b.getVariable("name");
b.close();
```

Always close:

```js
var b = Engine.newBrowser();
try {
    b.setUserAgent(UserAgent.android());
    b.launch(url, 12000);
    var doc = b.html();
    return Response.success(doc.select("body").html() + "");
} finally {
    b.close();
}
```

## UserAgent API

```js
UserAgent.system();
UserAgent.android();
UserAgent.chrome();
UserAgent.ios();
```

## Blob API

```js
var blob = Blob.fromBase64(base64, "image/png");
blob._isBlob;
blob._base64;
blob.type;
blob.size;
blob.base64();
blob.toString();
```

## Graphics API

```js
var canvas = Graphics.createCanvas(width, height);
var image = Graphics.createImage(base64);

canvas.drawImage(image, x, y);
canvas.drawImage(image, x, y, w, h);
canvas.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
canvas.capture();

image.width;
image.height;
```

## Storage APIs

```js
localStorage.setItem(key, value);
localStorage.getItem(key);
localStorage.removeItem(key);
localStorage.clear();

cacheStorage.setItem(key, value);
cacheStorage.getItem(key);
cacheStorage.removeItem(key);
cacheStorage.clear();

localCookie.setCookie("a=b; path=/");
localCookie.getCookie();

localConfig.getItem(key);
```

## WebSocket API

```js
var ws = new WebSocket(url, headersObj);

ws.url;
ws.headers;
ws.readyState;
ws.CONNECTING;
ws.OPEN;
ws.CLOSING;
ws.CLOSED;

ws.connect();
ws.send(data);
ws.sendText(message);
ws.sendBuffer(buffer);
ws.message();
ws.receive();
ws.close();

var frame = ws.receive();
frame.type;
frame.data;
```

## Script / Module Helpers

```js
load("config.js");
load("crypto.js");

Script.execute(scriptCode, "functionName", inputParam);
```

## Console / Timing

```js
console.log("message");
Log.log("message");
sleep(1000);
```

## Cookie Pattern

```js
var cookie = "";
try { cookie = localStorage.getItem("cookie") || ""; } catch (e) {}

var res = fetch(url, { headers: { Cookie: cookie } });
var setCookie = res.headers["set-cookie"];

try {
    if (setCookie) localStorage.setItem("cookie", setCookie + "");
} catch (e) {}
```

## Browser Network Discovery Pattern

```js
var b = Engine.newBrowser();
try {
    b.setUserAgent(UserAgent.android());
    b.launchAsync(url);
    sleep(3000);

    var urls = b.urls();
    var api = [];
    urls.forEach(function (u) {
        if (u.indexOf("/api/") >= 0 || u.indexOf(".json") >= 0) {
            api.push(u + "");
        }
    });

    return Response.success(api);
} finally {
    b.close();
}
```

## Native Media Return Pattern

```js
return Response.success({
    data: streamUrl,
    type: "native",
    headers: {},
    host: BASE_URL
});
```

Fallback for iframe/embed:

```js
return Response.success({
    data: embedUrl,
    type: "auto",
    host: BASE_URL
});
```
