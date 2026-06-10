(function () {
  "use strict";

  class ProjectCarousel {
    constructor() {
      this.projects = [
        {
          key: "horizone",
          image: "web/assets/horizone-logo.png",
          mobileImage: "web/assets/horizone-logo-small.png",
          alt: "HORIZONE logo",
          url: "https://mikemaranon.github.io/HORIZONE/",
          description: "HORIZONE is a local-first AI workspace built for chats, projects, profiles, providers and modular tools."
        },
        {
          key: "zertan",
          image: "web/assets/zertan-logo.png",
          mobileImage: "web/assets/zertan-logo.png",
          alt: "Zertan logo",
          url: "https://github.com/Mikemaranon/Zertan",
          description: "Zertan is an exam-focused study tool for structured practice, corrections and clear explanations."
        },
        {
          key: "github",
          image: "web/assets/github-logo.svg",
          mobileImage: "web/assets/github-logo.svg",
          alt: "GitHub logo",
          url: "https://github.com/Mikemaranon",
          description: "My GitHub profile collects public repositories, experiments and technical work across software, data and AI."
        }
      ];

      this.index = 0;
      this.logoStage = document.getElementById("project-link");
      this.logo = document.getElementById("project-logo");
      this.mobileSource = document.getElementById("project-mobile-source");
      this.description = document.getElementById("project-description");
      this.button = document.getElementById("project-button");
      this.dots = document.getElementById("carousel-dots");
      this.previous = document.querySelector(".carousel-control.previous");
      this.next = document.querySelector(".carousel-control.next");
    }

    start() {
      this.renderDots();
      this.bindEvents();
      this.render();
    }

    bindEvents() {
      this.previous.addEventListener("click", () => this.goTo(this.index - 1));
      this.next.addEventListener("click", () => this.goTo(this.index + 1));
    }

    renderDots() {
      this.dots.innerHTML = "";
      this.projects.forEach((project, dotIndex) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", `Show ${project.alt}`);
        dot.addEventListener("click", () => this.goTo(dotIndex));
        this.dots.appendChild(dot);
      });
    }

    goTo(nextIndex) {
      this.index = (nextIndex + this.projects.length) % this.projects.length;
      this.logoStage.classList.add("is-changing");
      window.setTimeout(() => {
        this.render();
        this.logoStage.classList.remove("is-changing");
      }, 160);
    }

    render() {
      const project = this.projects[this.index];
      this.logo.src = project.image;
      this.logo.alt = project.alt;
      this.logo.className = `project-logo project-logo-${project.key}`;
      this.mobileSource.srcset = project.mobileImage;
      this.logoStage.href = project.url;
      this.description.textContent = project.description;
      this.button.href = project.url;

      Array.from(this.dots.children).forEach((dot, dotIndex) => {
        dot.classList.toggle("is-active", dotIndex === this.index);
        dot.setAttribute("aria-current", dotIndex === this.index ? "true" : "false");
      });
    }
  }

  window.ProjectCarousel = ProjectCarousel;
})();
