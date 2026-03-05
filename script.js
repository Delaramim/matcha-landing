document.addEventListener("DOMContentLoaded", () => {
  gsap.defaults({ ease: "power3.out" });

  const video = document.querySelector(".bg-video");
  if (video) video.playbackRate = 0.35;

  /* ── Cursor-reactive ambient light (canvas) ── */

  const glowWrap = document.querySelector(".cursor-glow");
  const canvas = glowWrap && glowWrap.querySelector("canvas");

  if (canvas && window.matchMedia("(pointer: fine)").matches) {
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W, H;

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    let mouseX = W / 2;
    let mouseY = H / 2;
    let active = false;
    let fadeIn = 0;
    let frame = 0;

    const orbs = [
      { x: W * 0.5, y: H * 0.5, vx: 0, vy: 0, r: 500, color: [50, 140, 100],  alpha: 0.30, spring: 0.008, damping: 0.96, offsetX: 0,    offsetY: 0 },
      { x: W * 0.5, y: H * 0.5, vx: 0, vy: 0, r: 380, color: [80, 180, 130],  alpha: 0.22, spring: 0.018, damping: 0.93, offsetX: -80,  offsetY: 40 },
      { x: W * 0.5, y: H * 0.5, vx: 0, vy: 0, r: 260, color: [140, 220, 180], alpha: 0.20, spring: 0.035, damping: 0.90, offsetX: 60,   offsetY: -30 },
      { x: W * 0.5, y: H * 0.5, vx: 0, vy: 0, r: 160, color: [200, 250, 220], alpha: 0.18, spring: 0.06,  damping: 0.85, offsetX: -20,  offsetY: -50 },
      { x: W * 0.5, y: H * 0.5, vx: 0, vy: 0, r: 420, color: [30, 100, 80],   alpha: 0.16, spring: 0.005, damping: 0.97, offsetX: 120,  offsetY: 80 },
    ];

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!active) active = true;
    });

    document.addEventListener("mouseleave", () => {
      active = false;
    });

    function draw() {
      frame++;

      fadeIn += ((active ? 1 : 0) - fadeIn) * 0.04;
      glowWrap.style.opacity = fadeIn;

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < orbs.length; i++) {
        const orb = orbs[i];

        const breathX = Math.sin(frame * 0.008 + i * 1.8) * 30;
        const breathY = Math.cos(frame * 0.006 + i * 2.4) * 20;

        const targetX = mouseX + orb.offsetX + breathX;
        const targetY = mouseY + orb.offsetY + breathY;

        const dx = targetX - orb.x;
        const dy = targetY - orb.y;
        orb.vx += dx * orb.spring;
        orb.vy += dy * orb.spring;
        orb.vx *= orb.damping;
        orb.vy *= orb.damping;
        orb.x += orb.vx;
        orb.y += orb.vy;

        const pulse = 1 + Math.sin(frame * 0.01 + i * 2) * 0.08;
        const r = orb.r * pulse;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, r);
        const [cr, cg, cb] = orb.color;
        grad.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${orb.alpha})`);
        grad.addColorStop(0.3, `rgba(${cr}, ${cg}, ${cb}, ${orb.alpha * 0.5})`);
        grad.addColorStop(0.7, `rgba(${cr}, ${cg}, ${cb}, ${orb.alpha * 0.1})`);
        grad.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      requestAnimationFrame(draw);
    }

    draw();
  }

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
  .add(() => {
    const cta = document.querySelector(".hero-cta");
    const line = document.querySelector(".hero-line");
    const ctaRect = cta.getBoundingClientRect();

    line.style.top = (ctaRect.bottom + 20) + "px";

    gsap.to(line, {
      clipPath: "inset(0 0 0% 0)",
      duration: 1.6,
      ease: "power2.inOut",
    });

    gsap.to(".bottom-inner", {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.7,
    });
  }, "+=0.1");
});
