const logo = document.getElementById('dvd-logo');

let x, y, dx, dy;
let initialized = false;

function init() {
    x = Math.random() * (window.innerWidth - logo.clientWidth);
    y = Math.random() * (window.innerHeight - logo.clientHeight);
    dx = 3;
    dy = 3;
    initialized = true;
    update();
}

if (logo.complete) {
    init();
} else {
    logo.onload = init;
}

function update() {
    if (!initialized) return;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const logoWidth = logo.clientWidth;
    const logoHeight = logo.clientHeight;

    x += dx;
    y += dy;

    if (x <= 0) {
        x = 0;
        dx = -dx;
    } else if (x + logoWidth >= screenWidth) {
        x = screenWidth - logoWidth;
        dx = -dx;
    }

    if (y <= 0) {
        y = 0;
        dy = -dy;
    } else if (y + logoHeight >= screenHeight) {
        y = screenHeight - logoHeight;
        dy = -dy;
    }

    logo.style.left = x + 'px';
    logo.style.top = y + 'px';

    requestAnimationFrame(update);
}

window.addEventListener('resize', () => {
    if (!initialized) return;
    if (x > window.innerWidth - logo.clientWidth) {
        x = window.innerWidth - logo.clientWidth;
    }
    if (y > window.innerHeight - logo.clientHeight) {
        y = window.innerHeight - logo.clientHeight;
    }
});

const albumSection = document.getElementById('album');
const track = document.querySelector('.horizontal-track');
const albumTitleBox = document.querySelector('.album-title-box');
let animatedOnce = false;

window.addEventListener('scroll', () => {
    if (!albumSection || !track) return;
    const rect = albumSection.getBoundingClientRect();
    const sectionHeight = albumSection.offsetHeight - window.innerHeight;
    
    let progress = -rect.top / sectionHeight;
    progress = Math.max(0, Math.min(1, progress));

    const trackWidth = track.scrollWidth - window.innerWidth + 160;
    const moveX = progress * trackWidth;

    track.style.transform = `translateX(-${moveX}px)`;

    if (rect.top <= window.innerHeight * 0.75 && !animatedOnce) {
        if (albumTitleBox) {
            albumTitleBox.classList.add('animate');
        }
        animatedOnce = true;
    }
});
