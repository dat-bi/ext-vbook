load('libs.js');
load('config.js');

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();

        var htm = $.Q(doc, 'div.txtnav', {remove: ['h1', 'div','script']}).html();

        htm = cleanHtml(htm)
            .replace(/^ *第\d+章.*?<br>/, '') // Ex: '  第11745章 大结局，终<br>'
            .replace(/<br\s*\/?>|\n/g, "<br><br>")
            .replace('新69書吧→69𝔰𝔥𝔲𝔵.𝔠𝔬𝔪', '')
            .replace('💘🎈\u2003６９şнυ𝕩.𝕔ό𝕞\u2003♨🐧', '')
            .replace('【麻煩您動動手指，把本網站分享到Facebook臉書，這樣我們能堅持運營下去】', '')
            ;
        
        // log(htm);

        return Response.success(htm);
    }
    return null;
}