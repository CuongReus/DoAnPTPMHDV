$(function () {
  $(".scroll-wrapper1").scroll(function () {
    $(".scroll-wrapper2").scrollLeft($(".scroll-wrapper1").scrollLeft());
  });
  $(".scroll-wrapper2").scroll(function () {
    $(".scroll-wrapper1").scrollLeft($(".scroll-wrapper2").scrollLeft());
  });
  if($(".scroll-wrapper1")[0]&&$(".scroll-wrapper1")[0].firstChild){
    $(".scroll-wrapper1")[0].firstChild.style.width = $(".scroll-wrapper2")[0].scrollWidth+'px';
  }
});