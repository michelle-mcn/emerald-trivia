import {
  createQuiz,
  currentTopicData,
  quizTopics,
  quizDescriptions,
  randomQuestionOptions,
  correctAnswer,
} from "./quiz/quiz";
import {
  settings as playerSettings,
  maxLives,
  setSelectElementOptionDifficulty,
} from "./quiz/settings";
import {
  createImageElement,
  createAnimationGridElement,
  createTopicCardElements,
  createTopicSelectElements,
} from "./ui/ui-elements";
import {
  animateLivesLost,
  animateHeartIconToDOM,
} from "./animations/animations";
import {
  updateScoresInStorage,
  getPlayerStorageLives,
  getPlayerStorageDifficulty,
} from "./storage/storage";
import { hidePlayerLivesInDom } from "./utils/utils";
import { updateChangePlayerSettings } from "./quiz/player-pref";

let settings = playerSettings;

// Set player lives & scores from local storage otherwise set default values
let playerLives = getPlayerStorageLives() ?? settings.maxLives;
const loadingStateTime = 2500;

// DOM Elements
const quizHeadingEl = document.querySelector("#quiz-heading");
const quizQuestionEl = document.querySelector("#quiz-question");
const quizTopicSelectEl = document.querySelector("#quiz-topic-select");
const quizUlEl = document.querySelector("#quiz-options-list");
const selectedTopicIcon = createImageElement();
let quizChoiceButtons;
const quizOptionSelectEl = document.querySelector("#quiz-options-select");
const dataLoadingEl = document.querySelector("[data-loading='false']");
const gameOverContainerEl = document.querySelector("#game-over-container");
const incorrectTextEl = document.querySelector("#correct-answer-addon");
// correct answer element data attribute data = correct-answer
const correctAnswerEl = document.querySelector("[data-answer='correct']");
// incorrect answer element data attribute data = incorrect-answer
const incorrectAnswerEl = document.querySelector("[data-answer='incorrect']");
const playerLivesEl = document.querySelector("#player-lives");
const playerLivesSrOnlyEl = document.querySelector("#player-lives-sr-only");
const playerLivesContainerEl = document.querySelector(
  "#player-lives-container"
);
// player live icon
const playersLiveIcon = createImageElement();
playersLiveIcon.setAttribute("src", "/assets/images/icons/heart.svg");
playersLiveIcon.setAttribute("alt", "heart icon");

// copyright text (footer)
const copyrightEl = document.querySelector("#copyright");
const currentYear = new Date().getFullYear();
const copyRightText = `&copy; ${currentYear} `;
copyrightEl.innerHTML = copyRightText + copyrightEl.innerHTML;

// check localStorage for settings and set default values if not found
!localStorage.getItem("settings")
  ? localStorage.setItem("settings", JSON.stringify(settings))
  : (settings = JSON.parse(localStorage.getItem("settings")));

// Create Topic Elements for Small & Large Screens
quizTopics.sort().forEach((topic, index) => {
  // access topic description from data file
  createTopicSelectElements(topic);
  createTopicCardElements(topic, index, quizDescriptions);
});

/**
 * @description - Sets the selected topic data (quiz topic, quiz icon, quiz question)
 */
function appendQuizTitleAndQuestion() {
  // set quiz heading
  quizHeadingEl.textContent = currentTopicData["topic"].replace(/_/g, " ");
  // set quiz heading icon attributes
  selectedTopicIcon.setAttribute("id", "question-icon");
  selectedTopicIcon.setAttribute(
    "src",
    `/assets/images/icons/${currentTopicData["topic"].replace(/_/g, "-")}.svg`
  );
  selectedTopicIcon.setAttribute("alt", currentTopicData["topic"] + " icon");
  //add new img to DOM after quiz heading based on a current topic
  quizHeadingEl.after(selectedTopicIcon);
  // set quiz question content
  quizQuestionEl.textContent = currentTopicData["question"];
}

/**
 * @description - Creates new quiz Dom content
 * (Quiz, topic, question, & possible answers)
 */
function setDomQuizElements() {
  appendQuizTitleAndQuestion();

  const questionOptions = randomQuestionOptions;

  if (
    !quizUlEl.childElementCount &&
    quizOptionSelectEl.childElementCount <= 1
  ) {
    questionOptions.forEach((option) =>
      appendAnswerPossibilities(option, quizUlEl, quizOptionSelectEl)
    );
  } else {
    questionOptions.forEach((option, index) =>
      replacePossibleAnswers(
        option,
        index,
        quizOptionSelectEl,
        quizChoiceButtons
      )
    );
  }
  quizChoiceButtons = quizUlEl.querySelectorAll("button");
}

