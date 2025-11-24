(function () {
    "use strict";

    class CvSection {
        constructor(rootNode) {
            this.rootNode = rootNode;
        }

        render() {
            const section = document.createElement("section");
            section.id = "cv";
            section.className = "section cv";

            section.innerHTML = `
<div class="cv-card card">
    <div class="cv-grid">

        <!-- COLUMNA IZQUIERDA -->
        <div>
            <span class="section-subtitle">Trayectoria</span>
            <h2 class="section-title">Experiencia & formación</h2>

            <div class="cv-columns">

                <!-- EXPERIENCIA -->
                <div>
                    <h3 class="cv-block-title">Experiencia</h3>

                    <div class="cv-item">
                        <strong>Avanade - IA & Data (Beca de prácticas)</strong><br />
                        Participación en proyectos de inteligencia artificial y soluciones basadas en datos sobre Azure.
                    </div>

                    <br />

                    <div class="cv-item">
                        <strong>Base10 - Técnico ASIR (Prácticas duales)</strong><br />
                        Administración y soporte de sistemas, redes y servicios corporativos.
                    </div>

                    <br />

                    <div class="cv-item">
                        <strong>Proyectos personales de Datos & IA</strong><br />
                        Desarrollo independiente de pipelines, modelos aplicados y despliegues en cloud.
                    </div>
                </div>

                <!-- FORMACIÓN -->
                <div>
                    <h3 class="cv-block-title">Formación</h3>

                    <div class="cv-item">
                        <strong>Máster en Big Data e IA - Tajamar Tech</strong><br />
                        Especialización práctica en ingeniería de datos y machine learning.
                    </div>

                    <br />

                    <div class="cv-item">
                        <strong>CFGS ASIR - Padre Piquer</strong><br />
                        Formación técnica en infraestructura, redes, ciberseguridad y virtualización.
                    </div>

                    <br />

                    <div class="cv-item">
                        <strong>Ingeniería de Telecomunicación - UPM</strong><br />
                        Bases sólidas en programación, comunicaciones y sistemas.
                    </div>
                </div>
            </div>
        </div>

        <!-- COLUMNA DERECHA (CV) -->
        <div>
            <div class="cv-embed">
                <iframe src="web/assets/docs/CV-Mike.pdf" title="CV de Mike"></iframe>
            </div>
            <div class="cv-link">
                <p>Tu dispositivo no soporta la vista previa :(</p><br>
                <a href="web/assets/docs/CV-Mike.pdf" target="_blank" class="download-cv">
                    Ver/Descargar CV (PDF)
                </a>
            </div>
        </div>

        <!-- BLOQUE HISTORIA A TODO EL ANCHO -->
        <div class="cv-story">
            <h3 class="cv-block-title">Mi origen y objetivos</h3>

            <p>
                Mi trayectoria profesional conecta los sistemas, el desarrollo y los datos. Empecé trabajando
                desde la base de la infraestructura y las redes, adquiriendo una visión muy clara de cómo debe
                funcionar un entorno tecnológico para ser estable y eficiente.
            </p>

            <p>
                Con el tiempo orienté mi trabajo hacia la ingeniería de datos y la inteligencia artificial,
                donde puedo aplicar análisis, lógica y creatividad técnica. Me interesa especialmente convertir
                información compleja en soluciones prácticas que aporten valor real, automatizar procesos y
                facilitar la toma de decisiones.
            </p>

            <p>
                Mi experiencia en docencia y proyectos educativos complementa mi perfil técnico, aportando una
                visión comunicativa y humana: explicar ideas con claridad, colaborar con equipos diversos y
                diseñar soluciones que no solo funcionen, sino que se usen, se entiendan y se mantengan.
            </p>
        </div>

    </div>
</div>

            `;

            this.rootNode.appendChild(section);
        }
    }

    window.CvSection = CvSection;
})();
