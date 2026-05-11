load('config.js');

function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        Console.log("Doc title: " + doc.select("title").text());
        
        let contentEl = doc.select("div.entry-content").first();
        if (!contentEl) {
            Console.log("Fallback 1: .story-detail-content");
            contentEl = doc.select(".story-detail-content").first();
        }
        if (!contentEl) {
            Console.log("Fallback 2: article");
            contentEl = doc.select("article").first();
        }

        if (contentEl) {
            Console.log("Content found!");
            // Remove common junk blocks
            contentEl.select(".story-navigation, .reading-tools-bar, .social-share, .baoloi, .entry-meta, script, style, ins,em, .ads-responsive").remove();
            
            // Selective removal of watermarks/ads (even nested ones)
            contentEl.select("div, span, i, p, a").forEach(function(el) {
                let text = el.text().toLowerCase();
                let style = String(el.attr("style") || "").toLowerCase();
                
                // Remove hidden elements (Site often uses position:absolute left:-9999px or display:none)
                if (style.indexOf("display:none") >= 0 || style.indexOf("opacity:0") >= 0 || style.indexOf("absolute") >= 0) {
                    el.remove();
                    return;
                }

                // Remove small elements containing site name
                if ((el.tag() + "").toLowerCase() !== 'p' && (text.indexOf("khotruyenchu") >= 0 || text.indexOf("sbs") >= 0) && text.length < 200) {
                    el.remove();
                }
                
            });

            let html = contentEl.html();
            return Response.success(cleanContent(html));
        }
    }
    return null;
}

function cleanContent(html) {
    if (!html) return "";
    
    let res = html
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?<\/style>/gi, "")
        .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
        .replace(/<div[^>]*>/gi, "")
        .replace(/<\/div>/gi, "<br>")
        .replace(/<p[^>]*>/gi, "")
        .replace(/<\/p>/gi, "<br><br>")
        .replace(/\[\s*Nội\s*Dung\s*\]/gi, "")
        .replace(/&nbsp;/g, " ")
        .replace(/\<\!\-\-.*\-\>/g, " ")
        .replace(/<br\s*\/?>\s*<br\s*\/?>/gi, "<br><br>")
        .trim();
    
    // Final text-based cleanup
    res = res.replace(/Bạn đang đọc truyện tại khotruyenchu\.obs/gi, "");
    res = res.replace(/Truy cập khotruyenchu\.*? để đọc truyện không quảng cáo rác/gi, "");
    
    return res;
}
