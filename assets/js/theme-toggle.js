// Theme Toggle Script
(function () {
  "use strict";

  // Get theme from localStorage or system preference
  function getInitialTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    // Check system preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
    return "light";
  }

  // Apply theme to document
  function applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      // 'auto' mode - remove attribute to use system preference
      document.documentElement.removeAttribute("data-theme");
    }
  }

  // Update button text and icon
  function updateButton(button, theme) {
    const icons = {
      light: '<i class="fas fa-sun"></i>',
      dark: '<i class="fas fa-moon"></i>',
      auto: '<i class="fas fa-circle-half-stroke"></i>',
    };
    const labels = {
      light: "Light",
      dark: "Dark",
      auto: "Auto",
    };

    button.innerHTML = `<span class="theme-icon">${icons[theme]}</span><span>${labels[theme]}</span>`;
  }

  // Cycle through themes: light -> dark -> auto -> light
  function cycleTheme(currentTheme) {
    const cycle = ["light", "dark", "auto"];
    const currentIndex = cycle.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % cycle.length;
    return cycle[nextIndex];
  }

  // Initialize theme on page load (run immediately, before DOM loads)
  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);

  // Set up toggle button when DOM is ready
  document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector(".theme-toggle");

    if (!toggleButton) {
      console.warn("Theme toggle button not found");
      return;
    }

    // Get current theme (check both localStorage and data attribute)
    let currentTheme = localStorage.getItem("theme") || "auto";

    // Update button to show current theme
    updateButton(toggleButton, currentTheme);

    // Add click handler
    toggleButton.addEventListener("click", function () {
      const newTheme = cycleTheme(currentTheme);

      // Save to localStorage
      localStorage.setItem("theme", newTheme);

      // Apply theme
      applyTheme(newTheme);

      // Update button
      updateButton(toggleButton, newTheme);

      // Update current theme
      currentTheme = newTheme;
    });
  });

  // Listen for system theme changes (when in auto mode)
  if (window.matchMedia) {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", function (e) {
        const currentTheme = localStorage.getItem("theme");
        // Only react if we're in auto mode (no saved preference)
        if (!currentTheme || currentTheme === "auto") {
          applyTheme("auto");
        }
      });
  }
})();
