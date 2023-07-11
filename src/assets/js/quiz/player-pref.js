import {
  updateLevelInStorage,
  resetScoresInStorage,
  getPlayerStorageLives,
} from "../storage/storage.js";
import { updateToast } from "../ui/toast.js"
import { hidePlayerLivesInDom } from '../utils/utils.js';

const playerPrefDialog = document.querySelector("dialog");
const playerPrefForm = playerPrefDialog.querySelector("form");
const playerLivesEl = document.querySelector("#player-lives").children;
const correctAnswerEl = document.querySelector("[data-answer='correct']");
const incorrectAnswerEl = document.querySelector("[data-answer='incorrect']");

// Player Preferences form
function updateChangePlayerSettings(gameOver) {

  playerPrefForm.addEventListener("submit", async (e) => {
    let playerLives = getPlayerStorageLives();
    e.preventDefault();
    // disable submit button
    playerPrefForm.querySelector('button[type="submit"]').disabled = true;
    const formData = new FormData(playerPrefForm);
    const newSettings = {};
    for (let [name, value] of formData.entries()) {
      newSettings[name] = value;
    }
    
    // Update player settings (lives, reset score) in storage
    updatePlayerSettings(newSettings);
    
    // reset scores in Dom and reset score checkbox in form
    if (newSettings.reset_score) {
      incorrectAnswerEl.textContent = "0";
      correctAnswerEl.textContent = "0";
      playerPrefForm.querySelector("#reset_score").checked = false;
    }
    
    let storageSettingsLives = getPlayerStorageLives();
    updateToast(newSettings);
    
    // if player lives is less than current lives
    // add a hidden class to the last player live icon
    if (storageSettingsLives < playerLives) {
      hidePlayerLivesInDom();
    } else {

      // if player lives is greater than current lives
      // remove hidden class from icons
      Array.from(playerLivesEl)
      .slice(playerLives, storageSettingsLives)
      .forEach((child) => child.classList.remove("hidden"));
    }
    
    // // reset game to prevent cheating when player lives change
    await gameOver(250, false);
        
    // close dialog
    playerPrefDialog.close();
    // enable submit button
    playerPrefForm.querySelector('button[type="submit"]').disabled = false;
  });
}

/**
 * @description Update player settings in localStorage
 *
 * @param {Object} updatedSettings - updated settings object
 * @param {'easy'|'medium'|'hard'} [updatedSettings.difficulty_level] - updated difficulty level
 * @param {boolean} [updatedSettings.reset_score] - reset total correct answers and total incorrect answers
 */
function updatePlayerSettings(updatedSettings) {
  const { difficulty_level, reset_score } = updatedSettings;
  if (difficulty_level) {
    updateLevelInStorage(difficulty_level);
  }
  if (reset_score) {
    resetScoresInStorage();
  }
}

export { updateChangePlayerSettings };
