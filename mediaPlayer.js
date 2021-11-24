
// Load the IFrame Player API code asynchronously.
var player, tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 88      dP"Yb   dP""b8    db    88         .dP"Y8 888888  dP"Yb  88""Yb    db     dP""b8 888888
// 88     dP   Yb dP   `"   dPYb   88         `Ybo."   88   dP   Yb 88__dP   dPYb   dP   `" 88__
// 88  .o Yb   dP Yb       dP__Yb  88  .o     o.`Y8b   88   Yb   dP 88"Yb   dP__Yb  Yb  "88 88""
// 88ood8  YbodP   YboodP dP""""Yb 88ood8     8bodP'   88    YbodP  88  Yb dP""""Yb  YboodP 888888

//Video request, playlist request.
var vReq = 0, pReq = 0, playlist //these are default values on page load.

//University Visual Demonstrations (Recommended Videos)
var featuredV = ['g-r2hkJq3t4','DgVuIjRZXsc'],
    featuredD = ['19/28/08','19/28/31'],
    featuredT = ['HURT','RAGGA BOMB']
//Vanh Development livestream Data
var vanhDevV = [ 'Bi6Oft2iBek','1FIeHqepct8',undefined, 'HIio_8tnRwc','Jae4D8H8WMg','GfylpGPl0UI','TP24PCLYreI','zjH06PvGXGc','kCNhXqcmmMA'],
    vanhDevD = [  '21/08/04',   '21/08/04',   undefined, '21/10/26',   '21/10/27',   '21/10/28',   '21/10/29',   '21/10/30',   '21/10/31']
    vanhDevT = ['VanH.art LIVE Dev']
//'Weekly' Art Data
var weeklyArtV = ['BRgwoi7vXg8','wBl3ObDfXkY',undefined,'hgAzZzXbb1I','ENPItGEQxkY','EREAdQ0kcSo','EEJkiSn6RIc','wqzwcLlfkHA','1fk6gUpcgd8'],
    weeklyArtD = ['17/09/11',    '16/05/10',   undefined,'16/08/03',   '17/06/28',   '16/05/31',   '16/06/07',   '17/11/01',   '16/12/19'],
    weeklyArtT = ['Hymn Of The Haunted Hunter','Gratitude',undefined,'Room For Two','HER','ゴミの女の子','Drive','Rainy Witch Season','BEINGS']
//'Weekly' Art Livestream Data
var artMakingV = ['Cl0D2qGdyHk','qmq5UGhA6gE'],
    artMakingD = ['16/08/03','17/09/05',],
    artMakingT = ["'Room For Two' LIVE","'Hymn Of The Haunted Hunter' LIVE"]
//CSGO Edits / Complications Data
var CSGOFunnyV = [ 'HJrzOIXB2lQ','TeDbScQhQjU',undefined, 'd7eRx6T0mdc','D7c_-FftVx0','VR-fCwZxZmk'],
    CSGOFunnyD = [  '20/09/18',   '20/06/15',  undefined,  '19/07/21',   '18/10/26',   '28/05/19'];
    CSGOFunnyT = ['Neon Genesis Evanjollion: Pt1', 'The Battle of Britons', undefined, 'Vore, where?', 'Headshot Only', '48:9']
//Vial Of Me Development data
var vialOfMeV = ['OwzW0S1F3qM','LiOqOQnlZo4','t5XUJjOmg2w'],
    vialOfMeD = ['18/12/31','19/01/02','19/01/03'],
    vialOfMeT = ["'Vial Of Me.js' LIVE Dev"]
//Win98 Development Data
var vher98V = ['bEi4JDBhR00','0zCDsGoG1ic',undefined,'iZDxjJ8kgDk','D1GE6f-R48s','m8DMSVHuA-I','XJHTFOAQscs','gMGQ7YbarKw','ZyQCHDCcdWQ'],
    vher98D = ['21/02/25',   '21/02/25',   undefined,'21/02/25',   '21/02/25',   '21/02/25',   '21/02/17',   '21/02/17',   '21/02/17'],
    vher98T = ["'Vher98' LIVE Dev"]
