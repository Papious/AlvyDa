// Mobile menu toggle
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

// Scroll to top
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

// Modal functionality
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeBtn = document.querySelector(".close-btn");

// Close modal
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// Section navigation (traditional, digital, animation)
const sections = [
    {
        type: "TRADITIONAL",
        work: "WORK",
        description: "I have been drawing since childhood and my love for art has only grown with time. Traditional work has always been my foundation, giving me the freedom to explore creativity in many ways.",
        images: [
            { src: "Style/Assets/j1.jpg", title: "Artwork Title 1", desc: "Detailed fantasy inking with imaginative figures." },
            { src: "Style/Assets/j4.jpg", title: "Artwork Title 2", desc: "Playful doodles and character sketches." },
            { src: "Style/Assets/j3.jpg", title: "Artwork Title 3", desc: "Oil paintings and tattoo design inspirations." },
            { src: "Style/Assets/j4.jpg", title: "Artwork Title 4", desc: "Cartoons and imaginative figure creations." },
            { src: "Style/Assets/j3.jpg", title: "Artwork Title 5", desc: "Revisiting fundamentals like gesture drawing." },
            { src: "Style/Assets/j3.jpg", title: "Artwork Title 6", desc: "Combining classical techniques with creativity." },
            { src: "Style/Assets/j1.jpg", title: "Artwork Title 7", desc: "A lifelong journey shaping my artistic vision." }
        ],
        id: "traditional"
    },
    {
        type: "DIGITAL",
        work: "WORK",
        description: "Digital art allows me to explore modern techniques and styles. I enjoy experimenting with digital painting, vector illustrations, and photo manipulation.",
        images: [
            { src: "Style/Assets/j2.jpg", title: "Digital Piece 1", desc: "Vector illustration showcasing modern style." },
            { src: "Style/Assets/j2.jpg", title: "Digital Piece 2", desc: "Digital painting with vibrant color palette." },
            { src: "Style/Assets/j3.jpg", title: "Digital Piece 3", desc: "Photo manipulation and mixed media experiments." },
            { src: "Style/Assets/j4.jpg", title: "Digital Piece 4", desc: "Exploring creativity through software tools." }
        ],
        id: "digital"
    },
    {
        type: "ANIMATION",
        work: "WORK",
        description: "Animation brings my illustrations to life. I create short animated loops, character animations, and motion graphics.",
        images: [
            { src: "Style/Assets/j1.jpg", title: "Animation 1", desc: "Character animation with fluid movement." },
            { src: "Style/Assets/j4.jpg", title: "Animation 2", desc: "Short animated loop expressing storytelling." },
            { src: "Style/Assets/j3.jpg", title: "Animation 3", desc: "Motion graphics with dynamic visuals." },
            { src: "Style/Assets/j4.jpg", title: "Animation 4", desc: "Illustrations brought to life through animation." },
            { src: "Style/Assets/j1.jpg", title: "Animation 5", desc: "Expressive character motion and emotion." },
            { src: "Style/Assets/j2.jpg", title: "Animation 6", desc: "Creative storytelling via animated sequences." }
        ],
        id: "animation"
    }
];

let currentSection = 0;

const galleryTitleTraditional = document.querySelector(".section-title .traditional");
const galleryTitleWork = document.querySelector(".section-title .work");
const galleryDescription = document.querySelector(".gallery-description");
const galleryGrid = document.querySelector(".gallery-grid");

const nextBtn = document.querySelector(".arrow.next");
const prevBtn = document.querySelector(".arrow.prev");

function renderSection(index) {
    const section = sections[index];

    // Update section title
    galleryTitleTraditional.textContent = section.type;
    galleryTitleWork.textContent = section.work;

    // Update section description
    galleryDescription.classList.remove("fadeInUp"); // reset animation
    void galleryDescription.offsetWidth; // trigger reflow
    galleryDescription.textContent = section.description;
    galleryDescription.classList.add("fadeInUp");

    // Update gallery images
    galleryGrid.innerHTML = "";
    section.images.forEach((imgObj, i) => {
        const div = document.createElement("div");
        div.classList.add("gallery-item");

        const img = document.createElement("img");
        img.src = imgObj.src;
        img.alt = `Gallery image ${i + 1}`;
        img.dataset.title = imgObj.title;
        img.dataset.desc = imgObj.desc;

        // Modal functionality
        img.addEventListener("click", () => {
            modal.style.display = "flex";
            modalImg.src = img.src;
            modalTitle.textContent = img.dataset.title;
            modalDesc.textContent = img.dataset.desc;
        });

        div.appendChild(img);
        galleryGrid.appendChild(div);
    });
}

// Function to scroll to a section if hash exists
function scrollToHashSection() {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    const index = sections.findIndex(section => section.id.toLowerCase() === hash.toLowerCase());
    if (index !== -1) {
        currentSection = index;
        renderSection(currentSection);
        // Scroll smoothly to gallery
        const gallerySection = document.querySelector(".traditional-work") || document.querySelector(".work-section");
        gallerySection.scrollIntoView({ behavior: "smooth" });
    }
}

// Initial render
renderSection(currentSection);
scrollToHashSection();

// Arrow button events
nextBtn.addEventListener("click", () => {
    currentSection = (currentSection + 1) % sections.length;
    renderSection(currentSection);
});

prevBtn.addEventListener("click", () => {
    currentSection = (currentSection - 1 + sections.length) % sections.length;
    renderSection(currentSection);
});
