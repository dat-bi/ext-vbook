function execute() {
    return Response.success([
        { title: "18+", input: "/the-loai/18-", script: "gen.js" },
        { title: "3P", input: "/the-loai/3p", script: "gen.js" },
        { title: "ABO", input: "/the-loai/abo", script: "gen.js" },
        { title: "Bách Hợp", input: "/the-loai/bach-hop", script: "gen.js" },
        { title: "BoyLove", input: "/the-loai/boylove", script: "gen.js" },
        { title: "BSDM", input: "/the-loai/bsdm", script: "gen.js" },
        { title: "Chuyển Sinh", input: "/the-loai/chuyen-sinh", script: "gen.js" },
        { title: "Cổ Đại", input: "/the-loai/co-dai", script: "gen.js" },
        { title: "Cuồng Công", input: "/the-loai/cuong-cong", script: "gen.js" },
        { title: "Doujinshi", input: "/the-loai/doujinshi", script: "gen.js" },
        { title: "Drama", input: "/the-loai/drama", script: "gen.js" },
        { title: "Đam Mỹ", input: "/the-loai/dam-my", script: "gen.js" },
        { title: "Echi", input: "/the-loai/echi", script: "gen.js" },
        { title: "Giam Cầm", input: "/the-loai/giam-cam", script: "gen.js" },
        { title: "GirlLove", input: "/the-loai/girllove", script: "gen.js" },
        { title: "Hài Hước", input: "/the-loai/hai-huoc", script: "gen.js" },
        { title: "Hành Động", input: "/the-loai/hanh-dong", script: "gen.js" },
        { title: "Harem", input: "/the-loai/harem", script: "gen.js" },
        { title: "Hentai", input: "/the-loai/hentai", script: "gen.js" },
        { title: "Kịch Tính", input: "/the-loai/kich-tinh", script: "gen.js" },
        { title: "Lãng Mạn", input: "/the-loai/lang-man", script: "gen.js" },
        { title: "Manga", input: "/the-loai/manga", script: "gen.js" },
        { title: "Manhua", input: "/the-loai/manhua", script: "gen.js" },
        { title: "Manhwa", input: "/the-loai/manhwa", script: "gen.js" },
        { title: "Ngực Bự", input: "/the-loai/nguc-bu", script: "gen.js" },
        { title: "Người Thú", input: "/the-loai/nguoi-thu", script: "gen.js" },
        { title: "Oneshot", input: "/the-loai/oneshot", script: "gen.js" },
        { title: "Phiêu Lưu", input: "/the-loai/phieu-luu", script: "gen.js" },
        { title: "Tình Cảm", input: "/the-loai/tinh-cam", script: "gen.js" },
        { title: "Truyện Màu", input: "/the-loai/truyen-mau", script: "gen.js" },
        { title: "Yaoi", input: "/the-loai/yaoi", script: "gen.js" },
        { title: "Yuri", input: "/the-loai/yuri", script: "gen.js" },
    ]);
}
//console.log(
//   [...document.querySelectorAll('.dropdown-menu.scroll-menu li > a.dropdown-item')]
//     .map(e => {
//       const title = e.innerText.trim();
//       const href = e.href.replace(/^https?:\/\/[^/]+/, ''); // bỏ domain, giữ /the-loai/...
//       return `{ title: "${title}", input: "${href}", script: "gen.js" },`;
//     })
//     .join('\n')
// );