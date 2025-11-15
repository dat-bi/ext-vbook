load('libs.js');
load('config.js');

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@]+@)?(?:www\.)?([^:\/?]+)/img, BASE_URL);

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();

        var htm = $.Q(doc, '#txtcontent0', { remove: ['h1', 'div', 'script'] }).html();

        htm = cleanHtml(htm)
            .replace(/^ *第\d+章.*?<br>/, '') // Ex: '  第11745章 大结局，终<br>'
            // .replace(/.*默念三遍网址.*新.*吧.*|.*章节开始.*分享.*|新.*书吧.*|.*作者：.*|\\(本章完\\)|PS：.*求推荐！|PS：.*求收藏！|.*第.*章.*|感谢.*打赏.*|感谢.*推荐票.*|感谢.*月票.*|（.*月票.*）|（为大家的.*票加更.*）/gmi, '')
            .replace('💘🎈\u2003６９şнυ𝕩.𝕔ό𝕞\u2003♨🐧', '')
            .replace('【麻煩您動動手指，把本網站分享到Facebook臉書，這樣我們能堅持運營下去】', '')
            ;

        // log(htm);

        return Response.success(htm);
    }
    return null;
}