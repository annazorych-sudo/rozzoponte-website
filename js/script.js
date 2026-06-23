// Side menu control
const menuBtn = document.getElementById('menuBtn');
const closeMenu = document.getElementById('closeMenu');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const body = document.body;

// Open menu
menuBtn.addEventListener('click', () => {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    body.classList.add('menu-open');
});

// Close menu
function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    body.classList.remove('menu-open');
    
    // Close main menu and all of submenu
    document.querySelectorAll('.submenu').forEach(submenu => {
        submenu.classList.remove('active');
    });
    
    document.querySelectorAll('.has-submenu').forEach(item => {
        item.classList.remove('active');
    });
}

closeMenu.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

// Click Escape and close menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSidebar();
    }
});

// Submenu
document.querySelectorAll('.has-submenu > a').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const submenu = this.nextElementSibling;
        const parent = this.parentElement;
        
        // Close other submenu
        document.querySelectorAll('.submenu').forEach(otherSubmenu => {
            if (otherSubmenu !== submenu) {
                otherSubmenu.classList.remove('active');
            }
        });
        
        document.querySelectorAll('.has-submenu').forEach(otherItem => {
            if (otherItem !== parent) {
                otherItem.classList.remove('active');
            }
        });
        
        // Change submenu
        submenu.classList.toggle('active');
        parent.classList.toggle('active');
    });
});

// Active menu lighter
function setActiveMenu() {
    const currentPage = window.location.pathname.split('/').pop();
    const menuItems = document.querySelectorAll('.sidebar-nav a[href]');
    
    menuItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
            // If nessecary open main menu
            let parent = item.closest('.submenu');
            while (parent) {
                parent.classList.add('active');
                parent.previousElementSibling.classList.add('active');
                parent = parent.parentElement.closest('.submenu');
            }
        }
    });
}

// Click link and close menu
document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.addEventListener('click', function() {
        if (!this.parentElement.classList.contains('has-submenu')) {
            closeSidebar();
        }
    });
});

// Instagram Carousel
function initInstagramCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // URL Instagram
    const instagramPhotos = [
        { url: 'photo/inst1.jpg', link: 'https://www.instagram.com/p/CvQ_QARPQkh/?igsh=MWtybWlpaHd3cnJz' },
        { url: 'photo/inst2.jpg', link: 'https://www.instagram.com/p/CssHGeDvg9Y/?igsh=MWVxcDB3MXFlYXViMw==' },
        { url: 'photo/inst3.jpg', link: 'https://www.instagram.com/p/CsnNMkEvlL-/?igsh=c3JicGVoeWN2aTV3' },
        { url: 'photo/inst4.jpg', link: 'https://www.instagram.com/p/CvtWrU_PDmx/' },
        { url: 'photo/inst5.jpg', link: 'https://www.instagram.com/p/C0maRt8vAi9/' },
        { url: 'photo/inst6.jpg', link: 'https://www.instagram.com/p/C13yWPmvyD8/' }
    ];
    
    // Add photo to carousel
    instagramPhotos.forEach(photo => {
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item';
        
        const link = document.createElement('a');
        link.href = photo.link;
        link.target = '_blank';
        
        const img = document.createElement('img');
        img.src = photo.url;
        img.alt = 'Instagram Photo';
        
        link.appendChild(img);
        carouselItem.appendChild(link);
        carouselTrack.appendChild(carouselItem);
    });
    
    let currentPosition = 0;
    const itemWidth = 250; // Element width + gap
    const visibleItems = Math.floor(carouselTrack.offsetWidth / itemWidth);
    const maxPosition = (instagramPhotos.length - visibleItems) * itemWidth;
    
    // Update carousel
    function updateCarousel() {
        carouselTrack.style.transform = `translateX(-${currentPosition}px)`;
    }
    
    // Next button
    nextBtn.addEventListener('click', () => {
        if (currentPosition < maxPosition) {
            currentPosition += itemWidth;
            updateCarousel();
        }
    });
    
    // Prev button
    prevBtn.addEventListener('click', () => {
        if (currentPosition > 0) {
            currentPosition -= itemWidth;
            updateCarousel();
        }
    });
    
    // Adaptation to window resizing
    window.addEventListener('resize', () => {
        const newVisibleItems = Math.floor(carouselTrack.offsetWidth / itemWidth);
        const newMaxPosition = (instagramPhotos.length - newVisibleItems) * itemWidth;
        
        if (currentPosition > newMaxPosition) {
            currentPosition = newMaxPosition > 0 ? newMaxPosition : 0;
            updateCarousel();
        }
    });
}

// Calling functions when the page loads
document.addEventListener('DOMContentLoaded', () => {
    setActiveMenu();
    initInstagramCarousel();
});

// Wine page functionality
function initWinePage() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading animation for wine images
    const wineImages = document.querySelectorAll('.wine-image img');
    wineImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity for fade-in effect
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        // Trigger load in case images are cached
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
}

// Update DOMContentLoaded event listener to include wine page initialization
document.addEventListener('DOMContentLoaded', () => {
    setActiveMenu();
    initInstagramCarousel();
    initWinePage();
});