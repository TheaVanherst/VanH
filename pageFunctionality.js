
const pageTypes = [0, 0], pageLoadin = [0, 0],
    pages = ['pg.pg0 #arts0, pg.pg0 #arts1', 'pg.pg1 .postcont'];
let pageScrollY = [], pgPosMultiplier = []; //page scroll height, page height

$(function() {
    pageScrollY.length = buttontext.length; //Current page scroll height based on page count.
    pgPosMultiplier.length = buttontext.length; //Page relativity position setting
    for (var i = 0; i < pageScrollY.length; i++) {
        if (mobileBool){
            rangeChecker(cPage, mobileBool ? 1 : Math.floor(pgWidth / columnX3), i, 'none', 'block')}
        else {
            $('.pg' + i).css('display','block')}
        pageScrollY[i] = 0; pgPosMultiplier[i] = 0}
})

// 88""Yb    db     dP""b8 888888     88""Yb 88 88b 88 8888b.  88 88b 88  dP""b8
// 88__dP   dPYb   dP   `" 88__       88__dP 88 88Yb88  8I  Yb 88 88Yb88 dP   `"
// 88"""   dP__Yb  Yb  "88 88""       88""Yb 88 88 Y88  8I  dY 88 88 Y88 Yb  "88
// 88     dP""""Yb  YboodP 888888     88oodP 88 88  Y8 8888Y"  88 88  Y8  YboodP

let cPage = 1; // CHANGE THIS NUMBER TO CHANGE THE DEFAULT PAGE ON LAUNCH.

$(function(){ //function to set up sidebar
    $("pg.pg" + cPage).toggleClass("pageful")// this displays the default current page as active on page launch.

    for(let b = 0; b <= buttontext.length; b++){ //loops through the amount of pages, KEEP AS VAR.
        $('.i' + b).css( //sets background images for social media icons
            'background-image',"url('/Website assets/icons/sm" + b + ".png')")}

    for(let i = 0; i < pgPosMultiplier.length; i++){ //please keep this as LET.
        pgPosMultiplier[i] = i - cPage //calculates current active page as multiplier
        $("pg.pg"+i).css("margin-left", pageSidebarPos(i,cPage,pgPosMultiplier[i]))//sets page position on load

        $('.ls.pg' + i).children().on('click',function(){ //if sidebar nav button is pressed
            if(cPage !== i){ //checks if button clicked is different than the active button

                if(i !== 4 && document.readyState === 'complete'){ //checks if the current page is the media player page.
                    player.pauseVideo()} //if page is not media player, stop video on page change.

                $("pg.pg" + cPage + ", pg.pg" + i + ", .ls.pg" + cPage + ", .ls.pg"+i).toggleClass("pageful")
                //removes class from concurrent page + adds it to newly active page & concurrent button + adds it to newly active button

                $("pg.pg"+cPage).css("opacity","0.25") //previously focused page
                $(".pg.pg"+i).css("opacity","1") //focused page

                pageSpeedUpdater(cPage, i, 6)

                cPage = i //updates i as the new active page
                if(!mobileBool){
                    $('pageData').css({"top":pageScrollY[i]})
                    for(var e = 0; e < buttontext.length; e++){ //loops through all pages and updates positional data
                        $("pg.pg"+e).css("margin-left", pageSidebarPos(e,i,pgPosMultiplier[e] = e - i))} //updates page position
                } else {
                    $('mobileController').css("left", 'calc((var(--innerPageCalc) + var(--gutter)) * ' + -pgPosMultiplier[cPage] + ')')}
            }
        })

        //This loops through all sidebar buttons and sets background positions,
        // this saves some html crap and dumping in the css files.
        $('.bt'+i).css({ //sets button data, because fuck css
            'background-image':"url('/Website assets/icons/sb"+i+".png')",
            'height':'42px',
            'background-size':'140% auto',
            'background-position':'left'})
    }
    //sets the concurrent page as the default page on page startup
    $('.pg.pg' + cPage + ", .ls.pg" + cPage).toggleClass("pageful")
    //sets the current active page side nav button to active + current active page top nav button to active
    console.log("Page binding complete.") //prints in console when sidebar is loaded.
});

