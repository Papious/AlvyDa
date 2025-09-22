// --- Mobile menu toggle ---
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// --- Achievements section slider ---
document.addEventListener('DOMContentLoaded', () => {
    const achievementSliders = document.querySelectorAll('.work-image .slides');

    achievementSliders.forEach(slides => {
        const images = slides.querySelectorAll('img');
        let index = 0;
        const total = images.length;

        slides.style.width = `${total * 100}%`;
        images.forEach(img => {
            img.style.width = `${100 / total}%`;
            img.style.flex = `0 0 ${100 / total}%`;
        });

        const nextSlide = () => {
            index = (index + 1) % total;
            slides.style.transition = 'transform 1s ease-in-out';
            slides.style.transform = `translateX(-${index * (100 / total)}%)`;
        };

        let slideInterval = setInterval(nextSlide, 4000);

        slides.parentElement.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        slides.parentElement.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 4000);
        });
    });
});
