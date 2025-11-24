(function () {
    "use strict";

    class ContactSection {
        constructor(rootNode) {
            this.rootNode = rootNode;
        }

        render() {
            const section = document.createElement("section");
            section.id = "contact";
            section.className = "section contact";

            section.innerHTML = `
                <div class="contact-card card">
                    <span class="section-subtitle">Hablemos</span>
                    <h2 class="section-title">Contacto</h2>
                    <p class="contact-text">
                        ¿Tienes una idea, proyecto o simplemente quieres charlar sobre tecnología, datos o música?
                        Mándame un mensaje y vemos cómo puedo aportar.
                    </p>
                    <div class="contact-list">
                        <div class="contact-item">
                            Email: <a href="mailto:mikemaranonx@gmail.com">mikemaranonx@gmail.com</a>
                        </div>
                        <div class="contact-item">
                            GitHub: <a href="https://github.com/Mikemaranon" target="_blank" rel="noopener">
                                github.com/Mikemaranon
                            </a>
                        </div>
                        <div class="contact-item">
                            LinkedIn: <a href="https://www.linkedin.com/in/mikemaranon/" target="_blank" rel="noopener">
                                linkedin.com/in/mikemaranon
                            </a>
                        </div>
                    </div>
                </div>
            `;

            this.rootNode.appendChild(section);
        }
    }

    window.ContactSection = ContactSection;
})();
