/* global Rule */

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
  let ruleSet = [];
  
  let splittedInput = input.split("\n");
  let emptyPattern = /^\s*$/;
  let rulePattern = /^\s*(.*?)\s*->\s*(.*?)\s*$/;
  let rightSidePattern = /\|?(.+?)(?=\||$)/g;
  
  for (let rule of splittedInput) {
    if (!emptyPattern.test(rule)) {
      let [, leftSide, rightSide] = rulePattern.exec(rule);
      
      let match;
      while ((match = rightSidePattern.exec(rightSide)) !== null) {
        ruleSet.push(new Rule(leftSide, match[1]));
      }
    }
  }
  
  return ruleSet;
}
