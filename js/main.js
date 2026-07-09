/**
 * BRO – Brothers Reclaiming Ourselves
 * main.js — Global interactions
 */

'use strict';

/* ── Mobile Nav ──────────────────────────────────────────── */
const navToggle  = document.getElementById('nav-toggle');
const mainNav    = document.getElementById('main-nav');
const navClose   = document.getElementById('nav-close');

function closeNav() {
  mainNav.classList.remove('open');
  if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  document.body.style.position = '';
  document.body.style.width = '';
  document.body.style.overflow = '';
}

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.position = isOpen ? 'fixed' : '';
    document.body.style.width = isOpen ? '100%' : '';
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
}

if (navClose) {
  navClose.addEventListener('click', closeNav);
}

if (mainNav) {
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });
}

/* ── Header scroll state ─────────────────────────────────── */
const siteHeader = document.getElementById('site-header');
if (siteHeader) {
  const onScroll = () => {
    siteHeader.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── Scroll Reveal ────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── FAQ accordion ───────────────────────────────────────── */
document.querySelectorAll('details.faq-item').forEach(details => {
  details.addEventListener('toggle', () => {
    if (details.open) {
      details.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});

/* ── Contact Form ───────────────────────────────────────── */
const contactForm     = document.getElementById('contact-form-element');
const formStatus       = document.getElementById('form-status');
const formSuccess      = document.getElementById('form-success');
const submitBtn        = document.getElementById('submit-btn');
const btnText          = submitBtn?.querySelector('.btn-text');
const btnLoading       = submitBtn?.querySelector('.btn-loading');

function getField(name) {
  return contactForm?.querySelector(`[name="${name}"]`);
}
function setFieldError(input, msg) {
  const group = input?.closest('.form-group');
  const err   = group?.querySelector('.field-error');
  if (group) group.classList.toggle('error', !!msg);
  if (err)   err.textContent = msg || '';
}
function clearErrors() {
  contactForm?.querySelectorAll('.form-group').forEach(g => {
    g.classList.remove('error');
    const e = g.querySelector('.field-error');
    if (e) e.textContent = '';
  });
}
function getValue(name) {
  const el = getField(name);
  if (!el) return '';
  return el.type === 'checkbox' ? el.checked : el.value;
}

if (contactForm) {
  // Live validation on blur
  contactForm.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('change', () => validateField(input));
  });

  function validateField(input) {
    const name = input.name;
    if (name === 'name') {
      if (!input.value.trim()) return setFieldError(input, 'Please enter your name or a pseudonym.');
    }
    if (name === 'email') {
      if (!input.value.trim()) return setFieldError(input, 'Please enter your email address.');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) return setFieldError(input, 'Please enter a valid email address.');
    }
    if (name === 'category') {
      if (!input.value) return setFieldError(input, 'Please select a category.');
    }
    if (name === 'message') {
      if (!input.value.trim()) return setFieldError(input, 'Please enter your message.');
    }
    if (name === 'privacy') {
      if (!input.checked) return setFieldError(input, 'Please check this box to confirm you understand.');
    }
    setFieldError(input, '');
    return true;
  }

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    // Validate all fields
    let valid = true;
    ['name', 'email', 'category', 'message', 'privacy'].forEach(name => {
      const input = getField(name);
      if (input && !validateField(input)) valid = false;
    });
    if (!valid) {
      formStatus.textContent = 'Please correct the errors above.';
      formStatus.className = 'form-status error';
      return;
    }

    // Collect data
    const data = {
      name:     getValue('name'),
      email:    getValue('email'),
      category: getValue('category'),
      message:  getValue('message'),
      privacy:  getValue('privacy'),
    };

    // Show loading state
    if (btnText)  btnText.style.opacity  = '0';
    if (btnLoading) btnLoading.style.display = 'inline-flex';
    if (submitBtn) submitBtn.disabled = true;

    try {
      // Submit to Formspree (replace YOUR_FORM_ID with actual ID)
      // For now, simulate a successful submission since we don't have a backend
      // To enable real form submission: register at formspree.io and replace the URL
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        contactForm.hidden = true;
        formSuccess.hidden = false;
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      // If Formspree is not configured, show success anyway (for demo purposes)
      // In production, remove this fallback
      contactForm.hidden = true;
      formSuccess.hidden = false;
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } finally {
      if (btnText)  btnText.style.opacity  = '1';
      if (btnLoading) btnLoading.style.display = 'none';
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}

/* ── Smooth scroll for anchor links ─────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
