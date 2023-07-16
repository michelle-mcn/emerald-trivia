/*jshint esversion: 11 */

const quizTopicSelect = document.querySelector("#quiz-topic-select");
const animationGridEl = document.querySelector("#animation-grid");
const quizTopicsContainerEl = document.querySelector("#quiz-topics-lg-screen");

/**
 * @description Creates a heart image element with attributes
 * @returns {HTMLImageElement}
 */

function createImageElement() {
  let imgEl = document.createElement("img");
  imgEl.setAttribute("height", "30px");
  imgEl.setAttribute("width", "30px");
  imgEl.setAttribute("aria-hidden", "true");
  return imgEl;
}

/**
 * @description Creates a 3x3 grid of divs and spans to be used as a loading animation
 */
function createAnimationGridElement() {
  const div = document.createElement("div");
  const span = document.createElement("span");
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
}

// load dynamic image
// can't use alias for dynamic imports inside this file
const loadDynamicImage = async (icon, img) => {
  let imgSrc = await import(`../../../assets/images/icons/${icon}.svg`);
  img.src = imgSrc.default;
  img.alt = icon + " category icon";
};

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
  const topicImgEl = createImageElement();

  // Add Content
  topicCardHeading.textContent = topic.replace(/_/g, " ");
  topicCardText.textContent = quizDescription[index];

  // Set Attributes
  topicCardButton.setAttribute("data", topic);
  topicCardButton.setAttribute("aria-label", `Select ${topic} `);

  // Load Dynamic Image
  let imgSrc = topic.replace(/_/g, "-");
  loadDynamicImage(imgSrc, topicImgEl);

  // // Append Elements to DOM
  topicCardButton.appendChild(topicCardHeading);
  topicCardButton.appendChild(topicCardText);
  topicCardButton.appendChild(topicImgEl);
  quizTopicsContainerEl.appendChild(topicCardButton);
}

function createTopicSelectElements(topic) {
  // Create Topic Select Elements
  const topicOption = document.createElement("option");

  // Add Content to Elements
  topicOption.textContent = topic;
  topicOption.textContent = formatString(topic);

  // Set Attributes
  topicOption.setAttribute("value", topic);
  topicOption.setAttribute("aria-label", `Select ${topic} `);

  // Append Elements to DOM
  quizTopicSelect.appendChild(topicOption);
}

// Replace underscores with spaces & capitalise First Letter
function formatString(str) {
  return str.replace(/(^|_)\w/g, (letter) =>
    letter.toUpperCase().replace("_", " ")
  );
}

export {
  createImageElement,
  createAnimationGridElement,
  createTopicCardElements,
  createTopicSelectElements,
};
