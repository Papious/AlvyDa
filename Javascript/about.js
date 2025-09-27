document.addEventListener("DOMContentLoaded", () => {
    // --- Navbar: Hamburger Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a nav link
    document.querySelectorAll('.nav-item a').forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- Dropdown Menu for WORK (mobile) ---
    const dropdowns = document.querySelectorAll('.nav-item.dropdown');
    dropdowns.forEach(drop => {
        drop.addEventListener('click', e => {
            if (window.innerWidth <= 768) {
                e.stopPropagation();
                drop.classList.toggle('active');
            }
        });
    });

    // --- Achievements Slider ---
    const sliders = document.querySelectorAll('.work-image .slides');
    sliders.forEach(slides => {
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

        slides.parentElement.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slides.parentElement.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 4000));
    });

    // --- Scroll to Top Button ---
    const scrollButton = document.querySelector('#scrollToTop');
    const scrollIconSrc = "Style/Icons/Subtract.svg"; // fallback icon if missing
    if (!scrollButton) {
        const btn = document.createElement('button');
        btn.id = "scrollToTop";
        btn.classList.add('scroll-top');
        btn.innerHTML = `<img src="${scrollIconSrc}" alt="Scroll to top">`;
        document.body.appendChild(btn);
    }

    const scrollTopBtn = document.querySelector('#scrollToTop');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Smooth scroll to hash section ---
    const scrollToHashSection = () => {
        const hash = window.location.hash.replace("#", "");
        if (!hash) return;
        const target = document.getElementById(hash);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    };
    scrollToHashSection();
});
