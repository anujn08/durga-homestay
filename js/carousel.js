document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    // Set up the slides next to each other
    const slideWidth = track.getBoundingClientRect().width;
    
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    
    slides.forEach(setSlidePosition);
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('data-index', index);
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dotsContainer.appendChild(dot);
    });
    
    const dots = Array.from(dotsContainer.children);
    let currentSlide = 0;
    
    // Move to slide function
    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = `translateX(-${targetSlide.style.left})`;
        currentSlide = slides.findIndex(slide => slide === targetSlide);
        
        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
        
        // Update button states
        prevButton.disabled = currentSlide === 0;
        nextButton.disabled = currentSlide === slides.length - 1;
    };
    
    // Click left, move slides to the left
    prevButton.addEventListener('click', () => {
        const prevSlide = track.querySelector('.carousel-slide:first-child');
        moveToSlide(track, currentSlide, prevSlide);
    });
    
    // Click right, move slides to the right
    nextButton.addEventListener('click', () => {
        const nextSlide = track.querySelector('.carousel-slide:last-child');
        moveToSlide(track, currentSlide, nextSlide);
    });
    
    // Click on dot, move to that slide
    dotsContainer.addEventListener('click', e => {
        const targetDot = e.target.closest('.carousel-dot');
        if (!targetDot) return;
        
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];
        
        moveToSlide(track, currentSlide, targetSlide);
    });
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    const handleSwipe = () => {
        const swipeThreshold = 50;
        
        if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe left - go to next slide
            const activeSlide = track.querySelector('.carousel-slide:not([style*="display: none"])');
            const nextSlide = activeSlide.nextElementSibling || track.firstElementChild;
            if (nextSlide) moveToSlide(track, currentSlide, nextSlide);
        }
        
        if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe right - go to previous slide
            const activeSlide = track.querySelector('.carousel-slide:not([style*="display: none"])');
            const prevSlide = activeSlide.previousElementSibling || track.lastElementChild;
            if (prevSlide) moveToSlide(track, currentSlide, prevSlide);
        }
    };
    
    // Auto-advance slides every 5 seconds
    let slideInterval = setInterval(() => {
        const activeSlide = track.querySelector('.carousel-slide:not([style*="display: none"])');
        const nextSlide = activeSlide.nextElementSibling || track.firstElementChild;
        if (nextSlide) moveToSlide(track, currentSlide, nextSlide);
    }, 5000);
    
    // Pause auto-advance on hover
    const carousel = document.querySelector('.food-carousel');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            const activeSlide = track.querySelector('.carousel-slide:not([style*="display: none"])');
            const nextSlide = activeSlide.nextElementSibling || track.firstElementChild;
            if (nextSlide) moveToSlide(track, currentSlide, nextSlide);
        }, 5000);
    });
});
