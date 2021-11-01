
let blogPostsHeight = 500, artsPostsHeight = 500, //this is just needed as an inital backup until posts load
    blogScroll = 0, artsScroll = 0; //scroll heights in relation to blogPostsHeight && artsPostsHeight

let pageScrollY = [0,0,0,0,0,0,0], sectionPad; //page scroll height, page height
let pgPosMultiplier = [0,0,0,0,0,0,0]; //Page relativity position setting

let currentPage = 1; // CHANGE THIS NUMBER TO CHANGE THE DEFAULT PAGE ON LAUNCH.

function pageSidebarPos(newPage,currentPage,pageMultiplier) { //limits vars to set data ranges
    if (newPage < currentPage && !scale2Multiplier) { //checks if page is to the left of the current active page
        return innerPage * pageMultiplier - (rootLeft + rootgutter)
    } else { //checks if page location is to the right of the current active page
        return innerPage * pageMultiplier }
}

function pgposrelcheck(positionData,pageWidth) {
    if(posX1 < posX2 && positionData < (-rootRight / 1.5)){ //leftside page check
        return  Math.floor(positionData / pageWidth)} //limits to the left hand side to the closest negative.
    else if (posX1 > posX2 && positionData > (rootRight / 1.5)){ //right side page check
        return Math.ceil(positionData / pageWidth)}
    else { return 0}//limits to the right hand side to the closest positive
}

