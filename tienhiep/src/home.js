function execute() {
    return Response.success([
            {title: "Truyện Hay", input: "/the-loai/truyen-hay", script: "gen.js"},
            {title: "Tiên Hiệp", input: "/the-loai/tien-hiep", script: "gen.js"},
            {title: "Kiếm Hiệp", input: "/the-loai/kiem-hiep", script: "gen.js"},
            {title: "Võ Hiệp", input: "/the-loai/vo-hiep", script: "gen.js"},
            {title: "Nữ Hiệp", input: "/the-loai/nu-hiep", script: "gen.js"},
            {title: "Huyền Huyễn", input: "/the-loai/huyen-huyen", script: "gen.js"},
            {title: "Huyền Bí", input: "/the-loai/huyen-bi", script: "gen.js"},
            {title: "Lịch Sử", input: "/the-loai/lich-su", script: "gen.js"},
            {title: "Đô Thị", input: "/the-loai/do-thi", script: "gen.js"},
            {title: "Ngôn Tình", input: "/the-loai/ngon-tinh", script: "gen.js"},
            {title: "Đồng Nhân", input: "/the-loai/dong-nhan", script: "gen.js"},
            {title: "Võng Du", input: "/the-loai/vong-du", script: "gen.js"},
            {title: "Khoa Ảo", input: "/the-loai/khoa-ao", script: "gen.js"},
            {title: "Truyện Việt", input: "/the-loai/truyen-viet", script: "gen.js"},
            {title: "Light Novel", input: "/the-loai/light-novel", script: "gen.js"},
            {title: "Trọng Sinh", input: "/the-loai/trong-sinh", script: "gen.js"},
            {title: "Du Hí", input: "/the-loai/du-hi", script: "gen.js"},
            {title: "Quân Sự", input: "/the-loai/quan-su", script: "gen.js"},
            {title: "Hài Hước", input: "/the-loai/hai-huoc", script: "gen.js"},
            {title: "Cung Đấu", input: "/the-loai/cung-dau", script: "gen.js"},
    ]);
}
//
// console.log([...document.querySelectorAll('.dropdown-menu li a')].map(e => `{title: "${e.innerText}", input: "${e.href.replace(/^(?:\/\/|[^/]+)*/, '')}", script: "gen.js"},`).join('\n'));