function execute(url) {
    // 1. Try fast fetch first
    let response = fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Referer': url.split('/').slice(0, 3).join('/') + '/'
        }
    });
    
    if (response.ok) {
        let text = response.text();
        let result = extractFromHtml(text);
        if (result) return Response.success(result);
    }

    // 2. Fallback to Browser Engine if fetch failed or returned gated content
    console.log("Fetch failed or gated. Using Browser Engine...");
    let browser = Engine.newBrowser();
    try {
        let doc = browser.launch(url, 5000);
        if (doc) {
            let html = doc.html();
            let result = extractFromHtml(html);
            if (result) return Response.success(result);
            
            // If still no content, maybe we need to click the unlock button?
            // But usually the content is hidden in DOM.
            let hiddenContent = doc.select(".prose").html();
            if (hiddenContent && hiddenContent.length > 200) {
                return Response.success(cleanHtml(hiddenContent));
            }
        }
    } finally {
        browser.close();
    }
    
    return Response.error("Vào trang nguồn kiểm tra click link shoppee rồi reload lại chương (Nội dung bị ẩn hoặc redirect)");
}

function extractFromHtml(html) {
    if (!html) return null;
    var doc = Html.parse(html);
    
    // Check for common content selectors
    let data = doc.select(".prose, article, #read-content, #chapter-content, .chapter-content");
    if (data && data.html() && data.html().length > 500) {
        data.select(".slide, script, style, .go4109123758").remove();
        let content = cleanHtml(data.html());
        if (content.length > 200) return content;
    }

    // Try extracting from Next.js data (__next_f)
    let nextData = extractNextContent(html);
    if (nextData && nextData.length > 200) {
        return cleanHtml(nextData);
    }
    
    return null;
}

function extractNextContent(html) {
    let fullContent = "";
    let regex = /self\.__next_f\.push\(\[1,"((?:\\.|[^"\\])*)"\]\)/g;
    let match;
    
    while ((match = regex.exec(html)) !== null) {
        let raw = match[1];
        let decoded = "";
        try {
            decoded = JSON.parse('"' + raw + '"');
        } catch (err) {
            continue;
        }

        if (decoded.indexOf("<br>") !== -1 || decoded.indexOf("<p") !== -1 || decoded.indexOf("\\u003cbr") !== -1 || decoded.indexOf("\\u003cp") !== -1) {
            let content = decoded.replace(/^(?:\w+:)?\"/, "").replace(/\"$/, "");
            if (content.length > fullContent.length) {
                fullContent = content;
            }
        }
    }
    return fullContent;
}

function cleanHtml(htm) {
    if (!htm) return "";
    return htm
        .replace(/\\u003cbr\\u003e/g, '<br>')
        .replace(/\\u003cp/g, '<p')
        .replace(/\\u003c\/p/g, '</p')
        .replace(/\\"/g, '"')
        .replace(/·/g, '')
        .replace(/&nbsp;/gi, ' ')
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
        .replace(/<p[^>]*>/gi, '')
        .replace(/<\/p>/gi, '<br>')
        .replace(/<br\s*\/?>\s*/gi, '<br>')
        .replace(/(?:<br\s*\/?>){2,}/gi, '<br><br>')
        .trim();
}


