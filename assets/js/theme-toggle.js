// Theme Toggle Script - Always defaults to LIGHT mode
(function () {
  "use strict";

  // Get theme from localStorage - ALWAYS default to light (no system preference check)
  function getInitialTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    // Always default to light mode
    return "light";
  }

  // Apply theme to document
  function applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      // Light mode - remove the attribute (uses :root default)
      document.documentElement.removeAttribute("data-theme");
    }
  }

  // Update button icon
  function updateButton(button, theme) {
    const icon =
      theme === "dark"
        ? '<i class="fas fa-moon"></i>'
        : '<i class="fas fa-sun"></i>';

    button.innerHTML = `<span class="theme-icon">${icon}</span>`;
  }

  // Toggle between light and dark
  function toggleTheme(currentTheme) {
    return currentTheme === "dark" ? "light" : "dark";
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

    // Get current theme
    let currentTheme = localStorage.getItem("theme") || "light";

    // Update button to show current theme
    updateButton(toggleButton, currentTheme);

    // Add click handler
    toggleButton.addEventListener("click", function () {
      const newTheme = toggleTheme(currentTheme);

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
})();
