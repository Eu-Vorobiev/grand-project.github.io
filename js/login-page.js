document.addEventListener("DOMContentLoaded", function () {
  /* Tabs */
  let tabItem = document.querySelectorAll(".tab__item");
  let tabContent = document.querySelectorAll(".log-in__content");

  tabItem.forEach(elem => {
    elem.addEventListener("click", function () {
      showTabContent(elem.dataset.tabindex);
      tabItem.forEach(elem => {
        elem.classList.remove("tab__item--active");
      });
      this.classList.add("tab__item--active");
    });
  });

  let hideTabContent = () => {
    for (let i = 1; i < tabContent.length; i++) {
      tabContent[i].classList.add("hidden");
    };
  };

  hideTabContent();

  function showTabContent(tabindex) {
    for (let i = 0; i < tabContent.length; i++) {
      tabContent[i].classList.add("hidden");
    };
    tabContent[tabindex - 1].classList.remove("hidden");
  }

  /* Validation Form--Enter*/
  new JustValidate('.form--enter', {
    rules: {
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        password: true,
        minLength: 8
      },
    },
    messages: {
      email: {
        email: 'Ваш email введен некорректно. Пожалуйста, проверьте правильность ввода',
        required: 'Пожалуйста, введите Ваш email'
      },
      password: {
        required: 'Вам необходимо ввести пароль',
        password: 'Пароль должен содержать как минимум 1 цифру и 1 букву',
        minLength: 'Минимальная длина пароля = 8 символов'
      },
    },
  });

  /* Validation Form--Registration*/
  new JustValidate('.form--registration', {
    rules: {
      name: {
        required: true,
        minLength: 2
      },
      username: {
        required: true,
        minLength: 2
      },
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        password: true,
        minLength: 8
      },
    },
    messages: {
      name: {
        required: 'Вам необходимо ввести Ваше имя',
        minLength: 'Пожалуйста, введите как минимум два символа'
      },
      username: {
        required: 'Вам необходимо ввести Ваш никнейм',
        minLength: 'Следует ввести больше символов'
      },
      email: {
        email: 'Ваш email введен некорректно. Пожалуйста, проверьте правильность ввода',
        required: 'Пожалуйста, введите Ваш email'
      },
      password: {
        required: 'Вам необходимо ввести пароль',
        password: 'Пароль должен содержать как минимум 1 цифру и 1 букву',
        minLength: 'Минимальная длина пароля = 8 символов'
      },
    },

    submitHandler: function (form) {
      let xhr = new XMLHttpRequest();
      let formData = new FormData(form);

      xhr.open("POST", 'mail.php', true);

      xhr.addEventListener("load", function () {
        if (xhr.readyState === 4) {
          switch (xhr.status) {
            case 200:
              console.log("YES");
              form.reset();
              successForm();
              break;
            case 404:
              console.log("NO");
              break;
            default:
              console.log("ERROR");
              break;
          };
        };
      });
      xhr.send(formData);
    },
  });

  let modal = document.querySelector(".modal");
  let btnRegistr = document.querySelector(".btn--registr");

  function successForm() {
    btnRegistr.addEventListener("click", function () {
      modal.classList.add("modal--visible");
      setTimeout(() => {
        modal.classList.remove("modal--visible");
      }, 1000);
    })
  };

});