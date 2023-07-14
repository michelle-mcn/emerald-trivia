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

export { createQuiz, currentTopicData, quizTopics, quizDescriptions, randomQuestionOptions, correctAnswer, shuffleArray };