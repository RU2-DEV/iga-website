/* ============================================
   Imagination Grove Academy — Main JS
   Runs on initial load AND after every Astro
   View Transition (astro:page-load), so behavior
   survives client-side navigation.
   ============================================ */

(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Mobile Navigation --- */
  function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.mobile-overlay');
    if (!hamburger || !mobileNav) return;

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
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (mobileNav.classList.contains('open')) toggleMenu();
      });
    });
  }

  /* --- Fade-In on Scroll, with stagger --- */
  function initFadeIns() {
    const fadeEls = document.querySelectorAll('.fade-in');
    if (!fadeEls.length) return;

    if (prefersReduced || !('IntersectionObserver' in window)) {
      fadeEls.forEach((el) => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          // Stagger siblings in the same container (e.g. card grids):
          // 0ms, 80ms, 160ms... capped at 400ms. Lone elements get no delay.
          const parent = el.parentElement;
          if (parent) {
            const siblings = Array.prototype.filter.call(
              parent.children,
              (c) => c.classList && c.classList.contains('fade-in')
            );
            const idx = siblings.indexOf(el);
            if (idx > 0) el.style.transitionDelay = Math.min(idx * 0.08, 0.4) + 's';
          }
          el.classList.add('visible');
          obs.unobserve(el);
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    fadeEls.forEach((el) => observer.observe(el));
  }

  /* --- Lead Form (Enroll Page) — submits to Netlify Forms --- */
  /* The browser's native validation runs first (required fields), so this
     handler only fires with a complete form. We POST in the background so
     the parent stays on the page and sees the confirmation in place. */
  function initForm() {
    const enrollForm = document.querySelector('.lead-form');
    if (!enrollForm) return;

    enrollForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = enrollForm.querySelector('button[type="submit"]');
      const status = enrollForm.querySelector('#form-status');
      if (!btn || btn.disabled) return;

      const originalText = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;

      const body = new URLSearchParams(new FormData(enrollForm)).toString();
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body,
      })
        .then((res) => {
          if (!res.ok) throw new Error('Submit failed: ' + res.status);
          btn.textContent = 'Tour Requested!';
          btn.style.background = 'var(--iga-green-mid)';
          btn.style.borderColor = 'var(--iga-green-mid)';
          if (status) status.textContent = 'Tour request received. We will follow up within 24 hours to confirm your tour time.';
          enrollForm.reset();
        })
        .catch(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          if (status) status.textContent = 'Something went wrong sending your request. Please try again, or email team@imaginationgroveacademy.com.';
        });
    });
  }

  /* --- Active Nav Link Highlighting (clean Astro routes) --- */
  function initActiveNav() {
    const path = (window.location.pathname.replace(/\/+$/, '') || '/');
    document.querySelectorAll('.nav-links a, .mobile-nav a:not(.btn)').forEach((link) => {
      const href = link.getAttribute('href') || '';
      if (href.includes('#') || href === '#') return; // skip anchor/secondary links
      const cleanHref = href.replace(/\/+$/, '') || '/';
      const isActive =
        cleanHref === '/' ? path === '/' : path === cleanHref || path.startsWith(cleanHref + '/');
      link.classList.toggle('active', isActive);
    });
  }

  function init() {
    initMobileNav();
    initFadeIns();
    initForm();
    initActiveNav();
  }

  /* --- Page-persistent globals: bind ONCE, even if this script re-runs --- */
  if (!window.__igaBound) {
    window.__igaBound = true;

    const onScroll = () => {
      const nav = document.querySelector('.site-nav');
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Escape closes the mobile menu (bound once on document — it survives
    // View Transitions, so it re-queries the current page's elements).
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      const openNav = document.querySelector('.mobile-nav.open');
      const hamburger = document.querySelector('.hamburger');
      if (openNav && hamburger) {
        hamburger.click();
        hamburger.focus();
      }
    });

    // astro:page-load fires on the initial load AND after every View Transition.
    document.addEventListener('astro:page-load', () => {
      onScroll();
      init();
    });
  }
})();
