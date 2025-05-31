document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', function (e) {
    if (e.target.closest('button')) return;
    const url = this.dataset.url;
    if (url) window.open(url, '_blank');
  });
});
