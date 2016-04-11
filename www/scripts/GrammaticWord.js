/* exported GrammaticWord */
/* global GrammaticSymbol */

class GrammaticWord {
  constructor(symbols = []) {
    this.symbols = symbols;
  }
  
  static fromString(input) {
    let result = new GrammaticWord();
    
    let pattern = /([^_()])(_\(([^_()]+)\))?/g;
    let match;
    
    while ((match = pattern.exec(input))) {
      if (match[3]) {
        result.symbols.push(new GrammaticSymbol(match[1], match[3]));
      } else {
        result.symbols.push(new GrammaticSymbol(match[1]));
      }
    }
    
    return result;
  }
  
  indexOf(symbol) {
    for (let i = 0; i < this.symbols.length; i++) {
      if (symbol.equals(this.symbols[i])) {
        return i;
      }
    }
    
    return -1;
  }
  
  containsOnly(allowed) {
    for (let i = 0; i < this.symbols.length; i++) {
      if (allowed.indexOf(this.symbols[i]) === -1) {
        return false;
      }
    }
    
    return true;
  }
  
  isTerminal() {
    for (let currentSymbol of this.symbols) {
      if (!currentSymbol.isTerminal()) {
        return false;
      }
    }
    
    return true;
  }
  
  getNonTerminals() {
    return this.symbols.filter((s) => !s.isTerminal());
  }
  
  toString() {
    let result = "";
    
    for (let currentSymbol of this.symbols) {
      result += currentSymbol.toString();
    }
    
    return result;
  }
}
