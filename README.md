=====================================
# I. CẤU TRÚC TỔNG QUAN VÀ PLUGIN.JSON
=====================================

## Cấu trúc thư mục chuẩn:
```
extension-name/
├── plugin.json          # Metadata và cấu hình (bắt buộc)
├── icon.png             # Icon 64x64px (bắt buộc)
├── src/                 # Thư mục chứa script
│   ├── home.js         # Trang chủ (tùy chọn)
│   ├── genre.js        # Danh mục thể loại (tùy chọn)
│   ├── search.js       # Tìm kiếm (tùy chọn)
│   ├── detail.js       # Chi tiết truyện (bắt buộc)
│   ├── page.js         # Phân trang mục lục (tùy chọn)
│   ├── toc.js          # Mục lục (bắt buộc)
│   ├── chap.js         # Nội dung chương (bắt buộc)
│   └── gen.js          # Script tổng quát cho home/genre
└── README.md           # Tài liệu
```

## Plugin.json cho extension đọc truyện:
```json
{
  "metadata": {
    "name": "Tên Extension",
    "author": "Tên tác giả", 
    "version": 1,
    "source": "https://website.com",
    "regexp": "website\\.com/truyen/\\d+",
    "description": "Mô tả extension",
    "locale": "vi_VN",          // vi_VN, zh_CN, en_US, ja_JP
    "language": "javascript",
    "type": "novel",            // novel, comic, chinese_novel
    "tag": "nsfw"              // Chỉ thêm nếu có nội dung 18+
  },
  "script": {
    "home": "home.js",         // Trang chủ (tùy chọn)
    "genre": "genre.js",       // Thể loại (tùy chọn)
    "detail": "detail.js",     // Chi tiết truyện (bắt buộc)
    "search": "search.js",     // Tìm kiếm (tùy chọn)
    "page": "page.js",         // Phân trang mục lục (tùy chọn)
    "toc": "toc.js",           // Mục lục (bắt buộc)
    "chap": "chap.js"          // Nội dung chương (bắt buộc)
  }
}
```

## Plugin.json cho extension dịch thuật:
```json
{
  "metadata": {
    "name": "Google Translate",
    "author": "vBook",
    "version": 1,
    "source": "https://translate.google.com",
    "description": "Dịch truyện bằng Google Translate",
    "type": "translate"
  },
  "script": {
    "translate": "translate.js"
  }
}
```

## Plugin.json cho extension TTS:
```json
{
  "metadata": {
    "name": "Google TTS",
    "author": "vBook", 
    "version": 1,
    "source": "https://www.google.com",
    "description": "Nghe truyện bằng Google TTS",
    "type": "tts"
  },
  "script": {
    "tts": "tts.js"
  }
}
```

=====================================
# II. HTTP REQUEST VÀ RESPONSE
=====================================

## HTTP Request cơ bản:
```javascript
// GET request đơn giản
let response = fetch(url);

// POST request với headers và body
let response = fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Referer": "https://website.com",
        "X-Requested-With": "XMLHttpRequest"
    },
    body: JSON.stringify({
        "keyword": key,
        "page": page
    })
});

// Form data POST
let response = fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "username=user&password=pass&token=abc123"
});
```

## Xử lý Response:
```javascript
let status = response.status;           // HTTP status code
let isSuccess = response.ok;            // true nếu status 200-299
let headers = response.headers;         // Response headers

// Lấy cookie từ response (quan trọng cho login)
let setCookie = response.headers["set-cookie"];
let cookie = response.request.headers.cookie;

// Parse response theo định dạng
let doc = response.html();              // HTML Document
let doc = response.html("utf-8");       // Với charset cụ thể
let doc = response.html("gbk");         // Cho trang tiếng Trung
let text = response.text();             // Plain text
let text = response.text("utf-8");      // Với charset
let json = response.json();             // JSON object

// Kiểm tra response hợp lệ
if (!response.ok) {
    return Response.error("HTTP Error: " + response.status);
}
```

## HTTP với Http object (cách khác):
```javascript
var request = Http.get(url);            // Tạo GET request
var request = Http.post(url);           // Tạo POST request

request.headers({                       // Thêm headers
    "Content-Type": "application/json",
    "Cookie": "session=abc123;token=xyz"
});

request.params({                        // Form data cho POST
    "search": keyword,
    "type": "novel"
});

request.body("raw string data");        // Raw body data

// Execute requests
let doc = request.html();               // Execute và parse HTML
let text = request.string();            // Execute và lấy string  
let code = request.code();              // HTTP status code
```

=====================================
# III. BROWSER AUTOMATION
=====================================

## Browser cơ bản:
```javascript
var browser = Engine.newBrowser();      // Khởi tạo browser

// Thiết lập User Agent
browser.setUserAgent(UserAgent.android());
browser.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");

// Mở trang web với timeout
let doc = browser.launch(url, 10000);   // 10 giây timeout

// Execute JavaScript trên trang
browser.callJs("window.scrollTo(0, document.body.scrollHeight)", 2000);
browser.callJs("document.querySelector('#load-more').click()", 1000);

// Chờ URL cụ thể load (cho AJAX)
browser.waitUrl(["api.website.com/data"], 5000);
let urls = browser.urls();              // Lấy tất cả URLs đã request

// Lấy HTML và đóng browser
let doc = browser.html();
browser.close();                        // QUAN TRỌNG: luôn close browser!
```

## Browser bất đồng bộ:
```javascript
var browser = Engine.newBrowser();
browser.launchAsync(url);               // Launch không đồng bộ
sleep(5000);                           // Chờ JavaScript load
let doc = browser.html();              // Lấy HTML sau khi load
browser.close();
```

## Xử lý trang phức tạp:
```javascript
var browser = Engine.newBrowser();
browser.setUserAgent(UserAgent.android());
browser.launch(url, 15000);

// Scroll để trigger lazy loading
browser.callJs(`
    window.scrollTo(0, document.body.scrollHeight);
    setTimeout(() => {
        document.querySelector('#load-more')?.click();
    }, 1000);
`, 3000);

// Chờ content load xong
sleep(2000);
let doc = browser.html();
browser.close();
```

=====================================
# IV. HTML PARSING VỚI JSOUP
=====================================

## Selectors cơ bản:
```javascript
// Parse HTML string
let doc = Html.parse(htmlString);

// Clean HTML, chỉ giữ lại các thẻ cần thiết
let cleanHtml = Html.clean(htmlString, ["p", "br", "img", "a", "strong", "em"]);

// Selectors cơ bản
doc.select("div");                      // Tất cả thẻ div
doc.select("#content");                 // ID = content
doc.select(".title");                   // Class = title
doc.select("div.item");                 // div với class item
doc.select("a[href]");                  // Link có href
doc.select("img[src*='.jpg']");         // Image có src chứa .jpg
doc.select("meta[property='og:title']"); // Meta tag cụ thể
```

## Selectors nâng cao:
```javascript
// Hierarchy
doc.select(".container > .item");       // Con trực tiếp
doc.select(".list .chapter");           // Con gián tiếp
doc.select("h1 + p");                  // p ngay sau h1
doc.select("h1 ~ p");                  // p sau h1

// Text-based selectors 
doc.select("a:contains(下一页)");        // Link chứa text "下一页"
doc.select("a:contains(Next)");         // Link chứa "Next"
doc.select("div:has(img)");            // div chứa img
doc.select("p:not(.ad)");              // p không có class ad

// Position selectors
doc.select("li:first-child");          // Con đầu tiên
doc.select("li:last-child");           // Con cuối
doc.select("li:eq(0)");                // Phần tử đầu tiên (index 0)
doc.select("li:lt(3)");                // 3 phần tử đầu
doc.select("li:gt(2)");                // Từ phần tử thứ 4

// Regex selectors
doc.select("a[href~=(?i)\\.(jpg|png)]"); // href kết thúc jpg/png
doc.select("div:matches((?i)chapter)"); // text chứa 'chapter'
```

## Lấy dữ liệu từ elements:
```javascript
let elements = doc.select(".chapter-list a");

// Lấy text và attributes
let firstText = elements.first().text();       // Text đầu tiên
let lastText = elements.last().text();         // Text cuối
let specificText = elements.get(0).text();     // Text theo index
let href = elements.first().attr("href");      // Attribute href
let hasTarget = elements.first().hasAttr("target"); // Kiểm tra attribute

// Lấy HTML
let innerHTML = elements.first().html();       // Inner HTML
let outerHTML = elements.first().outerHtml();  // Outer HTML

// Manipulate DOM
elements.remove();                             // Xóa elements
doc.select("#ads, .advertisement").remove();   // Xóa quảng cáo
```