/**
 * @description Adds quiz topic possible answers to the select/list elements
 *
 * @param {String} option - Quiz answer possibility
 * @param {HTMLUListElement} listElement - HTMLUListElement containing the quiz option list element
 * @param {HTMLSelectElement} selectElement - HTMLSelectElement containing the quiz option select element (for small screens)
 */

function appendAnswerPossibilities(option, listElement, selectElement) {
  const questionListItem = document.createElement("li");
  const questionButton = document.createElement("button");
  const optionElement = document.createElement("option");

  // set attributes and text content for small screens
  optionElement.setAttribute("value", option);
  optionElement.textContent = option;

  // append elements to DOM for small screens
  selectElement.appendChild(optionElement);

  // append elements to DOM for large screens
  listElement.appendChild(questionListItem);
  questionListItem.appendChild(questionButton);
  questionButton.textContent = option;
}

/**
 * @description Replaces the quiz option content for small and large screens
 *
 * @param {Array<string>} option - String containing the quiz option
 * @param {Array<number>} index - Number containing the index of the option
 * @param {HTMLSelectElement} selectElement - HTMLSelectElement containing the quiz option select element (for small screens)
 * @param {HTMLButtonElement} optionButtons - HTMLButtonElement containing the quiz option buttons (for large screens)
 */

function replacePossibleAnswers(option, index, selectElement, optionButtons) {
  // replace answer options for small screens
  selectElement.children[index + 1].textContent = option;
  selectElement.children[index + 1].setAttribute("value", option);
  selectElement.children[index + 1].removeAttribute("disabled");
  selectElement.selectedIndex = 0;

  // replace answer options for large screens
  optionButtons[index].textContent = option;
  optionButtons[index].removeAttribute("disabled");
}

// Create a new quiz when user selects a topic on small screens
quizTopicSelectEl.addEventListener("change", (e) => {
  let selectedOption = e.target.value;
  selectedOption === "random topic"
    ? createQuiz(null)
    : createQuiz(selectedOption);

  setDomQuizElements();
});

// Place after setDomQuizElements() is called
const quizTopicButtons = document.querySelectorAll(
  "#quiz-topics-lg-screen button"
);

/**
 * @description - Sets the quiz topic when user clicks on a topic button
 *
 * 1. Remove aria-pressed attribute from all buttons
 * 2. Set aria-pressed attribute to true on button that was clicked
 * 4. Create quiz with user selected topic
 * 5. Load quiz elements to DOM
 */

quizTopicButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    removeAriaSelected();

    e.currentTarget.setAttribute("aria-pressed", "true");
    let userSelectedTopic = e.currentTarget.getAttribute("data");

    createQuiz(userSelectedTopic);
    setDomQuizElements();
  });
});

/**
 * @description - Validates the user selected answer
 * Removes player lives if answer is incorrect or ends game if player lives is 0
 * @param {HTMLOptionElement || HTMLButtonElement} target - The target element
 */
async function validateAnswer(target) {
  if (playerLives <= 1 && target.textContent !== correctAnswer) {
    target.disabled = true;
    quizUlEl.classList.add("pointer-events-none");
    await removePlayerLives();
    updatePlayerScore(incorrectAnswerEl, false);
    gameOver(loadingStateTime, false);
  } else {
    if (target.textContent === correctAnswer) {
      updatePlayerScore(correctAnswerEl, true);
      setGameOverMessage(true);
      gameOver(loadingStateTime, true);
    } else {
      updatePlayerScore(incorrectAnswerEl, false),
        (target.disabled = true),
        removePlayerLives();
    }
  }
}

/**
 * @description - Updates the player score in the DOM
 * @param {HTMLSpanElement} target - The target element
 * @param {Boolean} isCorrectAnswer - A boolean value to check if the answer is correct or incorrect
 */
function updatePlayerScore(target, isCorrectAnswer) {
  target.classList.add("opacity-0");
  let score = parseInt(target.textContent) + 1;
  let scoreToSting = score.toString();

  setTimeout(() => {
    target.classList.remove("opacity-0");
    target.textContent = scoreToSting;
  }, 400);

  updateScoresInStorage(isCorrectAnswer, settings);
}

/**
 * @description - Animates the heart icon back to the DOM
 */

async function resetPlayerLives() {
  playerLives = getPlayerStorageLives();
  for (let i = 0; i < playerLives; i++) {
    await animateHeartIconToDOM(playerLivesEl.children[i]);
    if (playerLivesEl.children[i].hasAttribute("data-animate-in")) {
      playerLivesEl.children[i].setAttribute("data-animate-in", "false");
    }
  }
}

