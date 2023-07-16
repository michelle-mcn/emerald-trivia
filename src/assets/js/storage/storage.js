/*jshint esversion: 11 */

import { difficultyLevel } from "../quiz/settings.js";
/**
 * @description Reset total correct answers and total
 * incorrect answers in localStorage
 */
function resetScoresInStorage() {
  let settings = JSON.parse(localStorage.getItem("settings"));
  settings.totalCorrectAnswers = 0;
  settings.totalIncorrectAnswers = 0;
  localStorage.setItem("settings", JSON.stringify(settings));
}

/**
 * @description Update total correct or incorrect answers in localStorage
 * @param {Boolean} isCorrectAnswer
 */
function updateScoresInStorage(isCorrectAnswer) {
  let settings = JSON.parse(localStorage.getItem("settings"));
  isCorrectAnswer
    ? (settings.totalCorrectAnswers += 1)
    : (settings.totalIncorrectAnswers += 1);
  localStorage.setItem("settings", JSON.stringify(settings));
}

/**
 * Set difficulty level in localStorage
 * @param {'easy'|'medium'|'hard'} selectedLevel - updated difficulty level from user
 */
function updateLevelInStorage(selectedLevel) {
  let settings = JSON.parse(localStorage.getItem("settings"));
  settings.difficulty = selectedLevel;
  settings.maxLives = difficultyLevel[selectedLevel];
  localStorage.setItem("settings", JSON.stringify(settings));
}

/**
 * Get player lives based on difficulty level set in localStorage
 * @returns {number|undefined} player lives
 */
function getPlayerStorageLives() {
  return JSON.parse(localStorage.getItem("settings"))?.maxLives;
}

/**
 * Get player difficulty level set in localStorage
 * @returns {string|undefined}
 */
function getPlayerStorageDifficulty() {
  return JSON.parse(localStorage.getItem("settings"))?.difficulty;
}

export {
  resetScoresInStorage,
  updateScoresInStorage,
  getPlayerStorageLives,
  getPlayerStorageDifficulty,
  updateLevelInStorage,
};
