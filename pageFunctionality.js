
let blogPostsHeight = 500, artsPostsHeight = 500, //this is just needed as an inital backup until posts load
    blogScroll = 0, artsScroll = 0; //scroll heights in relation to blogPostsHeight && artsPostsHeight

let pageScrollY = [0,0,0,0,0,0,0], sectionPad; //page scroll height, page height
let pgPosMultiplier = [0,0,0,0,0,0,0]; //Page relativity position setting

// 88""Yb    db     dP""b8 888888     88""Yb  dP"Yb  .dP"Y8      dP""b8    db    88      dP""b8 .dP"Y8
// 88__dP   dPYb   dP   `" 88__       88__dP dP   Yb `Ybo."     dP   `"   dPYb   88     dP   `" `Ybo."
// 88"""   dP__Yb  Yb  "88 88""       88"""  Yb   dP o.`Y8b     Yb       dP__Yb  88  .o Yb      o.`Y8b
// 88     dP""""Yb  YboodP 888888     88      YbodP  8bodP'      YboodP dP""""Yb 88ood8  YboodP 8bodP'

function pageSidebarPos(newPage,currentPage,pageMultiplier) { //limits vars to set data ranges
    if (newPage < currentPage && !scale2Multiplier) { //checks if page is to the left of the current active page
        return innerPage * pageMultiplier - (rootLeft + rootGutter)
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

function limitChecker(currentValue, maxValue, minValue, overflowValue, newValue){
    currentValue = newValue
    if(currentValue > maxValue - overflowValue){ //if the number is above bandwidth,
        return maxValue - overflowValue} //return back to highest value
    else if(currentValue < minValue){ //if the number is below min bandwidth,
        return minValue} //return to min bandwidth
    else {
        return currentValue} //otherwise, act normal.
}

// 88""Yb    db     dP""b8 888888     88""Yb 88 88b 88 8888b.  88 88b 88  dP""b8
// 88__dP   dPYb   dP   `" 88__       88__dP 88 88Yb88  8I  Yb 88 88Yb88 dP   `"
// 88"""   dP__Yb  Yb  "88 88""       88""Yb 88 88 Y88  8I  dY 88 88 Y88 Yb  "88
// 88     dP""""Yb  YboodP 888888     88oodP 88 88  Y8 8888Y"  88 88  Y8  YboodP

let currentPage = 1; // CHANGE THIS NUMBER TO CHANGE THE DEFAULT PAGE ON LAUNCH.

$(function(){ //function to set up sidebar
    $("pg.pg" + currentPage).toggleClass("pageful")// this displays the default current page as active on page launch.

    for(let b = 0; b <= 6; b++){ //loops through the amount of pages, KEEP AS VAR.
        $('.i' + b).css( //sets background images for social media icons
            'background-image',"url('/Website assets/icons/sm" + b + ".png')")}

    for(let i = 0; i < pgPosMultiplier.length; i++){ //please keep this as LET.
        pgPosMultiplier[i] = i - currentPage //calculcates current active page as multiplierr
        $("pg.pg"+i).css("margin-left", pageSidebarPos(i,currentPage,pgPosMultiplier[i]))//sets page position on load

        $('.pg' + i).children().on('click',function(){ //if sidebar nav button is pressed
            if(currentPage !== i){ //checks if button clicked is different than the active button

                if(i !== 4 && document.readyState === 'complete'){ //checks if the current page is the media player page.
                    player.pauseVideo()} //if page is not media player, stop video on page change.

                $("pg.pg" + currentPage + ", pg.pg"+i).toggleClass("pageful") //removes class from concurrent page + adds it to newly active page
                $(".ls.pg" + currentPage + ", .ls.pg"+i).toggleClass("button-focus") //removes class from concurrent button + adds it to newly active button

                $("pg.pg"+currentPage).css("opacity","0.25") //previously focused page
                $(".pg.pg"+i).css("opacity","1") //focused page

                transitionSpeed = (Math.abs(i - currentPage) / 6) + .3 + "s"; //transition data based on difference with a multiplier
                $("pg").css({"transition": //adds transitions for initial movement.
                        "margin " + transitionSpeed + " cubic-bezier(0,0,0,1), " + //movement left to right
                        "opacity " + transitionSpeed + " cubic-bezier(0,0,0,1)"}) //fade in

                currentPage = i //updates i as the new active page
                if(!mobileBool){
                    $('pageData').css({"top":pageScrollY[i]})
                    for(var e = 0; e < pageScrollY.length; e++){ //loops through all pages and updates positional data
                        pgPosMultiplier[e] = e - i //root data for page position multipliers
                        $("pg.pg"+e).css("margin-left", pageSidebarPos(e,i,pgPosMultiplier[e]))} //updates page position
                } else {
                    $('mobileController').css("left", 'calc((var(--innerPageCalc) + var(--gutter)) * ' + -pgPosMultiplier[currentPage] + ')')}
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

// 88""Yb    db     dP""b8 888888     8888b.  88""Yb    db     dP""b8  dP""b8 88 88b 88  dP""b8
// 88__dP   dPYb   dP   `" 88__        8I  Yb 88__dP   dPYb   dP   `" dP   `" 88 88Yb88 dP   `"
// 88"""   dP__Yb  Yb  "88 88""        8I  dY 88"Yb   dP__Yb  Yb  "88 Yb  "88 88 88 Y88 Yb  "88
// 88     dP""""Yb  YboodP 888888     8888Y"  88  Yb dP""""Yb  YboodP  YboodP 88 88  Y8  YboodP

/* page dragging */
let posY1, posY2, verticalDifference //positions specific to mobile functionality. + debug values
let posX1, posX2, horizontalDifference = 0

//click register variables
var clicking = false, clickStart = 0, clickInt = 0, clickDur = 65;

$(function(){
    if(mobileBool){
        $('#pageFunctionality').on('touchstart', document, function (e) {
            clickStart = Date.now();

            if (!clicking) { //this prevents spam holddown
                clicking = true
                posX1 = e.originalEvent.touches[0].pageX;
                posY1 = e.originalEvent.touches[0].pageY;}})}
    else {
        $(window).on('mousedown', document, function (e) {
            clickStart = Date.now();

            if (!clicking) { //this prevents spam holddown
                clicking = true
                posX1 = e.pageX}
        })
    }
})

$(window).on('mousemove', function(e) {
    if(clicking) {
        if (clickInt > -clickDur) {
            clickInt = clickStart - Date.now()}

        else { //checks if mouse is currently being held down,
            $("pg.pg" + currentPage).css("pointer-events", "none")
            //then checks to see if in mobile mode. Finally, then it checks if posX2 is different.
            posX2 = e.pageX;
            horizontalDifference = posX1 - posX2 //sets pos 2 while holding down the mouse

            $("#pageFunctionality").css({"left": -horizontalDifference}) //page dragging calcs

            var newPage = limitChecker(currentPage, pageScrollY.length, 0, 1, currentPage + pgposrelcheck(horizontalDifference, innerPage))
            for (var cp = 0; cp < pageScrollY.length; cp++) {
                $("pg.pg" + cp).css({
                    "opacity": "0.25",
                    "margin-left": pageSidebarPos(cp, newPage, pgPosMultiplier[cp])
                })
            } //updates page position
            if (newPage !== currentPage) { //compares current page to new page
                $("pg.pg" + newPage).css({"opacity": "0.75"})
            } //if new page is different, increase opacity.
        }
    }
})


$(window).bind('touchmove', function(e) {
    if(clicking) {
        if (clickInt > -clickDur) {
            clickInt = clickStart - Date.now()}

        else {
            $("pg.pg" + currentPage).css("pointer-events", "none")
            // grabs the current finger position
            posX2 = e.originalEvent.touches[0].pageX;
            posY2 = e.originalEvent.touches[0].pageY;
            //calculates the difference between both relation points, divided by multiplier
            horizontalDifference = posX1 - posX2
            verticalDifference = (posY1 - posY2) / 1.25

            if (horizontalDifference > -(newRootMid / 2.5) && horizontalDifference < (newRootMid / 2.5)) {
                $("mobileController").css({"margin-left": "0"}) //page dragging calcs

                if(mobileBool){
                    if(currentPage !== 0 && currentPage !== 1){
                        pageScrollY[currentPage] = limitChecker(pageScrollY[currentPage], 0, currentPgHeight, 0, pageScrollY[currentPage] - verticalDifference)}
                } else {
                    pageScrollY[currentPage] = limitChecker(pageScrollY[currentPage], 0, currentPgHeight, 0, pageScrollY[currentPage] - verticalDifference)}

                if (currentPage === 0) { //checks if currentPage is 0 OR post container is larger than page height
                    artsScroll = limitChecker(artsScroll, 0, -artsPostsHeight + currentPgHeight, 0, artsScroll - verticalDifference)
                    //this calculates current scroll height through checking before pushing, it's not accurate but good enough
                    $('pg.pg0 #arts0, pg.pg0 #arts1').css({"top": artsScroll})//pushes new Y value

                    //This double checks run loop being empty and all previous posts are loaded before spawning more.
                    if (-artsScroll + sectionHeight > artsPostsHeight && runLoop === 0) { //checks height scroll value being greater than internal container height
                        runLoop = artLoadin; //var to determine how many new art posts load
                        artGeneration()
                    }
                } //loads art elements

                else if (currentPage === 1) { //checks if currentPage is 1 OR post container is larger than page height
                    blogScroll = limitChecker(blogScroll, 0, -blogPostsHeight - rootGutter + currentPgHeight, 0, blogScroll - verticalDifference)
                    //this calculates current scroll height through checking before pushing, it's not accurate but good enough
                    $('pg.pg1 .postcont').css({"top": blogScroll})
                } //pushes new Y value

                //This double checks run loop being empty and all previous posts are loaded before spawning more.
                if (-blogScroll + sectionHeight > blogPostsHeight && runLoop === 0) { //checks height scroll value being greater than internal container height
                    runLoop = blogLoadin;//var to determine how many new art posts load
                    loadpostelement()
                } //loads art elements

                else if (!mobileBool) {
                    $('pagedata').css({"top": pageScrollY[currentPage]})
                } else {
                    $('pg.pg' + currentPage).css({"top": pageScrollY[currentPage]})
                }

                posY1 = e.originalEvent.touches[0].pageY
            } else { //scroll calc
                $("mobileController").css({"margin-left": -horizontalDifference}) //page dragging calcs
                const newPage = limitChecker(currentPage, pageScrollY.length, 0, 1, currentPage + pgposrelcheck(horizontalDifference, innerPage + rootLeft + rootGutter));

                for (var cp = 0; cp < pageScrollY.length; cp++) {
                    $("pg.pg" + cp).css({
                        "opacity": "0.25",
                        "margin-left": pageSidebarPos(cp, newPage, pgPosMultiplier[cp])
                    })
                } //updates page position

                if (newPage !== currentPage) { //compares current page to new page
                    $("pg.pg" + newPage).css({"opacity": "0.75"})
                } //if new page is different, increase opacity.
            }
        }
    }
});

let toBeCurrent = currentPage, transitionSpeed
$(window).on('mouseup touchend', function(e) {
    if(clicking) {
        if ('ontouchstart' in window || navigator.msMaxTouchPoints) {posX2 = e.originalEvent.changedTouches[0].pageX}
        else {posX2 = e.pageX}

        if (mobileBool) {toBeCurrent = limitChecker(toBeCurrent, pageScrollY.length, 0, 1, currentPage + pgposrelcheck(horizontalDifference, innerPage + rootLeft + rootGutter))}
        else {toBeCurrent = limitChecker(toBeCurrent, pageScrollY.length, 0, 1, currentPage + pgposrelcheck(horizontalDifference, innerPage))}
        transitionSpeed = (Math.abs(toBeCurrent - currentPage) / 20) + .3

        if (currentPage !== toBeCurrent) { //checks if button clicked is different than the active button
            $("pg.pg" + currentPage + ", pg.pg" + toBeCurrent).toggleClass("pageful") //removes class from concurrent page + adds it to newly active page
            $(".ls.pg" + currentPage + ", .ls.pg" + toBeCurrent).toggleClass("button-focus") //removes class from concurrent button + adds it to newly active button
            currentPage = toBeCurrent;

            if (!mobileBool) {
                $('pagedata').css({"top": pageScrollY[toBeCurrent]})}}

        $("#pageFunctionality, mobileController").css({"left": "0"}) //resets page dragging calcs

        if (!mobileBool) {
            for (var page = 0; page < pageScrollY.length; page++) { //loops through all pages and updates positional data
                pgPosMultiplier[page] = page - toBeCurrent //root data for page position multipliers
                $("pg.pg" + page).css("margin-left", pageSidebarPos(page, toBeCurrent, pgPosMultiplier[page]))}} //updates page position
        else {
            $('mobileController').css({
                'left': (toBeCurrent * -pageWidth) + pageWidth, "margin-left":"0"})}

        $("pg.pg" + currentPage).css("pointer-events", "auto") //alows clickability after page drag

        clicking = false; //latch gate for the movement checker.
        clickInt = 0;
        clickStart = 0;
    }
})

$(window).on('wheel', function(e){
    if(!mobileBool){
        pageScrollY[currentPage] = limitChecker(pageScrollY[currentPage], 0, currentPgHeight, 0, pageScrollY[currentPage] - (e.originalEvent.deltaY / 2))
        $('pageData').css({"top": pageScrollY[currentPage]}) //sets scroll height of container based on current page scroll arr

        if (currentPage === 0 && artsPostsHeight > sectionHeight) { //checks if currentPage is 0 OR post container is larger than page height
            artsScroll = limitChecker(artsScroll, 0, -artsPostsHeight + sectionHeight - (rootGutter * 2), 0, artsScroll - (e.originalEvent.deltaY / 3))
            //this calculates current scroll height through checking before pushing, it's not accurate but good enough
            $('pg.pg0 #arts0, .pg0 #arts1').css({"top": artsScroll}) //pushes new Y value

            //This double checks run loop being empty and all previous posts are loaded before spawning more.
            if(-artsScroll + sectionHeight > artsPostsHeight && runLoop === 0){ //checks height scroll value being greater than internal container height
                runLoop = artLoadin;//var to determine how many new art posts load
                artGeneration()} //loads art elements

        } else if (currentPage === 1 && blogPostsHeight > sectionHeight) { //checks if currentPage is 1 OR post container is larger than page height
            blogScroll = limitChecker(blogScroll, 0, -blogPostsHeight + sectionHeight - (rootGutter * 3), 0, blogScroll - (e.originalEvent.deltaY / 3))
            //this calculates current scroll height through checking before pushing, it's not accurate but good enough
            $('pg.pg1 .postcont').css({"top": blogScroll}) //pushes new Y value

            //This double checks run loop being empty and all previous posts are loaded before spawning more.
            if(-blogScroll + sectionHeight > blogPostsHeight && runLoop === 0){ //checks height scroll value being greater than internal container height
                runLoop = blogLoadin;//var to determine how many new art posts load
                loadpostelement()} //loads art elements
        }
    }
});