// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  siteNav.classList.toggle('open');
  const isOpen = siteNav.classList.contains('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Fade-in animations observer
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

// Contact form success message
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

// Dynamic blog posts from JSON
const blogGrid = document.getElementById('blogGrid');

// Sample blog data (replace with fetch if using external JSON)
const blogPosts = [
  {
    title: "Minimalism in Everyday Life",
    date: "July 20, 2025",
    excerpt: "Discover how simplifying your surroundings can lead to a clearer mind.",
    image: "assets/images/blog1.jpg"
  },
  {
    title: "Journaling for Growth",
    date: "July 15, 2025",
    excerpt: "Learn how daily journaling can unlock creativity and emotional clarity.",
    image: "assets/images/blog2.jpg"
  },
  {
    title: "Traveling with Intention",
    date: "July 10, 2025",
    excerpt: "Tips for meaningful travel experiences that go beyond sightseeing.",
    image: "assets/images/blog3.jpg"
  }
];

// Render blog posts
blogPosts.forEach(post => {
  const card = document.createElement('div');
  card.className = 'post-card';
  card.innerHTML = `
    <img src="${post.image}" alt="${post.title}">
    <div class="post-content">
      <h3>${post.title}</h3>
      <small>${post.date}</small>
      <p>${post.excerpt}</p>
    </div>
  `;
  blogGrid.appendChild(card);
});
