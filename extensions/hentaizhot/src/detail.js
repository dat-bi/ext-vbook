load("config.js");

function execute(url) {
    url = decodeURI(url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL));
    var slug = url.split('/').pop();

    // 1. Fetch HTML và bóc tách Hardcode Metadata
    var res = fetch(url, { headers: { "User-Agent": UserAgent.chrome() } });
    if (!res.ok) return Response.error("Không thể tải trang");
    var html = res.text() + "";

    var name = "", cover = "", author = "", description = "", genres = [], episodeId = "";

    // Tìm khối dữ liệu SvelteKit
    var dataMatch = html.match(/data:\s*(\[[\s\S]*?\]),\s*form:/);
    if (dataMatch) {
        try {
            // SvelteKit data thường là một mảng, node cuối (thường index 2 hoặc 3) chứa episode info
            var rawData = dataMatch[1];
            var dataArr = [];
            eval("dataArr = " + rawData + ";");
            // Tìm object có chứa episode info
            var epData = null;
            for (var i = 0; i < dataArr.length; i++) {
                if (dataArr[i] && dataArr[i].data && dataArr[i].data.episode) {
                    epData = dataArr[i].data.episode;
                    break;
                }
            }

            if (epData) {
                episodeId = epData.id || "";
                name = epData.title || "";
                description = (epData.description || "").replace(/<[^>]*>?/gm, '').trim();

                // Image logic: posterImage > backdropImage > thumbnailImage
                var imgObj = epData.posterImage || epData.backdropImage || epData.thumbnailImage;
                if (imgObj && imgObj.filePath) {
                    cover = IMAGE_URL + imgObj.filePath;
                }

                if (epData.studios && epData.studios.length > 0) {
                    author = epData.studios[0].studio.name || "";
                }

                if (epData.genres && epData.genres.length > 0) {
                    epData.genres.forEach(function (g) {
                        if (g.genre) {
                            genres.push({
                                title: g.genre.name,
                                input: BASE_URL + "/genres/" + g.genre.slug + "/__data.json?page={{page}}&x-sveltekit-invalidated=001",
                                script: "gen.js"
                            });
                        }
                    });
                }
            }
        } catch (e) {
            // Nếu parse hỏng thì dùng fallback cũ
        }
    }

    var hash = "1edhnia";
    load("crypto.js");
    var payload = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify([{ "currentSlug": 1 }, slug])));
    var apiUrl = BASE_URL + "/_app/remote/" + hash + "/getSeriesEpisodes?payload=" + encodeURIComponent(payload);
    var apiRes = fetch(apiUrl);
    if (apiRes.ok) {
        var apiData = JSON.parse(apiRes.text() + "");
        if (apiData.result || (apiData.data && apiData.data.result)) {
            var svelteData = apiData.result || apiData.data.result;
            cacheStorage.setItem("cached_toc_" + slug, svelteData);
            // Lấy cover từ getSeriesEpisodes nếu page không có cover
            if (!cover) {
                var matchCover = svelteData.match(/(\/202[0-9]\/[0-9]{2}\/[a-zA-Z0-9-]+\.(?:jpg|png|webp))/);
                if (matchCover) {
                    cover = IMAGE_URL + matchCover[1];
                }
            }
        }
    }

    var result = {
        name: name || slug,
        cover: cover,
        host: BASE_URL,
        author: author,
        description: description,
        ongoing: false,
        format: "series",
        genres: genres.length > 0 ? genres : undefined,
        suggests: [{ title: "Đề xuất: " + (name || slug), input: (name || slug), script: "search.js" }]
    };

    if (hash && episodeId) {
        load("crypto.js");
        var suggestPayload = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify([
            { "currentId": 1, "excludeIds": 2 }, episodeId, []
        ])));
        result.suggests = [{
            title: "Đề xuất",
            input: BASE_URL + "/_app/remote/" + hash + "/getSuggestedEpisodes?payload=" + encodeURIComponent(suggestPayload),
            script: "suggest.js"
        }];

        result.comments = [{
            title: "Bình luận",
            input: episodeId,
            script: "comment.js"
        }];
    }
    return Response.success(result);
}