## Loop qua elements:
```javascript
let chapters = doc.select(".chapter-list a");
const data = [];

// forEach loop (khuyên dùng)
chapters.forEach(element => {
    data.push({
        name: element.text(),
        url: element.attr("href")
    });
});

// For loop truyền thống
for (let i = 0; i < chapters.size(); i++) {
    let element = chapters.get(i);
    data.push({
        name: element.text(),
        url: element.attr("href")
    });
}

// Kiểm tra có elements không
if (chapters.size() === 0) {
    return Response.error("Không tìm thấy chương nào");
}
```

=====================================
# V. STRING VÀ REGEX PROCESSING
=====================================

## URL processing:
```javascript
// Xử lý URL chuẩn
if (url.slice(-1) === "/") {
    url = url.slice(0, -1);               // Bỏ / cuối
}
if (url.slice(-1) !== "/") {
    url = url + "/";                      // Thêm / cuối
}

// NOTE QUAN TRỌNG: App tự động bỏ / ở cuối URL đầu vào
// Nếu test trên máy OK nhưng app lỗi, thêm / vào cuối URL

// Replace domain cho mobile
url = url.replace("m.website.com", "www.website.com");
url = url.replace(/^http:/, "https:");    // Force HTTPS
```

## Regex patterns:
```javascript
// Extract data từ HTML/JavaScript
let scriptData = html.match(/<script.*?type="application\/json">(.*?)<\/script>/);
let jsonData = scriptData ? JSON.parse(scriptData[1]) : null;

// Extract IDs từ URL
let bookId = url.match(/(\d+)/)[1];                    // Số đầu tiên
let bookId = url.match(/book\/(\d+)/)[1];              // Số sau 'book/'
let chapterId = url.match(/chapter-(\d+)/)[1];         // Số sau 'chapter-'

// Regex patterns thông dụng
let titlePattern = /<h1[^>]*>(.*?)<\/h1>/;
let linkPattern = /<a[^>]+href="([^"]*)"[^>]*>(.*?)<\/a>/g;
let imgPattern = /<img[^>]+src="([^"]*)"[^>]*>/;

// Extract multiple matches
let matches = [...html.matchAll(linkPattern)];
matches.forEach(match => {
    let [full, href, text] = match;
    // Process href và text
});
```

## String manipulation:
```javascript
// String checks
if (text.includes("Next Page")) { /* có Next Page */ }
if (url.indexOf("chapter") !== -1) { /* URL chứa chapter */ }

// Split và extract
let lastPart = url.split("/").pop();         // Phần cuối sau /
let parts = url.split(/[\/\s]+/);            // Split theo / hoặc space
let filename = url.split("/").pop().split(".")[0]; // Tên file không extension

// String replace
text = text.replace(/\n/g, "<br>");          // Newline to BR
text = text.replace(/&nbsp;/g, " ");         // Non-breaking space
text = text.replace(/\s+/g, " ");            // Multiple spaces to single
text = text.trim();                          // Trim whitespace

// Clean content
content = content.replace(/&lt;/g, "<");     // Decode HTML entities
content = content.replace(/&gt;/g, ">");
content = content.replace(/&amp;/g, "&");
```

## JSON handling:
```javascript
// Safe JSON parsing
function safeJsonParse(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        Console.log("JSON parse error: " + e);
        return null;
    }
}

// String to JSON
let obj = JSON.parse(jsonString);

// JSON to string  
let jsonString = JSON.stringify(obj);

// Extract JSON from script tag
let scriptContent = doc.select("script:contains(window.__INITIAL_STATE__)").html();
let jsonMatch = scriptContent.match(/window\.__INITIAL_STATE__\s*=\s*({.*?});/);
if (jsonMatch) {
    let data = JSON.parse(jsonMatch[1]);
}
```

=====================================
# VI. CÁC SCRIPT CHÍNH CHI TIẾT
=====================================

## HOME.JS - Trang chủ:
```javascript
function execute() {
    // Trả về danh sách các tab cho trang khám phá
    return Response.success([
        {
            title: "Truyện mới",              // Tên hiển thị
            input: "https://website.com/new", // URL đầu vào cho script
            script: "gen.js"                  // Script xử lý
        },
        {
            title: "Truyện hot", 
            input: "https://website.com/hot", 
            script: "gen.js"
        },
        {
            title: "Hoàn thành",
            input: "https://website.com/completed",
            script: "gen.js"
        }
    ]);
}
```

## GENRE.JS - Thể loại:
```javascript
function execute() {
    let response = fetch("https://website.com/genres");
    if (!response.ok) return Response.error("Không thể lấy danh sách thể loại");
    
    let doc = response.html();
    const genres = [];
    
    doc.select(".genre-list a").forEach(element => {
        genres.push({
            title: element.text(),            // Tên thể loại
            input: element.attr("href"),      // URL thể loại
            script: "gen.js"                  // Script xử lý
        });
    });
    
    return Response.success(genres);
}
```

## SEARCH.JS - Tìm kiếm:
```javascript
function execute(key, page) {
    // NOTE: page phải là string, không phải number
    if (!page) page = "1";
    
    // Encode search key
    let encodedKey = encodeURIComponent(key);
    
    // Cho trang GBK encoding (tiếng Trung)
    var gbkEncode = function(s) {
        load('gbk.js');  // Tải từ https://moleys.4everland.store/cdn/gbk.js
        return GBK.encode(s);
    };
    
    let url = `https://website.com/search?q=${encodedKey}&page=${page}`;
    let response = fetch(url);
    
    if (!response.ok) return Response.error("Tìm kiếm thất bại");
    
    let doc = response.html();
    const data = [];
    
    doc.select(".search-result .item").forEach(element => {
        let name = element.select(".title").text();
        let link = element.select("a").attr("href");
        let cover = element.select("img").attr("src");
        
        // Xử lý URL
        if (cover && cover.startsWith("//")) cover = "https:" + cover;
        if (link && !link.startsWith("http")) link = "https://website.com" + link;
        
        data.push({
            name: name,
            link: link,
            cover: cover,
            description: element.select(".description").text(),
            host: "https://website.com"
        });
    });
    
    // Tìm trang tiếp theo
    let nextPage = null;
    let nextLink = doc.select("a.next").attr("href");
    if (nextLink || data.length > 0) {
        nextPage = (parseInt(page) + 1).toString();  // NOTE: next phải là string
    }
    
    return Response.success(data, nextPage);
}

