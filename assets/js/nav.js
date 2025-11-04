document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector("nav ul");
  const MOBILE_BREAKPOINT = 720; // Соответствует 45rem в style.scss
  const SCROLL_THRESHOLD = 100; // Pixels to scroll before transforming

  if (!toggle || !menu) {
    console.error("Nav toggle or menu not found");
    return;
  }

  const isMobileView = () => window.innerWidth <= MOBILE_BREAKPOINT;

  // Handle scroll transformation: hamburger → dots
  function handleScrollTransform() {
    if (!isMobileView()) return; // Only on mobile
    
    const isMenuOpen = menu.classList.contains("nav-open");
    const isScrolled = window.scrollY > SCROLL_THRESHOLD;
    
    // Only transform to dots if menu is closed
    if (!isMenuOpen) {
      if (isScrolled) {
        toggle.classList.add("scrolled");
      } else {
        toggle.classList.remove("scrolled");
      }
    }
  }

  // Listen for scroll events
  window.addEventListener("scroll", handleScrollTransform, { passive: true });
  
  // Check initial state
  handleScrollTransform();

  // Mobile hamburger menu toggle
  toggle.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    const isOpen = menu.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", isOpen);
    toggle.classList.toggle("active");
    
    // Remove scrolled class when opening menu (show X, not dots)
    if (isOpen) {
      toggle.classList.remove("scrolled");
    } else {
      // Re-check scroll position when closing menu
      handleScrollTransform();
    }

    console.log("Menu toggled:", isOpen);
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest("nav")) {
      menu.classList.remove("nav-open");
      toggle.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
      
      // Re-check scroll position when closing menu
      handleScrollTransform();
    }
  });

  // Close menu when clicking a link (mobile only)
  const links = menu.querySelectorAll("a:not(.submenu-toggle a)");
  links.forEach((link) => {
    link.addEventListener("click", function () {
      if (isMobileView()) {
        menu.classList.remove("nav-open");
        toggle.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
        
        // Re-check scroll position when closing menu
        handleScrollTransform();
      }
    });
  });

  // Submenu toggle functionality (works on both desktop and mobile)
  const submenuToggles = document.querySelectorAll(".submenu-toggle");

  submenuToggles.forEach(function (toggle) {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const submenu = toggle.nextElementSibling;
      const arrow = toggle.querySelector(".submenu-arrow");

      if (!submenu || !submenu.classList.contains("submenu")) {
        console.error("Submenu not found after toggle button");
        return;
      }

      const isOpen = submenu.classList.toggle("submenu-open");
      toggle.setAttribute("aria-expanded", isOpen);

      if (arrow) {
        if (isMobileView()) {
          arrow.style.transform = isOpen ? "rotate(90deg)" : "rotate(180deg)";
        } else {
          arrow.style.transform = isOpen ? "rotate(90deg)" : "rotate(0deg)";
        }
      }

      console.log("Submenu toggled:", isOpen, submenu);
    });
  });

  // Auto-expand submenu if current page is a subpage
  const activeSubmenuItem = document.querySelector(".submenu a.active");
  if (activeSubmenuItem) {
    const submenu = activeSubmenuItem.closest(".submenu");
    const toggle = submenu?.previousElementSibling;

    if (submenu && toggle) {
      submenu.classList.add("submenu-open");
      toggle.setAttribute("aria-expanded", "true");

      const arrow = toggle.querySelector(".submenu-arrow");
      if (arrow) {
        arrow.style.transform = "rotate(90deg)";
      }

      console.log("Submenu auto-expanded for active subpage");
    }
  }

  submenuToggles.forEach(function (toggle) {
    const arrow = toggle.querySelector(".submenu-arrow");
    const submenu = toggle.nextElementSibling;

    if (arrow && submenu && !submenu.classList.contains("submenu-open")) {
      if (isMobileView()) {
        arrow.style.transform = "rotate(180deg)"; // Закрыто, мобильный (←)
      } else {
        arrow.style.transform = "rotate(0deg)"; // Закрыто, десктоп (→)
      }
    }
  });

  console.log("Nav script loaded successfully");
  console.log("Found submenu toggles:", submenuToggles.length);
});