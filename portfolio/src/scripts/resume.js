/* =========================================================
   CV — MENU MOBILE ET FORMULAIRE
   Le thème et l'apparition au défilement viennent du main.js du portfolio.
   ========================================================= */

/* MENU MOBILE */

const menuButton = document.getElementById("cv-menu-button");
const navLinks = document.getElementById("nav-links");

// Classes ajoutées à l'ouverture : sous 768px, la liste devient un menu déroulant sous l'en-tête.
const OPEN_MENU_CLASSES = [
    "flex",
    "max-md:absolute",
    "max-md:inset-x-0",
    "max-md:top-full",
    "max-md:flex-col",
    "max-md:items-start",
    "max-md:gap-5",
    "max-md:border-b",
    "max-md:border-cuir-700/40",
    "max-md:bg-cuir-800",
    "max-md:px-5",
    "max-md:py-6",
    "max-md:shadow-xl"
];

function setMenuOpen(isOpen) {
    navLinks.classList.toggle("hidden", !isOpen);
    OPEN_MENU_CLASSES.forEach(function (className) {
        navLinks.classList.toggle(className, isOpen);
    });

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
    menuButton.textContent = isOpen ? "✕" : "☰";
}

function isMenuOpen() {
    return menuButton.getAttribute("aria-expanded") === "true";
}

if (menuButton && navLinks) {
    menuButton.addEventListener("click", function () {
        setMenuOpen(!isMenuOpen());
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            if (isMenuOpen()) setMenuOpen(false);
        });
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && isMenuOpen()) {
            setMenuOpen(false);
            menuButton.focus();
        }
    });

    window.matchMedia("(min-width: 768px)").addEventListener("change", function (event) {
        if (event.matches && isMenuOpen()) setMenuOpen(false);
    });
}


/* FORMULAIRE : message de confirmation (aucun envoi réel) */

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

contactForm?.addEventListener("submit", function (event) {
    event.preventDefault();

    formMessage.textContent = "Votre message a bien été préparé. Merci pour votre contact !";
    formMessage.classList.remove("hidden");
    contactForm.reset();
});
