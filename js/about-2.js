$(document).ready(function() {
  
    var $slider = $(".slide-about-2r"),
        $slideBGs = $(".slide-about-2__bg"),
        diff = 0,
        curslide = 0,
        numOfslides = $(".slide-about-2").length-1,
        animating = false,
        animTime = 500,
        autoslideTimeout,
        autoslideDelay = 6000,
        $pagination = $(".slide-about-2r-pagi");
    
    function createBullets() {
      for (var i = 0; i < numOfslides+1; i++) {
        var $li = $("<li class='slide-about-2r-pagi__elem'></li>");
        $li.addClass("slide-about-2r-pagi__elem-"+i).data("page", i);
        if (!i) $li.addClass("active");
        $pagination.append($li);
      }
    };
    
    createBullets();
    
    function manageControls() {
      $(".slide-about-2r-control").removeClass("inactive");
      if (!curslide) $(".slide-about-2r-control.left").addClass("inactive");
      if (curslide === numOfslides) $(".slide-about-2r-control.right").addClass("inactive");
    };
    
    function autoslide() {
      autoslideTimeout = setTimeout(function() {
        curslide++;
        if (curslide > numOfslides) curslide = 0;
        changeslides();
      }, autoslideDelay);
    };
    
    autoslide();
    
    function changeslides(instant) {
      if (!instant) {
        animating = true;
        manageControls();
        $slider.addClass("animating");
        $slider.css("top");
        $(".slide-about-2").removeClass("active");
        $(".slide-about-2-"+curslide).addClass("active");
        setTimeout(function() {
          $slider.removeClass("animating");
          animating = false;
        }, animTime);
      }
      window.clearTimeout(autoslideTimeout);
      $(".slide-about-2r-pagi__elem").removeClass("active");
      $(".slide-about-2r-pagi__elem-"+curslide).addClass("active");
      $slider.css("transform", "translate3d("+ -curslide*100 +"%,0,0)");
      $slideBGs.css("transform", "translate3d("+ curslide*50 +"%,0,0)");
      diff = 0;
      autoslide();
    }
  
    function navigateLeft() {
      if (animating) return;
      if (curslide > 0) curslide--;
      changeslides();
    }
  
    function navigateRight() {
      if (animating) return;
      if (curslide < numOfslides) curslide++;
      changeslides();
    }
  
    $(document).on("mousedown touchstart", ".slide-about-2r", function(e) {
      if (animating) return;
      window.clearTimeout(autoslideTimeout);
      var startX = e.pageX || e.originalEvent.touches[0].pageX,
          winW = $(window).width();
      diff = 0;
      
      $(document).on("mousemove touchmove", function(e) {
        var x = e.pageX || e.originalEvent.touches[0].pageX;
        diff = (startX - x) / winW * 70;
        if ((!curslide && diff < 0) || (curslide === numOfslides && diff > 0)) diff /= 2;
        $slider.css("transform", "translate3d("+ (-curslide*100 - diff) +"%,0,0)");
        $slideBGs.css("transform", "translate3d("+ (curslide*50 + diff/2) +"%,0,0)");
      });
    });
    
    $(document).on("mouseup touchend", function(e) {
      $(document).off("mousemove touchmove");
      if (animating) return;
      if (!diff) {
        changeslides(true);
        return;
      }
      if (diff > -8 && diff < 8) {
        changeslides();
        return;
      }
      if (diff <= -8) {
        navigateLeft();
      }
      if (diff >= 8) {
        navigateRight();
      }
    });
    
    $(document).on("click", ".slide-about-2r-control", function() {
      if ($(this).hasClass("left")) {
        navigateLeft();
      } else {
        navigateRight();
      }
    });
    
    $(document).on("click", ".slide-about-2r-pagi__elem", function() {
      curslide = $(this).data("page");
      changeslides();
    });
    
  });