var concurrent=1,pgsd=[0,0,0,0,0,0,0]; //
var righb = 350, leftb = 250, middb = 500, //these are root vars numbers from style.css
    bod = $('body').width(),
    page3 = bod - (bod - (righb + middb + leftb)),
    page2 = bod - (bod - (righb + middb));

$(document).ready(resize); $(window).on("load resize", resize)

$(document).ready(function() {
    if (/Mobi|Android/i.test(navigator.userAgent) === true) {
        $(".nmb, #top-nav, #side, .pg0 siders").addClass("active");
        $(".pg").removeClass("active")}

    $('#pfp').attr('src',"/Website Assets/imgs/pfp.gif");
    $('#sc1').attr('src',"/Website Assets/imgs/ams1.png")
})

var arthover = function () {
    $('#hover-element').remove(); $('#side').css("z-index","99")

    var target = $('.pageful #' + event.target.id);
    $('div.zoom').css({"opacity":"1"})
    target.clone(true, true).insertAfter(target);
    $(target).attr("id", "hover-element");

    var image, image_url = $('#hover-element').css('background-image');
    if (image_url !== undefined) {
        image_url = image_url.match(/^url\("?(.+?)"?\)$/); image_url = image_url[1];
        image = new Image(); image.src = image_url;

        $('#side').css("z-index","0")
        $('#hover-element').css({
            "width": target.height() * (image.width / image.height),
            "height": target.height(), "min-width":target.parent().width()}).css(
            "margin-left", ((target.width() / -2) + (target.parent().width() / 2))
        ).parent().children('div.zoom').css({"opacity":"0.6"})
    }
}

$('incont > * > div').click(arthover).hover(arthover)
$('incont > * > div').mouseout(function() {$('#side').css("z-index","99")})

$(function (){
    $('.hdrlogo').hover(
        function(){$('#hdr, #bck').addClass("hov")},
        function(){$('#hdr, #bck').removeClass("hov")})
})

var frt = ["jpg","png","gif"];

var buttontext = ["Archive","Blog","Artwork","Design","Animation","Workshop","Javascript"],
    buttoncolour = ["#1da1f2","#5265fa","#171a21","#ff0000","#ff5e5b","#738adb"],
    tv = "/TheaVanherst", buttonlinks = ["twitter.com"+tv,"discord.com/invite/zDJRaZvGmS","steamcommunity.com/id"+tv,
        "youtube.com/channel/UCqbZe2XMkd98nXu_dUlObKA","ko-fi.com"+tv,"github.com"+tv]

$(document).ready(function(){
    for(var i = 0; i<buttoncolour.length; i++){
        $('<a target="_blank" href="https://'+buttonlinks[i]+'"><div class="wdt i'+(i)+'"></div></a>').appendTo("#side-media");
        $('head').append('<style>#side-media:hover > a:nth-child('+(i+1)+'):hover{background-color:'+buttoncolour[i]+'}</style>');}

    for(var i = 0; i<buttontext.length; i++){
        var temp = '#side-nav';
        if(i != 5){temp = temp + ', #top-nav'}
        $('<div class="ls pg'+i+'"><t>'+buttontext[i]+'</t><div class="i bt'+i+'"></div></div>').appendTo(temp)}
})

var pg2l=[1,1,1,1,2,1,1,1],pg2m=[1,1,1,1,1,1,1,1],pg2r=[1,1,1,1,1,1,1,2],sid2a=[pg2l,pg2m,pg2r], //image format : frt[]
    pg2hl=[9,5,5,0,5,8,7,7],pg2hm=[8.5,8,8,8,3,4,5,8],pg2hr=[9,7,5,7,5,5,9,4],sid2h=[pg2hl,pg2hm,pg2hr], //image hights
    sides = ["l","m","r"]; //for different file types, then loops through which coloumn is currently being looped

var pgdh=[430,430,430,465,465,224,600,600,600,600,600,600,224,465,465,440,440,224,224,575,575,575,143,196,440],
    pg3h=[355,355,355,425,425,184,560,560,560,560,772,560,184,425,425,400,400,184,184,460,460,460,153,156,400], //image hights
    ap3=[0,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1]

