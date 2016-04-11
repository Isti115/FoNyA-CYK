/* exported PrettyPrinter */
/* global GrammaticWord */

class PrettyPrinter {
  static symbolToHTML(symbol) {
    let symbolSpan = document.createElement("span");
    symbolSpan.classList.add("grammatic-symbol");
    
    let symbolText = document.createTextNode(symbol.base);
    
    symbolSpan.appendChild(symbolText);
    
    if (symbol.sub !== null) {
      let subSub = document.createElement("sub");
      let subText = document.createTextNode(symbol.sub);
      
      subSub.appendChild(subText);
      
      symbolSpan.appendChild(subSub);
    }
    
    return symbolSpan;
  }
  
  static wordToHTML(word) {
    let wordSpan = document.createElement("span");
    wordSpan.classList.add("grammatic-word");
    
    for (let currentSymbol of word.symbols) {
      wordSpan.appendChild(PrettyPrinter.symbolToHTML(currentSymbol));
    }
    
    return wordSpan;
  }
  
  static ruleToHTML(rule) {
    let ruleSpan = document.createElement("span");
    ruleSpan.classList.add("grammatic-rule");
    
    ruleSpan.appendChild(PrettyPrinter.wordToHTML(rule.leftSide));
    
    let arrowText = document.createTextNode(" -> ");
    ruleSpan.appendChild(arrowText);
    
    ruleSpan.appendChild(PrettyPrinter.wordToHTML(rule.rightSide));
    
    return ruleSpan;
  }
  
  static ruleSetToHTML(ruleSet) {
    let ruleSetP = document.createElement("p");
    ruleSetP.classList.add("grammatic-rule-set");
    
    for (let currentRule of ruleSet) {
      ruleSetP.appendChild(PrettyPrinter.ruleToHTML(currentRule));
    }
    
    return ruleSetP;
  }
  
  static ruleSetToDenseHTML(ruleSet) {
    let ruleSetP = document.createElement("p");
    ruleSetP.classList.add("grammatic-rule-set");
    ruleSetP.classList.add("dense");
    
    let leftSideStrings = {};
    
    for (let currentRule of ruleSet) {
      let currentLeftSideString = currentRule.leftSide.toString();
      if (!(currentLeftSideString in leftSideStrings)) {
        leftSideStrings[currentLeftSideString] = [];
      }
      
      leftSideStrings[currentLeftSideString].push(currentRule.rightSide);
    }
        
    for (let currentLeftSideString in leftSideStrings) {
      // if ({}.hasOwnProperty.call(leftSideStrings, currentLeftSideString)) {
      if (leftSideStrings.hasOwnProperty(currentLeftSideString)) {
        let ruleSpan = document.createElement("span");
        ruleSpan.classList.add("grammatic-rule");
        
        ruleSpan.appendChild(PrettyPrinter.wordToHTML(GrammaticWord.fromString(currentLeftSideString)));
        
        let arrowText = document.createTextNode(" -> ");
        ruleSpan.appendChild(arrowText);

        let separatorText = document.createTextNode("|");
        let isFirst = true;
        
        for (let currentRightSide of leftSideStrings[currentLeftSideString]) {
          if (isFirst) {
            isFirst = false;
          } else {
            ruleSpan.appendChild(separatorText.cloneNode());
          }
          
          ruleSpan.appendChild(PrettyPrinter.wordToHTML(currentRightSide));
        }
        
        ruleSetP.appendChild(ruleSpan);
      }
    }
    
    return ruleSetP;
  }
}
