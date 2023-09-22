window.onload = () => {
  /**
   * check media query
   */
  let isMobile = window.matchMedia("(max-width: 1024px)");
  /**
   * get vh for full height in mobile
   */
  if (isMobile) {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }
  /**
   * home hero cursor position
   */
  const isHomeHero = document.querySelector(".getCursorPosition");
  if (isHomeHero) {
    const documentHalfWidth = document.body.clientWidth / 2;
    document.addEventListener("mousemove", (e) => {
      if (e.clientX <= documentHalfWidth) {
        isHomeHero.classList.add("left-img");
        isHomeHero.classList.remove("right-img");
      } else {
        isHomeHero.classList.remove("left-img");
        isHomeHero.classList.add("right-img");
      }
    });
  }
  /**
   * Filters
   */
  const filtersOpenBtn = document.getElementById("filters-open");
  const filtersAction = document.getElementById("filters-action");
  const filterBox = document.querySelector(".filter-box");
  const clearFilters = document.getElementById("clear-filters");

  if (filtersOpenBtn) {
    const filterBoxHeight = filterBox.offsetHeight;
    //filterBox.style.height = filterBoxHeight + "px";
    filtersOpenBtn.addEventListener("click", () => {
      if (filterBox.classList.contains("open")) {
        // filterBox.style.height = "0px";
        filterBox.classList.remove("open");
        filtersAction.classList.remove("active");
      } else {
        filterBox.classList.add("open");
        filtersAction.classList.add("active");

        //filterBox.style.height = filterBoxHeight +10 + "px";
      }
    });
  }
  if (clearFilters) {
    clearFilters.addEventListener("click", () => {
      let input = document.getElementById("child-age");
      if (input) {
        input.value = 0;
      }
      var filters = document.querySelectorAll(
        '#filters input[type="checkbox"]'
      );
      filters.forEach((item) => {
        return (item.checked = false);
      });
    });
  }

  /**
   * mobile sub-nav
   */

  const allSubnav = document.querySelectorAll(".has-sub-nav");
  if (allSubnav) {
    allSubnav.forEach((el) => {
      el.querySelector("label").addEventListener("click", (e) => {
        e.preventDefault;
        el.querySelector(".sub-nav").classList.add("active");
      });
    });
    allSubnav.forEach((el) => {
      el.querySelector(".sub-nav-back").addEventListener("click", (e) => {
        e.preventDefault;
        if (el.querySelector(".sub-nav").classList.contains("active")) {
          el.querySelector(".sub-nav").classList.remove("active");
        }
      });
    });
  }
  /**
   * logo animation
   */
  const logoPath = document.querySelectorAll(".logo svg path");
  if (logoPath.length > 0) {
    logoPath.forEach((path, index) => {
      setTimeout(() => {
        path.style.opacity = "1";
      }, 50 * (index + 1));
    });
  }
  /**
   * custom select
   */
  const options = document.querySelectorAll(".custom-select li");
  const selectInput = document.querySelector(".custom-select input");
  options.forEach((item) => {
    item.addEventListener("click", () => {
      selectInput.setAttribute("value", item.dataset.value);
    });
  });

  /**
   * body overflow if mobile menu is open
   */
  const openMenu = document.getElementById("open-menu");
  const closeMenu = document.getElementById("close-menu");
  const menu = document.querySelector(".main-menu");
  if (openMenu) {
    openMenu.addEventListener("click", () => {
      menu.classList.add("id-open");
      document.body.classList.add("body-overflow");
    });
  }
  if (closeMenu) {
    closeMenu.addEventListener("click", () => {
      menu.classList.remove("id-open");
      document.body.classList.remove("body-overflow");
    });
  }
  /**
   * sliders
   */
  const addcounter = (swiper) => {
    const curentElement = swiper.el.querySelector(".current");
    const totalElement = swiper.el.querySelector(".total");
    if (curentElement) {
      curentElement.append(addZerotoDigit(Math.ceil(swiper.activeIndex) + 1));
    }
    if (totalElement) {
      totalElement.append(addZerotoDigit(Math.ceil(swiper.slides.length)));
    }
  };
  const fractionCounter = (swiper) => {
    const counter = document.createElement("div");
    counter.classList.add("counter");
    counter.append(
      `${
        Math.ceil(swiper.activeIndex / swiper.params.slidesPerGroup) + 1
      }/${Math.ceil(swiper.slides.length / swiper.params.slidesPerGroup)}`
    );

    if (swiper.pagination.el) {
      swiper.pagination.el.prepend(
        `${Math.ceil(swiper.activeIndex / swiper.params.slidesPerGroup) + 1}`
      );
      swiper.pagination.el.append(
        `${Math.ceil(swiper.slides.length / swiper.params.slidesPerGroup)}`
      );
    }
    const curentElement = swiper.el.querySelector(".current");
    const totalElement = swiper.el.querySelector(".total");
    if (curentElement) {
      curentElement.append(
        addZerotoDigit(
          Math.ceil(swiper.activeIndex / swiper.params.slidesPerGroup) + 1
        )
      );
    }
    if (totalElement) {
      totalElement.append(
        addZerotoDigit(
          Math.ceil(swiper.slides.length / swiper.params.slidesPerGroup)
        )
      );
    }
  };
  if (typeof Swiper !== "undefined") {
    const blogRollSwiper = new Swiper(".blog-roll-swiper", {
      slidesPerView: 1,
      spaceBetween: 40,
      speed: 1000,
      autoplay: {
        delay: 3000,
      },
      navigation: {
        nextEl: ".nav-next",
        prevEl: ".nav-prev",
      },
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
        draggable: true,
      },
      on: {
        init: function (swiper) {
          fractionCounter(swiper);
        },
        slideChange: function (swiper) {
          const curentElement = swiper.el.querySelector(".current");
          const totalElement = swiper.el.querySelector(".total");
          if (curentElement) {
            curentElement.innerHTML = addZerotoDigit(
              Math.ceil(swiper.activeIndex / swiper.params.slidesPerGroup) + 1
            );
          }
          if (totalElement) {
            totalElement.innerHTML = addZerotoDigit(
              Math.ceil(swiper.slides.length / swiper.params.slidesPerGroup)
            );
          }
        },
      },
      breakpoints: {
        760: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        1024: { slidesPerView: 3, slidesPerGroup: 3 },
      },
    });
    const videoSwiper = new Swiper(".video-swiper", {
      slidesPerView: 1,
      speed: 1000,
      spaceBetween: 16,
      navigation: {
        nextEl: ".nav-next",
        prevEl: ".nav-prev",
      },
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
        draggable: true,
      },

      on: {
        init: function (swiper) {
          addcounter(swiper);
        },
        slideChange: function (swiper) {
          const curentElement = swiper.el.querySelector(".current");
          const totalElement = swiper.el.querySelector(".total");
          if (curentElement) {
            curentElement.innerHTML = addZerotoDigit(
              Math.ceil(swiper.activeIndex) + 1
            );
          }
          if (totalElement) {
            totalElement.innerHTML = addZerotoDigit(
              Math.ceil(swiper.slides.length)
            );
          }
        },
      },
    });
    const productsSwiper = new Swiper(".products-swiper", {
      slidesPerView: 1,
      speed: 1000,
      navigation: {
        nextEl: ".nav-next",
        prevEl: ".nav-prev",
      },
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
        draggable: true,
      },

      on: {
        init: function (swiper) {
          fractionCounter(swiper);
        },
        slideChange: function (swiper) {
          const curentElement = swiper.el.querySelector(".current");
          const totalElement = swiper.el.querySelector(".total");
          if (curentElement) {
            curentElement.innerHTML = addZerotoDigit(
              Math.ceil(swiper.activeIndex / swiper.params.slidesPerGroup) + 1
            );
          }
          if (totalElement) {
            totalElement.innerHTML = addZerotoDigit(
              Math.ceil(swiper.slides.length / swiper.params.slidesPerGroup)
            );
          }
        },
      },
    });
    const referencesSwiper = new Swiper(".references-swiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 1000,
      autoplay: {
        delay: 3000,
      },
      navigation: {
        nextEl: ".nav-next",
        prevEl: ".nav-prev",
      },
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
        draggable: true,
      },

      on: {
        init: function (swiper) {
          fractionCounter(swiper);
        },
        slideChange: function (swiper) {
          const curentElement = swiper.el.querySelector(".current");
          const totalElement = swiper.el.querySelector(".total");
          if (curentElement) {
            curentElement.innerHTML = addZerotoDigit(
              Math.ceil(swiper.activeIndex / swiper.params.slidesPerGroup) + 1
            );
          }
          if (totalElement) {
            totalElement.innerHTML = addZerotoDigit(
              Math.ceil(swiper.slides.length / swiper.params.slidesPerGroup)
            );
          }
        },
      },
      breakpoints: {
        760: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
      },
    });
    const homeSwiper = new Swiper(".home-swiper", {
      slidesPerView: 1,
      pagination: {
        enabled: true,
        el: ".swiper-pagination",
        clickable: true,
        type: "custom",
        renderCustom: function (swiper, current, total) {
          let currentDigit = current < 10 ? "0" + current : current;
          let totalDigit = total < 10 ? "0" + total : total;
          return (
            "<span >" +
            currentDigit +
            " / " +
            totalDigit +
            ' <span class="ml-8">Lorem ipsum dolor sit amet</span> </span>'
          );
        },
      },
      speed: 1000,
      autoplay: {
        delay: 4000,
      },   
    });
    const packshotSwiper = new Swiper(".packshot-swiper", {
      slidesPerView: 1,
      speed: 1000,
      autoplay: {
        delay: 4500,
      },
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
        draggable: true,
      },

      on: {
        init: function (swiper) {
          fractionCounter(swiper);
        },
        slideChange: function (swiper) {
          const curentElement = swiper.el.querySelector(".current");
          const totalElement = swiper.el.querySelector(".total");
          if (curentElement) {
            curentElement.innerHTML = addZerotoDigit(
              Math.ceil(swiper.activeIndex / swiper.params.slidesPerGroup) + 1
            );
          }
          if (totalElement) {
            totalElement.innerHTML = addZerotoDigit(
              Math.ceil(swiper.slides.length / swiper.params.slidesPerGroup)
            );
          }
        },
      },
    });
    const timelineSwiper = new Swiper(".timeLine-swiper", {
      slidesPerView: 1,
      spaceBetween: 64,
      navigation: {
        nextEl: ".nav-next",
        prevEl: ".nav-prev",
      },
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
        draggable: true,
      },

      breakpoints: {
        760: {
          slidesPerView: 2,
        },
        1024: { slidesPerView: 3 },
      },
    });
    const brandsSwiper = new Swiper(".brand-swiper", {
      slidesPerView: 1,
      spaceBetween: 64,
      navigation: {
        nextEl: ".nav-next",
        prevEl: ".nav-prev",
      },
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
        draggable: true,
      },

      on: {
        init: function (swiper) {
          fractionCounter(swiper);
        },
        slideChange: function (swiper) {
          const curentElement = swiper.el.querySelector(".current");
          const totalElement = swiper.el.querySelector(".total");
          if (curentElement) {
            curentElement.innerHTML = addZerotoDigit(
              Math.ceil(swiper.activeIndex / swiper.params.slidesPerGroup) + 1
            );
          }
          if (totalElement) {
            totalElement.innerHTML = addZerotoDigit(
              Math.ceil(swiper.slides.length / swiper.params.slidesPerGroup)
            );
          }
        },
      },
      breakpoints: {
        760: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        1024: { slidesPerView: 3, slidesPerGroup: 3 },
      },
    });
  }

  const categoryNavBtns = document.querySelectorAll(".faq-category-nav button");
  const categoryItems = document.querySelectorAll(".category-item");
  if (categoryNavBtns && categoryItems) {
    categoryNavBtns.forEach((item, index) => {
      item.addEventListener("click", () => {
        categoryNavBtns.forEach((item) => item.classList.remove("active"));
        categoryItems.forEach((item) => item.classList.remove("active"));
        item.classList.add("active");
        categoryItems[index].classList.add("active");
      });
    });
  }

  /**
   * sticky header
   */
  const header = document.getElementById("header");
  const sticky = 68; //mobile header hight

  const stickyHeader = (target) => {
    var topDistance = 0;
    if (target > sticky) {
      header.classList.add("isFixed");
      header.style.top = `-${topDistance}`;
    } else {
      header.classList.remove("isFixed");
      header.style.top = `-${target}px`;
      topDistance = target;
    }
  };

  function headerHandler() {
    if (window.scrollY > sticky * 2) {
      header.classList.add("isFixed");
    }
    window.onscroll = function () {
      stickyHeader(window.scrollY);
    };
  }
  headerHandler();

  window.addEventListener("resize", () => {
    if (isMobile.matches) {
      headerHandler();
    }
  });
  /**
   * Intersection Observer
   */
  let observerOptions = {
    threshold: 0.25,
  };
  let callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio >= 0.1) {
        entry.target.classList.add("is_visible");
      } else {
        entry.target.classList.remove("is_visible");
      }
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
      }
    });
  };
  let observer = new IntersectionObserver(callback, observerOptions);
  const inViews = document.querySelectorAll(".inView");
  if (inViews.length > 0) {
    inViews.forEach((inView) => {
      observer.observe(inView);
    });
  }

  let counterTargets = document.querySelectorAll(".counterUp");

  let observerCounter = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is_visible");
        setTimeout(() => {
          letCount();
        }, 1000);
      }
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
      }
    });
  });

  if (counterTargets.length > 0) {
    counterTargets.forEach((target) => {
      observerCounter.observe(target);
    });
  }

  /**
   * video playeer
   */
  var playButton = document.getElementById("play_button");
  // Event listener for the play/pause button
  var video = document.getElementById("video");

  playButton &&
    playButton.addEventListener("click", function () {
      video.play();
      video.setAttribute("controls", "");
      playButton.style.display = "none";
    });
};

/** add 0 befor digit */
function addZerotoDigit(number) {
  return number < 10 ? "0" + number : number;
}
