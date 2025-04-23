// static/js/toolbar.js
document.addEventListener("DOMContentLoaded", () => {
  // Button-Elemente
  const horizontalPanelBtn = document.getElementById("horizontalPanelBtn");
  const leftToolbarBtn = document.getElementById("leftToolbarBtn");

  // Toolbar-Elemente
  const horizontalPanel = document.getElementById("horizontal-panel");
  const leftToolbar = document.getElementById("left-toolbar");

  // Body für Klassen
  const body = document.body;

  // Hilfsfunktion zum Umschalten eines Elements
  function toggleElement(element, btnEl, bodyClass) {
    element.classList.toggle("visible");
    const isVisible = element.classList.contains("visible");

    if (isVisible) {
      body.classList.add(bodyClass);
    } else {
      body.classList.remove(bodyClass);
    }
  }

  // Horizontales Panel umschalten
  horizontalPanelBtn.addEventListener("click", () => {
    toggleElement(horizontalPanel, horizontalPanelBtn, "horizontal-panel-open");
  });

  // Linke Toolbar umschalten
  leftToolbarBtn.addEventListener("click", () => {
    toggleElement(leftToolbar, leftToolbarBtn, "left-toolbar-open");
  });

  // Dark Mode Status für Icon-Wechsel
  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", updateToolbarIcons);
  }

  // Initial Icons basierend auf Theme setzen
  updateToolbarIcons();

  // Funktion zum Aktualisieren der Toolbar-Icons basierend auf dem aktuellen Theme
  function updateToolbarIcons() {
    const isDarkMode = document.documentElement.classList.contains("dark-theme");

    // Horizontales Panel Button Icon aktualisieren
    if (horizontalPanelBtn) {
      const horizontalIcon = horizontalPanelBtn.querySelector("img");
      horizontalIcon.src = isDarkMode
        ? horizontalPanelBtn.dataset.iconDark
        : horizontalPanelBtn.dataset.iconLight;
    }

    // Linke Toolbar Button Icon aktualisieren
    if (leftToolbarBtn) {
      const leftIcon = leftToolbarBtn.querySelector("img");
      if (leftIcon) {
        leftIcon.src = isDarkMode
          ? leftToolbarBtn.dataset.iconDark
          : leftToolbarBtn.dataset.iconLight;
      }
    }
  }
});
