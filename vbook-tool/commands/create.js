/**
 * CREATE COMMAND — Scaffold a new VBook extension with AI-optimized templates
 * 
 * Template files include clear TODO markers and contract comments
 * so AI agents know exactly what to implement.
 */
const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');
const { getExtensionsDir, getTemplatesDir, getAuthor } = require('../lib/plugin-info');
const c = require('../lib/colors');

// ─── Templates ──────────────────────────────────────────────────────────────

function templatePluginJson({ name, source, type, locale, author, tag, scripts }) {
    const json = {
        metadata: {
            name,
            author,
            version: 1,
            source,
            regexp: source.replace(/https?:\/\//, '').replace(/\./g, '\\\\.').replace(/\/$/, '') + '/[^/]+/?$',
            description: `Đọc truyện trên trang ${name}`,
            locale,
            language: 'javascript',
            type
        },
        script: {}
    };
    if (tag) json.metadata.tag = tag;

    // Add scripts based on type
    for (const s of scripts) {
        const key = s.replace('.js', '');
        json.script[key] = s;
    }

    return JSON.stringify(json, null, 2);
}

function templateHome(source) {
    return `// home.js — Trang chủ / Explore tabs
// Contract: execute() → [{title, input, script}]
// Each item becomes a tab. "script" is called with url=input, page=""
function execute() {
    // TODO: Customize the explore tabs for ${source}
    return Response.success([
        {
            title: "Truyện mới",
            input: "${source}/truyen-moi",
            script: "gen.js"
        },
        {
            title: "Truyện hot",
            input: "${source}/truyen-hot",
            script: "gen.js"
        },
        {
            title: "Hoàn thành",
            input: "${source}/hoan-thanh",
            script: "gen.js"
        }
    ]);
}
`;
}

function templateGen(source) {
    return `// gen.js — List/grid of books from a URL
// Contract: execute(url, page) → [{name*, link*, cover?, description?, host?}], nextPage?
// CRITICAL: nextPage MUST be a string, never a number!
function execute(url, page) {
    page = page !== undefined ? page : "1";
    
    // TODO: Add pagination logic (some sites use ?page=N, some use /page/N/)
    let pageUrl = url;
    if (parseInt(page) > 1) {
        pageUrl = url + "?page=" + page;
    }
    
    let response = fetch(pageUrl);
    if (!response.ok) return Response.error("Failed to load: " + pageUrl);
    
    let doc = response.html();
    let data = [];
    
    // TODO: Update CSS selector to match ${source} structure
    doc.select(".book-item, .story-item, .list-item").forEach(function(el) {
        let name = el.select("h3 a, .title a").text();
        let link = el.select("h3 a, .title a").attr("href");
        let cover = el.select("img").attr("src");
        let description = el.select(".description, .desc").text();
        
        // Normalize URLs
        if (link && !link.startsWith("http")) link = "${source}" + link;
        if (cover && cover.startsWith("//")) cover = "https:" + cover;
        
        if (name && link) {
            data.push({
                name: name,
                link: link,
                cover: cover || "",
                description: description || "",
                host: "${source}"
            });
        }
    });
    
    // Next page: return null to stop pagination
    let nextPage = null;
    if (data.length > 0) {
        // TODO: Check if there's actually a next page (look for .pagination .next, etc.)
        nextPage = String(parseInt(page) + 1);
    }
    
    return Response.success(data, nextPage);
}
`;
}

function templateSearch(source) {
    return `// search.js — Search for books
// Contract: execute(key, page) → [{name*, link*, cover?, description?, host?}], nextPage?
function execute(key, page) {
    page = page !== undefined ? page : "1";
    
    // TODO: Update search URL pattern for ${source}
    let url = "${source}/search?q=" + encodeURIComponent(key) + "&page=" + page;
    
    let response = fetch(url);
    if (!response.ok) return Response.error("Search failed");
    
    let doc = response.html();
    let data = [];
    
    // TODO: Update CSS selectors for search results
    doc.select(".search-result .item, .list-truyen .row").forEach(function(el) {
        let name = el.select("h3 a, .title a").text();
        let link = el.select("h3 a, .title a").attr("href");
        let cover = el.select("img").attr("src");
        
        if (link && !link.startsWith("http")) link = "${source}" + link;
        if (cover && cover.startsWith("//")) cover = "https:" + cover;
        
        if (name && link) {
            data.push({
                name: name,
                link: link,
                cover: cover || "",
                description: el.select(".text-muted, .desc").text(),
                host: "${source}"
            });
        }
    });
    
    let nextPage = data.length > 0 ? String(parseInt(page) + 1) : null;
    return Response.success(data, nextPage);
}
`;
}

function templateDetail(source) {
    return `// detail.js — Book detail page
// Contract: execute(url) → {name*, cover, host, author, description, detail, ongoing:bool*,
//                           genres?:[{title,input,script}], suggests?:[{title,input,script}]}
function execute(url) {
    // NOTE: App strips trailing / from URL — re-add if needed
    let response = fetch(url);
    if (!response.ok) return Response.error("Cannot load detail page");
    
    let doc = response.html();
    
    // TODO: Update all CSS selectors below for ${source}
    let name = doc.select("h1, .book-title").text();
    let cover = doc.select(".book-cover img, .info-holder .books img").attr("src");
    let author = doc.select(".author, .info a[itemprop=author]").text();
    let description = doc.select(".description, .desc-text").html();
    let status = doc.select(".status, .info span:contains(Trạng thái)").text();
    
    // Normalize cover URL
    if (cover && cover.startsWith("//")) cover = "https:" + cover;
    if (cover && !cover.startsWith("http")) cover = "${source}" + cover;
    
    // Determine ongoing status
    let ongoing = true;
    if (status && (status.indexOf("Hoàn") >= 0 || status.indexOf("Full") >= 0 || 
        status.indexOf("完结") >= 0 || status.indexOf("Completed") >= 0)) {
        ongoing = false;
    }
    
    // Build genres array for clickable tags
    let genres = [];
    doc.select(".genre a, .tag a, .info a[href*=the-loai]").forEach(function(el) {
        genres.push({
            title: el.text(),
            input: el.attr("href").startsWith("http") ? el.attr("href") : "${source}" + el.attr("href"),
            script: "gen.js"
        });
    });
    
    // Build suggests for "Cùng tác giả" 
    let suggests = [];
    if (author) {
        suggests.push({
            title: "Cùng tác giả: " + author,
            input: author,
            script: "search.js"
        });
    }
    
    return Response.success({
        name: name,
        cover: cover || "",
        host: "${source}",
        author: author || "",
        description: description || "",
        detail: "Tác giả: " + author + "<br>Trạng thái: " + status,
        ongoing: ongoing,
        genres: genres,
        suggests: suggests
    });
}
`;
}

function templatePage(source) {
    return `// page.js — Trách nhiệm: Nhận URL của trang detail, trả về mảng URL cho toc.js
// Contract: execute(url) → [urlString, ...]
// Nếu không có phân trang mục lục: trả về [url] (chính là url detail)
// Nếu có phân trang: trả về mảng URL từng trang mục lục
// toc.js sẽ được gọi lần lượt với từng URL trong mảng này
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:www\.)?([^\/]+)/, "${source}");
    if (url.slice(-1) === "/") url = url.slice(0, -1);
    
    let response = fetch(url);
    if (!response.ok) return Response.error("Cannot load: " + response.status);
    
    let doc = response.html();
    let pages = [];
    
    // TODO: Nếu site có phân trang mục lục, cập nhật selector dưới đây
    // Ví dụ: ".pagination a", ".page-list a", "a[href*='trang/']"
    doc.select(".pagination a, .page-list a").forEach(function(el) {
        let href = el.attr("href") + "";
        if (href && !href.includes("#")) {
            if (!href.startsWith("http")) href = "${source}" + href;
            if (pages.indexOf(href) === -1) pages.push(href);
        }
    });
    
    // Phân trang không tìm thấy hoặc không có → trả về [url] để toc.js tự parse
    if (pages.length === 0) return Response.success([url]);
    
    return Response.success(pages);
}
`;
}

function templateToc(source) {
    return `// toc.js — Mục lục chương
// Contract: execute(url) → [{name*, url*, host?}]
// NOTE: url nhận từ page.js (mỗi call = 1 trang mục lục)
// App tổng hợp kết quả từ tất cả các call
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:www\.)?([^\/]+)/, "${source}");
    if (url.slice(-1) === "/") url = url.slice(0, -1);
    
    let response = fetch(url);
    if (!response.ok) return Response.error("Cannot load TOC");
    
    let doc = response.html();
    let chapters = [];
    
    // TODO: Cập nhật CSS selector danh sách chương cho ${source}
    doc.select(".chapter-list a, #list-chapter a, .danh-sach-chuong a").forEach(function(el) {
        let name = el.text() + "";
        let chapUrl = el.attr("href") + "";
        
        if (!name || !chapUrl) return;
        
        if (!chapUrl.startsWith("http")) {
            chapUrl = chapUrl.startsWith("/") ? "${source}" + chapUrl : "${source}/" + chapUrl;
        }
        
        let isPaid = el.select(".vip, .paid, .lock").size() > 0;
        
        chapters.push({
            name: name,
            url: chapUrl,
            host: "${source}",
            pay: isPaid || undefined
        });
    });
    
    if (chapters.length === 0) {
        return Response.error("No chapters found");
    }
    
    return Response.success(chapters);
}
`;
}

function templateChap(source) {
    return `// chap.js — Chapter content
// Contract: execute(url) → htmlString
// IMPORTANT: Returns a plain HTML string, NOT an object!
function execute(url) {
    let response = fetch(url);
    if (!response.ok) return Response.error("Cannot load chapter");
    
    let doc = response.html();
    
    // Remove ads and unwanted elements
    doc.select("script, style, .ads, .advertisement, .banner, .comment-section, noscript").remove();
    
    // TODO: Update CSS selector for chapter content on ${source}
    let content = doc.select("#chapter-content, .chapter-c, #content, .chapter-content").html();
    
    if (!content) {
        return Response.error("Chapter content not found");
    }
    
    // Clean content
    content = content.replace(/&nbsp;/g, " ");
    
    return Response.success(content);
}
`;
}

// ─── Favicon Downloader ─────────────────────────────────────────────────────

function downloadFavicon(sourceUrl, destPath) {
    return new Promise((resolve) => {
        try {
            const urlObj = new URL(sourceUrl);
            // Try common favicon paths
            const faviconUrls = [
                `${urlObj.protocol}//${urlObj.host}/favicon.ico`,
                `${urlObj.protocol}//${urlObj.host}/favicon.png`,
                `${urlObj.protocol}//${urlObj.host}/apple-touch-icon.png`
            ];

            tryDownload(faviconUrls, 0, destPath, resolve);
        } catch (e) {
            resolve(false);
        }
    });
}

function tryDownload(urls, index, destPath, callback) {
    if (index >= urls.length) return callback(false);

    const url = urls[index];
    const client = url.startsWith('https') ? https : http;

    const req = client.get(url, { timeout: 5000 }, (res) => {
        // Follow redirects
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            const redirectUrl = res.headers.location.startsWith('http')
                ? res.headers.location
                : new URL(res.headers.location, url).href;
            urls.splice(index + 1, 0, redirectUrl);
            return tryDownload(urls, index + 1, destPath, callback);
        }

        if (res.statusCode !== 200 || !res.headers['content-type']) {
            return tryDownload(urls, index + 1, destPath, callback);
        }

        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
            const buffer = Buffer.concat(chunks);
            if (buffer.length > 100) {
                fs.writeFileSync(destPath, buffer);
                callback(true);
            } else {
                tryDownload(urls, index + 1, destPath, callback);
            }
        });
    });

    req.on('error', () => tryDownload(urls, index + 1, destPath, callback));
    req.on('timeout', () => { req.destroy(); tryDownload(urls, index + 1, destPath, callback); });
}