// 88""Yb    db     dP""b8 888888     88""Yb  dP"Yb  .dP"Y8      dP""b8    db    88      dP""b8 .dP"Y8
// 88__dP   dPYb   dP   `" 88__       88__dP dP   Yb `Ybo."     dP   `"   dPYb   88     dP   `" `Ybo."
// 88"""   dP__Yb  Yb  "88 88""       88"""  Yb   dP o.`Y8b     Yb       dP__Yb  88  .o Yb      o.`Y8b
// 88     dP""""Yb  YboodP 888888     88      YbodP  8bodP'      YboodP dP""""Yb 88ood8  YboodP 8bodP'

function pageSpeedUpdater(page, toBePage, multiplier){ //adjusts the page transition speeds.
    transitionSpeed = (Math.abs(toBePage - page) / multiplier) + .3 //grabs transition speed based on distance
    docelem.style.setProperty("--pgTransition",transitionSpeed + "s") //updates page transition without for loops.
    console.log(transitionSpeed) //for some reason this won't push without just straight up using the root.
}

function pageSidebarPos(newPage,currentPage,pageMultiplier) { //limits vars to set data ranges
    return newPage < currentPage && !mobileBool ? (innerPage * pageMultiplier) - rootCur[0] - rootGutter : innerPage * pageMultiplier} //checks if page is to the left of the current active page

function pgposrelcheck(positionData, pageWidth) { //limits page pos based on closest avaliable page value.
    return posX1 < posX2 && positionData < (-rootCur[2] / 1.5) ? Math.floor(positionData / pageWidth) :
           posX1 > posX2 && positionData > (rootCur[2] / 1.5) ? Math.ceil(positionData / pageWidth) : 0}

function limitChecker(maxValue, minValue, overflowValue, newValue){
    return newValue > maxValue - overflowValue ? maxValue - overflowValue : newValue < minValue ? minValue : newValue}

function rangeChecker(baseVal, removalVal, compareValue, trueState, falseState){ //updates page visibility.
    $("pg.pg" + compareValue).css({'display': baseVal - removalVal > compareValue || baseVal + removalVal < compareValue ? trueState : falseState})}

// 88""Yb    db     dP""b8 888888     8888b.  88""Yb    db     dP""b8  dP""b8 88 88b 88  dP""b8
// 88__dP   dPYb   dP   `" 88__        8I  Yb 88__dP   dPYb   dP   `" dP   `" 88 88Yb88 dP   `"
// 88"""   dP__Yb  Yb  "88 88""        8I  dY 88"Yb   dP__Yb  Yb  "88 Yb  "88 88 88 Y88 Yb  "88
// 88     dP""""Yb  YboodP 888888     8888Y"  88  Yb dP""""Yb  YboodP  YboodP 88 88  Y8  YboodP

/* page dragging */
let posY1, posY2, scrollVal; //positions specific to mobile functionality. + debug values
let posX1, posX2, horizontalDifference = 0

//click register variables
var clicking = false, clickStart = 0, clickInt = 0, clickDur = 75;

$(document).on('touchstart', document, function (e) {
    if (!clicking) {
        clicking = true; clickStart = Date.now(); //flips clicking bool + start date
        posX1 = e.originalEvent.touches[0].pageX //grabs x value methodology based on mobile
        posY1 = e.originalEvent.touches[0].pageY} //grabs a Y value if on mobile
})

$(document).on('mousedown', document, function (e) {
    if (!clicking) {
        clicking = true; clickStart = Date.now(); //flips clicking bool + start date
        posX1 = e.pageX} //grabs x value methodology based on mobile
})

// 88  88  dP"Yb  88""Yb 88 8888P  dP"Yb  88b 88 888888    db    88         8888b.  88""Yb    db     dP""b8
// 88  88 dP   Yb 88__dP 88   dP  dP   Yb 88Yb88   88     dPYb   88          8I  Yb 88__dP   dPYb   dP   `"
// 888888 Yb   dP 88"Yb  88  dP   Yb   dP 88 Y88   88    dP__Yb  88  .o      8I  dY 88"Yb   dP__Yb  Yb  "88
// 88  88  YbodP  88  Yb 88 d8888  YbodP  88  Y8   88   dP""""Yb 88ood8     8888Y"  88  Yb dP""""Yb  YboodP

