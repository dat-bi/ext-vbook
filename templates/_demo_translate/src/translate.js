load("language_list.js");
load("config.js");

function execute(text, from, to, apiKey) {
    var cfg = manageConfig();
    text = String(text || "");
    if (!text) return Response.success("");
    if (!to || to === "auto") to = "vi";
    if (from === "auto") from = "";

    return translateContent(text, from, to, 0, cfg);
}

function translateContent(text, from, to, retryCount, cfg) {
    if (retryCount > 2) return Response.error("Translate failed");

    var lines = text.split("\n");
    var payload = [];
    for (var i = 0; i < lines.length; i++) {
        payload.push({ Text: lines[i] });
    }

    var queries = {
        to: to,
        "api-version": "3.0"
    };
    if (from) queries.from = from;

    var response = fetch("https://api-edge.cognitive.microsofttranslator.com/translate", {
        method: "POST",
        queries: queries,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getAuthorizationToken()
        },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        var result = response.text() + "";
        if (result.indexOf("[") === 0) {
            var json = JSON.parse(result);
            var translated = [];
            for (var j = 0; j < json.length; j++) {
                var item = json[j];
                if (item && item.translations && item.translations[0]) {
                    translated.push(item.translations[0].text);
                }
            }
            return Response.success(translated.join("\n").trim());
        }
    }

    try { localStorage.setItem("authorization", ""); } catch (e) {}
    return translateContent(text, from, to, retryCount + 1, cfg);
}

function getAuthorizationToken() {
    var authorization = "";
    try { authorization = localStorage.getItem("authorization") || ""; } catch (e) {}
    if (authorization) return authorization;

    var response = fetch("https://edge.microsoft.com/translate/auth", {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
    });

    if (response.ok) {
        authorization = response.text() + "";
        try { localStorage.setItem("authorization", authorization); } catch (e2) {}
        return authorization;
    }
    return "";
}
