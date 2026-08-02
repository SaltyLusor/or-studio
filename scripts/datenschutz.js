document.addEventListener("DOMContentLoaded", () => {

    console.log("script.js wurde geladen");
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

    // Nach oben scrollen
    const scrollButton = document.getElementById("scroll-top");

    if (scrollButton) {
        scrollButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
}

    // Aktuelles Jahr
    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

});


    //Dark-Mode-Datenschutz
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;
    localStorage.setItem("theme", "dark");