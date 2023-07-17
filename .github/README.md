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

## Testing

### End to end testing

I used [Playwright](https://playwright.dev/) to perform end to end testing. Playwright is end to end testing platform that can automate testing for Chromium, Firefox and WebKit with a single API. You can find the test in the [tests/e2e](/tests/e2e/) folder. (tests.spec.js) All tests are run in headless mode & tested for safari, chrome & firefox.

<details>
<summary>Playwright test results</summary>

![playwright test results](/documentation/testing/playwright-testing.png)

</details>

| Test Case ID | Test Case Description                             | Test Steps                                                                                  |
| ------------ | ------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| 1            | Meta title is correct                             | 1. Navigate to home page                                                                    |
| 2            | Quiz topic button have available quiz topics      | 1. Loop through all buttons and check if they have a quiz topic                             |
| 3            | Quiz topic buttons have correct quiz descriptions | 1. Loop through all buttons and check if they have the correct description                  |
| 4            | Local storage has game settings                   | 1. Navigate to home page 2. Check if local storage has game settings                        |
| 5            | Social media links open in new tab                | 1. Navigate to home page 2. Click on social media links and check if they open in a new tab |

### Unit testing

I used [Vitest](https://vitest.dev) to perform unit testing. Vitest is a test runner for vite. You can find the test in the [tests/unit](/tests/unit/) folder. (quiz.test.js)

| Test Case ID | Test Case Description                               | Test Steps                                                            |
| ------------ | --------------------------------------------------- | --------------------------------------------------------------------- |
| 1            | Quiz creates a new instance with correct parameters | 1. Create a new quiz instance with argument                           |
| 2            | Quiz has correct properties (questions)             | 1. Create a new quiz instance 2. Check if quiz has correct properties |
| 3            | Quiz has correct properties (answers)               | 1. Create a new quiz instance 2. Check if quiz has correct properties |
| 4            | Shuffle array function shuffles array               | 1. Check if shuffle array function shuffles array                     |

### Manual testing

I recorded tests and uploaded the results to Cloudinary as GitHub would not accept the files. The screen recordings can be downloaded from the following links.

I used [Responsively](https://responsively.app/) to perform responsive testing. Responsively is a browser based tool that helps to test responsive websites.
I created a screen recording to test the responsiveness of the website on multiple devices.

- Iphone 12
- Ipad
- Macbook Pro

| Test                             | URL                                                                                                                                |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Test responsiveness              | [responsively test](https://res.cloudinary.com/dfazhtian/video/upload/v1689428035/test-responsiveness_twhm6p.mov)                  |
| Test resetting player scores     | [reset player scores](https://res.cloudinary.com/dfazhtian/video/upload/v1689428042/test-user-reset-scores.mov)                    |
| Test player scores update        | [player scores update](https://res.cloudinary.com/dfazhtian/video/upload/v1689428040/test-player-scores-update_x0s5xe.mov)         |
| Test user guess on desktop       | [user guess on desktop](https://res.cloudinary.com/dfazhtian/video/upload/v1689428035/test-desktop-user-guess_ufmyc6.mov)          |
| Test user guess on mobile        | [user guess on mobile](https://res.cloudinary.com/dfazhtian/video/upload/v1689428017/test-mobile-user-guess_q6994y.mov)            |
| Test changing quiz topic mobile  | [changing quiz topic mobile](https://res.cloudinary.com/dfazhtian/video/upload/v1689428019/test-mobile-select-topics_shqnmg.mov)   |
| Test changing quiz topic desktop | [changing quiz topic desktop](https://res.cloudinary.com/dfazhtian/video/upload/v1689427993/test-desktop-select-topics_qpf7x6.mov) |

### Validation testing

Note: CSS 59 of 61 validation errors are due to the use of Tailwind CSS framework. There is another issue with the CSS validation where it is not recognising the `:has()` pseudo class. The class is supported by most major browsers with 87%. See [can i use](https://caniuse.com/css-has) for more information.

| Type | file                   | Tool validator                                             | Result    | Preview                                                                 |
| ---- | ---------------------- | ---------------------------------------------------------- | --------- | ----------------------------------------------------------------------- |
| HTML | index.html (home page) | [w3c markup validation](https://validator.w3.org/)         | No errors | ![html validation](/documentation/testing/html/html-validation.png)     |
| CSS  | style.css (home page)  | [w3c css validation](https://jigsaw.w3.org/css-validator/) | 61 errors | ![css validation](/documentation/testing/css/w3c-css-validation.png)    |
| JS   | index.js               | [jshint](https://jshint.com/)                              | No errors | ![js validation](/documentation/testing/js/test-jshint-index.png)       |
| JS   | quiz.js                | [jshint](https://jshint.com/)                              | No errors | ![js validation](/documentation/testing/js/test-jshint-quiz.png)        |
| JS   | settings.js            | [jshint](https://jshint.com/)                              | No errors | ![js validation](/documentation/testing/js/test-jshint-settings.png)    |
| JS   | utils.js               | [jshint](https://jshint.com/)                              | No errors | ![js validation](/documentation/testing/js/test-jshint-utils.png)       |
| JS   | player-pref.js         | [jshint](https://jshint.com/)                              | No errors | ![js validation](/documentation/testing/js/test-jshint-player-pref.png) |
| JS   | animations.js          | [jshint](https://jshint.com/)                              | No errors | ![js validation](/documentation/testing/js/test-jshint-animations.png)  |
| JS   | storage.js             | [jshint](https://jshint.com/)                              | No errors | ![js validation](/documentation/testing/js/test-jshint-storage.png)     |
| JS   | ui-elements.js         | [jshint](https://jshint.com/)                              | No errors | ![js validation](/documentation/testing/js/test-jshint-ui-elements.png) |
| JS   | toast.js               | [jshint](https://jshint.com/)                              | No errors | ![js validation](/documentation/testing/js/test-jshint-toast.png)       |

### Bugs

When the user selects a new topic the there is a delay in the new topic image being displayed. I will add a loading animation between the topic changes to prevent this in future development.

## Deployment

The website is hosted on [Github Pages](https://michelle-mcn.github.io/emerald-trivia/). The deployment process is as follows:

Note: You will need to run `npm run build` to build the website before deploying. You can push the new build to github and github pages will automatically update the website. Use `git subtree push --prefix dist origin gh-pages` to push the build to the gh-pages branch.

1. Create a new repository on Github
2. Clone the repository to your local machine
3. Create a new branch called gh-pages
4. Run `npm run build` to build the website if you made any changes
5. Push the build to the gh-pages branch `git subtree push --prefix dist origin gh-pages`
6. Go to the settings of the repository and scroll down to the Github Pages section
7. Select the gh-pages branch as the source
8. The website should deploy automatically and you can find the link to the website in the Github Pages section.

Additionally there are other platforms that can be used to host the website. I have listed some of them below.

- [Netlify](https://www.netlify.com/)
- [Heroku](https://www.heroku.com/)
- [Vercel](https://vercel.com/)

## Technologies

### Code Validation

- [W3C Markup Validation](https://validator.w3.org/) - Validate HTML
- [W3C CSS Validation](https://jigsaw.w3.org/css-validator/) - Validate CSS
- [JSHint](https://jshint.com/) - Validate Javascript

### Frameworks

- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

### Hosting

- [Github Pages](https://pages.github.com/) - Website hosting

### Languages

- HTML - Markup language
- CSS - Styling language
- Javascript - Programming language

## Tools

### Development

- [Prettier](https://prettier.io/) - Code formatter
- [Responsively](https://responsively.app/) - Responsive testing
- [Vite](https://vitejs.dev/) - Build tool
- [Visual Studio Code](https://code.visualstudio.com/) - Code editor
- [Warp](https://warp.dev/) - Terminal

### Design

- [Figma](https://www.figma.com/) - Design tool

### Media

- [Cloudinary](https://cloudinary.com/) - Video hosting
- [webp](https://developers.google.com/speed/webp/) - Image compression

### Testing

- [Playwright](https://playwright.dev/) - End to end testing
- [Vitest](https://vitest.dev/) - Unit testing

### Version control

- [Git](https://git-scm.com/) - Version control
- [Github](https://github.com/) - Code repository
- [Git Kraken](https://www.gitkraken.com/) - Git GUI

## Credits

### Content

- The questions and answers for the quiz generated from [Open Ai](https://openai.com/)
- Hero image on homepage from [Unsplash - Mick Haupt](https://unsplash.com/photos/8l-AK3QYFLE)
- Icons from [Icon.js](https://icones.js.org/)
- Mockup for the website from [Techsini](https://techsini.com/multi-mockup/index.php)
- 404 error page from [Tailwind components](https://tailwindcomponents.com/component/illustration-404-pages)

## Acknowledgements

A big thank you to my brother Cian, he helped me with the design of the website and gave me feedback on the website. He also helped fix some of the bugs in the website.

Code Institute for the course material and the support from the tutors & the slack community.
