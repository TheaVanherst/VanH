
// 88""Yb    db     dP""b8 888888     88      dP"Yb     db    8888b.      88  88b 88
// 88__dP   dPYb   dP   `" 88__       88     dP   Yb   dPYb    8I  Yb ___ 88  88Yb88
// 88"""   dP__Yb  Yb  "88 88""       88  .o Yb   dP  dP__Yb   8I  dY """ 88  88 Y88
// 88     dP""""Yb  YboodP 888888     88ood8  YbodP  dP""""Yb 8888Y"      88  88  Y8

$(document).ready(function(){ //loading in elements.
    setTimeout(function() {
        $('loadIn').animate({'opacity': '0'});
        var opUpdate = 'pagedata,' + (!mobileBool ? 'sideNav' : 'nav')
        $(opUpdate).animate({'opacity': '1'});
    },300)
})

// 88  88  dP"Yb  Yb    dP 888888 88""Yb     888888 888888 888888 888888  dP""b8 888888 .dP"Y8
// 88  88 dP   Yb  Yb  dP  88__   88__dP     88__   88__   88__   88__   dP   `"   88   `Ybo."
// 888888 Yb   dP   YbdP   88""   88"Yb      88""   88""   88""   88""   Yb        88   o.`Y8b
// 88  88  YbodP     YP    888888 88  Yb     888888 88     88     888888  YboodP   88   8bodP'

var arthover = function (e) {//this function is a bit jank, but it's optimal enough not to fix
    $('#hover-element').remove(); //this removes the previous hover element to prevent multiple occurrences

    var target = $('.pageful #' + e.target.id); //grabs the hover target, based on where mouse is located.
    $('div.zoom').css({"opacity":"1"}) //sets the focused element to full opacity
    target.clone(true, true).insertAfter(target); //clones target element
    $(target).attr("id", "hover-element"); //sets target element's ID so it can be adjusted by the CSS.

    var image, image_url = $('#hover-element').css('background-image'); //puts current image in storage
    if (image_url !== undefined) { //checks if there is no current image on hover.
        image = new Image(); //creates new hovering image
        image_url = image_url.match(/^url\("?(.+?)"?\)$/);
        image.src = image_url[1]; //grabs the required url

        $('#hover-element').css({ //grabs hover element by id
            "width": target.height() * (image.width / image.height), //changes width of container based on image data
            "height": target.height(), "min-width":target.parent().width()}).css(
            "margin-left", ((target.width() / -2) + (target.parent().width() / 2))
        ).parent().children('div.zoom').css({"opacity":"0.6"})
}}

$('pg.pg0, pg.pg1').on('mouseup touchend', function(e) {
    if(clickInt > -clickDur){
        var target = e.target; //grabs target div

        if (target.innerHTML.includes("<img") && !target.innerHTML.includes("<p") && !target.innerHTML.includes("when")) {
            //checks if the target contains an image and only an image.
            $('imageViewer').css('pointer-events', 'auto') //Allows clicking on previewer for imagePreviewReset()
            $('sidenav, pagedata').animate({"opacity": "0.25"}, 500) //page fade out
            $(target).parent().children("img").length > 0 ? $(target).parent().clone().appendTo('#imagePreviewer') : $(target).clone().appendTo('#imagePreviewer')

            if ($('imageviewer')[0].scrollHeight > $('body').height()) { //checks if the image is greater than the page height
                $('#imagePreviewer').css({'top': '0', 'transform': 'translate(-50%, 0%)'});
                $('imageviewer > div').css({'top': '0'})
            } //resets top offset to move images to top of page
        } else {
            imagePreviewer.innerHTML = ''}
    }
});

function imagePreviewReset() {
    imagePreviewer.innerHTML = ''; //clears the current image viewer
    $('sidenav, pagedata').animate({"opacity": "1"}, 500)

    $('#imagePreviewer').css({'top':'50%','transform':'translate(-50%, -50%)'}); //resets preview image to center
    $('imageviewer > div').css({'top':'50%'}); //resets preview image to center
    $('imageviewer').css({'pointer-events':'none'})} //allows image clickthrough

$('incont > * > div').click(arthover).hover(arthover)

$(function (){
    $('.headerLogo').hover( //on banner hover
        function(){$('#header').addClass("hov")}, //add class hov which changes opacity to show the lower logo as visible.
        function(){$('#header').removeClass("hov")}) //resets to default transparency settings.
})

// 88b 88    db    Yb    dP 88  dP""b8    db    888888 88  dP"Yb  88b 88     .dP"Y8 888888 888888 88   88 88""Yb
// 88Yb88   dPYb    Yb  dP  88 dP   `"   dPYb     88   88 dP   Yb 88Yb88     `Ybo." 88__     88   88   88 88__dP
// 88 Y88  dP__Yb    YbdP   88 Yb  "88  dP__Yb    88   88 Yb   dP 88 Y88     o.`Y8b 88""     88   Y8   8P 88"""
// 88  Y8 dP""""Yb    YP    88  YboodP dP""""Yb   88   88  YbodP  88  Y8     8bodP' 888888   88   `YbodP' 88

