/* exported CYK */
/* global GrammaticSymbol GrammaticWord */

class CYK {
  static getCombinations(a, b) {
    let combinations = [];
    
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b.length; j++) {
        combinations.push(new GrammaticWord([a[i], b[j]]));
      }
    }
    
    return combinations;
  }
  
  static getPossibleLeftSides(grammar, combinations) {
    let result = [];
    
    for (let currentCombination of combinations) {
      for (let currentRule of grammar) {
        if (
          currentRule.rightSide.equals(currentCombination) &&
          new GrammaticWord(result).indexOf(currentRule.leftSide.symbols[0]) === -1
        ) {
          result.push(currentRule.leftSide.symbols[0]);
        }
      }
    }
    
    return result;
  }
  
  static checkDeductibility(grammar, word) {
    let pyramid = [];
    let level = 0;
    
    pyramid[level] = [];
    
    for (let i = 0; i < word.length; i++) {
      pyramid[level].push(grammar.filter(
        (r) => r.rightSide.symbols.length === 1 &&
        r.rightSide.symbols[0].equals(new GrammaticSymbol(word[i]))
      ).map((r) => r.leftSide.symbols[0]));
    }
        
    while (level < word.length - 1) {
      pyramid[level + 1] = [];
      
      for (let i = 0; i < word.length - level - 1; i++) {
        let combinations = [];
        for (let j = 0; j <= level; j++) {
          combinations.push(...CYK.getCombinations(pyramid[j][i], pyramid[level - j][i + j + 1]));
        }
        
        pyramid[level + 1][i] = CYK.getPossibleLeftSides(grammar, combinations);
      }
      
      level++;
    }
    
    for (let i = 0; i < pyramid.length; i++) {
      console.log(pyramid[pyramid.length - 1 - i].map((c) => c.toString()));
    }
    console.log(pyramid);
    
    return false;
  }
}
