
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
const featured = [['g-r2hkJq3t4', 'DgVuIjRZXsc'],['19/28/08', '19/28/31'],['HURT', 'RAGGA BOMB']], //University Visual Demonstrations (Recommended Videos)
    vanhDev = [ //Vanh Development livestream Data
        ['Bi6Oft2iBek', '1FIeHqepct8', undefined, 'HIio_8tnRwc', 'Jae4D8H8WMg', 'GfylpGPl0UI', 'TP24PCLYreI', 'zjH06PvGXGc', 'kCNhXqcmmMA'],
        ['21/08/04', '21/08/04', undefined, '21/10/26', '21/10/27', '21/10/28', '21/10/29', '21/10/30', '21/10/31'], ['VanH.art LIVE Dev']],
    weeklyArt = [ //'Weekly' Art Data
        ['BRgwoi7vXg8', 'wBl3ObDfXkY', undefined, 'hgAzZzXbb1I', 'ENPItGEQxkY', 'EREAdQ0kcSo', 'EEJkiSn6RIc', 'wqzwcLlfkHA', '1fk6gUpcgd8'],
        ['17/09/11', '16/05/10', undefined, '16/08/03', '17/06/28', '16/05/31', '16/06/07', '17/11/01', '16/12/19'],
        ['Hymn Of The Haunted Hunter', 'Gratitude', undefined, 'Room For Two', 'HER', 'ゴミの女の子', 'Drive', 'Rainy Witch Season', 'BEINGS']],
    artMaking = [['Cl0D2qGdyHk','qmq5UGhA6gE'], ['16/08/03','17/09/05',], ["'Room For Two' LIVE","'Hymn Of The Haunted Hunter' LIVE"]], //'Weekly' Art Livestream Data
    CSGOFunny = [ //CSGO Edits / Complications Data
        ['41nkgBQfMWE','HJrzOIXB2lQ',undefined, 'd7eRx6T0mdc','D7c_-FftVx0','VR-fCwZxZmk'],
        ['22/02/15',   '20/09/18',   undefined, '19/07/21',   '18/10/26',   '28/05/19'],
        ['2 Albanians, A Packet of Walkers.','Neon GenesisEvanjollion: Pt1', undefined, 'Vore, where?', 'Headshot Only', '48:9']],
    vialOfMe = [['OwzW0S1F3qM','LiOqOQnlZo4','t5XUJjOmg2w'], ['18/12/31','19/01/02','19/01/03'], ["'Vial Of Me.js' LIVE Dev"]],//Vial Of Me Development data
    vher98 = [ //Win98 Development Data
        ['bEi4JDBhR00','0zCDsGoG1ic',undefined,'iZDxjJ8kgDk','D1GE6f-R48s','m8DMSVHuA-I','XJHTFOAQscs','gMGQ7YbarKw','ZyQCHDCcdWQ'],
        ['21/02/25',   '21/02/25',   undefined,'21/02/25',   '21/02/25',   '21/02/25',   '21/02/17',   '21/02/17',   '21/02/17'], ["'Vher98' LIVE Dev"]],
    coffee = [ //Coffee At The Beach Data
        ['Z8xZHxbaf-s','HsgFExnC2MI',undefined,'R6scL1l2Xso','yuQAo2TLY6g','QshmGX41ZeU'],
        ['19/02/11',   '19/02/05',   undefined,'19/01/30',   '19/01/29',   '19/01/28'],["'Beach Time Coffee' LIVE"]],
    caddy = [['Scmtgrx-LCE','Y3-7B1ZBf4Q','VloKVodY8ak'], ['19/05/12','19/05/09','19/05/07'], ["'Zero Suit Caddy' LIVE"]],//Caddy Art Livestream Data
    coffeeOG = [['a27XjoPcQHg','MWwmEH2P2WU','L_ruyRpwzqw'], ['18/04/23','18/04/21','18/04/21'], ["'Coffee' Concept LIVE"]]; //Coffee Concept Art Data

//video playlist collections + accompanying data
var titleCards = ["Featured Videos","'Weekly' Timelapses","CSGO: Funny moments",vanhDev[2][0]+"elopment",
                  vher98[2][0]+"elopment",vialOfMe[2][0]+"elopment",caddy[2][0],coffee[2][0],coffeeOG[2][0],"'Weekly' Timelapses LIVE",]
var reqVideos = [featured, weeklyArt, CSGOFunny, vanhDev, vher98, vialOfMe, caddy, coffee, coffeeOG, artMaking]; //Video Array Storage for future references

// 88 888888 88""Yb    db    8b    d8 888888     888888 88   88 88b 88  dP""b8 888888 88  dP"Yb  88b 88    db    88     88 888888 Yb  dP
// 88 88__   88__dP   dPYb   88b  d88 88__       88__   88   88 88Yb88 dP   `"   88   88 dP   Yb 88Yb88   dPYb   88     88   88    YbdP
// 88 88""   88"Yb   dP__Yb  88YbdP88 88""       88""   Y8   8P 88 Y88 Yb        88   88 Yb   dP 88 Y88  dP__Yb  88  .o 88   88     8P
// 88 88     88  Yb dP""""Yb 88 YY 88 888888     88     `YbodP' 88  Y8  YboodP   88   88  YbodP  88  Y8 dP""""Yb 88ood8 88   88    dP

