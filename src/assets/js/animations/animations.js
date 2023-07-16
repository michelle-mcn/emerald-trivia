/*jshint esversion: 11 */

/**
 * @param  {HTMLImageElement} playerLives
 * @param  {HTMLDivElement} playerLivesContainerEl
 * @returns {Promise<unknown>} - Promise resolves when animationiteration event fires
 * @description Animates the player lives icons
 */

async function animateLivesLost(playerLives, playerLivesContainerEl) {
  let livesIcon = playerLives;

  livesIcon.classList.add("animate-ping-new");
  playerLivesContainerEl.classList.add("shadow-red-900");
  playerLivesContainerEl.classList.add("!border-red-300");
  playerLivesContainerEl.firstElementChild.classList.add("text-red-300");

  // return a new Promise and resolve after 400ms
  return new Promise((resolve) => {
    return setTimeout(() => {
      livesIcon.classList.remove("animate-ping-new");
      playerLivesContainerEl.classList.remove("shadow-red-900");
      playerLivesContainerEl.classList.remove("!border-red-300");
      playerLivesContainerEl.firstElementChild.classList.remove("text-red-300");
      livesIcon.classList.add("hidden");
      resolve();
    }, 400);
  });
}

/**
 * @description Sets the data-animate-in attribute to true
 * and removes the hidden class from the heart icon
 * @param {HTMLImageElement} icon
 * @returns {Promise<unknown>}
 */

function animateHeartIconToDOM(icon) {
  return new Promise((resolve) => {
    return setTimeout(() => {
      icon.setAttribute("data-animate-in", "true");
      icon.classList.remove("hidden");
      resolve();
    }, 150);
  });
}

export { animateLivesLost, animateHeartIconToDOM };
