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
        description: "J'ai voulu transformer un CV classique en une expérience web plus interactive. J'ai travaillé sur sa structure, son apparence et différentes interactions pour rendre la présentation plus dynamique.",
        image: null,
        previewUrl: "../projet/resume/resume.html",
        technologies: ["HTML", "CSS", "Tailwind CSS", "JavaScript"],
        journey: "J'ai réalisé ce projet dans le cadre scolaire puis je l'ai intégré à mon portfolio. Mon objectif était de transformer un CV traditionnel en une expérience web interactive, en travaillant à la fois sur la structure, le design et les interactions.",
        skills: ["JavaScript", "Manipulation du DOM", "Modales", "Barres de progression", "Tailwind CSS", "HTML / CSS", "Organisation d'un projet web", "Interfaces interactives"],
        github: null
    },
    {
        id: "python",
        title: "Parcours Python",
        status: "✓ Terminé",
        statusType: "completed",
        period: "07/09/2026 → ~21/09/2026",
        description: "J'ai suivi un parcours d'apprentissage de Python basé sur les fondamentaux, les exercices pratiques et la résolution de problèmes, terminé par la création d'un jeu du Pendu avec Pygame.",
        image: null,
        technologies: ["Python", "Pygame"],
        journey: "J'ai commencé par apprendre les bases de Python avant de progresser vers des notions plus avancées grâce à de nombreux exercices. Une grande partie de mon apprentissage s'est faite par essais, erreurs et corrections. Ce parcours s'est terminé par la création d'un jeu du Pendu avec Pygame.",
        skills: ["Logique de programmation", "Résolution de problèmes", "Décomposition d'un problème", "Fonctions", "Debugging", "Bases de Python", "Pygame", "Utilisation d'outils pour apprendre et résoudre des problèmes"],
        github: null
    },
    {
        id: "role-fairies",
        title: "Rôle & Fairies",
        status: "◐ En cours",
        statusType: "in-progress",
        period: "2026 → aujourd'hui",
        description: "Je veux créer un outil web complet autour de D&D 5.5e, réunissant plusieurs outils utiles pendant une partie tout en me permettant de progresser vers des applications web plus complexes.",
        image: null,
        technologies: ["JavaScript", "React", "Three.js"],
        journey: "Je veux construire progressivement un outil capable de centraliser différentes fonctionnalités : carte interactive, gestion des personnages, combat, ressources, sorts, équipement et outils pour le maître du jeu. Ce projet me servira également de terrain d'expérimentation pour approfondir JavaScript et découvrir React et Three.js.",
        skills: ["Approfondir JavaScript", "Apprendre React", "Découvrir Three.js", "Explorer la 3D sur le web", "Structurer une application importante", "Manipuler des données complexes", "Concevoir des interfaces interactives", "Découvrir des bibliothèques modernes", "Développer un projet sur le long terme"],
        github: null
    },
    {
        id: "portfolio",
        title: "Portfolio personnel",
        status: "◐ En cours",
        statusType: "in-progress",
        period: "2026 → aujourd'hui",
        description: "J'ai créé ce portfolio pour construire ma première véritable identité dans le web et montrer ce que j'apprends et ce que je suis capable de réaliser.",
        image: null,
        technologies: ["HTML", "CSS", "Tailwind CSS", "JavaScript"],
        journey: "J'ai créé ce portfolio pour construire ma première véritable identité dans le web et montrer ce que j'apprends et ce que je suis capable de réaliser. C'est aussi pour moi un terrain d'expérimentation autour du design, du développement et de l'organisation d'un projet web.",
        skills: ["HTML", "CSS", "Tailwind CSS", "JavaScript", "Responsive design", "Organisation d'un projet web", "Conception d'interfaces", "Identité visuelle", "Architecture HTML / CSS / JS"],
        github: null
    }
];


/* ÉLÉMENTS */

const mageDesk = document.querySelector(".mage-desk");
const projectScroll = document.getElementById("project-scroll");
const projectEmpty = document.getElementById("project-empty");
const projectContent = document.getElementById("project-content");

const projectTitle = document.getElementById("project-title");
const projectStatus = document.getElementById("project-status");
const projectPeriod = document.getElementById("project-period");
const projectDescription = document.getElementById("project-description");
const projectTechnologies = document.getElementById("project-technologies");
const projectImage = document.getElementById("project-image");

const projectList = document.getElementById("project-list");
const registryToggle = document.getElementById("registry-toggle");
const registryArrow = document.getElementById("registry-arrow");

const githubCat = document.getElementById("github-cat");
const githubMessage = document.getElementById("github-message");

const projectDetail = document.getElementById("project-detail");
const detailTitle = document.getElementById("detail-title");
const detailContent = document.getElementById("detail-content");
const closeDetail = document.getElementById("close-detail");

