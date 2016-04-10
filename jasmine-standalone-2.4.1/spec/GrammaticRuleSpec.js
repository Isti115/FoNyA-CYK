/* global GrammaticSymbol GrammaticRule */

describe("GrammaticRule", () => {
  it("should make a rule out of a string", () => {
    expect(GrammaticRule.fromStrings(
      "A", "a"
    )).toEqual(
      new GrammaticRule(
        GrammaticSymbol.listFromString("A"),
        GrammaticSymbol.listFromString("a")
      )
    );
    
    expect(GrammaticRule.fromStrings(
      "Be", "oYe"
    )).toEqual(
      new GrammaticRule(
        GrammaticSymbol.listFromString("Be"),
        GrammaticSymbol.listFromString("oYe")
      )
    );
  });
  
  it("should make a list of rules from string input", () => {
    expect(GrammaticRule.listFromString(`
      A -> a
      B -> b
    `)).toEqual([
      GrammaticRule.fromStrings("A", "a"),
      GrammaticRule.fromStrings("B", "b")
    ]);
    
    expect(GrammaticRule.listFromString(`
      S -> Dd
      D -> ε
    `)).toEqual([
      GrammaticRule.fromStrings("S", "Dd"),
      GrammaticRule.fromStrings("D", "ε")
    ]);
    
    expect(GrammaticRule.listFromString(`
      S -> Dd|Ba|qC
      D -> A|e
    `)).toEqual([
      GrammaticRule.fromStrings("S", "Dd"),
      GrammaticRule.fromStrings("S", "Ba"),
      GrammaticRule.fromStrings("S", "qC"),
      GrammaticRule.fromStrings("D", "A"),
      GrammaticRule.fromStrings("D", "e")
    ]);
    
    expect(GrammaticRule.listFromString(`
      C -> bBc|aCB
      D -> DD|Cb|
    `)).toEqual([
      GrammaticRule.fromStrings("C", "bBc"),
      GrammaticRule.fromStrings("C", "aCB"),
      GrammaticRule.fromStrings("D", "DD"),
      GrammaticRule.fromStrings("D", "Cb")
    ]);
  });
});
