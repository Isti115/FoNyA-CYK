/* exported GrammaticSymbol */

class GrammaticSymbol {
  constructor(base, sub = null) {
    this.base = base;
    this.sub = sub;
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
}
