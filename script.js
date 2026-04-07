const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTop = document.getElementById('scrollTop');
const themeToggle = document.getElementById('themeToggle');
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

const sections = document.querySelectorAll('section[id]');

const typed = new Typed('.typed-text', {
  strings: ['AI Student.', 'Future Machine Learning Engineer.', 'Tech Enthusiast.'],
  typeSpeed: 60,
  backSpeed: 35,
  backDelay: 1700,
  loop: true,
});

if (window.location.hash === '#home') {
  window.scrollTo(0, 0);
}

aosInit();
heroIntro();
setActiveNav();
loadTheme();

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (!mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
    }
  });
});

themeToggle.addEventListener('click', () => {
  const isLight = document.documentElement.classList.toggle('light');
  themeToggle.innerHTML = isLight ? '☀' : '☾';
  localStorage.setItem('portfolioTheme', isLight ? 'light' : 'dark');
});

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  scrollTop.classList.toggle('hidden', scrollY < 520);
});

scrollTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  formStatus.textContent = 'Thanks! Your message is ready to send — I’ll reply soon.';
  formStatus.classList.add('text-cyan-300');
  form.reset();
});

function aosInit() {
  AOS.init({
    once: true,
    duration: 900,
    easing: 'ease-out-cubic',
  });
}

function heroIntro() {
  if (window.gsap) {
    gsap.from('header', { opacity: 0, y: -20, duration: 1, ease: 'power3.out' });
    gsap.from('#home h1', { opacity: 0, y: 40, duration: 1, delay: 0.2, ease: 'power3.out' });
    gsap.from('#home p', { opacity: 0, y: 35, duration: 1, delay: 0.4, ease: 'power3.out' });
    gsap.from('.glass-card', { opacity: 0, y: 50, duration: 1, delay: 0.55, ease: 'power3.out' });
    gsap.to('.glass-card', { y: '-=8', duration: 4, ease: 'sine.inOut', repeat: -1, yoyo: true });
  }
}

function loadTheme() {
  const storedTheme = localStorage.getItem('portfolioTheme');
  if (storedTheme === 'light') {
    document.documentElement.classList.add('light');
    themeToggle.innerHTML = '☀';
  } else {
    document.documentElement.classList.remove('light');
    themeToggle.innerHTML = '☾';
  }
}

function setActiveNav() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const anchor = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (!anchor) return;
        anchor.classList.toggle('active', entry.isIntersecting);
      });
    },
    {
      rootMargin: '-40% 0px -50% 0px',
      threshold: 0.25,
    }
  );

  sections.forEach((section) => observer.observe(section));
}
