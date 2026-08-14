/* ── Nav scroll & mobile toggle ── */
const header  = document.getElementById('site-header');
const navList = document.getElementById('site-nav');
const toggle  = document.getElementById('nav-toggle');
const heroEl  = document.querySelector('.hero, .page-header');

function updateNav() {
  if (!header) return;
  const threshold = heroEl ? heroEl.offsetHeight - 72 : 60;
  if (window.scrollY > threshold) {
    header.classList.remove('hero-mode');
    header.classList.add('scrolled');
  } else {
    header.classList.add('hero-mode');
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

toggle?.addEventListener('click', () => {
  const open = navList.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
});

navList?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navList.classList.remove('is-open'))
);
