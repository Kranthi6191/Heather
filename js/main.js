// 📱 Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  siteNav.classList.toggle('open');
  const isOpen = siteNav.classList.contains('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// 🎯 Fade-In Animation on Scroll
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

// ✉️ Contact Form Success Message
const contactForm = document.querySelector('.contact-form');
const successMessage = document.querySelector('.success-message');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  successMessage.classList.add('show');
  contactForm.reset();
  setTimeout(() => {
    successMessage.classList.remove('show');
  }, 5000);
});
