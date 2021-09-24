$(window).ready(function(){
    if (/Mobi|Android/i.test(navigator.userAgent) === false) {
        $(".nmb, #top-nav, #side").addClass("active");
        $(".pg").removeClass("active");
        setTimeout(function() {
            $("<style>" +
                ".pg{transition:" +
                "margin .5s cubic-bezier(0,0,0,1)," +
                "opacity .5s cubic-bezier(0,0,0,1)}" +
                "</style>").appendTo("head")},200)}})

var pagescl2, pagescl3;
var resize = function() { // Page rescaling
    headr = $('#hdr').height();
    bodyw = $('body').width();

    if (/Mobi|Android/i.test(navigator.userAgent) === true) {
        pagescl2 = (page2 / (bodyw - 60)) //180 / 60
        docelem.style.setProperty('--sidebarl', -20 + "px")
        docelem.style.setProperty('--sidebarr', (righb / pagescl2).toFixed(2) + 10 + "px")
        docelem.style.setProperty('--postwidth', (middb / pagescl2).toFixed(2) + 10 + "px")
    } else {
        if (bodyw > 900) { //200 / 80
            $(".nmb, #top-nav, #side-nav, #side").removeClass("active");
            $(".pg").addClass("active");
            if (bodyw <= (page3 + 80)) {
                pagescl3 = (page3 / (bodyw - 80)); //200 / 80
                docelem.style.setProperty('--sidebarl', (leftb / pagescl3).toFixed(2) + "px")
                docelem.style.setProperty('--sidebarr', (righb / pagescl3).toFixed(2) + "px")
                docelem.style.setProperty('--postwidth', (middb / pagescl3).toFixed(2) + "px")
            } else {
                docelem.style.setProperty('--sidebarl', leftb + "px")
                docelem.style.setProperty('--sidebarr', righb + "px")
                docelem.style.setProperty('--postwidth', middb + "px")}
        } else {
            $(".nmb, #top-nav, #side").addClass("active");
            $(".pg").removeClass("active");
            pagescl2 = (page2 / (bodyw - 60)) //180 / 60
            docelem.style.setProperty('--sidebarl', -20 + "px")
            docelem.style.setProperty('--sidebarr', (righb / pagescl2).toFixed(2) + 10 + "px")
            docelem.style.setProperty('--postwidth', (middb / pagescl2).toFixed(2) + 10 + "px")}
    }
}