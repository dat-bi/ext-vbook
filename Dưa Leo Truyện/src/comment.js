load('config.js');
function execute(input) {
    var doc = Html.parse(input);
    var comments = [];
    doc.select("li[class^=comment_]").forEach(function (e) {
        var name = e.select(".post-comments p a span").text().trim();
        var content = e.select(".post-comments span.d-block.my-2").text().trim();
            comments.push({
                name: name,
                content: content,
                description: ""
            });
    });

    return Response.success(comments);


}