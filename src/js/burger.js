import $ from 'jquery';

$('document').ready(function () {
  var trigger = $('#hamburger'),
      isClosed = true;

  trigger.click(function () {
    burgerTime();
  });

  $('.main-header__menu').toggleClass('main-header__menu--hidden');

  function burgerTime() {
    $('.main-header__menu').toggleClass('main-header__menu--hidden');
    $('.menu').toggleClass('menu--is-open');
    if (isClosed == true) {
      trigger.removeClass('is-open');
      trigger.addClass('is-closed');
      isClosed = false;
    } else {
      trigger.removeClass('is-closed');
      trigger.addClass('is-open');
      isClosed = true;
    }
  }

});

