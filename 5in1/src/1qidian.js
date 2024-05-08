function getChapQidian(url) {
    var response = fetch(url, {
        headers: {
            'user-agent': UserAgent.android(), // set chế độ điện thoại
        }
    });
    var doc = response.html();
    console.log(doc)
    var htm =  doc.select('.content').html();
    // var author_say = doc.select('.author-say p').first().html();
    // if(author_say){
    //     htm = htm +"<br><br>PS:<br><br>"+  author_say;
    // }
    return htm.replace(/<br\s*\/?>|\n/g, "<br><br>");
}
function getTocQidian(url) {
    let idBook = url.match(/\d+/g)[1];
    let response = fetch("https://m.qidian.com/book/" + idBook + "/catalog/", {
        headers: {
            'user-agent': UserAgent.android(), // set chế độ điện thoại
        }
    });
    let doc = response.html()
    let text = doc.select("#vite-plugin-ssr_pageContext").html().replace(/\<\/?script(.*?)\"?\>/g, "");
    let json = JSON.parse(text);
    const data = [];
    let q_list = json.pageContext.pageProps.pageData.vs
    q_list.forEach((q) => {
        q.cs.forEach((e) => {
            data.push({
                name: e.cN,
                url: "https://m.qidian.com/chapter/" + idBook + "/" + e.id + "/", //
                pay: e.sS == 1 ? false : true,
            })
        });
    })
    return data
    //https://vipreader.qidian.com/ajax/chapter/chapterInfo?_csrfToken=lg4ZxvMuZMDb68RpqLFHuqScEu3wKHAmG0TbXcb6&bookId=1038465154&chapterId=776211503&authorId=402481273
}
//https://book.qidian.com/ajax/book/category?_csrfToken=lg4ZxvMuZMDb68RpqLFHuqScEu3wKHAmG0TbXcb6&bookId=1038465154
function getDetailQidian(url) {
    let idBook = url.match(/\d+/g)[1];
    url = 'https://www.qidian.com/book/' + idBook + '/';
    let response = fetch(url);
    let doc;
    if (!response.ok) return null;
    if (response.status == 202) {
        let browser = Engine.newBrowser();
        browser.launch(url, 15 * 1000);
        doc = browser.html();
    }
    else {
        doc = response.html();
    }
    let cover1 = "https:" + $.Q(doc, '#bookImg img').attr('src');
    let author = doc.select('meta[property="og:novel:author"]').attr("content")
    // let a_gen = doc.select('.book-author .author-name > a');
    // let genres = [
    //     {
    //         title: a_gen.get(0).attr("title"),
    //         input: "https:" + a_gen.get(1).attr("href").replace(/-subCateId\d+/g, "-page{page}-orderId10"),
    //         script: "gen2.js"
    //     },
    //     {
    //         title: a_gen.get(1).attr("title"),
    //         input: "https:" + a_gen.get(1).attr("href") + "-page{page}-orderId10/",
    //         script: "gen2.js"
    //     }
    // ]
    // let tag = doc.select('#j-intro-honor-tag > p a');
    // tag.forEach(e => {
    //     genres.push({
    //         title: e.text(),
    //         input: "https:" + e.attr("href") + "-page{page}-orderId10/",
    //         script: "gen2.js"
    //     })
    // })
    let suggests = [
        {
            title: "Truyện cùng tác giả:",
            input: doc.select('.other-works .book-wrap-new>a'),
            script: "suggests_author.js"
        },
        {
            title: "Truyện đề cử:",
            input: doc.select('.book-weekly-hot-rec.weekly-hot-rec > div') + doc.select("#bookImg img"),
            script: "suggests_d.js"
        }
    ];
    return {
        name:  doc.select('#bookName').text(),
        cover: cover1,
        author: author,
        description:  doc.select('#book-intro-detail').html(),
        host: STVHOST,
        // genres: genres,
        suggests: suggests,
    };
}