
var PostsHeight, DocumentHeight;
var PageScrollY = [0,0,0,0,0,0,0], CurrentPgHeight; //page scroll height, page height
var SectionHeight = getComputedStyle(document.documentElement).getPropertyValue('--pageheight')

//Page relativity position setting
var PgPosMultiplier =  [0,0,0,0,0,0,0], CurrentPage = 1;
var ContentWidth, MiddbRighB40, Leftb20;

$(document).ready(function(){ //function to set up sidebar
    CurrentPgHeight = -SectionHeight - HeaderW + document.documentElement.clientHeight //calculates page height for scroll limitation

    for(var i = 0; i <= 6; i++){ //loops through the amount of pages, KEEP AS VAR.
        $('.i' + i).css( //sets backgrround images for social media icons
            'background-image',"url('/Website assets/icons/sm" + i + ".png')")}

    for(let i = 0; i < PgPosMultiplier.length; i++){ //please keep this as LET.
        PgPosMultiplier[i] = i - CurrentPage //calculcates current active page as multiplierr

        if (mbl){
            $('.pg'+i).children().on('click',function(){
                if(CurrentPage !== i){ //checks if button clicked is different than the active button
                    $('.pg.pg' + CurrentPage).toggleClass("pageful") //removes the page focus class from current page
                    $(',.pg.pg' + i).toggleClass("pageful") //sets the current active page with i
                    $(".ls.pg" + CurrentPage+", .ls.pg" + i).toggleClass("button-focus") //sets the active button on lside / #nav

                    PageScrollY[CurrentPage] = $(document).scrollTop() //sets scroll height to array of current page

                    CurrentPage=i; //updates i as the new active page
                    $('html, body').animate({scrollTop:PageScrollY[i]},0)} //adds page transition
            })
        } else {
            $('.pg.pg'+i).css('margin-left',PageSidebarPos(i,CurrentPage,PgPosMultiplier[i])) //sets page position on load

            $(".pg.pg" + CurrentPage).css("pointer-events", "none")
            $(".pg.pg" + i).css("pointer-events", "auto")

            $('.pg' + i).children().on('click',function(){ //if sidebar nav button is pressed
                if(CurrentPage !== i){ //checks if button clicked is different than the active button

                    $(".pg.pg"+CurrentPage+", .pg.pg"+i).toggleClass("pageful") //removes class from concurrent page + adds it to newly active page
                    $(".ls.pg"+CurrentPage+", .ls.pg"+i).toggleClass("button-focus") //removes class from concurrent button + adds it to newly active button

                    $(".pg.pg"+CurrentPage).css("opacity","0.25")
                    $(".pg.pg"+i).css("opacity","1")

                    var tran = (Math.abs(i-CurrentPage)/10) + .3 + "s" //transition data based on difference with a multiplier
                    $(".pg").css({"transition": //adds transitions for initial movement.
                            "margin "+tran+" cubic-bezier(0,0,0,1), " +
                            "opacity "+tran+" cubic-bezier(0,0,0,1)"})

                    CurrentPage = i //updates i as the new active page
                    $('w3x3.cont').css({"top":PageScrollY[i]}) //Sets vertical page placement

                    for(var e = 0; e < PageScrollY.length; e++){ //loops through all pages and updates positional data
                        PgPosMultiplier[e] = e - i //root data for page position multipliers
                        $(".pg.pg"+e).css("margin-left",PageSidebarPos(e,i,PgPosMultiplier[e]))} //updates page position
                }
            })
        }
        //This loops through all sidebar buttons and sets background positions,
        // this saves some html crap and dumping in the css files.
        $('.bt'+i).css({ //sets button data, because fuck css
            'background-image':"url('/Website assets/icons/sb"+i+".png')",
            'height':'42px',
            'background-size':'140% auto',
            'background-position':'left'})
    }
    //sets the concurrent page as the default page on page startup
    $('.pg.pg'+CurrentPage).toggleClass("pageful") //sets the current active page side nav button to active
    $(".ls.pg"+CurrentPage).toggleClass("button-focus") //sets the current active page top nav button to active

    console.log("Page binding complete.") //prints in console when sidebar is loaded.
});

function PageSidebarPos(data1,data2,data3){
    if(data1 < data2){ //checks if page is to the left of the current active page
        return MiddbRighB40 * data3 - Leftb20}
    else{ //checks if page location is to the right of the current active page
        return MiddbRighB40 * data3}
}

