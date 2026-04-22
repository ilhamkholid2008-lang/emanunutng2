const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.classList.add('visible');
      }, i * 80);
    }
  });
}, { threshold: 0.05 });

reveals.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  observer.observe(el);
});

window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  nav.style.background = window.scrollY > 50
    ? 'rgb(0, 0, 0)'
    : 'rgba(79, 143, 240, 0.96)';
});