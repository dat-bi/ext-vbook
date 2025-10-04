load('config.js');
function execute(url) {
    let id = url.match(/id=\d+/)[0];
  let url_cmt = BASE_URL + "/index/commentList?type=1&target_" +id 
  console.log(url_cmt);
  var response = fetch(url);
  if (response.ok) {
    var doc = response.html();
    let name = doc.select('.items-center  h1').text();
    let author = doc.select('.ml-3 .text-primary').first().text();
    let cover = doc.select('div.flex-1 > div.flex.items-center img').attr('data-src');
    let genres = [];
    doc.select('.line-clamp-1 a').forEach(e => {
      genres.push({
        title: e.text(),
        input:  e.attr("href"),
        script: "gen.js"
      });
    });
    return Response.success({
      name: name,
      cover: "https://base64-image.luhanhgia09.workers.dev/proxy?url=" + cover,
      author: author,
      description: doc.select('meta[name="description"]').attr('content'),
      host: BASE_URL,
      genres: genres,
      comment: {
        input: url_cmt,
        script: "comment.js"
      },
    });
  }
  return null;
}