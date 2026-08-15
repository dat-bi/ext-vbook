load('config.js');

function execute(url) {
    return Response.success([normalizeUrl(url)]);
}
