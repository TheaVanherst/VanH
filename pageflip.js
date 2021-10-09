$(document).ready(function(){
    for(let i=0;i<6;i++){
        $('.i'+i).css({'background-image':"url('/Website assets/icons/sm"+i+".png')"})}

    for(let i=0;i<pgsd.length;i++){

        if (/Mobi|Android/i.test(navigator.userAgent)){
            $('.pg'+i).children().on('click',function(){
                if(cct!=i){ //checks if button clicked is different than the active button
                    $('.pg.pg'+cct).toggleClass("pageful") //removes the page focus class from current page
                    $(',.pg.pg'+i).toggleClass("pageful") //sets the current active page with i
                    $(".ls.pg"+cct+", .ls.pg"+i).toggleClass("button-focus") //sets the active button on lside / #nav

                    pgsd[cct] = $(document).scrollTop() //sets scroll height to array of current page
                    cct=i; //updates i as the new active page
                    $('html, body').animate({scrollTop:pgsd[i]},0); //adds page transition
                }
            })
        } else {
            if(i < cct){
                $('.pg.pg'+i).css( //sets the pages to the left of default page
                    'margin-left','calc((((var(--postwidth) + var(--sidebarr)) + 40px) * var(--page'+i+')) - (var(--sidebarl) + 20px))')
            } else {$('.pg.pg'+i).css( //sets all other pages
                'margin-left','calc(((var(--postwidth) + var(--sidebarr)) + 40px) * var(--page'+i+'))')}

            $('.pg'+i).children().on('click',function(){
                if(cct!=i){ //checks if button clicked is different than the active button
                    $(".pg.pg"+cct+", .pg.pg"+i).toggleClass("pageful") //removes class from concurrent page + adds it to newly active page
                    $(".ls.pg"+cct+", .ls.pg"+i).toggleClass("button-focus") //removes class from concurrent button + adds it to newly active button

                    $(".pg.pg"+i).css("opacity","1")
                    $(".pg.pg"+cct).css("opacity","0.6")

                    var tran = (Math.abs(i-cct)/10) + .3 + "s" //transition data based on difference with a multiplier
                    $(".pg").css({"transition": //adds transitions for initial movement.
                            "margin "+tran+" cubic-bezier(0,0,0,1), " +
                            "opacity "+tran+" cubic-bezier(0,0,0,1)"})

                    pgsd[cct] = $(document).scrollTop() //sets scroll height to array of current page
                    cct=i; //updates i as the new active page
                    $('html, body').animate({scrollTop:pgsd[i]},0)  //adds page transition

                    for(var e=0;e<pgsd.length;e++){ //loops through all pages and updates positional data
                        docelem.style.setProperty('--page'+e,e-i) //root data for page position multipliers
                        var newpos
                        if(e < i){ //checks if page is to the left of the current active page
                            newpos = "calc(((var(--postwidth) + var(--sidebarr)) + 40px) * (var(--page"+e+")) - (var(--sidebarl) + 20px))"
                        }else{ //checks if page location is to the right of the current active page
                            newpos = "calc(((var(--postwidth) + var(--sidebarr)) + 40px) * (var(--page"+e+")))"}
                        $(".pg.pg"+e).css("margin-left",newpos); //updates page position
                    }
                }
            })
        }

        $('.bt'+i).css({ //sets button data, because fuck css
            'background-image':"url('/Website assets/icons/sb"+i+".png')",
            'height':'42px',
            'background-size':'140% auto',
            'background-position':'left'
        })
    }
    //sets the concurrent page as the default page on page startup
    $('.pg.pg'+cct).toggleClass("pageful")
    $(".ls.pg"+cct).toggleClass("button-focus")

    console.log("Page binding complete.")
});

