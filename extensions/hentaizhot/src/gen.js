load("config.js");

// gen.js — Danh sách truyện từ 1 trang URL
// Contract: execute(url, page) → [{name*, link*, cover?, description?, host?, tag?}], nextPage?
function execute(url, page) {
    if (!page) page = "1";

    // Normalize URL
    url = (url || "") + "";
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    var pageUrl = url.indexOf("{{page}}") > -1 ? url.replace("{{page}}", page) : url;
    if (pageUrl.indexOf("page=") === -1 && page !== "1") {
        pageUrl = pageUrl + (pageUrl.indexOf("?") > -1 ? "&" : "?") + "page=" + page;
    }

    // API mode: SvelteKit __data.json
    if (pageUrl.indexOf("/__data.json") > -1) {
        var res = fetch(pageUrl, { headers: { "Accept": "application/json, text/plain, */*" } });
        if (!res.ok) return Response.error("Cannot load: " + res.status);

        var root = null;
        try { root = JSON.parse(res.text() + ""); } catch (e) { root = null; }
        if (!root || !root.nodes) return Response.error("Invalid payload");

        function resolveValue(v, table, memo) {
            if (v === null || v === undefined) return v;
            if (typeof v === "number") {
                if (memo.hasOwnProperty(String(v))) return memo[String(v)];
                var raw = table[v];
                memo[String(v)] = raw; // Placeholder for recursion
                var resolved = resolveValue(raw, table, memo);
                memo[String(v)] = resolved;
                return resolved;
            }
            if (Array.isArray(v)) {
                return v.map(function (x) { return resolveValue(x, table, memo); });
            }
            if (typeof v === "object") {
                var outObj = {};
                for (var k in v) {
                    if (v.hasOwnProperty(k)) {
                        outObj[k] = resolveValue(v[k], table, memo);
                    }
                }
                return outObj;
            }
            return v;
        }

        var payload = null;
        for (var i = 0; i < root.nodes.length; i++) {
            var n = root.nodes[i];
            if (n && n.type === "data" && Array.isArray(n.data)) {
                payload = resolveValue(n.data[0], n.data, {});
                if (payload && (payload.episodes || payload.genres || payload.items || payload.genre)) break;
            }
        }

        if (!payload) return Response.error("Data structure not found");

        // Items can be in .episodes, .items, or just the payload itself if it's an array
        var items = payload.episodes || payload.items || (Array.isArray(payload) ? payload : []);

        // If it's a genre page, it might be nested differently
        if (items.length === 0 && payload.genre && payload.genre.episodes) {
            items = payload.genre.episodes;
        }

        var dataApi = [];
        items.forEach(function (item) {
            if (!item) return;
            var slug = (item.slug || "") + "";
            if (!slug) return;

            // Extract episode count for tags
            let tags = "";
            var epCount = 0;
            var slugMatch = slug.match(/-(\d+)$/);
            if (slugMatch) {
                epCount = parseInt(slugMatch[1]) || 0;
            }
            if (epCount === 0) {
                epCount = item.episodeNumber || 0;
            }
            if (epCount > 0) {
                tags = "Tập " + epCount;
            }

            var name = ((item.title || item.name || slug) + "").trim();

            // Image logic: posterImage > backdropImage > thumbnailImage
            var cover = "";
            var imgObj = item.posterImage || item.backdropImage || item.thumbnailImage;
            if (imgObj && imgObj.filePath) {
                cover = imgObj.filePath + "";
            } else if (payload.genre) {
                var gImg = payload.genre.posterImage || payload.genre.backdropImage || payload.genre.thumbnailImage;
                if (gImg && gImg.filePath) cover = gImg.filePath + "";
            }

            if (cover && cover.indexOf("http") !== 0) {
                cover = cover.indexOf("/") === 0 ? (IMAGE_URL + cover) : (IMAGE_URL + "/" + cover);
            }

            dataApi.push({
                name: name,
                link: encodeURI(BASE_URL + "/watch/" + slug),
                cover: cover,
                host: BASE_URL,
                tag: tags
            });
        });

        var nextPage = String(parseInt(page) + 1);

        return Response.success(dataApi, nextPage);
    }

    // Browser Fallback (Server-side rendering)
    var b = Engine.newBrowser();
    var doc = null;
    try {
        b.setUserAgent(UserAgent.chrome());
        b.launchAsync(pageUrl);

        for (var j = 0; j < 10; j++) {
            sleep(700);
            doc = b.html(2000);
            if (doc && doc.select('a[href*="/watch/"]').size() > 0) break;
        }
    } finally {
        b.close();
    }

    if (!doc) return Response.error("Cannot load page content");

    var data = [];
    var seen = {};

    doc.select('a[href*="/watch/"]').forEach(function (a) {
        var href = (a.attr("href") || "") + "";
        if (!href || seen[href]) return;
        seen[href] = true;

        var name = (a.attr("title") || a.text() || "").trim();
        var imgEl = a.select("img").first();
        var cover = imgEl ? (imgEl.attr("src") || imgEl.attr("data-src") || "") : "";

        if (cover && cover.indexOf("http") !== 0) {
            cover = cover.indexOf("/") === 0 ? (IMAGE_URL + cover) : (IMAGE_URL + "/" + cover);
        }

        var link = href.indexOf("http") === 0 ? href : (href.indexOf("/") === 0 ? (BASE_URL + href) : (BASE_URL + "/" + href));
        data.push({
            name: name || link,
            link: encodeURI(link),
            cover: cover,
            host: BASE_URL
        });
    });

    if (data.length === 0) return Response.error("No items found");

    var nextPage = String(parseInt(page) + 1);
    return Response.success(data, nextPage);
}
