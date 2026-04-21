const revealItems = [...document.querySelectorAll('.slide, .timeline-item, .metric-grid article, .cap-grid article')];

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
