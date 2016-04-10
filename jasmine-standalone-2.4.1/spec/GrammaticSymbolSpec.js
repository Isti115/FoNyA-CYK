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
  
  it("should create a list of symbols from a string", () => {
    expect(GrammaticSymbol.listFromString(
      ""
    )).toEqual([

    ]);
    
    expect(GrammaticSymbol.listFromString(
      "AbrE"
    )).toEqual([
      new GrammaticSymbol("A"),
      new GrammaticSymbol("b"),
      new GrammaticSymbol("r"),
      new GrammaticSymbol("E")
    ]);
    
    expect(GrammaticSymbol.listFromString(
      "UQ_(2)xW_(5)"
    )).toEqual([
      new GrammaticSymbol("U"),
      new GrammaticSymbol("Q", "2"),
      new GrammaticSymbol("x"),
      new GrammaticSymbol("W", "5")
    ]);
    
    expect(GrammaticSymbol.listFromString(
      "W_(17)Q_(42)"
    )).toEqual([
      new GrammaticSymbol("W", "17"),
      new GrammaticSymbol("Q", "42")
    ]);
  });
  
  xit("should check if a list only contains spcific non-terminals", () => {
    expect(
      GrammaticSymbol.listContainsOnly(
        GrammaticSymbol.listFromString("AB"),
        GrammaticSymbol.listFromString("ABC")
      )
    ).toBeTruthy();
    
    expect(
      GrammaticSymbol.listContainsOnly(
        GrammaticSymbol.listFromString("ABD"),
        GrammaticSymbol.listFromString("ABC")
      )
    ).toBeFalsy();
    
    expect(
      GrammaticSymbol.listContainsOnly(
        GrammaticSymbol.listFromString("W_(5)B"),
        GrammaticSymbol.listFromString("BAW_(5)C")
      )
    ).toBeTruthy();
    
    expect(
      GrammaticSymbol.listContainsOnly(
        GrammaticSymbol.listFromString("Q_(3)AW_(4)BD"),
        GrammaticSymbol.listFromString("AW_(4)BCQ_(5)")
      )
    ).toBeFalsy();
  });
});
