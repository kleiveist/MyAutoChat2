// static/js/auth.js
document.addEventListener("DOMContentLoaded", () => {
  const openBtn   = document.getElementById("openDeleteModal");
  const modal     = document.getElementById("deleteModal");
  const cancelBtn = document.getElementById("cancelDelete");
  const form      = document.getElementById("deleteForm");

  // Script läuft nur auf Login‑/Register‑Seiten
  if (!openBtn || !modal) return;

  /* ---------- Modal öffnen ---------- */
  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.add("show");      // Overlay einblenden
  });

  /* ---------- Modal schließen ---------- */
  cancelBtn.addEventListener("click", () => {
    modal.classList.remove("show");   // Overlay ausblenden
    form.reset();
  });

  /* ---------- Account löschen ---------- */
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const u1 = form.username.value.trim();
    const u2 = form.username_confirm.value.trim();
    const pw = form.password.value;

    if (u1 !== u2) {
      alert("Benutzernamen stimmen nicht überein!");
      return;
    }

    try {
      const res = await fetch(deleteUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: u1, password: pw })
      });

      if (res.ok) {
        window.location.href = redirectUrl;   // zurück zum Login
      } else {
        alert(await res.text() || "Fehler beim Löschen.");
      }
    } catch (err) {
      console.error(err);
      alert("Netzwerkfehler.");
    }
  });
});
