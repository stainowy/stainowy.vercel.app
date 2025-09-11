document.addEventListener('DOMContentLoaded', () => {
    const toggleHam = document.getElementById('toggleham');
    const hamburger = document.getElementById('hamburger');

    toggleHam.addEventListener('click', () => {
        if (document.body.classList.contains('hamburger-opened')) {
            document.body.classList.remove('hamburger-opened');

            toggleHam.classList.remove('close', 'open');
            hamburger.classList.remove('closed', 'opened');
            void toggleHam.offsetWidth;
            void hamburger.offsetWidth;

            toggleHam.classList.add('close');
            hamburger.classList.add('closed');
        } else {
            document.body.classList.add('hamburger-opened');

            toggleHam.classList.remove('open', 'close');
            hamburger.classList.remove('opened', 'closed');
            void toggleHam.offsetWidth;
            void hamburger.offsetWidth;

            toggleHam.classList.add('open');
            hamburger.classList.add('opened');
        }
    });
});