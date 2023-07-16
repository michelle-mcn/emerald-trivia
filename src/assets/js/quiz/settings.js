/*jshint esversion: 11 */

let selectOptions = document.querySelectorAll("#difficulty_level option");
let initialDifficultyLevel = "easy";

const difficultyLevel = {
  easy: 5,
  medium: 3,
  hard: 1,
};

const maxLives = 5;

let settings = {
  difficulty: initialDifficultyLevel,
  totalCorrectAnswers: 0,
  totalIncorrectAnswers: 0,
  maxLives: difficultyLevel[initialDifficultyLevel],
};

/**
 * @description - Updates the default option difficulty level based on player settings
 */
function setSelectElementOptionDifficulty(difficultySetting) {
  for (let i = 0; i < selectOptions.length; i++) {
    if (selectOptions[i].value === difficultySetting) {
      selectOptions[i].selected = true;
    }
  }
}

export {
  settings,
  difficultyLevel,
  maxLives,
  setSelectElementOptionDifficulty,
};