$(window).on('mousemove', function(e) {
    if(clicking && !mobileBool) {
        if (clickInt > -clickDur) {
            clickInt = clickStart - Date.now()}

        else { //checks if mouse is currently being held down,
            $("pg.pg" + cPage).css("pointer-events", "none") //checks to see if in mobile mode. Finally, then it checks if posX2 is different.

            posX2 = e.pageX; //sets pos 2 while holding down the mouse
            horizontalDifference = posX1 - posX2 //calculates the difference between both relation points

            $("#pageFunctionality").css({"left": -horizontalDifference}) //allows entire page dragging
            const newPage = limitChecker(buttontext.length, 0, 1, cPage + pgposrelcheck(horizontalDifference, innerPage)) //checks page relation for the sidebar

            for (var cp = 0; cp < buttontext.length; cp++) { //updates the predicted "new" page margin
                $("pg.pg" + cp).css({ "opacity": "0.25", //resets transparency to be faded out
                    "margin-left": pageSidebarPos(cp, newPage, pgPosMultiplier[cp])}) //pushes new page location
            } //updates page position

            if (newPage !== cPage) {$("pg.pg" + newPage).css({"opacity": "0.75"})} //if new page is different, increase opacity.
    }}
})

$(window).bind('touchmove', function(e) {
    if(clicking) {
        if (clickInt > -clickDur) {
            clickInt = clickStart - Date.now()
        } else {
            $("pg.pg" + cPage).css("pointer-events", "none")
            // grabs the current finger position
            posX2 = e.originalEvent.touches[0].pageX;
            horizontalDifference = posX1 - posX2 //calculates the difference between both relation points

            if (horizontalDifference > (pgWidth / 6) || horizontalDifference < -(pgWidth / 6)) { //checks if the current drag is horizontally focused.
                $(mobileBool ? "mobileController" : "#pageFunctionality").css({"margin-left": -horizontalDifference}) //page dragging calcs
                var newPage = limitChecker(buttontext.length, 0, 1, cPage + pgposrelcheck(horizontalDifference, innerPage + rootCur[0] + rootGutter));

                for (var cp = 0; cp < buttontext.length; cp++) {//loops through currently active pages based on buttons visible.
                    if(!mobileBool){ //checks if on desktop to bother with page pos.
                        $("pg.pg" + cp).css({ "opacity": "0.25", //if current page is unfocused, change opacity value.
                            "margin-left": pageSidebarPos(cp, newPage, pgPosMultiplier[cp])})}

                    // $("pg.pg" + cp).css({"display" : rangeChecker(newPage, mobileBool ? 1 : Math.floor(pgWidth / columnX3), cp, 'none', 'block')})
                    // TODO: this is an experimental feature which disables non-visible pages. It kinda needs fixing, not sure how great of an idea it is.
                } //updates page position

                if (newPage !== cPage) {$("pg.pg" + newPage).css({"opacity": "0.75"})}} //if current page is focused, change opacity value.
    }}
});

let toBeCurrent = cPage, transitionSpeed
$(window).on('mouseup touchend', function(e) {
    if(clicking) {
        if (clickInt > -clickDur) {
            clicking = clickInt = clickStart = 0} //resets clicking latch + timers}
        else {
            posX2 = (mobileBool ? e.originalEvent.changedTouches[0].pageX : e.pageX) //figures which mouse event should be being used
            toBeCurrent = limitChecker(buttontext.length, 0, 1, cPage + //checks if between max and min values.
                          pgposrelcheck(horizontalDifference, (mobileBool ? innerPage + rootCur[0] + rootGutter : innerPage))) //Position relation check if on mobile.

            pageSpeedUpdater(toBeCurrent, cPage, 20)

            if (cPage !== toBeCurrent) { //checks if button clicked is different than the active button
                $("pg.pg" + cPage + ", pg.pg" + toBeCurrent + ", .ls.pg" + cPage + ", .ls.pg" + toBeCurrent).toggleClass("pageful")
                //removes class from concurrent page + adds it to newly active page & buttons + adds it to newly active button
                cPage = toBeCurrent}

            if (!mobileBool) {
                $('pagedata').css({"top": pageScrollY[toBeCurrent]}) //updates vertical page positioning

                for (var page = 0; page < buttontext.length; page++) { //loops through all pages and updates positional data
                    pgPosMultiplier[page] = page - toBeCurrent //root data for page position multipliers
                    //checks page width, and compares to page size to see if the page is visible, if it isn't, disable.
                    $("pg.pg" + page).css({"margin-left": pageSidebarPos(page, toBeCurrent, pgPosMultiplier[page])})} //updates page position

                $("#pageFunctionality").css({"left": "0"})} //resets page dragging calcs
            else {
                $("mobilecontroller").css({
                    'left': ((toBeCurrent - 1) * (-innerPage)), "margin-left" : "0"})} //resets page dragging calcs
            // just a note to myself; the margin left allows page dragging to not transition to the center to then move, it's easier
            // to just have the margin left dictate the position, and then swap the values around to make it seem smoother.

            $("pg.pg" + cPage).css("pointer-events", "auto") //alows clickability after page drag
            clicking = clickInt = clickStart = 0; //resets clicking latch + timers
    }}
})

