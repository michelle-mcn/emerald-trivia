const toastContainerEl = document.querySelector("#toast-container");
const toastEl = document.querySelector("#toast");
const toastListEl = document.createElement("li");
const toastMessageTime = 2500;

/**
 * @description - Updates the toast messages in the DOM
 * @param {Object} message
 * @param {'easy'|'medium'|'hard'} [message.difficulty_level] - The difficulty level of the game.
 * @param {'on'} [message.reset_score] - The reset score value.
 */
function updateToast(message) {
  const { difficulty_level, reset_score } = message;
  toastContainerEl.classList.remove("hidden");
  toastContainerEl.classList.add("fixed");

  if (difficulty_level) {
    // clone list and append to DOM
    const cloneListEl = toastListEl.cloneNode(true);
    cloneListEl.textContent = `Difficulty level set to ${difficulty_level}`;
    toastEl.appendChild(cloneListEl);
  }

  // add reset score message to toast and line break
  if (reset_score) {
    const cloneListEl = toastListEl.cloneNode(true);
    cloneListEl.textContent = "Score reset";
    toastEl.appendChild(cloneListEl);
  }

  setTimeout(() => {
    toastContainerEl.classList.add("hidden");
    toastContainerEl.classList.remove("fixed");
    toastEl.textContent = "";
  }, toastMessageTime);
}

export { updateToast };