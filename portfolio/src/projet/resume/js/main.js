/* SUR MOBILE */

const menuButton = document.querySelector("#menu-button");
const navLinks = document.querySelector("#nav-links");

menuButton.addEventListener("click", () => {

    navLinks.classList.toggle("nav-open");

});


/* Close menu after a click  */

const links = document.querySelectorAll("#nav-links a");

links.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("nav-open");

    });

});


/* SCROLL */

const revealElements = document.querySelectorAll(".reveal");


const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach((element) => {

    observer.observe(element);

});


/* Form */

const contactForm =
    document.querySelector("#contact-form");

const formMessage =
    document.querySelector("#form-message");


contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    formMessage.textContent =
        "Votre message a bien été préparé. Merci pour votre contact !";

    formMessage.classList.remove("hidden");

    contactForm.reset();

});


/* Theme button */

const themeButton =
    document.querySelector("#theme-button");


let darkMode = false;


themeButton.addEventListener("click", () => {

    darkMode = !darkMode;


    if (darkMode) {

        document.body.classList.remove(
            "bg-parchemin-50",
            "text-cuir-800"
        );

        document.body.classList.add(
            "bg-pierre-950",
            "text-parchemin-100"
        );

        themeButton.textContent = "D";

    } else {

        document.body.classList.remove(
            "bg-pierre-950",
            "text-parchemin-100"
        );

        document.body.classList.add(
            "bg-parchemin-50",
            "text-cuir-800"
        );

        themeButton.textContent = "L";

    }

});