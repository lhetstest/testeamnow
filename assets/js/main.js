!(function($) {
  "use strict";

  // Preloader
  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });

  // Select the button
  var btn = document.querySelector('.btn-themes');
  var tsw = document.querySelectorAll('.theme-sw');
  var currentTheme = '';
  var currentLang = '';
  var lng ='';

  // Check for localStorage support
  if('localStorage' in window){
    currentTheme = localStorage.getItem("theme");
    currentLang = localStorage.getItem("uiLang");
  }

  if(currentLang) { // If key exists, then use that found in localStorage
    lng = currentLang;
  } else {
    currentLang = navigator.language.slice(0, 2);

    switch (currentLang) {
      case "ru":
      case "ua":
      case "en":
        lng = currentLang;
        break;
      default:
        lng = 'ua';
    }
  }

  // applay current language
  $(".lng").each(function(index, element) {
    //$(this).text(arrLang[lng][$(this).attr("key")]); // v1
    
    //$(this).txt(arrNewLang[$(this).attr("key")][lng]); // v2
    $(this).html(arrNewLang[$(this).attr("key")][lng]); // v2
    //$(this).val(arrNewLang[$(this).attr("key")][lng]); // v2
  }); 
  
  // If the current theme in localStorage is "dark"...
  if (currentTheme == "dark") {
    // ...then use the .dark-theme class
    for (var i=0; i < tsw.length; i++ ) {
      tsw[i].classList.add('dark-style');;
    }
  }

  // Listen for a click on the button
  btn.addEventListener('click', function() {
    
    // Then toggle (add/remove) the .dark-style class to the body
    for (var i=0; i < tsw.length; i++ ) {
      tsw[i].classList.toggle('dark-style');;
    }    

    // Let's say the theme is equal to light
    let theme = "light";
    // If the body contains the .dark-theme class...
    if (btn.classList.contains("dark-style")) {
      // ...then let's make the theme dark
      theme = "dark";
    }
    // Then save the choice in localStorage
    localStorage.setItem("theme", theme);
  });

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 2;
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('bx-menu bx-x-circle');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="bx bx-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('bx-menu bx-x-circle');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('bx-menu bx-x-circle');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, #mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: false,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      990: {
        items: 3
      }
    }
  });

  // Tesam carousel (uses the Owl Carousel library)
  $(".team-carousel").owlCarousel({
    autoplay: true,
    dots: false,
    loop: true,
    margin: 30,
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 2
      },
      768: {
        items: 3
      },
      990: {
        items: 4
      }
    }
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
      $('.venobox').venobox({
        'share': false
      });
    });
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      once: true
    });
  }

  $(window).on('load', function() {
    aos_init();
  });

  $('.open_popup').click(function() {
      var popup_id = $('#' + $(this).attr("rel"));
      $(popup_id).show();
      $('.pop-overlay').show();
  })

  $('.pop-popup .pop-close, .pop-overlay').click(function() {
      $('.pop-overlay, .pop-popup').hide();
  });

  // get/set the selected language
  $(".translate").click(function() {
    var lng = $(this).attr("id");
    var navlng = navigator.language.slice(0, 2);
    setCookie( 'uiLang', lng, 10000 );
    localStorage.setItem("uiLang", lng);

    $(".lng").each(function(index, element) {
      //$(this).text(arrLang[lng][$(this).attr("key")]); // v1
      //$(this).text(arrNewLang[$(this).attr("key")][lng]); // v2
      $(this).html(arrNewLang[$(this).attr("key")][lng]); // v2
    });
  });

  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

})(jQuery);