// Ưu tiên trả về trực tiếp thế này không phải load nhiều
// genre.js — Danh sách thể loại
// Contract: execute() → [{ title, input, script }]
// Cách 1: Trả về trực tiếp
function execute() {
    // TODO: Thay URL path phù hợp với site thực tế
    return Response.success([
        { title: "Thể loại 1", input: BASE_URL + "/DUONG_DAN_MOI/{{page}}",    script: "gen.js" },
        { title: "Thể loại 2", input: BASE_URL + "/DUONG_DAN_HOT/{{page}}",    script: "gen.js" },
    ]);
// có thể lấy nhanh bằng cách này console.log([...document.querySelectorAll('body > div.logo2 > div:nth-child(39) a')].map(e => `{title: "${e.innerText}", input: "${e.href.replace(/^(?:\/\/|[^/]+)*/, '')}", script: "gen.js"},`).join('\n'));
}

// Cách 2: Load từ HTML, cách này chậm hơn nhưng đầy đủ hơn
function execute() {
    // Return list of genres as objects with links
    let response = fetch(BASE_URL + "/the-loai");
    if (!response.ok) return Response.error("Cannot load genres");
    
    let doc = response.html();
    const genres = [];
    
    doc.select(".genre-list a, .list-genres a").forEach(function(el) {
        let title = el.text() + "";
        let href = el.attr("href") + "";
        if (title && href) {
            genres.push({
                title: title,
                input: BASE_URL + href,
                script: "gen.js"
            });
        }
    });
    
    return Response.success(genres);
}