
// Load the IFrame Player API code asynchronously.
var player, tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//Video request, playlist request.
var vReq = 0, pReq = 0, playlist //these are default values on page load.

//University Visual Demonstrations (Recommended Videos)
var featuredVideos = ['g-r2hkJq3t4','DgVuIjRZXsc'],
    featuredDates = ['19/28/08','19/28/31'],
    featuredTitles = ['HURT','RAGGA BOMB'];

//Vanh Development livestream data
var vanhDevVideos = [ 'Bi6Oft2iBek','1FIeHqepct8','HIio_8tnRwc','Jae4D8H8WMg','GfylpGPl0UI','TP24PCLYreI','zjH06PvGXGc','kCNhXqcmmMA','jHpdM1ssNCA'],
    vanhDevDates = [  '21/08/04',   '21/08/04',   '21/10/26',   '21/10/27',   '21/10/28',   '21/10/29',   '21/10/30',   '21/10/31',   '21/11/01'];
    vanhDevTitle = ['VanH.art Development']

//video playlist collections + accompanying data
var titleCards = ["Featured Videos","Vanh.Art Development"];

var reqVideos = [featuredVideos, vanhDevVideos],
    reqDates = [featuredDates, vanhDevDates],
    reqTitles = [featuredTitles, vanhDevTitle];

function onYouTubePlayerAPIReady() {
    let data = videoGrab(pReq,vReq)

    player = new YT.Player('ytPlayer', {
        videoId: data.v})
    $('#uploadDate').html( //This prints out the current active video
        data.d + "<br><t>" + data.t + "</t>")

    let temp = "";
    for(let e = 0; e < reqVideos.length; e++) {

        if(e!==0){
            temp +=
                "<div>" +
                    "<e style='width:calc(80% - 16px);'>" + titleCards[e] + "</e>" + //makes room for the
                    "<f onclick='playlist = reqVideos[" + e + "]; loadplaylist()'>Select All</f>"}
        else {
            temp +=
                "<div>" +
                    "<e class='rs'>" + titleCards[e] + "</e>"
        }
        for(let i = 0; i < reqVideos[e].length; i++){
            let data = videoGrab(e, i)

            var videoURL = "https://i.ytimg.com/vi/" + data.v + "/hqdefault.jpg";

            if (i%3===0){
                if(i!==0){temp+="</row>"}
                temp+="<row>"
            }

            temp +=
                '<div onclick="pReq =' + e + '; vReq =' + i + '; loadVideo()">' +
                    '<div class="thumbnails"><img src="' + videoURL + '"/></div>' +
                '<tcb><p>' + data.d + '<br>' +
                    '<t>' + data.t + '</t></p></tcb> </div>'
        }
        temp = temp + "</div>"
    }
    $('#videoSelection').append(temp)}

function loadplaylist() { //gets called through the f div element
    for(var i = 0; i < playlist.length; i++){
        player.cuePlaylist({'playlist': playlist,'startSeconds': 0});}

    pageScrollY[currentPage] = 0;
    $('pagedata').animate({"top": pageScrollY[toBeCurrent]})}

function loadVideo() { //load singular video
    let data = videoGrab(pReq,vReq)
    player.loadVideoById({'videoId': data.v,'startSeconds': 0});
    $('#uploadDate').html( //This prints out the current active video
        data.d + "<br><t>" + data.t + "</t>")

    pageScrollY[currentPage] = 0;
    $('pagedata').animate({"top": pageScrollY[toBeCurrent]})}

var localUrl
function extVideo(){ //this function gets called from art element posts.
    player.loadVideoById({'videoId': localUrl,'startSeconds': 0});
    $('#uploadDate').html( //This prints out the current active video
        "Vanh.art <br><t> Playing local content </t>")

    setTimeout(function(){
        $('.ls.pg4 t').click();
        pageScrollY[currentPage] = 0;
    },250)} //this is just a jank way to change pages, but saves tons of time.

//Grabs the video data based on playlist / video from set of playlists.
function videoGrab(cr,vr) {
    var videos = reqVideos[cr],
        dates = reqDates[cr],
        titles = reqTitles[cr];

    var v = videos[vr],
        d = dates[vr],
        t;

    if(titles.length > 1){ //defaults to regular titles
        t = titles[vr]}
    else { //this gets requested if it's a livestream title.
        t = titles[0]}

    return {
        v, d, t }}