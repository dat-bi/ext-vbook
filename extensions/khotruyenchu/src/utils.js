function parseNovelList(doc) {
    let novelList = [];
    let seenLinks = {};
    let items = doc.select("a.story-list-item, .home-story-card, .entry-card, article.post");
    if (items.isEmpty()) {
        items = doc.select(".ct-container-fluid .entries article");
    }

    for (let i = 0; i < items.size(); i++) {
        let item = items.get(i);
        let titleEl = item.select("h3.story-list-title, .hs-title a, .entry-title a").first();
        if (!titleEl && (item.attr("href") + "").length > 0) titleEl = item;
        
        let name = titleEl ? titleEl.text().trim() : "";
        let link = "";
        if ((item.attr("href") + "").length > 0) {
            link = item.attr("href");
        } else {
            link = titleEl ? titleEl.attr("href") : "";
        }
        
        let coverEl = item.select("img.story-thumb-img, .hs-thumb img, img").first();
        let cover = "";
        if (coverEl) {
            cover = coverEl.attr("data-src") || coverEl.attr("data-lazy-src") || coverEl.attr("src");
        }
        
        let authorEl = item.select(".story-list-author, .entry-meta a[href*='tac-gia']").first();
        let author = authorEl ? authorEl.text().trim().replace(/✍️\s*/, "") : "";
        
        if (name && link) {
            link = normalizeUrl(link);
            if (seenLinks[link]) continue;
            seenLinks[link] = true;

            if (author && name.indexOf(author) > 0) {
                name = name.split(/✍️|⏱️/)[0].trim();
            }

            novelList.push({
                name: name,
                link: link,
                cover: cover,
                description: author ? "Tác giả: " + author : "",
                host: BASE_URL
            });
        }
    }
    return novelList;
}

function normalizeUrl(url) {
    url = (url || "") + "";
    if (url.indexOf("//") === 0) return "https:" + url;
    if (url.indexOf("http://") === 0 || url.indexOf("https://") === 0) return url;
    if (url.charAt(0) !== "/") url = "/" + url;
    return BASE_URL + url;
}
