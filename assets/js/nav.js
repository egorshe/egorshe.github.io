document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('nav ul');
    
    if (!toggle || !menu) {
        console.error('Nav toggle or menu not found');
        return;
    }
    
    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isOpen = menu.classList.toggle('nav-open');
        toggle.setAttribute('aria-expanded', isOpen);
        toggle.classList.toggle('active');
        
        console.log('Menu toggled:', isOpen);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('nav')) {
            menu.classList.remove('nav-open');
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Close menu when clicking a link
    const links = menu.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 720) {
                menu.classList.remove('nav-open');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    console.log('Nav script loaded successfully');
});