
//  dP""b8  dP"Yb  88      dP"Yb  88   88 88""Yb      dP""b8    db    888888  dP""b8 88  88     88      dP"Yb   dP"Yb  88""Yb .dP"Y8
// dP   `" dP   Yb 88     dP   Yb 88   88 88__dP     dP   `"   dPYb     88   dP   `" 88  88     88     dP   Yb dP   Yb 88__dP `Ybo."
// Yb      Yb   dP 88  .o Yb   dP Y8   8P 88"Yb      Yb       dP__Yb    88   Yb      888888     88  .o Yb   dP Yb   dP 88"""  o.`Y8b
//  YboodP  YbodP  88ood8  YbodP  `YbodP' 88  Yb      YboodP dP""""Yb   88    YboodP 88  88     88ood8  YbodP   YbodP  88     8bodP'

let brightModeCS=[ //these colours use the RootLoop var, // BRIGHTMODE
        "#8364fd","#e662ff","#fd963b","#3aecb4", //accent 1 through 4
        "#ff4fc7","#737475","#ff8ef4","#7285fe", // accent 5, inv, link and titles
        "#787878","#f4f4f4","#ffffff","#8781bd", //text, background, posts, art post back
        "#d8d5d5","#e3e3e3", //borders between posts, colour behind posts (these should really be the same tbh)
        "1","0.6","1"], //default opacity, fade to, logo invert var

    nightModeCS=[ //these colours use the RootLoop var. / NIGHTMODE
        "#7246ee","#e644ae","#ffb533","#00d893", //accent 1 through 4
        "#ff7498","#383c44","#ff8ef4","#7285fe", // accent 5, inv, link and titles
        "#787878","#21252b","#191e23","#534b71", //text, background, posts, art post back
        "#21252b","#292c31", //borders between posts, colour behind posts (these should really be the same tbh)
        "0.4","1","0"], //default opacity, fade to, logo invert var

    rootLoop=[ //root var to access while refering to colour schemes.
        "accent1","accent2","accent3","accent4",
        "accent5","invaccent","links","titles",
        "text","background","posts","artposts",
        "borders","postback",
        "defopacity","fadeto","logoinv"],

    blockMode=["block","none"], //toggles between which button should be displayed for day / night mode.
    colourArr=[nightModeCS,brightModeCS]; //this switches between night / bright mode with a boolean flip.

let nightBool, binaryLatch, // night mode bool, night mode bool but in binary, mobile bool
    colourSheet, nightBoolArr; //currently active colour array [nightModeCS,brightModeCS], [(!nightBool ? 0:1),(nightBool ? 0:1)]

// 88b 88 88  dP""b8 88  88 888888     8b    d8  dP"Yb  8888b.  888888     888888  dP"Yb   dP""b8  dP""b8 88     888888
// 88Yb88 88 dP   `" 88  88   88       88b  d88 dP   Yb  8I  Yb 88__         88   dP   Yb dP   `" dP   `" 88     88__
// 88 Y88 88 Yb  "88 888888   88       88YbdP88 Yb   dP  8I  dY 88""         88   Yb   dP Yb  "88 Yb  "88 88  .o 88""
// 88  Y8 88  YboodP 88  88   88       88 YY 88  YbodP  8888Y"  888888       88    YbodP   YboodP  YboodP 88ood8 888888

var mobileBool, supportsTouch;
$(function(){
    if(/Mobi|Android/i.test(navigator.userAgent) === true){
        mobileBool = true} //sets mobile bool to true if a mobile OS is detected
    else {
        mobileBool = false}
    console.log("mobileBool: " + mobileBool)
})

function nightmode(){
    nightBool =! nightBool;
    nightBoolArr = [!nightBool ? 0:1,nightBool ? 0:1];
    binaryLatch = nightBool ? 0:1
    console.log("nightBool: " + nightBool)

    document.cookie = "lightmode=" + nightBool + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=Strict;"

    colourSheet = colourArr[binaryLatch]
    console.log(colourSheet)

    for(var b = 0; b < nightBoolArr.length; b++){
        $("#twitter-widget-"+b).css( //this sets the nightmode twitter to switch between night & daymodes.
            "display",blockMode[nightBoolArr[b]]); //flips between nightBoolArr through the loop

        $("#nm" + b).css({ //this sets the nightmode icon on the button to switch between night & daymodes.
            "display":blockMode[nightBoolArr[b]]}) //flips between nightBoolArr through the loop

        $('.headerLogo > * > .lo' + b + ', .headerLogo > .lo' + b).css({
            "opacity":nightBoolArr[b], //sets the opacity of logo banner between the two types
            "z-index":nightBoolArr[b] + 5}) //I can't remember why I need this.
    }

    for(var i = 0; i <= brightModeCS.length - 1; i++){
        docelem.style.setProperty("--"+rootLoop[i], colourSheet[i])}
}

//  dP""b8  dP"Yb   dP"Yb  88  dP 88 888888     88""Yb 888888    db    8888b.  888888 88""Yb
// dP   `" dP   Yb dP   Yb 88odP  88 88__       88__dP 88__     dPYb    8I  Yb 88__   88__dP
// Yb      Yb   dP Yb   dP 88"Yb  88 88""       88"Yb  88""    dP__Yb   8I  dY 88""   88"Yb
//  YboodP  YbodP   YbodP  88  Yb 88 888888     88  Yb 888888 dP""""Yb 8888Y"  888888 88  Yb

document.addEventListener("DOMContentLoaded", function(){
    //this launches first on document load to check if cookies are detected, if detected, update var.
    const rawCookieArr = document.cookie.split("; "); //grabs cookie and stores into a var.

    if (rawCookieArr.find(a => a.includes('lightmode')) !== undefined) { //if cookie contains mode type
        var colourMode = rawCookieArr //stores raw cookie
            .find(a => a.includes('lightmode')) //finds lightmode cookie
            .replace('lightmode=', '') //removes it from var and leaves just the boolean
        nightBool = (colourMode !== 'true') //checks boolean
        console.log("Using Cookie data") //push to site console if cookie is detected.
    } else {
        $('.tooltip p').css({ //updates the tooltips with a purple accent on first visit.
            'color':'white',
            'background-color':'var(--accent1)'})
        nightBool = false} //else, just default to bright mode.

    nightmode() // update colour scheme on page load.
})

window.addEventListener("load", function() {
    //when the page is fully loaded with all of the data, update twitter feed scheme.
    twttr.events.bind('loaded',function () { //when twitter embed is loaded
            for (var i = 0; i < nightBoolArr.length; i++) { //check through night bool to figure which should be displayed.
                $("#twitter-widget-" + i).css( //addresses twitter widgets
                    "display",blockMode[nightBoolArr[i]])} //changes i twitter widget to visible or not, depending on night bool.
            $("spinner").css("display","none"); //remove loading display.
    })
})
