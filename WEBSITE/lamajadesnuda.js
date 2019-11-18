function generateGreco() {

    // this statement creates a new <div>
    var myGreco = $("<div>");

    // this statement adds the class cat1 to this div
    myGreco.addClass("greco1");
    var myImage = $("<img>")

    myGreco.append(myImage);
    // this statement adds the div to the html document (important!)
    $(".container").append( myGreco );

    // this statement generates a random value between 0 and 14
    var n = Math.floor( Math.random() * 77);
    myImage.attr('src', "../website/images/lamajadesnuda/lamajadesnuda (" + n + ").jpg");
    // this statement uses the generated value to create a filename
    var path_to_img = "url(../website/images/lamajadesnuda/lamajadesnuda (" + n + ").jpg";
    // this statement now uses the generated filename to change the background-image of the new div
    // myGreco.css("background-image",path_to_img);

    var x = Math.random() * $(window).width();
    myGreco.css("left",x);

    var y = Math.random() * $(window).height();
    myGreco.css("top",y);
}

var t = setInterval( generateGreco, 200 );
