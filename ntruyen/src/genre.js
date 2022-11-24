function execute() {

    var doc = Html.parse("<ul><li><a href=\"the-loai/tien-hiep\">Tiên Hiệp</a> </li><li><a href=\"the-loai/vo-hiep\">Võ Hiệp</a> </li><li><a href=\"the-loai/do-thi\">Đô Thị</a> </li><li><a href=\"the-loai/ngon-tinh\">Ngôn Tình</a> </li><li><a href=\"the-loai/quang-truong\">Quan Trường</a> </li><li><a href=\"the-loai/vong-du\">Võng Du</a> </li><li><a href=\"the-loai/khoa-huyen\">Khoa Huyễn</a> </li><li><a href=\"the-loai/huyen-huyen\">Huyền Huyễn</a> </li><li><a href=\"the-loai/di-gioi\">Dị Giới</a> </li><li><a href=\"the-loai/di-nang\">Dị Năng</a> </li><li><a href=\"the-loai/quan-su\">Quân Sự</a> </li><li><a href=\"the-loai/lich-su\">Lịch Sử</a> </li><li><a href=\"the-loai/xuyen-khong\">Xuyên Không</a> </li><li><a href=\"the-loai/trong-sinh\">Trọng Sinh</a> </li><li><a href=\"the-loai/trinh-tham\">Trinh Thám</a> </li><li><a href=\"the-loai/linh-di\">Linh Dị</a> </li><li><a href=\"the-loai/sac-hiep\">Sắc Hiệp</a> </li><li><a href=\"the-loai/sung\">Sủng</a> </li><li><a href=\"the-loai/nguoc\">Ngược</a> </li><li><a href=\"the-loai/cung-dau\">Cung Đấu</a> </li><li><a href=\"the-loai/nu-cuong\">Nữ Cường</a> </li><li><a href=\"the-loai/gia-dau\">Gia Đấu</a> </li><li><a href=\"the-loai/dong-phuong\">Đông Phương</a> </li><li><a href=\"the-loai/dam-my\">Đam Mỹ</a> </li><li><a href=\"the-loai/hai-huoc\">Hài Hước</a> </li><li><a href=\"the-loai/co-dai\">Cổ Đại</a> </li><li><a href=\"the-loai/mat-the\">Mạt Thế</a> </li><li><a href=\"the-loai/truyen-teen\">Truyện Teen</a> </li><li><a href=\"the-loai/tieu-thuyet\">Tiểu Thuyết</a> </li><li><a href=\"the-loai/van-hoc-viet-nam\">Văn học Việt Nam</a> </li><li><a href=\"the-loai/doan-van\">Đoản Văn</a> </li><li><a href=\"the-loai/khac\">Khác</a> </li><li><a href=\"the-loai/bach-hop\">Bách Hợp</a> </li><li><a href=\"the-loai/dong-nhan\">Đồng Nhân</a> </li><li><a href=\"the-loai/he-thong\">Hệ Thống</a> </li><li><a href=\"the-loai/dien-vien\">Điền Viên</a> </li></ul>");
    var genre = [];

    var el = doc.select("li a")
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        genre.push({
            title: e.text(),
            input: e.attr("href"),
            script: "gen.js"
        });
    }
    return Response.success(genre);
}