// ─── Create placeholder icon ────────────────────────────────────────────────

function createPlaceholderIcon(destPath) {
    // Minimal valid 1x1 PNG
    const pngHeader = Buffer.from([
        0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
        0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52, // IHDR chunk
        0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, // 1x1
        0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, // 8-bit RGB
        0xDE, 0x00, 0x00, 0x00, 0x0C, 0x49, 0x44, 0x41, // IDAT chunk
        0x54, 0x08, 0xD7, 0x63, 0xF8, 0xCF, 0xC0, 0x00,
        0x00, 0x00, 0x02, 0x00, 0x01, 0xE2, 0x21, 0xBC,
        0x33, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E,
        0x44, 0xAE, 0x42, 0x60, 0x82  // IEND chunk
    ]);
    fs.writeFileSync(destPath, pngHeader);
}

/**
 * Copy all files from a demo template directory to the target extension directory.
 * Replaces placeholders in the process.
 */
function copyFromDemo(demoName, targetDir, context) {
    const demoDir = path.join(getTemplatesDir(), demoName);
    if (!fs.existsSync(demoDir)) return false;

    // Recursive copy
    function copyDir(src, dest) {
        fs.mkdirSync(dest, { recursive: true });
        const entries = fs.readdirSync(src, { withFileTypes: true });

        for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);

            if (entry.isDirectory()) {
                copyDir(srcPath, destPath);
            } else {
                if (!entry.name.endsWith('.js') && entry.name !== 'plugin.json') {
                    fs.copyFileSync(srcPath, destPath);
                    continue;
                }

                let content = fs.readFileSync(srcPath, 'utf8');

                // Substitution logic
                if (entry.name === 'plugin.json') {
                    const json = JSON.parse(content);
                    json.metadata.name = context.name;
                    json.metadata.author = context.author;
                    json.metadata.source = context.source;
                    json.metadata.version = 1;
                    // Recompute regexp
                    json.metadata.regexp = context.source.replace(/https?:\/\//, '').replace(/\./g, '\\\\.').replace(/\/$/, '') + '/[^/]+/?$';
                    content = JSON.stringify(json, null, 2);
                } else if (entry.name.endsWith('.js')) {
                    // Replace placeholders
                    content = content
                        .replace(/DEMO_NOVEL|DEMO_COMIC|DEMO_VIDEO/g, context.name)
                        .replace(/TODO_AUTHOR/g, context.author)
                        .replace(/https:\/\/TODO_DOMAIN\.net/g, context.source)
                        .replace(/TODO_DOMAIN/g, context.domain);
                    
                    // Inject BASE_URL if used but not defined (simple check)
                    if (content.includes('BASE_URL') && !/(\bvar|\blet|\bconst)\s+BASE_URL\b/.test(content)) {
                        content = `var BASE_URL = "${context.source}";\n\n` + content;
                    }
                }

                fs.writeFileSync(destPath, content);
            }
        }
    }

    copyDir(demoDir, targetDir);
    return true;
}

