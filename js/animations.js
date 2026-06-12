/* EACC Travel Asia — Animations & Interactions */

// Navbar scroll effect
(function () {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// Intersection Observer — fade-in on scroll
(function () {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => observer.observe(el));
})();

// Mobile nav toggle
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open'); toggle.classList.remove('open');
  }));
  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open'); toggle.classList.remove('open');
    }
  });
})();

// Landing page — floating Asian characters & cherry blossoms
(function () {
  const bgChars = document.querySelector('.bg-chars');
  if (!bgChars) return;

  const chars = ['和', '道', '友誼', '사랑', '평화', '행복', '愛', '心', '文化', '学习', '美', '夢', '希望', '平和'];
  const usedCols = [];

  chars.forEach((char, i) => {
    const el = document.createElement('div');
    el.className = 'bg-char';
    el.textContent = char;

    let left;
    do { left = 5 + Math.random() * 90; }
    while (usedCols.some(c => Math.abs(c - left) < 8));
    usedCols.push(left);

    el.style.cssText = [
      `left:${left}%`,
      `font-size:${70 + Math.random() * 110}px`,
      `animation-duration:${22 + Math.random() * 18}s`,
      `animation-delay:${-(Math.random() * 20)}s`
    ].join(';');
    bgChars.appendChild(el);
  });

  // Cherry blossom petals
  const body = document.querySelector('.landing-body');
  if (!body) return;
  const petalCount = window.innerWidth < 600 ? 12 : 22;
  for (let i = 0; i < petalCount; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    const hue = 330 + Math.random() * 35;
    const size = 7 + Math.random() * 9;
    p.style.cssText = [
      `left:${Math.random() * 100}vw`,
      `width:${size}px`, `height:${size}px`,
      `background:radial-gradient(circle, hsl(${hue},75%,82%), hsl(${hue},90%,62%))`,
      `animation-duration:${9 + Math.random() * 14}s`,
      `animation-delay:${-(Math.random() * 10)}s`
    ].join(';');
    body.appendChild(p);
  }
})();

// Smooth active link highlight in navbar
(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();
