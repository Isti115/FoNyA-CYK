/* exported GrammaticRule */
/* global GrammaticSymbol */

class GrammaticRule {
  constructor(leftSide, rightSide) {
    this.leftSide = leftSide;
    this.rightSide = rightSide;
  }
  
  static fromStrings(leftSide, rightSide) {
    return new GrammaticRule(
      GrammaticSymbol.listFromString(leftSide),
      GrammaticSymbol.listFromString(rightSide)
    );
  }
  
  static listFromString(input) {
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
          ruleSet.push(GrammaticRule.fromStrings(leftSide, match[1]));
        }
      }
    }
    
    return ruleSet;
  }
  
  toHTML() {
    let ruleSpan = document.createElement("span");
    ruleSpan.classList.add("grammatic-rule");
    
    for (let i = 0; i < this.leftSide.length; i++) {
      ruleSpan.appendChild(this.leftSide[i].toHTML());
    }
    
    let arrowText = document.createTextNode(" -> ");
    ruleSpan.appendChild(arrowText);
    
    for (let i = 0; i < this.rightSide.length; i++) {
      ruleSpan.appendChild(this.rightSide[i].toHTML());
    }
    
    return ruleSpan;
  }
}
