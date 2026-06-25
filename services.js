// ── SCROLL-TRIGGERED REVEALS ──
// Handles: sv-fade-up, sv-fade-down, sv-fade-left, sv-fade-right, sv-fade-scale, sv-fade-zoom
const svRevealEls = document.querySelectorAll(
  '.sv-fade-up, .sv-fade-down, .sv-fade-left, .sv-fade-right, .sv-fade-scale, .sv-fade-zoom'
);

if (svRevealEls.length) {
  const svObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || '0s';
        el.style.transitionDelay = delay;
        el.classList.add('in-view');
        svObserver.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  svRevealEls.forEach((el) => svObserver.observe(el));
}

// ── STAGGERED CHILDREN REVEAL ──
const svStaggerParents = document.querySelectorAll('.sv-stagger-children');
if (svStaggerParents.length) {
  const svStaggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const children = Array.from(entry.target.children);
        children.forEach((child, i) => {
          child.style.transitionDelay = `${i * 0.13}s`;
          child.classList.add('in-view');
        });
        svStaggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  svStaggerParents.forEach((el) => svStaggerObserver.observe(el));
}

// ── IMAGE GRID CARDS: SEQUENTIAL REVEAL ──
const svImgGrid = document.querySelector('.sv-img-grid-inner');
if (svImgGrid) {
  const gridObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.sv-img-card');
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.classList.add('sv-card-revealed');
          }, i * 100);
        });
        gridObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  gridObs.observe(svImgGrid);
}

// ── PROCESS STEPS: SLIDE UP IN SEQUENCE ──
const svProcessSteps = document.querySelectorAll('.sv-step');
if (svProcessSteps.length) {
  const stepObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        stepObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });
  svProcessSteps.forEach((step, i) => {
    step.style.transitionDelay = `${i * 0.12}s`;
    stepObs.observe(step);
  });
}

// ── PRICING CARDS: POP UP WITH STAGGER ──
const svPricingCards = document.querySelectorAll('.sv-plan');
if (svPricingCards.length) {
  const pricingObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        pricingObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  svPricingCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.15}s`;
    pricingObs.observe(card);
  });
}

// ── INTRO STATS: COUNT-UP ──
const svStatNums = document.querySelectorAll('.sv-banner-stat-num[data-target]');

if (svStatNums.length) {
  const animateSvStat = (el) => {
    const target = parseFloat(el.dataset.target);
    const duration = 1800;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const svStatObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSvStat(entry.target);
        svStatObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  svStatNums.forEach((el) => svStatObserver.observe(el));
}

// ── INTRO SECTION: LEFT/RIGHT SPLIT ──
const svIntroInner = document.querySelector('.sv-intro-inner');
if (svIntroInner) {
  const introObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        svIntroInner.classList.add('in-view');
        introObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  introObs.observe(svIntroInner);
}

// ── CTA SECTION: ZOOM + FADE ──
const svCtaInner = document.querySelector('.sv-cta-inner');
if (svCtaInner) {
  const ctaObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        svCtaInner.classList.add('in-view');
        ctaObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  ctaObs.observe(svCtaInner);
}

// ── PLAN FEATURES: CASCADE ON HOVER ──
const svPlans = document.querySelectorAll('.sv-plan');
svPlans.forEach((plan) => {
  const items = plan.querySelectorAll('.sv-plan-features li');
  plan.addEventListener('mouseenter', () => {
    items.forEach((li, i) => {
      li.style.transitionDelay = `${i * 0.06}s`;
      li.classList.add('hovered');
    });
  });
  plan.addEventListener('mouseleave', () => {
    items.forEach((li) => {
      li.style.transitionDelay = '0s';
      li.classList.remove('hovered');
    });
  });
});

// ── MOBILE TOUCH: tap to reveal grid card overlay ──
const svImgCards = document.querySelectorAll('.sv-img-card');
if (svImgCards.length && window.matchMedia('(max-width: 700px)').matches) {
  svImgCards.forEach((card) => {
    card.addEventListener('click', function () {
      const isOpen = this.classList.contains('touched');
      svImgCards.forEach(c => c.classList.remove('touched'));
      if (!isOpen) this.classList.add('touched');
    });
  });
}