// Search cho trang không có phân trang
function execute(key, page) {
    if (!page) page = "1";
    
    let response = fetch(`https://website.com/search?q=${encodeURIComponent(key)}`);
    if (!response.ok) return Response.error("Tìm kiếm thất bại");
    
    let doc = response.html();
    const data = [];
    
    doc.select(".result-item").forEach(element => {
        data.push({
            name: element.select(".title").text(),
            link: element.select("a").attr("href"),
            description: element.select(".desc").text()
        });
    });
    
    // Không có next page nếu chỉ có 1 trang kết quả
    return Response.success(data, null);
}
```

## DETAIL.JS - Chi tiết truyện:
```javascript
function execute(url) {
    // NOTE: App tự động bỏ / cuối URL
    url = url.replace("m.website.com", "www.website.com");
    
    let response = fetch(url);
    if (!response.ok) return Response.error("Không thể tải trang chi tiết");
    
    let doc = response.html();
    
    // Lấy thông tin cơ bản
    let name = doc.select("h1.title, .book-title").text();
    let cover = doc.select(".cover img, .book-cover img").attr("src");
    let author = doc.select(".author, .book-author").text()
                    .replace(/Tác giả:\s*/g, "")
                    .replace(/作者:\s*/g, "");
    let description = doc.select(".description, .book-desc").html();
    let status = doc.select(".status, .book-status").text();
    
    // Xử lý cover URL
    if (cover) {
        if (cover.startsWith("//")) {
            cover = "https:" + cover;
        } else if (cover.startsWith("/")) {
            cover = "https://website.com" + cover;
        } else if (!cover.startsWith("http")) {
            cover = "https://website.com/" + cover;
        }
    }
    
    // Xử lý trạng thái ongoing
    let ongoing = true;
    if (status.includes("Hoàn thành") || status.includes("Completed") || 
        status.includes("完结") || status.includes("End")) {
        ongoing = false;
    }
    
    // Thông tin chi tiết
    let detail = `Tác giả: ${author}<br>`;
    detail += `Trạng thái: ${status}<br>`;
    detail += doc.select(".book-info, .novel-info").text();
    
    // Lấy book ID cho các script khác
    let bookId = url.match(/\/(\d+)(?:\/|\.html|$)/);
    bookId = bookId ? bookId[1] : "";
    
    return Response.success({
        name: name,                           // Tên truyện (bắt buộc)
        cover: cover,                         // URL ảnh bìa
        host: "https://website.com",          // Domain
        author: author,                       // Tác giả
        description: description,             // Mô tả HTML
        detail: detail,                       // Thông tin chi tiết
        ongoing: ongoing,                     // true = đang ra, false = hoàn thành
        
        // Các phần tùy chọn
        genres: [{                           // Thể loại liên quan
            title: "Cùng thể loại",
            input: "https://website.com/genre/action",
            script: "gen.js"
        }],
        suggests: [{                         // Truyện đề xuất
            title: "Truyện liên quan",
            input: `https://website.com/related/${bookId}`,
            script: "gen.js"  
        }],
        comments: [{                         // Comments
            title: "Bình luận",
            input: url,
            script: "comment.js"
        }]
    });
}
```

## PAGE.JS - Phân trang mục lục:
```javascript
function execute(url) {
    // Cho các trang có mục lục phân nhiều trang
    url = url.replace("m.website.com", "www.website.com");
    
    let response = fetch(url);
    if (!response.ok) return Response.error("Không thể tải danh sách trang");
    
    let doc = response.html();
    const pages = [];
    
    // Cách 1: Lấy từ select option
    doc.select("#chapter-page-select option").forEach(option => {
        let pageUrl = option.attr("value");
        if (!pageUrl.startsWith("http")) {
            pageUrl = "https://website.com" + pageUrl;
        }
        pages.push(pageUrl);
    });
    
    // Cách 2: Lấy từ pagination links
    if (pages.length === 0) {
        doc.select(".pagination a").forEach(link => {
            let href = link.attr("href");
            if (href && !href.includes("#") && !href.includes("javascript")) {
                if (!href.startsWith("http")) {
                    href = "https://website.com" + href;
                }
                pages.push(href);
            }
        });
    }
    
    // Cách 3: Tự generate pages dựa trên pattern
    if (pages.length === 0) {
        let totalPages = doc.select(".total-pages").text();
        if (totalPages) {
            let num = parseInt(totalPages);
            for (let i = 1; i <= num; i++) {
                pages.push(`${url}?page=${i}`);
            }
        }
    }
    
    return Response.success(pages);
}
```

## TOC.JS - Mục lục:
```javascript
function execute(url) {
    // url: từ page.js hoặc giống detail.js nếu không có page.js
    url = url.replace("m.website.com", "www.website.com");
    
    let response = fetch(url);
    if (!response.ok) return Response.error("Không thể tải mục lục");
    
    let doc = response.html();
    const chapters = [];
    
    // Lấy danh sách chương - thử các selector khác nhau
    let chapterElements = doc.select(".chapter-list a");
    if (chapterElements.size() === 0) {
        chapterElements = doc.select("#list a, .volume-chapters a, .chapter-item a");
    }
    
    chapterElements.forEach(element => {
        let name = element.text().trim();
        let chapterUrl = element.attr("href");
        
        // Skip nếu không có tên hoặc URL
        if (!name || !chapterUrl) return;
        
        // Xử lý URL
        if (!chapterUrl.startsWith("http")) {
            if (chapterUrl.startsWith("/")) {
                chapterUrl = "https://website.com" + chapterUrl;
            } else {
                chapterUrl = "https://website.com/" + chapterUrl;
            }
        }
        
        chapters.push({
            name: name,                       // Tên chương (bắt buộc)
            url: chapterUrl,                  // URL chương (bắt buộc) 
            host: "https://website.com"       // Domain (tùy chọn nếu url đã có domain)
        });
    });
    
    // Kiểm tra có chapters không
    if (chapters.length === 0) {
        return Response.error("Không tìm thấy chương nào");
    }
    
    // Sắp xếp theo thứ tự nếu cần
    // chapters.reverse(); // Đảo ngược nếu cần
    
    return Response.success(chapters);
}
```

## CHAP.JS - Nội dung chương:
```javascript
function execute(url) {
    url = url.replace("m.website.com", "www.website.com");
    
    let response = fetch(url);
    if (!response.ok) return Response.error("Không thể tải nội dung chương");
    
    let doc = response.html();
    
    // Xóa các phần không cần thiết
    doc.select(".ads, .advertisement, .banner, script, style, .comment").remove();
    doc.select("#ads, #advertisement, .google-ads").remove();
    
    // Lấy nội dung chương - thử các selector khác nhau
    let content = doc.select("#content").html();
    if (!content) content = doc.select(".chapter-content").html();
    if (!content) content = doc.select(".chapter-body").html();
    if (!content) content = doc.select(".content").html();
    if (!content) content = doc.select(".text").html();
    if (!content) content = doc.select(".chapter").html();
    
    if (!content) {
        return Response.error("Không tìm thấy nội dung chương");
    }
    
    // Clean nội dung
    content = content.replace(/&nbsp;/g, " ");
    content = content.replace(/\s+/g, " ");
    content = content.replace(/<script[\s\S]*?<\/script>/gi, "");
    content = content.trim();
    
    return Response.success(content);
}

// CHAP.JS cho trang chia chương lớn thành chương nhỏ:
function execute(url) {
    url = url.replace("m.website.com", "www.website.com");
    
    let fullContent = "";
    let basePart = url.replace("https://website.com", "").replace(".html", "");
    let currentPart = basePart;
    let maxParts = 50; // Giới hạn để tránh vòng lặp vô tận
    let partCount = 0;
    
    while (currentPart && currentPart.includes(basePart.split("/")[1]) && partCount < maxParts) {
        let currentUrl = "https://website.com" + currentPart + ".html";
        let response = fetch(currentUrl);
        
        if (!response.ok) break;
        
        let doc = response.html();
        
        // Lấy nội dung part hiện tại
        let partContent = doc.select("#content, .chapter-content").html();
        if (partContent) {
            fullContent += partContent;
        } else {
            break;
        }
        
        // Tìm link trang tiếp theo
        let nextLink = doc.select("a:contains(下一页), a:contains(Next), a.next").attr("href");
        if (nextLink && !nextLink.includes("#") && nextLink !== currentPart + ".html") {
            currentPart = nextLink.replace(".html", "");
        } else {
            break;
        }
        
        partCount++;
    }
    
    if (fullContent) {
        fullContent = fullContent.replace(/&nbsp;/g, "");
        fullContent = fullContent.replace(/\s+/g, " ");
        return Response.success(fullContent);
    }
    
    return Response.error("Không thể tải nội dung");
}
```

## GEN.JS - Script tổng quát:
```javascript
function execute(url, page) {
    // NOTE: page phải là string
    if (!page) page = "1";
    
    // Xử lý URL
    if (url.slice(-1) !== "/") {
        url = url + "/";
    }
    url = url.replace("m.website.com", "www.website.com");
    
    // Build URL với page
    let pageUrl = `${url}${page}.html`;
    // Hoặc: let pageUrl = `${url}?page=${page}`;
    
    let response = fetch(pageUrl);
    if (!response.ok) return Response.error(`Không thể tải trang ${page}`);
    
    let doc = response.html();
    const data = [];
    
    // Lấy danh sách truyện
    doc.select(".book-list .item").forEach(element => {
        let name = element.select(".title a, h3 a").text();
        let link = element.select(".title a, h3 a").attr("href");
        let cover = element.select("img").attr("src");
        let description = element.select(".description, .summary").text();
        
        // Skip nếu không có tên hoặc link
        if (!name || !link) return;
        
        // Xử lý URLs
        if (cover && cover.startsWith("//")) {
            cover = "https:" + cover;
        } else if (cover && cover.startsWith("/")) {
            cover = "https://website.com" + cover;
        }
        
        if (link && !link.startsWith("http")) {
            if (link.startsWith("/")) {
                link = "https://website.com" + link;
            } else {
                link = "https://website.com/" + link;
            }
        }
        
        data.push({
            name: name,                       // Tên truyện (bắt buộc)
            link: link,                       // URL truyện (bắt buộc)
            cover: cover,                     // URL ảnh bìa
            description: description,         // Mô tả ngắn
            host: "https://website.com"       // Domain (tùy chọn)
        });
    });
    
    // Tìm trang tiếp theo
    let nextPage = null;
    
    // Cách 1: Từ link next
    let nextLink = doc.select("a.next, a:contains(下一页), a:contains(Next)").attr("href");
    if (nextLink) {
        let pageNum = nextLink.match(/(\d+)/);
        if (pageNum) {
            nextPage = pageNum[1];
        }
    }
    
    // Cách 2: Tự tăng page number
    if (!nextPage && data.length > 0) {
        let currentPageNum = parseInt(page);
        let maxPageElement = doc.select(".pagination .last, .last-page");
        
        if (maxPageElement.size() > 0) {
            let maxPageText = maxPageElement.text();
            let maxPageNum = parseInt(maxPageText);
            if (currentPageNum < maxPageNum) {
                nextPage = (currentPageNum + 1).toString();
            }
        } else {
            // Giả sử có trang tiếp theo nếu có data
            nextPage = (currentPageNum + 1).toString();
        }
    }
    
    return Response.success(data, nextPage);
}
```

=====================================
# VII. CÁC HÀM TIỆN ÍCH VÀ LƯU Ý ĐẶC BIỆT
=====================================

## Response handling:
```javascript
// Success response
Response.success(data);                     // Chỉ data
Response.success(data, nextPage);           // Data với next page
Response.success(data, data2);              // Hai data objects

