/* ============================================
   Imagination Grove Academy — Main JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Mobile Navigation --- */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.mobile-overlay');

  if (hamburger && mobileNav) {
    const toggleMenu = () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      if (overlay) overlay.classList.toggle('open');
      const isOpen = mobileNav.classList.contains('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    hamburger.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', toggleMenu);

    // Close mobile nav on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (mobileNav.classList.contains('open')) toggleMenu();
      });
    });
  }

  /* --- Nav Scroll Effect --- */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Fade-In on Scroll (IntersectionObserver) --- */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: make all visible immediately
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* --- Form Validation (Enroll Page) --- */
  const enrollForm = document.querySelector('.lead-form');
  if (enrollForm) {
    enrollForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // In production this would submit to a server.
      // For the mockup, show a simple confirmation.
      const btn = enrollForm.querySelector('button[type="submit"]');
      const status = enrollForm.querySelector('#form-status');
      const originalText = btn.textContent;
      btn.textContent = 'Tour Requested!';
      btn.disabled = true;
      btn.style.background = 'var(--iga-green-mid)';
      btn.style.borderColor = 'var(--iga-green-mid)';
      if (status) status.textContent = 'Tour request submitted. Watch for a confirmation email within two minutes.';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.background = '';
        btn.style.borderColor = '';
        if (status) status.textContent = '';
        enrollForm.reset();
      }, 3000);
    });
  }

  /* --- Active Nav Link Highlighting --- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a:not(.btn)').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

});
