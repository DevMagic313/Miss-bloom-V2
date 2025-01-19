// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // Initialize mobile menu
  initMobileMenu();

  // Initialize smooth scrolling
  initSmoothScroll();

  // Initialize form validation
  initFormValidation();

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

// Form Validation and Interactive Feedback
function initFormValidation() {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    const inputs = form.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
      // Add floating label effect
      input.addEventListener("focus", () => {
        input.parentElement.classList.add("focused");
      });

      input.addEventListener("blur", () => {
        if (!input.value) {
          input.parentElement.classList.remove("focused");
        }
      });

      // Real-time validation
      input.addEventListener("input", validateInput);
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (validateForm(form)) {
        showLoadingState(form);

        try {
          // Simulate form submission
          await new Promise((resolve) => setTimeout(resolve, 1500));
          showSuccessMessage(form);
          form.reset();
        } catch (error) {
          showErrorMessage(form);
        }
      }
    });
  });
}

function validateInput(e) {
  const input = e.target;
  const value = input.value;
  const type = input.type;

  let isValid = true;
  let errorMessage = "";

  switch (type) {
    case "email":
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      errorMessage = "Please enter a valid email address";
      break;
    case "tel":
      isValid = /^\+?[\d\s-]{10,}$/.test(value);
      errorMessage = "Please enter a valid phone number";
      break;
    case "number":
      if (input.placeholder.toLowerCase().includes("age")) {
        isValid = value >= 18 && value <= 28;
        errorMessage = "Age must be between 18 and 28";
      }
      break;
  }

  updateValidationUI(input, isValid, errorMessage);
  return isValid;
}

function updateValidationUI(input, isValid, errorMessage) {
  const container = input.parentElement;
  container.classList.toggle("invalid", !isValid);

  let errorElement = container.querySelector(".error-message");
  if (!isValid) {
    if (!errorElement) {
      errorElement = document.createElement("span");
      errorElement.className = "error-message";
      container.appendChild(errorElement);
    }
    errorElement.textContent = errorMessage;
  } else if (errorElement) {
    errorElement.remove();
  }
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

// Helper Functions
function showLoadingState(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
}

function showSuccessMessage(form) {
  const message = document.createElement("div");
  message.className = "success-message";
  message.innerHTML =
    '<i class="fas fa-check-circle"></i> Form submitted successfully!';
  form.appendChild(message);

  setTimeout(() => {
    message.remove();
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = false;
  }, 3000);
}

function showErrorMessage(form) {
  const message = document.createElement("div");
  message.className = "error-message";
  message.innerHTML =
    '<i class="fas fa-exclamation-circle"></i> Something went wrong. Please try again.';
  form.appendChild(message);

  setTimeout(() => {
    message.remove();
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Application";
  }, 3000);
}
