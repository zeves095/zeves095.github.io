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
  $(".service__button-call, video-area__button-details, .service__button-details, .service__button-details>a, .main-footer__button_call").click(function (e) {
    e.preventDefault();
    jivo_api.open({ start: 'call' });
  });
});
