var BASE_URL = (() => {
    let raw = (typeof CONFIG_URL !== "undefined") ? CONFIG_URL : "";
    raw = String(raw).replace(/"/g, "").trim();
    return "https://" + (raw || "khotruyenchu.space");
})();