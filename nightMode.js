let brightModeCS=["#8364fd","#e662ff","#fd963b","#3aecb4","#ff4fc7","#737475","#ff8ef4","#7285fe","#787878","#f4f4f4","#ffffff","#8781bd","#d8d5d5","#e3e3e3","1","0.6","1"], //brightmode colours
    nightModeCS=["#7246ee","#e644ae","#ffb533","#00d893","#ff7498","#383c44","#ff8ef4","#7285fe","#787878","#21252b","#191e23","#534b71","#21252b","#292c31","0.4","1","0"], //nightmode colours
    rootLoop=["accent1","accent2","accent3","accent4","accent5","invaccent","links","titles","text","background","posts","artposts","borders","postback","defopacity","fadeto","logoinv"], //root var arr
    blockMode=["block","none"], colourArr=[nightModeCS,brightModeCS];

let nightBool, binaryLatch; // night mode bool, night mode bool but in binary, mobile bool
let colourSheet, booleanToggleArr; //currently active colour array [nightModeCS,brightModeCS], [(!nightBool ? 0:1),(nightBool ? 0:1)]

var mobileBool, supportsTouch;
$(document).ready(function() {
    if(/Mobi|Android/i.test(navigator.userAgent) === true){
        mobileBool = true} //sets mobile bool to true if a mobile OS is detected
    else {
        mobileBool = false}
    console.log("mobileBool: " + mobileBool + ", supportsTouch: " + supportsTouch)
})

function nightmode(){
    nightBool =! nightBool;
    booleanToggleArr = [!nightBool ? 0:1,nightBool ? 0:1];
    binaryLatch = nightBool ? 0:1
    console.log("nightBool: " + nightBool)

    document.cookie = "lightmode=" + nightBool + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=Strict;"

    colourSheet = colourArr[binaryLatch]
    console.log(colourSheet)

    for(var b = 0;b < booleanToggleArr.length;b++){
        $("#twitter-widget-"+b).css( //this sets the nightmode twitter to switch between night & daymodes.
            "display",blockMode[booleanToggleArr[b]]); //flips between booleanToggleArr through the loop

        $("#nm" + b).css({ //this sets the nightmode icon on the button to switch between night & daymodes.
            "display":blockMode[booleanToggleArr[b]]}) //flips between booleanToggleArr through the loop

        $('.headerLogo > * > .lo' + b + ', .headerLogo > .lo' + b).css({
            "opacity":booleanToggleArr[b], //sets the opacity of logo banner between the two types
            "z-index":booleanToggleArr[b] + 5}) //I can't remember why I need this.

        $('.bck').css({
            'filter':'invert(' + binaryLatch + ')'})
    }

    for(var i = 0; i <= colourSheet.length; i++){
        docelem.style.setProperty("--"+rootLoop[i], colourSheet[i])}
}

document.addEventListener("DOMContentLoaded", function(){
    const rawCookieArr = document.cookie.split("; ");

    if (rawCookieArr.find(a => a.includes('lightmode')) !== undefined) {
        var colourMode = rawCookieArr
            .find(a => a.includes('lightmode'))
            .replace('lightmode=', '')
        nightBool = (colourMode !== 'true')
        console.log("Using Cookie data")
    } else {
        nightBool = false}

    nightmode()
})

window.addEventListener("load", function() {
    twttr.events.bind('loaded',function () {
            for (var i = 0; i < booleanToggleArr.length; i++) {
                $("#twitter-widget-" + i).css(
                    "display",blockMode[booleanToggleArr[i]])}
            $("spinner").css("display","none");
    })
})
