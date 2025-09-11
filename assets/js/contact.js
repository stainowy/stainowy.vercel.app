document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('.submit-button');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nickname = document.getElementById('nickname').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const privacy = document.getElementById('privacy').checked;
        const turnstileResponse = document.querySelector('input[name="cf-turnstile-response"]')?.value;

        if (!privacy) {
            showNotification('You must accept the Privacy Policy.', 'error');
            return;
        }
        if (!turnstileResponse) {
            showNotification('Please complete the captcha.', 'error');
            return;
        }

        submitButton.disabled = true;
        const originalText = submitButton.textContent;
        submitButton.textContent = "Sending…";

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nickname, email, message, turnstileResponse })
            });

            const data = await res.json();

            if (res.ok) {
                showNotification('Message sent successfully!', 'success');
                form.reset();
                if (typeof turnstile !== 'undefined') turnstile.reset();

                submitButton.textContent = "Success";
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 2000);
            } else {
                showNotification(data.error || 'Something went wrong. Try again.', 'error');
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                if (typeof turnstile !== 'undefined') turnstile.reset();
            }
        } catch (err) {
            showNotification('Network error. Please try later.', 'error');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
});

function showNotification(message, type = 'success') {
    const container = document.getElementById('notifications-container');
    if (!container) return;

    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.innerHTML = `
        <div class="icon">
            <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        </div>
        <div class="message">${message}</div>
        <span class="close-btn">&times;</span>
    `;
    
    container.appendChild(notification);

    const closeBtn = notification.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });

    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
}

function hideNotification(notification) {
    notification.style.animation = 'slideOut 0.5s ease-in forwards';
    setTimeout(() => {
        notification.remove();
    }, 500);
}
