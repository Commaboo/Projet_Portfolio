/* =========================================================
   PAGE PROJETS
   ========================================================= */

/* DONNÉES DES PROJETS */

const projects = [
    {
        id: "cv",
        title: "CV interactif",
        status: "✓ Terminé",
        statusType: "completed",
        period: "Septembre 2026",
        description:
            "J'ai voulu transformer un CV classique en une expérience web plus interactive. J'ai travaillé sur sa structure, son apparence et différentes interactions pour rendre la présentation plus dynamique.",
        image: null,
        technologies: [
            "HTML",
            "CSS",
            "Tailwind CSS",
            "JavaScript"
        ],
        journey:
            "J'ai réalisé ce projet dans le cadre scolaire puis je l'ai intégré à mon portfolio. Mon objectif était de transformer un CV traditionnel en une expérience web interactive, en travaillant à la fois sur la structure, le design et les interactions.",
        skills: [
            "JavaScript",
            "Manipulation du DOM",
            "Modales",
            "Barres de progression",
            "Tailwind CSS",
            "HTML / CSS",
            "Organisation d'un projet web",
            "Interfaces interactives"
        ],
        github: null
    },

    {
        id: "python",
        title: "Parcours Python",
        status: "✓ Terminé",
        statusType: "completed",
        period: "07/09/2026 → ~21/09/2026",
        description:
            "J'ai suivi un parcours d'apprentissage de Python basé sur les fondamentaux, les exercices pratiques et la résolution de problèmes, terminé par la création d'un jeu du Pendu avec Pygame.",
        image: null,
        technologies: [
            "Python",
            "Pygame"
        ],
        journey:
            "J'ai commencé par apprendre les bases de Python avant de progresser vers des notions plus avancées grâce à de nombreux exercices. Une grande partie de mon apprentissage s'est faite par essais, erreurs et corrections. Ce parcours s'est terminé par la création d'un jeu du Pendu avec Pygame.",
        skills: [
            "Logique de programmation",
            "Résolution de problèmes",
            "Décomposition d'un problème",
            "Fonctions",
            "Debugging",
            "Bases de Python",
            "Pygame",
            "Utilisation d'outils pour apprendre et résoudre des problèmes"
        ],
        github: null
    },

    {
        id: "role-fairies",
        title: "Rôle & Fairies",
        status: "◐ En cours",
        statusType: "in-progress",
        period: "2026 → aujourd'hui",
        description:
            "Je veux créer un outil web complet autour de D&D 5.5e, réunissant plusieurs outils utiles pendant une partie tout en me permettant de progresser vers des applications web plus complexes.",
        image: null,
        technologies: [
            "JavaScript",
            "React",
            "Three.js"
        ],
        journey:
            "Je veux construire progressivement un outil capable de centraliser différentes fonctionnalités : carte interactive, gestion des personnages, combat, ressources, sorts, équipement et outils pour le maître du jeu. Ce projet me servira également de terrain d'expérimentation pour approfondir JavaScript et découvrir React et Three.js.",
        skills: [
            "Approfondir JavaScript",
            "Apprendre React",
            "Découvrir Three.js",
            "Explorer la 3D sur le web",
            "Structurer une application importante",
            "Manipuler des données complexes",
            "Concevoir des interfaces interactives",
            "Découvrir des bibliothèques modernes",
            "Développer un projet sur le long terme"
        ],
        github: null
    },

    {
        id: "portfolio",
        title: "Portfolio personnel",
        status: "◐ En cours",
        statusType: "in-progress",
        period: "2026 → aujourd'hui",
        description:
            "J'ai créé ce portfolio pour construire ma première véritable identité dans le web et montrer ce que j'apprends et ce que je suis capable de réaliser.",
        image: null,
        technologies: [
            "HTML",
            "CSS",
            "Tailwind CSS",
            "JavaScript"
        ],
        journey:
            "J'ai créé ce portfolio pour construire ma première véritable identité dans le web et montrer ce que j'apprends et ce que je suis capable de réaliser. C'est aussi pour moi un terrain d'expérimentation autour du design, du développement et de l'organisation d'un projet web.",
        skills: [
            "HTML",
            "CSS",
            "Tailwind CSS",
            "JavaScript",
            "Responsive design",
            "Organisation d'un projet web",
            "Conception d'interfaces",
            "Identité visuelle",
            "Architecture HTML / CSS / JS"
        ],
        github: null
    }
];


