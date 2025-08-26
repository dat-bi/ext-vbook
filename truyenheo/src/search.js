load('config.js');
function execute(key) {
    var browser = Engine.newBrowser(); // Khởi tạo browser
    browser.launchAsync(BASE_URL + "/tim-kiem/#gsc.tab=0");
    sleep(3000);
    browser.callJs(`function setGCSQueryAndSearch(q) {
    const input = document.querySelector('#gsc-i-id1');
    if (input) {
        input.value = q;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'n', bubbles: true }));
        input.dispatchEvent(new KeyboardEvent('keyup', { key: 'n', bubbles: true }));
        const btn = document.querySelector('button.gsc-search-button') || document.querySelector('.gsc-search-button-v2');
        if (btn) btn.click();
        else {input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
            input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true }));}}};setGCSQueryAndSearch("${key}");`, 1000);
    let doc = browser.html();
    browser.close();
    console.log(doc);
    let data = [];
    let elems = doc.select(".gs-webResult .gsc-thumbnail-inside")
    console.log(elems)
    if (!elems.length) return Response.error(key);

    elems.forEach(function (e) {
        var link = e.select('a.gs-title').attr('href')
        var name1 = e.select('a.gs-title').text();
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

