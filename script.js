document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Verhindert das Standardformularverhalten
    alert('Danke für Ihre Nachricht!');
});

document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("dark-mode-toggle");
    const toggleIcon = toggleButton.querySelector("i");

    // Gespeichertes Theme laden
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        toggleIcon.classList.replace("fa-moon", "fa-sun");
    }

    // Theme beim Klick wechseln
    toggleButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        const darkModeActive =
            document.body.classList.contains("dark-mode");

        if (darkModeActive) {
            localStorage.setItem("theme", "dark");
            toggleIcon.classList.replace("fa-moon", "fa-sun");
        } else {
            localStorage.setItem("theme", "light");
            toggleIcon.classList.replace("fa-sun", "fa-moon");
        }
    });

    // Kontaktformular
    const contactForm = document.getElementById("contact-form");

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        alert("Danke für Ihre Nachricht!");
    });
});

document.getElementById("scroll").addEventListener("click", () => {
    window.scrollTo({
        top: document.getElementById("about").offsetTop,
        behavior: "smooth"
    });
}); 