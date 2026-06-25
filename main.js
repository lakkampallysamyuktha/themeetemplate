// ── HERO SLIDESHOW ──
const slides = document.querySelectorAll('.hero-slide');
const hero = document.querySelector('.hero');

if (slides.length > 0 && hero) {
  let current = 0;
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
} else {
  // No hero on this page – do nothing
}

// ── SOLUTIONS SERVICES SCROLL-IN ANIMATION ──
const solutionsSection = document.querySelector('.solutions-services');
if (solutionsSection) {
  const solutionsObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        solutionsSection.classList.add('in-view');
        solutionsObs.disconnect();
      }
    });
  }, { threshold: 0.2 });
  solutionsObs.observe(solutionsSection);
}

// ── ABOUT SECTION SCROLL-IN ANIMATION ──
const aboutSection = document.querySelector('.about');
if (aboutSection) {
  const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        aboutSection.classList.add('in-view');
        aboutObserver.disconnect();
      }
    });
  }, { threshold: 0.25 });
  aboutObserver.observe(aboutSection);
}

// ── IT SOLUTIONS & TEAMS ANIMATION ──
const itSolutionsSection = document.querySelector('.it-solutions');
if (itSolutionsSection) {
  const itObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        itSolutionsSection.classList.add('in-view');
        itObs.disconnect();
      }
    });
  }, { threshold: 0.2 });
  itObs.observe(itSolutionsSection);
}

const teamsSection = document.querySelector('.teams');
if (teamsSection) {
  const teamsObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        teamsSection.classList.add('in-view');
        teamsObs.disconnect();
      }
    });
  }, { threshold: 0.2 });
  teamsObs.observe(teamsSection);
}

// ── STATS BAR BACKGROUND PARALLAX ──
const statsBg = document.querySelector('.stats-bg');
if (statsBg) {
  const statsBar = document.querySelector('.stats-bar');
  function updateStatsParallax() {
    const rect = statsBar.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      const offset = rect.top * 0.15;
      statsBg.style.transform = `translateY(${offset}px)`;
    }
  }
  window.addEventListener('scroll', updateStatsParallax, { passive: true });
  updateStatsParallax();
}

// ── SERVICES: click to switch active row + swap image ──
const serviceItems = document.querySelectorAll('.service-item');
const servicesImg = document.getElementById('servicesImg');
if (serviceItems.length > 0 && servicesImg) {
  serviceItems.forEach((item) => {
    item.addEventListener('click', () => {
      serviceItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const newSrc = item.dataset.img;
      if (newSrc) {
        servicesImg.style.opacity = '0';
        servicesImg.style.transition = 'opacity 0.3s';
        setTimeout(() => {
          servicesImg.src = newSrc;
          servicesImg.style.opacity = '1';
        }, 300);
      }
    });
  });
}

// Animate progress fills once services section enters viewport
const servicesSection = document.querySelector('.services');
if (servicesSection) {
  const fills = servicesSection.querySelectorAll('.service-progress-fill');
  if (fills.length > 0) {
    fills.forEach(f => {
      const target = f.style.width;
      f.style.width = '0';
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setTimeout(() => { f.style.width = target; }, 200);
            obs.disconnect();
          }
        });
      }, { threshold: 0.3 });
      obs.observe(servicesSection);
    });
  }
}

// ── SERVICES IMAGE: SLIDE FROM RIGHT ──
const servicesSection2 = document.querySelector('.services');
if (servicesSection2) {
  const imgWrap = servicesSection2.querySelector('.services-image-wrap');
  if (imgWrap) {
    const imgObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          servicesSection2.classList.add('in-view');
          imgObs.disconnect();
        }
      });
    }, { threshold: 0.2 });
    imgObs.observe(servicesSection2);
  }
}

// ── EXPERTS SECTION: COUNT-UP ANIMATION ──
const expertsSection = document.querySelector('.experts');
if (expertsSection) {
  const counters = expertsSection.querySelectorAll('.experts-stat-num');
  let hasRun = false;
  function easeOutQuad(t) { return t * (2 - t); }
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2200;
    const startTime = performance.now();
    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      el.textContent = Math.floor(easeOutQuad(progress) * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(step);
  }
  const expertObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasRun) {
        hasRun = true;
        expertsSection.classList.add('in-view');
        counters.forEach((c) => animateCounter(c));
        expertObs.disconnect();
      }
    });
  }, { threshold: 0.3 });
  expertObs.observe(expertsSection);
}

