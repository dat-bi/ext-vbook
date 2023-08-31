function execute(url) {
    let id = url.split("/")[4]
    let index = url.split("/")[5]
    let kay = "";
    if (url.includes("vbook")) {
        kay = url.match(/\?vbook\d+/g)[0];
        index = index.replace(new RegExp(kay.replace(/\?/, "\\?"), "g"), "");
    }
    let type = "Ancient";
    let enable_fanfic = 0;
    if (kay === "?vbook02") {
        enable_fanfic = 0;
        type = "Modern";
    } else if (kay === "?vbook11") {
        enable_fanfic = 1;
        type = "Ancient";
    } else if (kay === "?vbook12") {
        enable_fanfic = 1;
        type = "Modern";
    }
    let newUrl = "https://cp.nhungtruyen.com/api/chapters/0?enable_fanfic=" + enable_fanfic + "&type=" + type + "&source_id=" + id + "&index=" + index;
    console.log(newUrl)
    var response = fetch(newUrl)
    if (response.ok) {
        let json = response.json()
        let content = json._data.content
        return Response.success(content.replace(/<br>|\\n/g, "<br><br>"));
    }
    return null

}