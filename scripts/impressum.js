document.addEventListener("DOMContentLoaded", () => {

    // Dark Mode
    const toggleButton = document.getElementById("dark-mode-toggle");

    if (toggleButton) {
        const toggleIcon = toggleButton.querySelector("i");
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {
            document.body.classList.add("dark-mode");
            toggleIcon?.classList.replace("fa-moon", "fa-sun");
        }

        toggleButton.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");

            const darkModeActive =
                document.body.classList.contains("dark-mode");

            localStorage.setItem(
                "theme",
                darkModeActive ? "dark" : "light"
            );

            if (toggleIcon) {
                toggleIcon.classList.toggle("fa-moon", !darkModeActive);
                toggleIcon.classList.toggle("fa-sun", darkModeActive);
            }
        });
    }

    // Aktuelles Jahr
    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

});

