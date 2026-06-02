function configText(value, fallback) {
    if (typeof value === "undefined" || value === null) return fallback || "";
    return String(value).replace(/^"([\s\S]*)"$/, "$1").replace(/"/g, "").trim();
}

function configList(value, fallback) {
    if (typeof value === "undefined" || value === null) return fallback || [];
    var raw = String(value).replace(/^"([\s\S]*)"$/, "$1");
    var lines = raw.split("\n");
    var out = [];
    for (var i = 0; i < lines.length; i++) {
        var s = lines[i].trim();
        if (s) out.push(s);
    }
    return out.length ? out : (fallback || []);
}

function configNumber(value, fallback, isFloat) {
    if (typeof value === "undefined" || value === null) return fallback;
    var raw = String(value).replace(/"/g, "");
    var n = isFloat ? parseFloat(raw) : parseInt(raw, 10);
    return isNaN(n) ? fallback : n;
}

function manageConfig() {
    return {
        api_keys: configList(typeof api_keys !== "undefined" ? api_keys : undefined, []),
        models: configList(typeof models !== "undefined" ? models : undefined, ["default-model"]),
        listprompts: configList(typeof listprompts !== "undefined" ? listprompts : undefined, []),
        temp: configNumber(typeof temp !== "undefined" ? temp : undefined, 0.5, true),
        topP: configNumber(typeof topP !== "undefined" ? topP : undefined, 0.5, true),
        topK: configNumber(typeof topK !== "undefined" ? topK : undefined, 20, false)
    };
}
