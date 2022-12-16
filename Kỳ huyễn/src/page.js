function execute(url) {
        console.log(url)
        var list = [];
        for (var i = 1; i <= 50; i++) {
            list.push("https://kyhuyen.com/tim-kiem?page=" + i);
        }
        return Response.success(list);

}