var pReq, vReq, playlist //these are default values on page load.
function onYouTubePlayerAPIReady() {
    player = new YT.Player('ytPlayer', {videoId: reqVideos[0][0][0]})
    $('#uploadDate').html(reqVideos[0][1][0] + "<br><t>" + reqVideos[0][2][0] + "</t>") //This prints out the current active video

    let temp = "";
    for(let i = 0; i < reqVideos.length; i++) {
        if (i !== 0) { //makes room for the 'SELECT ALL'
            temp += '<div><e style="width: calc(100% - 120px - var(--gutter) + var(--halfSkirting))">' + titleCards[i] + '</e><f'
            temp += titleCards[i].includes("LIVE") ? ' style="background-color:var(--accent3)"' : '';
            temp += ' onclick="pReq =' + i + '; loadplaylist()"> Select All </f>'
        } else {
            temp += "<div><e class='rs'>" + titleCards[i] + "</e>"}

        for(let e = 0; e < reqVideos[i][1].length; e++) {
            temp += e % 3 === 0 ? (e !== 0 ? "</row>" : "") + "<row>" : ""
            temp += '<div onclick="pReq =' + i + '; vReq =' + e + '; loadVideo()"><div class="thumbnails'

            temp += reqVideos[i][1].length === 1 ? ' lar' : reqVideos[i][1].length === 3 || reqVideos[i][1].length === 7 ? ' def' : ''
            temp += '"><img src="https://i.ytimg.com/vi/' + reqVideos[i][0][e] + '/hqdefault.jpg"/></div><tcb'

            temp += reqVideos[i][1].length === 1 ? ' class="lar"' : reqVideos[i][1].length === 3 || reqVideos[i][1].length === 7 ? ' class="def"' : ''
            temp += '><p>' + reqVideos[i][1][e] + '<br><t>' + (reqVideos[i][2].length > 1 ? reqVideos[i][2][e] : reqVideos[i][2][0]) + '</t></p></tcb> </div>'
        }
        temp = temp + "</div>"}
    $('#videoSelection').append(temp)}

// Yb    dP 88 8888b.  888888  dP"Yb      88      dP"Yb     db    8888b.  88 88b 88  dP""b8
//  Yb  dP  88  8I  Yb 88__   dP   Yb     88     dP   Yb   dPYb    8I  Yb 88 88Yb88 dP   `"
//   YbdP   88  8I  dY 88""   Yb   dP     88  .o Yb   dP  dP__Yb   8I  dY 88 88 Y88 Yb  "88
//    YP    88 8888Y"  888888  YbodP      88ood8  YbodP  dP""""Yb 8888Y"  88 88  Y8  YboodP

function loadplaylist() { //gets called through the f div element
    player.cuePlaylist({playlist: reqVideos[pReq][0], 'index' : 0, 'startSeconds': 0});
    pageScrollY[cPage] = 0; $('pagedata').animate({"top": 0})}

function loadVideo() { //load singular video
    player.loadVideoById({'videoId': reqVideos[pReq][0][vReq],'startSeconds': 0});
    $('#uploadDate').html(reqVideos[pReq][1][vReq] + "<br><t>" + reqVideos[pReq][2][vReq] + "</t>") //This prints out the current active video

    pageScrollY[cPage] = 0;
    $(!mobileBool ? 'pagedata' : '.pg' + cPage).animate({"top": 0})}

let localUrl, idGrab = undefined
function extVideo(){ //this function gets called from art element posts.
    if(clickInt > -clickDur){
        for(let e = 0; e < reqVideos[e][0].length; e++) { //loops through URL arrays
            console.log("Searching...")
            for(let i = 0; i < reqVideos[e][0].length; i++) {
                if(reqVideos[e][0][i] === localUrl){
                    idGrab = [e,i];
                    console.log("Id found: " + idGrab)

                    $('#uploadDate').html(reqVideos[e][1][i]+'<br><t>'+reqVideos[e][2][i]+'</t>')//print placement title + date.
                    extLoad(); return false }
                else {
                    idGrab = undefined }}}

        if(idGrab === undefined) { // if a url isn't found,
            console.log("loading on fetched url")
            $('#uploadDate').html( //print placement title + date.
                "Vanh.art<br><t>Playing Undefined Local Content</t>")}}
}

function extLoad() {
    player.loadVideoById({'videoId': localUrl,'startSeconds': 0}); //load video based on fetched url.

    setTimeout(function(){ //timeout delay to give iframe some time to load properly.
        $('.ls.pg4 t').click(); //this is just a jank way to change pages, but saves tons of time.
        pageScrollY[cPage] = 0; // resets the vertical page placement on page change.
        $('pagedata').animate({"top": 0})
    },250)
}
