
var image1=new Image()
image1.src="elgreco/1.jpg"
var image2=new Image()
image2.src="elgreco/2.jpg"
var image3=new Image()
image3.src="elgreco/3.jpg"



//variable that will increment through the images
var step=1
function slideit(){
//if browser does not support the image object, exit.
if (!document.images)
return
document.images.slide.src=eval("image"+step+".src")
if (step<3)
step++
else
step=1
//call function "slideit()" every 2.5 seconds
setTimeout("slideit()",200)
}
slideit()
//-->
