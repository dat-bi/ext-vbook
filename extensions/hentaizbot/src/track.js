load('config.js');

function execute(url) {
    url = normalizeUrl(url);
    var chromeUa = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";

    if (url.indexOf(".mp4") !== -1 || url.indexOf(".m3u8") !== -1) {
        return Response.success({
            data: url,
            type: "native",
            headers: {
                "User-Agent": chromeUa,
                "Referer": "https://hentaiz.bot/"
            },
            host: BASE_URL,
            timeSkip: []
        });
    }

    // NATIVE giải mã JS chay cho StreamQQ (Server 1 & 3)
    if (url.indexOf("/play") !== -1 && (url.indexOf("streamqq") !== -1 || url.indexOf("trivonix") !== -1 || url.indexOf("spexliu") !== -1)) {
        
        var finalUrl = url.split('?')[0];

        try {
            var playerRes = fetch(url, {
                method: "GET",
                headers: {
                    "User-Agent": chromeUa,
                    "Referer": BASE_URL + "/",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
                },
                timeout: 10000
            });

            if (playerRes && playerRes.ok) {
                var playerHtml = playerRes.text() + "";
                var sourceMatch = playerHtml.match(/"file"\s*:\s*"([^"]+\.m3u8[^"]*)"/);
                if (sourceMatch) {
                    var streamUrl = (sourceMatch[1] + "").replace(/\\\//g, "/").replace(/\\/g, "");
                    var responseUrl = playerRes.url ? (playerRes.url + "") : url;
                    var originMatch = responseUrl.match(/^(https?:\/\/[^\/]+)/);
                    var playerOrigin = originMatch ? (originMatch[1] + "") : "https://comenti.top";

                    if (streamUrl.indexOf("//") === 0) {
                        streamUrl = "https:" + streamUrl;
                    } else if (streamUrl.indexOf("/") === 0) {
                        streamUrl = playerOrigin + streamUrl;
                    }

                    return Response.success({
                        data: streamUrl,
                        type: "native",
                        headers: {
                            "User-Agent": chromeUa,
                            "Referer": responseUrl,
                            "Origin": playerOrigin,
                            "Accept": "*/*"
                        },
                        host: playerOrigin,
                        timeSkip: []
                    });
                }
            }
        } catch (e) {}

        var configUrl = finalUrl.replace("/play", "/config");
        var originUrl = finalUrl.split("/videos")[0];
        
        try {
            // JSoup Http.post BẮT BUỘC phải có body() (dù là object rỗng)
            // Nếu không có body() nó sẽ văng Exception và lỗi tự chuyển sang auto
            var configRes = Http.post(configUrl).body("{}").headers({
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
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
                        type: "native",
                        headers: {
                            "Referer": finalUrl,
                            "User-Agent": "Mozilla/5.0"
                        },
                        host: BASE_URL,
                        timeSkip: []
                    });
                }
            }
        } catch (e) {
            // Lỗi thì rớt xuống auto
        }
    }

    // Xử lý player CDN mới: https://x.haiten.org/watch?v=<video-id>
    if (url.indexOf("x.haiten.org") > -1 || url.indexOf("sonar-cdn.com") > -1) {
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
        } catch (e) {}

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
                } catch (e) {}
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
            "Referer": "https://hentaiz.bot/"
        },
        host: BASE_URL,
        timeSkip: []
    });
}
