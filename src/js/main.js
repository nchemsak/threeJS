//JS
"use strict";
// Back to top Button
var amountScrolled = 200;

// var amountScrolledNav = 25;

$(window).scroll(function() {
    if ($(window).scrollTop() > amountScrolled) {
        $('button.back-to-top').addClass('show');
    } else {
        $('button.back-to-top').removeClass('show');
    }

});

$('button.back-to-top').click(function() {
    $('html, body').animate({
        scrollTop: 0
    }, 800);
    return false;
});

// Waves effect to buttons - http://fian.my.id/Waves/
Waves.attach('button.back-to-top', 'waves-float');
Waves.init();
