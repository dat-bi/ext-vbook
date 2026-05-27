var BASE_URL = 'https://ntruyen.xyz';
var BASE_UA = 'Mozilla/5.0 (Linux; Android 12; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Mobile Safari/537.36';
try {
    if (CONFIG_URL) {
        BASE_URL = CONFIG_URL;
    }
    if (CONFIG_UA) {
        BASE_UA = CONFIG_UA;
    }
} catch (error) {
}

function fetchPage(url, options) {
    if (!options) options = {};

    var headers = {
        'User-Agent': BASE_UA,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    };

    if (options.headers) {
        for (var key in options.headers) {
            headers[key] = options.headers[key];
        }
    }

    options.headers = headers;
    return fetch(url, options);
}