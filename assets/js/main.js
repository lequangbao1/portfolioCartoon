navigation = {
  init: function () {
    this.scrollDown();
    this.toggleMenu();
    this.scrollTo();
    this.scrollActive();
  },
  toggleMenu: function () {
    const menuBtn = document.querySelector(".btn--menu");
    const menu = document.querySelector(".header__menu");
    menuBtn.addEventListener("click", function (e) {
      e.preventDefault();
      menu.classList.toggle("header__menu--show");
    });
  },
  scrollDown: function () {
    const header = document.querySelector(".header");
    const headerLogo = document.querySelector(".header__logo");
    const btnToTop = document.querySelector(".btn--toTop");
    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        header.classList.add("header--scrollDown");
        headerLogo.classList.add("header__logo--small");
        btnToTop.classList.add("btn--visible");
      } else {
        header.classList.remove("header--scrollDown");
        headerLogo.classList.remove("header__logo--small");
        btnToTop.classList.remove("btn--visible");
      }
    });
  },
  sectionsHeight: function () {
    let temp = 0;
    let sections = Array.from(document.querySelectorAll("section")).map(
      function (cur) {
        cur = cur.getBoundingClientRect().height;
        temp += cur;
        return temp;
      }
    );
    return sections;
  },
  scrollTo: function () {
    const headerMenuLinks = document.querySelectorAll(
      ".header__menu-item--link"
    );

    const sectionsName = ["portfolio", "about", "contact"];

    const scrollAction = (e) => {
      let sections = this.sectionsHeight();
      let index = sectionsName.indexOf(e.target.textContent);
      window.scrollTo({
        top: sections[index] - 75,
        behavior: "smooth",
      });
    };
    for (link of headerMenuLinks) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const menu = document.querySelector(".header__menu");
        if (menu.classList.contains("header__menu--show")) {
          menu.classList.remove("header__menu--show");
          setTimeout(() => {
            scrollAction(e);
          }, 400);
        } else {
          scrollAction(e);
        }
      });
    }
  },
  scrollActive: function () {
    // header__menu-item--highlight

    let menuLinks = document.querySelectorAll(".header__menu-item--link");
    for (let i = 0; i < 3; i++) {
      window.addEventListener("scroll", () => {
        let sections = this.sectionsHeight();

        if (
          window.scrollY >= sections[i] - 76 &&
          window.scrollY <= sections[i + 1] - 76
        ) {
          menuLinks[i].classList.add("header__menu-item--highlight");
        } else {
          menuLinks[i].classList.remove("header__menu-item--highlight");
        }
      });
    }
  },
};

modal = {
  init: function () {
    this.toggleModal();
  },
  toggleModal: function () {
    const btnShowModals = document.querySelectorAll(".btn--openModal");
    const modal = document.querySelector(".modal");
    const body = document.querySelector("body");
    const modalContent = document.querySelector(".modal__content");

    for (let i = 0; i < btnShowModals.length; i++) {
      btnShowModals[i].addEventListener("click", () => {
        modal.classList.add("modal--show");
        body.classList.add("body--noScroll");
      });
    }
    const btnCloseModals = document.querySelectorAll(".btn--close");
    closeModal = () => {
      modal.classList.remove("modal--show");
      body.classList.remove("body--noScroll");
    };
    for (let i = 0; i < btnCloseModals.length; i++) {
      btnCloseModals[i].addEventListener("click", closeModal);
    }
    modal.addEventListener("click", closeModal);

    modalContent.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  },
};

navigation.init();
modal.init();
