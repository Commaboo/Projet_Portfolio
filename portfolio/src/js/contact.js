const scrollOpen = document.getElementById("scroll-open");
const contactParchment = document.getElementById("contact-parchment");
const closeParchment = document.getElementById("close-parchment");

scrollOpen.addEventListener("click", function () {
    scrollOpen.classList.add("hidden");
    contactParchment.classList.remove("hidden");

    setTimeout(function () {
        contactParchment.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }, 150);
});

closeParchment.addEventListener("click", function () {
    contactParchment.classList.add("hidden");
    scrollOpen.classList.remove("hidden");
});


const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");
const formMessage = document.getElementById("form-message");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    console.log("Nom :", name);
    console.log("Email :", email);
    console.log("Sujet :", subject);
    console.log("Message :", message);

    formMessage.textContent =
        `Merci ${name} ! Votre message a bien été pris en compte.`;

    formMessage.classList.remove("hidden");

    contactForm.reset();
});