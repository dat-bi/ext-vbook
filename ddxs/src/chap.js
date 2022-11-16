function execute(url) {
    let response = fetch(url.replace('m.','www.'));

    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("#contents p").html();
        htm = htm.replace(/\&nbsp;/g, "").replace(/\<\a(.*?)<\/a>/g,'').replace('【话说，目前朗读听书最好用的app，野果阅读，www.yeguoyuedu.com 安装最新版。】','');
        return Response.success(htm);
    }
    return null;
}