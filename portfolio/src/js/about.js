/* =========================================================
   PAGE ABOUT — JAVASCRIPT
   ========================================================= */

/* =========================================================
   TIMELINE
   ========================================================= */

const timelineProgress = document.getElementById("timeline-progress");
const timelineItems = document.querySelectorAll(".timeline-item");

function updateTimeline() {
    if (!timelineProgress) return;

    const timeline = timelineProgress.parentElement;

    if (!timeline) return;

    const rect = timeline.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const start = viewportHeight * 0.8;
    const end = viewportHeight * 0.2;

    let progress =
        (start - rect.top) /
        (rect.height - start + end);

    progress = Math.max(0, Math.min(1, progress));

    timelineProgress.style.height = `${progress * 100}%`;
}

function revealTimelineItems() {
    timelineItems.forEach(function (item) {
        const rect = item.getBoundingClientRect();

        if (rect.top < window.innerHeight * 0.85) {
            item.classList.add("visible");
        }
    });
}

function updateTimelineOnScroll() {
    updateTimeline();
    revealTimelineItems();
}

window.addEventListener(
    "scroll",
    updateTimelineOnScroll,
    { passive: true }
);

window.addEventListener(
    "resize",
    updateTimelineOnScroll
);

updateTimelineOnScroll();


/* =========================================================
   CARTE MAGIQUE
   ========================================================= */

const journeyCard =
    document.getElementById("journey-card");

const journeyFlip =
    document.getElementById("journey-flip");

const journeyFlipBack =
    document.getElementById("journey-flip-back");

function flipJourneyCard() {
    if (!journeyCard) return;

    journeyCard.classList.toggle("is-flipped");
}

if (journeyFlip) {
    journeyFlip.addEventListener("click", function (event) {
        event.stopPropagation();
        flipJourneyCard();
    });
}

if (journeyFlipBack) {
    journeyFlipBack.addEventListener("click", function (event) {
        event.stopPropagation();
        flipJourneyCard();
    });
}


/* =========================================================
   CENTRES D'INTÉRÊT
   ========================================================= */

const interestsGrid =
    document.getElementById("interests-grid");

const interests = [
    {
        icon: "🎮",
        title: "Jeux vidéo",
        description:
            "J'aime découvrir de nouveaux univers, explorer les mécaniques de jeu et comprendre ce qui rend une expérience interactive intéressante. Cette passion peut aussi m'aider à développer ma créativité, mon sens de l'observation et ma réflexion sur l'expérience utilisateur, des compétences qui pourront me servir dans mes futurs projets web."
    },

    {
        icon: "🐉",
        title: "Jeu de rôle",
        description:
            "J'aime particulièrement le jeu de rôle pour la liberté qu'il offre, la création d'histoires et les possibilités d'improvisation. Cet intérêt m'aide à développer mon imagination, ma capacité à construire des idées et à réfléchir à différentes possibilités, des compétences utiles pour concevoir des projets originaux et des interfaces interactives."
    },

    {
        icon: "🧙",
        title: "Fantasy",
        description:
            "J'aime les univers fantastiques, la magie et les ambiances médiévales qui nourrissent mon imagination et influencent beaucoup mon identité visuelle. Cette passion peut m'aider à développer ma créativité, mon sens du design et ma capacité à créer une identité visuelle cohérente pour mes futurs projets."
    },

    {
        icon: "💻",
        title: "Développement",
        description:
            "J'aime apprendre de nouvelles technologies, expérimenter et voir progressivement une idée devenir un véritable projet. Cette passion me permet de développer ma logique, ma capacité à résoudre des problèmes et mon autonomie, des compétences essentielles pour continuer à progresser dans le développement informatique."
    },

    {
        icon: "🎨",
        title: "Création",
        description:
            "J'aime réfléchir à l'apparence d'un projet, chercher une ambiance particulière et trouver des façons originales de présenter une interface. La création m'aide à développer ma créativité, mon sens de l'esthétique et ma capacité à penser l'expérience utilisateur, des compétences que je pourrai utiliser dans mes futurs projets."
    },

    {
        icon: "📚",
        title: "Apprentissage",
        description:
            "J'aime découvrir de nouvelles choses et progresser en pratiquant, même lorsque je rencontre des difficultés. Cette manière d'apprendre me permet de développer ma curiosité, ma persévérance, mon autonomie et ma capacité à chercher des solutions, des qualités importantes pour évoluer dans un domaine qui change constamment comme le développement informatique."
    }
];


/* =========================================================
   MODALE
   ========================================================= */

const interestModal =
    document.getElementById("interest-modal");

const closeModal =
    document.getElementById("close-modal");

const modalIcon =
    document.getElementById("modal-icon");

const modalTitle =
    document.getElementById("modal-title");

const modalDescription =
    document.getElementById("modal-description");


function openInterestModal(interest) {
    if (
        !interestModal ||
        !modalIcon ||
        !modalTitle ||
        !modalDescription
    ) {
        return;
    }

    modalIcon.textContent = interest.icon;

    modalTitle.textContent = interest.title;

    modalDescription.textContent =
        interest.description;

    interestModal.classList.remove("hidden");
    interestModal.classList.add("flex");
}


function closeInterestModal() {
    if (!interestModal) return;

    interestModal.classList.add("hidden");
    interestModal.classList.remove("flex");
}


/* =========================================================
   CRÉATION DES CARTES
   ========================================================= */

if (interestsGrid) {
    interests.forEach(function (interest) {

        const card =
            document.createElement("button");

        card.type = "button";

        card.className =
            "fantasy-card group rounded-2xl border border-sauge-700/40 bg-pierre-900/80 p-6 text-left shadow-lg transition-all hover:border-accent-500/60 hover:shadow-xl";

        card.innerHTML = `
            <div
                class="mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-sauge-700/40 bg-sauge-950/70 text-2xl transition-all duration-300 group-hover:scale-110 group-hover:border-sauge-500/50 group-hover:bg-sauge-900"
            >
                ${interest.icon}
            </div>

            <h3 class="text-xl font-bold text-parchemin-100">
                ${interest.title}
            </h3>

            <p class="mt-3 leading-relaxed text-pierre-300">
                ${interest.description}
            </p>

            <span
                class="mt-5 inline-flex items-center gap-2 font-semibold text-accent-400"
            >
                En savoir plus

                <span
                    class="transition-transform duration-300 group-hover:translate-x-1"
                >
                    →
                </span>
            </span>
        `;

        card.addEventListener(
            "click",
            function () {
                openInterestModal(interest);
            }
        );

        interestsGrid.appendChild(card);
    });
}


/* =========================================================
   FERMETURE DE LA MODALE
   ========================================================= */

if (closeModal) {
    closeModal.addEventListener(
        "click",
        closeInterestModal
    );
}


if (interestModal) {
    interestModal.addEventListener(
        "click",
        function (event) {

            if (event.target === interestModal) {
                closeInterestModal();
            }

        }
    );
}


document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            interestModal &&
            !interestModal.classList.contains("hidden")
        ) {
            closeInterestModal();
        }

    }
);