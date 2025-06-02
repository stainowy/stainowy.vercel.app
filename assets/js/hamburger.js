document.addEventListener('DOMContentLoaded', function() {
    const hamburgerToggle = document.getElementById('hamburger-toggle');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const closeBtn = document.getElementById('close-btn');


    hamburgerToggle.addEventListener('click', function() {
        hamburgerMenu.classList.add('active');
        hamburgerToggle.style.display = 'none'; // Ukryj trzy kreski
    });
    closeBtn.addEventListener('click', function() {
        hamburgerMenu.classList.remove('active');
        hamburgerToggle.style.display = 'block'; // Pokaż trzy kreski
    });

    hamburgerMenu.addEventListener('click', function(e) {
        if (e.target === hamburgerMenu) {
            hamburgerMenu.classList.remove('active');
            hamburgerToggle.style.display = 'block'; // Pokaż trzy kreski
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && hamburgerMenu.classList.contains('active')) {
            hamburgerMenu.classList.remove('active');
            hamburgerToggle.style.display = 'block'; // Pokaż trzy kreski
        }
    });
});