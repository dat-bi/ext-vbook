    let url = "https://nhungtruyen.com/bi-an-goc-chet/61773/2"
    if (url.slice(-1) !== "/") {
        url = url + "/";
    }
    //https://nhungtruyen.com/bi-an-goc-chet/61773/2
    let a = url.split("/")
    console.log(a[4]);