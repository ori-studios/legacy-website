fetch('./data/splash-text.json')
  .then(response => response.json())
  .then(data => {
    const presets = data.presets;

    let lastIndex = parseInt(localStorage.getItem("lastMessage"));
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * presets.length);
    } while (newIndex === lastIndex && presets.length > 1);

    document.getElementById("splash-text").textContent = presets[newIndex];
    localStorage.setItem("lastMessage", newIndex);
  })
  .catch(err => console.error("Failed to load presets:", err));