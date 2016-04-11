/* exported GrammaticSymbol */

class GrammaticSymbol {
  constructor(base, sub = null) {
    this.base = base;
    this.sub = sub;
  }
  
  copy() {
    return new GrammaticSymbol(
      this.base,
      this.sub
    );
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
  
  toString() {
    let result = this.base;
    
    if (this.sub !== null) {
      result += `_(${this.sub})`;
    }
    
    return result;
  }
}
