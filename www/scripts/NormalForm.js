/* exported NormalForm */
/* global GrammaticRule GrammaticWord */

class NormalForm {
  static getReachableSymbols(grammar) {
    let reachableSymbols = [];
    let newReachableSymbols = [grammar[0].leftSide.symbols[0]];
    
    while (newReachableSymbols.length > 0) {
      let currentRules = [];
      for (let currentSymbol of newReachableSymbols) {
        currentRules.push(...grammar.filter((r) => r.leftSide.symbols[0].equals(currentSymbol)));
      }
      
      reachableSymbols.push(...newReachableSymbols);
      newReachableSymbols = [];
      
      for (let currentRule of currentRules) {
        for (let currentSymbol of currentRule.rightSide.symbols) {
          if (
            !currentSymbol.isTerminal() &&
            new GrammaticWord(reachableSymbols).indexOf(currentSymbol) === -1 &&
            new GrammaticWord(newReachableSymbols).indexOf(currentSymbol) === -1
          ) {
            newReachableSymbols.push(currentSymbol);
          }
        }
      }
    }
    
    return reachableSymbols;
  }
  
  static getActiveSymbols(grammar) {
    let activeSymbols = [];
    let newActiveSymbols = grammar.filter((r) => r.rightSide.isTerminal()).map((r) => r.leftSide.symbols[0]);
    
    while (newActiveSymbols.length > 0) {
      activeSymbols.push(...newActiveSymbols);
      newActiveSymbols = [];
      
      for (let currentRule of grammar) {
        let nonTerminals = currentRule.rightSide.getNonTerminals();
        
        if (
          new GrammaticWord(nonTerminals).containsOnly(new GrammaticWord(activeSymbols)) &&
          new GrammaticWord(activeSymbols).indexOf(currentRule.leftSide.symbols[0]) === -1 &&
          new GrammaticWord(newActiveSymbols).indexOf(currentRule.leftSide.symbols[0]) === -1
        ) {
          newActiveSymbols.push(currentRule.leftSide.symbols[0]);
        }
      }
    }
    
    return activeSymbols;
  }
  
  static reduce(grammar) {
    let reachableSymbols = NormalForm.getReachableSymbols(grammar);
    let activeSymbols = NormalForm.getActiveSymbols(grammar);
      
    let reachableSymbolsWord = new GrammaticWord(reachableSymbols);
    let activeSymbolsWord = new GrammaticWord(activeSymbols);
    
    let usefulSymbols = [];
    
    for (let currentSymbol of reachableSymbolsWord.symbols) {
      if (activeSymbolsWord.indexOf(currentSymbol) !== -1) {
        usefulSymbols.push(currentSymbol);
      }
    }
    
    let usefulSymbolsWord = new GrammaticWord(usefulSymbols);
    
    let result = grammar.filter(
      (r) =>
      new GrammaticWord(r.leftSide.getNonTerminals()).containsOnly(usefulSymbolsWord) &&
      new GrammaticWord(r.rightSide.getNonTerminals()).containsOnly(usefulSymbolsWord)
    );
    
    return result;
  }

  static getNullableSymbols(grammar) {
    let nullableSymbols = [];
    let newEpsilonSymbols = grammar.filter((r) => r.rightSide.symbols[0].base === "ε").map((r) => r.leftSide.symbols[0]);
    
    while (newEpsilonSymbols.length > 0) {
      nullableSymbols.push(...newEpsilonSymbols);
      newEpsilonSymbols = [];
      
      for (let currentRule of grammar) {
        if (
          currentRule.rightSide.containsOnly(new GrammaticWord(nullableSymbols)) &&
          new GrammaticWord(nullableSymbols).indexOf(currentRule.leftSide.symbols[0]) === -1 &&
          new GrammaticWord(newEpsilonSymbols).indexOf(currentRule.leftSide.symbols[0]) === -1
        ) {
          newEpsilonSymbols.push(currentRule.leftSide.symbols[0]);
        }
      }
    }
    
    return nullableSymbols;
  }

  static epsilonFree(grammar) {
    let nullableSymbols = NormalForm.getNullableSymbols(grammar);
    
    for (let i = 0; i < grammar.length; i++) {
      if (grammar[i].rightSide.symbols[0].base === "ε") {
        grammar.splice(i, 1);
      }
    }
    
    for (let currentSymbol of nullableSymbols) {
      for (let currentRule of grammar) {
        let index = currentRule.rightSide.indexOf(currentSymbol);
        if (index !== -1 && currentRule.rightSide.symbols.length > 1) {
          let newRule = currentRule.copy();
          newRule.rightSide.symbols.splice(index, 1);
          grammar.push(newRule);
        }
      }
    }
    
    GrammaticRule.sort(grammar);
    
    for (let i = 0; i < grammar.length - 1; i++) {
      while (grammar[i].equals(grammar[i + 1])) {
        grammar.splice(i, 1);
      }
    }
    
    return grammar;
  }
}
