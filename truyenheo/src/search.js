load('config.js');
function execute(key, page) {
    var key = encodeURIComponent(key)
    var url = "https://www.google.com/search?q=" + key + "%20site%3Ahttps%3A%2F%2Ftruyensextv.cc%2F&sca_esv=ccb8066356fd07b7&ei=RMBaaMS3M_-i1e8PqKHOyAU&ved=2ahUKEwjRnNaFrIqOAxWZkK8BHd9IMKkQm-ELegQICRAE&uact=5&oq=" + key + "%20site%3Ahttps%3A%2F%2Ftruyensextv.cc%2F&gs_lp=Egxnd3Mtd2l6LXNlcnAiJ3Ro4bulIHRpbmggc2l0ZTpodHRwczovL3RydXllbnNleHR2LmNjL0i1IVAAWOcfcAN4AJABAJgBkwSgAfQSqgELMC43LjEuMi4wLjG4AQPIAQD4AQGYAgCgAgCYAwCSBwCgB-8DsgcAuAcAwgcAyAcA&sclient=gws-wiz-serp&no_sw_cr=1&zx=1750777904180&sssc=1&vet=12ahUKEwjRnNaFrIqOAxWZkK8BHd9IMKkQm-ELegQICRAE..i"
    var browser = Engine.newBrowser() // Khởi tạo browser
    doc = browser.launch(url, 4000)
    console.log(url)
    let data = [];
    let elems = doc.select("a[href*='url?q=https:']")
    console.log(elems)
    if (!elems.length) return Response.error(key);

    elems.forEach(function (e) {
        var link = e.select('a').attr('href').match(/https:\/\/truyensextv.*?\/(.*?)\//g) + ""
        var name1 = e.select('h3').text();
        if (name1 == '') return;
        data.push({
            name: name1,
            cover: "https://i.imgur.com/5BdXa90.png",
            link: link,
            host: BASE_URL
        })
    })

    return Response.success(data);
}

