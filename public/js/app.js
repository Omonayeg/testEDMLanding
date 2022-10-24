window.FontAwesomeConfig = {
  searchPseudoElements: true,
};

// on document ready
$(document).ready(function () {
  // show/hide the mobile menu based on class added to container
  $(".menu-icon").click(function () {
    $(this).parent().toggleClass("is-tapped");
    $("#hamburger").toggleClass("open");
  });

  // handle touch device events on drop down, first tap adds class, second navigates
  $(".touch .sitenavigation li.nav-dropdown > a").on("touchend", function (e) {
    if ($(".menu-icon").is(":hidden")) {
      var parent = $(this).parent();
      $(this).find(".clicked").removeClass("clicked");
      if (parent.hasClass("clicked")) {
        window.location.href = $(this).attr("href");
      } else {
        $(this).addClass("linkclicked");

        // close other open menus at this level
        $(this).parent().parent().find(".clicked").removeClass("clicked");

        parent.addClass("clicked");
        e.preventDefault();
      }
    }
  });

  // handle the expansion of mobile menu drop down nesting
  $(".sitenavigation li.nav-dropdown").click(function (event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }

    if ($(".menu-icon").is(":visible")) {
      $(this).find("> ul").toggle();
      $(this).toggleClass("expanded");
    }
  });

  // prevent links for propagating click/tap events that may trigger hiding/unhiding
  $(".sitenavigation a.nav-dropdown, .sitenavigation li.nav-dropdown a").click(
    function (event) {
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
    }
  );

  // javascript fade in and out of dropdown menu
  $(".no-touch .sitenavigation li").hover(
    function () {
      if (!$(".menu-icon").is(":visible")) {
        $(this).find("> ul").fadeIn(100);
      }
    },
    function () {
      if (!$(".menu-icon").is(":visible")) {
        $(this).find("> ul").fadeOut(100);
      }
    }
  );
});

// CHURCH LOGO CAROUSEL

$(".owl-carousel").owlCarousel({
  // margin: 20,
  loop: true,
  pignation: false,
  autoplay: true,
  autoplayTimeout: 2000,
  autoplayHoverPause: true,
  smartSpeed: 2,
  responsive: {
    0: {
      items: 3,
    },
    480: {
      items: 4,
    },
    608: {
      items: 5,
    },
    1000: {
      items: 8,
    },
  },
});

// TESTIMONIAL CAROUSEL

var swiper = new Swiper(".swiper-container", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  navigation: true,
  autoplay: true,
  loop: true,
  observer: true,
  observeParents: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2,
    slideShadows: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

function scrollTrigger(selector, options = {}){
  let els = document.querySelectorAll(selector)
  els = Array.from(els)
  els.forEach(el => {
      addObserver(el, options)
  })
}

function addObserver(el, options){
  if(!('IntersectionObserver' in window)){
      if(options.cb){
          options.cb(el)
      }else{
          entry.target.classList.add('active')
      }
      return
  }
  let observer = new IntersectionObserver((entries, observer) => { //this takes a callback function which receives two arguments: the elemts list and the observer instance
      entries.forEach(entry => {
          if(entry.isIntersecting){
              if(options.cb){
                  options.cb(el)
              }else{
                  entry.target.classList.add('active')
              }
              observer.unobserve(entry.target)
          }
      })
  }, options)
  observer.observe(el)
}

scrollTrigger('.scroll-reveal', {
  rootMargin: '-110px',
})

scrollTrigger('.loader', {
  // rootMargin: '-200px'
});
