document.addEventListener("DOMContentLoaded", () => {
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

    /* ===========================
   Scroll-Reveal-Animationen
    =========================== */

    const revealElements = document.querySelectorAll(
        [
            ".content-section",
            ".skill-card",
            ".project-card",
            ".web-project-card",
            ".social-card",
            ".about-highlight"
        ].join(",")
    );

    revealElements.forEach((element, index) => {
        element.classList.add("reveal");

        const delay = (index % 4) * 80;

        element.style.setProperty(
            "--reveal-delay",
            `${delay}ms`
        );
    });

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    } else {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -60px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    }


});


/* ===========================
   Consent Management
=========================== */

document.addEventListener("DOMContentLoaded", () => {
    const consentSettingsButton =
    document.getElementById("open-consent-settings");

    const CONSENT_KEY = "orStudioConsent";

    const consentBanner = document.getElementById("consent-banner");
    const acceptButton = document.getElementById("consent-accept");
    const rejectButton = document.getElementById("consent-reject");

    if (!consentBanner || !acceptButton || !rejectButton) {
        return;
    }



    /* ===========================
       Consent auslesen
    =========================== */

    function getConsent() {

        const storedConsent = localStorage.getItem(CONSENT_KEY);

        if (!storedConsent) {
            return null;
        }

        try {
            return JSON.parse(storedConsent);
        } catch (error) {
            localStorage.removeItem(CONSENT_KEY);
            return null;
        }
    }


    /* ===========================
       Consent speichern
    =========================== */

    function saveConsent(externalMediaAllowed) {

        const consent = {
            necessary: true,
            externalMedia: externalMediaAllowed,
            timestamp: new Date().toISOString()
        };

        localStorage.setItem(
            CONSENT_KEY,
            JSON.stringify(consent)
        );

        return consent;
    }


    /* ===========================
       Banner anzeigen
    =========================== */

    function showConsentBanner() {
        consentBanner.hidden = false;
    }


    /* ===========================
       Banner schließen
    =========================== */

    function hideConsentBanner() {
        consentBanner.hidden = true;
    }


    /* ===========================
        Einstellungen öffnen
    =========================== */

     if (consentSettingsButton) {
    consentSettingsButton.addEventListener("click", () => {
        showConsentBanner();
    });


    /* ===========================
       TikTok laden
    =========================== */

    function loadTikTokEmbeds() {

        const existingScript =
            document.querySelector(
                'script[data-tiktok-consent="true"]'
            );

        if (existingScript) {
            return;
        }

        const script = document.createElement("script");

        script.src = "https://www.tiktok.com/embed.js";
        script.async = true;

        script.dataset.tiktokConsent = "true";

        document.body.appendChild(script);
    }


    /* ===========================
       Zustimmung anwenden
    =========================== */

    function applyConsent(consent) {

        if (!consent) {
            return;
        }

        if (consent.externalMedia === true) {
            loadTikTokEmbeds();
        }
    }


    /* ===========================
       Alle akzeptieren
    =========================== */

    acceptButton.addEventListener("click", () => {

        const consent = saveConsent(true);

        applyConsent(consent);

        hideConsentBanner();

    });


    /* ===========================
       Nur notwendige
    =========================== */

    rejectButton.addEventListener("click", () => {

    const previousConsent = getConsent();

    saveConsent(false);

    hideConsentBanner();

    // Falls TikTok zuvor bereits erlaubt und geladen wurde,
    // Seite neu laden, damit externe Inhalte wirklich deaktiviert werden.
    if (previousConsent?.externalMedia === true) {
        window.location.reload();
    }

    });


    /* ===========================
       Beim Seitenstart prüfen
    =========================== */

    const existingConsent = getConsent();

    if (!existingConsent) {

        showConsentBanner();

    } else {

        applyConsent(existingConsent);

    }


    /* ===========================
       Global verfügbar machen
    =========================== */

    window.ORStudioConsent = {

        get: getConsent,

        show: showConsentBanner

    };
    
    }
});


/* ===========================
   Consent Management
=========================== */

