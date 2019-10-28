
// var image1=new Image()
// image1.src="elgreco/1.jpg"
// var image2=new Image()
// image2.src="elgreco/2.jpg"
// var image3=new Image()
// image3.src="elgreco/3.jpg"
//
//
//
// //variable that will increment through the images
// var step=1
// function slideit(){
// //if browser does not support the image object, exit.
// if (!document.images)
// return
// document.images.slide.src=eval("image"+step+".src")
// if (step<3)
// step++
// else
// step=1
// //call function "slideit()" every 2.5 seconds
// setTimeout("slideit()",200)
// }
// slideit()
// //-->

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
    var n = Math.floor( Math.random() * 14);
    myImage.attr('src', "../website/images/greco_" + n + ".jpg");
    // this statement uses the generated value to create a filename
    var path_to_img = "url(../website/images/greco_" + n + ".jpg)";
    // this statement now uses the generated filename to change the background-image of the new div
    // myGreco.css("background-image",path_to_img);

    var x = Math.random() * $(window).width();
    myGreco.css("left",x);

    var y = Math.random() * $(window).height();
    myGreco.css("top",y);
}

var t = setInterval( generateGreco, 200 );
