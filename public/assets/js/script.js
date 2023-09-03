window.onload = () => {
/**
 * simple tabs
 */
const tabNav = document.querySelectorAll(".tab-nav");
  const tabItems = document.querySelectorAll(".tab-item");
  tabNav &&
    tabNav.forEach((el, index) => {
      el.addEventListener("click", function (event) {
        tabNav.forEach((item) => item.classList.remove("active"));
        tabItems.forEach((item) => item.classList.remove("active"));
        tabNav[index].classList.add("active");
        tabItems[index].classList.add("active");
      });
    });
  /**
   * reveal on hover
   */
  const items = document.querySelectorAll('.reveal-container')
  if(items){
    items.forEach((el) => {
      const image = el.querySelector('img')
      const imageWidth = image.offsetWidth/2;
      el.addEventListener('mousemove', (e) => {
          gsap.to(image, {
            x:(e.pageX - el.getBoundingClientRect().left - imageWidth + 60),
            y:e.pageY - (window.scrollY + el.getBoundingClientRect().top + 13),
            duration: 1,
            onStart: function(){
              gsap.to(this.targets()[0], {
                filter: `brightness(1.15)`,
                duration: 0.5,
                rotation: function(){
                  if(e.movementX > 0){
                   return  -1
                  }else if(e.movementX < 0){
                    return 1
                  }
                },
              })
            },
            onComplete: function(){
              gsap.to(this.targets()[0], {
                filter: `brightness(1)`,
                duration: 0.5,
                rotation: 0,
              })
            }
          })
      })
    })
  }
 
  /**
   * mobile sub-nav
   */

  const allSubnav = document.querySelectorAll('.has-sub-nav');
  if(allSubnav){
    allSubnav.forEach(el=>{
      el.querySelector('label').addEventListener('click', (e)=>{
        e.preventDefault;
        el.querySelector('.sub-nav').classList.add('active');
      })
      
    })
   allSubnav.forEach(el=>{
      el.querySelector('.sub-nav-back').addEventListener('click',(e)=>{
        e.preventDefault;
        if( el.querySelector('.sub-nav').classList.contains('active')){
          el.querySelector('.sub-nav').classList.remove('active')
        }
        
              })
   
    })

  }
  /**
   * check media query
   */
  let isMobile = window.matchMedia("(max-width: 1024px)");
  /**
   * Search Bar
   */
  const openSearchBarDesctop = document.getElementById("openSearchBar-desktop");
  const searchBar = document.getElementById("searchBar");
  const closeSearch = document.querySelector(".close-search");
  const openSearchBarMobile = document.getElementById("openSearchBar-mobile");

  if (openSearchBarDesctop && searchBar && closeSearch) {
    openSearchBarDesctop.addEventListener("click", () => {
      if (!searchBar.classList.contains("open")) {
        searchBar.classList.add("open");
      }
    });
    closeSearch.addEventListener("click", () => {
      if (searchBar.classList.contains("open")) {
        searchBar.classList.remove("open");
      }
    });
  }
  if (openSearchBarMobile && searchBar && closeSearch) {
    openSearchBarMobile.addEventListener("click", () => {
      if (!searchBar.classList.contains("open")) {
        searchBar.classList.add("open");
      }
    });
    closeSearch.addEventListener("click", () => {
      if (searchBar.classList.contains("open")) {
        searchBar.classList.remove("open");
      }
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
    const counter = document.createElement("div");
    counter.classList.add("counter");
    counter.append(`${swiper.activeIndex + 1}/${swiper.slides.length}`);
    if (swiper.pagination.el) {
      swiper.pagination.el.prepend(`${swiper.activeIndex + 1}`);
      swiper.pagination.el.append(`${swiper.slides.length}`)
    }
  };
  const fractionCounter = (swiper) =>{
    const counter = document.createElement("div");
    counter.classList.add("counter");
    counter.append(`${Math.ceil(swiper.activeIndex/swiper.params.slidesPerGroup) + 1}/${
      Math.ceil(swiper.slides.length/swiper.params.slidesPerGroup)
    }`);
    if (swiper.pagination.el) {
      swiper.pagination.el.prepend(`${Math.ceil(swiper.activeIndex/swiper.params.slidesPerGroup) + 1}`);
      swiper.pagination.el.append(`${Math.ceil(swiper.slides.length/swiper.params.slidesPerGroup)}`)
    }
  }
  if (typeof Swiper !== "undefined") {
    const whyUsSwiper = new Swiper(".whyus-swiper", {
      slidesPerView: 1,
      spaceBetween: 16,
      pagination: {
        enabled: true,
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '"></span>';
        },
      },
      navigation: {
        nextEl: ".nav-next",
        prevEl: ".nav-prev",
      },
      on: {
        init: function (swiper) {
          fractionCounter(swiper);
        },
        slideChange: function (swiper) {
          const counter = swiper.pagination.el.querySelector(".counter");
          counter.innerHTML = `${Math.ceil(swiper.activeIndex/swiper.params.slidesPerGroup) + 1}/${
            Math.ceil(swiper.slides.length/swiper.params.slidesPerGroup)
          }`;
        },
        breakpoint: (swiper, params) => {
          swiper.el
            .querySelector(".swiper-pagination")
            .classList.remove("swiper-pagination-disabled");
          swiper.el
            .querySelector(".swiper-pagination")
            .classList.add("swiper-pagination-bullets");
          swiper.el
            .querySelector(".swiper-pagination")
            .classList.add("swiper-pagination-horizontal");
          if (swiper.el.querySelector(".swiper-pagination")) {
            swiper.el
              .querySelector(".swiper-pagination")
              .append(`<div>1/3</div>`);
            //addcounter(swiper);
          }
        },
      },
      breakpoints: {
        760: {
          slidesPerView: 2, slidesPerGroup: 2
        },
        1024: { slidesPerView: 3, slidesPerGroup: 3 },
      },
    });

    const blogRollSwiper = new Swiper(".blog-roll-swiper", {
      slidesPerView: 1,
      spaceBetween: 40,
      speed: 1000,
      autoplay: {
        delay: 3000,
      },
      pagination: {
        enabled: true,
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '"></span>';
        }, 
        
      },
      navigation: {
        nextEl: ".nav-next",
        prevEl: ".nav-prev",
      },
      on: {
        init: function (swiper) {
          fractionCounter(swiper);
        },
        slideChange: function (swiper) {
          const counter = swiper.pagination.el.querySelector(".counter");
          counter.innerHTML = `${Math.ceil(swiper.activeIndex/swiper.params.slidesPerGroup) + 1}/${
            Math.ceil(swiper.slides.length/swiper.params.slidesPerGroup)
          }`;
        },
      },
      breakpoints: {
        760: {
          slidesPerView: 2,slidesPerGroup: 2
        },
        1024: { slidesPerView: 3, slidesPerGroup: 3 },
      },
    });

    const blogRollCategorySwiper = new Swiper(".blog-category-swiper", {
      slidesPerView: 1,
      spaceBetween: 16,
      pagination: {
        enabled: true,
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '"></span>';
        },
      },
      navigation: {
        nextEl: ".nav-next",
        prevEl: ".nav-prev",
      },
      on: {
        init: function (swiper) {
          fractionCounter(swiper);
        },
        slideChange: function (swiper) {
          const counter = swiper.pagination.el.querySelector(".counter");
          counter.innerHTML = `${Math.ceil(swiper.activeIndex/swiper.params.slidesPerGroup) + 1}/${
            Math.ceil(swiper.slides.length/swiper.params.slidesPerGroup)
          }`;
        },
      },
      breakpoints: {
        760: {
          slidesPerView: 2, slidesPerGroup: 2
        },
        1024: { slidesPerView: 3, slidesPerGroup: 3 },
      },
    });
    const videoSwiper = new Swiper(".video-swiper", {
      slidesPerView: 1,
      spaceBetween: 16,
      pagination: {
        enabled: true,
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '"></span> ';
        },
      },
      navigation: {
        nextEl: ".nav-next",
        prevEl: ".nav-prev",
      },
      on: {
        init: function (swiper) {
          //addcounter(swiper);
        },
        /* slideChange: function (swiper) {
          const counter = swiper.pagination.el.querySelector(".counter");
          counter.innerHTML = `${swiper.activeIndex + 1}/${
            swiper.slides.length
          }`;
        }, */
      },
    });
    const productsSwiper = new Swiper(".products-swiper", {
      slidesPerView: 1,
      spaceBetween: 40,
      pagination: {
        enabled: true,
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '"></span>';
        },
      },
      navigation: {
        nextEl: ".nav-next",
        prevEl: ".nav-prev",
      },
      on: {
        init: function (swiper) {
          fractionCounter(swiper);
        },
        slideChange: function (swiper) {
          const counter = swiper.pagination.el.querySelector(".counter");
          counter.innerHTML = `${Math.ceil(swiper.activeIndex/swiper.params.slidesPerGroup) + 1}/${
            Math.ceil(swiper.slides.length/swiper.params.slidesPerGroup)
          }`;
        },
      },
      breakpoints: {
        760: {
          slidesPerView: 2, slidesPerGroup: 2
        },
        1024: { slidesPerView: 3, slidesPerGroup: 3 },
      },
    });
    const referencesSwiper = new Swiper(".references-swiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        enabled: true,
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '"></span>';
        },
      },
      navigation: {
        nextEl: ".nav-next",
        prevEl: ".nav-prev",
      },
      on: {
        init: function (swiper) {
          fractionCounter(swiper);
        },
        slideChange: function (swiper) {
          const counter = swiper.pagination.el.querySelector(".counter");
          counter.innerHTML = `${(swiper.activeIndex/swiper.params.slidesPerGroup) + 1}/${
            swiper.slides.length/swiper.params.slidesPerGroup
          }`;
        },
      },
      breakpoints: {
        760: {
          slidesPerView: 2, slidesPerGroup: 2
        },
      },
    });
    const homeSwiper = new Swiper(".home-swiper", {
      slidesPerView: 1,
      /* effect: "creative",
      creativeEffect: {
        prev: {
          translate: ["-100%", 0, -1],
        },
        next: {
          translate: ["100%", 0, 0],
        },
      }, */
      pagination: {
        //horizontalClass: "swiper-pagination-horizontal",
        enabled: true,
        el: ".swiper-pagination",
        clickable: true,
        type: "custom",
       /*  formatFractionCurrent: function (number) {
          return number > 9 ? number : '0' + number;
      },
      formatFractionTotal: function (number) {
        return number > 9 ? number : '0' + number;
      } */
      renderCustom: function (swiper, current, total) {
        let currentDigit = current < 10 ? '0'+ current :  current;
        let totalDigit = total < 10 ? '0'+ total : total;
        return '<span >'+ currentDigit +
                ' / ' +
                 totalDigit + ' <span class="ml-8">Lorem ipsum dolor sit amet</span> </span>';
    }
      },
      breakpoints: {
        1024: {
          /* creativeEffect: {
            prev: {
              translate: [0, "-100%", -1],
            },
            next: {
              translate: [0, "100%", 0],
            },
          }, */

          allowTouchMove: true,
        },
      },
      /* speed: 1000,
      autoplay: {
        delay: 3000,
      }, */
      on: {
        /* init: function (swiper) {
          addcounter(swiper);
          if (!isMobile) {
            let imgHeight = document.querySelector(
              ".home-swiper .swiper-slide img"
            ).offsetHeight;
            let bottomDistance = imgHeight / 2 + 32;
            document.querySelector(
              ".home-swiper .slider-navigation"
            ).style.bottom = "calc(50% - " + bottomDistance + "px)";
          }
        },
        resize: function (swiper) {
          if (!isMobile) {
            let imgHeight = document.querySelector(
              ".home-swiper .swiper-slide img"
            ).offsetHeight;
            let bottomDistance = imgHeight / 2 + 32;
            document.querySelector(
              ".home-swiper .slider-navigation"
            ).style.bottom = "calc(50% - " + bottomDistance + "px)";
          }
        },
        slideChange: function (swiper) {
          const counter = swiper.pagination.el.querySelector(".counter");
          counter.innerHTML = `${swiper.activeIndex + 1}/${
            swiper.slides.length
          }`;
        }, */
      },
    });
    const packshotSwiper = new Swiper(".packshot-swiper", {
      slidesPerView: 1,
      /* effect: "creative",
      creativeEffect: {
        prev: {
          translate: ["-100%", 0, -1],
        },
        next: {
          translate: ["100%", 0, 0],
        },
      }, */
      direction: "vertical",

      pagination: {
        //horizontalClass: "swiper-pagination-horizontal",
        enabled: true,
        el: ".swiper-pagination",
        clickable: true,
        type: "custom",
       /*  formatFractionCurrent: function (number) {
          return number > 9 ? number : '0' + number;
      },
      formatFractionTotal: function (number) {
        return number > 9 ? number : '0' + number;
      } */
      renderCustom: function (swiper, current, total) {
        let currentDigit = current < 10 ? '0'+ current :  current;
        let totalDigit = total < 10 ? '0'+ total : total;
        return '<span >'+ currentDigit +
                ' / ' +
                 totalDigit + ' <span class="ml-8">Lorem ipsum dolor sit amet</span> </span>';
    }
      },
      breakpoints: {
        1024: {
          /* creativeEffect: {
            prev: {
              translate: [0, "-100%", -1],
            },
            next: {
              translate: [0, "100%", 0],
            },
          }, */

          allowTouchMove: true,
        },
      },
      /* speed: 1000,
      autoplay: {
        delay: 3000,
      }, */
      on: {
        /* init: function (swiper) {
          addcounter(swiper);
          if (!isMobile) {
            let imgHeight = document.querySelector(
              ".home-swiper .swiper-slide img"
            ).offsetHeight;
            let bottomDistance = imgHeight / 2 + 32;
            document.querySelector(
              ".home-swiper .slider-navigation"
            ).style.bottom = "calc(50% - " + bottomDistance + "px)";
          }
        },
        resize: function (swiper) {
          if (!isMobile) {
            let imgHeight = document.querySelector(
              ".home-swiper .swiper-slide img"
            ).offsetHeight;
            let bottomDistance = imgHeight / 2 + 32;
            document.querySelector(
              ".home-swiper .slider-navigation"
            ).style.bottom = "calc(50% - " + bottomDistance + "px)";
          }
        },
        slideChange: function (swiper) {
          const counter = swiper.pagination.el.querySelector(".counter");
          counter.innerHTML = `${swiper.activeIndex + 1}/${
            swiper.slides.length
          }`;
        }, */
      },
    });
    const brandsSwiper = new Swiper(".brand-swiper", {
      slidesPerView: 1,
      spaceBetween: 64,
      pagination: {
        enabled: true,
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '"></span>';
        },
      },
      navigation: {
        nextEl: ".nav-next",
        prevEl: ".nav-prev",
      },
      on: {
        init: function (swiper) {
          //fractionCounter(swiper);
        },
        /* slideChange: function (swiper) {
          const counter = swiper.pagination.el.querySelector(".counter");
          counter.innerHTML = `${Math.ceil(swiper.activeIndex/swiper.params.slidesPerGroup) + 1}/${
            Math.ceil(swiper.slides.length/swiper.params.slidesPerGroup)
          }`;
        }, */
      },
      breakpoints: {
        760: {
          slidesPerView: 2, 
        },
        1024: {
          slidesPerView: 3, 
        },
      },
    });
    let $lgSwiper = document.getElementById("lg-swipper");
    const serviceImgSwiper = new Swiper(".service-img-swiper", {
      slidesPerView: 1,
      spaceBetween: 32,

      navigation: {
        nextEl: ".service-img-next",
        prevEl: ".service-img-prev",
      },

      breakpoints: {
        760: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
      on: {
        init: function (swiper) {
          const lg = lightGallery($lgSwiper, {
            download: false,
          });

          // Before closing lightGallery, make sure swiper slide
          // is aligned with the lightGallery active slide
          $lgSwiper.addEventListener("lgBeforeClose", () => {
            swiper.slideTo(lg.index, 0);
          });
        },
      },
    });
    const tabSwiperTitles = [
      "Cass aptent nostra lorem",
      "Cass aptent nostra lorem",
      "Cass aptent nostra lorem",
    ];
    const tabSwiper = new Swiper(".tab-swiper", {
      slidesPerView: 1,
      spaceBetween: 32,
      pauseOnMouseEnter: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      speed: 1000,
      autoplay: {
        delay: 3000,
        disableOnInteraction: true,
      },
      pagination: {
        enabled: true,
        el: ".tab-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return `<button class="${className}">
            <span class="victorserif">${index < 10 && "0"}${index + 1}</span>
            ${tabSwiperTitles[index]} 
          </button>`;
        },
      },
    });
    const tabPagination = document.querySelector(".tab-pagination");
    if (tabPagination && tabSwiper) {
      /* tabPagination.addEventListener("mouseleave", () => {
        tabSwiper.autoplay.start();
      }); */
      tabPagination.addEventListener("mouseenter", () => {
        tabSwiper.autoplay.stop();
      });
    }
    const choiceSwiper = new Swiper(".swiper-choice", {
      slidesPerView: 1,
      speed: 2000,
      spaceBetween: 32,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: true,
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

  const languagePL = {
    days: [
      "Niedziela",
      "Poniedziałek",
      "Wtorek",
      "Środa",
      "Czwartek",
      "Piątek",
      "Sobota",
    ],
    daysShort: ["Nie", "Pon", "Wto", "Śro", "Czw", "Pią", "Sob"],
    daysMin: ["Nd", "Pn", "Wt", "Śr", "Czw", "Pt", "So"],
    months: [
      "Styczeń",
      "Luty",
      "Marzec",
      "Kwiecień",
      "Maj",
      "Czerwiec",
      "Lipiec",
      "Sierpień",
      "Wrzesień",
      "Październik",
      "Listopad",
      "Grudzień",
    ],
    monthsShort: [
      "Sty",
      "Lut",
      "Mar",
      "Kwi",
      "Maj",
      "Cze",
      "Lip",
      "Sie",
      "Wrz",
      "Paź",
      "Lis",
      "Gru",
    ],
    today: "Dzisiaj",
    clear: "Wyczyść",
    dateFormat: "yyyy-MM-dd",
    timeFormat: "hh:mm:aa",
    firstDay: 1,
  };

  let month = {
    content: "Miesiąc",
    className: "month",
    onClick: (datePicker) => {
      datePicker.setCurrentView("months");
    },
  };
  let day = {
    content: "Dzień",
    className: "day",
    onClick: (datePicker) => {
      datePicker.setCurrentView("days");
    },
  };
  let year = {
    content: "Rok",
    className: "year",
    onClick: (datePicker) => {
      datePicker.setCurrentView("years");
    },
  };
  const dateInput = document.getElementById("get-date");

  if (typeof AirDatepicker != "undefined") {
    const datePicker = new AirDatepicker("#get-date", {
      locale: languagePL,
      dateFormat: "dd/MM/yyyy",
      buttons: [year, month, day],
      isMobile: true,
      autoClose: true,
      prevHtml: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.8332 15.5L3.68654 8.35333C3.6401 8.30696 3.60326 8.25188 3.57812 8.19125C3.55298 8.13062 3.54004 8.06563 3.54004 8C3.54004 7.93437 3.55298 7.86938 3.57812 7.80875C3.60326 7.74812 3.6401 7.69304 3.68654 7.64667L10.8332 0.5" stroke="#750843" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      nextHtml: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_351_1620)">
      <path d="M5.16679 0.5L12.3135 7.64667C12.3599 7.69304 12.3967 7.74812 12.4219 7.80875C12.447 7.86938 12.46 7.93437 12.46 8C12.46 8.06563 12.447 8.13062 12.4219 8.19125C12.3967 8.25188 12.3599 8.30696 12.3135 8.35333L5.16679 15.5" stroke="#750843" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <defs>
      <clipPath id="clip0_351_1620">
      <rect width="16" height="16" fill="white" transform="translate(16 16) rotate(180)"/>
      </clipPath>
      </defs>
      </svg>
      `,
      //inline: true,
      onSelect: ({ date, formattedDate }) => {
        dateInput.setAttribute("value", formattedDate);
      },
      onShow: () => {
        document.body.classList.add("body-overflow");
      },
      onHide: () => {
        document.body.classList.remove("body-overflow");
      },
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

  /**chart scripts */
  if (typeof ApexCharts !== "undefined") {
    const pieOptions = {
      chart: {
        type: "donut",
      },

      series: [50, 30, 15, 5],
      labels: ["Piotr", "Marek", "Jan", "inni"],
      theme: {
        monochrome: {
          enabled: true,
          color: "#750843",
          shadeTo: "light",
          shadeIntensity: 0.65,
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: "45%",
          },
          distributed: true,
          horizontal: false,
          dataLabels: {
            show: false,
            position: "top",
          },
        },
      },
      states: {
        hover: {
          filter: {
            type: "none",
            value: 0,
          },
        },
      },
      tooltip: {
        enabled: false,
      },
      dataLabels: {
        enabled: false,
        /* dropShadow: {
          enabled: false,
        },
        style: {
          colors: ["#000"],
          fontSize: ["16px"],
          fontFamily: "Montserrat, sans-serif",
          fontWeight: "600",
        },
        formatter(val, opts) {
          const pieValue = opts.w.globals.series[opts.seriesIndex];
          return pieValue + "%";
        }, */
      },
      stroke: {
        show: false,
      },
      legend: {
        show: true,
        position: "right",
        horizontalAlign: "center",
        colors: ["#000"],
        fontSize: ["22px"],
        fontFamily: "Lagu Sans, sans-serif",
        fontWeight: "500",
        position: "right",

        formatter(seriesName, opts) {
          const name = opts.w.globals.initialSeries[opts.seriesIndex];
          return [seriesName];
        },
      },
      responsive: [
        {
          breakpoint: 1024,

          options: {
            chart: {
              height: "450px",
            },
            legend: {
              floating: true,
              position: "top",
              horizontalAlign: "left",
              fontSize: ["18px"],
            },
            plotOptions: {
              pie: {
                customScale: 0.7,
                offsetY: 120,
              },
            },
            dataLabels: {
              offsetY: 30,
            },
          },
        },
      ],
    };
    const pieChart = new ApexCharts(
      document.querySelector("#pie-chart"),
      pieOptions
    );
    pieChart.render();
  }
};

/**
 * counter animation
 */

function letCount() {
  const counters = document.querySelectorAll(".counterUp");
  const speed = 100; // The lower the slower

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;

      // Lower inc to slow and higher to slow

      const inc = target > speed ? target / speed : 1;

      // Check if target is reached
      if (count < target) {
        // Add inc to count and output in counter
        counter.innerText = Math.round(count + inc);
        // Call function every ms
        setTimeout(updateCount, 50);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });


}



