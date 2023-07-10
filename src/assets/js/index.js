import data from "~~/data/quiz-data.json";

// quiz topics
const quizTopics = Object.keys(data);

// quiz topic descriptions
let quizDescriptions = Object.values(data).map((topic) => topic.description);

let initialDifficultyLevel = "easy";

const difficultyLevel = {
  easy: 5,
  medium: 3,
  hard: 1,
};

const settings = {
  difficulty: initialDifficultyLevel,
  totalCorrectAnswers: 0,
  totalIncorrectAnswers: 0,
  maxLives: difficultyLevel[initialDifficultyLevel],
  incorrectAnswers: [],
};

let playerLives = settings.maxLives;

let question = null;
let correctAnswer = null;
let randomTopicQuestion = null;
let randomQuestionOptions = null;

let currentTopicData = {
  topic: null,
  question: null,
};

/**
 * @description - creates a quiz (random or user-selected topic)
 * Sets the current topic data (quiz topic, question, possible answers, correct answer)
 *
 * @param {string|null} userSelectedTopic - user selected topic
 */
function createQuiz(userSelectedTopic) {
  // randomly select a topic if user did not select a topic
  let selectedTopic =
    userSelectedTopic ??
    quizTopics[Math.floor(Math.random() * quizTopics.length)];
  let topicData = data[selectedTopic];
  currentTopicData["topic"] = selectedTopic;

  randomTopicQuestion = shuffleArray(topicData["questions"])[0];
  // get random question options
  randomQuestionOptions = shuffleArray(randomTopicQuestion["options"]);
  // get question text
  question = randomTopicQuestion["question"];
  // get the correct answer
  correctAnswer = randomTopicQuestion["answer"];
  // set current topic data id and question id
  currentTopicData.question = question;
  console.log(correctAnswer);
}

