/* global GrammaticSymbol */

describe("GrammaticSymbol", () => {
  it("should make a copy", () => {
    expect(new GrammaticSymbol("A").copy()).toEqual(new GrammaticSymbol("A"));
    expect(new GrammaticSymbol("W", "2").copy()).toEqual(new GrammaticSymbol("W", "2"));
  });
  
  it("should check for equality", () => {
    expect(new GrammaticSymbol("R").equals(new GrammaticSymbol("R"))).toBeTruthy();
    expect(new GrammaticSymbol("Q", "2").equals(new GrammaticSymbol("Q", "2"))).toBeTruthy();
    expect(new GrammaticSymbol("A").equals(new GrammaticSymbol("B"))).toBeFalsy();
    expect(new GrammaticSymbol("Q", "2").equals(new GrammaticSymbol("Q", "4"))).toBeFalsy();
    
    expect(GrammaticSymbol.equals(new GrammaticSymbol("R"), new GrammaticSymbol("R"))).toBeTruthy();
    expect(GrammaticSymbol.equals(new GrammaticSymbol("Q", "2"), new GrammaticSymbol("Q", "2"))).toBeTruthy();
    expect(GrammaticSymbol.equals(new GrammaticSymbol("A"), new GrammaticSymbol("B"))).toBeFalsy();
    expect(GrammaticSymbol.equals(new GrammaticSymbol("Q", "2"), new GrammaticSymbol("Q", "4"))).toBeFalsy();
  });
  
  it("should check if the symbol is terminal", () => {
    expect(new GrammaticSymbol("a").isTerminal()).toBeTruthy();
    expect(new GrammaticSymbol("A").isTerminal()).toBeFalsy();
    
    expect(new GrammaticSymbol("a", "4").isTerminal()).toBeTruthy();
    expect(new GrammaticSymbol("A", "4").isTerminal()).toBeFalsy();
  });
  
  it("should convert to string", () => {
    expect(new GrammaticSymbol("A").toString()).toEqual("A");
    expect(new GrammaticSymbol("Q", "4").toString()).toEqual("Q_(4)");
    expect(new GrammaticSymbol("a").toString()).toEqual("a");
  });
});
