// Управление боковым меню
const menuBtn = document.getElementById('menuBtn');
const closeMenu = document.getElementById('closeMenu');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const body = document.body;

// Открытие меню
menuBtn.addEventListener('click', () => {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    body.classList.add('menu-open');
});

// Закрытие меню
function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    body.classList.remove('menu-open');
    
    // Закрываем все подменю при закрытии основного меню
    document.querySelectorAll('.submenu').forEach(submenu => {
        submenu.classList.remove('active');
    });
    
    document.querySelectorAll('.has-submenu').forEach(item => {
        item.classList.remove('active');
    });
}

closeMenu.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

// Закрытие меню при нажатии Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSidebar();
    }
});

// Подменю
document.querySelectorAll('.has-submenu > a').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const submenu = this.nextElementSibling;
        const parent = this.parentElement;
        
        // Закрываем другие открытые подменю
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
        
        // Переключаем текущее подменю
        submenu.classList.toggle('active');
        parent.classList.toggle('active');
    });
});

// Подсветка активного пункта меню
function setActiveMenu() {
    const currentPage = window.location.pathname.split('/').pop();
    const menuItems = document.querySelectorAll('.sidebar-nav a[href]');
    
    menuItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
            // Раскрываем родительское меню если нужно
            let parent = item.closest('.submenu');
            while (parent) {
                parent.classList.add('active');
                parent.previousElementSibling.classList.add('active');
                parent = parent.parentElement.closest('.submenu');
            }
        }
    });
}

// Закрытие меню при клике на ссылку
document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.addEventListener('click', function() {
        if (!this.parentElement.classList.contains('has-submenu')) {
            closeSidebar();
        }
    });
});

// Вызов функции при загрузке страницы
document.addEventListener('DOMContentLoaded', setActiveMenu);