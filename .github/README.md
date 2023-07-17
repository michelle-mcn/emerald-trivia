# Emerald Trivia

![mockup](/documentation/website-mockup.png)

Introducing Emerald Ireland: an engaging web app game designed to captivate and challenge players of all ages! Immerse yourself in a world of knowledge and embark on a thrilling quest through four captivating categories: Culture, Food, General Knowledge, and Geography.

Test your cultural savvy as you dive into the fascinating depths of Irish heritage. Get your taste buds tingling with the Food category, where you'll encounter mouthwatering delicacies and learn about Ireland's culinary gems.
Unleash your inner quiz master with the General Knowledge category, where random facts and intriguing trivia await your discovery. From history to music, you'll encounter an array of mind-bending questions that will keep you on your toes. Ready for a geographical adventure? The Geography category will take you on a virtual tour of Ireland's breathtaking landscapes, cities, and landmarks.

But that's not all! Emerald Ireland offers customizable difficulty settings, allowing you to tailor the game to your desired level of challenge. Whether you're a casual player looking for fun or a trivia connoisseur seeking the ultimate brain teaser, Emerald Ireland has got you covered.
With stunning visuals, an intuitive interface, and a captivating game-play experience, Emerald Ireland is the definitive quiz game for those seeking knowledge and entertainment. Are you ready to test your wits and become a true champion of Emerald Ireland? Accept the challenge today and let the adventure unfold!

[View live site](https://michelle-mcn.github.io/emerald-trivia/)

## UX

Emerald Ireland's design offers a seamless and immersive user experience, with features that include:

- Intuitive and visually stunning interface designed specifically for mobile devices.
- Responsive layout that adapts seamlessly to different screen sizes, providing optimal viewing and interaction.
- Conveniently placed player preferences settings for effortless changes to game difficulty & resetting player scores.
- User feedback when making changes to preferences.
- Clear and legible question and answer display for comfortable reading and quick response.

### Design

I utilised Figma design tool to create a visually captivating and user-friendly experience across various devices. With a focus on usability, I created responsive layouts that seamlessly adapt to different screen sizes. By leveraging fluid grids and flexible components, I created a consistent and optimized user experience across desktops, tablets, and mobile devices.

#### Prototype mockups (high fidelity)

<details>
<summary>Mobile mockup</summary>

![figma mobile mockup](/documentation/design/iPhone%20SE%20-%201.png)

</details>

<details>
<summary>Ipad mockup</summary>

![figma mobile mockup](/documentation/design/iPad%20mini%208.3%20-%201.png)

</details>

<details>
<summary>Desktop mockup</summary>

![figma mobile mockup](/documentation/design/Desktop%20-%201.png)

</details>

#### Color scheme

| Usage                           | Tailwind class            | rgb color                                |
| ------------------------------- | ------------------------- | ---------------------------------------- |
| Headings & paragraphs           | text-slate-900            | rgb(15 23 42)                            |
| Body background                 | from-blue-900 to-blue-500 | rgb(30 58 138 / 0) hsl(217deg, 91%, 60%) |
| Cancel button (player settings) | bg-red-300                | rgb(252 165 165)                         |
| Save button (player settings)   | bg-blue-300               | rgb(147 197 253)                         |

#### Icons

Icons where obtained form the [icons.js](https://icones.js.org/) library

![figma icons](/documentation/design/Icons.png)

## User Stories

### Site users

| User Story                                                                                    | Status      |
| --------------------------------------------------------------------------------------------- | ----------- |
| As a player, I want to select a category to start playing.                                    | Completed   |
| As a player, I want to adjust the difficulty level for a challenge.                           | Completed   |
| As a player, I want the questions and answers to be displayed in a clear and readable format. | Completed   |
| As a player, I want the game controls to be intuitive and responsive for easy interaction.    | Completed   |
| As a player, I want to track my progress and achievements.                                    | Not Started |
| As a player, I want to view a quick tutorial on how to play.                                  | Not Started |

### Site admin

| User Story                                                                    | Status      |
| ----------------------------------------------------------------------------- | ----------- |
| As a site admin, I want to be able to easily update game content.             | Not Started |
| As a site admin, I want to have access to analytics of new & returning users. | Not Started |

## Features

| Feature                           | Description                                                                                                                                      | Preview                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| Choose quiz topic or random topic | Each topic contains 10 possible questions each with 8 possible answers. The question will be randomly chosen each time a player selects a topic. | ![feature 1](/documentation/features/feature-1-choose-topic.png)                  |
| Player lives                      | Player lives range from 1-5 based on player settings. When a player chooses and incorrect answer they will loose a life.                         | ![feature 2](/documentation/features/feature-2-player-lives.png)                  |
| Player choices                    | Player has 8 possible choices to choose from for each quiz topic question.                                                                       | ![feature 3](/documentation/features/feature-3-question-choices.png)              |
| Player score                      | Player score is calculated based on the number of correct/incorrect answers.                                                                     | ![feature 4](/documentation/features/feature-4-player-scores.png)                 |
| Player settings options           | Player settings allow the player to adjust the difficulty level of the game & reset their scores back to zero.                                   | ![feature 5](/documentation/features/feature-5-player-settings.png)               |
| Player settings are saved         | Player settings & scores are stored in local storage for when they return                                                                        | ![feature 6](/documentation/features/feature-6-player-settings-local-storage.png) |
| Custom 404 page not found         | Redirect a user back to home page if they navigate to a page that does not exist                                                                 | ![feature 7](/documentation/features/feature-7-custom-404-page.png)               |

## Future Features

Future features that I would like to implement in the future.

| Feature                        | Description                                                                              |
| ------------------------------ | ---------------------------------------------------------------------------------------- |
| Player progress & achievements | Player progress & achievements will be tracked and displayed on the player profile page. |
| Player profile page            | Player profile page will display player progress & achievements.                         |
| Player tutorial                | Player tutorial will be displayed when a player first visits the site.                   |
| Quiz timer                     | Quiz timer will be displayed when a player starts a quiz.                                |
| Player choices                 | Reduce / increase the number of player choices based on player settings.                 |
| Admin login                    | Admin login will allow the admin to update game content.                                 |
| Admin analytics                | Admin analytics will allow the admin to view analytics of new & returning users.         |

