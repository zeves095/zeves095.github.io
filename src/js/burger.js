import $ from 'jquery';



$('document').ready(function () {

  // $('body').append('<div style="height:1px"></div>');
  var doing = false;
  // window.addEventListener('wheel', function(e) {
    
  // });
  $(document).on('wheel', function(e) {
    if(!doing){
      doing = true;
      _scroll((e.originalEvent.deltaY < 0 ? -1 : 1));
    }
  });

  $(document).on('mousewheel', function(e) {
    if(!doing){
      doing = true;
      _scroll(1);
    }
  });

  $(document).on('touchmove', function(e) { //touchmove works for iOS, I don't know if Android supports it
    $(document).trigger('mousewheel');
  });

  // var trigger = $('#hamburger'),
  var trigger = $('.support'),
      isClosed = true;
      trigger.click(function () {
      burgerTime();
  });

  $('.main-header__menu').toggleClass('main-header__menu--hidden');

  var activeclass = 'section__hover';
  var activeclass2 = 'section__hover2';
  var items = $('.slider');
  
  $('.section').addClass('off');
  var i = 0;
  var last = $('.section').eq(i);
  last.removeClass('off');

  function _scroll(direction) {
    console.log(direction);
    i = i + direction;
    i = ( i < 0 )? 0 : i;
    i = ( i > 5 )? 5 : i;
    burgerTime();
  }
  
  function burgerTime() {
    // if(++i > 5) i = 1;
    console.log(i);
    last.addClass('off');
    let item = $('.section').eq(i);
    item.removeClass('off');
    last = item;

    let blockleft = $('.service__slider',item);
    blockleft.removeClass(activeclass);
    let blockright = $('.service__caption, .service__description, .service__note, .service__buttons',item);
    blockright.removeClass(activeclass2);
    window.setTimeout(function(){
      blockleft.addClass(activeclass);
      blockright.addClass(activeclass2);
    },0);
    window.setTimeout(function(){doing = false;},500);
    

    // $('.main-header__menu').toggleClass('main-header__menu--hidden');
    // $('.menu').toggleClass('menu--is-open');
    // if (isClosed == true) {
    //   trigger.removeClass('is-open');
    //   trigger.addClass('is-closed');
    //   isClosed = false;
    // } else {
    //   trigger.removeClass('is-closed');
    //   trigger.addClass('is-open');
    //   isClosed = true;
    // }
  }

});