$(document).ready(function(){ //function to set up sidebar
    $("pg.pg" + currentPage).toggleClass("pageful")// this displays the default current page as active on page launch.

    for(let b = 0; b <= 6; b++){ //loops through the amount of pages, KEEP AS VAR.
        $('.i' + b).css( //sets background images for social media icons
            'background-image',"url('/Website assets/icons/sm" + b + ".png')")}

    for(let i = 0; i < pgPosMultiplier.length; i++){ //please keep this as LET.
        pgPosMultiplier[i] = i - currentPage //calculcates current active page as multiplierr
        $("pg.pg"+i).css("margin-left", pageSidebarPos(i,currentPage,pgPosMultiplier[i]))//sets page position on load

        $('.pg' + i).children().on('click',function(){ //if sidebar nav button is pressed
            if(currentPage !== i){ //checks if button clicked is different than the active button

                $("pg.pg" + currentPage + ", pg.pg"+i).toggleClass("pageful") //removes class from concurrent page + adds it to newly active page
                $(".ls.pg" + currentPage + ", .ls.pg"+i).toggleClass("button-focus") //removes class from concurrent button + adds it to newly active button

                $("pg.pg"+currentPage).css("opacity","0.25") //previously focused page
                $(".pg.pg"+i).css("opacity","1") //focused page

                transitionSpeed = (Math.abs(i - currentPage) / 6) + .3 + "s"; //transition data based on difference with a multiplier
                $("pg").css({"transition": //adds transitions for initial movement.
                        "margin " + transitionSpeed + " cubic-bezier(0,0,0,1), " + //movement left to right
                        "opacity " + transitionSpeed + " cubic-bezier(0,0,0,1)"}) //fade in

                currentPage = i //updates i as the new active page
                $('pageData').css({"margin-top":pageScrollY[i]}) //Sets vertical page placement

                for(var e = 0; e < pageScrollY.length; e++){ //loops through all pages and updates positional data
                    pgPosMultiplier[e] = e - i //root data for page position multipliers
                    $("pg.pg"+e).css("margin-left", pageSidebarPos(e,i,pgPosMultiplier[e]))
                } //updates page position
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
    $('.pg.pg'+currentPage).toggleClass("pageful") //sets the current active page side nav button to active
    $(".ls.pg"+currentPage).toggleClass("button-focus") //sets the current active page top nav button to active

    console.log("Page binding complete.") //prints in console when sidebar is loaded.
});

/* page dragging */

let posX1, posX2, horizontalDifference = 0
var clicking = false;

$(document).on('mousedown', function(e) {
    if(!clicking){
        posX1 = e.pageX;
        clicking = !clicking //latch gate for the movement checker.

        $("sidenav").css("z-index","9999")
        $("pg.pg" + currentPage).css("pointer-events", "none")} //prevents rubber banding due to dragging on the "current" page
})

$(document).on('mousemove', function(e) {
    if(clicking){ //checks if mouse is currently being held down,
        //then checks to see if in mobile mode. Finally, then it checks if posX2 is different.
        posX2 = e.pageX;
        horizontalDifference = posX1 - posX2 //sets pos 2 while holding down the mouse

        $("#pageFunctionality").css({"left": -horizontalDifference}) //page dragging calcs

        var newPage = limitChecker(currentPage,pageScrollY.length,0,1, currentPage + pgposrelcheck(horizontalDifference, innerPage))
        for (var cp = 0; cp < pageScrollY.length; cp++) {
            $("pg.pg" + cp).css({
                "opacity":"0.25",
                "margin-left": pageSidebarPos(cp,newPage,pgPosMultiplier[cp])})} //updates page position
        if(newPage !== currentPage){ //compares current page to new page
            $("pg.pg" + newPage).css({"opacity":"0.75"})} //if new page is different, increase opacity.
    }
})

let toBeCurrent = currentPage, transitionSpeed
$(document).on('mouseup', function(e) {
    if(clicking){
        posX2 = e.pageX; //leave this here because otherwise regular clicking keeps X2 from the previous drag

        toBeCurrent = limitChecker(toBeCurrent,pageScrollY.length,0,1, currentPage + pgposrelcheck(horizontalDifference, innerPage))
        if(currentPage !== toBeCurrent){ //checks if button clicked is different than the active button
            $("pg.pg" + currentPage + ", pg.pg" + toBeCurrent).toggleClass("pageful") //removes class from concurrent page + adds it to newly active page
            $(".ls.pg" + currentPage + ", .ls.pg" + toBeCurrent).toggleClass("button-focus") //removes class from concurrent button + adds it to newly active button

            currentPage = toBeCurrent //updates i as the new active page
            $('pagedata').css({"margin-top":pageScrollY[toBeCurrent]})
            transitionSpeed = (Math.abs(toBeCurrent - currentPage)/ 20) + .3}
        else {
            transitionSpeed = 0.3} //Sets vertical page placement

        $("pg").css({"transition": //adds transitions for initial movement.
                "left " + transitionSpeed + "s cubic-bezier(0,0,0,1), " +
                "margin " + transitionSpeed + "s cubic-bezier(0,0,0,1), " +
                "opacity " + transitionSpeed + "s cubic-bezier(0,0,0,1)"}) // transitions to the default left position, gained from the mousemove function.
        $("#pageFunctionality").css({"left": 0}) //resets page dragging calcs
        setTimeout(function(){$("sidenav").css("z-index","99")},transitionSpeed)

        for(var page = 0; page < pageScrollY.length; page++){ //loops through all pages and updates positional data
            pgPosMultiplier[page] = page - toBeCurrent //root data for page position multipliers
            $("pg.pg" + page).css("margin-left", pageSidebarPos(page,toBeCurrent,pgPosMultiplier[page]))}//updates page position

        $("pg.pg" + currentPage).css("pointer-events", "auto") //alows clickability after page drag
        clicking = false //latch gate for the movement checker.

    }
})

/* page scroll scripts */

function limitChecker(currentValue, maxValue, minValue, overflowValue, newValue){
    currentValue = newValue
    if(currentValue > maxValue - overflowValue){ //if the number is above bandwidth,
        return maxValue - overflowValue} //return back to highest value
    else if(currentValue < minValue){ //if the number is below min bandwidth,
        return minValue} //return to min bandwidth
    else {
        return currentValue} //otherwise, act normal.
}

$(window).on('wheel', function(e){
    if(!mobileBool) { //prevents mobile debugger from having scroll functionality on desktop.
        //this calculates current scroll height through checking before pushing
        pageScrollY[currentPage] = limitChecker(pageScrollY[currentPage], 0, currentPgHeight, 0, pageScrollY[currentPage] - e.originalEvent.deltaY)
        $('pageData').css({"margin-top": pageScrollY[currentPage]}) //sets scroll height of container based on current page scroll arr

        if (currentPage === 0 && artsPostsHeight > sectionHeight) { //checks if currentPage is 0 OR post container is larger than page height
            artsScroll = limitChecker(artsScroll, 0, -artsPostsHeight + sectionHeight - (rootgutter * 2), 0, artsScroll - e.originalEvent.deltaY)
            //this calculates current scroll height through checking before pushing, it's not accurate but good enough
            console.log(artsScroll, -artsPostsHeight + sectionHeight, artsScroll - e.originalEvent.deltaY)
            $('.pg0 #arts0, .pg0 #arts1').css({"top": artsScroll}) //pushes new Y value
        } else if (currentPage === 1 && blogPostsHeight > sectionHeight) { //checks if currentPage is 1 OR post container is larger than page height
            blogScroll = limitChecker(blogScroll, 0, -blogPostsHeight + sectionHeight - (rootgutter * 3), 0, blogScroll - e.originalEvent.deltaY)
            //this calculates current scroll height through checking before pushing, it's not accurate but good enough
            $('.pg1 .postcont').css({"top": blogScroll}) //pushes new Y value
        }
    }
});

/* Mobile page scripts */

let posY1, posY2, verticalDifference //positions specific to mobile functionality. + debug values
var scrolldivisional = 14 //this generates the scroll speed based on division

$(window).bind('touchstart', function(e) {
    // grabs positional relation data on first touch
    posY1 = e.originalEvent.touches[0].pageY;
    posX1 = e.originalEvent.touches[0].pageX;})

$(window).bind('touchmove', function(e) {
    // grabs the current finger position
    posY2 = e.originalEvent.touches[0].pageY;
    posX2 = e.originalEvent.touches[0].pageX;
    //calculates the difference between both relation points, divided by multiplier
    verticalDifference = (posY1 - posY2) / scrolldivisional;
    horizontalDifference = (posX1 - posX2) / 2;
    let checkOverflow = verticalDifference - horizontalDifference

    if(checkOverflow < 100 && checkOverflow > -100){ //this is really jank, please fix
        pageScrollY[currentPage] = limitChecker(pageScrollY[currentPage],0,currentPgHeight,0, pageScrollY[currentPage] - verticalDifference)
        $('.pg'+currentPage).css({"margin-top":pageScrollY[currentPage]}) //sets scroll height of container based on current page scroll arr

        if(currentPage === 0 && artsPostsHeight > sectionHeight) { //checks if currentPage is 0 OR post container is larger than page height
            artsScroll = limitChecker(artsScroll,0,-artsPostsHeight - sectionHeight - (rootgutter * 2),0, artsScroll - verticalDifference)
            //this calculates current scroll height through checking before pushing, it's not accurate but good enough
            $('.pg0 #arts0, .pg0 #arts1').css({"margin-top":artsScroll}) //pushes new Y value
        }
        else if(currentPage === 1 && blogPostsHeight > sectionHeight){ //checks if currentPage is 1 OR post container is larger than page height
            blogScroll = limitChecker(blogScroll,0,-blogPostsHeight + sectionHeight - (rootgutter * 2) - rootgutter,0, blogScroll - verticalDifference)
            //this calculates current scroll height through checking before pushing, it's not accurate but good enough
            $('.pg1 .postcont').css({"margin-top":blogScroll}) //pushes new Y value
        }
    } else if(posX2 > 50 || posX2 < -50) {
        $("pg").css({"left": -horizontalDifference}) //page dragging calcs
        const newPage = limitChecker(currentPage, pageScrollY.length, 0, 1, currentPage + pgposrelcheck(horizontalDifference, innerPage + rootLeft + rootgutter));

        for (var cp = 0; cp < pageScrollY.length; cp++) {
            $("pg.pg" + cp).css({
                "opacity":"0.25",
                "margin-left": pageSidebarPos(cp,newPage,pgPosMultiplier[cp])}
            )} //updates page position
        if(newPage !== currentPage){ //compares current page to new page
            $("pg.pg" + newPage).css({"opacity":"0.75"})} //if new page is different, increase opacity.
    }
});

$(window).bind('touchend', function(e) {
    posX2 = e.originalEvent.changedTouches[0].pageX;
    toBeCurrent = limitChecker(toBeCurrent,pageScrollY.length,0,1, currentPage + pgposrelcheck(horizontalDifference, innerPage + rootLeft + rootgutter))

    if(currentPage !== toBeCurrent){ //checks if button clicked is different than the active button
        $("pg.pg" + currentPage + ", pg.pg" + toBeCurrent).toggleClass("pageful") //removes class from concurrent page + adds it to newly active page
        $(".ls.pg" + currentPage + ", .ls.pg" + toBeCurrent).toggleClass("button-focus") //removes class from concurrent button + adds it to newly active button

        currentPage = toBeCurrent //updates i as the new active page
        transitionSpeed = (Math.abs(toBeCurrent - currentPage)/ 20) + .3}
    else {
        transitionSpeed = 0.3} //Sets vertical page placement

    $("pg").css({"transition": //adds transitions for initial movement.
            "left " + transitionSpeed + "s cubic-bezier(0,0,0,1), " +
            "margin " + transitionSpeed + "s cubic-bezier(0,0,0,1), " +
            "opacity " + transitionSpeed + "s cubic-bezier(0,0,0,1)",
        "left":"0"}) // transitions to the default left position, gained from the mousemove function.
    setTimeout(function(){$("sidenav").css("z-index","99")},transitionSpeed)


    for(let page = 0; page < pageScrollY.length; page++){ //loops through all pages and updates positional data
        pgPosMultiplier[page] = page - toBeCurrent //root data for page position multipliers
        $("pg.pg" + page).css("margin-left", pageSidebarPos(page,toBeCurrent,pgPosMultiplier[page]))}//updates page position

    $("pg.pg" + currentPage).css("pointer-events", "auto") //alows clickability after page drag
})