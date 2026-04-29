load('config.js');

function normalizeLink(href) {
    if (!href) return '';
    if (href.indexOf('http') === 0) return href;
    if (href.charAt(0) === '/') return BASE_URL + href;
    return BASE_URL + '/' + href;
}

function maybeLinkFromSlug(slug) {
    var s = String(slug || '').trim();
    if (!s) return '';
    if (s.indexOf('http') === 0) return s;
    if (s.indexOf('/') === 0) return normalizeLink(s);
    if (s.indexOf('truyen') === 0) return normalizeLink('/' + s);
    return normalizeLink('/truyen/' + s);
}

function isArray(value) {
    return value && typeof value === 'object' && typeof value.length === 'number' && typeof value.splice === 'function';
}

function collectPossibleBooks(node, out, seen) {
    if (!node || typeof node !== 'object') return;

    if (isArray(node)) {
        for (var i = 0; i < node.length; i++) {
            
            collectPossibleBooks(node[i], out, seen);
        }
        return;
    }

    var title = node.title || node.name || node.bookName || node.novelName;
    var slug = node.slug || node.path || node.href || node.link || node.url;
    var cover = node.cover || node.thumbnail || node.image || node.poster || node.avatar;
    var description = node.author || node.description || '';

    if (title && slug && typeof title === 'string' && typeof slug === 'string') {
        var link = maybeLinkFromSlug(slug);
        if (link && !seen[link]) {
            seen[link] = true;
            out.push({
                name: String(title).trim(),
                link: link,
                cover: cover ? String(cover) : '',
                description: description ? String(description) : '',
                host: BASE_URL
            });
        }
    }

    for (var key in node) {
        if (!Object.prototype.hasOwnProperty.call(node, key)) continue;
        collectPossibleBooks(node[key], out, seen);
    }
}

function extractBuildId(doc) {
    var buildId = '';
    doc.select('script[src]').forEach(function(s) {
        if (buildId) return;
        var src = s.attr('src') || '';
        var m = src.match(/\/_next\/static\/([^\/]+)\//);
        if (m) buildId = m[1];
    });
    return buildId;
}

function fallbackFromNextData(url, page, doc) {
    var buildId = extractBuildId(doc);
    if (!buildId) return [];

    var cleanPath = String(url || '').split('?')[0];
    if (cleanPath.charAt(0) !== '/') cleanPath = '/' + cleanPath;
    if (cleanPath.length > 1 && cleanPath.charAt(cleanPath.length - 1) === '/') {
        cleanPath = cleanPath.substring(0, cleanPath.length - 1);
    }

    var q = page || '1';
    var dataUrl = BASE_URL + '/_next/data/' + buildId + cleanPath + '.json?page=' + q;
    var dataResp = fetchPage(dataUrl);
    if (!dataResp.ok) return [];

    var json = JSON.parse(dataResp.text());
    var out = [];
    collectPossibleBooks(json, out, {});
    return out;
}

function execute(url, page) {
    var target = String(url || '');
    if (target.indexOf('http') !== 0) {
        target = BASE_URL + target;
    }
    if (page && !/([?&])page=\d+/.test(url)) {
        var separator = url.indexOf('?') >= 0 ? '&' : '?';
        target += separator + 'page=' + page;
    }
    var response = fetchPage(target);
    if (response.ok) {
        var doc = response.html();
        var next = null;
        var nextHref = doc.select("a[aria-label='Go to next page']").attr('href');
        if (nextHref) {
            var match = nextHref.match(/page=(\d+)/);
            if (match) next = match[1];
        }
        var el = doc.select("a[itemprop='hasPart']");
        var data = [];
        el.forEach(function(e) {
            data.push({
                name: e.select("p[itemprop='name']").text(),
                link: e.attr('href'),
                cover: e.select("img[itemprop='image']").attr('data-src') || e.select("img[itemprop='image']").attr('src'),
                description: [
                    e.select("[itemprop='author'] [itemprop='name']").text(),
                    e.select("[itemprop='bookFormat']").text(),
                    e.select("[itemprop='dateModified']").text(),
                    e.select("[itemprop='genre']").text()
                ].filter(function(t) { return t && t.length > 0; }).join(' - '),
                host: BASE_URL
            });
        });

        if (data.length === 0) {
            data = fallbackFromNextData(url, page, doc);
        }

        return Response.success(data, next);
    }
    return Response.error('HTTP Error: ' + response.status);
}