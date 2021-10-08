$(document).ready(function(){
    for(let i=0;i<6;i++){
        $('.i'+i).css({'background-image':"url('/Website assets/icons/sm"+i+".png')"})}

    for(let i=0;i<pgsd.length;i++){

        if (/Mobi|Android/i.test(navigator.userAgent)){
            $('.pg'+i).children().on('click',function(){
                if(concurrent!=i){ //checks if button clicked is different than the active button
                    $('.pg.pg'+concurrent).toggleClass("pageful") //removes the page focus class from current page
                    $(',.pg.pg'+i).toggleClass("pageful") //sets the current active page with i
                    $(".ls.pg"+concurrent+", .ls.pg"+i).toggleClass("button-focus") //sets the active button on lside / #nav

                    pgsd[concurrent] = $(document).scrollTop() //sets scroll height to array of current page
                    concurrent=i; //updates i as the new active page
                    $('html, body').animate({scrollTop:pgsd[i]},0); //adds page transition
                }
            })
        } else {
            if(i < concurrent){
                $('.pg.pg'+i).css( //sets the pages to the left of default page
                    'margin-left','calc((((var(--postwidth) + var(--sidebarr)) + 40px) * var(--page'+i+')) - (var(--sidebarl) + 20px))')
            } else {$('.pg.pg'+i).css( //sets all other pages
                'margin-left','calc(((var(--postwidth) + var(--sidebarr)) + 40px) * var(--page'+i+'))')}

            $('.pg'+i).children().on('click',function(){
                if(concurrent!=i){ //checks if button clicked is different than the active button
                    $(".pg.pg"+concurrent+", .pg.pg"+i).toggleClass("pageful") //removes class from concurrent page + adds it to newly active page
                    $(".ls.pg"+concurrent+", .ls.pg"+i).toggleClass("button-focus") //removes class from concurrent button + adds it to newly active button

                    var tran = (Math.abs(i-concurrent)/10) + .3 + "s" //transition data based on difference with a multiplier
                    $(".pg").css({"transition": //adds transitions for initial movement.
                            "margin "+tran+" cubic-bezier(0,0,0,1), " +
                            "opacity "+tran+" cubic-bezier(0,0,0,1)"})

                    pgsd[concurrent] = $(document).scrollTop() //sets scroll height to array of current page
                    concurrent=i; //updates i as the new active page
                    $('html, body').animate({scrollTop:pgsd[i]},0)  //adds page transition

                    for(var e=0;e<pgsd.length;e++){ //loops through all pages and updates positional data
                        docelem.style.setProperty('--page'+e,e-i) //root data for page position multipliers
                        if(e < i){ //checks if page is to the left of the current active page
                            var temp = "calc(((var(--postwidth) + var(--sidebarr)) + 40px) * (var(--page"+e+")) - (var(--sidebarl) + 20px))"
                        }else{ //checks if page location is to the right of the current active page
                            var temp = "calc(((var(--postwidth) + var(--sidebarr)) + 40px) * (var(--page"+e+")))"
                        }
                        $(".pg.pg"+e).css("margin-left",temp); //updates page position
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
    $('.pg.pg'+concurrent).toggleClass("pageful")
    $(".ls.pg"+concurrent).toggleClass("button-focus")

    console.log("Page binding complete.")
});