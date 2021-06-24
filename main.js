// Options

var slide_time = 1200; // The time it takes to complete an entire transition
var change_point = slide_time / 2; // Calculates when the slide should change
var right_arrow = $('.easytransitions_navigation__right'); // Element that trigger move right
var left_arrow = $('.easytransitions_navigation__left'); // Element that trigger move left
var slide_amount = $('.easytransitions section').length; // How many slides
var current_slide = 1; // Starting slide
var on = 1;

right_arrow.click(function(){
  if(on == 1){
    on = 0;
    if(current_slide < slide_amount){
      current_slide++;
      var active_slide = $('.active_slide').next()
      set_transition(active_slide);
      setTimeout(function(){
        $('.active_slide').hide().removeClass('active_slide').next().addClass('active_slide').show();
      },change_point);
      setTimeout(function(){
        on = 1;
      },slide_time);
    } else {
      // End
    }
  }
});

left_arrow.click(function(){
  if(on == 1){
    on = 0;
    if(current_slide > 1){
      current_slide--;
      var active_slide = $('.active_slide').prev()
      set_transition(active_slide);
      setTimeout(function(){
        $('.active_slide').hide().removeClass('active_slide').prev().addClass('active_slide').show();
      },change_point);
      setTimeout(function(){
        on = 1;
      },slide_time);
    } else {
      // Start
    }
  }
});

// Set transition type

function set_transition(tran){
  var transition_type = tran.data('transition')
  $('.easytransitions_transition div').each(function(){
    $(this).removeClass(this.className.split(' ').pop());
    setTimeout(function(){
      $('.easytransitions_transition div').addClass(transition_type)
    },100)

  })
}







var rafId = null;
var delay = 200;
var lTime = 0;

function scroll() {
  var scrollTop = $(window).scrollTop();
  var height = $(window).height()
  var visibleTop = scrollTop + height;
  $('.reveal').each(function() {
    var $t = $(this);
    if ($t.hasClass('reveal_visible')) { return; }
    var top = $t.offset().top;
    if (top <= visibleTop) {
      if (top + $t.height() < scrollTop) {
        $t.removeClass('reveal_pending').addClass('reveal_visible');
      } else {
        $t.addClass('reveal_pending');
        if (!rafId) requestAnimationFrame(reveal);  
      }
    }
  });
}
function reveal() {
  rafId = null;
  var now = performance.now();
  
  if (now - lTime > delay) {
    lTime = now;
    var $ts = $('.reveal_pending');
    $($ts.get(0)).removeClass('reveal_pending').addClass('reveal_visible');  
  }
  
  
  if ($('.reveal_pending').length >= 1) rafId = requestAnimationFrame(reveal);
}

$(scroll);
$(window).scroll(scroll);
$(window).click(function() {
  $('.reveal').removeClass('reveal_visible').removeClass('reveal_pending');
  lTime = performance.now() + 500;
  var top = $(window).scrollTop();
  $(window).scrollTop(top === 0 ? 1 : top-1);
});








(function() {
  $(document).ready(function() {
    var walkthrough;
    walkthrough = {
      index: 0,
      nextScreen: function() {
        if (this.index < this.indexMax()) {
          this.index++;
          return this.updateScreen();
        }
      },
      prevScreen: function() {
        if (this.index > 0) {
          this.index--;
          return this.updateScreen();
        }
      },
      updateScreen: function() {
        this.reset();
        this.goTo(this.index);
        return this.setBtns();
      },
      setBtns: function() {
        var $nextBtn, $prevBtn;
        $nextBtn = $('.next-screen');
        $prevBtn = $('.prev-screen');
        if (walkthrough.index === walkthrough.indexMax()) {
          $nextBtn.prop('disabled', true);
          $prevBtn.prop('disabled', false);
        } else if (walkthrough.index === 0) {
          $nextBtn.prop('disabled', false);
          $prevBtn.prop('disabled', true);
        } else {
          $nextBtn.prop('disabled', false);
          $prevBtn.prop('disabled', false);
        }
      },
      goTo: function(index) {
        $('.screen').eq(index).addClass('active');
        return $('.dot').eq(index).addClass('active');
      },
      reset: function() {
        return $('.screen, .dot').removeClass('active');
      },
      indexMax: function() {
        return $('.screen').length - 1;
      },
      closeModal: function() {
        $('.walkthrough, .shade').removeClass('reveal');
        return setTimeout((() => {
          $('.walkthrough, .shade').removeClass('show');
          this.index = 0;
          return this.updateScreen();
        }), 200);
      },
      openModal: function() {
        $('.walkthrough, .shade').addClass('show');
        setTimeout((() => {
          return $('.walkthrough, .shade').addClass('reveal');
        }), 200);
        return this.updateScreen();
      }
    };
    $('.next-screen').click(function() {
      return walkthrough.nextScreen();
    });
    $('.prev-screen').click(function() {
      return walkthrough.prevScreen();
    });
    $('.close').click(function() {
      return walkthrough.closeModal();
    });
    $('.open-walkthrough').click(function() {
      return walkthrough.openModal();
    });
    walkthrough.openModal();
    
    // Optionally use arrow keys to navigate walkthrough
    return $(document).keydown(function(e) {
      switch (e.which) {
        case 37:
          // left
          walkthrough.prevScreen();
          break;
        case 38:
          // up
          walkthrough.openModal();
          break;
        case 39:
          // right
          walkthrough.nextScreen();
          break;
        case 40:
          // down
          walkthrough.closeModal();
          break;
        default:
          return;
      }
      e.preventDefault();
    });
  });

}).call(this);