document.addEventListener("DOMContentLoaded", function () {

  /* Scroll Out */
  ScrollOut({
    once: true
  });
  
  /* Accordion */
  let accordHeader = document.querySelectorAll(".accordion__header");

  accordHeader.forEach( function (elem) {
    elem.addEventListener("click", function () {
      this.classList.toggle("accordion__header--active");
      this.parentElement.classList.toggle("accordion__item--show");
    });
  });  

  /* Burger Menu */
  let burger = document.querySelector(".burger");
  let burgerMenu = document.querySelector(".burger__menu");
  let btnClose = document.querySelector(".close");

  burger.addEventListener("click", function () {
    burgerMenu.classList.add("burger__menu--active");
  });
  btnClose.addEventListener("click", () => {
    burgerMenu.classList.remove("burger__menu--active");
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
