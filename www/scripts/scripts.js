window.addEventListener("load", init, false);

var mainContainer;

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
  var ruleSet = [];
  
  var splittedInput = input.split("\n");
  var rulePattern = /^\s*(.*?)\s*->\s*(.*?)\s*$/;
  
  for (var rule of splittedInput) {
    if (!(/^\s*$/).test(rule)) {
      var [, from, to] = rulePattern.exec(rule);
      ruleSet.push({"from": from, "to": to});
    }
  }
  
  return ruleSet;
}
