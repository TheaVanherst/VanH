
// 88""Yb    db     dP""b8 888888     88      dP"Yb     db    8888b.      88  88b 88
// 88__dP   dPYb   dP   `" 88__       88     dP   Yb   dPYb    8I  Yb ___ 88  88Yb88
// 88"""   dP__Yb  Yb  "88 88""       88  .o Yb   dP  dP__Yb   8I  dY """ 88  88 Y88
// 88     dP""""Yb  YboodP 888888     88ood8  YbodP  dP""""Yb 8888Y"      88  88  Y8

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
            'height': document.body.clientHeight - $('#pageFunctionality').parent().height() - (rootGutter * 6) + 'px'})}
})

// .dP"Y8 88 8888P 888888     Yb    dP    db    88""Yb .dP"Y8        dP      dP""b8    db    88      dP""b8 .dP"Y8
// `Ybo." 88   dP  88__        Yb  dP    dPYb   88__dP `Ybo."       dP      dP   `"   dPYb   88     dP   `" `Ybo."
// o.`Y8b 88  dP   88""         YbdP    dP__Yb  88"Yb  o.`Y8b      dP       Yb       dP__Yb  88  .o Yb      o.`Y8b
// 8bodP' 88 d8888 888888        YP    dP""""Yb 88  Yb 8bodP'     dP         YboodP dP""""Yb 88ood8  YboodP 8bodP'

//these are root vars numbers from navigation.css
var cPageHeight, innerPage, pgWidth = $('body').width();
var rootBorder = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--skirting')),
    rootGutter = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--gutter'));
var rootDef, rootCur = rootDef = [225, 460, 290], rootVar = ['--sidebarl','--sidebarm','--sidebarr'];

var columnX3, columnX2 = columnX3 = rootCur[2] + rootCur[1]; columnX3 += rootCur[0]; //calculates column widths.
var pageDataHeight = 5070, widthRestraint = 800, pageHeights = [-500, -520]; //checks default page height && checks width restraint, Blog related post scroll heights.

// 88""Yb 888888 .dP"Y8 88 8888P 888888      dP""b8    db    88      dP""b8
// 88__dP 88__   `Ybo." 88   dP  88__       dP   `"   dPYb   88     dP   `"
// 88"Yb  88""   o.`Y8b 88  dP   88""       Yb       dP__Yb  88  .o Yb
// 88  Yb 888888 8bodP' 88 d8888 888888      YboodP dP""""Yb 88ood8  YboodP

let waitCallback;
var resize = function() { // Page rescaling
    // initial page scale update.
    pgWidth = $('body').width() - (mobileBool ? rootGutter : 0) // there's a bug where the side borders surrounding the page are 20 pixels too small

    if (pgWidth < widthRestraint || mobileBool) {
        $(".nmb, nav, sidenav, #pageFunctionality").addClass("active");
        for(let i = 0; i < rootVar.length; i++){
            docelem.style.setProperty(rootVar[i],(i !== 0 ? ((rootDef[i] / (columnX2 / (pgWidth - (rootGutter * 3)))) + (rootGutter / 2)).toFixed(1) : -rootGutter) + "px")}}
    else {
        $(".nmb, nav, sidenav, #pageFunctionality").removeClass("active");
        if(pgWidth <= (columnX3 + (rootGutter * 4))) {
            for (let i = 0; i < rootVar.length; i++) {
                 docelem.style.setProperty(rootVar[i],(rootDef[i] / (columnX3 / (pgWidth - (rootGutter * 4)))).toFixed(1) + "px")}}
        else {
            for (let i = 0; i < rootVar.length; i++) {
                docelem.style.setProperty(rootVar[i],rootDef[i] + "px")}}}

    clearTimeout(waitCallback);
    waitCallback = setTimeout(pageRelocation, 250)
}

function pageRelocation () {
    for(let i = 0; i < pgPosMultiplier.length; i++){
        $("pg.pg"+i).css(
            "margin-left", pageSidebarPos(i,cPage,pgPosMultiplier[i]))}

    innerPage = columnX2 + (rootGutter * 2)
    //This calculates the CORRECT page height to be used as a limiter for the scroll function
    cPageHeight = -pageDataHeight - $('#header').height() - rootGutter - rootBorder + document.documentElement.clientHeight
        - (pgWidth < widthRestraint || mobileBool ? (rootGutter + $('nav').height()) : 0)

    pageHeights[1] = $('.postcont').height() //updates the blog post container to be the correct height
    pageHeights[0] = Math.max($('#arts1').height(), $('#arts2').height()) //updates the art post container to be the correct height
}