function execute(url) {
    let bookID = url.split(/[/ ]+/).pop();
    url = "https://api.yousuu.com/api/book/" + bookID;
    let response = fetch(url);
    if (response.ok) {
        let json = response.json();
        let score = json.data.bookInfo.score;
        let scorerCount = json.data.bookInfo.scorerCount;
        let scoreDetail = json.data.bookInfo.scoreDetail;
        let title = json.data.bookInfo.title;
        let author = json.data.bookInfo.author;
        let introduction = json.data.bookInfo.introduction;
        let cover = json.data.bookInfo.cover;
        let updateAt = json.data.bookInfo.updateAt;
        let status = json.data.bookInfo.status;
        // let countWord = json.data.bookInfo.countWord;
        if(status === 1) status = "完结"
        if(status === 0) status = "连载"
        if(status === 2) status = "太监"
        let detail = "作者： " + author + "<br>更新时间：" + updateAt.split("T")[0] + " " + status;
        // let detail1 =  "<br>本书字数： " + countWord + "字<br>";
        let ratingDetail = "综合评分: " +  score + "/10<br>人评分: " + scorerCount + "<br>信息评分:<br>1★: "+ (Math.round(scoreDetail[0]*100 * 10) / 10) + "%<br>2★: "+ (Math.round(scoreDetail[1]*100 * 10) / 10) + "%<br>3★: "+ (Math.round(scoreDetail[2]*100 * 10) / 10) + "%<br>4★: "+ (Math.round(scoreDetail[3]*100 * 10) / 10) + "%<br>5★: "+ (Math.round(scoreDetail[4]*100 * 10) / 10) +"%<br>";
        introduction = introduction.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        return Response.success({
            name: title,
            cover: cover,
            author: author,
            description: ratingDetail +"<br><br>作品简介: " + introduction,
            detail: detail,
            host: "https://www.yousuu.com"
        });
    }
    return null;
}