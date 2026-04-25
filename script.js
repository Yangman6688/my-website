const track = document.getElementById('swiperTrack');
const dotsEl = document.getElementById('dots');
const currentEl = document.getElementById('current');
const total = 8;
let cur = 0;
let startX = 0;
let isDragging = false;

// 生成指示点
for (let i = 0; i < total; i++) {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.onclick = () => goTo(i);
    dotsEl.appendChild(d);
}

function goTo(index) {
    cur = (index + total) % total;
    track.style.transform = `translateX(-${cur * 100}%)`;
    document.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active', i === cur);
    });
    currentEl.textContent = cur + 1;
}

// 触摸滑动
track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    isDragging = true;
}, { passive: true });

track.addEventListener('touchend', e => {
    if (!isDragging) return;
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
        goTo(diff > 0 ? cur + 1 : cur - 1);
    }
    isDragging = false;
});

// 自动轮播（5秒）
setInterval(() => goTo(cur + 1), 5000);