//Coffee At The Beach Data
var coffeeV = ['Z8xZHxbaf-s','HsgFExnC2MI',undefined,'R6scL1l2Xso','yuQAo2TLY6g','QshmGX41ZeU'],
    coffeeD = ['19/02/11',   '19/02/05',   undefined,'19/01/30',   '19/01/29',   '19/01/28'],
    coffeeT = ["'Beach Time Coffee' LIVE"]
//Caddy Art Livestream Data
var caddyV = ['Scmtgrx-LCE','Y3-7B1ZBf4Q','VloKVodY8ak'],
    caddyD = ['19/05/12','19/05/09','19/05/07'],
    caddyT = ["'Zero Suit Caddy' LIVE"]
//Coffee Concept Art Data
var coffeeOGV = ['a27XjoPcQHg','MWwmEH2P2WU','L_ruyRpwzqw'],
    coffeeOGD = ['18/04/23','18/04/21','18/04/21'],
    coffeeOGT = ["'Coffee' Concept LIVE"]

//video playlist collections + accompanying data
var titleCards = ["Featured Videos","'Weekly' Timelapses","'Weekly' Timelapses LIVE","CSGO: Funny moments",vanhDevT[0]+"elopment",
                  vher98T[0]+"elopment",vialOfMeT[0]+"elopment",caddyT[0],coffeeT[0],coffeeOGT[0]]
//Video Array Storage for future references
var reqVideos = [featuredV, weeklyArtV, artMakingV, CSGOFunnyV, vanhDevV, vher98V, vialOfMeV, caddyV, coffeeV, coffeeOGV],
    reqDates =  [featuredD, weeklyArtD, artMakingD, CSGOFunnyD, vanhDevD, vher98D, vialOfMeD, caddyD, coffeeD, coffeeOGD],
    reqTitles = [featuredT, weeklyArtT, artMakingT, CSGOFunnyT, vanhDevT, vher98T, vialOfMeT, caddyT, coffeeT, coffeeOGT];

// 88 888888 88""Yb    db    8b    d8 888888     888888 88   88 88b 88  dP""b8 888888 88  dP"Yb  88b 88    db    88     88 888888 Yb  dP
// 88 88__   88__dP   dPYb   88b  d88 88__       88__   88   88 88Yb88 dP   `"   88   88 dP   Yb 88Yb88   dPYb   88     88   88    YbdP
// 88 88""   88"Yb   dP__Yb  88YbdP88 88""       88""   Y8   8P 88 Y88 Yb        88   88 Yb   dP 88 Y88  dP__Yb  88  .o 88   88     8P
// 88 88     88  Yb dP""""Yb 88 YY 88 888888     88     `YbodP' 88  Y8  YboodP   88   88  YbodP  88  Y8 dP""""Yb 88ood8 88   88    dP

function onYouTubePlayerAPIReady() {
    let data = videoGrab(pReq,vReq)

    player = new YT.Player('ytPlayer', {
        videoId: data.v})
    $('#uploadDate').html( //This prints out the current active video
        data.d + "<br><t>" + data.t + "</t>")

    let temp = "";
    for(let e = 0; e < reqVideos.length; e++) {
        if(e!==0){
            temp += '<div>' +
                '<e style="width: calc(100% - 120px - var(--gutter) + var(--halfSkirting))">' + titleCards[e] + '</e><f' //makes room for the 'SELECT ALL'
            if(titleCards[e].includes("LIVE")){
                temp += ' style="background-color:var(--accent3)"'}
            temp += ' onclick="playlist = reqVideos[' + e + ']; loadplaylist()"> Select All </f>'}

        else {
            temp += "<div>" +
                "<e class='rs'>" + titleCards[e] + "</e>"}

        for(let i = 0; i < reqVideos[e].length; i++) {
            let data = videoGrab(e, i)
            const videoURL = "https://i.ytimg.com/vi/" + data.v + "/hqdefault.jpg";

            if (i % 3 === 0) {
                if (i !== 0) {
                    temp += "</row>"}
                temp += "<row>"}

            temp +=
                '<div onclick="pReq =' + e + '; vReq =' + i + '; loadVideo()">' +
                    '<div class="thumbnails'

            if (reqVideos[e].length === 1) { //checks if the playlist is 1 video long
                temp += ' lar'} //adjusts the playlist to take up the page width
            else if (reqVideos[e].length === 3 || reqVideos[e].length === 7) { //checks if the playlist is 3 / 6 videos long
                temp += ' def'} //this changes the width back to default because it saves me some shit css

            temp += '">' +
                '<img src="' + videoURL + '"/></div>' +
                    '<tcb'

            if (reqVideos[e].length === 1) { //checks if the playlist is 1 video long
                temp += ' class="lar"'} //adjusts the playlist to take up the page width
            else if (reqVideos[e].length === 3 || reqVideos[e].length === 7) { //checks if the playlist is 3 / 6 videos long
                temp += ' class="def"'}

            temp += '><p>' + data.d + '<br>' +
                '<t>' + data.t + '</t></p></tcb> </div>'
        }

        temp = temp + "</div>"}
    $('#videoSelection').append(temp)}

