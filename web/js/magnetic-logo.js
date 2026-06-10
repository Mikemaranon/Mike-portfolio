(function () {
  "use strict";

  class MagneticLogo {
    constructor(element) {
      this.element = element;
      this.maxDistance = 9;
      this.handleMove = this.handleMove.bind(this);
      this.reset = this.reset.bind(this);
    }

    start() {
      this.element.addEventListener("mousemove", this.handleMove);
      this.element.addEventListener("mouseleave", this.reset);
    }

    handleMove(event) {
      const box = this.element.getBoundingClientRect();
      const x = event.clientX - box.left - box.width / 2;
      const y = event.clientY - box.top - box.height / 2;
      const moveX = (x / box.width) * this.maxDistance;
      const moveY = (y / box.height) * this.maxDistance;

      this.element.style.setProperty("transform", `translate3d(${moveX}px, ${moveY}px, 0)`);
    }

    reset() {
      this.element.style.removeProperty("transform");
    }
  }

  window.MagneticLogo = MagneticLogo;
})();
