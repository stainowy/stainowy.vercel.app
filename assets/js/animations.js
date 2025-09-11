document.addEventListener('DOMContentLoaded', () => {
	const faders = document.querySelectorAll('.fade-in-up');

	const appearOptions = {
		threshold: 0.1
	};

	const appearOnScroll = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (!entry.isIntersecting) return;

			entry.target.classList.add('visible');
			observer.unobserve(entry.target);
		});
	}, appearOptions);

	faders.forEach(fader => {
		appearOnScroll.observe(fader);
	});
});