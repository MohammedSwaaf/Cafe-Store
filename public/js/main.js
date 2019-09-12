$(function () {
    'use strict';
    let windowHeight = $(window).height(),
        navHeight = $('.navbar').innerHeight();
    $('.banner').height(windowHeight-navHeight);
    $('.banner .shadow').height(windowHeight-navHeight);
})
$(function(){
    alert('Welcome')
})