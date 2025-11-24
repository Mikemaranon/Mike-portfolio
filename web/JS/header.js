(function () {
    "use strict";

    class Header {
        constructor({ rootNode, sections }) {
            this.rootNode = rootNode;
            this.sections = sections;
            this._navLinks = [];
        }

        render() {
            const header = document.createElement("header");
            header.className = "header";

            const nav = document.createElement("nav");
            nav.className = "header-nav card";

            /* BRAND */
            const left = document.createElement("div");
            left.className = "header-brand";
            left.innerHTML = `
                <span class="header-logo">
                    <img src="web/assets/myke_icon.png" alt="Logo de Mike" class="header-logo-img" />
                </span>

                <div class="header-name">
                    <span class="primary">Mike Marañón</span>
                    <span class="secondary">Data · Web · IA</span>
                </div>
            `;

            /* LINKS */
            const ul = document.createElement("ul");
            ul.className = "header-links";

            this.sections.forEach((section) => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.href = `#${section.id}`;
                a.textContent = section.label;
                a.className = "header-link";
                li.appendChild(a);
                ul.appendChild(li);
                this._navLinks.push(a);
            });

            /* BURGUER */
            const toggle = document.createElement("button");
            toggle.className = "header-toggle";
            toggle.setAttribute("aria-label", "Abrir menú");
            toggle.innerHTML = "☰";

            toggle.addEventListener("click", () => {
                nav.classList.toggle("open");
            });

            /* BUILD NAV */
            nav.appendChild(left);
            nav.appendChild(ul);
            nav.appendChild(toggle);
            header.appendChild(nav);

            this.rootNode.appendChild(header);
            this._setupHeaderScrollBehavior(header);

            this._setupSmoothScroll();
            this._setupActiveOnScroll();
        }

        _setupSmoothScroll() {
            this._navLinks.forEach((link) => {
                link.addEventListener("click", (event) => {
                    event.preventDefault();
                    const targetId = link.getAttribute("href").substring(1);
                    const target = document.getElementById(targetId);
                    if (!target) return;

                    const headerOffset = 90;
                    const rect = target.getBoundingClientRect();
                    const offsetPosition =
                        rect.top + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                });
            });
        }

        _setupActiveOnScroll() {
            const sectionIds = this.sections.map((s) => s.id);
            const handleScroll = () => {
                let current = null;

                sectionIds.forEach((id) => {
                    const section = document.getElementById(id);
                    if (!section) return;
                    const sectionTop = section.offsetTop - 140;
                    if (window.pageYOffset >= sectionTop) {
                        current = id;
                    }
                });

                this._navLinks.forEach((link) => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${current}`
                    );
                });
            };

            window.addEventListener("scroll", handleScroll);
            handleScroll();
        }

        _setupHeaderScrollBehavior(header) {
            const onScroll = () => {
                if (window.scrollY > 10) {
                    header.classList.add("scrolled");
                } else {
                    header.classList.remove("scrolled");
                }
            };

            window.addEventListener("scroll", onScroll);
            onScroll();
        }
    }

    window.Header = Header;
})();
