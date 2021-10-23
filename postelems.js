
function timeget(data) {
    let date = new Date(data);
    var ord = ["st","nd","rd"], expt = [11,12,13];

    var days = Math.floor((new Date().getTime() - new Date(date).getTime())/(1000 * 60 * 60 * 24)),
        weeks = Math.floor(days/7),
        yrs = Math.floor(new Date().getFullYear() - date.getFullYear()),
        mnths = Math.floor(new Date().getMonth() - date.getMonth()),
        diff = Math.floor(new Date().getTime() - date.getTime());

    var year = date.toLocaleString('en-us', {year: 'numeric'}),
        monthlong = date.toLocaleString('en-us',{month:'long'}),
        monthshort = date.toLocaleString('en-us',{month:'short'}),
        dayshort = date.toLocaleString('en-us', {day: 'numeric'}),
        daylong = date.toLocaleString('en-us', {weekday: 'long'}),
        nth = ord[(dayshort % 10) - 1] == undefined || expt.includes(dayshort % 100) ? "th" : ord[(dayshort % 10) - 1],
        temp = date.toString().split(/[t: ]+/),
        hours = temp[4], mins = temp[5];

    if (mnths < 0) {
        yrs--;
        mnths = mnths + 12}

    return { yrs, mnths, weeks, days, diff, //relative data
        year, monthlong, monthshort, daylong, dayshort, nth, hours, mins}} //absolute data

function postedwhen(data) {
    let wn=timeget(data);
    var pm=" ",t="Posted ";

    if(wn.hours>12){
        wn.hours=wn.hours- 12; pm="pm"}
    else{
        pm="am"}

    if(wn.days<14){
        if(wn.days===0){
            t+="earlier today"}
        else if(wn.days<14&&wn.days!==7){
            t+="on"}
        if(wn.days>0&&wn.days!==7){
            t+=" "+wn.daylong+" "}
        if(wn.days>7){
            t+="last week"}
        if(wn.weeks!==1){
            t+=" at "+wn.hours+":"+wn.mins+pm}
        else if(wn.days<7){
            t+=" the "+wn.dayshort+wn.nth}}
    else if(wn.mnths<3&&wn.days>13 && wn.yrs<1){
        t+=wn.weeks+" weeks"}
    else if(wn.yrs<1){
        t+=wn.mnths+" months"}
    else{
        t+=wn.yrs+" year";
        if(wn.yrs>1){
            t+="s"}
        t+=", "+wn.mnths+" months"}
    if(wn.days>13){
        t+=" ago"}
    return '<a class="timestamp">'+t+'</a>'}

function dateposted(data) {
    let when = timeget(data), dc;
    if(Math.floor(when.diff/when.days)<14){
        dc = when.monthlong}
    else{
        dc = when.daylong+", "+when.monthshort}

    return '<a class="dateposted">'+dc+" "+when.dayshort+when.nth+" "+when.year+'</a>'}

function when(data) {
    if(Math.floor(Math.floor(new Date().getTime() - new Date(data).getTime())/(1000 * 60 * 60 * 24)) <= 7){
        return '<div class="new-post"></div>'}
    else{
        return ""}}

function escapeRegExp(string){
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");}
function replaceAll(str, term, replacement) {
    return str.replace(new RegExp(escapeRegExp(term), 'g'), replacement)}
//put this in the loadpost elements
//$.get(("https://raw.githubusercontent.com/TheaVanherst/VanH/og-backup/blog/posts/p"+(article)+".txt"), function(data){
//    data = replaceAll(data, '/blog/img/', 'https://raw.githubusercontent.com/TheaVanherst/VanH/og-backup/blog/img/')

//the amount of docs to check through
//this shouldn't be here, but i can't be bothered to come up with a better system
//that doesn't include shoving all of my thoughts into one singular document.
var pt=15
$(".pg.pg1").ready(function(){
    loadpostelement()})

function loadpostelement(){
    if(pt > 0) {
        $.get(("/blog/posts/p" + pt + ".txt"), function (data) {
            var postmt = data.split("<meta>");
            $('<article id=post' + pt + '>' +
                '<div class="when">' +
                when(postmt[1]) +
                dateposted(postmt[1]) + '<br>' +
                postedwhen(postmt[1]) + '</div>' +
                postmt[2] +
                '<div class="when footer">' +
                '<a class="vimage"></a>' +
                '<div class="imcon">posted by<br>' +
                '<a class="postedby">vanherst</a>' +
                '</div>' +
                '</div>' +
                '</article>').appendTo("#posts")
        })
        .done(function () {
            if (pt > 0) {
                pt--;
                loadpostelement()
                PostsHeight = ($('#posts').height() / 100)}
        })
    }
}

var at, pd, cp;
$(".pg.pg0").ready(function(){ //this needs rewriting
    $.get(("/artelements.html"),function(data) {
        pd = data.split("///");
        cp = pd.length;
        artgeneration()
    })
})

//artmt[4]
function artgeneration(){
    if(cp > 0){
        cp--
        if($('#arts0').outerHeight() > $('#arts1').outerHeight()){
            at = "1"}
        else{
            at = "0"}

        var data = pd[cp].split("<>"), pt;

        if (data[3]!==""){
            pt='<a>'+data[3]+'</a>'}
        else{
            pt=" "}

        var afd=
            $('<article id=art'+cp+'>'+
                data[2]+
                '<div class="when">'+
                    pt+dateposted(data[1])+
                '</div></article>')
            $("#arts" + at).append(afd)

        $('#art'+cp).imagesLoaded( function() {
            artgeneration()})
    }
}

