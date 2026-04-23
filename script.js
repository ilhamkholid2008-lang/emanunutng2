const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(0)';
        entry.target.classList.add('visible');
      }, i * 80);
    }
  });
}, { threshold: 0.05 });

reveals.forEach(el => {
  el.style.opacity = '1';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  observer.observe(el);
});

window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// ===== FITUR SLIDER =====
const slider = document.getElementById('featuresSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('sliderDots');

const cards = slider.querySelectorAll('#featuresSlider .card');
const cardWidth = 240 + 22; // card width + gap
let currentIndex = 0;

// Buat dots
cards.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.classList.add('dot-item');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(dot);
});

function updateDots() {
  document.querySelectorAll('.dot-item').forEach((d, i) => {
    d.classList.toggle('active', i === currentIndex);
  });
}

function goTo(index) {
  currentIndex = Math.max(0, Math.min(index, cards.length - 1));
  slider.scrollTo({ left: currentIndex * cardWidth, behavior: 'smooth' });
  updateDots();
}

prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

// Drag to scroll
let isDown = false, startX, scrollLeft;
slider.addEventListener('mousedown', e => {
  isDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => isDown = false);
slider.addEventListener('mouseup', () => isDown = false);
slider.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  slider.scrollLeft = scrollLeft - (x - startX) * 1.5;
});

// Sync dots saat scroll manual
slider.addEventListener('scroll', () => {
  currentIndex = Math.round(slider.scrollLeft / cardWidth);
  updateDots();
});

// ===== IPHONE SCREEN SLIDER =====
const screenSlider = document.getElementById('screenSlider');
const sdots = document.querySelectorAll('.sdot');
let screenIndex = 0;
const totalScreens = sdots.length;

function goToScreen(index) {
  screenIndex = (index + totalScreens) % totalScreens;
  // Geser per 25% karena total width = 400%
  screenSlider.style.transform = `translateX(-${screenIndex * 25}%)`;
  sdots.forEach((d, i) => d.classList.toggle('active', i === screenIndex));
}

// Klik dots
sdots.forEach((dot, i) => dot.addEventListener('click', () => goToScreen(i)));

// Auto slide tiap 3 detik
setInterval(() => goToScreen(screenIndex + 1), 3000);