document.addEventListener('DOMContentLoaded', function() {
    // Initialize all attraction carousels
    const carousels = document.querySelectorAll('.attraction-carousel');
    
    carousels.forEach(carousel => {
        const images = carousel.querySelector('.carousel-images');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const imageCount = images.children.length;
        let currentIndex = 0;
        
        // Set initial position
        updateCarousel();
        
        // Previous button click
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + imageCount) % imageCount;
            updateCarousel();
        });
        
        // Next button click
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % imageCount;
            updateCarousel();
        });
        
        // Touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carousel.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            
            if (touchStartX - touchEndX > swipeThreshold) {
                // Swipe left - go to next image
                currentIndex = (currentIndex + 1) % imageCount;
                updateCarousel();
            } else if (touchEndX - touchStartX > swipeThreshold) {
                // Swipe right - go to previous image
                currentIndex = (currentIndex - 1 + imageCount) % imageCount;
                updateCarousel();
            }
        }
        
        function updateCarousel() {
            // Update the transform to show the current image
            images.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update button states
            prevBtn.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
            nextBtn.style.visibility = currentIndex === imageCount - 1 ? 'hidden' : 'visible';
        }
        
        // Auto-advance carousel every 5 seconds
        let carouselInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % imageCount;
            updateCarousel();
        }, 5000);
        
        // Pause auto-advance on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            clearInterval(carouselInterval);
            carouselInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % imageCount;
                updateCarousel();
            }, 5000);
        });
    });
});
