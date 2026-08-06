document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    const darkModeToggle =
        document.getElementById("dark-mode-toggle");

    const darkModeIcon =
        darkModeToggle?.querySelector("i");

    const contactForm =
        document.getElementById("contact-form");

    const formStatus =
        document.getElementById("form-status");

    const yearElement =
        document.getElementById("current-year");


    /* ===========================
       Dark Mode
    =========================== */

    function updateThemeIcon(isDarkMode) {
        if (!darkModeToggle || !darkModeIcon) return;

        darkModeIcon.classList.toggle(
            "fa-sun",
            isDarkMode
        );

        darkModeIcon.classList.toggle(
            "fa-moon",
            !isDarkMode
        );

        darkModeToggle.setAttribute(
            "aria-pressed",
            String(isDarkMode)
        );

        darkModeToggle.setAttribute(
            "aria-label",
            isDarkMode
                ? "Light Mode aktivieren"
                : "Dark Mode aktivieren"
        );
    }

    const savedTheme =
        localStorage.getItem("theme");

    const prefersDarkMode =
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

    const shouldUseDarkMode =
        savedTheme === "dark" ||
        (!savedTheme && prefersDarkMode);

    body.classList.toggle(
        "dark-mode",
        shouldUseDarkMode
    );

    updateThemeIcon(shouldUseDarkMode);

    darkModeToggle?.addEventListener("click", () => {
        const isDarkMode =
            body.classList.toggle("dark-mode");

        localStorage.setItem(
            "theme",
            isDarkMode ? "dark" : "light"
        );

        updateThemeIcon(isDarkMode);
    });


    /* ===========================
       Kontaktformular
    =========================== */

    contactForm?.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!formStatus) return;

        formStatus.textContent =
            "Das Kontaktformular befindet sich aktuell noch in Entwicklung. " +
            "Deine Angaben wurden nicht versendet oder gespeichert.";

        formStatus.classList.add("is-info");

        contactForm.reset();
    });


    /* ===========================
       Jahreszahl
    =========================== */

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }
});