document.addEventListener("DOMContentLoaded", () => {
  gsap.defaults({ ease: "power3.out" });

  const video = document.querySelector(".bg-video");
  if (video) video.playbackRate = 0.35;

  /* ── Set initial states ── */

  gsap.set(".hero-title", { y: 40 });
  gsap.set(".hero-subtitle", { y: 30 });
  gsap.set(".hero-cta", { y: 20 });

  /* ── Entrance timeline ── */

  const tl = gsap.timeline({ delay: 0.3 });

  tl.to(".logo", {
    opacity: 1,
    duration: 0.8,
    ease: "power2.out",
  })
  .to(".nav-right", {
    opacity: 1,
    duration: 0.8,
    ease: "power2.out",
  }, "-=0.5")
  .to(".hero-title", {
    opacity: 1,
    y: 0,
    duration: 1.1,
    ease: "power3.out",
  }, "-=0.3")
  .to(".hero-subtitle", {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: "power3.out",
  }, "-=0.6")
  .to(".hero-cta", {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: "power3.out",
  }, "-=0.5")
  .to(".hero-line", {
    height: 240,
    duration: 1.6,
    ease: "power2.inOut",
  }, "-=0.3")
  .to(".bottom-inner", {
    opacity: 1,
    duration: 0.8,
    ease: "power2.out",
  }, "-=0.9");
});
