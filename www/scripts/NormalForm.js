/* exported NormalForm */

class NormalForm {
  static reduce(grammar) {
    let finished = false;

    let reachableSymbols = [grammar[0].leftSide[0]];
    
    while (!finished) {
      finished = true;
      
      // let currentRules = [];
      // for (let currentSymbol of reachableSymbols) {
      //   currentRules.push(...grammar.filter(x => x.leftSide))
      // }
    }
    
    console.log(reachableSymbols[0].toHTML());
    
    // let active = [];
    
    // let useful = [];
  }
}
