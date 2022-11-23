function execute() {
    return  Response.success([
        { title: "Hot tháng", input: "https://vcomycs.net/", script: "gen.js" },
        { title: "Mới cập nhật", input: "https://vcomycs.net/page/", script: "gen.js" },
        { title: "Hot nhất", input: "https://vcomycs.net/truyen-hot-nhat/", script: "gen.js" }, 
        { title: "Xem nhiều", input: "https://vcomycs.net/nhieu-xem-nhat/", script: "gen.js" }, 
    ])
}