var buttontext = ["Artchive","Dev Blog","Artwork","Design","Video Media","Workshop"],
    tv = "/TheaVanherst", socialMedia = [["#1da1f2","#5265fa","#171a21","#ff0000","#ff5e5b","#738adb"],
        ["twitter.com"+tv,"discord.com/invite/zDJRaZvGmS","steamcommunity.com/id"+tv,"youtube.com/channel/UCqbZe2XMkd98nXu_dUlObKA","ko-fi.com"+tv,"github.com"+tv]]

$(document).ready(function(){ //on load social media button assignements.
    for(var i = 0; i < socialMedia[0].length; i++){ //loops through sidebar button colour length to apply for each button.
        $('<a target="_blank" href="https://'+socialMedia[1][i]+'"><div class="wdt i'+(i)+'"></div></a>').appendTo("#navSocial"); //creates a button based on short urls
        $('head').append('<style>#navSocial:hover > a:nth-child('+(i+1)+'):hover{background-color:'+socialMedia[0][i]+'}</style>');} //assigns unique

    //Navigation Buttons - SIDEBAR
    for(var i = 0; i < buttontext.length; i++) {
        $('<div class="ls pg' + i + '"><t>' + buttontext[i] + '</t><div class="i bt' + i + '"></div></div>').appendTo('#navButtons, nav')}
    //Navigation Buttons - TOPBAR
    for(var i = 0; i < (Math.ceil(buttontext.length / 3) * 3) - buttontext.length; i++){
        $('<div class="ls"><t></t><div class="i btnull"></div></div>').appendTo('#topNav')}
})

var frt = ["jpg","png","gif"]; //image format : frt[]

// 88""Yb  dP""b8      dP"Yb  oP"Yb.     888888 88     888888 8b    d8     88      dP"Yb     db    8888b.  888888 88""Yb
// 88__dP dP   `"     dP   Yb "' dP'     88__   88     88__   88b  d88     88     dP   Yb   dPYb    8I  Yb 88__   88__dP
// 88"""  Yb  "88     Yb   dP   dP'      88""   88  .o 88""   88YbdP88     88  .o Yb   dP  dP__Yb   8I  dY 88""   88"Yb
// 88      YboodP      YbodP  .d8888     888888 88ood8 888888 88 YY 88     88ood8  YbodP  dP""""Yb 8888Y"  888888 88  Yb

var pg2Formats=[[1,1,1,1,2,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,2]], //image format : frt[]
    pg2Heights=[[9,5,5,10,5,8,7,7],[8,7.6,8,8,3,4,5,8],[9,7,5,6,5,5,10,3]], //image heights
    sides = ["l","m","r"]; // file references to be referred to by pg2Formats,pg2m,pg2r. (this just saves a bit of time & text.

$(document).ready(function() {
    for (var t = 0; t < sides.length; t++) { //toggles between sides, because it's easier to read and bugfix
        for (var i = 1; i <= pg2Formats[t].length; i++) {//loops through current active array, to figure out how many images per column.
            $('#' + sides[t] + 's' + i).addClass('zoom img')
                .css({'height': (pg2Heights[t][i - 1] * 100) + "px",
                    'background-image': "url('/featured/" + sides[t] + i + "." + frt[pg2Formats[t][i - 1]] + "')"});
    }}
})

// 88""Yb  dP""b8      dP"Yb  88888     888888 88     888888 8b    d8     88      dP"Yb     db    8888b.  888888 88""Yb
// 88__dP dP   `"     dP   Yb   .dP     88__   88     88__   88b  d88     88     dP   Yb   dPYb    8I  Yb 88__   88__dP
// 88"""  Yb  "88     Yb   dP o `Yb     88""   88  .o 88""   88YbdP88     88  .o Yb   dP  dP__Yb   8I  dY 88""   88"Yb
// 88      YboodP      YbodP  YbodP     888888 88ood8 888888 88 YY 88     88ood8  YbodP  dP""""Yb 8888Y"  888888 88  Yb

var pg3Formats=[0,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1] //file types
    pg3ConHeights=[400,400,400,465,465,224,600,600,600,600,600,600,224,465,465,440,440,224,224,505,505,505,143,196,440], //compensates for different image sizes in group containers
    pg3Heights=[0,0,5,0,0,0,0,0,0,0,-56,0,0,0,0,0,0,0,0,0,0,0,-40,0,0], //image heights

$(document).ready(function(){
    for(var i=0; i<=pg3Heights.length; i++){
        $('#dp'+i).addClass('zoom img')
            .css({'height':pg3ConHeights[i]-pg3Heights[i]-40+"px",
                'background-image':"url('/featured/d"+i+"."+frt[pg3Formats[i]]+"')"})
            .parent().css({'height':pg3ConHeights[i]+"px"})
    }
})