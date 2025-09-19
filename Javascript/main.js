document.addEventListener("DOMContentLoaded", () => {
  // --- Stats counter animation ---
  const counters = document.querySelectorAll(".stat-number");
  counters.forEach(counter => {
    const start = parseInt(counter.getAttribute("data-start"));
    const end = parseInt(counter.getAttribute("data-end"));
    const duration = parseInt(counter.getAttribute("data-duration"));
    let current = start;

    const steps = end - start;
    let stepValue = 1; // default for small counters
    let stepTime = Math.floor(duration / steps);

    // Only large counters skip numbers to make it faster
    if (steps > 20) {
      stepValue = Math.ceil(steps / (duration / 50)); // bigger step for large numbers
      stepTime = 50; // update every 50ms for large counters
    }

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= end) current = end; // prevent overshoot
      counter.textContent = current + "+";
      if (current >= end) clearInterval(timer);
    }, stepTime);
  });

  // --- Work section sliders ---
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
});
