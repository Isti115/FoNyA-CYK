/* global GrammaticSymbol */

describe("GrammaticSymbol", () => {
  it("should check for equality", () => {
    expect(new GrammaticSymbol("R").equals(new GrammaticSymbol("R"))).toBeTruthy();
    expect(new GrammaticSymbol("Q", "2").equals(new GrammaticSymbol("Q", "2"))).toBeTruthy();
    
    expect(GrammaticSymbol.equals(new GrammaticSymbol("R"), new GrammaticSymbol("R"))).toBeTruthy();
    expect(GrammaticSymbol.equals(new GrammaticSymbol("Q", "2"), new GrammaticSymbol("Q", "2"))).toBeTruthy();
  });
  
  it("should check if the symbol is terminal", () => {
    expect(new GrammaticSymbol("a").isTerminal()).toBeTruthy();
    expect(new GrammaticSymbol("A").isTerminal()).toBeFalsy();
    
    expect(new GrammaticSymbol("a", "4").isTerminal()).toBeTruthy();
    expect(new GrammaticSymbol("A", "4").isTerminal()).toBeFalsy();
  });
});
