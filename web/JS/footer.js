(function () {
    "use strict";

    class Footer {
        constructor(rootNode) {
            this.rootNode = rootNode;
        }

        render() {
            const footer = document.createElement("footer");
            footer.className = "footer";
            footer.innerHTML = `
                <span>© 2025 Mike Marañón. Todos los derechos reservados.</span>
                <span>Hecho con datos, código y un poco de ruido de guitarra.</span>
            `;
            this.rootNode.appendChild(footer);
        }
    }

    window.Footer = Footer;
})();
