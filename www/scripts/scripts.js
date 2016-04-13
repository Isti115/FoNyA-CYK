/* global GrammaticSymbol GrammaticRule NormalForm CYK PrettyPrinter */

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
  // console.log(currentGrammar);
  // prettyPrintRules(NormalForm.reduce(currentGrammar));
  prettyPrintRules(NormalForm.normalForm(currentGrammar));
  
  let word = "aabbcc";
  
  let pyramid = [];
  CYK.checkDeductibility(GrammaticRule.listFromString(`
    S -> AS|SB|a
    A -> BC|a
    B -> AB|CC|b
    C -> AB|c
  `), new GrammaticSymbol("S"), word, pyramid);
  
  // for (let i = 0; i < pyramid.length; i++) {
  //   console.log(pyramid[pyramid.length - 1 - i].map((c) => c.toString()));
  // }
  // console.log(pyramid);
  
  let pyramidDiv = PrettyPrinter.pyramidToHtml(pyramid, word);
  document.body.appendChild(pyramidDiv);
}

function parseRules(input) {
  return GrammaticRule.listFromString(input);
}

function prettyPrintRules(rules) {
  let rulesP = PrettyPrinter.ruleSetToDenseHTML(rules);
  
  document.body.appendChild(rulesP);
}