// Yb    dP 888888 88""Yb 888888 88  dP""b8    db    88         8888b.  88""Yb    db     dP""b8
//  Yb  dP  88__   88__dP   88   88 dP   `"   dPYb   88          8I  Yb 88__dP   dPYb   dP   `"
//   YbdP   88""   88"Yb    88   88 Yb       dP__Yb  88  .o      8I  dY 88"Yb   dP__Yb  Yb  "88
//    YP    888888 88  Yb   88   88  YboodP dP""""Yb 88ood8     8888Y"  88  Yb dP""""Yb  YboodP

$(window).bind('touchmove', function(e) {
    if(clicking) {
        if (clickInt > -clickDur) {
            clickInt = clickStart - Date.now()
        } else {
            $("pg.pg" + cPage).css("pointer-events", "none")
            posY2 = e.originalEvent.touches[0].pageY; // grabs the current finger position
            scrollVal = (pageScrollY[cPage] > cPageHeight ? (posY1 - posY2) / 2 : (posY1 - posY2)) //this adjusts the scroll multiplier to double in value if at the bottom of the page.

            //this calculates current scroll height through checking before pushing, it's not accurate but good enough
            pageScrollY[cPage] = limitChecker(0, cPageHeight, 0, pageScrollY[cPage] - scrollVal)

            if (pageTypes.length > cPage) { //checks if cPage is 0 OR post container is larger than page height
                pageTypes[cPage] = limitChecker(0, -pageHeights[cPage] + (pageDataHeight - 50), 0, pageTypes[cPage] - scrollVal)
                //this calculates current scroll height through checking before pushing, it's not accurate but good enough
                pageLoadin[cPage] = -(pageTypes[cPage]) + pageDataHeight > pageHeights[cPage] && pageLoadin[cPage] === 0 ? 3 : 0
                if(cPage === 0){artGeneration()} else {loadpostelement()}} //loads art elements
            //checks height scroll value being greater than internal container height to determine how many new art posts load

            $(!mobileBool ? 'pagedata' : 'pg.pg' + cPage).css({"top": pageScrollY[cPage]}) //checks if desktop or mobile touch device for scroll pos
            posY1 = e.originalEvent.touches[0].pageY} //updates new pos for touch devices
    }
});

$(window).on('wheel', function(e){
    if(imagePreviewer.innerHTML === '' && !mobileBool){

        scrollVal = (pageScrollY[cPage] === cPageHeight ? e.originalEvent.deltaY : e.originalEvent.deltaY / 2) //this adjusts the scroll multiplier to double in value if at the bottom of the page.
        pageScrollY[cPage] = limitChecker(0, cPageHeight, 0, pageScrollY[cPage] - scrollVal)
        $('pageData').css({"top": pageScrollY[cPage]}) //sets scroll height of container based on current page scroll arr

        if (pageTypes.length >= cPage) { //checks if cPage is 0 OR post container is larger than page height
            pageTypes[cPage] = limitChecker(0, -pageHeights[cPage] + (pageDataHeight - 50), 0, pageTypes[cPage] - scrollVal)
            //this calculates current scroll height through checking before pushing, it's not accurate but good enough
            pageLoadin[cPage] = -(pageTypes[cPage]) + pageDataHeight > pageHeights[cPage] && pageLoadin[cPage] === 0 ? 3 : 0
            if(cPage === 0){artGeneration()} else {loadpostelement()}} //loads art elements
        //checks height scroll value being greater than internal container height to determine how many new art posts load

        $(pages[cPage]).css({"top": pageTypes[cPage]})}//pushes new Y value
});