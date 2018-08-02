import $ from 'jquery';

// import { timer } from 'rxjs';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/map';

// import 'rxjs/add/observable/fromEvent';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/switchMap'
// import 'rxjs/add/operator/share';
// import 'rxjs/add/operator/takeWhile';
// import 'rxjs/add/operator/throttle';
// import 'rxjs/add/operator/delay';
$.fn.swapWith = function(to) {
  return this.each(function() {
      var copy_to = $(to).clone(true);
      var copy_from = $(this).clone(true);
      $(to).replaceWith(copy_from);
      $(this).replaceWith(copy_to);
  });
};

function swipedetect(el, callback){
  
  var touchsurface = el,
  swipedir,
  startX,
  startY,
  dist,
  distX,
  distY,
  threshold = 15, //required min distance traveled to be considered swipe
  restraint = 100, // maximum distance allowed at the same time in perpendicular direction
  allowedTime = 300, // maximum time allowed to travel that distance
  elapsedTime,
  startTime,
  handleswipe = callback || function(swipedir){}

  touchsurface.addEventListener('touchstart', function(e){
      var touchobj = e.changedTouches[0]
      swipedir = 'none'
      dist = 0
      startX = touchobj.pageX
      startY = touchobj.pageY
      startTime = new Date().getTime() // record time when finger first makes contact with surface
      // e.preventDefault()
  }, false)

  touchsurface.addEventListener('touchmove', function(e){
      // e.preventDefault() // prevent scrolling when inside DIV
  }, false)

  touchsurface.addEventListener('touchend', function(e){
      var touchobj = e.changedTouches[0]
      distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
      distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
      elapsedTime = new Date().getTime() - startTime // get time elapsed
      if (true || elapsedTime <= allowedTime){ // first condition for awipe met
          if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
              swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
          }
          else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
              swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
          }
      }
      handleswipe(swipedir)
      // e.preventDefault()
  }, false)
}


var doing = false;
// var wheel$ = Observable.fromEvent(window, 'wheel')
//             // .filter(ev=>!doing)
//             .do((event) => {
//                 // doing = true;
//                 event.preventDefault();
//                 event.stopPropagation();
//             })
//             .throttle(()=>timer(1000))
//             .do(e=>console.info(doing));
            // .share();



$('document').ready(function () {
  // return;
  // $('body').append('<div style="height:1px"></div>');
  
  // window.addEventListener('wheel', function(e) {
    
  // });
  $('.slider').each(function(sliderNum, slider){
    $('.slider__item',slider).each(function(itemNum, item){
      var itemNumS = itemNum;

      swipedetect(item, function(swipedir){ 
        
        if(swipedir === 'right'){
          if($(item).prev().length){
            $(item).prev().removeClass('slider__item--left').addClass('slider__item--right');
            
            $(item).removeClass('slider__item--active');
            $(item).prev().addClass('slider__item--active');
          }
        }else if(swipedir === 'left'){
          if($(item).next().length){
            $(item).removeClass('slider__item--right').addClass('slider__item--left'); 
            $(item).removeClass('slider__item--active');
            $(item).next().addClass('slider__item--active');
          }
        }
      });
      $(item).click(function(e){
        $('.slider__item',slider).removeClass('slider__item--active');
        $(item).addClass('slider__item--active');

        if(!itemNum) itemNum = 0;
        let $rightItems = $('.slider__item:nth-child(n + ' + (itemNum) + ')', slider);
        let $leftItems = $('.slider__item:nth-child(-n + ' + (itemNum) + ')', slider);
        $rightItems.removeClass('slider__item--left').addClass('slider__item--right');
        $leftItems.removeClass('slider__item--right').addClass('slider__item--left');
        // $('.slider__item:nth-child(n + ' + itemNum + ')', slider).addClass('right');
        // $('.slider__item:nth-child(' + itemNum + ' - n)', slider).addClass('left');
      });
    });
  });

  var $supportContact = $('#support-contact');
  var $reactForm = $('#cert-app-wed');
  $reactForm.hide();
  // $('body').append($supportContact);

  $(document).on('wheel', function(e) {
    console.log(window.innerWidth);
    if(!doing){
      doing = true;
      _scroll((e.originalEvent.deltaY < 0 ? -1 : 1));
    }else{
      // e.preventDefault();
      // e.stopPropagation();
    }
  });

  $(document).on('mousewheel', function(e) {
    if(!doing){
      doing = true;
      _scroll(1);
    }else{
      // e.preventDefault();
      // e.stopPropagation();
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
    i = i + direction;
    i = ( i < 0 )? 0 : i;
    i = ( i > 5 )? 5 : i;
    burgerTime();
  }

  // wheel$.subscribe(
  //   next => _scroll((next.deltaY < 0 ? -1 : 1)),
  //   err => console.log('error:', err),
  //   () => console.log('the end'),
  // );

  $('#menu a, #logo').click(function(e){
    e.preventDefault();
    var dp = $(this).attr('data-page');
    i = dp - 1;
    burgerTime();
  });
  
  function burgerTime() {
    let item = $('.section').eq(i);
    let blockleft,blockright;
    if( item.hasClass('section--main') ) {
      // правые элементы
      blockleft = $('.service__caption, .service__description, .service__note-caption, .service__note, .service__buttons',item);
      // левые элементы
      blockright = $('.service__image',item);
    } else {
      // правые элементы
      blockleft = $('.service__slider',item);
      // левые элементы
      blockright = $('.service__caption, .service__description, .service__note, .service__buttons, .service__image',item);
    }
    
    // сбрасываем стили анимации
    blockleft.removeClass(activeclass);
    blockright.removeClass(activeclass2);

    blockleft.addClass(activeclass);
    blockright.addClass(activeclass2);
    
    window.setTimeout( function() {
      last.addClass('off');
      item.removeClass('off');
      last = item;

      $('#menu a').removeClass('active');
      $("#menu a[data-page='"+(i+1)+"']").addClass('active');
      // doing = false;
      window.setTimeout(function(){
        doing = false;
      },1500);
    },0);
    

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

