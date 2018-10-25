/* Functions utilized on all pages of the site. */

const BODY = document.querySelector("body");
const SELECTORS = document.getElementsByClassName("theme-selector");
const VALID_THEMES = ["light", "dark", "blue"];
const DEFAULT_THEME = "dark";

var currentTheme = DEFAULT_THEME;
var selectedTheme = localStorage.getItem("theme");

/**
 * Update the page theme by adding the appropriate class to the body element.
 *
 * @param {string} theme - A lowercase string bearing the name of the new
 * theme ("light", "dark", etc.). The current theme (stored in
 * {@link currentTheme) in a global or higher scope) is removed.
 */
function setTheme(theme) {
  if (theme != currentTheme) {
    BODY.classList.remove(currentTheme);
    BODY.classList.add(theme);
    currentTheme = theme;
  }
}

/**
 * Update the theme selector buttons ("Dark", "Light", "Blue") by highlighting
 * the selector button corresponding to the newly selected theme and
 * un-highlighting the button corresponding to the previously selected theme.
 *
 * @param {string} theme - A lowercase string bearing the name of the new
 * theme ("light", "dark", "blue", etc.).
 */
function setSelector(theme) {
  let currentSelector = document.getElementsByClassName("selected")[0];
  let newSelector = document.getElementById(theme);
  currentSelector.classList.remove("selected");
  newSelector.classList.add("selected");
}

/**
 * @summary Select a new theme when a theme selector button is clicked.
 *
 * While {@link setTheme()} actually updates the body element with a new class
 * to change the theme, this function is called when one of the theme selector
 * buttons ("Light", "Dark", etc.) is clicked. The buttons have id attributes
 * ("light", "dark", etc.) that correspond to the theme names. This function
 * updates the global {@link selectedTheme} variable and updates browser local
 * storage for persistence.
 *
 * @param {object} event - The click event from a listener.
 */
function selectTheme(event) {
  let newTheme = this.id;
  setSelector(newTheme);

  selectedTheme = newTheme;
  localStorage.setItem("theme", selectedTheme);
}

/**
 * @summary Preview a theme when the mouse enters a selector button.
 */
function selectorMouseEnter(event) {
  setTheme(this.id);
}

/**
 * @summary Restore the selected theme when the mouse leaves a selector button.
 */
function selectorMouseLeave(event) {
  setTheme(selectedTheme);
}

function init() {
  // Add selector button event listeners.
  for (let selector of SELECTORS) {
    selector.addEventListener("click", selectTheme);
    selector.addEventListener("mouseenter", selectorMouseEnter);
    selector.addEventListener("mouseleave", selectorMouseLeave);
  }

  // Set default theme if none in local storage or invalid theme selected.
  if (!selectedTheme || !VALID_THEMES.includes(selectedTheme)) {
    selectedTheme = DEFAULT_THEME;
    localStorage.setItem("theme", selectedTheme);
  }

  setTheme(selectedTheme);
  setSelector(selectedTheme);
}

init();
