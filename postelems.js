
var day = 1000 * 60 * 60 * 24, ord = ["st","nd","rd"], expt = [11,12,13];

let postamount=15, post=postamount, artamount=1, art=artamount;
$(".pg.pg1").ready(function(){loadpostelement(); loadartelement()})

function postedwhen(data) {

    var postdata = data.split("<meta>"), date = new Date(postdata[1]);
    var days = Math.floor(Math.floor(new Date().getTime() - new Date(postdata[1]).getTime())/day),
        week = Math.floor(days/7), mnths = Math.floor(days/31), yrs = Math.floor(mnths/12);
    var day1 = date.toLocaleString('en-us', {weekday: 'long'}),
        day2 = date.toLocaleString('en-us', {day: 'numeric'}),
        nth = ord[(day2 % 10) - 1] == undefined || expt.includes(day2 % 100) ? "th" : ord[(day2 % 10) - 1]
    var post =  postdata[1].split("T"), hours = post[1].split(":"), pmam = "", t = "Posted ";

    if(hours[0]>12){hours[0]=hours[0]- 12;pmam="pm";}else{pmam="am"}
    if(days < 14) {
        if (days === 0) { t += "earlier today"
        } else if (days < 14 && days !== 7) { t += "on" }
        if (days > 0 && days !== 7) { t += " " + day1 + " "}
        if (days > 7) {t += "last week"}
        if (week !== 1) {t += " at " + post[1] + pmam
        } else if (days < 7) {t += " the " + day2 + nth}
    } else if (mnths < 3 && days > 13) {t += week + " weeks"
    } else if (yrs < 1){t += mnths + " months"
    } else {t+=yrs+" year"; if(yrs > 1){t+="s"}
        t+= ", " + (mnths - (parseInt(mnths / 10, 12) * 10)) + " months"}
    if(days > 13){t += " ago"}
    return '<a class="timestamp">' + t + '</a>';
}

function dateposted(data) {
    var postdata = data.split("<meta>"), date = new Date(postdata[1]),
        diff = Math.floor(new Date().getTime() - date.getTime()), daycheck,
        day2 = date.toLocaleString('en-us', {day: 'numeric'}),
        year = date.toLocaleString('en-us', {year: 'numeric'}),
        nth = ord[(day2 % 10) - 1] == undefined || expt.includes(day2 % 100) ? "th" : ord[(day2 % 10) - 1]

    if(Math.floor(diff/day)<14){ daycheck = date.toLocaleString('en-us',{month:'long'})
    }else{daycheck = date.toLocaleString('en-us',{weekday:'long'})+", "+date.toLocaleString('en-us',{month:'short'})}

    return '<a class="dateposted">'+daycheck+" "+day2+nth+" "+year+'</a><br>'
}

function when(data) {
    var postdata = data.split("<meta>"), date = new Date(postdata[1]), newpost = "";
    if(Math.floor(Math.floor(new Date().getTime() - date.getTime())/(1000 * 60 * 60 * 24)) <= 7){
        newpost = '<div class="new-post"></div>'}
    return newpost
}

//function escapeRegExp(string){return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");}
//function replaceAll(str, term, replacement) {return str.replace(new RegExp(escapeRegExp(term), 'g'), replacement)}

//put this in the loadpost elements
//data = replaceAll(data, '/posts/img/', 'https://raw.githubusercontent.com/TheaVanherst/VanH/og-backup/posts/img/')

function loadpostelement(){
    $.get(("/posts/p"+post+".txt"),function(data){
        var postmt = data.split("<meta>");
        $('<article id=post'+post+'>'+
            '<div class="when">'+
                when(data) +
                dateposted(data) +
                postedwhen(data) + '</div>'+
            postmt[2] +
            '<div class="when footer">'+
                '<a class="vimage"></a>'+
                    '<div class="imcon">posted by<br>'+
                    '<a class="postedby">vanherst</a>'+
                '</div>' +
            '</div>' +
        '</article>').appendTo("#posts")
    })
    .done(function() {post--;
        if(post>0){loadpostelement()}})
}

function loadartelement(){
    $.get(("/posts/a"+art+".txt"),function(data){
        var artmt = data.split("<meta>");
        $('<article id=art'+art+'>'+
            '<div class="when">'+ when(data) +
                '<a class="dateposted">'+dateposted(data)+'</a><br>'+
                '<a class="timestamp">'+postedwhen(data)+'</a>'+
            '</div>'+ artmt[2] +
            '<div class="when footer">'+
                '<a class="vimage"></a>'+
                '<div class="imcon">posted by<br>'+
                    '<a class="postedby">vanherst</a>'+
                '</div>' +
            '</div>' +
        '</article>').appendTo("#arts")
    })
    .done(function() {art--;
        if(art>0){loadartelement()}
    })
}