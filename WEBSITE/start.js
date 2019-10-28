// var Gradientify = require('Gradientify');
//
//
//
//


$(".container").on("mousedown", function(e) {

    // add statements that need to be performed between these lines

      $(".container").css("background-color", "rgb(82, 148, 250)");
      $(".container").css("border", "black");
//       new Gradientify({
//     element: document.body,
//     gradients: [
//       `linear-gradient(60deg, rgb(255, 0, 0), rgb(0, 0, 255))`,
//       `linear-gradient(10deg, rgb(25, 123, 23), #ff22af)`,
//       `radial-gradient(rgb(25, 123, 223), red)` // All valid CSS gradients are supported
//     ],
//     fixed: false,
//     delay: 0,
//     interval: 5000
// }));


});

$('a[href^="#"]').click(function () {
    $('html, body').animate({
        scrollTop: $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top
    }, 3000);

    return false;
});
