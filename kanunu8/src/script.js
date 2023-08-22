function execute(url) {
    let response = fetch(url);

    // if (response.ok) {
        let headers = response.headers.Referer;
        // let doc = headers.html();

        // const vipAlert = '<br><br>----------<br>这是VIP章节, 需要订阅后才能阅读';
        // let htm = $.Q(doc, 'div.read-content.j_readContent').html();
    console.log(headers)

}