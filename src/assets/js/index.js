import data from "~~/data/quiz-data.json";

// quiz topics
const quizTopics = Object.keys(data);

// quiz topic descriptions
let quizDescriptions = Object.values(data).map((topic) => topic.description);

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
const quizTopicSelect = document.querySelector("#quiz-topic-select");
const quizOptionSelectEl = document.querySelector("#quiz-options-select");
const optionButtons = document.querySelectorAll("#quiz-options-list button");
const quizTopicsContainerEl = document.querySelector("#quiz-topics-lg-screen");

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
      replacePossibleAnswers(option, index, quizOptionSelectEl, optionButtons)
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