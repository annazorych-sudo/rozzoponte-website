// Gallery page script

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling through sections
    const galleryNavLinks = document.querySelectorAll('.gallery-nav-link');
    const gallerySections = document.querySelectorAll('.gallery-section');
    
    galleryNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Remove the active class from all links
                galleryNavLinks.forEach(l => l.classList.remove('active'));
                // Adding an active class to the current link
                this.classList.add('active');
                
                // Smooth scrolling
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Tracking section visibility while scrolling
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Updating the active link in the navigation
                const sectionId = entry.target.getAttribute('id');
                galleryNavLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    // monitor all sections of the gallery
    gallerySections.forEach(section => {
        observer.observe(section);
    });
    
    // Handling image clicks for modal window
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeModal = document.querySelector('.close-modal');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('.gallery-image');
            const caption = this.querySelector('.gallery-caption').textContent;
        
            // Show modal immediately with loading state
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        
            // Set modal content
            modalImage.src = img.src;
            modalImage.alt = img.alt;
            modalCaption.textContent = caption;
        
            // Add loading handling
            modalImage.onload = function() {
                modalImage.style.opacity = '1';
            };
        
            modalImage.onerror = function() {
                modalCaption.textContent = 'Error loading image';
            };
        });
    });

    // Close modal when clicking X
    closeModal.addEventListener('click', function() {
        closeModalFunction();
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFunction();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModalFunction();
        }
    });

    // Close modal function
    function closeModalFunction() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        // Reset image for next opening
        modalImage.style.opacity = '0.8';
    }
    
    // Automatically scroll to the target section when loading a page with an anchor
    if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    }
});