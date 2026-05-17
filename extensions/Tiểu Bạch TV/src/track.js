load('config.js');

function execute(url) {
    url = (url || "") + "";

    if (url.indexOf(".mp4") !== -1 || url.indexOf(".m3u8") !== -1 || url.indexOf(".m3u9") !== -1) {
        return Response.success({
            data: url,
            type: "native",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
                "Referer": BASE_URL + "/"
            },
            host: "https://cdn.hdcdn.online",
            timeSkip: []
        });
    }

    return Response.success({
        data: url,
        type: "auto",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
            "Referer": BASE_URL + "/"
        },
        host: BASE_URL,
        timeSkip: []
    });
}