var x1, x2, clicking = false;
$(window).mouseup(function(e){
    if(clicking == true){
        x2 = e.pageX; //this is needed, otherwise it runs through the mouse move data and changes page every time you click off center.
        let i = cct; //placement replacer because no "i" int is generated otherwise, unlike buttons.

        setTimeout(function(){$(".pg.pg"+i).css("pointer-events","")},500) //this reenables page clickability when no longer being held
        $("#side").css("z-index","99")

        //Compares before and after mouse release to check position values, then compares them
        if(x1<x2 && x1-x2 < (((middb+righb+40)+leftb)*-1)/5){
            i+=Math.floor((x1-x2)/((middb+righb+40)+leftb))} //limits to the left hand side to the closest negative.
        else if (x1>x2 && x1-x2 > righb){
            i+=Math.ceil((x1-x2)/((middb+righb+40)+leftb))} //limits to the right hand side to the closest positive

        if(i>pgsd.length-1){i=pgsd.length-1}
        else if(i<0){i=0} //limits page location

        if(cct !== i){ //checks if button clicked is different than the active button
            $(".pg.pg"+cct+", .pg.pg"+i).toggleClass("pageful") //removes class from concurrent page + adds it to newly active page
            $(".ls.pg"+cct+", .ls.pg"+i).toggleClass("button-focus") //removes class from concurrent button + adds it to newly active button

            $(".pg.pg"+i).css("opacity","1")

            var tran = (Math.abs(i-cct)/20) + .3 + "s" //transition data based on difference with a multiplier
            $(".pg").css({"transition": //adds transitions for initial movement.
                    "left "+tran+" cubic-bezier(0,0,0,1), " +
                    "margin "+tran+" cubic-bezier(0,0,0,1), " +
                    "opacity "+tran+" cubic-bezier(0,0,0,1)"})
            $(".pg").css("left","0") // transitions to the default left position, gained from the mousemove function.

            pgsd[cct] = $(document).scrollTop() //sets scroll height to array of current page
            cct = i; //updates i as the new active page
            $('html, body').animate({scrollTop:pgsd[i]},0)  //adds page transition
        } else {
            $(".pg.pg"+i).css("opacity","1")
            $(".pg").css({"transition":
                    "left 1.5s cubic-bezier(0,0,0,1), " +
                    "margin 1s cubic-bezier(0,0,0,1)," +
                    "opacity 1s cubic-bezier(0,0,0,1)",
                "left":"0"})}

        for(var e = 0; e < pgsd.length; e++){ //loops through all pages and updates positional data
            docelem.style.setProperty('--page'+e,e-i) //root data for page position multipliers
            if(e < i){ //checks if page is to the left of the current active page
                var temp = "calc(((var(--postwidth) + var(--sidebarr)) + 40px) * (var(--page"+e+")) - (var(--sidebarl) + 20px))"
            }else{ //checks if page location is to the right of the current active page
                var temp = "calc(((var(--postwidth) + var(--sidebarr)) + 40px) * (var(--page"+e+")))"}
            $(".pg.pg"+e).css("margin-left",temp)} //updates page position
    }
    clicking = false //latch gate for the movement checker.
})

$(window).mousedown(function(e){
    $(".pg.pg"+cct).css("pointer-events","none")
    clicking = true; //latch gate for the movement checker.
    x1 = e.pageX //sets pos 1 on initial mousedown
})

$(window).mousemove(function(e){
    var opc, g = cct;

    if(clicking){ //checks if mouse is currently being held down
        x2 = e.pageX //sets pos 2 while holding down the mouse
        opc = 1-Math.abs(((middb*2)+righb+40)/(((middb*2)+righb+40)-(Math.abs(x2-x1)*-1)))+0.6 //calculates page opacity based on position
        $(".pg").css({"left":x2-x1}) //enables dynamic page dragging

        //Compares before and after mouse release to check position values, then compares them
        if(x1<x2 && x1-x2 < (((middb+righb+40)+leftb)*-1)/5){
            g+=Math.floor((x1-x2)/((middb+righb+40)+leftb))} //limits to the left hand side to the closest negative.
        else if (x1>x2 && x1-x2 > righb){
            g+=Math.ceil((x1-x2)/((middb+righb+40)+leftb))} //limits to the right hand side to the closest positive

        for(var e = 0; e < pgsd.length; e++){
            if(cct!==g){$(".pg.pg"+g).css("opacity",opc)} //focuses page opacity when hovered near
            if(cct==g){$(".pg.pg"+g).css("opacity","1")}
            $(".pg.pg"+e).css("opacity","0.6") //fades all other pages other than dragged focused

            var np;
            if(e < g){ //checks if page is to the left of the current active page
                np = "calc(((var(--postwidth) + var(--sidebarr)) + 40px) * (var(--page"+e+")) - (var(--sidebarl) + 20px))"
            }else{ //checks if page location is to the right of the current active page
                np = "calc(((var(--postwidth) + var(--sidebarr)) + 40px) * (var(--page"+e+")))"}
            $(".pg.pg"+e).css("margin-left",np)} //updates page position
        $("#side").css("z-index","9999")
    }
})