const dropHint = document.getElementById("drop-hint");

let selectedProjectId = null;
let dragProjectId = null;
let githubMessageTimer = null;


/* REGISTRE */

function renderProjectList() {
    if (!projectList) return;

    projectList.replaceChildren();

    projects.forEach(function (project) {
        const card = document.createElement("button");

        card.type = "button";
        card.className = "project-card-item";
        card.dataset.projectId = project.id;
        card.draggable = true;
        card.setAttribute("aria-pressed", "false");

        const title = document.createElement("span");
        title.className = "project-card-title";
        title.textContent = project.title;

        const period = document.createElement("span");
        period.className = "project-card-period";
        period.textContent = project.period;

        card.append(title, period);

        card.addEventListener("click", function () {
            // Registre fermé : seule la carte du projet en cours est visible.
            // Un clic dessus rouvre le registre au lieu de recharger le projet.
            if (!isRegistryOpen()) {
                setRegistryState(true);
                return;
            }

            selectProject(project.id);
        });

        card.addEventListener("dragstart", function (event) {
            dragProjectId = project.id;
            event.dataTransfer.setData("text/plain", project.id);
            event.dataTransfer.effectAllowed = "move";
            mageDesk?.classList.add("drag-over");
            dropHint?.classList.add("visible");
        });

        card.addEventListener("dragend", function () {
            dragProjectId = null;
            mageDesk?.classList.remove("drag-over");
            dropHint?.classList.remove("visible");
        });

        projectList.appendChild(card);
    });

    updateSelectedCard();
}


/* SÉLECTION D'UN PROJET */

function selectProject(projectId) {
    const project = projects.find(function (item) {
        return item.id === projectId;
    });

    if (!project || !projectContent || !projectEmpty) return;

    selectedProjectId = project.id;

    // Affiche les détails du projet et masque le message d'accueil.
    projectEmpty.classList.add("hidden");
    projectContent.classList.remove("hidden");

    projectTitle.textContent = project.title;
    projectStatus.textContent = project.status;
    projectStatus.classList.toggle("in-progress", project.statusType === "in-progress");
    projectPeriod.textContent = project.period;
    projectDescription.textContent = project.description;

    renderTechnologies(project);
    renderProjectImage(project);

    closeProjectDetail();
    hideGithubMessage();
    updateSelectedCard();

    // La sélection reste mémorisée même lorsque le registre se ferme.
    setRegistryState(false);

    // Remet le parchemin en haut lorsque l'on change de projet.
    if (projectScroll) projectScroll.scrollTop = 0;
}


/* TECHNOLOGIES */

function renderTechnologies(project) {
    if (!projectTechnologies) return;

    projectTechnologies.replaceChildren();

    project.technologies.forEach(function (technology) {
        const tag = document.createElement("span");
        tag.className = "project-tag";
        tag.textContent = technology;
        projectTechnologies.appendChild(tag);
    });
}


/* IMAGE / PLACEHOLDER */

const IMAGE_PLACEHOLDER = `
    <div class="project-image-placeholder">
        <span class="placeholder-icon" aria-hidden="true">✦</span>
        <h3 class="placeholder-title">Aperçu indisponible</h3>
        <p class="placeholder-description">
            L'illustration de cette aventure sera bientôt dévoilée.
        </p>
    </div>
`;

function renderProjectImage(project) {
    if (!projectImage) return;

    if (!project.image) {
        projectImage.innerHTML = IMAGE_PLACEHOLDER;
        return;
    }

    projectImage.innerHTML = "";

    const image = document.createElement("img");
    image.src = project.image;
    image.alt = "Aperçu du projet " + project.title;
    image.className = "project-preview-image";

    image.addEventListener("error", function () {
        projectImage.innerHTML = IMAGE_PLACEHOLDER;
    });

    projectImage.appendChild(image);
}


/* CARTE ACTIVE */

function updateSelectedCard() {
    document.querySelectorAll(".project-card-item").forEach(function (card) {
        const isSelected = card.dataset.projectId === selectedProjectId;
        card.classList.toggle("selected", isSelected);
        card.setAttribute("aria-pressed", String(isSelected));
    });

    // Permet au CSS de garder la carte du projet en cours visible registre fermé.
    projectList?.classList.toggle("has-selection", Boolean(selectedProjectId));
}


/* REGISTRE OUVERT / FERMÉ */

function setRegistryState(isOpen) {
    if (!registryToggle || !projectList || !registryArrow) return;

    registryToggle.setAttribute("aria-expanded", String(isOpen));
    projectList.classList.toggle("expanded", isOpen);
    registryArrow.textContent = isOpen ? "↑" : "↓";
}

