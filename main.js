// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  siteNav.classList.toggle('open');
});

// Fade-in animations observer (optional enhancement)
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in-up').forEach(el => {
  observer.observe(el);
});
