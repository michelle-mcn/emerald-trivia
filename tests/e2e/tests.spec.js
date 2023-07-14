// @ts-check
const { test, expect } = require("@playwright/test");
const quizData = require("../../data/quiz-data.json");


// quiz topics
const quizTopics = Object.keys(quizData);
//  remove underscores and capitalize first letter of each word
let quizTopicsFormatted = quizTopics.map((topic) => topic.replace(/_/g, " "));
// sort alphabetically
quizTopicsFormatted.sort();
// quiz topic descriptions
let quizDescriptions = Object.values(quizData).map(
  (topic) => topic.description
);

const localhost = "http://localhost:3000";
