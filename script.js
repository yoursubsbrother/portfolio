// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', !isExpanded);
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Intersection Observer for Fade-In Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Contact Form Fallback (Mailto)
const form = document.getElementById('contact-form');
form.addEventListener('submit', function(e) {
    // If Formspree ID is not set, fallback to mailto
    if (form.action.includes('YOUR_FORM_ID') || form.action === window.location.href) {
        e.preventDefault();
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const company = formData.get('company');
        const automate = formData.get('automate');
        const tool = formData.get('tool');
        const frequency = formData.get('frequency');
        const details = formData.get('details');
        
        const subject = `Project Request from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\nCompany/Website: ${company}\n\nWhat to automate: ${automate}\nCurrent tool: ${tool}\nFrequency: ${frequency}\n\nAdditional details:\n${details}`;
        
        window.location.href = `mailto:YOUR_EMAIL@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
});