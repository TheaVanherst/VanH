
// 888888 88 8b    d8 888888      dP""b8    db    88      dP""b8 .dP"Y8
//   88   88 88b  d88 88__       dP   `"   dPYb   88     dP   `" `Ybo."
//   88   88 88YbdP88 88""       Yb       dP__Yb  88  .o Yb      o.`Y8b
//   88   88 88 YY 88 888888      YboodP dP""""Yb 88ood8  YboodP 8bodP'

function timeget(data) {
    let date = new Date(data); //uses data to get date and store to a var
    var ord = ["st","nd","rd"], expt = [11,12,13]; //preset vars for numbered date

    // preset calculations for the dates based on data input
    // everything is floored to round it down to the closest full date
    // all this is just numerical multipliers so I can pull them JUST IN-CASE I need them
    var days = Math.floor((new Date().getTime() - new Date(date).getTime())/(1000 * 60 * 60 * 24)),
        weeks = Math.floor(days/7),
        yrs = Math.floor(new Date().getFullYear() - date.getFullYear()),
        mnths = Math.floor(new Date().getMonth() - date.getMonth()),
        diff = Math.floor(new Date().getTime() - date.getTime());

    //turns data var into a date string
    var year = date.toLocaleString('en-us', {year: 'numeric'}),
        monthlong = date.toLocaleString('en-us',{month:'long'}),
        monthshort = date.toLocaleString('en-us',{month:'short'}),
        dayshort = date.toLocaleString('en-us', {day: 'numeric'}),
        daylong = date.toLocaleString('en-us', {weekday: 'long'});

    // figures out if First, Third of Third should be added to the date.
    var nth = ord[(dayshort % 10) - 1] == undefined || expt.includes(dayshort % 100) ? "th" : ord[(dayshort % 10) - 1],
        temp = date.toString().split(/[t: ]+/), //grabs hour / minutes from date string
        hours = temp[4], mins = temp[5]; //stores it as easy to access output vars.

    if (mnths < 0 && yrs === 1) { //if the post is exactly one year old
        yrs--; //removes a year and replaces it with 12 months
        mnths = mnths + 12} //this just makes it seem like less time because lol cohesion

    return { yrs, mnths, weeks, days, diff, //relative data
        year, monthlong, monthshort, daylong, dayshort, nth, hours, mins}} //absolute data

function postedwhen(data) {
    let wn = timeget(data), t = "Posted "; //easy to access grab var + starting string var
    //turns hours into a 12 hour based clock, instead of 24.
    let pm = wn.hours > 12 ? "pm" : "am" //checks if time is past 12pm
    wn.hours = wn.hours > 12 ? wn.hours - 12 : wn.hours;

    if(wn.days < 14){
        t += wn.days === 0 ? "earlier today" : wn.days < 14 && wn.days !== 7 ? "on" : "";
        t += wn.days > 0 && wn.days !== 7 ? " " + wn.daylong : "";
        t += wn.days > 6 ? " last week" : "";
        t += wn.weeks < 8 ? " at " + wn.hours + ":" + wn.mins + pm : wn.days < 7 ? " the " + wn.dayshort + wn.nth : ""}
    else if(wn.mnths < 3 && wn.days > 13 && wn.yrs < 1){
        t += wn.weeks + " weeks"}
    else if(wn.yrs < 1){ //under 1 year, but more than 3 months.
        t += wn.mnths + " months"}
    else{ //if more than 1 year
        t += wn.yrs + " year";
        t += wn.yrs > 1 ? "s" : "";
        t += wn.mnths > 0 ? ", " + wn.mnths + " months" : ""}
    t += wn.days > 13 ? " ago" : ""
    return '<a class="timestamp">' + t + '</a>'}

function dateposted(data) {
    let when = timeget(data), dc; //fall back var array
    dc = Math.floor(when.diff / when.days) < 14 ? when.monthlong : when.daylong+", "+when.monthshort
    //checks if the post is under 2 weeks and returns the month as a ong month, otherwise keeps it to 4 letters.
    return '<a class="dateposted">'+dc+" "+when.dayshort+when.nth+" "+when.year+'</a>'} //return string

function when(data) {
    if(Math.floor(Math.floor(new Date().getTime() - new Date(data).getTime())/(1000 * 60 * 60 * 24)) <= 7){
        //calculates if time is under two weeks
        return '<div class="new-post"></div>'} //shows "NEW POST"
    else{return ""}} //filler to prevent NaN

// 888888 88   88 8b    d8 88""Yb 88     88""Yb      dP""b8  dP"Yb  8888b.  888888
//   88   88   88 88b  d88 88__dP 88     88__dP     dP   `" dP   Yb  8I  Yb 88__
//   88   Y8   8P 88YbdP88 88""Yb 88  .o 88"Yb      Yb      Yb   dP  8I  dY 88""
//   88   `YbodP' 88 YY 88 88oodP 88ood8 88  Yb      YboodP  YbodP  8888Y"  888888

