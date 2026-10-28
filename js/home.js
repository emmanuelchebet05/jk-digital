/* =========================================
   JK DIGITAL — HOMEPAGE INTERACTIONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    // Add a subtle entrance effect to homepage sections.
    // Content remains visible if animation is unsupported or disabled.

    const animatedElements = document.querySelectorAll(
        ".service-card, .portfolio-card, .why-feature"
    );

    if (!("IntersectionObserver" in window)) {
        return;
    }

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
        return;
    }

    animatedElements.forEach((element) => {
        element.classList.add("reveal-ready");
    });

    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    animatedElements.forEach((element) => {
        observer.observe(element);
    });
});