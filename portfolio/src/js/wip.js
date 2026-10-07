/* =========================================================
   PAGE RÔLE & FAIRIES — JAVASCRIPT
   ========================================================= */


/* =========================================================
   DONNÉES DES FONCTIONNALITÉS
   ========================================================= */

const features = [
    {
        icon: "🗺️",
        title: "Carte interactive",
        status: "À venir",
        category: "Exploration",
        description:
            "Une carte interactive permettant d'explorer progressivement un monde de campagne, ses régions, ses lieux et différents points d'intérêt.",
        goals: [
            "Manipuler une interface interactive",
            "Explorer la gestion de données géographiques",
            "Créer des interactions fluides",
            "Réfléchir à une interface adaptée au jeu de rôle"
        ]
    },

    {
        icon: "🧙",
        title: "Gestion des personnages",
        status: "À venir",
        category: "Personnages",
        description:
            "Un espace permettant de consulter et gérer les informations importantes d'un personnage pendant une aventure.",
        goals: [
            "Structurer des données complexes",
            "Créer des formulaires dynamiques",
            "Manipuler différentes statistiques",
            "Construire une interface facilement lisible"
        ]
    },

    {
        icon: "⚔️",
        title: "Gestion des combats",
        status: "À venir",
        category: "Combat",
        description:
            "Un système destiné à faciliter la gestion d'un combat, des participants et de leur ordre d'action.",
        goals: [
            "Manipuler des états complexes",
            "Créer des interactions dynamiques",
            "Gérer plusieurs entités simultanément",
            "Approfondir JavaScript"
        ]
    },

    {
        icon: "🔮",
        title: "Sorts & capacités",
        status: "À venir",
        category: "Personnages",
        description:
            "Un grimoire permettant de consulter les sorts, capacités et différentes ressources utilisées pendant une partie.",
        goals: [
            "Organiser une importante quantité de données",
            "Créer des filtres",
            "Créer une recherche dynamique",
            "Réfléchir à l'expérience utilisateur"
        ]
    },

    {
        icon: "🎒",
        title: "Inventaire",
        status: "À venir",
        category: "Personnages",
        description:
            "Un espace permettant de gérer l'équipement, les objets et les ressources d'un personnage.",
        goals: [
            "Manipuler des collections d'objets",
            "Créer des interfaces modulaires",
            "Expérimenter les interactions drag & drop",
            "Structurer les données"
        ]
    },

    {
        icon: "👑",
        title: "Outils du maître du jeu",
        status: "À venir",
        category: "Maître du jeu",
        description:
            "Un ensemble d'outils destinés à faciliter la préparation et la gestion d'une partie.",
        goals: [
            "Créer plusieurs outils dans une même application",
            "Réfléchir à l'architecture globale",
            "Gérer différents niveaux d'information",
            "Construire une interface adaptée au MJ"
        ]
    },

    {
        icon: "🎲",
        title: "Outils aléatoires",
        status: "À venir",
        category: "Utilitaires",
        description:
            "Des outils simples permettant de générer ou tirer différentes informations utiles pendant une partie.",
        goals: [
            "Créer des générateurs dynamiques",
            "Manipuler l'aléatoire en JavaScript",
            "Créer de petites interfaces réutilisables",
            "Expérimenter différents composants"
        ]
    },

    {
        icon: "🌌",
        title: "Expérimentations 3D",
        status: "Exploration future",
        category: "Expérimentation",
        description:
            "Une future partie expérimentale du projet destinée à explorer la 3D dans le navigateur avec Three.js.",
        goals: [
            "Découvrir Three.js",
            "Comprendre les scènes 3D",
            "Manipuler des objets et caméras",
            "Explorer les possibilités de la 3D sur le web"
        ]
    }
];


/* =========================================================
   GÉNÉRATION DES CARTES
   ========================================================= */

const featuresGrid =
    document.getElementById("features-grid");

const featureModal =
    document.getElementById("feature-modal");

const closeFeatureModal =
    document.getElementById(
        "close-feature-modal"
    );

const closeFeatureModalBottom =
    document.getElementById(
        "close-feature-modal-bottom"
    );

const featureModalIcon =
    document.getElementById(
        "feature-modal-icon"
    );

const featureModalStatus =
    document.getElementById(
        "feature-modal-status"
    );

const featureModalTitle =
    document.getElementById(
        "feature-modal-title"
    );

const featureModalDescription =
    document.getElementById(
        "feature-modal-description"
    );

const featureModalGoals =
    document.getElementById(
        "feature-modal-goals"
    );


/* =========================================================
   OUVRIR LA MODALE
   ========================================================= */

function openFeatureModal(feature) {

    if (!featureModal) return;

    featureModalIcon.textContent =
        feature.icon;

    featureModalStatus.textContent =
        feature.status;

    featureModalTitle.textContent =
        feature.title;

    featureModalDescription.textContent =
        feature.description;


    featureModalGoals.innerHTML = "";


    feature.goals.forEach(function (goal) {

        const item =
            document.createElement("li");

        item.textContent =
            goal;

        featureModalGoals.appendChild(
            item
        );
    });


    featureModal.classList.remove(
        "hidden"
    );

    featureModal.classList.add(
        "flex"
    );

    document.body.style.overflow =
        "hidden";
}


/* =========================================================
   FERMER LA MODALE
   ========================================================= */

function closeFeatureModalWindow() {

    if (!featureModal) return;

    featureModal.classList.add(
        "hidden"
    );

    featureModal.classList.remove(
        "flex"
    );

    document.body.style.overflow =
        "";
}


/* =========================================================
   CRÉATION DES CARTES
   ========================================================= */

if (featuresGrid) {

    features.forEach(function (feature) {

        const card =
            document.createElement("button");

        card.type = "button";

        card.className =
            "wip-feature-card";


        card.innerHTML = `

            <div class="wip-feature-top">

                <div class="wip-feature-icon">
                    ${feature.icon}
                </div>

                <span class="wip-feature-status">
                    ${feature.status}
                </span>

            </div>


            <span class="wip-feature-category">
                ${feature.category}
            </span>


            <h3>
                ${feature.title}
            </h3>


            <p>
                ${feature.description}
            </p>


            <span class="wip-feature-link">
                Ouvrir le grimoire
                <span>→</span>
            </span>

        `;


        card.addEventListener(
            "click",
            function () {
                openFeatureModal(
                    feature
                );
            }
        );


        featuresGrid.appendChild(
            card
        );
    });
}


/* =========================================================
   BOUTONS DE FERMETURE
   ========================================================= */

if (closeFeatureModal) {

    closeFeatureModal.addEventListener(
        "click",
        closeFeatureModalWindow
    );
}


if (closeFeatureModalBottom) {

    closeFeatureModalBottom.addEventListener(
        "click",
        closeFeatureModalWindow
    );
}


/* =========================================================
   CLIC EN DEHORS DE LA MODALE
   ========================================================= */

if (featureModal) {

    featureModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                featureModal
            ) {
                closeFeatureModalWindow();
            }

        }
    );
}


/* =========================================================
   TOUCHE ESCAPE
   ========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            featureModal &&
            !featureModal.classList.contains(
                "hidden"
            )
        ) {
            closeFeatureModalWindow();
        }

    }
);