//some quick preset functions to replace urls on tumblr's backend
function escapeRegExp(string){
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");}
function replaceAll(str, term, replacement) {
    return str.replace(new RegExp(escapeRegExp(term), 'g'), replacement)}

//    db    .dP"Y8 .dP"Y8 888888 888888      dP""b8 888888 88b 88
//   dPYb   `Ybo." `Ybo." 88__     88       dP   `" 88__   88Yb88
//  dP__Yb  o.`Y8b o.`Y8b 88""     88       Yb  "88 88""   88 Y88
// dP""""Yb 8bodP' 8bodP' 888888   88        YboodP 888888 88  Y8

//vars that determine loading loops

// 88""Yb 88      dP"Yb   dP""b8     88""Yb  dP"Yb  .dP"Y8 888888 .dP"Y8      dP""b8 888888 88b 88
// 88__dP 88     dP   Yb dP   `"     88__dP dP   Yb `Ybo."   88   `Ybo."     dP   `" 88__   88Yb88
// 88""Yb 88  .o Yb   dP Yb  "88     88"""  Yb   dP o.`Y8b   88   o.`Y8b     Yb  "88 88""   88 Y88
// 88oodP 88ood8  YbodP   YboodP     88      YbodP  8bodP'   88   8bodP'      YboodP 888888 88  Y8

//the amount of docs to check through
//this shouldn't be here, but i can't be bothered to come up with a better system
//that doesn't include shoving all of my thoughts into one singular document.
let currentBlogPost = 18;//this is temporary I promise.

$("pg.pg1").ready(function(){
    loadpostelement()})

function loadpostelement(){
    //$.get(("https://raw.githubusercontent.com/TheaVanherst/VanH/og-backup/blog/posts/p"+(article)+".txt"), function(data){
    $.get(("/blog/posts/p" + currentBlogPost + ".txt"), function (data) {
        //data = replaceAll(data, '/blog/img/', 'https://raw.githubusercontent.com/TheaVanherst/VanH/og-backup/blog/img/')
        var postMeta = data.split("<meta>"); //splits data
        currentBlogPost--;

        $('<article id=post' + currentBlogPost + '>' +
            '<div class="when">' +
            when(postMeta[1]) + //displays "NEW" if the post is under 2 weeks old.
            dateposted(postMeta[1]) + '<br>' + //states day / month / date / year
            postedwhen(postMeta[1]) + '</div>' + //posted (time ago)
            postMeta[2] + //post data
            '<div class="when footer">' + //footer of posts
                '<a class="vimage"></a>' +
                '<div class="imcon">posted by<br>' + //posted by + pfp icon
                    '<a class="postedby">vanherst</a>' + //this is just filler (just in case)
                '</div>' +
            '</div>' +
        '</article>').appendTo("#posts") //attaches to section child container to prevent overflow

        .imagesLoaded( function() { //checks to see if images are loaded in newly generated post
            if (pageHeights[1] < pageDataHeight) { //checks to see if anymore posts need to be loaded
                loadpostelement()} //loads first few posts until feed is full.
            else if (pageLoadin[1] > 0) { //check run loop to if more should be generated from wheel scroll
                pageLoadin[1]-- //remove one from run loop value
                loadpostelement()} //repeat blog gen process.
            pageHeights[1] = $('.postcont').height()
        }) //updates scroll height possible inside 'section
    })
}

//    db    88""Yb 888888     88""Yb  dP"Yb  .dP"Y8 888888 .dP"Y8      dP""b8 888888 88b 88
//   dPYb   88__dP   88       88__dP dP   Yb `Ybo."   88   `Ybo."     dP   `" 88__   88Yb88
//  dP__Yb  88"Yb    88       88"""  Yb   dP o.`Y8b   88   o.`Y8b     Yb  "88 88""   88 Y88
// dP""""Yb 88  Yb   88       88      YbodP  8bodP'   88   8bodP'      YboodP 888888 88  Y8

let artLatch, postArtData, currentArtPost;

$("pg.pg0").ready(function(){ //this needs rewriting
    //$.get(("https://raw.githubusercontent.com/TheaVanherst/VanH/og-backup/artelements.html"), function(data){
    $.get(("/artelements.html"),function(data) {
        //data = replaceAll(data, '/arts/', 'https://raw.githubusercontent.com/TheaVanherst/VanH/og-backup/arts/')
        postArtData = data.split("///"); //splits the art post data
        currentArtPost = postArtData.length; //sets the amount of posts that are able to load based on split length

        artGeneration() //runs a self contained art element loader
    })
})

let artDone = false; //the amount of elements that will load in at a time

function artGeneration(){
    if(currentArtPost > 0) {
        currentArtPost-- //removes 1 from the amount of posts that have yet to be loaded.

        artLatch = ($('#arts0').outerHeight() > $('#arts1').outerHeight())
        var data = postArtData[currentArtPost].split("<>"),artPostedWhen; //grabs the post data, stores data for when the art was posted from data var
        artPostedWhen = (data[3] !== undefined ? '<a>' + data[3] + '</a>' : "")  //if contains post meta (eg. Uni proj / warnings) add data


        $("#arts" + (artLatch ? 1 : 0)).append(
            $('<article id=art' + currentArtPost + '>' + //creates post container /w ID
                data[2] + //image data
                '<div class="when">' + //post date container
                    artPostedWhen + dateposted(data[1]) + //date data
                '</div>' +
            '</article>') //container closers
        ).imagesLoaded(function () { //when images loaded in assigned append container
            pageHeights[0] = Math.max($('#arts0').height(), $('#arts1').height()) //check the max height of art containers

            if (pageLoadin[0] > 0) { //check run loop to if more should be generated from wheel scroll
                pageLoadin[0]-- //remove one from run loop value
                artGeneration()} //repeat art gen process.
            else if (pageHeights[0] < pageDataHeight) { //only gets checked on page start-up
                artGeneration()}
        })
    } else {
        if(artDone === false){
            $("#arts" + (artLatch ? 1 : 0)).append(
                $('<div class="load-more"><p></p></div>'))
            pageHeights[0] = Math.max($('#arts0').height(), $('#arts1').height())
            artDone = true}
    }
}