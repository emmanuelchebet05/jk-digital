/* =========================================
   JK DIGITAL — SHARED INTERACTIONS
   Mobile Navigation & Global Functions
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    if (menuToggle && navLinks) {

        // Keep the menu button's accessibility state synchronized
        function setMenuState(isOpen) {
            navLinks.classList.toggle("open", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );
        }

        // Open or close the mobile navigation
        menuToggle.addEventListener("click", (event) => {
            event.stopPropagation();

            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            setMenuState(!isOpen);
        });

        // Close the menu after selecting a navigation link
        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                setMenuState(false);
            });
        });

        // Close the menu when clicking outside it
        document.addEventListener("click", (event) => {
            const clickedInsideMenu =
                navLinks.contains(event.target) ||
                menuToggle.contains(event.target);

            if (!clickedInsideMenu) {
                setMenuState(false);
            }
        });

        // Close the menu when pressing Escape
        document.addEventListener("keydown", (event) => {
            if (
                event.key === "Escape" &&
                navLinks.classList.contains("open")
            ) {
                setMenuState(false);
                menuToggle.focus();
            }
        });

        // Close the mobile menu when returning to desktop width
        window.addEventListener("resize", () => {
            if (window.innerWidth > 1000) {
                setMenuState(false);
            }
        });

        // Ensure the initial state is correct
        setMenuState(false);
    }

    /* =========================================
       AUTOMATIC COPYRIGHT YEAR
    ========================================= */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    /* =========================================
       INITIALIZATION CONFIRMATION
    ========================================= */

    console.log("JK Digital shared interactions initialized.");
});