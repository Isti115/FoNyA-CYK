/* exported GrammaticSymbol */

class GrammaticSymbol {
  constructor(base, sub = null) {
    this.base = base;
    this.sub = sub;
  }
  
  static equals(a, b) {
    return (
      a.base === b.base &&
      a.sub === b.sub
    );
  }
  
  equals(other) {
    return GrammaticSymbol.equals(this, other);
  }
  
  isTerminal() {
    return this.base === this.base.toLowerCase();
  }
  
  static listFromString(input) {
    let result = [];
    
    // let pattern = /([^_()])_\((\d+)\)|([^_()])(?!_)/g;
    let pattern = /([^_()])(_\(([^_()]+)\))?/g;
    let match;
    
    while ((match = pattern.exec(input))) {
      if (match[3]) {
        result.push(new GrammaticSymbol(match[1], match[3]));
      } else {
        result.push(new GrammaticSymbol(match[1]));
      }
    }
    
    return result;
  }
  
  toHTML() {
    let symbolSpan = document.createElement("span");
    symbolSpan.classList.add("grammatic-symbol");
    
    let symbolText = document.createTextNode(this.base);
    
    symbolSpan.appendChild(symbolText);
    
    if (this.sub !== null) {
      let subSub = document.createElement("sub");
      let subText = document.createTextNode(this.sub);
      
      subSub.appendChild(subText);
      
      symbolSpan.appendChild(subSub);
    }
    
    return symbolSpan;
  }
}
