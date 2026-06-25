document.addEventListener("DOMContentLoaded", () => {
  // GSAP Entrance Animations
  const tl = gsap.timeline();

  // Animate the 404 digits
  tl.from(".digit", {
    y: -100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "bounce.out"
  })
  
  // Animate the text
  .from(".error-text-wrap > *", {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out"
  }, "-=0.4");

  // Floating animation for the "0" digit
  gsap.to(".bounce-digit", {
    y: 15,
    rotation: 5,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  // Mouse move parallax effect for the glowing backgrounds
  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;

    gsap.to(".error-glow", {
      x: x,
      y: y,
      duration: 1,
      ease: "power1.out"
    });
    
    gsap.to(".error-glow-2", {
      x: -x * 1.5,
      y: -y * 1.5,
      duration: 1,
      ease: "power1.out"
    });
  });
});