// ── TEAM SECTION ──
const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Lead Developer & Strategist",
    bio: "Sarah brings over 12 years of experience in full-stack development and agile methodologies, helping Fortune 500 companies scale their digital infrastructure.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Michael Chen",
    role: "Cloud Architecture Director",
    bio: "Michael specializes in AWS and Azure cloud solutions, ensuring seamless scalability and security for high-growth startups and enterprise clients.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Emily Rodriguez",
    role: "UX/UI Design Lead",
    bio: "Emily is passionate about human-centered design. She leads our creative team in building intuitive interfaces that users love to engage with.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "David Kim",
    role: "Data Science & AI Expert",
    bio: "David leverages machine learning and predictive analytics to turn complex data into actionable business insights for our clients.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face"
  }
];

let currentTeamIndex = 0;
const mainImg = document.getElementById('mainTeamImg');
const contentDiv = document.getElementById('teamContent');
const thumbs = document.querySelectorAll('.team-thumb');

function updateTeam(index) {
  const member = teamMembers[index];
  if (!member) return;
  mainImg.src = member.img;
  mainImg.alt = member.name;
  contentDiv.style.opacity = '0';
  setTimeout(() => {
    contentDiv.innerHTML = `
      <span class="teams-eyebrow">Our Experts</span>
      <h2>${member.name}</h2>
      <p class="teams-role">${member.role}</p>
      <p class="teams-bio">${member.bio}</p>
      <div class="teams-social">
        <a href="404.html" class="ti ti-brand-facebook"></a>
        <a href="404.html" class="ti ti-brand-twitter"></a>
        <a href="404.html" class="ti ti-brand-linkedin"></a>
        <a href="404.html" class="ti ti-brand-instagram"></a>
      </div>
    `;
    contentDiv.style.opacity = '1';
  }, 150);
  thumbs.forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });
  currentTeamIndex = index;
}

if (thumbs.length > 0 && mainImg && contentDiv) {
  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const index = parseInt(thumb.dataset.index, 10);
      if (index !== currentTeamIndex) {
        updateTeam(index);
      }
    });
  });
  updateTeam(0);
}

// ── BLOG SECTION: SCROLL-IN ANIMATION ──
const blogSection = document.querySelector('.blogs');
if (blogSection) {
  const blogObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        blogSection.classList.add('in-view');
        blogObserver.disconnect();
      }
    });
  }, { threshold: 0.15 });
  blogObserver.observe(blogSection);
}

// ── FOOTER: SCROLL-TO-TOP BUTTON ──
const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── MOBILE HAMBURGER MENU ──
(function() {
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('menuOverlay');
  const closeBtn = document.getElementById('menuCloseBtn');
  const menuLinks = mobileMenu?.querySelectorAll('.mobile-nav-links a') || [];

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

  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  menuLinks.forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
  });

    // Sticky white header on scroll
    const siteHeader = document.getElementById('siteHeader');
    if (siteHeader) {
      window.addEventListener('scroll', function() {
        if (window.scrollY > 30) {
          siteHeader.style.background = '#ffffff';
          siteHeader.style.boxShadow = '0 4px 30px rgba(0,0,0,0.08)';
        } else {
          siteHeader.style.background = 'transparent';
          siteHeader.style.boxShadow = 'none';
        }
      }, { passive: true });
    }
  })();

  // ── CLEAR FORMS ON BACK NAVIGATION ──
  window.addEventListener('pageshow', function(event) {
    // This clears the newsletter email input when you click "Go Back" from the 404 page
    const forms = document.querySelectorAll('form');
    forms.forEach(form => form.reset());
  });

  // ── INTERCEPT FORM SUBMISSIONS TO 404 ──
  const newsletterForms = document.querySelectorAll('.footer-email-form, .bl-newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent actual POST request
      window.location.href = '404.html';
    });
  });