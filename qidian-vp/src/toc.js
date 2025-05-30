load("config.js");
load("crypto.js");
function execute(url) {
    let sid = fetch(url).text().match(/\\"bookId\\":\s*(\d+)/)[1];
    if (sid) {
        const link = `${BASE_URL}api/chapters/list?book_id=${sid}&order_key=index&order_type=asc&page=1&limit=99999`;
        const ts = Date.now();  // hoặc timestamp cố định
        const secret = "qidian-vp-lam-nguoi-di-ban";
        const sig = computeSignature(link, ts, secret);
        const response = fetch(link, {
            method: "GET",
            headers: {
            "x-signature": sig,
            "x-timestamp": ts.toString(),
            "accept": "application/json, text/plain, */*",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            }
        });
        if (response.ok) {
            let data = response.json().data;
            let list = [];
            data.forEach(chap => {

                list.push({
                    name: chap.title,
                    url: url+'/chuong-'+chap.index,
                    host: BASE_URL
                })
            });
            return Response.success(list);
        }  
    }
    return null;
}

function computeSignature(fullUrl, timestamp, secret) {
  const match = fullUrl.match(/^https?:\/\/[^/]+(\/[^?]*)/);
  const pathname = match ? match[1] : "/";
  const relative = pathname.split("?")[0].replace(/^\/api/, "");
  const path = "/api" + relative;
  const payload = JSON.stringify({ path, timestamp });

  const hash = CryptoJS.HmacSHA256(payload, secret);
  return CryptoJS.enc.Hex.stringify(hash);
}

