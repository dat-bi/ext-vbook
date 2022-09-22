function execute(url) {
    if (url.slice(-1) !== "/")
        url = url + "/";
    let browser = Engine.newBrowser();
    browser.launchAsync(url);
    browser.waitUrl(".*?index.php.*?sajax=readchapter.*?", 10000);

    var retry = 0;
    var content = '';
    while (retry < 5) {
        sleep(2000);
        let doc = browser.html();
        var text = doc.select("#content-container > .contentbox").text();
        if (text.indexOf('Đang tải nội dung chương') === -1) {
            content = doc.select("#content-container > .contentbox").html();
            break;
        }
        retry++;
    }

    browser.close()

    let charMap = {
        'Ҋ': 'U',
        'ҋ': 'p',
        'Ҍ': 'N',
        'ҍ': 'e',
        'Ҏ': 'd',
        'ҏ': 'u',
        'Ґ': 'P',
        'ґ': 'z',
        'Ғ': 'j',
        'ғ': 'C',
        'Ҕ': 'H',
        'ҕ': 'g',
        'Җ': 'D',
        'җ': 'y',
        'Ҙ': 'n',
        'ҙ': 'm',
        'Қ': 'M',
        'қ': 'c',
        'Ҝ': 'O',
        'ҝ': 'W',
        'Ҟ': 'T',
        'ҟ': 'w',
        'Ҡ': 'B',
        'ҡ': 'A',
        'Ң': 'G',
        'ң': 'Z',
        'Ҥ': 'Q',
        'ҥ': 'v',
        'Ҧ': 'q',
        'ҧ': 'V',
        'Ҩ': 'o',
        'ҩ': 'f',
        'Ҫ': 'F',
        'ҫ': 'Y',
        'Ҭ': 'J',
        'ҭ': 'l',
        'Ү': 'k',
        'ү': 'X',
        'Ұ': 's',
        'ұ': 'L',
        'Ҳ': 'x',
        'ҳ': 'h',
        'Ҵ': 'E',
        'ҵ': 'K',
        'Ҷ': 'a',
        'ҷ': 'R',
        'Ҹ': 'S',
        'ҹ': 'b'
    }
    // console.log(content)
    var newContent = '';
    for (let i = 0; i < content.length; i++) {
        let newChar = charMap[content[i]];
        if (newChar) {
            newContent += newChar;
        } else {
            newContent += content[i];
        }
    }

    newContent = newContent.replace(/<p>/g, "")
    newContent = newContent.replace(/\s/g,"")
    newContent = newContent.replace(/<span.*?>(.*?)<\/span>(<br>)?/g, "")
    newContent = newContent.replace(/<iid=\"exran(.*?)\">(.*?)<\/i>/g, "$2")
    newContent = newContent.replace(/<ih=\"(.*?)\"t=\"/g, "")
    newContent = newContent.replace(/\"v=\"(.*?)\"p=\"(.*?)\"id=\"(.*?)\">(.*?)<\/i>/g, "")
    newContent = newContent.replace(/&lt;p&gt;/g, "")
    newContent = newContent.replace(/<span.*?>(.*?)<\/span>(<br>)?/g, "")
    newContent = newContent.replace(/<a href=.*?<\/a>/g, "")
    newContent = newContent.replace(/<br>/g, "\n")
    newContent = newContent.replace(/\n+/g, "<br>")
    newContent = newContent.replace(/\u201c/g, "")
    newContent = newContent.replace(/\u201d/g, "")
    newContent = newContent.replace(/&(nbsp|amp|quot|lt|gt|bp|emsp);/g, "");
    return Response.success(newContent);
}