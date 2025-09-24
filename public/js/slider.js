document.addEventListener("DOMContentLoaded", function () {
  initializeCraneSliders();
  initializeDetailSliders();
});

function initializeCraneSliders() {
  const craneSwipers = document.querySelectorAll(".crane-swiper");

  craneSwipers.forEach((swiper) => {
    new Swiper(swiper, {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: swiper.querySelector(".swiper-pagination"),
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: swiper.querySelector(".swiper-button-next"),
        prevEl: swiper.querySelector(".swiper-button-prev"),
      },
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      on: {
        init: function () {
          if (this.el && this.el.classList) {
            this.el.classList.add("loaded");
          }
        },
      },
    });
  });
}

function initializeDetailSliders() {
  const detailSwipers = document.querySelectorAll(
    ".crane-detail-swiper, .platform-detail-swiper, .forklift-detail-swiper"
  );

  detailSwipers.forEach((swiper) => {
    const mainSwiper = new Swiper(swiper, {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: swiper.querySelector(".swiper-pagination"),
        clickable: true,
        dynamicBullets: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
      },
      navigation: {
        nextEl: swiper.querySelector(".swiper-button-next"),
        prevEl: swiper.querySelector(".swiper-button-prev"),
      },
      zoom: {
        maxRatio: 2,
        minRatio: 1,
      },
      on: {
        init: function () {
          if (this.el && this.el.classList) {
            this.el.classList.add("loaded");
          }
          initializeZoom(this);
        },
      },
    });
  });
}

function initializeZoom(swiper) {
  const slides = swiper.slides;

  slides.forEach((slide) => {
    const img = slide.querySelector("img");
    if (img) {
      img.addEventListener("click", function () {
        if (swiper.zoom.scale === 1) {
          swiper.zoom.in();
        } else {
          swiper.zoom.out();
        }
      });

      img.style.cursor = "zoom-in";
    }
  });
}

function pauseSliderOnHover(swiper) {
  const container = swiper.el;

  container.addEventListener("mouseenter", function () {
    swiper.autoplay.stop();
  });

  container.addEventListener("mouseleave", function () {
    swiper.autoplay.start();
  });
}

function initializeThumbnailSlider(mainSwiper, thumbnailSwiper) {
  if (!mainSwiper || !thumbnailSwiper) return;

  const thumbnailSlides = thumbnailSwiper.slides;

  thumbnailSlides.forEach((slide, index) => {
    slide.addEventListener("click", function () {
      mainSwiper.slideTo(index);
    });
  });

  mainSwiper.on("slideChange", function () {
    const activeIndex = this.realIndex;
    thumbnailSlides.forEach((slide) => {
      if (slide && slide.classList) {
        slide.classList.remove("active");
      }
    });
    if (
      thumbnailSlides[activeIndex] &&
      thumbnailSlides[activeIndex].classList
    ) {
      thumbnailSlides[activeIndex].classList.add("active");
    }
  });
}

function createCustomPagination(swiper, customPagination) {
  if (!customPagination) return;

  const totalSlides = swiper.slides.length;
  const paginationHTML = Array.from(
    { length: totalSlides },
    (_, index) =>
      `<button class="custom-pagination-bullet" data-slide="${index}">${
        index + 1
      }</button>`
  ).join("");

  customPagination.innerHTML = paginationHTML;

  const bullets = customPagination.querySelectorAll(
    ".custom-pagination-bullet"
  );

  bullets.forEach((bullet, index) => {
    bullet.addEventListener("click", function () {
      swiper.slideTo(index);
    });
  });

  swiper.on("slideChange", function () {
    bullets.forEach((bullet) => {
      if (bullet && bullet.classList) {
        bullet.classList.remove("active");
      }
    });
    const activeIndex = this.realIndex;
    if (bullets[activeIndex] && bullets[activeIndex].classList) {
      bullets[activeIndex].classList.add("active");
    }
  });
}

function initializeFullscreenSlider(swiper) {
  const container = swiper.el;
  const fullscreenBtn = document.createElement("button");
  fullscreenBtn.className = "btn btn-light fullscreen-btn position-absolute";
  fullscreenBtn.style.cssText =
    "top: 10px; right: 10px; z-index: 10; border-radius: 50%; width: 40px; height: 40px;";
  fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';

  container.appendChild(fullscreenBtn);

  fullscreenBtn.addEventListener("click", function () {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  });

  document.addEventListener("fullscreenchange", function () {
    if (document.fullscreenElement) {
      fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
    } else {
      fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    }
  });
}

function addSliderKeyboardNavigation(swiper) {
  document.addEventListener("keydown", function (e) {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        swiper.slidePrev();
        break;
      case "ArrowRight":
        e.preventDefault();
        swiper.slideNext();
        break;
      case "Escape":
        if (swiper.zoom && swiper.zoom.scale > 1) {
          swiper.zoom.out();
        }
        break;
    }
  });
}

function initializeSliderLazyLoading(swiper) {
  swiper.on("slideChange", function () {
    const activeSlide = this.slides[this.activeIndex];
    const img = activeSlide.querySelector("img[data-src]");

    if (img) {
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
    }
  });
}

function addSliderProgressBar(swiper) {
  const progressBar = document.createElement("div");
  progressBar.className = "swiper-progress-bar";
  progressBar.style.cssText = `
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #ff6b35, #004e89);
    z-index: 10;
    transition: width 0.3s ease;
  `;

  swiper.el.style.position = "relative";
  swiper.el.appendChild(progressBar);

  swiper.on("autoplayTimeLeft", function (swiper, timeLeft, percentage) {
    progressBar.style.width = percentage + "%";
  });
}

function initializeSliderAccessibility(swiper) {
  swiper.el.setAttribute("role", "region");
  swiper.el.setAttribute("aria-label", "Vinç görselleri");

  const slides = swiper.slides;
  slides.forEach((slide, index) => {
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", `${index + 1} / ${slides.length}`);
  });

  const prevBtn = swiper.el.querySelector(".swiper-button-prev");
  const nextBtn = swiper.el.querySelector(".swiper-button-next");

  if (prevBtn) {
    prevBtn.setAttribute("aria-label", "Önceki görsel");
  }

  if (nextBtn) {
    nextBtn.setAttribute("aria-label", "Sonraki görsel");
  }
}
