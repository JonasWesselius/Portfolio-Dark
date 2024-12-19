const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevButton = document.querySelector('.carousel-btn-left');
const nextButton = document.querySelector('.carousel-btn-right');
const dotsNav = document.querySelector('.carousel-nav');

let currentIndex = 0;
let slideWidth = slides[0].getBoundingClientRect().width;

// Dynamically set slide positions on window resize
const updateSlidePositions = () => {
    slideWidth = slides[0].getBoundingClientRect().width;
    slides.forEach((slide, index) => {
        slide.style.left = `${index * slideWidth}px`;
    });
};

// Move to slide
const moveToSlide = (index) => {
    const totalSlides = slides.length;
    const maxIndex = totalSlides - 4; // Since 4 slides should be visible at once

    // Looping logic for infinite carousel
    if (index < 0) {
        index = totalSlides - 1; // Move to last slide
    } else if (index > maxIndex) {
        index = 0; // Move to first slide
    }

    track.style.transform = `translateX(-${slideWidth * index}px)`;
    currentIndex = index;

    updateDots();
    updateVisibility();
};

// Update visibility of slides
const updateVisibility = () => {
    slides.forEach((slide, index) => {
        if (index >= currentIndex && index < currentIndex + 4) {
            slide.classList.remove('hidden');
        } else {
            slide.classList.add('hidden');
        }
    });
};

// Create dots for all projects and highlight the active ones
const updateDots = () => {
    dotsNav.innerHTML = '';
    const totalSlides = slides.length;

    // Create a dot for every slide
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        if (index >= currentIndex && index < currentIndex + 4) {
            dot.classList.add('active');  // Highlight dots for the visible slides
        }
        dotsNav.appendChild(dot);

        dot.addEventListener('click', () => {
            moveToSlide(index);
        });
    });
};


// Expand/collapse slides
slides.forEach((slide) => {
    const button = slide.querySelector('.button'); // Get the "More info" button
    slide.addEventListener('click', () => {
        if (slide.classList.contains('expanded')) {
            slide.classList.remove('expanded');
            button.classList.add('hidden'); // Hide the button when collapsed
        } else {
            slides.forEach((s) => s.classList.remove('expanded')); // Collapse others
            slide.classList.add('expanded');
            button.classList.remove('hidden'); // Show the button when expanded
        }
    });
});

// Buttons for navigation
prevButton.addEventListener('click', () => {
    const newIndex = currentIndex - 1;
    moveToSlide(newIndex);
});

nextButton.addEventListener('click', () => {
    const newIndex = currentIndex + 1;
    moveToSlide(newIndex);
});

// Initialize
updateSlidePositions();
updateDots();
updateVisibility();

// Ensure position update on resize
window.addEventListener('resize', updateSlidePositions);
