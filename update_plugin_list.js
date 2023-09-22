const glob = require("glob");
const fs = require('fs');

const data = {
    "metadata": {
        "author": "B",
        "description": "📛🔻📛"
    },
    "data": []
};

var files = glob.sync("*/*.json");

files.forEach((file) => {
    let raw_data = fs.readFileSync(file, {encoding: 'utf8'});
    let plugin_detail = JSON.parse(raw_data);
    let name_folder = encodeURIComponent(plugin_detail['metadata']['name'])
    data.data.push({
        "name": plugin_detail['metadata']['name'],
        "author": plugin_detail['metadata']['author'],
        "path": "https://raw.githubusercontent.com/dat-bi/ext-vbook/main/" + name_folder + "/plugin.zip",
        "version": plugin_detail['metadata']['version'],
        "source": plugin_detail['metadata']['source'],
        "icon": "https://raw.githubusercontent.com/dat-bi/ext-vbook/main/" + name_folder + "/icon.png",
        "description": plugin_detail['metadata']['description'],
        "type": plugin_detail['metadata']['type'],
        "locale": plugin_detail['metadata']['locale'],
        "tag": plugin_detail['metadata']['tag'],
    });
});


fs.writeFileSync('plugin.json', JSON.stringify(data, null, 4));