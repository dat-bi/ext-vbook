load("voice_list.js");

var UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36";
var googleReqIdx = 0;

function execute(text, voice) {
    text = String(text || "");
    if (!text) return Response.success("");

    var lang = "vi";
    for (var i = 0; i < voices.length; i++) {
        if (voices[i].id === voice) {
            lang = voices[i].language;
            break;
        }
    }

    var token = getGoogleToken();
    var cleanText = text
        .replace(/[@^*()\\\/\-_+=><"']/g, " ")
        .replace(/, /g, ". ");

    var rpcId = "jQ1olc";
    googleReqIdx++;
    var reqId = (googleReqIdx * 100000) + Math.floor(1000 + Math.random() * 9000);
    var query =
        "rpcids=" + encodeURIComponent(rpcId) +
        "&source-path=%2F" +
        "&f.sid=" + encodeURIComponent(token["f.sid"]) +
        "&bl=" + encodeURIComponent(token.bl) +
        "&hl=" + encodeURIComponent(lang) +
        "&soc-app=1&soc-platform=1&soc-device=1" +
        "&_reqid=" + reqId +
        "&rt=c";

    var payload = [cleanText, lang, null, null, [0]];
    var fReq = JSON.stringify([[[rpcId, JSON.stringify(payload), null, "generic"]]]);
    var body = "f.req=" + encodeURIComponent(fReq) + "&at=" + encodeURIComponent(token.at);

    var response = fetch("https://translate.google.com/_/TranslateWebserverUi/data/batchexecute?" + query, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Referer": "https://translate.google.com/",
            "User-Agent": UA
        },
        body: body
    });

    if (!response.ok) return Response.error("Google TTS failed: " + response.status);

    var data = response.text() + "";
    var lines = data.split("\n");
    if (lines.length < 4) return Response.error("Google TTS returned invalid response");

    var split = JSON.parse(lines[3]);
    var base64 = JSON.parse(split[0][2])[0];
    if (!base64 || base64.length < 100) return Response.error("Google TTS returned empty audio");
    return Response.success(base64);
}

function getGoogleToken() {
    var now = new Date().getTime();
    var raw = "";
    try { raw = cacheStorage.getItem("google_token") || ""; } catch (e) {}
    if (raw) {
        try {
            var cached = JSON.parse(raw);
            if (cached && cached.token && now - cached.tokenTime < 11 * 60 * 1000) {
                return cached.token;
            }
        } catch (e2) {}
    }

    var res = fetch("https://translate.google.com/", {
        headers: { "User-Agent": UA }
    });
    if (!res.ok) throw "Google translate fetch failed: " + res.status;

    var html = res.text() + "";
    var fSidMatch = html.match(/"FdrFJe":"(.*?)"/);
    var blMatch = html.match(/"cfb2h":"(.*?)"/);
    var atMatch = html.match(/"SNlM0e":"(.*?)"/);

    var token = {
        "f.sid": fSidMatch ? fSidMatch[1] : "",
        bl: blMatch ? blMatch[1] : "",
        at: atMatch ? atMatch[1] : ""
    };
    if (!token["f.sid"] || !token.bl || !token.at) throw "Failed to parse Google token";

    try {
        cacheStorage.setItem("google_token", JSON.stringify({
            token: token,
            tokenTime: now
        }));
    } catch (e3) {}

    return token;
}
