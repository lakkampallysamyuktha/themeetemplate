document.addEventListener("DOMContentLoaded", () => {
  
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // ═══════════════════════════════════════════════════════════════
  // 1. HERO SLIDESHOW & PARTICLES
  // ═══════════════════════════════════════════════════════════════
  
  const heroSlides = document.querySelectorAll('.ab-hero-slide');
  let currentHeroSlide = 0;
  if(heroSlides.length > 0) {
    setInterval(() => {
      heroSlides[currentHeroSlide].classList.remove('active');
      currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
      heroSlides[currentHeroSlide].classList.add('active');
    }, 5000);
  }

  // Particle Generation
  const particlesContainer = document.getElementById('abParticles');
  if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
      let p = document.createElement('div');
      p.className = 'ab-particle';
      p.style.width = Math.random() * 4 + 2 + 'px';
      p.style.height = p.style.width;
      p.style.left = Math.random() * 100 + 'vw';
      p.style.top = Math.random() * 100 + 'vh';
      p.style.opacity = Math.random() * 0.5 + 0.2;
      p.style.animation = `floatParticle ${Math.random() * 10 + 10}s infinite linear`;
      particlesContainer.appendChild(p);
    }
  }

  // Dynamic particle styles
  if (!document.getElementById('ab-particle-styles')) {
    const style = document.createElement('style');
    style.id = 'ab-particle-styles';
    style.textContent = `
      .ab-particle { position: absolute; background: #ff5722; border-radius: 50%; pointer-events: none; }
      @keyframes floatParticle {
        0% { transform: translateY(0) translateX(0); }
        50% { transform: translateY(-100px) translateX(20px); }
        100% { transform: translateY(-200px) translateX(-20px); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }


  // ═══════════════════════════════════════════════════════════════
  // 1.5 OUR STORY ANIMATIONS & TABS
  // ═══════════════════════════════════════════════════════════════

  // Custom 60 -> 70 -> 100 Image Scale Animation
  const storyImg = document.getElementById('storyAnimImgWrapper');
  if (storyImg) {
    gsap.to(storyImg, {
      scrollTrigger: {
        trigger: ".ab-story",
        start: "top 75%",
      },
      duration: 1.5,
      ease: "power2.out",
      keyframes: {
        "0%": { scale: 0.6, opacity: 0 },
        "60%": { scale: 0.7, opacity: 1 },
        "100%": { scale: 1, opacity: 1 }
      }
    });
  }

  // Tabs Logic
  const tabBtns = document.querySelectorAll('.ab-tab-btn');
  const tabPanes = document.querySelectorAll('.ab-tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      // Add active to clicked
      btn.classList.add('active');
      const targetPane = document.querySelector(btn.dataset.target);
      if (targetPane) targetPane.classList.add('active');
    });
  });





  // ═══════════════════════════════════════════════════════════════
  // 3. WHY CHOOSE US ANIMATIONS
  // ═══════════════════════════════════════════════════════════════
  
  gsap.to('.ab-feature-card', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".ab-features-grid",
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });

  // Team Section Text Animation
  gsap.from('.ab-team-left > *', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".ab-team-left",
      start: "top 85%",
      toggleActions: "play none none reverse"
    }
  });


  // ═══════════════════════════════════════════════════════════════
  // 4. TEAM CAROUSEL LOGIC
  // ═══════════════════════════════════════════════════════════════
  
  const slides = document.querySelectorAll('.ab-team-slide');
  const totalSlides = slides.length;
  let currentIndex = 0;
  let autoplayInterval;

  function updateCarousel(index) {
    slides.forEach((slide, i) => {
      // Calculate relative position with wrapping
      let diff = i - index;
      if (diff < 0) diff += totalSlides;

      // Reset classes
      slide.classList.remove('active', 'next', 'prev');
      
      let xOffset = window.innerWidth <= 768 ? 40 : 200;
      let prevOffset = window.innerWidth <= 768 ? -40 : -50;
      let nextAlpha = window.innerWidth <= 768 ? 0 : 0.4;

      if (diff === 0) {
        // ACTIVE SLIDE
        slide.classList.add('active');
        gsap.to(slide, { x: 0, scale: 1, autoAlpha: 1, zIndex: 3, duration: 0.8, ease: "power3.inOut" });
      } else if (diff === 1 || (index === totalSlides - 1 && i === 0)) {
        // NEXT SLIDE (Right side preview)
        slide.classList.add('next');
        gsap.to(slide, { x: xOffset, scale: 0.85, autoAlpha: nextAlpha, zIndex: 2, duration: 0.8, ease: "power3.inOut" });
      } else {
        // PREV / HIDDEN SLIDE (Pushed left/back)
        slide.classList.add('prev');
        gsap.to(slide, { x: prevOffset, scale: 0.85, autoAlpha: 0, zIndex: 1, duration: 0.8, ease: "power3.inOut" });
      }
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel(currentIndex);
  }

  // Initialize
  if (totalSlides > 0) {
    // Initial positioning without animation delay
    updateCarousel(currentIndex);

    // Controls
    document.getElementById('teamNext').addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });
    document.getElementById('teamPrev').addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });

    // Auto-scroll
    function startAutoplay() {
      autoplayInterval = setInterval(nextSlide, 4000);
    }
    function resetAutoplay() {
      clearInterval(autoplayInterval);
      startAutoplay();
    }
    startAutoplay();
  }


  // ═══════════════════════════════════════════════════════════════
  // 5. ACHIEVEMENTS & COUNTERS
  // ═══════════════════════════════════════════════════════════════
  
  const counters = document.querySelectorAll('.ab-counter');
  
  ScrollTrigger.create({
    trigger: ".ab-stats-grid",
    start: "top 80%",
    once: true,
    onEnter: () => {
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        gsap.to(counter, {
          innerHTML: target,
          duration: 2,
          snap: { innerHTML: 1 },
          ease: "power2.out"
        });
      });
    }
  });

});