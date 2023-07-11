import { getPlayerStorageLives } from '../storage/storage';
import { maxLives } from '../quiz/settings';
const playerLivesEl = document.querySelector("#player-lives");
// remove player lives from DOM if player lives is less than maxLives
// each player life is represented by a heart icon
// if player lives is less than maxLives, hide the last heart icon
function hidePlayerLivesInDom() {

  let playerLivesIconElements = playerLivesEl.childElementCount - 1;
  let iteration = maxLives - getPlayerStorageLives();

  while (iteration > 0) {
    console.log('fired', iteration);
    playerLivesEl.children[playerLivesIconElements].classList.add("hidden");
    playerLivesIconElements--;
    iteration--;
  }
}

export { hidePlayerLivesInDom };