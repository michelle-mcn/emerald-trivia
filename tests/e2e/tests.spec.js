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

// click on quiz topic each button and check if quiz heading has text
test('quiz heading has correct selected topic', async ({ page }) => {
  await page.goto(localhost);
  for (let i = 0; i < quizTopicsFormatted.length; i++) {
    await page.click(`#quiz-topics-lg-screen  button:nth-child(${(i + 1) + 1})`);
    await expect(page.locator('#quiz-heading')).toHaveText(quizTopicsFormatted[i]);
  }
});

test('quiz question & quiz choices changes when clicking next random question button', async ({ page }) => {
  await page.goto(localhost);
  const quizQuestion = await page.locator('#quiz-question').innerText();
  const quizChoices = await page.$$eval('#quiz-options-list button', (buttons) => buttons.map((button) => button.innerHTML));
  await page.click('button:has-text("random topic")');

  const quizQuestion2 = await page.locator('#quiz-question').innerText();
  const quizChoices2 = await page.$$eval('#quiz-options-list button', (buttons) => buttons.map((button) => button.innerHTML));

  expect(quizQuestion).not.toEqual(quizQuestion2);
  expect(quizChoices).not.toEqual(quizChoices2);

});

test("local storage has settings", async ({ page }) => {
  await page.goto(localhost);

  const localStorageSettings = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("settings"))
  );

  expect(localStorageSettings).toEqual({
    difficulty: "easy",
    totalCorrectAnswers: 0,
    totalIncorrectAnswers: 0,
    maxLives: 5,
  });
});

