// track.js — Xử lý data (URL stream server / iframe) từ chap.js thành luồng cho player
// Contract: execute(url) → { data*, type*, headers?:Object, host?:string, timeSkip?:[{startTime, endTime}] }
// Các kiểu type hỗ trợ:
// "native"  : URL mp4/m3u8 trực tiếp, có thể thêm HTTP Headers (User-Agent, Referer)
// "auto"    : Sử dụng WebView ngầm để phát link nhúng (iframe) và tự bắt stream
load('config.js');

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    // Nếu url có đuôi video rõ ràng, gửi cho native player
    if (url.indexOf(".mp4") !== -1 || url.indexOf(".m3u8") !== -1 || url.indexOf(".m3u9") !== -1) {
        return Response.success({
            data: url,
            type: "native",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
                "Referer": BASE_URL + "/"
            },
            host: BASE_URL,
            timeSkip: []
        });
    }

    // Nếu url là iframe nhúng web, vBook WebView sẽ mở nó, chạy javascript và tự dò tìm các luồng media play bên trong nó
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
