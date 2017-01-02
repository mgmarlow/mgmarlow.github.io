$(function () {
  'use strict';
  
  var navbar = $('nav');
  var free = false;
  
  // Run in case of refresh in middle of page
  if ($(window).scrollTop() > 0) {
    navbar.removeClass('docked');
  }

  $('.scroll-link').click(function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top
    }, 200);
  });

  $(window).scroll(function () {    
    if ($(window).scrollTop() > 0 && !free) {
      navbar.removeClass('docked');
      free = true;
    } else {
      navbar.addClass('docked');      
      free = false; 
    }
  });

});