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

test('has title', async ({ page }) => {
  await page.goto(localhost);
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Emerald Trivia - Test your Irish knowledge/);
});

// loop through quiz topics and check if button first child has text
// skip first button as it is the random quiz button
test('button have quiz topic', async ({ page }) => {
  await page.goto(localhost);

  for (let i = 0; i < quizTopicsFormatted.length; i++) {
    await expect(page.locator(`#quiz-topics-lg-screen  button:nth-child(${(i + 1) + 1}) span:first-of-type`)).toHaveText(quizTopicsFormatted[i]);
  }

});
// loop through quiz topics and check if button second child has text
// skip first button as it is the random quiz button
test('button have quiz topic description', async ({ page }) => {
  await page.goto(localhost);

  for (let i = 0; i < quizDescriptions.length; i++) {
    await expect(page.locator(`#quiz-topics-lg-screen  button:nth-child(${(i + 1) + 1}) span:nth-of-type(2)`)).toHaveText(quizDescriptions[i]);
  }

});

