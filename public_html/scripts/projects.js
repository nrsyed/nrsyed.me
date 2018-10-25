/**
 * A reference to each project card.
 * @constant
 * @type {object}
 */
const CARDS = document.getElementsByClassName("project-card");

/**
 * A reference to each corresponding modal window.
 * @constant
 * @type {object}
 */
const MODALS = {};

/**
 * Change card image src to gif on mouse enter.
 */
function cardMouseEnter(event) {
  let img = this.getElementsByTagName("img")[0];
  let hoverSrc = img.dataset["hover"];
  if (hoverSrc) {
    img.src = hoverSrc;
  }
}

/**
 * Change card image src to still image on mouse leave.
 */
function cardMouseLeave(event) {
  let img = this.getElementsByTagName("img")[0];
  let src = img.dataset["src"];
  if (src) {
    img.src = src;
  }
}

/**
 * Display modal corresponding to project card on click.
 */
function cardClick(event) {
  // Get reference to clicked modal window from MODALS object.
  MODALS[this.id].style.display = "block";
}

/**
 * Close the currently displayed modal if the modal background is clicked.
 */
function modalBackgroundClick(event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
}

/**
 * Close the currently displayed modal if the modal close button is clicked.
 */
function modalCloseButtonClick() {
  // The close button is triply nested within the modal window, so get
  // its great-grandparent and change its display style.
  this.parentElement.parentElement.parentElement.style.display = "none";
}

function init() {
  for (let card of CARDS) {
    card.addEventListener("mouseenter", cardMouseEnter);
    card.addEventListener("mouseleave", cardMouseLeave);
    card.addEventListener("click", cardClick);
  }

  for (let modal of document.getElementsByClassName("modal")) {
    // The id of each modal window is named "[id]-modal", where [id]
    // corresponds to the id of a project card.
    let id = modal.id.split("-")[0];
    MODALS[id] = modal;

    // Add close event listeners for each modal window.
    modal.addEventListener("click", modalBackgroundClick);

    let closeButton = modal.getElementsByClassName("close")[0];
    closeButton.addEventListener("click", modalCloseButtonClick);
  }
}

init();
