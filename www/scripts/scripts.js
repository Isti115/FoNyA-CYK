/* global GrammaticRule NormalForm PrettyPrinter */

window.addEventListener("load", init, false);

let mainContainer;

let currentGrammar;

function init() {
  mainContainer = document.getElementById("mainContainer");
  mainContainer.addEventListener("dom-change", ready, false);
}

function ready() {
  mainContainer.$.submitButton.addEventListener("click", validate, false);
  mainContainer.rulesValue = `S -> bCB|bBB|abD
A -> ADb|bD
C -> bBc|aCB
D -> DD|Cb|ε`;
}

function validate() {
  currentGrammar = parseRules(mainContainer.rulesValue);
  console.log(currentGrammar);
  prettyPrintRules(NormalForm.reduce(currentGrammar));
}

function parseRules(input) {
  return GrammaticRule.listFromString(input);
}

function prettyPrintRules(rules) {
  let rulesP = PrettyPrinter.ruleSetToDenseHTML(rules);
  
  document.body.appendChild(rulesP);
}
