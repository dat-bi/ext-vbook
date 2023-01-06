function execute(url) {
    "https://chivi.app/dicts/-a1pzg8fb"
    let url = fetch(url).html().select("#svelte > chivi-app > main > div > div.user-action.svelte-1kjvv4f > menu-wrap.action.svelte-1pq0sbb > menu-body > div > a:nth-child(1)").href
    let rep = fetch(url)
    let json = rep.json()
    let total = json.total
    let totalPage = Math.round(total/50)
    var i = 1
    var txt = ""
    do{
        let pp = fetch(url+ "&pg=" + i)
        let item =  pp.json().terms
        for( let j = 0 ; j < item.length; j++){
            let key = item[j].key
            let val = item[j].vals
            if(val !== ""){
                console.log(key +"="+ val)
            }
        }
        i++
    } while ( i <= totalPage)
    return null
}