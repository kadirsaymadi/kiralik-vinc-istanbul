// Version: 1.0.8 - Menu debug and CSS fixes
document.addEventListener("DOMContentLoaded", function () {
  // Service Worker'ı tamamen temizle
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (let registration of registrations) {
        registration.unregister();
      }
    });
  }

  initializeAnimations();
  initializeSmoothScrolling();
  initializeFormValidation();
  initializeContactActions();
  initializeLazyLoading();
  initializeMenu();
  initializeScrollToTop();
});

function initializeAnimations() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }
}

function initializeSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

function initializeFormValidation() {
  const forms = document.querySelectorAll(".cta-form");

  forms.forEach((form) => {
    const submitBtn = form.querySelector(
      'button[type="submit"], button:last-child'
    );
    if (submitBtn) {
      submitBtn.addEventListener("click", function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        const formInputs = form.querySelectorAll("input, select, textarea");
        let isValid = true;

        formInputs.forEach((input) => {
          if (input.hasAttribute("required") && !input.value.trim()) {
            isValid = false;
            if (input.classList) {
              input.classList.add("is-invalid");
            }
          } else {
            if (input.classList) {
              input.classList.remove("is-invalid");
            }
          }
        });

        if (isValid) {
          showSuccessMessage();
          form.reset();
        } else {
          showErrorMessage("Lütfen tüm gerekli alanları doldurun.");
        }
      });
    }
  });
}

function initializeContactActions() {
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

  phoneLinks.forEach((link) => {
    link.addEventListener("click", function () {
      trackEvent("contact", "phone_click");
    });
  });

  emailLinks.forEach((link) => {
    link.addEventListener("click", function () {
      trackEvent("contact", "email_click");
    });
  });
}

function initializeLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src;
          if (img.classList) {
            img.classList.remove("loading");
          }
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }
}

function showSuccessMessage() {
  const alertDiv = document.createElement("div");
  alertDiv.className =
    "alert alert-success alert-dismissible fade show position-fixed";
  alertDiv.style.cssText =
    "top: 20px; right: 20px; z-index: 9999; min-width: 300px;";
  alertDiv.innerHTML = `
    <i class="fas fa-check-circle me-2"></i>
    <strong>Başarılı!</strong> Talebiniz alındı. En kısa sürede size dönüş yapacağız.
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;

  document.body.appendChild(alertDiv);

  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.parentNode.removeChild(alertDiv);
    }
  }, 5000);
}

function showErrorMessage(message) {
  const alertDiv = document.createElement("div");
  alertDiv.className =
    "alert alert-danger alert-dismissible fade show position-fixed";
  alertDiv.style.cssText =
    "top: 20px; right: 20px; z-index: 9999; min-width: 300px;";
  alertDiv.innerHTML = `
    <i class="fas fa-exclamation-circle me-2"></i>
    <strong>Hata!</strong> ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;

  document.body.appendChild(alertDiv);

  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.parentNode.removeChild(alertDiv);
    }
  }, 5000);
}

function trackEvent(category, action, label = null) {
  if (typeof gtag !== "undefined") {
    gtag("event", action, {
      event_category: category,
      event_label: label,
    });
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

window.addEventListener("scroll", function () {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollTop > 100) {
    if (document.body && document.body.classList) {
      document.body.classList.add("scrolled");
    }
  } else {
    if (document.body && document.body.classList) {
      document.body.classList.remove("scrolled");
    }
  }

  if (scrollTop + windowHeight >= documentHeight - 100) {
    if (document.body && document.body.classList) {
      document.body.classList.add("at-bottom");
    }
  } else {
    if (document.body && document.body.classList) {
      document.body.classList.remove("at-bottom");
    }
  }
});

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const debouncedScroll = debounce(function () {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > 100) {
    if (!document.querySelector(".back-to-top")) {
      const backToTopBtn = document.createElement("button");
      backToTopBtn.className = "btn btn-warning back-to-top position-fixed";
      backToTopBtn.style.cssText =
        "bottom: 20px; right: 20px; z-index: 999; border-radius: 50%; width: 50px; height: 50px;";
      backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
      backToTopBtn.addEventListener("click", scrollToTop);
      document.body.appendChild(backToTopBtn);
    }
  } else {
    const backToTopBtn = document.querySelector(".back-to-top");
    if (backToTopBtn) {
      backToTopBtn.remove();
    }
  }
}, 100);

window.addEventListener("scroll", debouncedScroll);

function initializeMenu() {
  // Mobile menu toggle
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      navbarCollapse.classList.toggle("show");
    });
  }

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    if (navbarCollapse && navbarCollapse.classList.contains("show")) {
      if (!event.target.closest(".navbar")) {
        navbarCollapse.classList.remove("show");
      }
    }
  });

  // Close menu when clicking on nav links
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (navbarCollapse) {
        navbarCollapse.classList.remove("show");
      }
    });
  });
}

function initializeScrollToTop() {
  const scrollToTopBtn = document.getElementById("scrollToTop");

  if (!scrollToTopBtn) return;

  // Show/hide button based on scroll position
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.remove("d-none");
    } else {
      scrollToTopBtn.classList.add("d-none");
    }
  });

  // Scroll to top when button is clicked
  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
