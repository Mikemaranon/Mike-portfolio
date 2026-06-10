(function () {
  "use strict";

  function updateScrollDepth() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const depth = scrollable <= 0 ? 0 : Math.min(window.scrollY / scrollable, 1);
    document.documentElement.style.setProperty("--scroll-depth", depth.toFixed(3));
  }

  function startApplication() {
    const canvas = document.getElementById("circuit-canvas");
    const background = new window.CircuitBackground(canvas);
    const reveal = new window.RevealOnScroll(".revealable");
    const carousel = new window.ProjectCarousel();
    const magneticLogo = new window.MagneticLogo(document.querySelector(".magnetic-logo"));

    background.start();
    reveal.start();
    carousel.start();
    magneticLogo.start();
    updateScrollDepth();

    window.addEventListener("scroll", updateScrollDepth, { passive: true });
  }

  document.addEventListener("DOMContentLoaded", startApplication);
})();
