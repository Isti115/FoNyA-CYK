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
  prettyPrintRules(GrammaticRule.listFromString(mainContainer.rulesValue));
}

function parseRules(input) {
  return GrammaticRule.listFromString(input);
}

function prettyPrintRules(rules) {
  let rulesP = document.createElement("p");
  rulesP.classList.add("rule-set");
  
  for (let i = 0; i < rules.length; i++) {
    rulesP.appendChild(rules[i].toHTML());
  }
  
  document.body.appendChild(rulesP);
}
