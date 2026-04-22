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

  nav.style.background = window.scrollY > 50
    ? 'rgb(0, 0, 0)'
    : 'rgba(17, 99, 215, 0.96)';
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