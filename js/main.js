$(function () {
  'use strict';

  var navbar = $('nav');
  
  $('.scroll-link').click(function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top
    }, 200);
  });

  $(window).scroll(function () {    
    if ($(window).scrollTop() > 0) {
      navbar.removeClass('docked');
    } else {
      navbar.addClass('docked');      
    }
  });

});