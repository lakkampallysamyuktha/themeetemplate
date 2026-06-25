document.addEventListener("DOMContentLoaded", () => {
  // Simple scroll reveal logic matching the standard site aesthetic
  const revealElements = document.querySelectorAll('.bl-reveal-up');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Check for staggered delays
          const delay = entry.target.getAttribute('data-delay');
          if (delay) {
            entry.target.style.transitionDelay = delay;
          }
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Only animate once
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  }

  // Simple filter button toggle (visual only)
  const filterBtns = document.querySelectorAll('.bl-filters button');
  if(filterBtns) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }
});