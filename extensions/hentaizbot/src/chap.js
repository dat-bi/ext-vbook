load('config.js');

function execute(url) {
    url = normalizeUrl(url);
    var res = fetch(url, { headers: { "User-Agent": UserAgent.chrome() } });
    var doc = res && res.ok ? res.html() : null;

    if (!doc) {
        var browser = Engine.newBrowser();
        try {
            doc = browser.launch(url, 8000);
        } finally {
            browser.close();
        }
    }
    
    if (doc) {
        let tracks = [];
        let embedUrl = "";

        doc.select('script[type="application/ld+json"]').forEach(e => {
            if (embedUrl) return;
            let txt = (e.html() || "") + "";
            if (txt.indexOf("VideoObject") === -1) return;
            try {
                let obj = JSON.parse(txt);
                if (obj && obj.embedUrl) embedUrl = obj.embedUrl + "";
            } catch (err) {}
        });

        if (embedUrl) {
            tracks.push({
                title: "Play Video",
                data: normalizeUrl(embedUrl)
            });
            return Response.success(tracks);
        }

        let servers = doc.select(".player__cdn");
        
        if (servers.size() > 0) {
            let bestTrack = null;
            let fallbackTrack = null;
            for (let i = 0; i < servers.size(); i++) {
                let item = servers.get(i);
                let serverUrl = item.attr("data-source");
                if (serverUrl) {
                    let trackInfo = {
                        title: "Play Video", // Chỉ hiển thị 1 Nút dễ nhìn cho User
                        data: normalizeUrl(serverUrl)
                    };
                    if (!fallbackTrack) fallbackTrack = trackInfo;
                    
                    // Ưu tiên server có thể xử lý native trong track.js
                    if (serverUrl.indexOf("x.haiten.org") !== -1 || serverUrl.indexOf("sonar-cdn.com") !== -1 || serverUrl.indexOf("streamqq") !== -1 || serverUrl.indexOf("trivonix") !== -1 || serverUrl.indexOf("spexliu") !== -1) {
                        bestTrack = trackInfo;
                        break;
                    }
                }
            }
            if (bestTrack) {
                tracks.push(bestTrack);
            } else if (fallbackTrack) {
                tracks.push(fallbackTrack);
            }
        } else {
            tracks.push({
                title: "Server 1",
                data: url
            });
        }

        return Response.success(tracks);
    }
    return null;
}