function pgposrelcheck(data1,data2) {
    if(x1 < x2 && data1 < (-righb / 1.5)){ //leftside page check
        return  Math.floor(data1 / data2)} //limits to the left hand side to the closest negative.
    else if (x1 > x2 && data1 > (righb / 1.5)){ //right side page check
        return Math.ceil(data1 / data2)}
    else { return 0}//limits to the right hand side to the closest positive
}

function LimitChecker(Data1,Data2){
    if(Data1 > Data2 - 1){ //if the number is above bandwidth,
        return Data2 - 1} //return back to highest value
    else if(Data1 < 0){ //if the number is below bandwidth,
        return 0} //return to 0
    else {
        return Data1}
}

var x1, x2, clicking = false;

$(window).mousedown(function(e){
    if(!mbl && !clicking){
        clicking = !clicking //latch gate for the movement checker.

        $("#side").css("z-index","9999")
        $(".pg.pg" + CurrentPage).css("pointer-events", "none")

        x1 = e.pageX} //sets pos 1 on initial mousedown
})

var prf = 0;
$(window).mousemove(function(e){
    if(clicking && !mbl){ //checks if mouse is currently being held down,
        //then checks to see if in mobile mode. Finally, then it checks if x2 is different.
        x2 = e.pageX;
        prf = x1 - x2 //sets pos 2 while holding down the mouse
        $(".pg").css({"left": -prf}) //page dragging calcs

        var pcf = CurrentPage + pgposrelcheck(prf, ContentWidth)
        pcf = LimitChecker(pcf,PageScrollY.length,0,1)

        for (var cp = 0; cp < PageScrollY.length; cp++) {
            $(".pg.pg" + cp).css("opacity","0.25")
            $(".pg.pg" + cp).css("margin-left", PageSidebarPos(cp,pcf,PgPosMultiplier[cp]))
        } //updates page position
        $(".pg.pg" + pcf).css("opacity","1")
    }
})

var tpp = CurrentPage, tran
$(window).mouseup(function(e){
    if(clicking && !mbl){
        x2 = e.pageX; //leave this here because otherwise regular clicking keeps X2 from the previous drag
        $("#side").css("z-index","99")
        $(".pg.pg" + CurrentPage).css("pointer-events", "auto")

        tpp = CurrentPage + pgposrelcheck(prf, ContentWidth);
        tpp = LimitChecker(tpp,PageScrollY.length)

        if(CurrentPage !== tpp){ //checks if button clicked is different than the active button
            $(".pg.pg" + CurrentPage + ", .pg.pg" + tpp).toggleClass("pageful") //removes class from concurrent page + adds it to newly active page
            $(".ls.pg" + CurrentPage + ", .ls.pg" + tpp).toggleClass("button-focus") //removes class from concurrent button + adds it to newly active button

            CurrentPage = tpp //updates i as the new active page
            $('w3x3.cont').css({"top":PageScrollY[tpp]}) //Sets vertical page placement

            tran = (Math.abs(tpp - CurrentPage)/ 20) + .3 + "s"}
        else {
            tran = "0.3s"}

        $(".pg").css({"transition": //adds transitions for initial movement.
            "left " + tran + " cubic-bezier(0,0,0,1), " +
            "margin " + tran + " cubic-bezier(0,0,0,1), " +
            "opacity " + tran + " cubic-bezier(0,0,0,1)"})
        $(".pg").css("left","0") // transitions to the default left position, gained from the mousemove function.


        for(var cp = 0; cp < PageScrollY.length; cp++){ //loops through all pages and updates positional data
            PgPosMultiplier[cp] = cp - tpp //root data for page position multipliers
            console.log(cp, tpp, PgPosMultiplier[cp])
            $(".pg.pg"+cp).css("margin-left",PageSidebarPos(cp,tpp,PgPosMultiplier[cp]))}//updates page position

        clicking = false //latch gate for the movement checker.
        console.log("Page POS Debug: " + PgPosMultiplier) //debug
    }
})

$(window).on('wheel', function(e){
    PageScrollY[CurrentPage] -= e.originalEvent.deltaY

    if (PageScrollY[CurrentPage] > 0){ //for some reason this has to be here otherwise it goes into a recurring positive
        PageScrollY[CurrentPage] = 0 } //and I don't know why the fuck it does.
    else if (PageScrollY[CurrentPage] < CurrentPgHeight - 27){ //this has to be here to fix the margin at the bottom and I cannot for the
        PageScrollY[CurrentPage] = CurrentPgHeight - 27 } //life of me be bothered to come up with a better solution at the moment

    $('w3x3.cont').css({"top":PageScrollY[CurrentPage]})
});