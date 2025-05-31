const apiUrl = `https://discord.com/api/guilds/1345831908474622063/widget.json`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const count = data.presence_count;
    const statsElem = document.getElementById("discord-stats");
    if (statsElem) {
      statsElem.textContent = `${count} Online Users`;
    }
  })
  .catch(error => {
    console.error(error);
  });
