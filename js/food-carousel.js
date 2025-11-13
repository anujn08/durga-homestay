document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.food-carousel-track');
    const items = document.querySelectorAll('.food-carousel-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const itemWidth = 270; // Width of each item + gap
    let currentIndex = 0;
    const visibleItems = Math.min(4, items.length); // Show up to 4 items at once

    // Set initial active dot
    updateDots();

    // Next button click
    nextBtn.addEventListener('click', () => {
        if (currentIndex < items.length - visibleItems) {
            currentIndex++;
            updateCarousel();
        } else {
            // Loop back to start
            currentIndex = 0;
            updateCarousel();
        }
    });

    // Previous button click
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        } else {
            // Loop to end
            currentIndex = items.length - visibleItems;
            updateCarousel();
        }
    });

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index * Math.ceil(visibleItems / 2);
            if (currentIndex >= items.length - visibleItems + 1) {
                currentIndex = items.length - visibleItems;
            }
            updateCarousel();
        });
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - go to next
                if (currentIndex < items.length - visibleItems) {
                    currentIndex++;
                    updateCarousel();
                }
            } else {
                // Swipe right - go to previous
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
            }
        }
    }

    // Update carousel position
    function updateCarousel() {
        const offset = -currentIndex * itemWidth;
        track.style.transform = `translateX(${offset}px)`;
        updateDots();
    }

    // Update active dot
    function updateDots() {
        const activeDotIndex = Math.floor(currentIndex / Math.ceil(visibleItems / 2));
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeDotIndex);
        });
    }

    // Auto-advance carousel
    let autoSlide = setInterval(() => {
        if (currentIndex < items.length - visibleItems) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }, 5000);

    // Pause auto-slide on hover
    const carousel = document.querySelector('.food-carousel');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });

    carousel.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            if (currentIndex < items.length - visibleItems) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        }, 5000);
    });
});
