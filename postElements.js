
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
            t+=" artSideLatch "+wn.hours+":"+wn.mins+pm}
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
    let when = timeget(data), dc; //fall back var array
    if(Math.floor(when.diff / when.days) < 14){ //checks if the post is under 2 weeks
        dc = when.monthlong} //and returns the month as a ong month
    else {
        dc = when.daylong+", "+when.monthshort} //otherwise keeps it to 4 letters.

    return '<a class="dateposted">'+dc+" "+when.dayshort+when.nth+" "+when.year+'</a>'}

function when(data) {
    if(Math.floor(Math.floor(new Date().getTime() - new Date(data).getTime())/(1000 * 60 * 60 * 24)) <= 7){
        //calculates if time is under two weeks
        return '<div class="new-post"></div>'} //shows "NEW POST"
    else{return ""}} //filler to prevent NaN

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
var currentBlogPost=15 //this is temporary I promise.
$("pg.pg1").ready(function(){
    loadpostelement()})

function loadpostelement(){
    $.get(("/blog/posts/p" + currentBlogPost + ".txt"), function (data) {
        var postMeta = data.split("<meta>"); //splits data
        $('<article id=post' + currentBlogPost + '>' +
            '<div class="when">' +
            when(postMeta[1]) + //displays "NEW" if the post is under 2 weeks old.
            dateposted(postMeta[1]) + '<br>' + //states day / month / date / year
            postedwhen(postMeta[1]) + '</div>' + //posted (time ago)
            postMeta[2] + //post data
            '<div class="when footer">' + //footer of posts
                '<a class="vimage"></a>' +
                '<div class="imcon">posted by<br>' + //posted by + pfp icon
                    '<a class="postedby">vanherst</a>' + //this is just filler (just incase)
                '</div>' +
            '</div>' +
        '</article>').appendTo("#posts") //attatches to section child container to prevent overflow
    })
    .done(function () { // runs when previous post is loaded
        if (currentBlogPost > 0) { //checks to see if anymore posts need to be loaded
            currentBlogPost--; //removes 1 to the numerical list of posts left
            loadpostelement()} //loads next post
    })
    $('#posts').imagesLoaded( function() { //checks to see if images are loaded
        blogPostsHeight = $('.postcont').height()}) //updates scroll height possible inside 'section
}

var artSideLatch, postArtData, currentArtPost;
$("pg.pg0").ready(function(){ //this needs rewriting
    $.get(("/artelements.html"),function(data) {
        postArtData = data.split("///");
        currentArtPost = postArtData.length;
        artgeneration()
    })
})

var afd
function artgeneration(){
    if(currentArtPost > 0){
        currentArtPost--
        if($('#arts0').outerHeight() > $('#arts1').outerHeight()){
            artSideLatch = "1"}
        else{
            artSideLatch = "0"}

        var data = postArtData[currentArtPost].split("<>"), artPostedWhen;

        if (data[3]!==""){
            artPostedWhen='<a>'+data[3]+'</a>'}
        else{
            artPostedWhen=" "}

        afd =
            $('<article id=art'+currentArtPost+'>'+
                data[2]+
                '<div class="when">'+
                    artPostedWhen+dateposted(data[1])+
                '</div></article>')
            $("#arts" + artSideLatch).append(afd)

        $('#art'+currentArtPost).imagesLoaded( function() {
            artsPostsHeight = Math.max($('#arts1').height(), $('#arts2').height())
            artgeneration()})
    }
}

