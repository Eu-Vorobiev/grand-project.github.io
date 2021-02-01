document.addEventListener("DOMContentLoaded", function () {

  let accordHeader = document.querySelectorAll(".accordion__header");

  /* Accordion */
  accordHeader.forEach( function (elem) {
    elem.addEventListener("click", function () {
      this.classList.toggle("accordion__header--active");
      this.parentElement.classList.toggle("accordion__item--show");
    });
  });

});