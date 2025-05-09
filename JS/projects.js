const username = "Mikemaranon";

const categories = {
    ia: document.getElementById("ia-bigdata"),
    web: document.getElementById("web-projects"),
    systems: document.getElementById("systems-projects"),
    other: document.getElementById("other-projects")
};

async function fetchRepos() {
    const cached = localStorage.getItem("repos_cache");
    const cacheTime = localStorage.getItem("repos_cache_time");
    const oneDay = 24 * 60 * 60 * 1000;

    if (cached && cacheTime && (Date.now() - cacheTime < oneDay)) {
        console.log("Usando cache local");
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
            localStorage.setItem("repos_cache_time", Date.now());
            renderProjects(repos);
        } catch (error) {
            console.error("Error fetching repos:", error);
            categories.other.innerHTML = "<p>Error al cargar los proyectos.</p>";
        }
    }
}


function renderProjects(repos) {
    repos.forEach(async repo => {
        const button = document.createElement("a");
        button.classList.add("project-button");
        button.href = repo.html_url;
        button.target = "_blank";

        // Armamos el contenido base
        button.innerHTML = `
            <div class="project-title">${repo.name}</div>
            <div class="project-description">${repo.description || "Sin descripción"}</div>
            <div class="project-languages"></div>
        `;

        // Clasificación según topics
        const topics = repo.topics || [];
        if (topics.includes("ai") || topics.includes("bigdata")) {
            categories.ia.appendChild(button);
        } else if (topics.includes("website")) {
            categories.web.appendChild(button);
        } else if (topics.includes("systems")) {
            categories.systems.appendChild(button);
        } else {
            categories.other.appendChild(button);
        }

        // Traemos los lenguajes para ese repo
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
    container.classList.add("languages-list");
    for (const [language, _] of Object.entries(languages)) {
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

// Esta función es simplificada; en GitHub usan un JSON con colores, pero acá pongo algunos comunes
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

document.querySelectorAll(".category-toggle").forEach(toggle => {
    toggle.addEventListener("click", () => {
        const content = toggle.nextElementSibling;

        document.querySelectorAll(".category-content.open").forEach(openContent => {
            if (openContent !== content) {
                openContent.classList.remove("open");
            }
        });

        content.classList.toggle("open");
    });
});

fetchRepos();
