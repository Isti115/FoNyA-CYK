/* global GrammaticWord GrammaticRule */

describe("GrammaticRule", () => {
  it("should make a copy", () => {
    expect(GrammaticRule.fromStrings("S", "AbB").copy()).toEqual(GrammaticRule.fromStrings("S", "AbB"));
    expect(GrammaticRule.fromStrings("W_(3)", "bQ_(5)C").copy()).toEqual(GrammaticRule.fromStrings("W_(3)", "bQ_(5)C"));
  });
  
  it("should check for equality", () => {
    expect(GrammaticRule.fromStrings("S", "sb").equals(GrammaticRule.fromStrings("S", "sb"))).toBeTruthy();
    expect(GrammaticRule.fromStrings("W_(a)", "a").equals(GrammaticRule.fromStrings("W_(a)", "a"))).toBeTruthy();
    expect(GrammaticRule.fromStrings("BC", "qwe").equals(GrammaticRule.fromStrings("BCA", "qwe"))).toBeFalsy();
    expect(GrammaticRule.fromStrings("BC", "qwe").equals(GrammaticRule.fromStrings("BC", "qwer"))).toBeFalsy();
    expect(GrammaticRule.fromStrings("X", "Y").equals(GrammaticRule.fromStrings("Y", "X"))).toBeFalsy();
    expect(GrammaticRule.fromStrings("W_(5)", "W_(4)").equals(GrammaticRule.fromStrings("W_(5)", "a_(4)"))).toBeFalsy();
    
    expect(GrammaticRule.equals(GrammaticRule.fromStrings("S", "sb"), GrammaticRule.fromStrings("S", "sb"))).toBeTruthy();
    expect(GrammaticRule.equals(GrammaticRule.fromStrings("W_(a)", "a"), GrammaticRule.fromStrings("W_(a)", "a"))).toBeTruthy();
    expect(GrammaticRule.equals(GrammaticRule.fromStrings("BC", "qwe"), GrammaticRule.fromStrings("BCA", "qwe"))).toBeFalsy();
    expect(GrammaticRule.equals(GrammaticRule.fromStrings("BC", "qwe"), GrammaticRule.fromStrings("BC", "qwer"))).toBeFalsy();
    expect(GrammaticRule.equals(GrammaticRule.fromStrings("X", "Y"), GrammaticRule.fromStrings("Y", "X"))).toBeFalsy();
    expect(GrammaticRule.equals(GrammaticRule.fromStrings("W_(5)", "W_(4)"), GrammaticRule.fromStrings("W_(5)", "a_(4)"))).toBeFalsy();
  });
  
  it("should make a rule out of a string", () => {
    expect(GrammaticRule.fromStrings(
      "A", "a"
    )).toEqual(
      new GrammaticRule(
        GrammaticWord.fromString("A"),
        GrammaticWord.fromString("a")
      )
    );
    
    expect(GrammaticRule.fromStrings(
      "Be", "oYe"
    )).toEqual(
      new GrammaticRule(
        GrammaticWord.fromString("Be"),
        GrammaticWord.fromString("oYe")
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
  
  it("should convert to string", () => {
    expect(GrammaticRule.fromStrings("S", "AbB").toString()).toEqual("S -> AbB");
    expect(GrammaticRule.fromStrings("W_(3)", "bQ_(5)C").toString()).toEqual("W_(3) -> bQ_(5)C");
  });
});
