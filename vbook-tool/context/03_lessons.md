# 03_lessons.md — Lessons Learned

> Real mistakes and fixes from extension development. Read before starting any new extension.

---

## 1. Icon Verification — ALWAYS Check After Scaffold

**Problem:** Scaffold downloads favicon automatically. If the site uses SVG, redirects, or returns HTML → `icon.png` = corrupted.

**Rule:** After scaffold, verify `icon.png` is a valid image:
- View file visually (binary check)
- If HTML/text → manually download the correct logo as PNG (64x64px)

---

## 2. Regexp Must Be Complete and Strict

**Problem:** Simple regex misses protocol/www or doesn't anchor properly.

**Correct pattern:**
```
https?:\/\/(?:www\.)?domain\.net\/truyen\/[a-zA-Z0-9-]+\/?$
```

**Rules:**
- MUST start with `https?:\/\/`
- MUST include `(?:www\.)?`
- MUST end with `\/?$` (detail page ONLY)
- Use `[a-zA-Z0-9-]+` for slugs, NOT `[^/]+`

---

## 3. page.js + toc.js Integration (API-based TOC)

**Problem:** `page.js` returns an array of pagination URLs (or IDs). `toc.js` is called with each input from that array. A common mistake is trying to fetch the detail page inside `toc.js` even when it was called with an API URL.

**Solution:**
1. `page.js` → returns an array of API URLs or IDs.
2. `toc.js` must handle both:
   - Called with detail URL → parse IDs from the page, then fetch API.
   - Called with API URL directly → extract params and return data.

---

## 4. Pagination Detection

**Problem:** Extending TOC for novels with many chapters needs pagination. Some sites don't show page count upfront or hide it behind JS.

**Solution:** 
- Use `mcp_vbook_inspect` to check for pagination elements.
- Look for common markers like `.pagination`, `a.next`, or "Page X of Y".
- If hidden by JS, use `Engine.newBrowser()` in `page.js`.

---

## 5. AJAX/POST Requests

**Problem:** Some AJAX endpoints return 403 or empty data without specific headers.

**Solution:**
- Always check `mcp_vbook_analyze` for XHR calls and their headers.
- Common mandatory headers: `Content-Type: application/x-www-form-urlencoded`, `X-Requested-With: XMLHttpRequest`.

---

## 6. Chapter Sorting

**Problem:** Chapters may come unsorted from certain APIs (e.g., from oldest to newest or vice versa, or random).

**Solution:** Use a numeric sort based on extracted chapter numbers if necessary.

---

## 7. Standardizing List Item Selection

**Problem:** 
Using generic selectors like `article` or `div` can lead to the "1-item bug" where the main container is selected instead of individual list items.

**Solution:**
1. **Be Specific:** Always use list-item specific classes found via `mcp_vbook_inspect` (e.g., `.item`, `.story-card`).
2. **Handle Link Elements Robustly:** Check if the container itself is an `<a>` or contains one.
   ```javascript
   var selfHref = el.attr('href') + "";
   var linkEl = (selfHref && selfHref.indexOf('http') > -1) ? el : el.select('a').first();
   ```
3. **Selector Coverage:** If a site has multiple layouts (grid/list), merge the selectors:
   `doc.select('SELECTOR_GRID_ITEM, SELECTOR_LIST_ITEM')`

---

## 8. Null Safety (Rhino Serialization)

**Problem:** Calling `.text()`, `.attr()`, or `.html()` on Jsoup elements returns Java objects that may crash the serialization when passed to `Response.success`.

**Rule:** **ALWAYS** append `+ ""` to convert them to JS strings.
```javascript
var title = el.select("SELECTOR").text() + "";
```

---

## 9. Standardized Creation Workflow (Gatekeeper)

**Problem:** AI skipping environment checks or guessing website details before verifying the connection and asking for necessary information.

