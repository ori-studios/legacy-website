const SERVER_HOST = 'legacy-smp.uk';
const STEVE_HEAD = 'https://mc-heads.net/avatar/steve/64';

function isFloodgateUUID(uuid) {
    return uuid && /^00000000-0000-0000-/.test(uuid);
}

// Floodgate stores the XUID (Xbox Live ID) in the lower 64 bits of the UUID
function xuidFromFloodgateUUID(uuid) {
    const hex = uuid.replace(/-/g, '').slice(16);
    return BigInt('0x' + hex).toString();
}

function cleanName(name) {
    return name.startsWith('.') ? name.slice(1) : name;
}

function isBedrockPlayer(p) {
    return isFloodgateUUID(p.uuid) || p.name.startsWith('.');
}

async function bedrockHeadDataUrl(xuid) {
    try {
        const res = await fetch(`https://api.geysermc.org/v2/skin/${xuid}`);
        if (!res.ok) return null;
        const { texture_id } = await res.json();
        if (!texture_id) return null;

        return await new Promise(resolve => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                // Bedrock skins can be 64px or 128px wide; scale face region accordingly
                const s = img.naturalWidth / 64;
                const canvas = document.createElement('canvas');
                canvas.width = 64;
                canvas.height = 64;
                const ctx = canvas.getContext('2d');
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(img, 8*s, 8*s, 8*s, 8*s, 0, 0, 64, 64); // face
                ctx.drawImage(img, 40*s, 8*s, 8*s, 8*s, 0, 0, 64, 64); // hat layer
                resolve(canvas.toDataURL());
            };
            img.onerror = () => resolve(null);
            img.src = `https://textures.minecraft.net/texture/${texture_id}`;
        });
    } catch {
        return null;
    }
}

async function buildPlayerCard(player) {
    const bedrock = isBedrockPlayer(player);
    const name = cleanName(player.name);

    let avatarSrc;
    if (bedrock && isFloodgateUUID(player.uuid)) {
        const xuid = xuidFromFloodgateUUID(player.uuid);
        avatarSrc = (await bedrockHeadDataUrl(xuid)) ?? STEVE_HEAD;
    } else {
        avatarSrc = `https://mc-heads.net/avatar/${encodeURIComponent(player.name)}/64`;
    }

    return `
        <div class="player-entry">
            <img src="${avatarSrc}" class="player-img" alt="${name}"
                 onerror="this.src='${STEVE_HEAD}'" />
            <h2 class="player-name">${name}</h2>
            ${bedrock ? '<p class="bedrock-badge">Bedrock</p>' : ''}
        </div>`;
}

async function loadServerStatus() {
    const heading = document.getElementById('online-heading');
    const section = document.getElementById('player-section');

    try {
        const res = await fetch(`https://api.mcsrvstat.us/3/${SERVER_HOST}`);
        const data = await res.json();

        if (!data.online) {
            heading.textContent = "Who's Online?";
            section.innerHTML = '<p class="online-status-msg">The server is currently offline.</p>';
            return;
        }

        const count = data.players?.online ?? 0;
        const max = data.players?.max ?? 0;
        heading.textContent = `Who's Online? (${count}/${max})`;

        const players = data.players?.list ?? [];

        if (count === 0 || players.length === 0) {
            section.innerHTML = '<p class="online-status-msg">No players are currently online.</p>';
            return;
        }

        const cards = await Promise.all(players.map(buildPlayerCard));

        const unlisted = count - players.length;
        const extraCards = Array.from({ length: unlisted }, () => `
            <div class="player-entry">
                <img src="${STEVE_HEAD}" class="player-img" alt="Unknown player" />
                <h2 class="player-name">???</h2>
                <p class="bedrock-badge">Bedrock</p>
            </div>`);

        section.innerHTML = [...cards, ...extraCards].join('');
    } catch {
        heading.textContent = "Who's Online?";
        section.innerHTML = '<p class="online-status-msg">Could not reach the server.</p>';
    }
}

loadServerStatus();
setInterval(loadServerStatus, 5 * 60 * 1000);