/* ÉLÉMENTS */

const mageDesk = document.querySelector(".mage-desk");
const projectScroll = document.getElementById("project-scroll");

const projectTitle = document.getElementById("project-title");
const projectStatus = document.getElementById("project-status");
const projectPeriod = document.getElementById("project-period");
const projectDescription = document.getElementById("project-description");
const projectTechnologies =
    document.getElementById("project-technologies");
const projectImage = document.getElementById("project-image");

const projectList = document.getElementById("project-list");

const registryToggle =
    document.getElementById("registry-toggle");

const registryArrow =
    document.getElementById("registry-arrow");

const githubCat =
    document.getElementById("github-cat");

const githubMessage =
    document.getElementById("github-message");

const projectDetail =
    document.getElementById("project-detail");

const detailTitle =
    document.getElementById("detail-title");

const detailContent =
    document.getElementById("detail-content");

const closeDetail =
    document.getElementById("close-detail");

const dropHint =
    document.getElementById("drop-hint");


let selectedProjectId = projects[0].id;


/* REGISTRE */

function renderProjectList() {
    projectList.innerHTML = "";

    projects.forEach(function (project) {
        const card = document.createElement("button");

        card.type = "button";
        card.className = "project-card-item";
        card.dataset.projectId = project.id;
        card.draggable = true;

        card.innerHTML = `
            <span class="project-card-title">
                ${project.title}
            </span>

            <span class="project-card-period">
                ${project.period}
            </span>
        `;

        card.addEventListener("click", function () {
            selectProject(project.id);
        });

        card.addEventListener("dragstart", function (event) {
            event.dataTransfer.setData(
                "text/plain",
                project.id
            );

            event.dataTransfer.effectAllowed = "move";

            mageDesk.classList.add("drag-over");
        });

        card.addEventListener("dragend", function () {
            mageDesk.classList.remove("drag-over");
            dropHint.classList.remove("visible");
        });

        projectList.appendChild(card);
    });

    updateSelectedCard();
}


/* SÉLECTION */

function selectProject(projectId) {
    const project = projects.find(function (item) {
        return item.id === projectId;
    });

    if (!project) return;

    selectedProjectId = projectId;

    projectTitle.textContent = project.title;
    projectStatus.textContent = project.status;
    projectStatus.classList.toggle(
        "in-progress",
        project.statusType === "in-progress"
    );

    projectPeriod.textContent = project.period;
    projectDescription.textContent = project.description;

    renderTechnologies(project);
    renderProjectImage(project);

    closeProjectDetail();
    hideGithubMessage();
    updateSelectedCard();
}


/* TECHNOLOGIES */

function renderTechnologies(project) {
    projectTechnologies.innerHTML = "";

    project.technologies.forEach(function (technology) {
        const tag = document.createElement("span");

        tag.className = "project-tag";
        tag.textContent = technology;

        projectTechnologies.appendChild(tag);
    });
}


/* IMAGE */

function renderProjectImage(project) {
    if (project.image) {
        projectImage.innerHTML = `
            <img
                src="${project.image}"
                alt="Aperçu de ${project.title}"
                class="h-full w-full rounded-lg object-cover"
            />
        `;

        projectImage.classList.remove(
            "project-image-placeholder"
        );
    } else {
        projectImage.innerHTML = `
            <span>Image du projet</span>
            <small>Placeholder</small>
        `;

        projectImage.className =
            "project-image-placeholder";
    }
}


