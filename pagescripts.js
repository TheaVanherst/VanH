
var righb = 350, leftb = 250, middb = 500, //these are root vars numbers from style.css
    bod = $('body').width(),
    page3 = bod - (bod - (righb + middb + leftb)),
    page2 = bod - (bod - (righb + middb));
let postamount=16, article=postamount;

$(document).ready(resize); $(window).on("load resize", resize)

$(document).ready(function() {
    if (/Mobi|Android/i.test(navigator.userAgent) === true) {
        $(".nmb, #top-nav, #side, .pg0 siders").addClass("active");
        $(".pg").removeClass("active")}

    $('#pfp').attr('src',"/Website Assets/imgs/pfp.gif");
    $('#sc1').attr('src',"/Website Assets/imgs/ams1.png")
})

var arthover = function () {
    $('incont > *').children('div.zoom').css("opacity","1")
    $('#hover-element').remove(); $('#side').css("z-index","99")

    var target = $('#' + event.target.id);
    target.clone(true, true).insertAfter(target);
    $(target).attr("id", "hover-element");

    var image, image_url = $('#hover-element').css('background-image');
    if (image_url !== undefined) {
        image_url = image_url.match(/^url\("?(.+?)"?\)$/);
        image_url = image_url[1];
        image = new Image();
        image.src = image_url;

        $('#hover-element').css({
            "width": target.height() * (image.width / image.height),
            "height": target.height(), "min-width":target.parent().width()}).css(
            "margin-left", ((target.width() / -2) + (target.parent().width() / 2))
        ).parent().children('div.zoom').css("opacity","0.4")
    }
}

$('incont > * > div').click(arthover).hover(arthover)
$('incont > * > div').hover(function(){$('#side').css("z-index","0")
}).mouseout(function() {$('#side').css("z-index","99")})

$(function (){$('.hdrlogo').hover(
        function(){$('#hdr, #bck').addClass("hov")},
        function(){$('#hdr, #bck').removeClass("hov")}
)})

$(".pg.pg1").ready(function(){loadpostelement()})

function loadpostelement(){
    $.get(("/posts/"+(article)+".txt"),function(data){
        var postmt = data.split("<meta>");
        let date = new Date(postmt[1]),
            day1 = date.toLocaleString('en-us',{weekday:'long'}),
            day2 = date.toLocaleString('en-us',{day:'numeric'}),
            mnth = date.toLocaleString('en-us',{month:'short'}),
            year = date.toLocaleString('en-us',{year:'numeric'});

        var day = 1000 * 60 * 60 * 24, ord = ["st","nd","rd"], expt = [11,12,13],
            t = "Posted ", daycheck = "", newpost = "", pmam = "",
            post =  postmt[1].split("T"), hours = post[1].split(":"),
            diff = Math.floor(new Date().getTime() - date.getTime()),
            days = Math.floor(diff/day), week = Math.floor(days/7),
            mnths = Math.floor(days/31), yrs = Math.floor(mnths/12),
            nth = ord[(day2 % 10) - 1] == undefined || expt.includes(day2 % 100) ? "th" : ord[(day2 % 10) - 1]

        if(days>=14){daycheck+=day1+", "}else{mnth=date.toLocaleString('en-us',{month:'long'})
            if(hours[0]>12){hours[0]=hours[0]- 12;pmam="pm";}else{pmam="am";}}
        if(days<=7){newpost = '<div class="new-post"></div>';}

        if(mnths<3){if(days<7){if(days==0){t+="earlier today at ";}else{t+="on "+day1+" at ";}t+=hours[0]+":"+hours[1]+pmam;}
        else{if(week==1){t+="last week on "+day1+" the "+day2+nth;}else if(day>7&&day<14){t+="on "+day1+" last week at ";}else{t+=week+" weeks";}}}
        else if(yrs<1){t+=mnths+" months";}else{if(yrs==1){t+="a";}else{t+=yrs;}t+=" year s";}if(days>13){t+=" ago";}

        $('<article id=article'+article+'>'+
            '<div class="when">'+ newpost +
                '<a class="dateposted">'+daycheck+mnth+" "+day2+nth+" "+year+'</a><br>'+
                '<a class="timestamp">'+t+'</a>'+
            '</div>'+
            postmt[2] +
            '<div class="when footer">'+
                '<a class="vimage"></a>'+
                '<div class="imcon">posted by<br>'+
                    '<a class="postedby">vanherst</a>'+
                '</div>' +
            '</div>' +
        '</article>').appendTo("#posts")
    })
    .done(function() {
        article = article - 1;
        loadpostelement();
    })
}

var frt = ["jpg","png","gif"];

var buttontext = ["Art Feed","Blog","Artwork","Design","Animation","Workshop","Javascript"],
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
                    'background-image':"url('/Website assets/imgs/"+sides[t]+i+"."+frt[ap2[i- 1]]+"')"});}}

    for(var i=0;i<=pg3h.length;i++){
        $('#dp'+i).addClass('zoom img')
            .css({'height':pg3h[i]+"px",
                'background-image':"url('/Website assets/imgs/d"+i+"."+frt[ap3[i]]+"')"})
            .parent().css({'height':pgdh[i]+"px"})};})

window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);
    t._e = [];
    t.ready = function(f) {t._e.push(f)};
    return t;
}(document, "script", "twitter-wjs"));