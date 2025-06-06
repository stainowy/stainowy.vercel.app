const header = document.getElementById('error-header');
  const originalText = header.textContent;

  function permute(str) {
    if (str.length <= 1) return [str];
    const permutations = new Set();
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      const remaining = str.slice(0, i) + str.slice(i + 1);
      for (const subPerm of permute(remaining)) {
        permutations.add(char + subPerm);
      }
    }
    return Array.from(permutations);
  }

  const permutations = permute(originalText);

  header.addEventListener('click', () => {    let next;
    do {
      next = permutations[Math.floor(Math.random() * permutations.length)];
    } while (next === header.textContent);
    header.classList.add('animate');
    setTimeout(() => header.classList.remove('animate'), 300);

    header.textContent = next;
  });