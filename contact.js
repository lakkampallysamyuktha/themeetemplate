/* ═══════════════════════════════════════════════════════════
   CONTACT PAGE – JavaScript
   Hero Slideshow · Particles · Scroll Reveal · Form Validation
   FAQ Accordion · Hamburger Menu · Scroll-to-Top · Smooth Scrolling
   ═══════════════════════════════════════════════════════════ */

// ── HERO BACKGROUND SLIDESHOW ──
(function initHeroSlideshow() {
  const slides = document.querySelectorAll('.ct-hero-slide');
  const hero   = document.querySelector('.ct-hero');
  if (!slides.length || !hero) return;

  let current  = 0;
  let interval;

  function goToSlide(index) {
    slides[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
  }

  function startSlideshow() {
    interval = setInterval(() => {
      goToSlide(current + 1);
    }, 5000);
  }

  function stopSlideshow() {
    clearInterval(interval);
  }

  startSlideshow();
  hero.addEventListener('mouseenter', stopSlideshow);
  hero.addEventListener('mouseleave', startSlideshow);
})();

// ── PARTICLES ──
(function initParticles() {
  const container = document.getElementById('ctParticles');
  if (!container) return;

  const COUNT = 35;
  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    p.classList.add('ct-particle');
    p.style.left     = Math.random() * 100 + '%';
    p.style.bottom    = -(Math.random() * 40) + 'px';
    p.style.width     = (2 + Math.random() * 4) + 'px';
    p.style.height    = p.style.width;
    p.style.opacity   = (0.2 + Math.random() * 0.5).toString();
    p.style.animationDuration = (5 + Math.random() * 10) + 's';
    p.style.animationDelay    = (Math.random() * 8) + 's';
    container.appendChild(p);
  }
})();


// ── SCROLL REVEAL ──
(function initScrollReveal() {
  const elements = document.querySelectorAll('.ct-reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach((el) => observer.observe(el));
})();


// ── FORM VALIDATION ──
(function initFormValidation() {
  const form = document.getElementById('ctContactForm');
  if (!form) return;

  const fields = {
    name:    { el: document.getElementById('ctName'),    error: document.getElementById('ctNameError') },
    email:   { el: document.getElementById('ctEmail'),   error: document.getElementById('ctEmailError') },
    phone:   { el: document.getElementById('ctPhone'),   error: document.getElementById('ctPhoneError') },
    subject: { el: document.getElementById('ctSubject'), error: document.getElementById('ctSubjectError') },
    message: { el: document.getElementById('ctMessage'), error: document.getElementById('ctMessageError') }
  };

  const successMsg = document.getElementById('ctSuccess');
  const errorMsg   = document.getElementById('ctFormError');
  const submitBtn  = document.getElementById('ctSubmitBtn');

  // Validation rules
  function validateName() {
    const val = fields.name.el.value.trim();
    if (!val) return showError('name', 'Full name is required');
    if (val.length < 2) return showError('name', 'Name must be at least 2 characters');
    clearError('name');
    return true;
  }

  function validateEmail() {
    const val = fields.email.el.value.trim();
    const re  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val) return showError('email', 'Email address is required');
    if (!re.test(val)) return showError('email', 'Please enter a valid email');
    clearError('email');
    return true;
  }

  function validatePhone() {
    const val = fields.phone.el.value.trim();
    if (val && !/^[+\d\s()-]{7,20}$/.test(val)) {
      return showError('phone', 'Please enter a valid phone number');
    }
    clearError('phone');
    return true;
  }

  function validateSubject() {
    const val = fields.subject.el.value;
    if (!val) return showError('subject', 'Please select a subject');
    clearError('subject');
    return true;
  }

  function validateMessage() {
    const val = fields.message.el.value.trim();
    if (!val) return showError('message', 'Message is required');
    if (val.length < 10) return showError('message', 'Message must be at least 10 characters');
    clearError('message');
    return true;
  }

  function showError(field, msg) {
    fields[field].el.closest('.ct-input-group').classList.add('has-error');
    fields[field].error.textContent = msg;
    return false;
  }

  function clearError(field) {
    fields[field].el.closest('.ct-input-group').classList.remove('has-error');
    fields[field].error.textContent = '';
  }

  // Live validation on blur
  fields.name.el.addEventListener('blur', validateName);
  fields.email.el.addEventListener('blur', validateEmail);
  fields.phone.el.addEventListener('blur', validatePhone);
  fields.subject.el.addEventListener('change', validateSubject);
  fields.message.el.addEventListener('blur', validateMessage);

  // Clear error on input
  Object.keys(fields).forEach((key) => {
    const el = fields[key].el;
    el.addEventListener('input', () => clearError(key));
  });

  // Submit handler
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Hide previous messages
    successMsg.classList.remove('show');
    errorMsg.classList.remove('show');

    // Validate all
    const results = [
      validateName(),
      validateEmail(),
      validatePhone(),
      validateSubject(),
      validateMessage()
    ];

    if (results.includes(false)) {
      errorMsg.classList.add('show');
      // Scroll to first error
      const firstErr = form.querySelector('.has-error');
      if (firstErr) {
        firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Simulate sending
    submitBtn.classList.add('loading');

    window.location.href = '404.html';
  });
})();


// ── FAQ ACCORDION ──
(function initFaq() {
  const items = document.querySelectorAll('.ct-faq-item');
  if (!items.length) return;

  items.forEach((item) => {
    const btn = item.querySelector('.ct-faq-q');
    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all
      items.forEach((i) => {
        i.classList.remove('active');
        i.querySelector('.ct-faq-q').setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();


// ── SCROLL-TO-TOP ──
(function initScrollTop() {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
    btn.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


// ── MOBILE HAMBURGER MENU ──
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay    = document.getElementById('menuOverlay');
  const closeBtn   = document.getElementById('menuCloseBtn');
  const menuLinks  = mobileMenu?.querySelectorAll('.mobile-nav-links a') || [];

  if (!hamburger || !mobileMenu || !overlay) return;

  function openMenu() {
    mobileMenu.classList.add('open');
    overlay.classList.add('open');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  menuLinks.forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
  });

  // Sticky header on scroll
  const siteHeader = document.getElementById('siteHeader');
  if (siteHeader) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        siteHeader.style.background = '#ffffff';
        siteHeader.style.boxShadow  = '0 4px 30px rgba(0,0,0,0.08)';
      } else {
        siteHeader.style.background = 'transparent';
        siteHeader.style.boxShadow  = 'none';
      }
    }, { passive: true });
  }
})();


// ── SMOOTH SCROLL FOR ANCHOR LINKS ──
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();


// ── INFO CARDS: TILT ON HOVER ──
(function initCardTilt() {
  const cards = document.querySelectorAll('.ct-info-card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      card.style.transform = `translateY(-8px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

// ── INTERCEPT FORM SUBMISSIONS TO 404 ──
(function initFooterForm() {
  const newsletterForms = document.querySelectorAll('.footer-email-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      window.location.href = '404.html';
    });
  });

  window.addEventListener('pageshow', function(event) {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => form.reset());
  });
})();
