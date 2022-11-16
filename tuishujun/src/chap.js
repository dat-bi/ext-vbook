function execute(url) {
    let commentsAll ="";
// https://pre-api.tuishujun.com/api/listBookScoreByBook?book_id=634&type=long&page=1&pageSize=50&sort_field=reply_number&sort_value=desc
    let response = fetch(url+"&pageSize=20");
    if (response.ok) {
        let json = response.json();
        let comments = json.data.data;
        for (let i = 0; i < comments.length; i++) {
            let author = comments[i].user.nickname;
            let content = comments[i].content;
  
            let score = comments[i].score;
            let commentInfo ="--------<br>#" +(i+1) + " " + author +"  : " + score +"/10 Điểm"+"<br>" + content.replace(/(?:\r\n|\r|\n)/g, '<br>');
            commentsAll = commentsAll + commentInfo + "<br><br>";
        }

    }
    if (commentsAll.replace("<br>","") !== null && commentsAll.replace("<br>","") !== '') 
        return Response.success(commentsAll);

    return null;

}