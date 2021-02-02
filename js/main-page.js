document.addEventListener("DOMContentLoaded", function () {
  
  let accordHeader = document.querySelectorAll(".accordion__header");

  /* Accordion */
  accordHeader.forEach( function (elem) {
    elem.addEventListener("click", function () {
      this.classList.toggle("accordion__header--active");
      this.parentElement.classList.toggle("accordion__item--show");
    });
    /* для активного проверять HAsClass? */
  });  

});

// $(document).ready(function () {
//   $(".slider").slick({
//     infinite: true,
//     slidesToShow: 1,
//     sliderToScroll: 1,
//     arrows: false,
//     dots: true
//   });
// });
