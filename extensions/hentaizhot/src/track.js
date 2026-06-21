load('config.js');

function execute(url) {
    url = (url || "") + "";
    var chromeUa = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";
    
    if (url.indexOf(".mp4") !== -1 || url.indexOf(".m3u8") !== -1 || url.indexOf(".m3u9") !== -1) {
        return Response.success({
            data: url,
            type: "native",
            headers: {
                "User-Agent": chromeUa,
                "Referer": BASE_URL + "/"
            },
            host: BASE_URL,
            timeSkip: []
        });
        
    }

    if (url.indexOf("/play") !== -1 && (url.indexOf("streamqq") !== -1 || url.indexOf("spexliu") !== -1 || url.indexOf("trivonix") !== -1)) {
        var finalUrl = url.split('?')[0];
        finalUrl = finalUrl.replace("e.streamqq.com", "p1.spexliu.top");
        var configUrl = finalUrl.replace("/play", "/config");
        var originUrl = finalUrl.split("/videos")[0];
        
        try {
            var configRes = Http.post(configUrl).body("{}").headers({
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
                'Referer': finalUrl,
                'Content-Type': 'application/json',
                'Origin': originUrl,
                'Accept': 'application/json'
            }).string();

            if (configRes) {
                var json = JSON.parse(configRes);
                if (json && json.sources && json.sources.length > 0) {
                    return Response.success({
                        data: json.sources[0].file,
                        type: "auto",
                        headers: {
                            "Referer": finalUrl,
                            "User-Agent": "Mozilla/5.0"
                        },
                        host: BASE_URL,
                        timeSkip: []
                    });
                }
            }
        } catch (e) {}
    }

    // 2. Xử lý player CDN chính của HentaiZ.hot
    if (url.indexOf("sonar-cdn.com") > -1 || url.indexOf("x.haiten.org") > -1) {
        var vid = "";
        var directM3u8 = "";
        var originMatch = url.match(/^(https?:\/\/[^\/]+)/);
        var playerOrigin = originMatch ? (originMatch[1] + "") : "https://x.haiten.org";
        var playerHeaders = {
            "User-Agent": chromeUa,
            "Referer": playerOrigin + "/",
            "Origin": playerOrigin,
            "Accept": "*/*"
        };

        try {
            var pageRes = fetch(url, {
                method: "GET",
                headers: playerHeaders,
                timeout: 10000
            });
            if (pageRes && pageRes.ok) {
                var pageText = pageRes.text() + "";
                var directMatch = pageText.match(/https?:\\?\/\\?\/[^"'\\]+\.m3u8[^"'\\]*/);
                if (directMatch) {
                    directM3u8 = (directMatch[0] + "").replace(/\\\//g, "/").replace(/\\/g, "");
                }
                var pageVid = pageText.match(/[?&](?:v|id)=([A-Za-z0-9_-]+)/);
                if (!vid && pageVid) vid = pageVid[1] + "";
            }
        } catch(e) {}

        if (directM3u8) {
            return Response.success({
                data: directM3u8,
                type: "native",
                headers: playerHeaders,
                host: playerOrigin,
                timeSkip: []
            });
        }

        var m = url.match(/[?&](?:v|id)=([A-Za-z0-9_-]+)/);
        if (!m) m = url.match(/\/(?:embed|play|video|watch)\/([A-Za-z0-9_-]+)/);
        if (m) vid = m[1] + "";

        if (vid) {
            var subdomains = ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "c10"];
            var fallbackUrl = "";
            for (var i = 0; i < subdomains.length; i++) {
                var testUrl = "https://" + subdomains[i] + ".animez.top/" + vid + "/master.m3u8";
                if (!fallbackUrl) fallbackUrl = testUrl;
                try {
                    var playbackHeaders = {
                        "User-Agent": chromeUa,
                        "Referer": playerOrigin + "/",
                        "Origin": playerOrigin,
                        "Accept": "*/*"
                    };
                    var headers = {
                        "User-Agent": chromeUa,
                        "Referer": playerOrigin + "/",
                        "Origin": playerOrigin,
                        "Accept": "*/*",
                        "Range": "bytes=0-1"
                    };
                    var res = fetch(testUrl, {
                        method: "GET",
                        headers: headers,
                        timeout: 5000
                    });
                    if (res.status === 200 || res.status === 206) {
                        return Response.success({
                            data: testUrl,
                            type: "native",
                            headers: playbackHeaders,
                            host: playerOrigin,
                            timeSkip: []
                        });
                    }
                } catch(e) {}
            }

            return Response.success({
                data: fallbackUrl,
                type: "native",
                headers: playerHeaders,
                host: playerOrigin,
                timeSkip: []
            });
        }
    }

    return Response.success({
        data: url,
        type: "auto",
        headers: {
            "User-Agent": chromeUa,
            "Referer": BASE_URL + "/"
        },
        host: BASE_URL,
        timeSkip: []
    });
}
