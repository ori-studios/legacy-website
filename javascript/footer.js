(function () {
    const socials = [
        { label: 'Discord',    url: 'https://discord.gg/az84gJQx5R' },
        { label: 'YouTube',    url: 'https://www.youtube.com/@legacy-smp-uk' }, 
        { label: 'TikTok',     url: 'https://www.tiktok.com/@legacysmpuk' },
    ];

    const year = new Date().getFullYear();

    const links = socials
        .map(s => `<a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.label}</a>`)
        .join('');

    const html = `
        <footer class="site-footer">
            <div class="footer-left">
                <span class="footer-copy">&copy; ${year} Legacy SMP</span>
                <span class="footer-owner">Founded by Ori-Studios</span>
            </div>
            <nav class="footer-nav">${links}</nav>
            <div class="footer-right">
                <a href="mailto:orititan.business@gmail.com" class="footer-email">orititan.business@gmail.com</a>
            </div>
        </footer>
    `;

    document.body.insertAdjacentHTML('beforeend', html);

    const clickSound = new Audio('sounds/press.wav');
    function playClick() {
        clickSound.currentTime = 0;
        clickSound.play();
    }

    document.querySelectorAll('.site-footer a').forEach(function (link) {
        link.addEventListener('click', function () {
            playClick();
        });
    });
})();