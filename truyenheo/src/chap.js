load('libs.js');
load('config.js');

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL)
    var response = fetch(url);
    if (response.ok) {
        var doc = response.html();
        var htm = $.Q(doc, '.ndtruyen', { remove: 'em, center, a[target="_blank"]' }).html();
        htm = htm.replace(/<br>|\\n/g,"<br><br>")
        return Response.success(htm);
    }
    return null;
}
// var $ = {
//     Q: function(e, q, i) {
//         var _empty = Html.parse('').select('body');

//         var els = e.select(q);
//         if (els == '' || els.size() == 0) return _empty;
//         if (i == undefined) return els.first();

//         if (typeof(i) == 'number') {
//             if (i == -1) return els.last();
//             if (i >= els.size()) return _empty;

//             return els.get(i);
//         } else {
//             if (i.remove) {
//                 els.select(i.remove).remove();
//             }
//             return els;
//         }
//     },
//     QA: function(e, q, o) {
//         var arr = [];
//         var els = e.select(q);
//         o = o || {};

//         if (els == '' || els.size() == 0) return o.j ? '' : arr;

//         var processItem = function(item) {
//             if (o.f) {
//                 if (o.f(item)) arr.push(o.m ? o.m(item) : item);
//             } else {
//                 arr.push(o.m ? o.m(item) : item);
//             }
//         }

//         var count = els.size();

//         if (o.reverse) {
//             for (var i = count - 1; i >= 0; i--) {
//                 var item = els.get(i);
//                 processItem(item);
//             }
//         } else {
//             for (var i = 0; i < count; i++) {
//                 var item = els.get(i);
//                 processItem(item);
//             }
//         }

//         if (o.j && typeof(o.j) == 'string') return arr.join(o.j);

//         return arr;
//     }

// }