// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // Initialize mobile menu
  initMobileMenu();

  // Initialize smooth scrolling
  initSmoothScroll();

  // Initialize image gallery
  initGallery();

  // Initialize counters
  initCounters();

  // Initialize sticky navigation
  initStickyNav();

  // Initialize animations
  initAnimations();
});

// Mobile Menu Functionality
function initMobileMenu() {
  const navbar = document.querySelector(".navbar");
  const menuBtn = document.createElement("button");
  menuBtn.className = "mobile-menu-btn";
  menuBtn.innerHTML = '<i class="fas fa-bars"></i>';

  navbar.insertBefore(menuBtn, navbar.firstChild);

  menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("active");
    menuBtn.innerHTML = navbar.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target)) {
      navbar.classList.remove("active");
      menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
}

// Smooth Scrolling
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        // Close mobile menu if open
        document.querySelector(".navbar").classList.remove("active");
      }
    });
  });
}

// Gallery Functionality
function initGallery() {
  const gallery = document.querySelector(".gallery-grid");
  if (!gallery) return;

  const images = gallery.querySelectorAll("img");

  images.forEach((img) => {
    img.addEventListener("click", () => {
      createLightbox(img.src);
    });
  });
}

function createLightbox(src) {
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${src}" alt="Gallery Image">
            <button class="close-lightbox"><i class="fas fa-times"></i></button>
        </div>
    `;

  document.body.appendChild(lightbox);
  document.body.style.overflow = "hidden";

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.closest(".close-lightbox")) {
      lightbox.remove();
      document.body.style.overflow = "";
    }
  });
}

// Animated Counters
function initCounters() {
  const counters = document.querySelectorAll(".counter");

  const observerOptions = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;
  const duration = 1500;
  const interval = duration / 50;

  const timer = setInterval(() => {
    current += increment;
    element.textContent = Math.floor(current);

    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    }
  }, interval);
}

// Sticky Navigation
function initStickyNav() {
  const navbar = document.querySelector(".navbar");
  const header = document.querySelector(".header");

  if (!navbar || !header) return;

  const headerBottom = header.offsetTop + header.offsetHeight;

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > headerBottom) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  });
}

// Animation on Scroll
function initAnimations() {
  const elements = document.querySelectorAll("[data-aos]");

  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("aos-animate");
      }
    });
  }, observerOptions);

  elements.forEach((element) => observer.observe(element));
}
