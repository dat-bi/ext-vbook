load('config.js');
function execute(input, page) {
    if(!page) page = '1';
    let rep = fetch(input + "&order=id&limit=5&page=" + page);
    if (!rep.ok) return null;
    let json = rep.json();
    console.log(JSON.stringify(json));
        let comments = [];
        json.data.comments.forEach(e => {
            comments.push({
                name: e.user.nick_name,
                content: e.comment_content,
            });
        });
        let next = (parseInt(page) + 1) + "";
        return Response.success(comments,next);
}