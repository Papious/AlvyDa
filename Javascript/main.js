document.addEventListener("DOMContentLoaded", () => {
  // Mobile Hamburger Menu
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Mobile Dropdown Functionality - UPDATED
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  const dropdowns = document.querySelectorAll('.dropdown');

  // Close all dropdowns
  function closeAllDropdowns() {
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove('active');
    });
  }

  // Handle dropdown toggle clicks
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      // Only prevent default and handle dropdown on mobile
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        
        const parentDropdown = this.closest('.dropdown');
        const isActive = parentDropdown.classList.contains('active');
        
        // Close all dropdowns first
        closeAllDropdowns();
        
        // If this dropdown wasn't active, open it
        if (!isActive) {
          parentDropdown.classList.add('active');
        }
      }
      // On desktop, let the hover behavior work naturally
    });
  });

  // Close dropdowns when clicking on regular nav items
  document.querySelectorAll('.nav-item:not(.dropdown)').forEach(item => {
    item.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      closeAllDropdowns();
    });
  });

  // Close dropdowns when clicking on dropdown menu items
  document.querySelectorAll('.dropdown-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      closeAllDropdowns();
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-menu') && window.innerWidth <= 768) {
      closeAllDropdowns();
    }
  });

  // Close menu when resizing to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      closeAllDropdowns();
    }
  });

  // Stats Counter Animation
  const counters = document.querySelectorAll(".stat-number");
  
  // Intersection Observer for counter animation
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const start = parseInt(counter.getAttribute("data-start")) || 0;
        const end = parseInt(counter.getAttribute("data-end")) || 100;
        const duration = parseInt(counter.getAttribute("data-duration")) || 2000;
        
        animateCounter(counter, start, end, duration);
        observer.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach(counter => {
    observer.observe(counter);
  });

  function animateCounter(counter, start, end, duration) {
    let current = start;
    const steps = end - start;
    let stepValue = 1;
    let stepTime = Math.floor(duration / steps);

    if (steps > 20) {
      stepValue = Math.ceil(steps / (duration / 50));
      stepTime = 50;
    }

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= end) current = end;
      counter.textContent = current + "+";
      if (current >= end) clearInterval(timer);
    }, stepTime);
  }

  // Work Section Sliders
  const sliders = document.querySelectorAll(".work-image .slides");

  sliders.forEach(slides => {
    const images = slides.querySelectorAll("img");
    let index = 0;
    const total = images.length;

    if (total === 0) return; // Skip if no images

    slides.style.width = `${total * 100}%`;
    images.forEach(img => {
      img.style.width = `${100 / total}%`;
      img.style.flex = `0 0 ${100 / total}%`;
    });

    const nextSlide = () => {
      index = (index + 1) % total;
      slides.style.transition = "transform 1s ease-in-out";
      slides.style.transform = `translateX(-${index * (100 / total)}%)`;
    };

    let slideInterval = setInterval(nextSlide, 4000);

    // Pause on hover/touch
    slides.parentElement.addEventListener("mouseenter", () => {
      clearInterval(slideInterval);
    });
    
    slides.parentElement.addEventListener("mouseleave", () => {
      slideInterval = setInterval(nextSlide, 4000);
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    slides.parentElement.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
      clearInterval(slideInterval);
    });

    slides.parentElement.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      slideInterval = setInterval(nextSlide, 4000);
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - next slide
        nextSlide();
      }
      
      if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - previous slide
        index = (index - 1 + total) % total;
        slides.style.transition = "transform 1s ease-in-out";
        slides.style.transform = `translateX(-${index * (100 / total)}%)`;
      }
    }
  });

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      // Don't prevent default if it's a dropdown toggle on mobile
      if (window.innerWidth <= 768 && this.classList.contains('dropdown-toggle')) {
        return;
      }
      
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        closeAllDropdowns();
      }
    });
  });

  // Scroll to Top Functionality
  const scrollButton = document.querySelector('.scroll-top');
  
  function toggleScrollButton() {
    if (window.pageYOffset > 300) {
      scrollButton.classList.add('visible');
    } else {
      scrollButton.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleScrollButton);
  
  scrollButton.addEventListener('click', () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  });

  // Initialize scroll button visibility
  toggleScrollButton();

  // Prevent scroll on mobile when menu is open
  function preventScroll(e) {
    if (navMenu.classList.contains('active')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }

  // Add touchmove prevention when menu is open
  document.addEventListener('touchmove', preventScroll, { passive: false });
  
  // Cleanup function
  window.addEventListener('beforeunload', () => {
    document.removeEventListener('touchmove', preventScroll);
  });
});
