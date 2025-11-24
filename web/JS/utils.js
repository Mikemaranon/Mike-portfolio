(function () {
    "use strict";

    /**
     * Crea un elemento con clases y contenido opcional.
     * @param {string} tag
     * @param {string|string[]} [classNames]
     * @param {string} [html]
     * @returns {HTMLElement}
     */
    function createElement(tag, classNames, html) {
        const el = document.createElement(tag);
        if (classNames) {
            if (Array.isArray(classNames)) {
                el.className = classNames.join(" ");
            } else {
                el.className = classNames;
            }
        }
        if (html) {
            el.innerHTML = html;
        }
        return el;
    }

    /**
     * Helper para fetch JSON con manejo básico de errores.
     * @param {string} url
     * @returns {Promise<any>}
     */
    async function fetchJson(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("HTTP " + response.status);
        }
        return await response.json();
    }

    window.Utils = {
        createElement,
        fetchJson
    };
})();