**Solution:** 
1. **Check IP First**: Call `mcp_vbook_check_env` immediately. If it fails, report "DEVICE UNREACHABLE" and stop.
2. **Scaffold & Question**: Once environment is verified, call `mcp_vbook_create` (minimal) or `mcp_vbook_copy_demo` to initialize the project, then ask the 8 standardized questions about the website structure.
3. **No Guessing**: Wait for user answers and real device data from `mcp_vbook_inspect` before writing any implementation code.


---

## Prioritize Fetch Over Browser

**Problem:** Using `Engine.newBrowser()` (Web View) is resource-intensive and slow compared to simple HTTP requests. It introduces delays (like waiting for DOM hydration) and increases the risk of connection timeouts.

**Solution:** Always prioritize using `fetch(url)` or `Http.get(url)` for data extraction. Only fall back to `Engine.newBrowser()` if the site relies heavily on client-side rendering (SPA like React/SvelteKit), has strict anti-bot protections (like Cloudflare Turnstile), or uses complex JavaScript logic to assemble the content that cannot be easily replicated via API calls or static parsing.

---

## SvelteKit Svelte-devalue Parsing

**Problem:** Using `JSON.parse` to parse the `__SVELTEKIT_DATA__` (or Svelte's `devalue` string) fails because the string contains unquoted keys (like `{type:"data"}`) and valid JavaScript expressions (like `void 0` or `new Date()`) which are not valid JSON.

**Solution:** Use `eval("var dataArr = " + rawData + ";")` instead of `JSON.parse` to evaluate the Svelte state object correctly natively via Rhino. `eval` is completely capable of reading `devalue` outputs.

---

## HentaizHot Cover Image Fix

**Problem:** Cover images in the listing (`gen.js`) and detail (`detail.js`) were often falling back to the genre-wide thumbnail because `posterImage` was null, even though `backdropImage` contained the correct unique image for the episode.

**Solution:** Updated the image selection priority to `item.posterImage || item.backdropImage || item.thumbnailImage`. This ensures that if the preferred `posterImage` is missing, the script attempts to use the `backdropImage` before falling back to the generic genre thumbnail. This pattern should be applied to all SvelteKit-based extensions for this site.

---

## Xử lý SvelteKit API và Tối ưu hóa CDN Discovery (HentaiZ Case Study)

**Problem:** 
1. Các trang web dùng SvelteKit (như HentaiZ) có API phức tạp, payload sử dụng định dạng `devalue` với các con trỏ index (ví dụ: `page: 3` trỏ tới phần tử thứ 3 trong mảng tham số). Nếu truyền sai index sẽ bị lỗi 400 Bad Request.
2. Việc dùng Browser API (`Engine.newBrowser()`) để giải mã Cloudflare và bắt link m3u8 thường rất chậm (10-15s) và không ổn định do phụ thuộc vào việc mô phỏng click nút Play.

**Solution:**
1. **SvelteKit API Mapping:** Khi gọi API SvelteKit, cần phân tích kỹ mảng payload để ánh xạ đúng index cho các tham số như `page`, `sort`.
   - Ví dụ: `payload = [{"page": 3}, "TYPE", "ID", 1]` -> `page` ở đây giá trị thực là `1`.
2. **Brute-force CDN Discovery:** Thay vì dùng Browser để bắt link, hãy phân tích quy luật của server CDN (ví dụ: `c1-c10.animez.top`).
   - Sử dụng vòng lặp quét nhanh các subdomain bằng `fetch` với header `Range: bytes=0-1`.
   - Nếu `res.status === 200` hoặc `206`, đó là link video thật có thể phát bằng Native Player.
   - Kết quả: Tốc độ lấy link giảm từ 15s xuống còn ~1.5s.
3. **Date Parsing:** Với dữ liệu ngày tháng dạng mảng `["Date", "2024-..."]`, dùng `new Date(item[1])` để parse chính xác trong môi trường Rhino.
4. **Bypass Redirect:** Thay thế trực tiếp domain gateway (ví dụ `e.streamqq.com`) bằng domain server gốc (`p1.spexliu.top`) để né lỗi 302 và các lớp bảo vệ trung gian.

---

## 10. Bypass Shopee/Next.js Gated Content (Next.js App Router Case Study)

**Problem:** 
1. Các web truyện hiện đại (như `ntruyen.biz`) sử dụng Next.js App Router với cơ chế streaming dữ liệu qua `self.__next_f.push`. Nội dung không nằm trong HTML tĩnh mà được đẩy xuống dưới dạng các chunk JSON-encoded.
2. Trang web áp dụng "Shopee-gate": Yêu cầu click link affiliate để mở khóa chương. Nội dung thực tế có thể đã được tải nhưng bị ẩn bằng CSS (`opacity-0`, `h-0`, `pointer-events-none`).
3. Chặn DevTools: Web chặn mở F12 để ngăn việc soi selector hoặc copy nội dung.

**Solution:**
1. **Next.js Stream Extraction:** Sử dụng Regex để bắt các chunk dữ liệu từ `self.__next_f.push`. Lưu ý giải mã các ký tự escaped như `\u003cp`, `\u003cbr`.
   ```javascript
   let regex = /self\.__next_f\.push\(\[1,"((?:\\.|[^"\\])*)"\]\)/g;
   // Giải mã JSON.parse('"' + match[1] + '"')
   ```
2. **Tailwind `.prose` Selector:** Ưu tiên selector `.prose` (Tailwind Typography). Đây là class tiêu chuẩn cho các khối nội dung văn bản trên các site Next.js hiện đại.
3. **Xử lý nội dung ẩn:** Không bỏ qua các element có class `opacity-0` hay `h-0`. Nếu `doc.select(".prose")` tìm thấy dữ liệu, hãy trích xuất bất kể trạng thái hiển thị trên trình duyệt.
4. **Browser Fallback:** Nếu `fetch` bị 403 hoặc không tìm thấy dữ liệu trong `__next_f`, sử dụng `Engine.newBrowser()` để giả lập trình duyệt thật, cho phép JS thực thi và kích hoạt các cookie/session cần thiết để "mở khóa".
5. **Clean Noise:** Luồng dữ liệu Next.js thường kèm theo các ID động (ví dụ `.go4109123758`) hoặc các đoạn script lồng nhau. Cần dùng `.remove()` để dọn dẹp trước khi trả kết quả về `Response.success`.

---

## 11. Bypass DevTools Blocking (Anti-Debug Bypassing)

**Problem:** Website sử dụng các kỹ thuật như `debugger` loop, check `window.devtools`, hoặc chặn phím tắt (F12, Ctrl+Shift+I) để ngăn cản việc soi DOM và bắt API.

**Solution:**
1. **Sử dụng Tool MCP VBook (Khuyên dùng):**
   - `mcp_vbook_inspect`: Trích xuất nhanh cấu trúc heading, link và ảnh.
   - `mcp_vbook_get_dom_tree`: Lấy toàn bộ cây DOM dưới dạng JSON. 
   - **Tại sao?** Các tool này chạy phía backend (Rhino/Jsoup), không thực thi JS của trang web nên hoàn toàn miễn nhiễm với mọi kỹ thuật chặn DevTools của trình duyệt.
2. **Sử dụng `Engine.newBrowser()` + Logging:**
   - Viết một script `test.js` để `launch(url)` và in ra `doc.html()` hoặc `browser.urls()`.
   - Đây là cách hiệu quả nhất để xem các API background mà trang web gọi sau khi render.
3. **View Source (`view-source:URL`):** 
   - Cách cổ điển nhưng hữu hiệu để xem HTML tĩnh ban đầu mà không bị JS làm phiền.
4. **Disable JavaScript:** 
   - Sử dụng các extension trình duyệt để tắt JS. Khi JS không chạy, các script chặn DevTools sẽ vô dụng. Tuy nhiên cách này có thể làm mất dữ liệu nếu trang web render hoàn toàn bằng JS.
5. **Network Interception (vBook Side):**
   - Sử dụng code trong `test.js` để bắt toàn bộ request: `JSON.stringify(browser.urls())`. Mọi API ẩn sẽ lộ ra tại đây.
