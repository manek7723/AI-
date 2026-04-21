const revealItems = [
  ...document.querySelectorAll('.slide, .timeline-item, .metric-grid article, .cap-grid article, .placeholder .container'),
];

revealItems.forEach((el) => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -5% 0px',
  }
);

revealItems.forEach((el) => observer.observe(el));

const navLinks = [...document.querySelectorAll('.nav-links a')];
const sectionRefs = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const updateActiveNav = () => {
  const marker = window.scrollY + window.innerHeight * 0.28;
  let activeId = sectionRefs[0]?.id;

  sectionRefs.forEach((section) => {
    if (section.offsetTop <= marker) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
  });
};

const hero = document.querySelector('.hero');
const heroVisual = document.querySelector('.hero-visual');

const updateHeroStage = () => {
  if (!hero || !heroVisual) return;

  const rect = hero.getBoundingClientRect();
  const progress = Math.min(Math.max((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0), 1);

  heroVisual.classList.remove('stage-2', 'stage-3');

  if (progress > 0.45) heroVisual.classList.add('stage-2');
  if (progress > 0.68) heroVisual.classList.add('stage-3');
};

const onScroll = () => {
  updateActiveNav();
  updateHeroStage();
};

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);

onScroll();