// Yb    dP 88 8888b.  888888  dP"Yb      88      dP"Yb     db    8888b.  88 88b 88  dP""b8
//  Yb  dP  88  8I  Yb 88__   dP   Yb     88     dP   Yb   dPYb    8I  Yb 88 88Yb88 dP   `"
//   YbdP   88  8I  dY 88""   Yb   dP     88  .o Yb   dP  dP__Yb   8I  dY 88 88 Y88 Yb  "88
//    YP    88 8888Y"  888888  YbodP      88ood8  YbodP  dP""""Yb 8888Y"  88 88  Y8  YboodP

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
    $('pagedata').animate({"top": 0})}

var localUrl
function extVideo(){ //this function gets called from art element posts.
    var titleSearch = undefined, dateSearch = undefined, searchLoop = undefined

    for(var e = 0; e < reqVideos.length; e++) { //loops through URL arrays
        searchLoop = reqVideos[e] //stores current url array into var

        if(searchLoop.includes(localUrl)){ //if url is identical to stored video on site
            titleSearch = reqTitles[e] //store the title arr
            dateSearch = reqDates[e]

            var id = searchLoop.indexOf(localUrl); //grabs index number of the url in the array
            console.log("Using Local URL Data [" + e + ":" + id + "]")

            $('#uploadDate').html( //This prints out the current active video
                dateSearch[id] + "<br><t>" + titleSearch[id] + "</t>")
            extLoad(); return false}

        console.log("Searching...")}

    if(dateSearch === undefined) { // if a url isn't found,
        console.log("loading on fetched url")
        $('#uploadDate').html( //print placement title + date.
            "Vanh.art<br><t>Playing Undefined Local Content</t>")
    }
    extLoad()
}

function extLoad() {
    player.loadVideoById({'videoId': localUrl,'startSeconds': 0}); //load video based on fetched url.

    setTimeout(function(){ //timeout delay to give iframe some time to load properly.
        $('.ls.pg4 t').click(); //this is just a jank way to change pages, but saves tons of time.
        pageScrollY[currentPage] = 0; // resets the vertical page placement on page change.
    },250)
}

// .dP"Y8 888888    db    88""Yb  dP""b8 88  88     888888 88   88 88b 88  dP""b8 888888 88  dP"Yb  88b 88 .dP"Y8
// `Ybo." 88__     dPYb   88__dP dP   `" 88  88     88__   88   88 88Yb88 dP   `"   88   88 dP   Yb 88Yb88 `Ybo."
// o.`Y8b 88""    dP__Yb  88"Yb  Yb      888888     88""   Y8   8P 88 Y88 Yb        88   88 Yb   dP 88 Y88 o.`Y8b
// 8bodP' 888888 dP""""Yb 88  Yb  YboodP 88  88     88     `YbodP' 88  Y8  YboodP   88   88  YbodP  88  Y8 8bodP'

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