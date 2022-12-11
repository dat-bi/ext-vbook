function execute() {

    let data = [
        '玄幻|xuanhuan|21',
        '奇幻|qihuan|1',
        '武侠|wuxia|2',
        '仙侠|xianxia|22',
        '都市|dushi|4',
        '现实|xianshi|15',
        '军事|junshi|6',
        '历史|lishi|5',
        '游戏|youxi|7',
        '体育|tiyu|8',
        '科幻|kehuan|9',
        '悬疑|lingyi|10',
        '轻小说|2cy|12',
    ];

    data.forEach((item, index) => {
        let p = data[index].split('|');
        data[index] = {
            title: p[0],
            input: p[2],
            script: "cat.js"
        };
    })

    return Response.success(data);
}