(function () {
    "use strict";

    const username = "Mikemaranon";

    const categories = {
        ia: null,
        web: null,
        systems: null,
        other: null
    };

    async function fetchRepos() {
        const cached = localStorage.getItem("repos_cache");
        const cacheTime = localStorage.getItem("repos_cache_time");
        const oneDay = 24 * 60 * 60 * 1000;

        if (cached && cacheTime && (Date.now() - cacheTime < oneDay)) {
            const repos = JSON.parse(cached);
            renderProjects(repos);
        } else {
            try {
                const response = await fetch(`https://api.github.com/users/${username}/repos`, {
                    headers: {
                        Accept: "application/vnd.github.mercy-preview+json"
                    }
                });
                const repos = await response.json();
                localStorage.setItem("repos_cache", JSON.stringify(repos));
                localStorage.setItem("repos_cache_time", Date.now().toString());
                renderProjects(repos);
            } catch (error) {
                console.error("Error fetching repos:", error);
                if (categories.other) {
                    categories.other.innerHTML = "<p>Error al cargar los proyectos.</p>";
                }
            }
        }
    }

    function renderProjects(repos) {
        repos.forEach(async (repo) => {
            const button = document.createElement("a");
            button.classList.add("project-button");
            button.href = repo.html_url;
            button.target = "_blank";

            button.innerHTML = `
                <div class="project-title">${repo.name}</div>
                <div class="project-description">${repo.description || "Sin descripción"}</div>
                <div class="project-languages"></div>
            `;

            const topics = repo.topics || [];
            if (topics.includes("ai") || topics.includes("bigdata")) {
                categories.ia && categories.ia.appendChild(button);
            } else if (topics.includes("website")) {
                categories.web && categories.web.appendChild(button);
            } else if (topics.includes("systems")) {
                categories.systems && categories.systems.appendChild(button);
            } else {
                categories.other && categories.other.appendChild(button);
            }

            const languagesDiv = button.querySelector(".project-languages");
            try {
                const langResponse = await fetch(repo.languages_url);
                const languages = await langResponse.json();
                renderLanguages(languages, languagesDiv);
            } catch (error) {
                console.error(`Error fetching languages for ${repo.name}:`, error);
            }
        });
    }

    function renderLanguages(languages, container) {
        if (!container) return;
        container.classList.add("languages-list");
        for (const [language] of Object.entries(languages)) {
            const color = getLanguageColor(language);
            const langItem = document.createElement("span");
            langItem.classList.add("language-item");
            langItem.innerHTML = `
                <span class="language-color" style="background-color: ${color};"></span>
                ${language}
            `;
            container.appendChild(langItem);
        }
    }

    function getLanguageColor(language) {
        const colors = {
            JavaScript: "#f1e05a",
            Python: "#3572A5",
            Java: "#b07219",
            HTML: "#e34c26",
            CSS: "#563d7c",
            Shell: "#89e051",
            C: "#555555",
            "C++": "#f34b7d",
            TypeScript: "#2b7489",
            PHP: "#4F5D95",
            Ruby: "#701516",
            Go: "#00ADD8",
            Rust: "#dea584",
            default: "#cccccc"
        };
        return colors[language] || colors.default;
    }

    function setupToggles() {
        document.querySelectorAll(".category-toggle").forEach((toggle) => {
            toggle.addEventListener("click", () => {
                const content = toggle.nextElementSibling;

                document
                    .querySelectorAll(".category-content.open")
                    .forEach((openContent) => {
                        if (openContent !== content) {
                            openContent.classList.remove("open");
                        }
                    });

                content.classList.toggle("open");
            });
        });
    }

    class ProjectsSection {
        constructor(rootNode) {
            this.rootNode = rootNode;
        }

        render() {
            const section = document.createElement("section");
            section.id = "projects";
            section.className = "section projects";

            section.innerHTML = `
                <div class="projects-card card">
                    <div class="projects-header">
                        <div>
                            <span class="section-subtitle">Código en producción</span>
                            <h2 class="section-title">Proyectos actuales</h2>
                            <p>Repositorios extraídos automáticamente de GitHub y organizados por tipo de proyecto.</p>
                        </div>
                        <a href="https://github.com/${username}" target="_blank" rel="noopener" class="github-logo">
                            <span class="header-logo">
                                <img src="web/assets/myke_icon.png" alt="Logo de Mike" class="header-logo-img" />
                            </span>
                        </a>
                    </div>

                    <div class="categories">
                        <div class="category">
                            <button class="category-toggle">
                                <span class="label">Inteligencia Artificial + Big Data</span>
                                <span class="chevron">▾</span>
                            </button>
                            <div id="ia-bigdata" class="category-content"></div>
                        </div>

                        <div class="category">
                            <button class="category-toggle">
                                <span class="label">Proyectos Web</span>
                                <span class="chevron">▾</span>
                            </button>
                            <div id="web-projects" class="category-content"></div>
                        </div>

                        <div class="category">
                            <button class="category-toggle">
                                <span class="label">Sistemas & DevOps</span>
                                <span class="chevron">▾</span>
                            </button>
                            <div id="systems-projects" class="category-content"></div>
                        </div>

                        <div class="category">
                            <button class="category-toggle">
                                <span class="label">Otros proyectos</span>
                                <span class="chevron">▾</span>
                            </button>
                            <div id="other-projects" class="category-content"></div>
                        </div>
                    </div>
                </div>
            `;

            this.rootNode.appendChild(section);

            // Asociar contenedores
            categories.ia = document.getElementById("ia-bigdata");
            categories.web = document.getElementById("web-projects");
            categories.systems = document.getElementById("systems-projects");
            categories.other = document.getElementById("other-projects");

            setupToggles();
            fetchRepos();
        }
    }

    window.ProjectsSection = ProjectsSection;
})();
