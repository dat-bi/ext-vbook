load('libs.js');
load('1qidian.js');
load('1fanqie.js');
load('169shu.js');
load('1uukanshu.js');
load('1ptwxz.js');
// load('1html5.js');
function execute(url) {
    if (url.includes("fanqie")) {
        return Response.success(getChapFanqie(url))
    }
    if (url.includes("vipreader")) {
        return Response.success(getChapQidian(url))
    }
    if (url.includes("sangtac") != 1) {
        if (url.includes("html5")) {
            return Response.success(getChapHtml5(url))
        } else if (url.includes("piaotian")) {
            return Response.success(getChapPtwxz(url))
        } else if (url.includes("www.69")) {
            return Response.success(getChap69shu(url))
        } else if (url.includes("uukanshu")) {
            return Response.success(getChapUukanshu(url))
        }
    } else {
        return Response.success("Hiện tại chưa lấy được nội dung từ STV, đọc web khác đi!")
    }
}

// function getTostv(url) {
//     if (url.slice(-1) !== "/") url = url + "/";
//     // var content = "";
//     const book = url.split('/truyen/')[1];
//     var browser = Engine.newBrowser();
//     // browser.setUserAgent(UserAgent.android());
//     // browser.launch(url, 1000);
//     // browser.callJs(`document.location='/truyen/${book}';`, 2000);
//     // browser.callJs(`document.querySelector(".blk-item2").click();`, 1000);
//     // let doc = browser.html()
//     // var content = doc.select("#content-container .contentbox").html();
//     // while (content.includes("Đang tải nội dung chương") == 1) {
//     //     browser.callJs(`document.location='/truyen/${book}';`, 1000);
//     //     browser.callJs(`document.querySelector(".blk-item2").click();`, 1000);
//     //     let doc = browser.html()
//     //     var content = doc.select("#content-container .contentbox").html();
//     // }
//     // browser.close();
//     browser.launchAsync(url);
//     browser.callJs(`document.location='/truyen/${book}';`, 4000);
//     browser.waitUrl(".*?index.php.*?sajax=readchapter.*?", 10000);
//     var retry = 0;
//     while (retry < 5) {
//         sleep(1000);
//         let doc = browser.html();
//         var text = doc.select("#content-container > .contentbox").text();
//         if (text.indexOf('Đang tải nội dung chương') === -1) {
//             doc.select("i[hd]").remove();
//             content = doc.select("#content-container > .contentbox").html();
//             break;
//         }
//         retry++;
//     }
//     browser.close();
//     content = content.replace(/<span(.*?)>(.*?)<\/span>/g, "")
//         .replace(/id\=\"(.*?)\"/g, '')
//         .replace(/p\=\"(.*?)\"/g, '')
//         .replace(/onclick\=\"pr\(this\)\;\"/g, '')
//         .replace(/isname\=\"true\"/g, '')
//         .replace(/namelen\=\".*?\"/g, '')
//         .replace(/asynctask\=\".*?\"/g, '')
//         .replace(/style\=\".*?\"/g, '')
//         .replace(/<\/i><i h="(h|s|c)(.*?)\" t=\"(h|s|c)(.*?)\"(.*?)<\/i>/gim, '</i>')
//         .replace(/<i t="(h|s|c)(.*?)\" h=\"(h|s|c)(.*?)\"(.*?)>(.*?)<\/i>/gim, "")
//         .replace(/<i(.*?)h=\"(.*?)t=\"(.*?)\"(.*?)<\/i>/g, "$3")
//         .replace(/<i(.*?)t=\"(.*?)\"(.*?)<\/i>/g, "$2")
//         .replace(/\·\·\·\·\·\·/g, ".")
//         .replace(/\s/g, "")
//     return content;
// }