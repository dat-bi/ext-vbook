var BASE_URL = "https://doctruyen14.biz";
try {
    if (typeof CONFIG_URL !== "undefined" && CONFIG_URL) {
        BASE_URL = String(CONFIG_URL).replace(/"/g, "").replace(/\/$/, "");
    }
} catch (error) {
}

function normalizeUrl(url) {
    var value = String(url || "").trim();
    if (!value) return BASE_URL + "/";
    if (/^https?:\/\//i.test(value)) {
        return value.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/i, BASE_URL);
    }
    return BASE_URL + (value.charAt(0) === "/" ? value : "/" + value);
}