// Error response
Response.error("Lỗi mô tả chi tiết");

// Kiểm tra data trước khi return
if (data.length === 0) {
    return Response.error("Không tìm thấy dữ liệu");
}
```

## Console và debug:
```javascript
Console.log("Debug info: " + JSON.stringify(data));
Console.log("URL: " + url);
Console.log("Elements found: " + elements.size());

// Load external JS files
load('filename.js');                        // Load từ thư mục src
load('https://cdn.com/library.js');         // Load từ URL

// Sleep/delay
sleep(5000);                               // Chờ 5 giây
```

## Các lưu ý quan trọng:
```javascript
// NOTE 1: App tự động bỏ / ở cuối URL đầu vào
// Nếu test trên máy OK nhưng app lỗi, thêm / vào cuối URL

// NOTE 2: next page phải là string, không phải number
let nextPage = (parseInt(page) + 1).toString();

// NOTE 3: Cookie handling
let cookie = response.headers["set-cookie"];
let requestCookie = response.request.headers.cookie;

// NOTE 4: LocalStorage & CacheStorage (experimental)
// localStorage.setItem("key", "value");
// let value = localStorage.getItem("key");

// NOTE 5: Async browser launch
// browser.launchAsync(url);
// sleep(5000);
// doc = browser.html();
// browser.close();
```

## Slugify cho tiếng Việt:
```javascript
function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a")
        .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e")
        .replace(/i|í|ì|ỉ|ĩ|ị/gi, "i")
        .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o")
        .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u")
        .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y")
        .replace(/đ/gi, "d")
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
}
```
=====================================
# VIII. CÁC TRƯỜNG HỢP ĐẶC BIỆT
=====================================

## Xử lý trang cần login/authentication:
```javascript
function execute(url) {
    // Lấy cookie từ response trước
    let loginResponse = fetch("https://website.com/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "username=user&password=pass"
    });
    
    let cookie = loginResponse.headers["set-cookie"];
    
    // Sử dụng cookie cho request tiếp theo
    let response = fetch(url, {
        headers: {
            "Cookie": cookie
        }
    });
    
    // Process response...
}
```

## Xử lý CAPTCHA và token:
```javascript
function execute(url) {
    // Lấy token từ trang chính
    let mainPage = fetch("https://website.com");
    let doc = mainPage.html();
    let token = doc.select("input[name='_token']").attr("value");
    
    // Sử dụng token trong request
    let response = fetch("https://website.com/api", {
        method: "POST",
        headers: {
            "X-CSRF-TOKEN": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "action": "search",
            "keyword": key
        })
    });
}
```

## Xử lý trang sử dụng GraphQL:
```javascript
function execute(key, page) {
    let query = `
        query SearchNovels($keyword: String!, $page: Int!) {
            searchNovels(keyword: $keyword, page: $page) {
                novels {
                    id
                    title
                    cover
                    author
                    description
                }
                hasNextPage
            }
        }
    `;
    
    let response = fetch("https://website.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: query,
            variables: {
                keyword: key,
                page: parseInt(page) || 1
            }
        })
    });
    
    let jsonData = response.json();
    let novels = jsonData.data.searchNovels.novels;
    
    const data = novels.map(novel => ({
        name: novel.title,
        link: `https://website.com/novel/${novel.id}`,
        cover: novel.cover,
        description: novel.description
    }));
    
    let nextPage = jsonData.data.searchNovels.hasNextPage ? 
                   (parseInt(page) + 1).toString() : null;
    
    return Response.success(data, nextPage);
}
```

## Xử lý lazy loading với browser:
```javascript
function execute(url, page) {
    var browser = Engine.newBrowser();
    browser.setUserAgent(UserAgent.android());
    browser.launch(url, 10000);
    
    // Scroll để trigger lazy loading
    browser.callJs(`
        for (let i = 0; i < 5; i++) {
            window.scrollTo(0, document.body.scrollHeight);
            await new Promise(r => setTimeout(r, 1000));
        }
    `, 8000);
    
    let doc = browser.html();
    browser.close();
    
    const data = [];
    doc.select(".lazy-loaded .item").forEach(element => {
        data.push({
            name: element.select(".title").text(),
            link: element.select("a").attr("href")
        });
    });
    
    return Response.success(data);
}
```

## Xử lý API trả về encrypted data:
```javascript
function execute(url) {
    // Load crypto library
    load('crypto-js.js');  // Cần có file crypto-js trong src/
    
    let response = fetch("https://website.com/api/chapter", {
        headers: {
            "Accept": "application/json"
        }
    });
    
    let jsonData = response.json();
    let encryptedContent = jsonData.content;
    let key = jsonData.key;
    
    // Decrypt content
    let decrypted = CryptoJS.AES.decrypt(encryptedContent, key).toString(CryptoJS.enc.Utf8);
    
    return Response.success(decrypted);
}
```

## Xử lý trang có multiple domains:
```javascript
function execute(url) {
    // Thử các mirror domains
    let domains = [
        "website.com",
        "website.net", 
        "website.org",
        "mirror.website.com"
    ];
    
    for (let domain of domains) {
        try {
            let testUrl = url.replace(/https?:\/\/[^\/]+/, `https://${domain}`);
            let response = fetch(testUrl);
            
            if (response.ok) {
                url = testUrl;
                break;
            }
        } catch (e) {
            continue;
        }
    }
    
    // Proceed with working URL
    let response = fetch(url);
    // ... rest of the code
}
```

=====================================
# IX. EXTENSION DỊCH THUẬT (TRANSLATE)
=====================================

## Google Translate Extension:
```javascript
// translate.js
function execute(text, fromLang, toLang) {
    if (!text || text.trim() === "") {
        return Response.error("Không có văn bản để dịch");
    }
    
    // Limit text length để tránh timeout
    if (text.length > 5000) {
        text = text.substring(0, 5000) + "...";
    }
    
    let encodedText = encodeURIComponent(text);
    let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodedText}`;
    
    try {
        let response = fetch(url);
        if (!response.ok) {
            return Response.error("Lỗi kết nối Google Translate");
        }
        
        let jsonData = response.json();
        let translatedText = "";
        
        if (jsonData && jsonData[0]) {
            for (let i = 0; i < jsonData[0].length; i++) {
                if (jsonData[0][i][0]) {
                    translatedText += jsonData[0][i][0];
                }
            }
        }
        
        return Response.success(translatedText);
    } catch (e) {
        return Response.error("Lỗi dịch thuật: " + e.toString());
    }
}
```

## Baidu Translate Extension:
```javascript
// translate.js
function execute(text, fromLang, toLang) {
    // Convert language codes
    let langMap = {
        "zh": "zh",
        "en": "en", 
        "vi": "vie",
        "ja": "jp",
        "ko": "kor"
    };
    
    fromLang = langMap[fromLang] || fromLang;
    toLang = langMap[toLang] || toLang;
    
    let response = fetch("https://fanyi.baidu.com/v2transapi", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        },
        body: `from=${fromLang}&to=${toLang}&query=${encodeURIComponent(text)}&simple_means_flag=3`
    });
    
    if (!response.ok) {
        return Response.error("Lỗi kết nối Baidu Translate");
    }
    
    let jsonData = response.json();
    if (jsonData.trans_result && jsonData.trans_result.data) {
        let result = jsonData.trans_result.data[0].dst;
        return Response.success(result);
    }
    
    return Response.error("Không thể dịch văn bản");
}
```

