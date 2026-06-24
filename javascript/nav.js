(function () {
    const isHome = !!document.currentScript.dataset.home;

    const homeLink = isHome ? '' : '<a href="index.html">Home</a>';

    const topBarImages = isHome
        ? '<img src="images/main-page/title.webp" class="top-title-small" />' +
          '<img src="images/main-page/title.webp" class="minecraft-title" />'
        : '<img src="images/main-page/title.webp" class="top-title-small-default" />';

    const html = `
        <div class="top-bar">
            <button class="hamburger" id="hamburger" aria-label="Open menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <nav>
                ${homeLink}
                <a href="how2join.html">Play Now!</a>
                <a href="rules.html">Rules</a>
                <a href="updates.html">Updates</a>
                <a href="http://map.legacy-smp.uk/" target="_blank" rel="noopener noreferrer">Server Map</a>
                <a href="https://discord.gg/az84gJQx5R" target="_blank" rel="noopener noreferrer">Discord</a>
            </nav>
            ${topBarImages}
        </div>
        <div class="sidebar-overlay" id="sidebar-overlay"></div>
        <div class="sidebar" id="sidebar">
            <img src="images/main-page/title.webp" class="sidebar-logo" />
            <nav>
                ${homeLink}
                <a href="how2join.html">Play Now!</a>
                <a href="rules.html">Rules</a>
                <a href="updates.html">Updates</a>
                <a href="http://map.legacy-smp.uk/" target="_blank" rel="noopener noreferrer">Server Map</a>
                <a href="https://discord.gg/az84gJQx5R" target="_blank" rel="noopener noreferrer">Discord</a>
            </nav>
        </div>
    `;

    document.currentScript.insertAdjacentHTML('beforebegin', html);
})();
