var BASE_URL = "https://hsex.tv";
try { if (CONFIG_URL) BASE_URL = CONFIG_URL; } catch (e) {}

function normalizeUrl(url) {
    url = (url || "") + "";
    return url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
}

function absoluteUrl(url) {
    url = (url || "") + "";
    if (!url) return "";
    if (url.indexOf("//") === 0) return "https:" + url;
    if (url.indexOf("http") === 0) return url;
    return url.indexOf("/") === 0 ? BASE_URL + url : BASE_URL + "/" + url;
}

function translateVp(text) {
    text = (text || "") + "";
    if (!text) return "";
    try {
        return (Qt.translate(text, "vp").translateText || "") + "";
    } catch (e) {
        return text;
    }
}

function upperFirstLetter(text) {
    text = (text || "") + "";
    for (var i = 0; i < text.length; i++) {
        var ch = text.charAt(i);
        if (ch.toUpperCase() !== ch.toLowerCase()) {
            return text.substring(0, i) + ch.toUpperCase() + text.substring(i + 1);
        }
    }
    return text;
}

function upperEachWord(text) {
    text = (text || "") + "";
    var parts = text.split(" ");
    for (var i = 0; i < parts.length; i++) {
        parts[i] = upperFirstLetter(parts[i]);
    }
    return parts.join(" ");
}

function formatName(text) {
    return upperEachWord(translateVp(text).trim());
}

function formatDescription(text) {
    return upperFirstLetter(translateVp(text).trim());
}

function extractStats(el) {
    var text = el.select(".info p").text().replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
    var match = text.match(/([0-9.]+[a-zA-Z]*\s*次观看\s*\S+)/);
    return match ? match[1] : text;
}

function extractCover(el) {
    var style = el ? ((el.attr("style") || "") + "") : "";
    var m = style.match(/url\(['"]?([^'")]+)['"]?\)/);
    return m ? absoluteUrl(m[1]) : "";
}
