var dmc=["#8364fd","#e662ff","#fd963b","#3aecb4","#ff4fc7","#737475","#ff8ef4","#7285fe","#787878","#f4f4f4","#ffffff","#8781bd","#d8d5d5","#e3e3e3","1","0.6"], //brightmode colours
    nmc=["#7246ee","#e644ae","#ffb533","#00d893","#ff7498","#383c44","#ff8ef4","#7285fe","#787878","#21252b","#191e23","#534b71","#21252b","#292c31","0.4","1"], //nightmode colours
    ml=["accent1","accent2","accent3","accent4","accent5","invaccent","links","titles","text","background","posts","artposts","borders","postback","defopacity","fadeto"], //root var arr
    nm,cm,dr,bm=["block","none"];

function nightmode(){
    nm=!nm;
    document.cookie="lightmode="+nm+";"+"SameSite=None; Secure; expires=Fri, 31 Dec 9999 23:59:59 GMT"

    dr=[(nm?0:1),(!nm?0:1)];
    if(nm==true){cm=dmc; $('#twitter').attr("data-theme","dark")
    }else{cm=nmc; $('#twitter').attr("data-theme","light")}

    for(var i = 0;i < dr.length;i++){
        $("#nm"+i+", #twitter-widget-"+i).css("display",bm[dr[i]]);
        $('.logo-f.lo'+i+', logo.lo'+i).css({"opacity":dr[i],"z-index":dr[i] + 5})
        $('.bck').css('filter','invert('+(nm?0:1)+')')}

    for(var i = 0; i<=cm.length;i++){
        docelem.style.setProperty("--"+ml[i],cm[i])}
}

document.addEventListener("DOMContentLoaded", function(){
    var temp1 = document.cookie.split("; ")
    if(temp1.find(a =>a.includes('lightmode')) != undefined){
        var temp2 = temp1.find(a =>a.includes('lightmode')).replace('lightmode=','')
        console.log("Using Cookie data"); nm = temp2
    } else {
        nm = window.matchMedia('(prefers-color-scheme: dark)').matches}
    $('.nmb').click()
})

window.addEventListener("load", function() {
    twttr.events.bind('loaded',function () {
            for (var i = 0; i < dr.length; i++) {
                $("#twitter-widget-" + i).css("display",bm[dr[i]])}
            $("spinner").css("display","none");
    })
})
