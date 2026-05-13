// Vẽ lại ảnh nếu site mã hóa ảnh bằng cách trả về object { link: "URL ẢNH" + " " + JSON.stringify(DỮ LIỆU GIẢI MÃ), script: "image.js" }
// function execute(url) {
//     let parts = url.split(" ");
//     let response = fetch(parts[0]);
//     if (response.ok) {
//         let imageb64 = response.base64();
//         let image = Graphics.createImage(imageb64);
//         let imgWidth = image.width;
//         let imgHeight = image.height;
//         let canvas = Graphics.createCanvas(imgWidth, imgHeight);
//         JSON.parse(parts[1]).forEach(part => {
//             let sx = part[0];
//             let sy = part[1];
//             let sHeight = part[3];
//             let dx = part[4];
//             let dy = part[5];
//             let dHeight = part[7];
//             canvas.drawImage(image, sx, sy, imgWidth, sHeight, dx, dy, imgWidth, dHeight);
//         });
//         return canvas.capture();
//     }
//     return null;
// }

// Nếu site không mã hóa ảnh mà chỉ có cơ chế chống hotlink (bắt referer) → gán referer khi fetch ảnh
// function execute(url) {
//     let response = fetch(url, {
//     headers: {
//         'referer': 'https://webdemo.com/'
//     }
//     });
//     if (response.ok) {
//         return Graphics.createImage(response.base64())
//     }

//     return null;
// }
