
$(document).ready(resize); $(window).on("load resize", resize)

var arthover = function (e) {//this function is a bit jank, but it's optimal enough not to fix
    $('#hover-element').remove(); //this removes the previous hover element to prevent multiple occurrences

    var target = $('.pageful #' + e.target.id); //grabs the hover target, based on where mouse is located.
    $('div.zoom').css({"opacity":"1"}) //sets the focused element to full opacity
    target.clone(true, true).insertAfter(target); //clones target element
    $(target).attr("id", "hover-element"); //sets target element's ID so it can be adjusted by the CSS.

    var image, //puts current image in storage
        image_url = $('#hover-element').css('background-image');

    if (image_url !== undefined) {
        image_url = image_url.match(/^url\("?(.+?)"?\)$/);
        image_url = image_url[1];

        image = new Image();
        image.src = image_url;

        $('#hover-element').css({
            "width": target.height() * (image.width / image.height),
            "height": target.height(), "min-width":target.parent().width()}).css(
            "margin-left", ((target.width() / -2) + (target.parent().width() / 2))
        ).parent().children('div.zoom').css({"opacity":"0.6"})
    }
}

$('incont > * > div').click(arthover).hover(arthover)

$(function (){
    $('.headerLogo').hover(
        function(){$('#header').addClass("hov")},
        function(){$('#header').removeClass("hov")})
})

var buttontext = ["Archive","Blog","Artwork","Design","Animation","Workshop","Javascript"],
    buttoncolour = ["#1da1f2","#5265fa","#171a21","#ff0000","#ff5e5b","#738adb"],
    tv = "/TheaVanherst", buttonlinks = ["twitter.com"+tv,"discord.com/invite/zDJRaZvGmS","steamcommunity.com/id"+tv,
        "youtube.com/channel/UCqbZe2XMkd98nXu_dUlObKA","ko-fi.com"+tv,"github.com"+tv]

$(document).ready(function(){
    for(var i = 0; i < buttoncolour.length; i++){
        $('<a target="_blank" href="https://'+buttonlinks[i]+'"><div class="wdt i'+(i)+'"></div></a>').appendTo("#sideMedia");
        $('head').append('<style>#sideMedia:hover > a:nth-child('+(i+1)+'):hover{background-color:'+buttoncolour[i]+'}</style>');}

    for(var i = 0; i < buttontext.length; i++){
        var temp = '#sideNav';
        if(i != 5){temp = temp + ', nav'}
        $('<div class="ls pg'+i+'"><t>'+buttontext[i]+'</t><div class="i bt'+i+'"></div></div>').appendTo(temp)}
})

var frt = ["jpg","png","gif"];

var pg2l=[1,1,1,1,2,1,1,1],pg2m=[1,1,1,1,1,1,1,1],pg2r=[1,1,1,1,1,1,1,2],sid2a=[pg2l,pg2m,pg2r], //image format : frt[]
    pg2hl=[9,5,5,0,5,8,7,7],pg2hm=[8.5,8,8,8,3,4,5,8],pg2hr=[9,7,5,7,5,5,9,4],sid2h=[pg2hl,pg2hm,pg2hr], //image hights
    sides = ["l","m","r"]; //for different file types, then loops through which coloumn is currently being looped

var pgdh=[443,443,443,465,465,224,600,600,600,600,600,600,224,465,465,440,440,224,224,575,575,575,143,196,440],
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