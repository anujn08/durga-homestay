document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const foodCards = document.querySelectorAll('.food-card');

    // Function to filter food items by category
    function filterFoods(category) {
        foodCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });

        // Update active state of buttons
        tabButtons.forEach(btn => {
            if (btn.getAttribute('data-category') === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterFoods(category);
        });
    });

    // Initialize with 'All Dishes' selected
    if (tabButtons.length > 0) {
        filterFoods('all');
    }
});
