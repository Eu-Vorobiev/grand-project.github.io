document.addEventListener("DOMContentLoaded", function () {

  let header        = document.querySelector(".header");
  let anchors       = document.querySelectorAll('a[href*="#"]');
  let accordHeader  = document.querySelectorAll(".accordion__header");
  let burger        = document.querySelector(".burger");
  let burgerMenu    = document.querySelector(".burger__menu");
  let burgerLink    = document.querySelectorAll(".mobile-nav a");
  let btnClose      = document.querySelector(".close");
  let form          = document.querySelector(".form--feedback");
  let phoneField    = document.querySelector("input[type='tel']");
  let btnSubmit     = document.querySelector(".feedback__btn");
  let validityState = phoneField.validity;
  /* Scroll Out */
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

  /* Validation */
  form.setAttribute('novalidate', true); /* убираем дефолт валидацию , но если скрипт не подгруз - будет браузерная валидация */

  function hasError(field) { /* функция на наличие ошибок в инпутах */
    if (field.type === 'file'||field.type === 'reset'||field.type === 'submit'||field.disabled|| field.type === 'button') return;  /* если поле выкл, submit, reset, file или кнопка - не валидировать */
    let validity = field.validity; /* получаем валидацию */

    // Если провалидировано, вернуть null
    if (validity.valid) return;

    // Поле пустое
    if (validity.valueMissing) return 'Будьте добры, заполните это поле';
    
    // Не тот тип данных
    if (validity.typeMismatch) {
      if (field.type === "tel") return 'Пожалуйста, введите только цифры'
    } 
    
    // If pattern doesn't match
    if (validity.patternMismatch) {
      if (field.hasAttribute('title')) return field.getAttribute('title');
      
      return 'Неверный формат. Пожалуйста, введите только цифры';
    } 

    // Слишком мало символов
    if (validity.tooShort) return 'Пожалуйста, увеличьте количество введеных Вами символов до ' + field.getAttribute('minLength') + '. На данный момент Вы ввели ' + field.value.length + " символов.";
    
    // Глобальная ошибка, которая не подходит под любые другие
    return 'Значение, которое Вы ввели - некорректное';
  }

  function showError(field, error) { /* функция вывода ошибки в HTML */
    field.classList.add("error");
    let id = field.id || field.name;  /* получаем ид или имя поля */
    if (!id) return;

    /* Проверяем есть ли поле с ошибкой в HTML ,если нет - создаем его */
    let errorMessage = field.form.querySelector(".error-message#error-for-" + id);
    if (!errorMessage) {
      errorMessage = document.createElement("div");
      errorMessage.className = 'error-message';
      errorMessage.id = 'error-for-' + id;
      field.parentNode.insertBefore ( errorMessage, field.nextSibling); /* находим поле, вставляем после него текст ошибки, который создан div,  с классом и ид, между саблингами (братья/сестры) поля */
    }
    field.setAttribute("aria-describedby", "error-for-" + id); /* ставим аттр aria-descr для скрин-ридеров */
    errorMessage.innerHTML = error ; /* если поле с ошибкой есть и идет новая ошибка, перезаписываем его */
    errorMessage.style.display = 'block'; /* стили для поля с ошибкой */
    errorMessage.style.visibility = 'visible';
  }

  function removeError( field) { /* функция для удаления ошибок, убираем все классы, ид и сам текст ошибки удаляем */
    field.classList.remove("error");
    field.removeAttribute("aria-describedby");
    let id = field.id || field.name;
    if (!id) return;
    let errorMessage = field.form.querySelector(".error-message#error-for-" + id + " ");
    if (!errorMessage) return;
    errorMessage.innerHTML = '';
    errorMessage.style.display = 'none';
    errorMessage.style.visibility = 'hidden';
  }

  let validation = function (evt) {
    if (!evt.target.form.classList.contains("validate")) 
    return;
    let error = hasError(evt.target);
    if (error) {
      showError(evt.target, error);
      return;
    };
    removeError(evt.target);
  };
  
  document.addEventListener("input", validation);
  document.addEventListener("blur", validation, true);
  
  document.addEventListener("submit", function (evt) {
    // Применяем валидацию только на ту форму, которая содержит класс
    if (!evt.target.classList.contains("validate")) 
    return;

    // Получаем все элементы формы
    let fields = evt.target.elements;

    // Валидация каждого поля
    // Помещаем первое поле с ошибкой в переменную, чтобы сразу его показывать
    let error, hasErrors;
    for (let i = 0; i < fields.length; i++) {
        error = hasError(fields[i]);
        if (error) {
            showError(fields[i], error);
            if (!hasErrors) {
                hasErrors = fields[i];
            }
        }
    }
    // Если есть ошибка, делаем фокус на этом поле
    if (hasErrors) {
      evt.preventDefault();
      hasErrors.focus();
    }
  }, false);
});