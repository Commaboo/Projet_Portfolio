/* =========================================================
   FONCTIONNALITÉS COMMUNES À TOUTES LES PAGES
   ========================================================= */

(function () {
    const root = document.documentElement;
    const THEME_KEY = "portfolio-theme";


    /* THÈME CLAIR / SOMBRE
       Le choix est mémorisé et partagé entre les pages.
       Le script dans le <head> de chaque page l'applique avant l'affichage. */

    const themeButtons = document.querySelectorAll("[data-theme-toggle]");

    function saveTheme(theme) {
        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (error) {
            // Stockage indisponible (navigation privée) : le thème change quand même.
        }
    }

    function updateThemeButtons() {
        const isDark = root.classList.contains("dark");

        themeButtons.forEach(function (button) {
            button.textContent = isDark ? "☀️" : "🌙";
            button.setAttribute("aria-label", isDark ? "Activer le thème clair" : "Activer le thème sombre");
            button.setAttribute("aria-pressed", String(isDark));
        });
    }

    themeButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const isDark = root.classList.toggle("dark");
            saveTheme(isDark ? "dark" : "light");
            updateThemeButtons();
        });
    });

    updateThemeButtons();


    /* MENU MOBILE */

    const menuButton = document.getElementById("menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

    function setMenuOpen(isOpen) {
        mobileMenu.classList.toggle("hidden", !isOpen);
        mobileMenu.classList.toggle("flex", isOpen);

        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
        menuButton.textContent = isOpen ? "✕" : "☰";
    }

    function isMenuOpen() {
        return menuButton.getAttribute("aria-expanded") === "true";
    }

    if (menuButton && mobileMenu) {
        menuButton.addEventListener("click", function () {
            setMenuOpen(!isMenuOpen());
        });

        mobileMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                setMenuOpen(false);
            });
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && isMenuOpen()) {
                setMenuOpen(false);
                menuButton.focus();
            }
        });

        // Un clic en dehors de la barre de navigation referme le menu.
        document.addEventListener("click", function (event) {
            if (isMenuOpen() && !event.target.closest(".site-nav")) {
                setMenuOpen(false);
            }
        });

        // Le menu mobile n'a plus de raison d'être ouvert sur grand écran.
        window.matchMedia("(min-width: 768px)").addEventListener("change", function (event) {
            if (event.matches) setMenuOpen(false);
        });
    }


    /* APPARITION AU DÉFILEMENT (.reveal → .visible) */

    const revealElements = document.querySelectorAll(".reveal");

    if (revealElements.length > 0) {
        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("visible");
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.15 }
            );

            revealElements.forEach(function (element) {
                observer.observe(element);
            });
        } else {
            revealElements.forEach(function (element) {
                element.classList.add("visible");
            });
        }
    }
})();