// ─── Command Registration ───────────────────────────────────────────────────

function register(program) {
    program.command('create')
        .description('Scaffold a new VBook extension')
        .argument('<name>', 'Extension name (also used as directory name)')
        .requiredOption('-s, --source <url>', 'Source website URL (e.g. https://example.com)')
        .option('-t, --type <type>', 'Extension type', 'novel')
        .option('-l, --locale <locale>', 'Locale code', 'vi_VN')
        .option('--tag <tag>', 'Tag (e.g. nsfw)')
        .option('--minimal', 'Only create required files (detail, page, toc, chap)')
        .action(async (name, options) => {
            try {
                const extensionsDir = getExtensionsDir();
                const extDir = path.join(extensionsDir, name);
                const srcDir = path.join(extDir, 'src');

                if (fs.existsSync(extDir)) {
                    console.error(c.error(`Directory already exists: ${extDir}`));
                    return;
                }

                const source = options.source.replace(/\/$/, ''); // Remove trailing slash
                const domain = new URL(source).host;
                const author = getAuthor();

                console.log(c.bold(`\n🏗️  Creating extension: ${c.cyan(name)}\n`));

                const demoFolderName = `_demo_${options.type}`;
                const hasDemo = copyFromDemo(demoFolderName, extDir, { name, author, source, domain, type: options.type });

                if (hasDemo) {
                    console.log(c.green(`  ✨ Using template from: templates/${demoFolderName}`));
                    console.log(c.dim(`  📁 extensions/${name}/`));
                } else {
                    // Fallback to legacy hardcoded templates
                    // Decide which scripts to create
                    // page.js là bắt buộc — luôn tạo, kể cả khi minimal
                    const scripts = options.minimal
                        ? ['detail.js', 'page.js', 'toc.js', 'chap.js']
                        : ['home.js', 'gen.js', 'search.js', 'detail.js', 'page.js', 'toc.js', 'chap.js'];

                    // Create directories
                    fs.mkdirSync(srcDir, { recursive: true });
                    console.log(c.dim(`  📁 extensions/${name}/`));
                    console.log(c.dim(`  📁 extensions/${name}/src/`));

                    // Create plugin.json
                    const pluginContent = templatePluginJson({
                        name, source, type: options.type, locale: options.locale,
                        author, tag: options.tag, scripts
                    });
                    fs.writeFileSync(path.join(extDir, 'plugin.json'), pluginContent);
                    console.log(c.green(`  ✅ plugin.json`));

                    // Create script files
                    const templateMap = {
                        'home.js':   () => templateHome(source),
                        'gen.js':    () => templateGen(source),
                        'search.js': () => templateSearch(source),
                        'detail.js': () => templateDetail(source),
                        'page.js':   () => templatePage(source),
                        'toc.js':    () => templateToc(source),
                        'chap.js':   () => templateChap(source),
                    };

                    for (const s of scripts) {
                        const templateFn = templateMap[s];
                        if (templateFn) {
                            fs.writeFileSync(path.join(srcDir, s), templateFn());
                            console.log(c.green(`  ✅ src/${s}`));
                        }
                    }
                }

                // Try to download favicon
                const iconPath = path.join(extDir, 'icon.png');
                process.stdout.write(c.dim('  ⬇️  Downloading icon... '));
                const downloaded = await downloadFavicon(source, iconPath);
                if (downloaded) {
                    console.log(c.green('OK'));
                } else {
                    createPlaceholderIcon(iconPath);
                    console.log(c.yellow('placeholder (replace with 64x64 icon)'));
                }

                // Print next steps
                console.log(c.bold('\n📋 Next steps:'));
                console.log(c.cyan(`  1. cd extensions/${name}`));
                console.log(c.cyan(`  2. Analyze ${source} → update CSS selectors in src/ files`));
                console.log(c.cyan(`  3. vbook validate        → check for errors`));
                console.log(c.cyan(`  4. vbook debug src/detail.js -in "${source}/some-book"  → test`));
                console.log(c.cyan(`  5. vbook test-all        → full flow test`));
                console.log(c.cyan(`  6. vbook publish         → build + update plugin list`));
                console.log('');

            } catch (error) {
                console.error(c.error(error.message));
            }
        });
}

module.exports = { register };
