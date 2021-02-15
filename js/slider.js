$(document).ready(function () {
  $(".slider__wrap").slick({
    infinite: true,
    arrows: false,
    dots: true,
    adaptiveHeight: true,
    slidesToShow: 2,
    initialSlide: 2,
    responsive: [
      {
        breakpoint: 930,
        settings: {
          centerMode: true,
          centerPadding: '10px',
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
  });
});