$(document).ready(function(){
    for(var t=0;t<sides.length;t++) { //toggles between sides, because it's easier to read and bugfix
        var ap2=sid2a[t],ah2=sid2h[t]; //flips between which array is currently active
        for (var i=1;i<=pg2l.length;i++) {
            $('#'+sides[t]+'s'+i).addClass('zoom img')
                .css({'height':(ah2[i- 1]*100)+"px",
                    'background-image':"url('/Website assets/imgs/"+sides[t]+i+"."+frt[ap2[i- 1]]+"')"});
        }
    }
    for(var i=0;i<=pg3h.length;i++){
        $('#dp'+i).addClass('zoom img')
            .css({'height':pg3h[i]+"px",
                'background-image':"url('/Website assets/imgs/d"+i+"."+frt[ap3[i]]+"')"})
            .parent().css({'height':pgdh[i]+"px"})
    }
})

var pos1, pos2, clicking = false;

$(window).mouseup(function(e){
    clicking = false //latch gate for the movement checker.
    pos2 = e.pageX; //this is needed, otherwise it runs through the mouse move data and changes page every time you click off center.
    let i = concurrent; //placement replacer because no "i" int is generated otherwise, unlike buttons.

    $(".pg").css("pointer-events","")
    //Compares before and after mouse release to check position values, then compares them
    if(pos1 < pos2 && pos1-pos2 < (((middb*2)+righb+40)*-1)/5){
        i+=Math.floor((pos1-pos2)/((middb*2)+righb+40))} //limits to the left hand side to the closest negative.
    else if (pos1 > pos2 && pos1-pos2 > (((middb*2)+righb+40)*1)/5){
        i+=Math.ceil((pos1-pos2)/((middb*2)+righb+40))}  //limits to the right hand side to the closest positive

    if(i>pgsd.length-1){
        i=pgsd.length-1}
    else if(i<0){
        i=0} //limits page location

    if(concurrent !== i){ //checks if button clicked is different than the active button
        $(".pg.pg"+concurrent+", .pg.pg"+i).toggleClass("pageful") //removes class from concurrent page + adds it to newly active page
        $(".ls.pg"+concurrent+", .ls.pg"+i).toggleClass("button-focus") //removes class from concurrent button + adds it to newly active button

        var tran = (Math.abs(i-concurrent)/20) + .3 + "s" //transition data based on difference with a multiplier
        $(".pg").css({"transition": //adds transitions for initial movement.
                "left "+tran+" cubic-bezier(0,0,0,1), " +
                "margin "+tran+" cubic-bezier(0,0,0,1), " +
                "opacity "+tran+" cubic-bezier(0,0,0,1)"})
        $(".pg").css("left","0") // transitions to the default left position, gained from the mousemove function.

        pgsd[concurrent] = $(document).scrollTop() //sets scroll height to array of current page
        concurrent = i; //updates i as the new active page
        $('html, body').animate({scrollTop:pgsd[i]},0)  //adds page transition

        for(var e = 0; e < pgsd.length; e++){ //loops through all pages and updates positional data
            docelem.style.setProperty('--page'+e,e-i) //root data for page position multipliers
            if(e < i){ //checks if page is to the left of the current active page
                var temp = "calc(((var(--postwidth) + var(--sidebarr)) + 40px) * (var(--page"+e+")) - (var(--sidebarl) + 20px))"
            }else{ //checks if page location is to the right of the current active page
                var temp = "calc(((var(--postwidth) + var(--sidebarr)) + 40px) * (var(--page"+e+")))"}
            $(".pg.pg"+e).css("margin-left",temp)} //updates page position

    } else {
        $(".pg").css({"transition":"left 1s cubic-bezier(0,0,0,1), margin 1s cubic-bezier(0,0,0,1)", "left":"0"})}
})

$(window).mousedown(function(e){
    $(".pg.pg"+concurrent).css("pointer-events","none")
    clicking = true; //latch gate for the movement checker.
    pos1 = e.pageX
}) //sets pos 1 on initial mousedown

$(window).mousemove(function(e){
    var opc
    if(clicking){ //checks if mouse is currently being held down
        pos2 = e.pageX //sets pos 2 while holding down the mouse
        opc = ((middb*2)+righb+40)/(((middb*2)+righb+40)-(Math.abs(pos2-pos1)* -1))

        $(".pg").css({"left":pos2-pos1})
        $(".pageful").css("opacity",opc)} //idk why this doesn't work
})