/**
 * @description remove player life (heart icon) when answer is incorrect.
 * If player lives are 0, set game over a message and reset player lives & game
 */
async function removePlayerLives() {
  playerLives--;
  updatePlayerLivesSrText();

  await animateLivesLost(
    playerLivesEl.children[playerLives],
    playerLivesContainerEl
  );
}

/**
 * @description loads next question after a set time, creates new quiz & sets DOM elements
 * @param {Number|null} loadingTime - The time to wait before loading next question
 * @param {Boolean} isAnswerCorrect - The time to wait before loading next question
 */

async function gameOver(loadingTime, isAnswerCorrect) {
  dataLoadingEl.setAttribute("data-loading", "true");
  gameOverContainerEl.setAttribute("data-animate-in", "true");
  setGameOverMessage(isAnswerCorrect);
  await resetPlayerLives();

  await new Promise((resolve) => {
    return setTimeout(() => {
      gameOverContainerEl.setAttribute("data-animate-in", "false");
      dataLoadingEl.setAttribute("data-loading", "false");
      resolve();
    }, loadingTime ?? loadingStateTime);
  });
  createQuiz(null);
  setDomQuizElements();
  quizUlEl.classList.remove("pointer-events-none");
  incorrectTextEl.textContent = "";

  updatePlayerLivesSrText();
}

/**
 * @description set game over a message by adding or removing data-game-win attribute
 * to game over container using css classes
 * @param {Boolean} isAnswerCorrect
 */

function setGameOverMessage(isAnswerCorrect) {
  if (isAnswerCorrect) {
    gameOverContainerEl.setAttribute("data-game-win", "true");
  } else {
    gameOverContainerEl.setAttribute("data-game-win", "false");
    incorrectTextEl.textContent += `${correctAnswer}`;
  }
}

/**
 * @description - Updates the screen reader text for player lives
 */

function updatePlayerLivesSrText() {
  let pluralOrSingular = playerLives === 1 ? "life" : "lives";
  playerLivesSrOnlyEl.textContent = `${playerLives} ${pluralOrSingular} remaining`;
}

// remove aria-pressed attribute from all buttons
function removeAriaSelected() {
  quizTopicButtons.forEach((button) => {
    button.setAttribute("aria-pressed", "false");
  });
}

/**
 * Set game scores in DOM
 * @param {HTMLSpanElement} correctAnswerEl
 * @param {HTMLSpanElement} incorrectAnswerEl
 */
function setGameScores(correctAnswerEl, incorrectAnswerEl) {
  const settings = JSON.parse(localStorage.getItem("settings"));

  correctAnswerEl.textContent += settings.totalCorrectAnswers;
  incorrectAnswerEl.textContent += settings.totalIncorrectAnswers;
}

// Initiate Quiz & Set DOM Elements with Quiz Data
createQuiz(null);
setDomQuizElements();
updatePlayerLivesSrText();
setSelectElementOptionDifficulty(getPlayerStorageDifficulty());
createAnimationGridElement();
setGameScores(correctAnswerEl, incorrectAnswerEl);
updateChangePlayerSettings(gameOver);

// Player Lives icons
// add heart icons to represent max player lives for new game
while (playerLivesEl.childElementCount < maxLives) {
  playerLivesEl.appendChild(playersLiveIcon.cloneNode(true));
}
hidePlayerLivesInDom();

// Event Listeners
//  check answer for a user-selected option quiz option (mobile devices)
quizOptionSelectEl.addEventListener("change", (e) =>
  validateAnswer(quizOptionSelectEl.options[quizOptionSelectEl.selectedIndex])
);

// check answer for a user-selected button quiz option (desktop devices)
for (let i = 0; i < quizChoiceButtons.length; i++) {
  quizChoiceButtons[i].addEventListener("click", () =>
    validateAnswer(quizChoiceButtons[i])
  );
}

// if a quizOptionSelectEl is disabled, disable the corresponding button
quizOptionSelectEl.addEventListener("change", (e) => {
  if (e.currentTarget.selectedIndex) {
    console.log(e.currentTarget.selectedIndex);
    quizChoiceButtons[e.currentTarget.selectedIndex - 1].disabled = true;
  }
});

// if a quizChoiceButton is disabled, disable the corresponding select option
for (let i = 0; i < quizChoiceButtons.length; i++) {
  quizChoiceButtons[i].addEventListener("click", () => {
    quizOptionSelectEl.options[i + 1].disabled = true;
  });
}