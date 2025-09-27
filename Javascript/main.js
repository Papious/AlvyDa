document.addEventListener("DOMContentLoaded", () => {
  // Mobile Hamburger Menu
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking a nav link
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Dropdown Menu for Mobile
  const dropdowns = document.querySelectorAll('.work-dropdown');

  dropdowns.forEach(drop => {
    drop.addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        e.stopPropagation();
        drop.classList.toggle('active');
      }
    });
  });

  // Stats Counter Animation
  const counters = document.querySelectorAll(".stat-number");
  counters.forEach(counter => {
    const start = parseInt(counter.getAttribute("data-start")) || 0;
    const end = parseInt(counter.getAttribute("data-end")) || 100;
    const duration = parseInt(counter.getAttribute("data-duration")) || 2000;
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
  });

  // Work Section Sliders
  const sliders = document.querySelectorAll(".work-image .slides");

  sliders.forEach(slides => {
    const images = slides.querySelectorAll("img");
    let index = 0;
    const total = images.length;

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

    slides.parentElement.addEventListener("mouseenter", () => {
      clearInterval(slideInterval);
    });
    slides.parentElement.addEventListener("mouseleave", () => {
      slideInterval = setInterval(nextSlide, 4000);
    });
  });

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70, // adjust for navbar height
          behavior: 'smooth'
        });
      }
    });
  });

  // Scroll to Top Functionality (from workspace.html)
  const scrollButton = document.querySelector('.scroll-top');
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollButton.classList.add('visible');
    } else {
      scrollButton.classList.remove('visible');
    }
  });
  
  scrollButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});