/* CARTE ACTIVE */

function updateSelectedCard() {
    const cards = document.querySelectorAll(
        ".project-card-item"
    );

    cards.forEach(function (card) {
        card.classList.toggle(
            "selected",
            card.dataset.projectId === selectedProjectId
        );
    });
}


/* REGISTRE OUVERT / FERMÉ */

registryToggle.addEventListener("click", function () {
    const isExpanded =
        registryToggle.getAttribute("aria-expanded") === "true";

    registryToggle.setAttribute(
        "aria-expanded",
        String(!isExpanded)
    );

    projectList.classList.toggle(
        "expanded",
        !isExpanded
    );

    registryArrow.textContent =
        isExpanded ? "↓" : "↑";
});


/* DÉTAILS DU PROJET */

function openProjectDetail(type) {
    const project = projects.find(function (item) {
        return item.id === selectedProjectId;
    });

    if (!project) return;

    projectDetail.classList.remove("hidden");

    if (type === "journey") {
        detailTitle.textContent = "Parcours";

        detailContent.innerHTML = `
            <p>${project.journey}</p>
        `;
    }

    if (type === "skills") {
        detailTitle.textContent =
            project.statusType === "completed"
                ? "Compétences acquises"
                : "Objectifs d'apprentissage";

        detailContent.innerHTML = `
            <ul>
                ${project.skills
                    .map(function (skill) {
                        return `<li>${skill}</li>`;
                    })
                    .join("")}
            </ul>
        `;
    }

    if (type === "preview") {
        detailTitle.textContent = "Preview";

        if (project.image) {
            detailContent.innerHTML = `
                <img
                    src="${project.image}"
                    alt="Preview de ${project.title}"
                    class="w-full rounded-lg"
                />
            `;
        } else {
            detailContent.innerHTML = `
                <div class="project-image-placeholder">
                    <span>Preview du projet</span>
                    <small>Image à ajouter</small>
                </div>
            `;
        }
    }
}


function closeProjectDetail() {
    projectDetail.classList.add("hidden");
    detailContent.innerHTML = "";
}


document
    .querySelectorAll(".project-action")
    .forEach(function (button) {
        button.addEventListener("click", function () {
            openProjectDetail(
                button.dataset.action
            );
        });
    });


closeDetail.addEventListener(
    "click",
    closeProjectDetail
);


/* GITHUB */

githubCat.addEventListener("click", function () {
    const project = projects.find(function (item) {
        return item.id === selectedProjectId;
    });

    if (!project) return;

    if (project.github) {
        window.open(
            project.github,
            "_blank",
            "noopener,noreferrer"
        );

        return;
    }

    githubMessage.textContent =
        `🐈‍⬛ Aucun grimoire GitHub n'est encore disponible pour « ${project.title} ».`;

    githubMessage.classList.remove("hidden");

    setTimeout(function () {
        hideGithubMessage();
    }, 4000);
});


function hideGithubMessage() {
    githubMessage.classList.add("hidden");
}


/* DRAG & DROP */

mageDesk.addEventListener("dragover", function (event) {
    event.preventDefault();

    event.dataTransfer.dropEffect = "move";

    mageDesk.classList.add("drag-over");
    dropHint.classList.add("visible");
});


mageDesk.addEventListener("dragleave", function (event) {
    if (!mageDesk.contains(event.relatedTarget)) {
        mageDesk.classList.remove("drag-over");
        dropHint.classList.remove("visible");
    }
});


mageDesk.addEventListener("drop", function (event) {
    event.preventDefault();

    const projectId =
        event.dataTransfer.getData("text/plain");

    mageDesk.classList.remove("drag-over");
    dropHint.classList.remove("visible");

    if (projectId) {
        selectProject(projectId);
    }
});


/* INITIALISATION */

renderProjectList();
selectProject(selectedProjectId);