document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const menuOverlay = document.getElementById("menuOverlay");

  if (!menuToggle || !navLinks) {
    console.error("Navigation elements not found.");
    return;
  }

  /* ==========================================
     OPEN / CLOSE MOBILE MENU
  ========================================== */

  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("active");

    if (menuOverlay) {
      menuOverlay.classList.toggle("active", open);
    }

    menuToggle.textContent = open ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", open);
  });

  /* ==========================================
     CLOSE MENU
  ========================================== */

  function closeMenu() {
    navLinks.classList.remove("active");

    if (menuOverlay) {
      menuOverlay.classList.remove("active");
    }

    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");

    // Close all dropdowns
    navLinks
      .querySelectorAll(".dropdown.active, .dropdown-submenu.active")
      .forEach((item) => {
        item.classList.remove("active");
      });
  }

  /* ==========================================
     OVERLAY
  ========================================== */

  if (menuOverlay) {
    menuOverlay.addEventListener("click", closeMenu);
  }

  /* ==========================================
     MOBILE DROPDOWN CLICK
  ========================================== */

  navLinks.addEventListener("click", (event) => {
    const link = event.target.closest("a");

    if (!link || !navLinks.contains(link)) {
      return;
    }

    // Only activate dropdown behavior on mobile
    if (window.innerWidth > 768) {
      return;
    }

    const parent = link.parentElement;

    /*
     * SERVICES
     * .dropdown > a
     */
    if (
      parent &&
      parent.classList.contains("dropdown") &&
      !parent.classList.contains("dropdown-submenu")
    ) {
      event.preventDefault();

      const isOpen = parent.classList.contains("active");

      // Close other top-level dropdowns
      navLinks
        .querySelectorAll(":scope > .dropdown.active")
        .forEach((dropdown) => {
          if (dropdown !== parent) {
            dropdown.classList.remove("active");

            dropdown
              .querySelectorAll(".dropdown-submenu.active")
              .forEach((sub) => {
                sub.classList.remove("active");
              });
          }
        });

      parent.classList.toggle("active", !isOpen);

      return;
    }

    /*
     * SIGNATURE SERVICES
     * .dropdown-submenu > a
     */
    if (parent && parent.classList.contains("dropdown-submenu")) {
      event.preventDefault();

      const isOpen = parent.classList.contains("active");

      parent.classList.toggle("active", !isOpen);

      return;
    }

    /*
     * NORMAL LINK
     */
    closeMenu();
  });

  /* ==========================================
     ESC KEY
  ========================================== */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  /* ==========================================
     RESET ON DESKTOP
  ========================================== */

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
});
