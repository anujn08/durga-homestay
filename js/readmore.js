document.addEventListener('DOMContentLoaded', function() {
    // Initialize all read more buttons
    const readMoreButtons = document.querySelectorAll('.read-more');
    
    readMoreButtons.forEach(button => {
        const content = button.previousElementSibling;
        const fullText = content.textContent;
        const previewText = fullText.substring(0, 100) + '...';
        
        // Set initial state
        content.textContent = previewText;
        content.dataset.fullText = fullText;
        content.dataset.isPreview = 'true';
        
        // Add click event
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (content.dataset.isPreview === 'true') {
                // Show full text
                content.textContent = content.dataset.fullText;
                button.textContent = 'Read Less ';
                content.dataset.isPreview = 'false';
            } else {
                // Show preview text
                content.textContent = previewText;
                button.textContent = 'Read More ';
                content.dataset.isPreview = 'true';
            }
            
            // Add arrow icon
            const icon = document.createElement('i');
            icon.className = 'fas fa-arrow-right';
            button.appendChild(icon);
        });
    });
});
