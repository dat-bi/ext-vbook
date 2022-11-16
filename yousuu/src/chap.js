function execute(url) {
    let commentsAll ="";
    let response = fetch(url); //https://api.yousuu.com/api/book/289040/comment?page=1
    if (response.ok) {
        let json = response.json();
        let comments = json.data.comments;
        for (let i = 0; i < comments.length; i++) {
            let author = comments[i].createrId.userName;
            let content = comments[i].content;
            let comments_id = comments[i]._id;
            console.log(comments_id)
            let commentsReply= getReply(comments_id)
            console.log(commentsReply)
            let score = comments[i].score;
            if(score===1) score = "1 Sao";
            else if(score===2) score = "2 Sao";
            else if(score===3) score = "3 Sao";
            else if(score===4) score = "4 Sao";
            else score = "5 Sao";
            let commentInfo ="<br>--------------<br>#" +(i+1) + " " + author +" : " + score + "<br>" + content.replace(/(?:\r\n|\r|\n)/g, '<br>') +"<br>"+ commentsReply ;
            commentsAll = commentsAll + commentInfo + "<br><br>";
        }

    }
    if (commentsAll.replace("<br>","") !== null && commentsAll.replace("<br>","") !== '') {
            return Response.success(commentsAll);
        }
    return null;
}
function getReply(_id){
    //https://api.yousuu.com/api/comment/635fd7e9da8d51250e67678f/reply
    let response = fetch("https://api.yousuu.com/api/comment/"+_id+"/reply"); 
    let commentsReply0 = ""
    if (response.ok) {
        let json = response.json();
        let comments = json.data.commentReply;
        for (let i = 0; i < comments.length; i++) {
            let author = comments[i].fromId.userName;
            let content = comments[i].content;
            var commentInfo1 ="<br>!" +(i+1) + " " + author +"<br>" + content.replace(/(?:\r\n|\r|\n)/g, '<br>');
            commentsReply0 = commentsReply0 + commentInfo1 +"<br>"
        }
        return commentsReply0;
    }
}