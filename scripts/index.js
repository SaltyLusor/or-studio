document.addEventListener("DOMContentLoaded", () => {
    console.log("OR Studio JavaScript wurde geladen");
    const body = document.body;

    const menuToggle = document.getElementById("menu-toggle");
    const mainNav = document.getElementById("main-nav");

    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const darkModeIcon = darkModeToggle?.querySelector("i");

    const scrollTopButton = document.getElementById("scroll-top");
    const yearElement = document.getElementById("current-year");


    /* ===========================
       Mobile Navigation
    =========================== */

    function closeMenu() {
        if (!menuToggle || !mainNav) return;

        mainNav.classList.remove("is-open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Navigation öffnen");
    }

    function openMenu() {
        if (!menuToggle || !mainNav) return;

        mainNav.classList.add("is-open");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Navigation schließen");
    }

    menuToggle?.addEventListener("click", (event) => {
        event.stopPropagation();
        
        console.log("Menübutton wurde geklickt");

        const menuIsOpen = mainNav?.classList.contains("is-open");

        if (menuIsOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    mainNav?.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
        if (!mainNav || !menuToggle) return;

        const clickedInsideNavigation = mainNav.contains(event.target);
        const clickedMenuButton = menuToggle.contains(event.target);

        if (!clickedInsideNavigation && !clickedMenuButton) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 1050) {
            closeMenu();
        }
    });


    /* ===========================
       Dark Mode
    =========================== */

    function updateThemeIcon(isDarkMode) {
        if (!darkModeToggle || !darkModeIcon) return;

        darkModeIcon.classList.toggle("fa-sun", isDarkMode);
        darkModeIcon.classList.toggle("fa-moon", !isDarkMode);

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

    const savedTheme = localStorage.getItem("theme");

    const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    const useDarkMode =
        savedTheme === "dark" ||
        (!savedTheme && prefersDarkMode);

    body.classList.toggle("dark-mode", useDarkMode);
    updateThemeIcon(useDarkMode);

    darkModeToggle?.addEventListener("click", () => {
        const isDarkMode = body.classList.toggle("dark-mode");

        localStorage.setItem(
            "theme",
            isDarkMode ? "dark" : "light"
        );

        updateThemeIcon(isDarkMode);
    });


    /* ===========================
       Scroll-to-top
    =========================== */

    scrollTopButton?.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    /* ===========================
       Jahreszahl
    =========================== */

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});