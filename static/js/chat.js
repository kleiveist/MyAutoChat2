document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("chatForm");
  const input = form.querySelector("input[name='message']");
  const chat = document.getElementById("chat");

  // Get the content wrapper or create one if it doesn't exist yet
  let contentWrapper = chat.querySelector(".chat-content-wrapper");
  if (!contentWrapper) {
      contentWrapper = document.createElement("div");
      contentWrapper.className = "chat-content-wrapper";
      chat.appendChild(contentWrapper);
  }

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

    // Append to the content wrapper instead of the chat container
    contentWrapper.appendChild(bubble);

    input.value = "";
    bubble.scrollIntoView({behavior:"smooth"});
  });
});
