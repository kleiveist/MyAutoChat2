document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("chatForm");
    const input = form.querySelector("input[name='message']");
    const chat  = document.getElementById("chat");

    form.addEventListener("submit", e => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;

      // rechte Bubble erzeugen
      const bubble = document.createElement("div");
      bubble.className = "message right";
      bubble.innerHTML = `
        <span>${text}</span>
        <span class="msg-date">${new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
      `;
      chat.appendChild(bubble);

      input.value = "";
      bubble.scrollIntoView({behavior:"smooth"});
    });
  });
