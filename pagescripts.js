
function fadeto(){$('#hdr').css({opacity:0.6})}
function fadeno(){$('#hdr').css({opacity:1})}

$(".pg.pg1").ready(function(){
    $('.pg1 .loadmore').css('display','block');
    loadpostelement()})

let postamount=16, currentpc=postamount + 1, article=currentpc;

function loadpostelement(){
    for (var i=0;i<4;i++){
        setTimeout(function(){

            currentpc = currentpc - 1;

            var data = $.get(("/posts/"+(currentpc)+".txt"),function(data){

                var postd = data.split("<meta>"), post =  postd[1].split("T"),
                    hours = post[1].split(":"), pmam, postdays, daycheck;

                const date = new Date(postd[1]),
                    day1 = date.toLocaleString('en-us',{weekday:'long'}),
                    day2 = date.toLocaleString('en-us',{day:'numeric'}),
                    mnth = date.toLocaleString('en-us',{month:'short'}),
                    year = date.toLocaleString('en-us',{year:'numeric'});

                var diff = Math.floor(new Date().getTime() - date.getTime()), day = 1000 * 60 * 60 * 24,
                    days = Math.floor(diff/day), mnths = Math.floor(days/31), yrs = Math.floor(mnths/12);

                if(days => 7){daycheck = daycheck=day1+", "}
                if(hours[0] > 12){ hours[0] = hours[0] - 12; pmam = "pm"} else {"am"}

                function getOrdinal(n) {
                    let ord = ["st","nd","rd"], expt = [11,12,13],
                        nth = ord[(n % 10) - 1] == undefined || expt.includes(n % 100) ? "th" : ord[(n % 10) - 1]
                    return n + nth}

                var plur, t="Posted ";
                if(days > 1 && mnths < 1 || mnths > 1 && yrs < 1 || yrs>1){ plur = "s" }

                if(mnths<1){
                    if(days<7){if(days==7){t+="earlier today at "}else{t+="on "+day1+" at "}t+=hours[0]+":"+hours[1]+pmam}
                    else{if(days>14){t+="a few"}else{t=t+"over a"}t+=" week"+plur}}
                else if(mnths>0){if(mnths==1){if(days>45){t+=" over"};t+=" a month"}else{t+=mnths+" month"+plur}}
                else {if(yrs==1){t+="a year"}else{t+=yrs+" year"+plur}}
                if (days>7){t+=" ago"}

                article = article - 1; //this genuinelly needs a seperate variable looping in the for loop, because "lol"
                $('<article id='+article+'>'+
                    '<div class="when">'+
                    '<a class="dateposted">'+daycheck+mnth+" "+getOrdinal(day2)+" "+year+'</a>'+
                    '<a class="timestamp">'+t+'</a>'+
                    '</div>'+
                    postd[2] +
                    '<div class="when footer">'+
                    '<a class="vimage"></a>'+
                    '<div class="imcon">posted by<br>'+
                    '<a class="postedby">vanherst</a>'+
                    '</div>' +
                    '</div>' +
                    '</article>').appendTo("#posts")
            });
        },5) //makes sure everything loads in the correct order
    }
    if(currentpc == 1){$('#postcont .loadmore').hide()}
}

var pg2l=[1,1,1,1,2,1,1,1],pg2m=[1,1,1,1,1,1,1,1],pg2r=[1,1,1,1,1,1,1,2],sid2a=[pg2l,pg2m,pg2r], //image format : frt[]
    pg2hl=[9,5,5,0,5,8,7,7],pg2hm=[8.5,8,8,8,3,4,5,8],pg2hr=[9,7,5,7,5,5,9,4],sid2h=[pg2hl,pg2hm,pg2hr]; //image hights
var frt=["jpg","png","gif"],sides = ["l","m","r"]; //for different file types, then loops through which coloumn is currently being looped

var pgdh=[460,460,460,475,475,234,610,610,610,610,610,610,234,475,475,450,450,234,234,595,595,595,153,206,450]
var pg3h=[355,355,355,425,425,184,560,560,560,560,772,560,184,425,425,400,400,184,184,460,460,460,153,156,400]//image hights
var ap3=[0,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1]

$(document).ready(function(){
    for(var t=0;t<3;t++) { //toggles between sides, because it's easier to read and bugfix
        var ap2=sid2a[t],ah2=sid2h[t]; //flips between which array is currently active
        for (var i=1;i<=pg2l.length;i++) {
            $('#'+sides[t]+'s'+i).addClass('zoom img')
                .css({'height':(ah2[i- 1]*100)+"px",
                    'background-image':"url('"+git+"imgs/"+sides[t]+i+"."+frt[ap2[i- 1]]+"')"});}}

    for(var i=0;i<=pg3h.length;i++){
        $('#dp'+i).addClass('zoom img')
            .css({'height':pg3h[i]+"px",
                'background-image':"url('/Website assets/imgs/d"+i+"."+frt[ap3[i]]+"')"})
            .parent().css({'height':pgdh[i]+"px"})}
})