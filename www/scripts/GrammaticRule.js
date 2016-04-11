/* exported GrammaticRule */
/* global GrammaticWord */

class GrammaticRule {
  constructor(leftSide, rightSide) {
    this.leftSide = leftSide;
    this.rightSide = rightSide;
  }
  
  static fromStrings(leftSide, rightSide) {
    return new GrammaticRule(
      GrammaticWord.fromString(leftSide),
      GrammaticWord.fromString(rightSide)
    );
  }
  
  static listFromString(input) {
    let ruleSet = [];
    
    let splittedInput = input.split("\n");
    let emptyPattern = /^\s*$/;
    let rulePattern = /^\s*(.*?)\s*->\s*(.*?)\s*$/;
    let rightSidePattern = /\|?([^|]+?)(?=\||$)/g;
    
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
}
