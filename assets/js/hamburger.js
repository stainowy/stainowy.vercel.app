document.addEventListener('DOMContentLoaded', function() {
    const hamburgerToggle = document.getElementById('hamburger-toggle');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const closeBtn = document.getElementById('close-btn');
    
    hamburgerToggle.addEventListener('click', function() {
        hamburgerMenu.classList.add('active');
        hamburgerToggle.classList.add('hidden');
    });
    
    closeBtn.addEventListener('click', function() {
        hamburgerMenu.classList.remove('active');
        hamburgerToggle.classList.remove('hidden');
    });
    
    hamburgerMenu.addEventListener('click', function(e) {
        if (e.target === hamburgerMenu) {
            hamburgerMenu.classList.remove('active');
            hamburgerToggle.classList.remove('hidden');
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && hamburgerMenu.classList.contains('active')) {
            hamburgerMenu.classList.remove('active');
            hamburgerToggle.classList.remove('hidden');
        }
    });
});