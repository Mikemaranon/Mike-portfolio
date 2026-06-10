(function () {
  "use strict";

  class RevealOnScroll {
    constructor(selector) {
      this.elements = document.querySelectorAll(selector);
      this.observer = new IntersectionObserver(this.handleEntries.bind(this), {
        threshold: 0.18
      });
    }

    start() {
      this.elements.forEach((element) => this.observer.observe(element));
    }

    handleEntries(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          this.observer.unobserve(entry.target);
        }
      });
    }
  }

  window.RevealOnScroll = RevealOnScroll;
})();