function isRegistryOpen() {
    return registryToggle?.getAttribute("aria-expanded") === "true";
}

if (registryToggle) {
    registryToggle.addEventListener("click", function () {
        setRegistryState(!isRegistryOpen());
    });
}


/* DÉTAILS DU PROJET */

function openProjectDetail(type) {
    const project = projects.find(function (item) {
        return item.id === selectedProjectId;
    });

    if (!project || !projectDetail || !detailTitle || !detailContent) return;

    if (type === "preview") {
        if (project.previewUrl) {
            window.location.href = new URL(project.previewUrl, window.location.href).href;
            return;
        }

        detailTitle.textContent = "Preview";
        detailContent.innerHTML = `
            <div class="project-image-placeholder">
                <span class="placeholder-icon" aria-hidden="true">✦</span>
                <h3 class="placeholder-title">Preview indisponible</h3>
                <p class="placeholder-description">
                    Il n'y a pas encore de page de démonstration pour ce projet.
                </p>
            </div>
        `;
        projectDetail.classList.remove("hidden");
        return;
    }

    projectDetail.classList.remove("hidden");

    if (type === "journey") {
        detailTitle.textContent = "Parcours";
        const paragraph = document.createElement("p");
        paragraph.textContent = project.journey;
        detailContent.replaceChildren(paragraph);
    } else if (type === "skills") {
        detailTitle.textContent = project.statusType === "completed"
            ? "Compétences acquises"
            : "Objectifs d'apprentissage";

        const list = document.createElement("ul");
        project.skills.forEach(function (skill) {
            const item = document.createElement("li");
            item.textContent = skill;
            list.appendChild(item);
        });
        detailContent.replaceChildren(list);
    }
}


function closeProjectDetail() {
    projectDetail?.classList.add("hidden");
    if (detailContent) detailContent.replaceChildren();
}

document.querySelectorAll(".project-action").forEach(function (button) {
    button.addEventListener("click", function () {
        openProjectDetail(button.dataset.action);
    });
});

closeDetail?.addEventListener("click", closeProjectDetail);


/* GITHUB */

function showGithubMessage(text, duration) {
    if (!githubMessage) return;

    githubMessage.textContent = text;
    githubMessage.classList.remove("hidden");

    // Un nouveau clic relance le délai au lieu de fermer le message trop tôt.
    window.clearTimeout(githubMessageTimer);
    githubMessageTimer = window.setTimeout(hideGithubMessage, duration);
}

function hideGithubMessage() {
    window.clearTimeout(githubMessageTimer);
    githubMessage?.classList.add("hidden");
}

if (githubCat) {
    githubCat.addEventListener("click", function () {
        const project = projects.find(function (item) {
            return item.id === selectedProjectId;
        });

        if (!project) {
            showGithubMessage("Sélectionne d'abord un projet dans le registre.", 3000);
            return;
        }

        if (project.github) {
            window.open(project.github, "_blank", "noopener,noreferrer");
            return;
        }

        showGithubMessage(`🐈‍⬛ Aucun grimoire GitHub n'est encore disponible pour « ${project.title} ».`, 4000);
    });
}


/* GLISSER-DÉPOSER */

if (mageDesk) {
    mageDesk.addEventListener("dragover", function (event) {
        // N'active l'effet de dépôt que lorsqu'un projet du registre est déplacé.
        if (!dragProjectId) return;

        event.preventDefault();
        if (event.dataTransfer) event.dataTransfer.dropEffect = "move";

        mageDesk.classList.add("drag-over");
        dropHint?.classList.add("visible");
    });

    mageDesk.addEventListener("dragleave", function (event) {
        if (!mageDesk.contains(event.relatedTarget)) {
            mageDesk.classList.remove("drag-over");
            dropHint?.classList.remove("visible");
        }
    });

    mageDesk.addEventListener("drop", function (event) {
        event.preventDefault();

        const projectId = event.dataTransfer?.getData("text/plain") || dragProjectId;

        mageDesk.classList.remove("drag-over");
        dropHint?.classList.remove("visible");
        dragProjectId = null;

        if (projectId) selectProject(projectId);
    });
}


/* CLAVIER : Échap ferme le détail ouvert, sinon le registre */

document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;

    if (projectDetail && !projectDetail.classList.contains("hidden")) {
        closeProjectDetail();
    } else if (isRegistryOpen()) {
        setRegistryState(false);
        registryToggle.focus();
    }
});


/* INITIALISATION */

renderProjectList();

// Aucun projet n'est sélectionné au chargement.
// Le message d'accueil est visible, le contenu projet est masqué.
selectedProjectId = null;
projectEmpty?.classList.remove("hidden");
projectContent?.classList.add("hidden");
projectImage?.replaceChildren();

setRegistryState(false);
updateSelectedCard();
