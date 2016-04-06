/* global GrammaticSymbol */

describe("GrammaticSymbol", () => {
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
});
