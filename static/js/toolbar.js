document.addEventListener("DOMContentLoaded", () => {
    const toggle  = document.getElementById("toolbarToggle");
    const toolbar = document.getElementById("toolbar");
    const body    = document.body;

    toggle.addEventListener("click", () => {
      const isOpen = toolbar.classList.toggle("hidden");
      // wenn hidden-klasse da ist → geschlossen, sonst offen
      if (isOpen) {
        body.classList.remove("toolbar-open");
      } else {
        body.classList.add("toolbar-open");
      }
    });
  });
