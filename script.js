document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (menuToggle && mainNav) {
    const updateActiveLink = () => {
      const currentSection = window.location.hash || "#home";
      mainNav.querySelectorAll("a").forEach((link) => {
        const isActive = link.getAttribute("href") === currentSection;
        link.classList.toggle("active", isActive);
        if (isActive) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });
    };

    updateActiveLink();
    window.addEventListener("hashchange", updateActiveLink);
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  document.querySelectorAll("[data-year]").forEach((year) => {
    year.textContent = String(new Date().getFullYear());
  });

  const productGrid = document.querySelector("#product-grid");
  if (productGrid) {
    const products = Array.from(productGrid.querySelectorAll(".product-card"));
    const searchInput = document.querySelector("#product-search");
    const categoryFilter = document.querySelector("#category-filter");
    const resultCount = document.querySelector("#result-count");
    const emptyState = document.querySelector("#empty-state");
    const params = new URLSearchParams(window.location.search);
    const initialCategory = params.get("category");
    const validCategories = ["clothing", "accessories", "home"];

    if (categoryFilter && initialCategory && validCategories.includes(initialCategory)) {
      categoryFilter.value = initialCategory;
    }

    const filterProducts = () => {
      const searchTerm = searchInput.value.trim().toLowerCase();
      const category = categoryFilter.value;
      let visibleCount = 0;

      products.forEach((product) => {
        const matchesSearch = product.dataset.name.toLowerCase().includes(searchTerm);
        const matchesCategory = category === "all" || product.dataset.category === category;
        const isVisible = matchesSearch && matchesCategory;
        product.hidden = !isVisible;
        if (isVisible) visibleCount += 1;
      });

      resultCount.textContent = String(visibleCount);
      emptyState.hidden = visibleCount !== 0;
    };

    searchInput.addEventListener("input", filterProducts);
    categoryFilter.addEventListener("change", filterProducts);
    document.querySelectorAll("[data-category-link]").forEach((link) => {
      link.addEventListener("click", () => {
        categoryFilter.value = link.dataset.categoryLink;
        filterProducts();
      });
    });
    filterProducts();
  }

  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    const formMessage = document.querySelector("#form-message");
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;

      formMessage.textContent = "Thanks for reaching out! This demo form does not send messages yet.";
      contactForm.reset();
    });
  }
});
