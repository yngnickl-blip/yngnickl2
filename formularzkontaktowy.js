// Inicjalizacja EmailJS (upewnij się, że SDK jest załadowany przed tym skryptem)
emailjs.init("xPgqnXMx2IUYUP841");

const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");

if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("contact-name").value.trim();
        const email = document.getElementById("contact-email").value.trim();
        const message = document.getElementById("contact-message").value.trim();

        if (!name || !email || !message) {
            contactStatus.textContent = "Uzupełnij wszystkie pola!";
            return;
        }

        const templateParams = {
            name: name,
            email: email,
            message: message
        };

        emailjs.send("yngnickl", "template_4a8nath", templateParams)
            .then(() => {
                contactStatus.textContent = "Wiadomość wysłana pomyślnie!";
                contactForm.reset();
            })
            .catch(err => {
                console.error("Błąd wysyłki wiadomości:", err);
                contactStatus.textContent = "Wystąpił błąd, spróbuj ponownie.";
            });
    });
}
