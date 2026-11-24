const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'メニューを開く');
  mobileNav.hidden = true;
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'メニューを開く' : 'メニューを閉じる');
  mobileNav.hidden = isOpen;
});

mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
const pricingDetails = document.querySelector('#pricing-list');
const pricingSwitchButtons = document.querySelectorAll('[data-pricing-target]');
const pricingPanels = document.querySelectorAll('[data-pricing-panel]');
pricingSwitchButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.pricingTarget;
    pricingDetails.open = true;
    pricingSwitchButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    pricingPanels.forEach((panel) => { panel.hidden = panel.dataset.pricingPanel !== target; });
  });
});
function openPricingFromHash() {
  if (window.location.hash === '#pricing') pricingDetails.open = true;
}
document.querySelectorAll('[data-open-pricing]').forEach((link) => {
  link.addEventListener('click', () => { pricingDetails.open = true; });
});
openPricingFromHash();
window.addEventListener('hashchange', openPricingFromHash);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !mobileNav.hidden) closeMenu();
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

document.querySelector('#year').textContent = new Date().getFullYear();
