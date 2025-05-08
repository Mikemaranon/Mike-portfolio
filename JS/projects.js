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
        const button = document.createElement("button");
        button.classList.add("project-button");
        button.textContent = repo.name;

        const details = document.createElement("div");
        details.classList.add("project-details");
        details.innerHTML = `
            <p>${repo.description || "Sin descripción"}</p>
            <a href="${repo.html_url}" target="_blank">Ver en GitHub</a>
        `;

        console.log(details.innerHTML);

        button.addEventListener("click", () => {
            details.classList.toggle("open");
        });
        

        // clasificacion según las topics de github
        const topics = repo.topics || [];
        if (topics.includes("ai") || topics.includes("bigdata")) {
            categories.ia.appendChild(button);
            categories.ia.appendChild(details);
        } else if (topics.includes("website")) {
            categories.web.appendChild(button);
            categories.web.appendChild(details);
        } else if (topics.includes("systems")) {
            categories.systems.appendChild(button);
            categories.systems.appendChild(details);
        } else {
            categories.other.appendChild(button);
            categories.other.appendChild(details);
        }
    });
}

document.querySelectorAll(".category-toggle").forEach(toggle => {
    toggle.addEventListener("click", () => {
        const content = toggle.nextElementSibling;
        content.classList.toggle("open");
    });
});


fetchRepos();
