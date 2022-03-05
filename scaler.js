
// .dP"Y8 88 8888P 888888     Yb    dP    db    88""Yb .dP"Y8        dP      dP""b8    db    88      dP""b8 .dP"Y8
// `Ybo." 88   dP  88__        Yb  dP    dPYb   88__dP `Ybo."       dP      dP   `"   dPYb   88     dP   `" `Ybo."
// o.`Y8b 88  dP   88""         YbdP    dP__Yb  88"Yb  o.`Y8b      dP       Yb       dP__Yb  88  .o Yb      o.`Y8b
// 8bodP' 88 d8888 888888        YP    dP""""Yb 88  Yb 8bodP'     dP         YboodP dP""""Yb 88ood8  YboodP 8bodP'

var rootRight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sidebarr')),
    rootLeft = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sidebarl')),
    rootMid = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--postwidth'));
    rootBorder = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--skirting')),
    rootGutter = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--gutter'));

var sectionHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pageheight')), //checks default page height
    widthRestraint = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--widthRestraint'))

//these are root vars numbers from navigation.css
var currentPgHeight, pgWidth = $('body').width(),
    columnX3, columnX2 = columnX3 = rootRight + rootMid; columnX3 += rootLeft //calculates column widths.

var width2Multi = false, width3Multi = false; //width calc storage
let innerPage, newRootL, newRootR, newRootM; //page total, left, mid and right roots

$(function(){
    if (mobileBool) {
        $('.postcont, #arts0, #arts1').css({
            'transition':' top .0s cubic-bezier(0,0,0,1)'}); //inner art container transitions on boot.
        $('#pageFunctionality').css({ //this is to limit drag functionality on mobile.
            'width':'100%',
            'height': $(document).height() + 'px',
            'overflow':'hidden'})

        $('#twitter').css('pointer-events','none')
        $('.pg1 largecontainer, .pg1 smallcontainer, .pg0 incont').css({
            'height': document.body.clientHeight - $('#pageFunctionality').parent().height() - (rootGutter * 6) + 'px'})
    }
})

// 88""Yb 888888 .dP"Y8 88 8888P 888888      dP""b8    db    88      dP""b8
// 88__dP 88__   `Ybo." 88   dP  88__       dP   `"   dPYb   88     dP   `"
// 88"Yb  88""   o.`Y8b 88  dP   88""       Yb       dP__Yb  88  .o Yb
// 88  Yb 888888 8bodP' 88 d8888 888888      YboodP dP""""Yb 88ood8  YboodP

let waitCallback, scaleResetReq;
var resize = function() { // Page rescaling

    // initial page scale update.
    pgWidth = $('body').width(); /* grabs page width on scale */
    if(mobileBool){ pgWidth -= rootGutter } // there's a bug where the side borders surrounding the page are 20 pixels too small

    if (mobileBool || pgWidth < widthRestraint) {
        width3Multi = false //this allows to check which scale type is active
        scaleResetReq = true //this allows page position correction on scale out.
        console.log("Callback: " + scaleResetReq + " !Scale3")

        $(".nmb, nav, sidenav").addClass("active");

        width2Multi = (columnX2 / (pgWidth - (rootGutter * 3))) //180 / 60

        newRootL = -rootGutter
        newRootR = +((rootRight / width2Multi) + (rootGutter / 2)).toFixed(2);
        newRootM = +((rootMid / width2Multi) + (rootGutter / 2)).toFixed(2);
    } else {
        width2Multi = false
        console.log("!Scale2")

        $(".nmb, nav, sidenav").removeClass("active");

        if (pgWidth > widthRestraint) { //200 / 80
            if (pgWidth <= (columnX3 + (rootGutter * 4))) {
                width3Multi = (columnX3 / (pgWidth - (rootGutter * 4))); //200 / 80

                newRootL = +(rootLeft / width3Multi).toFixed(2);
                newRootR = +(rootRight / width3Multi).toFixed(2);
                newRootM = +(rootMid / width3Multi).toFixed(2);
            } else {
                newRootL = rootLeft
                newRootR = rootRight
                newRootM = rootMid
            }
        }
    }
    docelem.style.setProperty('--sidebarl', newRootL + "px")
    docelem.style.setProperty('--sidebarr', newRootR + "px")
    docelem.style.setProperty('--postwidth', newRootM + "px")

    innerPage = newRootM + newRootR + (rootGutter * 2)

    currentPgHeight = -sectionHeight - $('#header').height() - rootGutter - rootBorder + document.documentElement.clientHeight
    if(mobileBool){currentPgHeight -= rootGutter + $('nav').height()}

    //This calculates the CORRECT page height to be used as a limiter for the scroll function
    blogPostsHeight = $('.postcont').height() //updates the blog post container to be the correct height
    artsPostsHeight = Math.max($('#arts1').height(), $('#arts2').height()) //updates the art post container to be the correct height

    clearTimeout(waitCallback);
    if(scaleResetReq && !width2Multi){
        waitCallback = setTimeout(pageRelocation, 250)}
}

function pageRelocation () {
    for(let i = 0; i < pgPosMultiplier.length; i++){
        $("pg.pg"+i).css(
            "margin-left", pageSidebarPos(i,currentPage,pgPosMultiplier[i]))
    }
    scaleResetReq = !scaleResetReq
    console.log("Callback: " + scaleResetReq)
}