function shuffleArray(array) {
  // Fisher-Yates shuffle algorithm for randomizing array elements
  for (let i = array.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

// DOM Elements
const quizHeadingEl = document.querySelector("#quiz-heading");
const quizQuestionEl = document.querySelector("#quiz-question");

const quizTopicSelectEl = document.querySelector("#quiz-topic-select");
const quizUlEl = document.querySelector("#quiz-options-list");
const selectedTopicIcon = createImageElement()

// DOM Elements
let quizChoiceButtons;
const quizTopicSelect = document.querySelector("#quiz-topic-select");
const quizOptionSelectEl = document.querySelector("#quiz-options-select");
const quizTopicsContainerEl = document.querySelector("#quiz-topics-lg-screen");
const dataLoadingEl = document.querySelector("[data-loading='false']");

const gameOverContainerEl = document.querySelector("#game-over-container");
const incorrectTextEl = document.querySelector("#correct-answer-addon");
// correct answer element data attribute data = correct-answer
let correctAnswerEl = document.querySelector("[data-answer='correct']");
correctAnswerEl.textContent = 0;
// incorrect answer element data attribute data = incorrect-answer
let incorrectAnswerEl = document.querySelector("[data-answer='incorrect']");
incorrectAnswerEl.textContent = 0;
const playerLivesEl = document.querySelector("#player-lives");
const playerLivesSrOnlyEl = document.querySelector("#player-lives-sr-only");
const playerLivesContainerEl = document.querySelector(
  "#player-lives-container"
);
// player live icon
const playersLiveIcon = createImageElement()
playersLiveIcon.setAttribute("src", "/assets/images/icons/heart.svg");
playersLiveIcon.setAttribute("alt", "heart icon");

// check localStorage for settings and set default values if not found
if (!localStorage.getItem("settings")) {
  localStorage.setItem("settings", JSON.stringify(settings));
} else {
  let settings = JSON.parse(localStorage.getItem("settings"));

  settings.maxLives = difficultyLevel[settings.difficulty];
  localStorage.setItem("settings", JSON.stringify(settings));
}

/**
 *  Create topic cards for each quiz topic
 * @param {String} topic - Quiz topic name
 * @param {Number} index - Obtained when passing createTopic function to forEach method
 * @param {String} quizDescription - Quiz topic  description
 */
function createTopicCardElements(topic, index, quizDescription) {
  // Create Topic Card Elements
  const topicCardButton = document.createElement("button");
  const topicCardHeading = document.createElement("span");
  const topicCardText = document.createElement("span");
  const topicImgEl = document.createElement("img");

  // Add Content
  topicCardHeading.textContent = topic.replace(/_/g, " ");
  topicCardText.textContent = quizDescription[index];

  // Set Attributes
  topicCardButton.setAttribute("data", topic);
  topicCardButton.setAttribute("aria-label", `Select ${topic} `);
  topicImgEl.setAttribute(
    "src",
    `../assets/images/icons/${topic.replace(/_/g, "-")}.svg`
  );
  topicImgEl.setAttribute("alt", `${topic} icon`);
  topicImgEl.setAttribute("width", "24");
  topicImgEl.setAttribute("height", "24");
  topicImgEl.setAttribute("role", "presentation");

  // Append Elements to DOM
  topicCardButton.appendChild(topicCardHeading);
  topicCardButton.appendChild(topicCardText);
  topicCardButton.appendChild(topicImgEl);
  quizTopicsContainerEl.appendChild(topicCardButton);
}


function createTopicSelectElements(topic) {
  // Create Topic Select Elements
  const topicOption = document.createElement("option");

  // Add Content to Elements
  topicOption.textContent = topic
  topicOption.textContent = formatString(topic);

  // Set Attributes
  topicOption.setAttribute("value", topic);
  topicOption.setAttribute("aria-label", `Select ${topic} `);

  // Append Elements to DOM
  quizTopicSelect.appendChild(topicOption);
}

// Replace underscores with spaces & capitalise First Letter
function formatString(str) {
  return str.replace(/(^|_)\w/g, (letter) => letter.toUpperCase().replace('_', " "));
}


const quizTopicsSorted = quizTopics.sort();
// Create Topic Elements for Small & Large Screens
quizTopicsSorted.forEach((topic, index) => {
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
  const quizChoiceButtons = quizUlEl.querySelectorAll("button");
  
  if (!quizUlEl.childElementCount  && quizOptionSelectEl.childElementCount <= 1 ) {
    questionOptions.forEach((option) =>
    appendAnswerPossibilities(option, quizUlEl, quizOptionSelectEl)
    );
  } else {
    questionOptions.forEach((option, index) =>
      replacePossibleAnswers(option, index, quizOptionSelectEl, quizChoiceButtons)
    );
  }
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
  dataLoadingEl.setAttribute("data-loading", "true");

  selectedOption === "random topic"
    ? createQuiz(null)
    : createQuiz(selectedOption);

  setDomQuizElements();

  setTimeout(() => {
    dataLoadingEl.setAttribute("data-loading", "false");
  }, loadingStateTime);
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
 * 3. Set data-loading attribute to true on data-loading element
 * 4. Create quiz with user selected topic
 * 5. Load quiz elements to DOM
 * 6. Set data-loading attribute to false on data-loading element
 */

quizTopicButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    removeAriaSelected();

    e.currentTarget.setAttribute("aria-pressed", "true");
    let userSelectedTopic = e.currentTarget.getAttribute("data");

    // dataLoadingEl.setAttribute("data-loading", "true");
    createQuiz(userSelectedTopic);
    setDomQuizElements();

    setTimeout(() => {
      dataLoadingEl.setAttribute("data-loading", "false");
    }, loadingStateTime);
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
}
/**
 * @description - Animates the heart icon back to the DOM
 */

async function resetPlayerLives() {
  let playerLivesEl = document.querySelector("#player-lives");
  let playerLives = settings.maxLives;

  for (let i = 0; i < playerLives; i++) {
    await animateHeartIconToDOM(playerLivesEl.children[i]);
    if (playerLivesEl.children[i].hasAttribute("data-animate-in")) {
      playerLivesEl.children[i].setAttribute("data-animate-in", "false");
    }
  }
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

// add heart icons to represent player lives for new game
while (playerLivesEl.childElementCount < playerLives) {
  playerLivesEl.appendChild(playersLiveIcon.cloneNode(true));
}
// remove player lives from DOM if player lives is less than maxLives
// each player life is represented by a heart icon
// if player lives is less than maxLives, hide the last heart icon
function hidePlayerLivesInDom() {
  let playerLivesIconElements = playerLivesEl.childElementCount - 1;
  let iteration = maxLives - getPlayerStorageLives();
  while (iteration > 0) {
    playerLivesEl.children[playerLivesIconElements].classList.add("hidden");
    playerLivesIconElements--;
    iteration--;
  }
}

hidePlayerLivesInDom();

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
  //
  playerLives = settings.maxLives;
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

/**
 * @description - Updates the default option difficulty level based on player settings
 */
function setSelectElementOptionDifficulty() {
  let playerDifficulty = getPlayerStorageDifficulty();
  let selectOptions = document.querySelectorAll("#difficulty_level option");

  for (let i = 0; i < selectOptions.length; i++) {
    if (selectOptions[i].value === playerDifficulty) {
      selectOptions[i].selected = true;
    }
  }

}

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

// remove aria-pressed attribute from all buttons
function removeAriaSelected() {
  quizTopicButtons.forEach((button) => {
    button.setAttribute("aria-pressed", "false");
  });
}


/**
 * @description Creates a heart image element with attributes
 * @returns {HTMLImageElement}
 */

function createImageElement() {
  let imgEl = document.createElement("img");
  imgEl.setAttribute("height", "30px");
  imgEl.setAttribute("width", "30px");
  imgEl.setAttribute("role", "presentation");
  return imgEl;
}

// Initiate Quiz & Set DOM Elements with Quiz Data
createQuiz(null);
setDomQuizElements();
updatePlayerLivesSrText();

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

const animationGridEl = document.querySelector("#animation-grid");
const div = document.createElement("div");
const span = document.createElement("span");

/**
 * @description Creates a 3x3 grid of divs and spans to be used as a loading animation
 */
function createGridNodeElement() {

  // creates 3x3 grid of divs and spans
  for (let i = 0; i < 3; i++) {
    let newDiv = div.cloneNode();

    for (let j = 0; j < 3; j++) {
      let newSpan = span.cloneNode();
      newDiv.appendChild(newSpan);
    }
    animationGridEl.appendChild(newDiv);
  }

  //  add animation delay to each span by 0.1s
  let spans = document.querySelectorAll("#animation-grid span");
  spans.forEach((span, index) => {
    span.style.animationDelay = `${index * 0.1}s`;
  });
  //
}
createGridNodeElement();

// copyright text (footer)
const copyrightEl = document.querySelector("#copyright");
const currentYear = new Date().getFullYear();
const copyRightText = `&copy; ${currentYear} `;
copyrightEl.innerHTML = copyRightText + copyrightEl.innerHTML;


/**
 * @description Reset total correct answers and total
 * incorrect answers in localStorage
 */
function resetScoresInStorage() {
  settings.totalCorrectAnswers = 0;
  settings.totalIncorrectAnswers = 0;
  localStorage.setItem("settings", JSON.stringify(settings));
}

/**
 * @description Update total correct or incorrect answers in localStorage
 * @param {Boolean} isCorrectAnswer
 */
function updateScoresInStorage(isCorrectAnswer) {
  isCorrectAnswer
    ? (settings.totalCorrectAnswers += 1)
    : (settings.totalIncorrectAnswers += 1);
  localStorage.setItem("settings", JSON.stringify(settings));
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

/**
 * Set difficulty level in localStorage
 * @param {'easy'|'medium'|'hard'} level - updated difficulty level from user
 */
function updateLevelInStorage(level) {
  settings.difficulty = level;
  settings.maxLives = difficultyLevel[level];
  localStorage.setItem("settings", JSON.stringify(settings));
}

const playerPrefDialog = document.querySelector("dialog");
const playerPrefForm = playerPrefDialog.querySelector("form");

// Player Preferences form
playerPrefForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  // disable submit button
  playerPrefForm.querySelector('button[type="submit"]').disabled = true;
  const formData = new FormData(playerPrefForm);
  const settings = {};
  for (let [name, value] of formData.entries()) {
    settings[name] = value;
  }
  const playerLivesEl = document.querySelector("#player-lives");
  const playerLivesElChildren = Array.from(playerLivesEl.children);

  // Update player settings (lives, reset score) in storage
  updatePlayerSettings(settings);

  // reset scores and reset score checkbox
  if (settings.reset_score) {
    incorrectAnswerEl.textContent = "0";
    correctAnswerEl.textContent = "0";
    playerPrefForm.querySelector("#reset_score").checked = false;
  }

  let storageSettingsLives = getPlayerStorageLives();
  updateToast(settings);

  // if player lives is less than current lives
  // add a hidden class to the last player live icon
  if (storageSettingsLives < playerLives) {
    hidePlayerLivesInDom();
  } else {
    // if player lives is greater than current lives
    // remove hidden class from icons
    playerLivesElChildren
      .slice(playerLives, storageSettingsLives)
      .forEach((child) => child.classList.remove("hidden"));
  }

  // reset game to prevent cheating when player lives change
  await gameOver(250, false);

  // set the player lives to the new lives from storage
  playerLives = storageSettingsLives;
  updatePlayerLivesSrText();

  // close dialog
  playerPrefDialog.close();
  // enable submit button
  playerPrefForm.querySelector('button[type="submit"]').disabled = false;
});
