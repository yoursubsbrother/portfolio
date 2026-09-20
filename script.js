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

// ===== VIDEO MODAL SYSTEM =====
(function () {
  const openTriggers = document.querySelectorAll('[data-modal-open]');
  if (!openTriggers.length) return;

  let lastFocusedElement = null;

  function getFocusable(container) {
    return container.querySelectorAll(
      'button, [href], input, select, textarea, video[controls], [tabindex]:not([tabindex="-1"])'
    );
  }

  function openModal(modal) {
    if (!modal) return;
    lastFocusedElement = document.activeElement;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-locked');

    // Focus the close button so keyboard users can exit immediately
    const closeBtn = modal.querySelector('[data-modal-close]');
    if (closeBtn) closeBtn.focus();

    // Autoplay is intentionally NOT triggered — the user presses play.
  }

  function closeModal(modal) {
    if (!modal) return;

    const video = modal.querySelector('video');
    if (video) {
      video.pause();
      video.currentTime = 0; // reset so reopening starts from the beginning
    }

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-locked');

    if (lastFocusedElement) lastFocusedElement.focus();
  }

  // Wire up every trigger
  openTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      openModal(document.getElementById(trigger.dataset.modalOpen));
    });
  });

  // Wire up every close button
  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.closest('.modal-overlay')));
  });

  // Close when clicking the dark backdrop (but not the modal itself)
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeModal(overlay);
    });
  });

  // Keyboard: Escape to close, Tab trapped inside modal
  document.addEventListener('keydown', e => {
    const openModalEl = document.querySelector('.modal-overlay.is-open');
    if (!openModalEl) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal(openModalEl);
      return;
    }

    if (e.key === 'Tab') {
      const focusable = Array.from(getFocusable(openModalEl))
        .filter(el => el.offsetParent !== null);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
})();