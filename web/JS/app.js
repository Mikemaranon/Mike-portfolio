(function () {
    "use strict";

    window.addEventListener("DOMContentLoaded", () => {
        const appRoot = document.getElementById("app");
        if (!appRoot) return;

        const header = new window.Header({
            rootNode: appRoot,
            sections: [
                { id: "profile", label: "Inicio" },
                { id: "about", label: "Sobre mí" },
                { id: "projects", label: "Proyectos" },
                { id: "cv", label: "Experiencia & Formación" },
                { id: "contact", label: "Contacto" }
            ]
        });
        header.render();

        new window.ProfileSection(appRoot).render();
        new window.AboutSection(appRoot).render();
        new window.ProjectsSection(appRoot).render();
        new window.CvSection(appRoot).render();
        new window.ContactSection(appRoot).render();
        new window.Footer(appRoot).render();
    });
})();
