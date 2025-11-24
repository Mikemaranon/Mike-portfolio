(function () {
    "use strict";

    class ProfileSection {
        /**
         * @param {HTMLElement} rootNode
         */
        constructor(rootNode) {
            this.rootNode = rootNode;
        }

        render() {
            const section = document.createElement("section");
            section.id = "profile";
            section.className = "section profile";

            section.innerHTML = `
                <div class="profile-card card">
                    <div class="profile-main">
                        <div class="profile-text">
                            <span class="section-subtitle">Hello there! soy Mike</span>
                            <br>
                            <h1 class="profile-title">
                                Programador, Ingeniero de Datos y 
                                <span class="gradient">especialista en IA</span>
                            </h1>
                            <p class="profile-description">
                                Me muevo entre datos, desarrollo web e implementación de soluciones 
                                de Inteligencia Artificial en la nube y on-premise. 
                                Siempre buscando construir cosas útiles, sólidas y simples.
                            </p>
                            <div class="profile-tags">
                                <span class="chip">Data · Web · IA</span>
                                <span class="chip">Cloud & On-Prem</span>
                                <span class="chip">Linux & Sistemas</span>
                            </div>
                            <div class="profile-actions">
                                <a href="mailto:mikemaranonx@gmail.com" class="btn primary">
                                    Enviame un mail
                                </a>
                                <a href="#projects" class="btn ghost">
                                    Ver proyectos
                                </a>
                            </div><br>
                            <div class="profile-links">
                                <a href="https://www.linkedin.com/in/mikemaranon/" target="_blank" rel="noopener">
                                    LinkedIn
                                </a>
                                <a href="https://github.com/Mikemaranon" target="_blank" rel="noopener">
                                    GitHub
                                </a>
                                <a href="web/assets/docs/CV-Mike.pdf" target="_blank" rel="noopener">
                                    CV (PDF)
                                </a>
                            </div>
                        </div>
                        <div class="profile-photo-wrapper">
                            <div class="profile-photo-bg"></div>
                            <img 
                                src="web/assets/prof_pic.jpg" 
                                alt="Mike Marañón" 
                                class="profile-photo"
                            />
                        </div>
                    </div>
                </div>
            `;

            this.rootNode.appendChild(section);
        }
    }

    window.ProfileSection = ProfileSection;
})();
