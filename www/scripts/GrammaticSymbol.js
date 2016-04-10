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
