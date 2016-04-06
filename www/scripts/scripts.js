/* global GrammaticRule */

window.addEventListener("load", init, false);

let mainContainer;

function init() {
  mainContainer = document.getElementById("mainContainer");
  mainContainer.addEventListener("dom-change", ready, false);
}

function ready() {
  mainContainer.$.submitButton.addEventListener("click", validate, false);
}

function validate() {
  console.log(parseRules(mainContainer.rulesValue));
}

function parseRules(input) {
  return GrammaticRule.listFromString(input);
}
