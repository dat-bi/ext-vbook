load('libs.js');
load('1qidian.js');
load('169shu.js');
load('269shu.js');
load('1ptwxz.js');
load('1fanqie.js');
load('1qimao.js');
load('crypto.js');
function execute(url) {
    if (url.includes("m.qidian")) {
        return Response.success(getChapQidian(url))
    }
    if (url.includes("sangtac") != 1) {
        if (url.includes("html5")) {
            return Response.success(getChapHtml5(url))
        } else if (url.includes("piaotia")) {
            return Response.success(getChapPtwxz(url))
        } else if (url.includes("69shu")) {
            return Response.success(getChap69shu(url))
        } else if (url.includes("yuedu")) {
            return Response.success(getChap69yuedu(url))
        } else if (url.includes("api-bc.wtzw")) {
            return Response.success(getChapQimao(url))
        }
    }
    if  (url.includes("fanqie")) {
        return Response.success(getChapFanqie(url))
    }
}
