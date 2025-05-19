/*
  ================================================
   Made with heart by Stainowy (© 2025)
   stainowy.vercel.app
   github.com/stainowy

  You MAY NOT:
   - Use this code for commercial purposes.
   - Remove credit or redistribute without license terms.

   Respect the code. Respect the creator.
  ================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.slider');

  sliders.forEach((slider) => {
    const images = slider.querySelectorAll('img');
    const leftArrow = slider.querySelector('.arrow.left');
    const rightArrow = slider.querySelector('.arrow.right');
    let current = 0;

    function showImage(index) {
      images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
      });
    }

    leftArrow.addEventListener('click', () => {
      current = (current - 1 + images.length) % images.length;
      showImage(current);
    });

    rightArrow.addEventListener('click', () => {
      current = (current + 1) % images.length;
      showImage(current);
    });

    showImage(current);
  });
});
