load("voice_list.js");

var WS_URL = "wss://sami-normal-sg.capcutapi.com/internal/api/v1/ws?device_id=7486429558272460289&iid=7486431924195657473&app_id=359289&region=VN&update_version_code=5.7.1.2101&version_code=5.7.1&appKey=ddjeqjLGMn&device_type=macos&device_platform=macos";
var APP_KEY = "ddjeqjLGMn";
var TOKEN = "WTV6R2t6V3ZwNUIwQkFETutGxuveRZ9iTmOBC/a3wzMS7zzza86Ky9nIfYhyeoSiWYP1ZO04X7X1+RThg/zczU6u8ga3dTIJpduvWpCqrmr0Kv7BJf6tcGFgevJ/Jaa1slHj/l4NUJ/eCesl1dYBYQ51oKbuFnZjF7qXVWzsoz326XwRdNEmOufSHnuW+kuy+sS7K/sn3gVWsCC4XFi+FYntDxrVTYS/Pv2LtBgpgULmib5+5kMq2ZuJfCDYvq4NthciciB6KUCf1sOsu7VD/27Tquz8Q58NYALFvX85bjvxQJOz0iV3oUiip0RyqR1ltZPNI/LgN2OGCphyCgOJdlUUdgIbSJpaKL+5PMTM4yBuwCU4QPbYYzTs9x2ZA+7zt41ng+i5+EPtePyDjR4VFTz+7zglLw/E+KqN/nscyqLCyrumn4YgfQ3JYnSnz1WLE6q3aD175yweKBj9f9jyqxnLVmEYy9VjmoxuYNRgVmfT6M17bT9iL0PJTlJ6UqKHuNRT6ubv37ZSr961Gw+RJhyLUDBt8AD1B8YDdF4OImS+LgGjfujaY1agc4tfrnk4V4YcAXyTRlYwLMC9ATDp9CbiBrlMBmYm88gwGaTR9pbI2KcQ4Kg86jZYc6CxNM34sbMG/1LlmqvqLe+E3IG6ebOmyVbL+kYK70c1fT5TcmzVwX5O3JGkHHtFoeCmd4Eyyov6QsO1Jewx0gpjp05dqw==";

function execute(text, voice) {
    text = cleanText(text);
    if (!text) return Response.success("");

    voice = normalizeVoice(voice);

    var browser = Engine.newBrowser();
    try {
        browser.setUserAgent(UserAgent.chrome());
        browser.loadHtml(buildHtml(text, voice), "https://chillaudio.org/");

        var startedAt = new Date().getTime();
        while (new Date().getTime() - startedAt < 12000) {
            var done = "";
            try {
                done = jsText(browser.callJs("window.__vbookTtsDone ? '1' : '0'", 1000));
            } catch (e) {}

            if (done === "1") {
                var error = jsText(browser.callJs("window.__vbookTtsError || ''", 2000));
                if (error) return Response.error(error);

                var audio = jsText(browser.callJs("window.__vbookTtsResult || ''", 5000));
                if (audio && audio.length > 100) return Response.success(audio);
                return Response.error("ChillAudio TTS returned empty audio");
            }

            sleep(100);
        }

        return Response.error("ChillAudio TTS browser timeout");
    } catch (err) {
        return Response.error("ChillAudio TTS browser error: " + String(err));
    } finally {
        try { browser.close(); } catch (e2) {}
    }
}

function normalizeVoice(voice) {
    var selected = String(voice || "");
    for (var i = 0; i < voices.length; i++) {
        if (voices[i].id === selected) return selected;
    }
    return "BV421_vivn_streaming";
}

function cleanText(text) {
    return String(text || "")
        .replace(/[\r\n\t]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function jsText(value) {
    var text = String(value || "");
    var match = text.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (match) text = match[1];
    return text
        .replace(/^\s+|\s+$/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, "\"")
        .replace(/&#39;/g, "'");
}

function createStartTask(text, voice) {
    return {
        appkey: APP_KEY,
        event: "StartTask",
        namespace: "TTS",
        payload: JSON.stringify({
            audio_config: {
                bit_rate: 128000,
                format: "mp3",
                sample_rate: 24000
            },
            speaker: voice,
            text: text
        }),
        token: TOKEN,
        version: "sdk_v1"
    };
}

function buildHtml(text, voice) {
    var startTask = JSON.stringify(createStartTask(text, voice));
    var wsUrl = JSON.stringify(WS_URL);
    return "<!doctype html><html><head><meta charset='utf-8'></head><body><script>" +
        "window.__vbookTtsDone=false;" +
        "window.__vbookTtsError='';" +
        "window.__vbookTtsResult='';" +
        "function enc(bytes){" +
        "var chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';" +
        "var out='',i=0;" +
        "for(;i+2<bytes.length;i+=3){" +
        "var n=(bytes[i]<<16)|(bytes[i+1]<<8)|bytes[i+2];" +
        "out+=chars[(n>>18)&63]+chars[(n>>12)&63]+chars[(n>>6)&63]+chars[n&63];" +
        "}" +
        "if(i<bytes.length){" +
        "var n2=bytes[i]<<16;" +
        "if(i+1<bytes.length)n2|=bytes[i+1]<<8;" +
        "out+=chars[(n2>>18)&63]+chars[(n2>>12)&63]+(i+1<bytes.length?chars[(n2>>6)&63]:'=')+'=';" +
        "}" +
        "return out;" +
        "}" +
        "function finish(chunks){" +
        "var len=0,i=0;" +
        "for(i=0;i<chunks.length;i++)len+=chunks[i].length;" +
        "var all=new Uint8Array(len),pos=0;" +
        "for(i=0;i<chunks.length;i++){all.set(chunks[i],pos);pos+=chunks[i].length;}" +
        "window.__vbookTtsResult=enc(all);" +
        "window.__vbookTtsDone=true;" +
        "}" +
        "try{" +
        "var chunks=[];" +
        "var ws=new WebSocket(" + wsUrl + ");" +
        "ws.binaryType='arraybuffer';" +
        "ws.onopen=function(){ws.send(" + JSON.stringify(startTask) + ");};" +
        "ws.onerror=function(){window.__vbookTtsError='ChillAudio browser websocket error';window.__vbookTtsDone=true;};" +
        "ws.onmessage=function(ev){" +
        "if(typeof ev.data==='string'){" +
        "try{" +
        "var msg=JSON.parse(ev.data);" +
        "if(msg.event==='TaskFailed'){window.__vbookTtsError='ChillAudio TTS task failed';window.__vbookTtsDone=true;try{ws.close();}catch(e){}}" +
        "if(msg.event==='TaskEnd'||msg.event==='TaskFinished'){finish(chunks);try{ws.close();}catch(e2){}}" +
        "}catch(ignore){}" +
        "}else{" +
        "chunks.push(new Uint8Array(ev.data));" +
        "}" +
        "};" +
        "}catch(e3){window.__vbookTtsError=String(e3);window.__vbookTtsDone=true;}" +
        "</script></body></html>";
}