=====================================
# X. EXTENSION TEXT-TO-SPEECH (TTS)
=====================================

## Google TTS Extension:
```javascript
// tts.js
function execute(text, language, voice) {
    if (!text || text.trim() === "") {
        return Response.error("Không có văn bản để đọc");
    }
    
    // Limit text length
    if (text.length > 200) {
        text = text.substring(0, 200);
    }
    
    // Remove HTML tags
    text = text.replace(/<[^>]*>/g, "");
    text = text.replace(/&[^;]+;/g, "");
    
    let encodedText = encodeURIComponent(text);
    let audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${language}&client=tw-ob&q=${encodedText}`;
    
    return Response.success({
        audioUrl: audioUrl,
        text: text,
        language: language
    });
}
```

## Edge TTS Extension:
```javascript
// tts.js  
function execute(text, language, voice) {
    // Remove HTML và format text
    text = text.replace(/<[^>]*>/g, "");
    text = text.replace(/\s+/g, " ").trim();
    
    if (text.length > 300) {
        text = text.substring(0, 300);
    }
    
    // Voice mapping
    let voiceMap = {
        "vi": "vi-VN-HoaiMyNeural",
        "en": "en-US-JennyNeural", 
        "zh": "zh-CN-XiaoxiaoNeural",
        "ja": "ja-JP-NanamiNeural"
    };
    
    let selectedVoice = voiceMap[language] || voice || "en-US-JennyNeural";
    
    // Generate SSML
    let ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${language}">
        <voice name="${selectedVoice}">
            <prosody rate="medium" pitch="medium">
                ${text}
            </prosody>
        </voice>
    </speak>`;
    
    return Response.success({
        ssml: ssml,
        voice: selectedVoice,
        text: text
    });
}
```

## Zalo AI TTS Extension:
```javascript
// tts.js
function execute(text, language, voice) {
    // Clean text
    text = text.replace(/<[^>]*>/g, "");
    text = text.replace(/[^\w\s\u00C0-\u024F\u1E00-\u1EFF]/g, "");
    
    if (text.length > 500) {
        text = text.substring(0, 500);
    }
    
    // Zalo voice IDs
    let voiceId = "1"; // Default Vietnamese voice
    if (language === "en") voiceId = "2";
    
    let response = fetch("https://api.zalo.ai/v1/tts/synthesize", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "apikey": "your-api-key" // Cần API key
        },
        body: JSON.stringify({
            "input": text,
            "voice": voiceId,
            "speed": 1.0,
            "api_version": "1.0"
        })
    });
    
    if (!response.ok) {
        return Response.error("Lỗi Zalo TTS API");
    }
    
    let jsonData = response.json();
    return Response.success({
        audioUrl: jsonData.url,
        text: text
    });
}
```

=====================================
# XI. TOOLS VÀ UTILITIES
=====================================

## Tạo extension maker tool:
```javascript
// extension-generator.js
function generateExtension(siteName, baseUrl, selectors) {
    let pluginJson = {
        "metadata": {
            "name": siteName,
            "author": "Generated",
            "version": 1,
            "source": baseUrl,
            "regexp": baseUrl.replace(/https?:\/\//, "").replace(/\./g, "\\.") + "/.*",
            "description": `Đọc truyện trên ${siteName}`,
            "type": "novel",
            "locale": "vi_VN"
        },
        "script": {
            "detail": "detail.js",
            "toc": "toc.js", 
            "chap": "chap.js"
        }
    };
    
    let detailJs = `
function execute(url) {
    let response = fetch(url);
    if (!response.ok) return Response.error("Không thể tải trang");
    
    let doc = response.html();
    return Response.success({
        name: doc.select("${selectors.title}").text(),
        cover: doc.select("${selectors.cover}").attr("src"),
        author: doc.select("${selectors.author}").text(),
        description: doc.select("${selectors.description}").html(),
        host: "${baseUrl}"
    });
}`;
    
    // Generate other scripts...
    
    return {
        pluginJson: JSON.stringify(pluginJson, null, 2),
        detailJs: detailJs
    };
}
```

## Debug utilities:
```javascript
// debug.js
function debugElement(selector, doc) {
    let elements = doc.select(selector);
    Console.log(`Selector "${selector}" found ${elements.size()} elements`);
    
    if (elements.size() > 0) {
        Console.log(`First element text: "${elements.first().text()}"`);
        Console.log(`First element HTML: ${elements.first().outerHtml()}`);
    }
    
    return elements;
}

function debugResponse(response) {
    Console.log(`Status: ${response.status}`);
    Console.log(`OK: ${response.ok}`);
    Console.log(`Headers: ${JSON.stringify(response.headers)}`);
    
    if (response.ok) {
        let text = response.text();
        Console.log(`Content length: ${text.length}`);
        Console.log(`Content preview: ${text.substring(0, 200)}...`);
    }
}
```

## Performance optimization:
```javascript
// Limit concurrent requests
let maxRetries = 3;
let retryCount = 0;

function fetchWithRetry(url) {
    while (retryCount < maxRetries) {
        try {
            let response = fetch(url);
            if (response.ok) {
                return response;
            }
        } catch (e) {
            retryCount++;
            if (retryCount >= maxRetries) {
                throw e;
            }
            sleep(1000 * retryCount); // Exponential backoff
        }
    }
}

// Cache responses
let cache = {};

function fetchWithCache(url) {
    if (cache[url]) {
        return cache[url];
    }
    
    let response = fetch(url);
    if (response.ok) {
        cache[url] = response;
    }
    
    return response;
}
```

=====================================
# XII. TESTING VÀ DEBUGGING
=====================================

## Testing locally:
```javascript
// test-runner.js
function testExtension() {
    try {
        // Test detail.js
        Console.log("Testing detail.js...");
        let detailResult = execute("https://website.com/novel/123");
        Console.log("Detail result: " + JSON.stringify(detailResult));
        
        // Test search.js
        Console.log("Testing search.js...");
        let searchResult = execute("test", "1");
        Console.log("Search result: " + JSON.stringify(searchResult));
        
        // Test toc.js
        Console.log("Testing toc.js...");
        let tocResult = execute("https://website.com/novel/123");
        Console.log("TOC result: " + JSON.stringify(tocResult));
        
    } catch (e) {
        Console.log("Test error: " + e.toString());
    }
}
```

## Error handling patterns:
```javascript
function safeExecute(func, ...args) {
    try {
        return func(...args);
    } catch (e) {
        Console.log("Error in " + func.name + ": " + e.toString());
        return Response.error("Lỗi xử lý: " + e.message);
    }
}

// Wrap all functions
function execute(url) {
    return safeExecute(function() {
        // Your code here
    });
}
```

## Common issues và solutions:
```javascript
// Issue 1: Encoding problems
function fixEncoding(text) {
    return text
        .replace(/â€™/g, "'")
        .replace(/â€œ/g, '"')
        .replace(/â€/g, '"')
        .replace(/â€¦/g, '...');
}

// Issue 2: URL handling
function normalizeUrl(url, baseUrl) {
    if (!url) return "";
    
    if (url.startsWith("//")) {
        return "https:" + url;
    } else if (url.startsWith("/")) {
        return baseUrl + url;
    } else if (!url.startsWith("http")) {
        return baseUrl + "/" + url;
    }
    
    return url;
}

// Issue 3: Empty content handling
function validateContent(content) {
    if (!content || content.trim() === "") {
        return null;
    }
    
    // Remove common empty patterns
    content = content.replace(/^[\s\n\r]+|[\s\n\r]+$/g, "");
    content = content.replace(/(&nbsp;|\s)+/g, " ");
    
    return content.length > 10 ? content : null;
}
```
=====================================
# XIII. USER AGENT VÀ BROWSER SETTINGS
=====================================

## Các loại User Agent có sẵn:
```javascript
// UserAgent cơ bản - Các user agent được định sẵn
browser.setUserAgent(UserAgent.android());     // Android user agent - Mô phỏng điện thoại Android
browser.setUserAgent(UserAgent.system());      // System user agent - Sử dụng user agent hệ thống
browser.setUserAgent(UserAgent.chrome());      // Chrome user agent - Mô phỏng trình duyệt Chrome
browser.setUserAgent(UserAgent.firefox());     // Firefox user agent - Mô phỏng trình duyệt Firefox
browser.setUserAgent(UserAgent.safari());      // Safari user agent - Mô phỏng trình duyệt Safari

// Custom user agent - Tùy chỉnh user agent riêng
browser.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"); // User agent tùy chỉnh - Chuỗi được định nghĩa thủ công

// Sử dụng trong fetch - Áp dụng cho HTTP request
let response = fetch(url, {
    headers: {
        "user-agent": UserAgent.system()        // Đặt user agent trong header - Thêm vào request header
    }
});
```

=====================================
# XIV. LOCALSTORAGE VÀ CACHESTORAGE
=====================================

## LocalStorage - Lưu trữ cục bộ:
```javascript
// Lưu và lấy dữ liệu - Các thao tác cơ bản
localStorage.setItem("key", "value");           // Lưu dữ liệu - Ghi dữ liệu vào storage
let value = localStorage.getItem("key");        // Lấy dữ liệu - Đọc dữ liệu từ storage
localStorage.removeItem("key");                 // Xóa key cụ thể - Xóa một key riêng lẻ
localStorage.clear();                           // Xóa tất cả - Xóa toàn bộ storage

// Lưu object/array (phải stringify) - Lưu dữ liệu phức tạp
let dataObj = {name: "test", value: 123};        // Tạo object - Dữ liệu cần lưu
localStorage.setItem("data", JSON.stringify(dataObj)); // Chuyển object thành string - Serialize object
let getData = JSON.parse(localStorage.getItem("data") || "{}"); // Lấy và parse lại - Deserialize với fallback

// Kiểm tra tồn tại - Validation dữ liệu
if (localStorage.getItem("token")) {             // Nếu có token - Kiểm tra sự tồn tại
    // Có token - Xử lý khi đã có token
} else {
    // Không có token - Xử lý khi chưa có token
}

// Ví dụ thực tế: Lưu token CSRF - Ứng dụng thực tế
function get_csrfToken() {                      // Hàm lấy CSRF token - Bảo mật CSRF
    if (!localStorage.getItem("_csrfToken")) {   // Kiểm tra token cũ - Nếu chưa có token
        let response = fetch("https://website.com/auth"); // Gửi request lấy token - Request đến auth endpoint
        let cookie = response.request.headers.cookie; // Lấy cookie từ response - Cookie chứa token
        let token = cookie.match(/_csrfToken(.*?)\;/g)[0].replace("\;", ""); // Parse token - Trích xuất token từ cookie
        localStorage.setItem("_csrfToken", token);  // Lưu token - Cache token cho lần sau
    }
    return localStorage.getItem("_csrfToken");    // Trả về token - Lấy token đã cache
}

// Ví dụ: Lưu encryption keys - Lưu trữ key mã hóa
function saveEncryptionKey(key) {               // Hàm lưu key mã hóa - Bảo mật key
    try {
        localStorage.setItem("encryption_key", key); // Lưu key - Ghi key vào storage
    } catch (e) {
        Console.log("Cannot save key: " + e);     // Xử lý lỗi - Log lỗi khi không lưu được
    }
}
```

## CacheStorage - Cache nâng cao:
```javascript
// Lưu và lấy cache - Các thao tác cache cơ bản
cacheStorage.setItem("cache_key", "cached_data"); // Lưu cache - Ghi dữ liệu vào cache
let cachedData = cacheStorage.getItem("cache_key"); // Lấy cache - Đọc dữ liệu từ cache

// Cache cho translation - Ứng dụng cho dịch thuật
if (cacheKey && finalContent && !finalContent.includes("LỖI DỊCH")) { // Kiểm tra điều kiện cache - Validation trước khi lưu
    try {
        cacheStorage.setItem(cacheKey, finalContent.trim()); // Lưu nội dung đã dịch - Cache kết quả dịch
    } catch (e) {
        Console.log("Cache error: " + e);          // Xử lý lỗi cache - Log lỗi
    }
}

// Lấy và lưu API keys - Quản lý API keys
try {
    let localKeysString = cacheStorage.getItem('api_key_list'); // Lấy danh sách key - Đọc key từ cache
    if (localKeysString) {                          // Kiểm tra có dữ liệu - Nếu có key
        let apiKeys = localKeysString.split('\n')    // Tách thành mảng - Split by newline
            .map(function(key) { return key.trim(); }) // Loại bỏ khoảng trắng - Trim spaces
            .filter(function(key) { return key; });  // Lọc key rỗng - Filter empty keys
    }
} catch (e) {
    Console.log("Cache read error: " + e);          // Xử lý lỗi đọc - Log read errors
}

// API key rotation - Xoay vòng API keys
let apiKeyStorageKey = "last_api_key_index";        // Key lưu index - Storage key cho index
try {
    let lastUsedIndex = parseInt(cacheStorage.getItem(apiKeyStorageKey) || "-1"); // Lấy index cuối - Lấy index đã dùng gần nhất
    let nextIndex = (lastUsedIndex + 1) % apiKeys.length; // Tính index tiếp theo - Round-robin index
    cacheStorage.setItem(apiKeyStorageKey, nextIndex.toString()); // Lưu index mới - Cache new index
} catch (e) {
    // Fallback nếu cache lỗi - Xử lý khi cache thất bại
}
```

=====================================
# XV. COOKIE HANDLING CHI TIẾT
=====================================

## Lấy cookie từ response:
```javascript
// Từ response headers
let response = fetch(url);
let setCookie = response.headers["set-cookie"];        // Cookie server set
let requestCookie = response.request.headers.cookie;   // Cookie đã gửi

// Parse cookie cụ thể
let csrfToken = cookie.match(/_csrfToken(.*?)\;/g)[0].replace("\;", "");
let sessionId = cookie.match(/session_id=([^;]+)/)[1];

// Sử dụng cookie trong request tiếp theo
let response2 = fetch(nextUrl, {
    headers: {
        "Cookie": setCookie
    }
});
```

## Cookie từ browser automation:
```javascript
function getCookieFromBrowser(url) {
    let browser = Engine.newBrowser();
    browser.launch(url, 10000);
    
    // Lấy cookie từ localStorage của trang
    browser.callJs(`
        var auth = window.localStorage.getItem('auth._token.local'); 
        var authDiv = document.createElement('auth'); 
        authDiv.innerHTML = auth; 
        document.body.appendChild(authDiv);
    `, 1000);
    
    let auth = browser.html().select("auth").text();
    browser.close();
    
    return auth;
}
```

## Cookie bypass cloudflare:
```javascript
function bypassCloudflare(url, doc) {
    // Lấy cookie từ script
    let cookieMatch = doc.html().match(/document.cookie="(.*?)"/);
    if (cookieMatch) {
        let cookie = cookieMatch[1];
        // Fetch lại với cookie
        doc = Http.get(url).headers({"Cookie": cookie}).html();
    }
    return doc;
}
```

## Quản lý cookie phức tạp:
```javascript
function get_cookie(url) {
    // Check localStorage trước
    if (localStorage.getItem(url)) {
        return localStorage.getItem(url);
    }
    
    try {
        // Lấy từ API external
        let response = fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
            headers: {
                "X-Master-Key": MASTER_KEY
            }
        });
        
        let data = response.json();
        let cookieData = Array.isArray(data.record) ? data.record : [];
        
        // Tìm cookie cho URL
        let found = cookieData.find(item => item.url === url);
        if (found) {
            localStorage.setItem(url, found.key);
            return found.key;
        }
    } catch (error) {
        Console.log("Cookie fetch error: " + error);
    }
    
    return null;
}
```

=====================================
# XVI. ENCRYPTION VÀ DECRYPTION
=====================================

## Base64 encoding/decoding:
```javascript
// Load base64 library
load('base64.js');

// Encode/Decode
let encoded = Base64.encode("Hello World");
let decoded = Base64.decode(encoded);

// Advanced Base64 với UTF-8
let utf8Encoded = Base64._utf8_encode("Xin chào");
let utf8Decoded = Base64._utf8_decode(encoded);

// Xử lý content encrypted
function getContent(str) {
    let decoded = Base64.decode(str.split('').reverse().join(''))
        .replace(/<br>|<br\/>|<p>|<\/p>/g, "\n")
        .replace(/\n{2,}/gi, "\n")
        .split("\n");
    return decoded;
}
```

## AES Encryption/Decryption:
```javascript
// Load crypto library
load('crypto.js');

// AES Decrypt với key và IV
function decrypt(contentData, keys) {
    let cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(contentData)
    });
    
    let fixedKeyAndIvString = keys.split("").reverse().join("");
    let key = CryptoJS.enc.Utf8.parse(fixedKeyAndIvString);
    let iv = CryptoJS.enc.Utf8.parse(fixedKeyAndIvString);
    
    let decryptedBytes = CryptoJS.AES.decrypt(cipherParams, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    
    return decryptedBytes.toString(CryptoJS.enc.Utf8).split("\n\n");
}

// Complex decryption với multiple keys
function complexDecrypt(e) {
    let content = e.content;
    let keys = e.keys;
    let accessKey = e.accessKey;
    let keyLength = keys.length;
    let accessKeyChars = accessKey.split("");
    let accessKeyLength = accessKeyChars.length;
    
    let decryptKeys = [];
    decryptKeys.push(keys[accessKeyChars[accessKeyLength - 1].charCodeAt(0) % keyLength]);
    decryptKeys.push(keys[accessKeyChars[0].charCodeAt(0) % keyLength]);
    
    for (let i = 0; i < decryptKeys.length; i++) {
        content = Base64.decode(content);
        let currentKey = decryptKeys[i];
        let iv = Base64.encode(content.substr(0, 16));
        let ciphertext = Base64.encode(content.substr(16));
        
        let encrypted = CryptoJS.format.OpenSSL.parse(ciphertext);
        content = CryptoJS.AES.decrypt(encrypted, CryptoJS.enc.Base64.parse(currentKey), {
            iv: CryptoJS.enc.Base64.parse(iv),
            format: CryptoJS.format.OpenSSL
        });
        
        if (i < decryptKeys.length - 1) {
            content = content.toString(CryptoJS.enc.Base64);
            content = Base64.decode(content);
        }
    }
    
    return content.toString(CryptoJS.enc.Utf8);
}
```

## LZ String Compression:
```javascript
// Load LZ String library
load('lzstring.js');

// Compress/Decompress
let compressed = LZString.compressToBase64("Long text content here...");
let decompressed = LZString.decompressFromBase64(compressed);

// UTF16 compression
let compressedUTF16 = LZString.compressToUTF16("Content");
let decompressedUTF16 = LZString.decompressFromUTF16(compressedUTF16);

// URI safe compression
let compressedURI = LZString.compressToEncodedURIComponent("Content");
let decompressedURI = LZString.decompressFromEncodedURIComponent(compressedURI);
```

## Custom decoding functions:
```javascript
// Complex Base64 với obfuscation
function decode(T, N) {
    // Custom Base64 decoder
    function Base() {
        let _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        
        this.decode = function(c) {
            let a = "", b, d, h, f, g, e = 0;
            c = c.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            
            for (; e < c.length;) {
                b = _keyStr.indexOf(c.charAt(e++));
                d = _keyStr.indexOf(c.charAt(e++));
                f = _keyStr.indexOf(c.charAt(e++));
                g = _keyStr.indexOf(c.charAt(e++));
                
                b = b << 2 | d >> 4;
                d = (d & 15) << 4 | f >> 2;
                h = (f & 3) << 6 | g;
                
                a += String.fromCharCode(b);
                64 != f && (a += String.fromCharCode(d));
                64 != g && (a += String.fromCharCode(h));
            }
            return _utf8_decode(a);
        }
        
        function _utf8_decode(c) {
            let a = "", b = 0, d = 0, c2, c3;
            while (b < c.length) {
                d = c.charCodeAt(b);
                if (128 > d) {
                    a += String.fromCharCode(d);
                    b++;
                } else if (191 < d && 224 > d) {
                    c2 = c.charCodeAt(b + 1);
                    a += String.fromCharCode((d & 31) << 6 | c2 & 63);
                    b += 2;
                } else {
                    c2 = c.charCodeAt(b + 1);
                    c3 = c.charCodeAt(b + 2);
                    a += String.fromCharCode((d & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                    b += 3;
                }
            }
            return a;
        }
    }
    
    let B = new Base();
    let T_array = T.split('');
    let N_array = N.match(/\d+[a-zA-Z]+/g);
    let len = N_array.length;
    
    while (len--) {
        let locate = parseInt(N_array[len]) & 255;
        let str = N_array[len].replace(/\d+/g, '');
        T_array.splice(locate, str.length);
    }
    
    T = T_array.join('');
    return JSON.parse(B.decode(T));
}
```

=====================================
# XVII. SCRIPT EXECUTION VÀ DYNAMIC CODE
=====================================

## Execute JavaScript trong context:
```javascript
// Execute script với custom context
let chapterData = /window.chapterData = (.*?};)/.exec(html)[1];
let contentData = Script.execute(
    "let data = " + chapterData + "\n" + "function getContent() { return data.content; }", 
    "getContent", 
    ""
);

// Execute với parameters
let result = Script.execute(`
    function processData(input) {
        return input.split(',').map(x => x.trim());
    }
`, "processData", "a,b,c,d");
```

## Dynamic function loading:
```javascript
// Load và execute external scripts
load('crypto.js');                          // CryptoJS library
load('lzstring.js');                        // LZ String compression
load('base64.js');                          // Base64 encode/decode
load('config.js');                          // Configuration

// Conditional loading
try {
    load('optional-library.js');
} catch (e) {
    Console.log("Optional library not found: " + e);
}

// Load từ URL (nếu được hỗ trợ)
try {
    load('https://cdn.jsdelivr.net/npm/crypto-js@4.1.1/crypto-js.js');
} catch (e) {
    // Fallback to local file
    load('crypto.js');
}
```

=====================================
# XVIII. ARRAY VÀ STRING PROCESSING NÂNG CAO
=====================================

## Array manipulation:
```javascript
// Unique array elements
let uniqueKeys = [];
let seenKeys = {};
for (let i = 0; i < combinedArray.length; i++) {
    if (!seenKeys[combinedArray[i]]) {
        seenKeys[combinedArray[i]] = true;
        uniqueKeys.push(combinedArray[i]);
    }
}

// Array rotation for load balancing
function rotateArray(array, startIndex) {
    return array.slice(startIndex).concat(array.slice(0, startIndex));
}

// Array filtering và mapping
let processedArray = rawArray
    .map(function(item) { return item.trim(); })
    .filter(function(item) { return item.length > 0; })
    .filter(function(item) { return !item.startsWith('#'); }); // Skip comments

// Sort array với custom comparator
let sortedSegments = segments.sort(function(a, b) {
    return a.order - b.order;
});
```

## String processing nâng cao:
```javascript
// Multi-line regex với flags
let scriptData = html.match(/<script.*?type="application\/json">(.*?)<\/script>/s);
let chapterData = /window\.chapterData\s*=\s*(.*?};)/s.exec(html);

// Complex string cleaning
function cleanContent(content) {
    return content
        .replace(/<\/?span[^>]*>(.*?)<\/span>/g, "$1")     // Remove span tags
        .replace(/<[^>]*>?/gm, '')                          // Remove all HTML
        .replace(/&nbsp;/g, ' ')                            // Replace &nbsp;
        .replace(/&lt;/g, '<')                              // Decode entities
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/·/g, '')                                  // Remove middle dots
        .replace(/\n/gi, "<br>")                            // Newline to BR
        .replace(/(\<br[\s]*\/?\>[\s]*)+/g, '<br>');        // Multiple BR to single
}

// Extract ordered content
function gerSortContent(segments) {
    let sortContent = [];
    let regex = /<t(\d{1,})>([^</>]{1,})<\/t(\d{1,})>/gi;
    
    for (let i = 0; i < segments.length; i++) {
        let segment = segments[i];
        let matches = [];
        let match;
        
        while ((match = regex.exec(segment)) !== null) {
            let order = parseInt(match[1], 10);
            let content = match[2].replace('&nbsp;', ' ');
            matches.push({ order: order, content: content });
        }
        
        if (matches.length > 0) {
            matches.sort(function(a, b) { return a.order - b.order; });
            let combined = matches.map(function(m) { return m.content; }).join(" ");
            sortContent.push("<br>" + combined);
        } else {
            sortContent.push(segment);
        }
        
        regex.lastIndex = 0; // Reset regex
    }
    
    return sortContent;
}

// URL normalization
function normalizeUrl(url) {
    let path = url.split("#")[0].split("?")[0];         // Remove fragment & query
    let parts = path.split("/").filter(Boolean);        // Remove empty parts
    return "/" + parts.slice(0, 4).join("/") + "/";     // Take first 4 parts
}

// Domain replacement patterns
function replaceDomain(url) {
    return url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
}
```

## JSON processing:
```javascript
// Safe JSON parsing với fallback
function safeJsonParse(str, fallback = {}) {
    try {
        return JSON.parse(str);
    } catch (e) {
        Console.log("JSON parse error: " + e + " | String: " + str.substring(0, 100));
        return fallback;
    }
}

// Deep clone object
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// Merge objects
function mergeObjects(obj1, obj2) {
    let result = {};
    for (let key in obj1) {
        result[key] = obj1[key];
    }
    for (let key in obj2) {
        result[key] = obj2[key];
    }
    return result;
}
```

=====================================
# XIX. ERROR HANDLING VÀ DEBUGGING NÂNG CAO
=====================================

## Error recovery patterns:
```javascript
function executeWithFallback(primaryFunction, fallbackFunction) {
    try {
        return primaryFunction();
    } catch (e) {
        Console.log("Primary function failed: " + e + ", trying fallback");
        try {
            return fallbackFunction();
        } catch (e2) {
            Console.log("Fallback also failed: " + e2);
            return Response.error("Both primary and fallback methods failed");
        }
    }
}

// Retry pattern với exponential backoff
function fetchWithRetry(url, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            let response = fetch(url);
            if (response.ok) {
                return response;
            }
        } catch (e) {
            Console.log(`Attempt ${i + 1} failed: ${e}`);
            if (i < maxRetries - 1) {
                sleep(1000 * Math.pow(2, i)); // 1s, 2s, 4s
            }
        }
    }
    throw new Error("Max retries reached");
}
```

## Debugging utilities:
```javascript
function debugLog(message, data) {
    Console.log(`[DEBUG] ${message}: ${JSON.stringify(data)}`);
}

function debugElement(selector, doc) {
    let elements = doc.select(selector);
    Console.log(`Selector "${selector}" found ${elements.size()} elements`);
    if (elements.size() > 0) {
        Console.log(`First element: ${elements.first().outerHtml()}`);
    }
    return elements;
}

function debugResponse(response, label = "") {
    Console.log(`[RESPONSE${label ? ' ' + label : ''}] Status: ${response.status}, OK: ${response.ok}`);
    if (response.ok) {
        let content = response.text();
        Console.log(`Content length: ${content.length}, Preview: ${content.substring(0, 200)}...`);
    }
}
```

=====================================
# XX. CONFIG VÀ ENVIRONMENT MANAGEMENT
=====================================

## Dynamic configuration:
```javascript
// Standard config pattern
let BASE_URL = 'https://default-website.com';

try {
    if (CONFIG_URL) {                    // External config override
        BASE_URL = CONFIG_URL;
    }
} catch (error) {
    // CONFIG_URL not defined, use default
}

// Environment-specific settings
let ENVIRONMENT = 'production';
try {
    if (DEBUG_MODE) {
        ENVIRONMENT = 'debug';
        Console.log("Debug mode enabled");
    }
} catch (error) {
    // Normal mode
}

// Feature flags
let ENABLE_CACHE = true;
let ENABLE_ENCRYPTION = true;
let MAX_RETRIES = 3;

try {
    if (FEATURE_FLAGS) {
        ENABLE_CACHE = FEATURE_FLAGS.cache !== false;
        ENABLE_ENCRYPTION = FEATURE_FLAGS.encryption !== false;
        MAX_RETRIES = FEATURE_FLAGS.maxRetries || 3;
    }
} catch (error) {
    // Use defaults
}
```

## Multi-site support:
```javascript
// Site-specific configurations
let SITE_CONFIGS = {
    'site1.com': {
        baseUrl: 'https://site1.com',
        apiEndpoint: '/api/v1',
        requiresAuth: true
    },
    'site2.com': {
        baseUrl: 'https://site2.com', 
        apiEndpoint: '/api/v2',
        requiresAuth: false
    }
};

function getSiteConfig(url) {
    let domain = url.match(/https?:\/\/([^\/]+)/)[1];
    return SITE_CONFIGS[domain] || SITE_CONFIGS['default'];
}
```

=====================================
# XXI. LƯU Ý QUAN TRỌNG VÀ BEST PRACTICES
=====================================

## Những lưu ý đặc biệt:
```javascript
/* 
NOTE 1: App tự động bỏ / ở cuối URL đầu vào
- Nếu test trên máy OK nhưng app lỗi → thêm / vào cuối URL
- Nguyên nhân: app normalize URLs khác với browser
*/

/*
NOTE 2: Next page PHẢI là string, không phải number
- Sai: return Response.success(data, parseInt(page) + 1);
- Đúng: return Response.success(data, (parseInt(page) + 1).toString());
*/

/*
NOTE 3: Cookie handling cần careful với encoding
- Cookie có thể chứa special characters
- Luôn check cookie tồn tại trước khi parse
- Sử dụng regex cẩn thận để extract values
*/

/*
NOTE 4: LocalStorage có size limit
- Không lưu data quá lớn (>5MB)
- Luôn wrap trong try-catch
- Consider using compression cho large data
*/

/*
NOTE 5: Browser automation có overhead cao
- Chỉ dùng khi cần thiết (heavy JavaScript sites)
- Luôn close browser sau khi dùng
- Set reasonable timeout để tránh hang
*/

/*
NOTE 6: Encryption keys cần được manage properly
- Không hardcode keys trong code
- Sử dụng external storage hoặc fetch từ API
- Implement fallback khi key fail
*/

/*
NOTE 7: Error messages phải user-friendly
- Không expose technical details cho end user
- Provide actionable suggestions
- Log technical details với Console.log for debugging
*/
```

## Performance optimization:
```javascript
// Batch operations
function batchProcess(items, batchSize = 10) {
    let results = [];
    for (let i = 0; i < items.length; i += batchSize) {
        let batch = items.slice(i, i + batchSize);
        results = results.concat(processBatch(batch));
        
        // Prevent blocking
        if (i % 50 === 0) {
            sleep(100); // Brief pause every 50 items
        }
    }
    return results;
}

// Memory management
function cleanupLargeVariables() {
    // Set large variables to null when done
    largeHtmlContent = null;
    processedDataArray = null;
    
    // Force garbage collection hint (if supported)
    try {
        if (gc) gc();
    } catch (e) {
        // GC not available
    }
}
```

=====================================
# X. TEMPLATE PATTERNS THƯỜNG DÙNG
=====================================

## Authentication template:
```javascript
function executeWithAuth(url) {
    // Check cached auth first
    let authToken = localStorage.getItem("auth_token");
    
    if (!authToken) {
        // Get auth token
        authToken = getAuthToken();
        if (authToken) {
            localStorage.setItem("auth_token", authToken);
        } else {
            return Response.error("Không thể xác thực. Vui lòng đăng nhập trên trang web.");
        }
    }
    
    // Make authenticated request
    let response = fetch(url, {
        headers: {
            "Authorization": "Bearer " + authToken
        }
    });
    
    if (response.status === 401) {
        // Token expired, clear cache and retry
        localStorage.removeItem("auth_token");
        return executeWithAuth(url); // Recursive retry
    }
    
    return response;
}
```

## Content processing template:
```javascript
function processContent(rawContent) {
    // Step 1: Decode if encrypted
    let content = rawContent;
    if (isEncrypted(content)) {
        content = decryptContent(content);
    }
    
    // Step 2: Clean HTML
    content = cleanContent(content);
    
    // Step 3: Process special elements
    content = processSpecialElements(content);
    
    // Step 4: Final formatting
    content = finalFormat(content);
    
    return content;
}
```

## Multi-source fallback template:
```javascript
function executeWithFallbacks(primaryUrl, fallbackUrls) {
    let urls = [primaryUrl].concat(fallbackUrls);
    
    for (let i = 0; i < urls.length; i++) {
        try {
            let response = fetch(urls[i]);
            if (response.ok) {
                let result = processResponse(response);
                if (result && result.length > 0) {
                    return Response.success(result);
                }
            }
        } catch (e) {
            Console.log(`URL ${i} failed: ${e}`);
            continue;
        }
    }
    
    return Response.error("Tất cả nguồn đều không khả dụng");
}
```
=====================================
# XIII. KẾT LUẬN VÀ BEST PRACTICES
=====================================

## Checklist cho extension hoàn chỉnh:
- [ ] Plugin.json có đầy đủ metadata
- [ ] Icon.png 64x64px
- [ ] Detail.js, toc.js, chap.js hoạt động
- [ ] Error handling đầy đủ
- [ ] URL normalization
- [ ] Content validation
- [ ] Performance optimization
- [ ] Testing trên nhiều trang

## Security considerations:
- Không hardcode API keys
- Validate tất cả inputs
- Sanitize HTML content
- Limit request frequency
- Handle timeouts properly

## Performance tips:
- Cache responses khi có thể
- Limit text length cho TTS/translate
- Use efficient selectors
- Minimize browser usage
- Handle large content properly
