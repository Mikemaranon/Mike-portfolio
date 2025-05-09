const username = "Mikemaranon";

const categories = {
    ia: document.getElementById("ia-bigdata"),
    web: document.getElementById("web-projects"),
    systems: document.getElementById("systems-projects"),
    other: document.getElementById("other-projects")
};

async function fetchRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                Accept: "application/vnd.github.mercy-preview+json"
            }
        });
        const repos = await response.json();
        renderProjects(repos);
    } catch (error) {
        console.error("Error fetching repos:", error);
        categories.other.innerHTML = "<p>Error al cargar los proyectos.</p>";
    }
}

function renderProjects(repos) {
    repos.forEach(repo => {
        const button = document.createElement("a");
        button.classList.add("project-button");
        button.href = repo.html_url;
        button.target = "_blank";

        // Armamos el contenido interno
        button.innerHTML = `
            <div class="project-title">${repo.name}</div>
            <div class="project-description">${repo.description || "Sin descripción"}</div>
        `;

        // Clasificación según topics de GitHub
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
    });
}

document.querySelectorAll(".category-toggle").forEach(toggle => {
    toggle.addEventListener("click", () => {
        const content = toggle.nextElementSibling;

        // Cerrar todas las categorías abiertas
        document.querySelectorAll(".category-content.open").forEach(openContent => {
            if (openContent !== content) {
                openContent.classList.remove("open");
            }
        });

        // Togglear la clickeada
        content.classList.toggle("open");
    });
});

fetchRepos();
