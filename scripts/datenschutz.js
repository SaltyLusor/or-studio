document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    const darkModeToggle =
        document.getElementById("dark-mode-toggle");

    const darkModeIcon =
        darkModeToggle?.querySelector("i");

    const menuToggle =
        document.getElementById("menu-toggle");

    const mainNav =
        document.getElementById("main-nav");

    const scrollTopButton =
        document.getElementById("scroll-top");

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
        window.matchMedia?.(
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
       Mobile Navigation
    =========================== */

    function openMenu() {
        if (!menuToggle || !mainNav) return;

        mainNav.classList.add("is-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Navigation schließen"
        );
    }

    function closeMenu() {
        if (!menuToggle || !mainNav) return;

        mainNav.classList.remove("is-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Navigation öffnen"
        );
    }

    function toggleMenu() {
        if (!mainNav) return;

        const isOpen =
            mainNav.classList.contains("is-open");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    menuToggle?.addEventListener(
        "click",
        toggleMenu
    );

    mainNav
        ?.querySelectorAll("a")
        .forEach((link) => {
            link.addEventListener(
                "click",
                closeMenu
            );
        });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    document.addEventListener("click", (event) => {
        const clickedElement = event.target;

        if (!(clickedElement instanceof Node)) {
            return;
        }

        const clickedInsideMenu =
            mainNav?.contains(clickedElement);

        const clickedMenuButton =
            menuToggle?.contains(clickedElement);

        if (
            !clickedInsideMenu &&
            !clickedMenuButton
        ) {
            closeMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 1050) {
            closeMenu();
        }
    });


    /* ===========================
       Scroll-to-top
    =========================== */

    scrollTopButton?.addEventListener(
        "click",
        () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    );


    /* ===========================
       Jahreszahl
    =========================== */

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }
});