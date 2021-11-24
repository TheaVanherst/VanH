var rootRight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sidebarr')),
    rootLeft = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sidebarl')),
    rootMid = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--postwidth'));

var rootBorder = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--skirting')),
    rootGutter = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--gutter'));

//these are root vars numbers from navigation.css
var currentPgHeight, pageWidth = $('body').width() //just some precalcs
var columnX3 = (rootRight + rootMid + rootLeft),
    columnX2 = rootRight + rootMid;
var sectionHeight = getComputedStyle(document.documentElement).getPropertyValue('--pageheight'); //checks default page height
    sectionHeight = parseInt(sectionHeight.replace("px", ""));
var widthRestraint = getComputedStyle(document.documentElement).getPropertyValue('--widthRestraint');
    widthRestraint = parseInt(widthRestraint.replace("px", ""));


$(function(){
    if (mobileBool) {
        $('.postcont').css("transition"," top .0s cubic-bezier(0,0,0,1)");
        $('#arts0, #arts1').css("transition"," top .0s cubic-bezier(0,0,0,1)");
        $('#pageFunctionality').css({ //this is to limit drag functionality on mobile.
             'width':'100%','height':$(document).height() + 'px','overflow':'hidden'})

        $('#twitter').css('pointer-events','none')
        $('.pg1 largecontainer, .pg1 smallcontainer, .pg0 incont').css({
            'height': document.body.clientHeight - $('#pageFunctionality').parent().height() - (rootGutter * 6) + 'px'})
    }
})

var scale2Multiplier = false, scale3Multiplier = false; //width calc storage
let innerPage, newRootLeft, newRootRight, newRootMid; //page total, left, mid and right roots

let waitCallback, scaleResetReq;
var resize = function() { // Page rescaling
    /* there's a bug where the side borders surrounding the page are 20 pixels too small */
    if(!mobileBool){pageWidth = $('body').width(); /* this is just the default code */
    } else {pageWidth = $('body').width() - rootGutter } /* this is the quick fix */

    if (mobileBool || pageWidth < widthRestraint) {
        scale3Multiplier = false //this allows to check which scale type is active
        scaleResetReq = true //this allows page position correction on scale out.
        console.log("Callback: " + scaleResetReq + " !Scale3")

        $(".nmb, nav, sidenav").addClass("active");

        scale2Multiplier = (columnX2 / (pageWidth - (rootGutter * 3))) //180 / 60

        newRootLeft = -rootGutter
        newRootRight = +((rootRight / scale2Multiplier) + (rootGutter / 2)).toFixed(2);
        newRootMid = +((rootMid / scale2Multiplier) + (rootGutter / 2)).toFixed(2);
    } else {
        scale2Multiplier = false
        console.log("!Scale2")

        $(".nmb, nav, sidenav").removeClass("active");

        if (pageWidth > widthRestraint) { //200 / 80
            if (pageWidth <= (columnX3 + (rootGutter * 4))) {
                scale3Multiplier = (columnX3 / (pageWidth - (rootGutter * 4))); //200 / 80

                newRootLeft = +(rootLeft / scale3Multiplier).toFixed(2);
                newRootRight = +(rootRight / scale3Multiplier).toFixed(2);
                newRootMid = +(rootMid / scale3Multiplier).toFixed(2);
            } else {
                newRootLeft = rootLeft
                newRootRight = rootRight
                newRootMid = rootMid
            }
        }
    }
    docelem.style.setProperty('--sidebarl', newRootLeft + "px")
    docelem.style.setProperty('--sidebarr', newRootRight + "px")
    docelem.style.setProperty('--postwidth', newRootMid + "px")

    innerPage = newRootMid + newRootRight + (rootGutter * 2)

    if(!mobileBool){
        currentPgHeight = -sectionHeight - $('#header').height() - rootGutter - rootBorder + document.documentElement.clientHeight
    } else {
        currentPgHeight = -sectionHeight - $('#header').height() - (rootGutter * 2) - rootBorder - $('nav').height() + document.documentElement.clientHeight}

    //This calculates the CORRECT page height to be used as a limiter for the scroll function
    blogPostsHeight = $('.postcont').height() //updates the blog post container to be the correct height
    artsPostsHeight = Math.max($('#arts1').height(), $('#arts2').height()) //updates the art post container to be the correct height

    clearTimeout(waitCallback);
    if(scaleResetReq && !scale2Multiplier){
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