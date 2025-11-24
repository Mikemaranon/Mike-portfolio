(function () {
    "use strict";

    class AboutSection {
        /**
         * @param {HTMLElement} rootNode
         */
        constructor(rootNode) {
            this.rootNode = rootNode;
        }

        render() {
            const section = document.createElement("section");
            section.id = "about";
            section.className = "section about";

            section.innerHTML = `
                <div class="about-card card">
                    <div>
                        <span class="section-subtitle">Quién soy</span>
                        <h2 class="section-title">Sobre mí</h2>
                        <div class="about-text">
                            <p>
                                Soy Mike Marañón. Me defino por la curiosidad y las ganas constantes de aprender y crear.
                                Me apasiona entender cómo funcionan las cosas y buscar siempre una vuelta más eficiente o innovadora.
                            </p>
                            <p>
                                La tecnología y la música son mis dos grandes motores: disfruto tanto programando soluciones útiles
                                como tocando en una banda con amigos. Me gusta trabajar en equipo, enfrentar desafíos con cabeza fría
                                y nunca perder la chispa creativa.
                            </p>
                        </div>
                        <div class="visit-blog-wrapper">
                            <a href="https://team-siberik.github.io/siberik-web" class="visit-blog">
                                Descubre mi proyecto
                            </a>
                        </div>
                    </div>

                    <div class="about-highlights">
                        <div class="about-highlight">
                            <span class="about-highlight-dot"></span>
                            <p>Experiencia cruzando <strong>desarrollo, datos e infraestructura</strong>.</p>
                        </div>
                        <div class="about-highlight">
                            <span class="about-highlight-dot"></span>
                            <p>Foco en soluciones <strong>simples, mantenibles</strong> y con impacto real.</p>
                        </div>
                        <div class="about-highlight">
                            <span class="about-highlight-dot"></span>
                            <p>Interés especial en <strong>IA aplicada</strong> a problemas concretos del día a día.</p>
                        </div>
                    </div>
                </div>
            `;

            this.rootNode.appendChild(section);
        }
    }

    window.AboutSection = AboutSection;
})();
