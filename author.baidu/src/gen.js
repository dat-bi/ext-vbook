function execute(url, page) {
    var list = ["https://author.baidu.com/u?app_id=1602120334389297","L5 雪夜孤灯读闲书","https://author.baidu.com/u?app_id=1659155299674348","L7 观文说意","https://author.baidu.com/u?app_id=1660245229633615","L8 奇叔故事","https://author.baidu.com/u?app_id=1627129747346933","L11 追书追剧看老五","https://author.baidu.com/u?app_id=1680174766220516","L12 安安说评","https://author.baidu.com/u?app_id=1671106215736791","L13 昨天不见了","https://author.baidu.com/u?app_id=1580293837001911","L14 ACG漫后街"]
        const data = [];
        for(var i=0 ; i<list.length ; i+=2)
        data.push({
                name:list[i+1],
                link: list[i],
                cover: "https://www.ddxs.com/img/3/3183.jpg",
            })
        return Response.success(data)
}