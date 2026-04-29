load("config.js");

// page.js — intermediary between detail and toc
// This site has playlist on the same page (no pagination for TOC).
function execute(url) {
    url = (url || "") + "";
    url = decodeURI(url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL));
    if (url.slice(-1) === "/") url = url.slice(0, -1);
    return Response.success([url]);
}

