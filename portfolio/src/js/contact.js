/* =========================================================
   PAGE CONTACT
   ========================================================= */

/* PARCHEMIN : ouverture et fermeture du formulaire */

const openButton = document.getElementById("scroll-open");
const parchment = document.getElementById("contact-parchment");

// L'attribut hidden est utilisé pour le bouton : la classe .btn écraserait la classe "hidden".
function openParchment() {
    openButton.hidden = true;
    openButton.setAttribute("aria-expanded", "true");
    parchment.classList.remove("hidden");

    // Laisse l'animation démarrer avant de faire défiler jusqu'au parchemin.
    window.setTimeout(function () {
        parchment.scrollIntoView({ behavior: "smooth", block: "center" });
        document.getElementById("name")?.focus({ preventScroll: true });
    }, 150);
}

function closeParchment() {
    parchment.classList.add("hidden");
    openButton.hidden = false;
    openButton.setAttribute("aria-expanded", "false");
    openButton.focus();
}

if (openButton && parchment) {
    openButton.addEventListener("click", openParchment);

    ["close-parchment", "close-parchment-bottom"].forEach(function (id) {
        document.getElementById(id)?.addEventListener("click", closeParchment);
    });
}


/* FORMULAIRE : envoi via Formspree sans quitter la page */

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

function showFormMessage(text) {
    formMessage.textContent = text;
    formMessage.classList.remove("hidden");
}

if (contactForm && formMessage) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (!contactForm.reportValidity()) return;

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonContent = submitButton.innerHTML;

        submitButton.disabled = true;
        submitButton.textContent = "Envoi en cours...";
        showFormMessage("Envoi de votre message...");

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: { Accept: "application/json" }
            });

            if (!response.ok) throw new Error(`Réponse ${response.status}`);

            showFormMessage("Merci ! Votre message a bien été envoyé.");
            contactForm.reset();
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error);
            showFormMessage("Impossible d'envoyer votre message. Veuillez réessayer.");
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonContent;
        }
    });
}
