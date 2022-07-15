const Clock = document.querySelector('.clock');
const tick = () => {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    const html = `
                <span>${h}</span>
                <span>${m}</span>
                <span>${s}</span>`;
    Clock.innerHTML = html;
};

setInterval(tick, 1000);