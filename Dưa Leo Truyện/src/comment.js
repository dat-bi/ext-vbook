load('config.js');
function execute(input) {
    var doc = Html.parse(input);
    var comments = [];

    doc.select("div.li_comment").forEach(function (e) {
        // Tên user
        var name = e.select(".info_comment .top_comment span.name").text().trim();

        // Nội dung comment
        var content = e.select(".info_comment .text_comment").text().trim();

        // Chapter (nếu có)
        var chapter = e.select(".info_comment .top_comment a").text().trim();

        // Thời gian (span cuối ở bottom_comment)
        var time = "";
        var timeSpans = e.select(".info_comment .bottom_comment span");
        if (timeSpans != null && timeSpans.size() > 0) {
            time = timeSpans.get(timeSpans.size() - 1).text().trim();
        }

        // Ghép description: "Chapter 7 · 14/11/2025"
        var desc = "";
        if (chapter !== "" && time !== "") {
            desc = chapter + " · " + time;
        } else if (chapter !== "") {
            desc = chapter;
        } else if (time !== "") {
            desc = time;
        }

        if (name !== "" || content !== "") {
            comments.push({
                name: name,
                content: content,
                description: desc
            });
        }
    });

    return Response.success(comments);
}