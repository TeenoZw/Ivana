// Main JavaScript for Ivana Resources Website
class IvanaWebsite {
  constructor() {
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupAnimations();
    this.setupScrollEffects();
    this.setupMobileMenu();
    this.setupFormHandling();
    this.setupServiceCards();
    this.setupIntersectionObserver();
    this.setupScrollProgress();
    this.setupModernInteractions();
    this.setupGalleryFilter();
    this.setupSectionAnimations();
    this.setupScrollToTop();
  }

  setupNavigation() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    });

    // Update active navigation link based on scroll position
    window.addEventListener("scroll", () => {
      this.updateActiveNavLink();
      this.updateNavbarAppearance();
    });
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-button");

    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  updateNavbarAppearance() {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("bg-ivana-black/95");
      navbar.classList.remove("bg-ivana-black/90");
    } else {
      navbar.classList.add("bg-ivana-black/90");
      navbar.classList.remove("bg-ivana-black/95");
    }
  }

  setupAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
          entry.target.classList.add("animate-fadeInUp");
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
      ".service-card, .stat-item"
    );
    animateElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.animationPlayState = "paused";
      observer.observe(el);
    });
  }

  setupScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector("#home");

      if (hero) {
        const heroBackground = hero.querySelector("img");
        if (heroBackground) {
          heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
      }
    });

    // Add scroll-based opacity changes
    const heroContent = document.querySelector("#home .relative.z-10");
    if (heroContent) {
      window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset;
        const opacity = Math.max(0, 1 - scrolled / 600);
        heroContent.style.opacity = opacity;
      });
    }
  }

  setupMobileMenu() {
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener("click", () => {
        const isHidden =
          mobileMenu.style.display === "none" ||
          mobileMenu.style.display === "";

        if (isHidden) {
          mobileMenu.style.display = "block";
          mobileMenuBtn.classList.add("active");

          // Animate in
          mobileMenu.style.opacity = "0";
          mobileMenu.style.transform = "translateY(-10px)";
          setTimeout(() => {
            mobileMenu.style.transition = "all 0.3s ease";
            mobileMenu.style.opacity = "1";
            mobileMenu.style.transform = "translateY(0)";
          }, 10);
        } else {
          // Animate out
          mobileMenu.style.transition = "all 0.3s ease";
          mobileMenu.style.opacity = "0";
          mobileMenu.style.transform = "translateY(-10px)";
          mobileMenuBtn.classList.remove("active");

          setTimeout(() => {
            mobileMenu.style.display = "none";
          }, 300);
        }

        // Animate hamburger menu
        const svg = mobileMenuBtn.querySelector("svg");
        if (isHidden) {
          svg.innerHTML =
            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
        } else {
          svg.innerHTML =
            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
        }
      });

      // Close mobile menu when clicking on a link
      const mobileLinks = mobileMenu.querySelectorAll("a");
      mobileLinks.forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenu.style.display = "none";
          mobileMenuBtn.classList.remove("active");

          const svg = mobileMenuBtn.querySelector("svg");
          svg.innerHTML =
            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
        });
      });

      // Close mobile menu when clicking outside
      document.addEventListener("click", (e) => {
        if (
          !mobileMenuBtn.contains(e.target) &&
          !mobileMenu.contains(e.target)
        ) {
          if (mobileMenu.style.display === "block") {
            mobileMenu.style.display = "none";
            mobileMenuBtn.classList.remove("active");

            const svg = mobileMenuBtn.querySelector("svg");
            svg.innerHTML =
              '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
          }
        }
      });
    }
  }

  setupFormHandling() {
    const contactForm = document.querySelector("#contact form");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleFormSubmission(contactForm);
      });
    }
  }

  async handleFormSubmission(form) {
    try {
      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      // Get form data
      const formData = new FormData(form);
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
      };

      // Send to backend
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        const messageType = result.development ? "info" : "success";
        this.showNotification(result.message, messageType);
        form.reset();
      } else {
        // Handle validation errors
        if (result.errors && result.errors.length > 0) {
          this.showNotification(result.errors.join(". "), "error");
        } else {
          this.showNotification(
            result.message || "There was an error sending your message.",
            "error"
          );
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      this.showNotification(
        "Sorry, there was an error sending your message. Please check your internet connection and try again.",
        "error"
      );
    } finally {
      // Reset button state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = "Send Message";
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }

  showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;

    if (type === "success") {
      notification.classList.add("bg-ivana-green", "text-white");
    } else if (type === "error") {
      notification.classList.add("bg-ivana-red", "text-white");
    } else {
      notification.classList.add("bg-ivana-gold", "text-ivana-black");
    }

    notification.textContent = message;
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.classList.remove("translate-x-full");
    }, 100);

    // Animate out and remove
    setTimeout(() => {
      notification.classList.add("translate-x-full");
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 4000);
  }

  setupServiceCards() {
    const serviceCards = document.querySelectorAll(".service-card");

    serviceCards.forEach((card, index) => {
      // Add staggered animation delays for scroll animations
      card.style.animationDelay = `${index * 0.1}s`;

      // Simple click feedback for mobile
      card.addEventListener("click", () => {
        card.style.transform = "scale(0.95)";
        setTimeout(() => {
          card.style.transform = "";
        }, 100);
      });
    });
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add different animation classes based on element position
          const rect = entry.boundingClientRect;
          const isLeft = rect.left < window.innerWidth / 2;

          if (entry.target.classList.contains("service-card")) {
            entry.target.classList.add("animate-fadeInUp");
          } else if (entry.target.classList.contains("stat-item")) {
            entry.target.classList.add(
              isLeft ? "animate-fadeInLeft" : "animate-fadeInRight"
            );
          } else {
            entry.target.classList.add("animate-fadeInUp");
          }

          // Add staggered animations for child elements
          const children = entry.target.querySelectorAll(
            ".service-card, .stat-item, .contact-item"
          );
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add("animate-fadeInUp");
            }, index * 150);
          });
        }
      });
    }, observerOptions);

    // Observe sections and cards
    const sections = document.querySelectorAll("section");
    const cards = document.querySelectorAll(
      ".service-card, .stat-item, .contact-item"
    );

    sections.forEach((section) => observer.observe(section));
    cards.forEach((card) => observer.observe(card));
  }

  // Add typing effect for hero text
  typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = "";
    const timer = setInterval(() => {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  }

  setupScrollProgress() {
    const progressBar = document.getElementById("scroll-progress");
    if (progressBar) {
      window.addEventListener("scroll", () => {
        const winScroll =
          document.body.scrollTop || document.documentElement.scrollTop;
        const height =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
      });
    }
  }

  setupModernInteractions() {
    // Enhanced scroll indicator
    const scrollIndicator = document.querySelector(".scroll-indicator");
    if (scrollIndicator) {
      scrollIndicator.addEventListener("click", () => {
        document.getElementById("services").scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });

      // Hide scroll indicator when user scrolls down
      window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        if (scrollY > 100) {
          scrollIndicator.style.opacity = "0";
          scrollIndicator.style.pointerEvents = "none";
        } else {
          scrollIndicator.style.opacity = "1";
          scrollIndicator.style.pointerEvents = "auto";
        }
      });
    }

    // Enhanced service card interactions
    const serviceCards = document.querySelectorAll(".service-card");
    serviceCards.forEach((card, index) => {
      // Add staggered hover delays
      card.addEventListener("mouseenter", () => {
        setTimeout(() => {
          card.classList.add("animate-pulse");
        }, index * 50);
      });

      card.addEventListener("mouseleave", () => {
        card.classList.remove("animate-pulse");
      });
    });

    // Enhanced form interactions
    const formInputs = document.querySelectorAll("input, textarea");
    formInputs.forEach((input) => {
      input.addEventListener("focus", () => {
        input.parentElement.classList.add("focused");
      });

      input.addEventListener("blur", () => {
        if (!input.value) {
          input.parentElement.classList.remove("focused");
        }
      });
    });

    // Parallax effect for hero background
    const heroSection = document.querySelector(".hero");
    const heroBackground = document.querySelector(".hero-bg");

    if (heroSection && heroBackground) {
      window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        heroBackground.style.transform = `translateY(${rate}px)`;
      });
    }
  }

  setupGalleryFilter() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");

    if (filterButtons.length === 0 || galleryItems.length === 0) return;

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        // Add active class to clicked button
        button.classList.add("active");

        const filterValue = button.dataset.filter;

        galleryItems.forEach((item) => {
          const category = item.dataset.category;

          if (filterValue === "all" || category === filterValue) {
            item.style.display = "block";
            // Add entrance animation
            item.style.opacity = "0";
            item.style.transform = "scale(0.8)";
            setTimeout(() => {
              item.style.transition = "all 0.4s ease";
              item.style.opacity = "1";
              item.style.transform = "scale(1)";
            }, 100);
          } else {
            // Add exit animation
            item.style.transition = "all 0.3s ease";
            item.style.opacity = "0";
            item.style.transform = "scale(0.8)";
            setTimeout(() => {
              item.style.display = "none";
            }, 300);
          }
        });
      });
    });

    // Add click handlers for gallery items (lightbox effect)
    galleryItems.forEach((item) => {
      item.addEventListener("click", () => {
        this.openLightbox(item);
      });
    });
  }

  setupSectionAnimations() {
    // Enhanced section entry animations
    const sections = document.querySelectorAll("section");

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");

            // Animate child elements with stagger
            const animatableElements = entry.target.querySelectorAll(
              ".service-card, .specialized-card, .gallery-item, .testimonial-card, .stat-item"
            );

            animatableElements.forEach((element, index) => {
              setTimeout(() => {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
              }, index * 100);
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);

      // Set initial state for animated elements
      const animatableElements = section.querySelectorAll(
        ".service-card, .specialized-card, .gallery-item, .testimonial-card, .stat-item"
      );

      animatableElements.forEach((element) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition = "all 0.6s ease";
      });
    });
  }

  setupScrollToTop() {
    const scrollToTopBtn = document.getElementById("scroll-to-top");

    if (scrollToTopBtn) {
      // Show/hide button based on scroll position
      window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
          scrollToTopBtn.classList.add("visible");
        } else {
          scrollToTopBtn.classList.remove("visible");
        }
      });

      // Scroll to top when clicked
      scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    }
  }

  // Test all navigation links functionality
  testNavigationLinks() {
    const navLinks = document.querySelectorAll(".nav-button");
    const sections = document.querySelectorAll("section[id]");

    console.log("🔍 Testing Navigation Links:");

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          console.log(
            `✅ Link "${link.textContent}" → Section "${targetId}" ✓`
          );
        } else {
          console.log(
            `❌ Link "${link.textContent}" → Section "${targetId}" ✗ (NOT FOUND)`
          );
        }
      }
    });

    console.log("\n📍 Available Sections:");
    sections.forEach((section) => {
      console.log(
        `   • ${section.id} (${
          section.querySelector("h2")?.textContent || "No title"
        })`
      );
    });

    return navLinks.length === sections.length - 0; // -0 because we might have sections without nav links
  }

  // Enhanced keyboard navigation
  setupKeyboardNavigation() {
    const navHelper = document.getElementById("nav-helper");
    let helperTimeout;

    // Show navigation helper when Ctrl is held
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (navHelper) {
          navHelper.classList.add("visible");
          clearTimeout(helperTimeout);
        }
      }

      // Navigate sections with arrow keys (Ctrl + Arrow)
      if (e.ctrlKey || e.metaKey) {
        const sections = Array.from(document.querySelectorAll("section[id]"));
        const currentSectionIndex = sections.findIndex((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom > 100;
        });

        let targetIndex = currentSectionIndex;

        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
          e.preventDefault();
          targetIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
        } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
          e.preventDefault();
          targetIndex = Math.max(currentSectionIndex - 1, 0);
        }

        if (targetIndex !== currentSectionIndex && sections[targetIndex]) {
          sections[targetIndex].scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }

      // Quick navigation with number keys (Alt + Number)
      if (e.altKey && /^[1-7]$/.test(e.key)) {
        e.preventDefault();
        const sections = document.querySelectorAll("section[id]");
        const sectionIndex = parseInt(e.key) - 1;

        if (sections[sectionIndex]) {
          sections[sectionIndex].scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });

    // Hide navigation helper when Ctrl is released
    document.addEventListener("keyup", (e) => {
      if (!e.ctrlKey && !e.metaKey && navHelper) {
        helperTimeout = setTimeout(() => {
          navHelper.classList.remove("visible");
        }, 500);
      }
    });

    // Toggle helper with '?' key
    document.addEventListener("keydown", (e) => {
      if (e.key === "?" && navHelper) {
        e.preventDefault();
        navHelper.classList.toggle("visible");

        if (navHelper.classList.contains("visible")) {
          setTimeout(() => {
            navHelper.classList.remove("visible");
          }, 3000);
        }
      }
    });
  }
}

// Utility functions
function throttle(func, wait) {
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

// Initialize the website when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const website = new IvanaWebsite();

  // Add enhanced features
  website.setupKeyboardNavigation();

  // Test navigation links in development
  if (window.location.hostname === "localhost") {
    setTimeout(() => {
      website.testNavigationLinks();
    }, 1000);
  }

  // Add loading animation completion
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 100);
});

// Handle page visibility changes
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    // Resume animations when page becomes visible
    const animatedElements = document.querySelectorAll('[class*="animate-"]');
    animatedElements.forEach((el) => {
      el.style.animationPlayState = "running";
    });
  }
});

// Performance optimization: Lazy load images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  const lazyImages = document.querySelectorAll("img[data-src]");
  lazyImages.forEach((img) => imageObserver.observe(img));
}
