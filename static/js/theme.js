// static/js/theme.js
document.addEventListener("DOMContentLoaded", () => {
    const btn  = document.getElementById("themeToggle");
    const img  = btn.querySelector("img");
    const root = document.documentElement;

    const setIcon = (dark) => {
      img.src = dark ? btn.dataset.iconDark : btn.dataset.iconLight;
    };

    // gespeicherte Präferenz anwenden
    const darkInitial = localStorage.getItem("theme") === "dark";
    if (darkInitial) root.classList.add("dark-theme");
    setIcon(darkInitial);

    // Klick‑Handler
    btn.addEventListener("click", () => {
      const dark = root.classList.toggle("dark-theme");
      localStorage.setItem("theme", dark ? "dark" : "light");
      setIcon(dark);
    });
  });
