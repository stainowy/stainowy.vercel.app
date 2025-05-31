document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".project-card").forEach(card => {
    const slides   = card.querySelectorAll(".slides img");
    const prevBtn  = card.querySelector(".arrow.left");
    const nextBtn  = card.querySelector(".arrow.right");
    let current    = 0;

    const show = i => {
      slides.forEach((img, idx) => img.classList.toggle("active", idx === i));
    };

    prevBtn.addEventListener("click", () => {
      current = (current - 1 + slides.length) % slides.length;
      show(current);
    });

    nextBtn.addEventListener("click", () => {
      current = (current + 1) % slides.length;
      show(current);
    });

    const handleKey = e => {
      if (e.key === "ArrowLeft")  prevBtn.click();
      if (e.key === "ArrowRight") nextBtn.click();
    };
    card.addEventListener("keydown", handleKey);
    card.addEventListener("mouseenter", () => window.addEventListener("keydown", handleKey));
    card.addEventListener("mouseleave", () => window.removeEventListener("keydown", handleKey));

    card.addEventListener("click", e => {
      if (!e.target.classList.contains("arrow") && card.dataset.url) {
        window.open(card.dataset.url, "_blank");
      }
    });

    card.tabIndex = 0;
    show(current);
  });
});
