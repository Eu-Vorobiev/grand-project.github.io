document.addEventListener("DOMContentLoaded", function () {

  let header       = document.querySelector(".header");
  let anchors      = document.querySelectorAll('a[href*="#"]');
  let accordHeader = document.querySelectorAll(".accordion__header");
  let burger       = document.querySelector(".burger");
  let burgerMenu   = document.querySelector(".burger__menu");
  let burgerLink   = document.querySelectorAll(".mobile-nav a")
  let btnClose     = document.querySelector(".close");

  /*Scroll Out */
  ScrollOut({
    once: true
  });

  /* Fixed Header */
  function fixHeader() {
    if (window.pageYOffset >= header.offsetHeight - 20) {
      header.classList.add("header--fixed");
    } else {
      header.classList.remove("header--fixed");
    };
  };

  window.addEventListener('scroll', fixHeader);

  /* Smooth Scroll */
  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const blockID = anchor.getAttribute('href').substr(1)

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  };
  
  /* Accordion */
  accordHeader.forEach(function (elem) {
    elem.addEventListener("click", function () {
      this.classList.toggle("accordion__header--active");
      this.parentElement.classList.toggle("accordion__item--show");
    });
  });

  /* Burger Menu */
  burger.addEventListener("click", function () {
    burgerMenu.classList.add("burger__menu--active");
  });
  burgerLink.forEach( function (link) {
    link.preventDefault;
    link.addEventListener("click", function () {
      burgerMenu.classList.remove("burger__menu--active");
    });
  });
  btnClose.addEventListener("click", () => {
    burgerMenu.classList.remove("burger__menu--active");
  });

});