document.addEventListener("DOMContentLoaded", () => {

    const CONSENT_KEY = "orStudioConsent";

    const consentBanner =
        document.getElementById("consent-banner");

    const acceptButton =
        document.getElementById("consent-accept");

    const rejectButton =
        document.getElementById("consent-reject");

    const consentSettingsButton =
        document.getElementById("open-consent-settings");

    const tiktokPlaceholders =
        document.querySelectorAll(
            ".tiktok-consent-placeholder"
        );

    const tiktokEmbeds =
        document.querySelectorAll(
            ".tiktok-embed"
        );

    const tiktokConsentButtons =
        document.querySelectorAll(
            ".tiktok-consent-button"
        );


    if (!consentBanner || !acceptButton || !rejectButton) {
        return;
    }


    /* ===========================
       Consent auslesen
    =========================== */

    function getConsent() {

        const storedConsent =
            localStorage.getItem(CONSENT_KEY);

        if (!storedConsent) {
            return null;
        }

        try {
            return JSON.parse(storedConsent);

        } catch (error) {

            localStorage.removeItem(CONSENT_KEY);

            return null;
        }
    }


    /* ===========================
       Consent speichern
    =========================== */

    function saveConsent(externalMediaAllowed) {

        const consent = {
            necessary: true,
            externalMedia: externalMediaAllowed,
            timestamp: new Date().toISOString()
        };

        localStorage.setItem(
            CONSENT_KEY,
            JSON.stringify(consent)
        );

        return consent;
    }


    /* ===========================
       Consent Banner
    =========================== */

    function showConsentBanner() {
        consentBanner.hidden = false;
    }

    function hideConsentBanner() {
        consentBanner.hidden = true;
    }


    /* ===========================
       TikTok Platzhalter
    =========================== */

    function showTikTokPlaceholders() {

        tiktokPlaceholders.forEach((placeholder) => {
            placeholder.hidden = false;
        });

        tiktokEmbeds.forEach((embed) => {
            embed.hidden = true;
        });
    }


    /* ===========================
       TikTok Embeds anzeigen
    =========================== */

    function showTikTokEmbeds() {

        tiktokPlaceholders.forEach((placeholder) => {
            placeholder.hidden = true;
        });

        tiktokEmbeds.forEach((embed) => {
            embed.hidden = false;
        });
    }


    /* ===========================
       TikTok Script laden
    =========================== */

    function loadTikTokEmbeds() {

        showTikTokEmbeds();

        const existingScript =
            document.querySelector(
                'script[data-tiktok-consent="true"]'
            );

        if (existingScript) {
            return;
        }

        const script =
            document.createElement("script");

        script.src =
            "https://www.tiktok.com/embed.js";

        script.async = true;

        script.dataset.tiktokConsent = "true";

        document.body.appendChild(script);
    }


    /* ===========================
       Zustimmung anwenden
    =========================== */

    function applyConsent(consent) {

        if (!consent) {
            showTikTokPlaceholders();
            return;
        }

        if (consent.externalMedia === true) {

            loadTikTokEmbeds();

        } else {

            showTikTokPlaceholders();

        }
    }


    /* ===========================
       Alle akzeptieren
    =========================== */

    acceptButton.addEventListener("click", () => {

        const consent = saveConsent(true);

        applyConsent(consent);

        hideConsentBanner();
    });


    /* ===========================
       Nur notwendige
    =========================== */

    rejectButton.addEventListener("click", () => {

        const previousConsent = getConsent();

        saveConsent(false);

        showTikTokPlaceholders();

        hideConsentBanner();

        /*
         * Falls TikTok bereits geladen wurde,
         * Seite neu laden, damit die externe
         * Verbindung wirklich beendet wird.
         */

        if (previousConsent?.externalMedia === true) {
            window.location.reload();
        }
    });


    /* ===========================
       TikTok direkt aktivieren
    =========================== */

    tiktokConsentButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const consent = saveConsent(true);

            applyConsent(consent);

            hideConsentBanner();
        });

    });


    /* ===========================
       Datenschutz-Einstellungen
    =========================== */

    if (consentSettingsButton) {

        consentSettingsButton.addEventListener(
            "click",
            () => {

                showConsentBanner();

            }
        );

    }


    /* ===========================
       Beim Seitenstart prüfen
    =========================== */

    const existingConsent = getConsent();

    if (!existingConsent) {

        showTikTokPlaceholders();

        showConsentBanner();

    } else {

        applyConsent(existingConsent);

    }


    /* ===========================
       Global verfügbar
    =========================== */

    window.ORStudioConsent = {

        get: getConsent,

        show: showConsentBanner

    };

});