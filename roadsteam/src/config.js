let BASE_URL = 'https://roadsteam.net'
try {
    if (CONFIG_URL) {
        BASE_URL = CONFIG_URL;
    }
} catch (error) {
}