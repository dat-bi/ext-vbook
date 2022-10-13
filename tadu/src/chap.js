function execute(url) {
    var doc = Http.get(url).html();
    var aurl = doc.select("input[id=bookPartResourceUrl]").first().attr("value")
    var doc = Http.get(aurl).string();
    var content = doc.replace(/本书首发：塔读小说APP——免费无广告无弹窗，还能跟书友们一起互动。/g, '')
    .replace(/原文来自于塔读小说APP，更多免费好书请下载塔读小说APP。/g, '')
    .replace(/塔读小说APP更多优质免费小说，无广告在线免费阅读！/g, '')
    .replace(/本小说首发站点为：塔读小说APP/g, '')
    .replace(/本文首发站点为：塔读小说APP，欢迎下载APP免费阅读。/g, '')
    .replace(/塔读小说APP，完全开源免费的网文小说网站/g, '')
    .replace(/本文首发站点为：塔读小说APP，欢迎下载APP免费阅读。/g, '')
    .replace(/本书首发：塔读小说APP\u2014\u2014免费无广告无弹窗，还能跟书友们一起互动。/g, '')
    .replace(/\{\"content\":\"/g, '')
    .replace(/\"}/g, '');
    return Response.success(content);

}
