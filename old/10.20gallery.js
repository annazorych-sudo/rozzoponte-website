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
    
    // Handling image clicks (can be extended for a modal window)
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('.gallery-image');
            const caption = this.querySelector('.gallery-caption').textContent;
            
            // Here could add opening of a modal window with an image
            console.log('Open pic:', img.src);
            console.log('Description:', caption);
            
        });
    });
    
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