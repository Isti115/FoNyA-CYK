/* global GrammaticRule */

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
  prettyPrintRules(currentGrammar);
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
