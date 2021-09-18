var dmc=["#7565ff","#ff62ea","#ffb533","#3aecb4","#505050","#ff8ef4","#7285fe","#787878","#f4f4f4","#ffffff","#8781bd","#d8d5d5","1","0.6"], //brightmode colours
    nmc=["#7246ee","#f267e3","#ffa85b","#3aecb4","#282828","#ff8ef4","#7285fe","#787878","#1d1d1d","#141414","#534b71","#090909","0.3","1"], //nightmode colours
    ml=["accent1","accent2","accent3","accent4","invaccent","links","titles","text","background","posts","artposts","borders","defopacity","fadeto"], //root var arr
    nm,cm,dr,bm=["block","none"];

function buttonpress(){
    nm=!nm;
    document.cookie="lightmode="+nm+";"+"SameSite=None; Secure; expires=Fri, 31 Dec 9999 23:59:59 GMT"

    dr=[(nm?0:1),(!nm?0:1)];
    if(nm==true){cm=dmc; $('#twitter').attr("data-theme","dark")
    }else{cm=nmc; $('#twitter').attr("data-theme","light")}

    for(var i = 0;i < dr.length;i++){
        $("#nm"+i+", #twitter-widget-"+i).css({"display":bm[dr[i]]});}
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

    jQuery('#twitter-widget-0').ready(function (){
        setTimeout(function() {
            for(var i = 0;i < dr.length;i++){
                $("#twitter-widget-"+i).css({"display":bm[dr[i]]})}
        },2000)
    })
})
