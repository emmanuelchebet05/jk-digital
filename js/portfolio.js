/* =========================================
   JK DIGITAL — PORTFOLIO FILTERS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const filterButtons = document.querySelectorAll(".portfolio-filter");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedCategory = button.dataset.filter;

            // Update the active filter.
            filterButtons.forEach(function (filterButton) {
                const isActive = filterButton === button;

                filterButton.classList.toggle("active", isActive);
                filterButton.setAttribute(
                    "aria-pressed",
                    String(isActive)
                );
            });

            // Show projects matching the selected category.
            projectCards.forEach(function (card) {

                const projectCategory = card.dataset.category;

                const shouldShow =
                    selectedCategory === "all" ||
                    projectCategory === selectedCategory;

                card.classList.toggle("is-hidden", !shouldShow);

            });

        });

    });

});