import $ from 'jquery';
$('document').ready(function() {
  (function() {
    var widget_id = '3PbIMyWRXZ';
    var d = document;
    var w = window;
    function l() {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = '//code.jivosite.com/script/widget/' + widget_id;
      var ss = document.getElementsByTagName('script')[0];
      ss.parentNode.insertBefore(s, ss);
    }
    if (d.readyState == 'complete') {
      l();
    } else {
      if (w.attachEvent) {
        w.attachEvent('onload', l);
      } else {
        w.addEventListener('load', l, false);
      }
    }
  })();

  $(".main-header__support").click(function(e) {
    e.preventDefault();
    jivo_api.open();
  });
  $("a.video-area__button-details, \
    .service__button-details>a").click(function (e) {
    e.preventDefault();
    jivo_api.open({ start: 'call' });
  });
  $('.button--link-call, .main-footer__button_call, .service__button-call').click(function(e){
    if(window.matchMedia("(min-width: 667px)").matches && window.matchMedia("(max-width: 1200px)").matches){
      e.preventDefault();
      jivo_api.open();
      setTimeout(function(){$('#jivo_container').contents().find('jdiv.callMe_BG').click()},200);
    }
  });
});
