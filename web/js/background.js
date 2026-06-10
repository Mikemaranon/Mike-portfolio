(function () {
  "use strict";

  class CircuitBackground {
    constructor(canvas) {
      this.canvas = canvas;
      this.context = canvas.getContext("2d");
      this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      this.nodes = [];
      this.animationFrame = null;
      this.resize = this.resize.bind(this);
      this.render = this.render.bind(this);
    }

    start() {
      this.resize();
      window.addEventListener("resize", this.resize);
      this.animationFrame = window.requestAnimationFrame(this.render);
    }

    resize() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      this.canvas.width = width * this.pixelRatio;
      this.canvas.height = height * this.pixelRatio;
      this.canvas.style.width = `${width}px`;
      this.canvas.style.height = `${height}px`;
      this.context.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
      this.nodes = this.createNodes(width, height);
    }

    createNodes(width, height) {
      const amount = Math.max(18, Math.floor(width / 70));
      return Array.from({ length: amount }, (_, index) => ({
        x: (index / amount) * width + Math.random() * 60,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.6,
        speed: Math.random() * 0.18 + 0.05,
        phase: Math.random() * Math.PI * 2
      }));
    }

    render(time) {
      const { width, height } = this.canvas.getBoundingClientRect();
      const ctx = this.context;

      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(124, 231, 255, 0.12)";
      ctx.fillStyle = "rgba(124, 231, 255, 0.38)";

      this.nodes.forEach((node, index) => {
        const drift = Math.sin(time * 0.00045 + node.phase) * 10;
        const x = node.x + drift;
        const y = (node.y + time * node.speed * 0.015) % height;

        ctx.beginPath();
        ctx.arc(x, y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        const next = this.nodes[index + 1];
        if (next && Math.abs(next.y - node.y) < height * 0.42) {
          const nextDrift = Math.sin(time * 0.00045 + next.phase) * 10;
          const nextY = (next.y + time * next.speed * 0.015) % height;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(next.x + nextDrift, y);
          ctx.lineTo(next.x + nextDrift, nextY);
          ctx.stroke();
        }
      });

      this.animationFrame = window.requestAnimationFrame(this.render);
    }
  }

  window.CircuitBackground = CircuitBackground;
})();
