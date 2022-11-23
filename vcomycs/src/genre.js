function execute() {
    var doc = Http.get("https://vcomycs.net/so-do-trang/").html()
    var genres = doc.select(".tags a")
    var listGenre = []
    // for(var i in genres){
    //     var genre = genres[i]
    //     listGenre.push({
    //         title: genre.text(),
    //         input: genre.attr("href"),
    //         script: "gen.js"
    //     })
    // }
    genres.forEach(genre=> listGenre.push({
            title: genre.text(),
            input: genre.attr("href"),
            script: "gen.js"
        }))
    return Response.success(listGenre)
}