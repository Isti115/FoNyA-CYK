/* global GrammaticSymbol GrammaticWord */

describe("GrammaticWord", () => {
  it("should make a copy", () => {
    expect(GrammaticWord.fromString("").copy()).toEqual(GrammaticWord.fromString(""));
    expect(GrammaticWord.fromString("Ad").copy()).toEqual(GrammaticWord.fromString("Ad"));
    expect(GrammaticWord.fromString("W_(3)bQ_(5)C").copy()).toEqual(GrammaticWord.fromString("W_(3)bQ_(5)C"));
  });
  
  it("should check for equality", () => {
    expect(GrammaticWord.fromString("S").equals(GrammaticWord.fromString("S"))).toBeTruthy();
    expect(GrammaticWord.fromString("AQ_(5)").equals(GrammaticWord.fromString("AQ_(5)"))).toBeTruthy();
    expect(GrammaticWord.fromString("BC").equals(GrammaticWord.fromString("BCA"))).toBeFalsy();
    expect(GrammaticWord.fromString("ABC").equals(GrammaticWord.fromString("BCA"))).toBeFalsy();
    expect(GrammaticWord.fromString("AQ_(5)").equals(GrammaticWord.fromString("AQ_(7)"))).toBeFalsy();
    
    expect(GrammaticWord.equals(GrammaticWord.fromString("S"), GrammaticWord.fromString("S"))).toBeTruthy();
    expect(GrammaticWord.equals(GrammaticWord.fromString("AQ_(5)"), GrammaticWord.fromString("AQ_(5)"))).toBeTruthy();
    expect(GrammaticWord.equals(GrammaticWord.fromString("BC"), GrammaticWord.fromString("BCA"))).toBeFalsy();
    expect(GrammaticWord.equals(GrammaticWord.fromString("ABC"), GrammaticWord.fromString("BCA"))).toBeFalsy();
    expect(GrammaticWord.equals(GrammaticWord.fromString("AQ_(5)"), GrammaticWord.fromString("AQ_(7)"))).toBeFalsy();
  });
  
  it("should create a word from a string", () => {
    expect(GrammaticWord.fromString(
      ""
    )).toEqual(new GrammaticWord([

    ]));
    
    expect(GrammaticWord.fromString(
      "AbrE"
    )).toEqual(new GrammaticWord([
      new GrammaticSymbol("A"),
      new GrammaticSymbol("b"),
      new GrammaticSymbol("r"),
      new GrammaticSymbol("E")
    ]));
    
    expect(GrammaticWord.fromString(
      "UQ_(2)xW_(5)"
    )).toEqual(new GrammaticWord([
      new GrammaticSymbol("U"),
      new GrammaticSymbol("Q", "2"),
      new GrammaticSymbol("x"),
      new GrammaticSymbol("W", "5")
    ]));
    
    expect(GrammaticWord.fromString(
      "W_(17)Q_(42)"
    )).toEqual(new GrammaticWord([
      new GrammaticSymbol("W", "17"),
      new GrammaticSymbol("Q", "42")
    ]));
  });
  
  it("should get the index of a symbol", () => {
    expect(GrammaticWord.fromString("Aqf").indexOf(new GrammaticSymbol("A"))).toEqual(0);
    expect(GrammaticWord.fromString("Aqf").indexOf(new GrammaticSymbol("f"))).toEqual(2);
    expect(GrammaticWord.fromString("Aqf").indexOf(new GrammaticSymbol("d"))).toEqual(-1);
    
    expect(GrammaticWord.fromString("XfAqf").indexOf(new GrammaticSymbol("f"), 0)).toEqual(1);
    expect(GrammaticWord.fromString("XfAqf").indexOf(new GrammaticSymbol("f"), 2)).toEqual(4);
    
    expect(GrammaticWord.fromString("AW_(1)qf").indexOf(new GrammaticSymbol("W", "1"))).toEqual(1);
    expect(GrammaticWord.fromString("AqW_(1)f").indexOf(new GrammaticSymbol("W", "5"))).toEqual(-1);
    expect(GrammaticWord.fromString("AqW_(5)f").indexOf(new GrammaticSymbol("f", "5"))).toEqual(-1);
  });
  
  it("should check if a word only contains spcific non-terminals", () => {
    expect(
      GrammaticWord.fromString("S").containsOnly(
        GrammaticWord.fromString("S")
      )).toBeTruthy();
      
    expect(
      GrammaticWord.fromString("AB").containsOnly(
      GrammaticWord.fromString("ABC")
    )).toBeTruthy();
    
    expect(
      GrammaticWord.fromString("ABD").containsOnly(
      GrammaticWord.fromString("ABC")
    )).toBeFalsy();
    
    expect(
      GrammaticWord.fromString("W_(5)B").containsOnly(
      GrammaticWord.fromString("BAW_(5)C")
    )).toBeTruthy();
    
    expect(
      GrammaticWord.fromString("Q_(3)AW_(4)BD").containsOnly(
      GrammaticWord.fromString("AW_(4)BCQ_(5)")
    )).toBeFalsy();
  });
  
  it("should check if a word contains only terminal symbols", () => {
    expect(GrammaticWord.fromString("ab").isTerminal()).toBeTruthy();
    expect(GrammaticWord.fromString("ε").isTerminal()).toBeTruthy();
    
    expect(GrammaticWord.fromString("A").isTerminal()).toBeFalsy();
    expect(GrammaticWord.fromString("bcAd").isTerminal()).toBeFalsy();
  });
  
  it("should return it's non-terminal symbols", () => {
    expect(GrammaticWord.fromString("ab").getNonTerminals()).toEqual(GrammaticWord.fromString("").symbols);
    expect(GrammaticWord.fromString("aAb").getNonTerminals()).toEqual(GrammaticWord.fromString("A").symbols);
    expect(GrammaticWord.fromString("BQ_(4)").getNonTerminals()).toEqual(GrammaticWord.fromString("BQ_(4)").symbols);
  });
  
  it("should convert to string", () => {
    expect(GrammaticWord.fromString("ab").toString()).toEqual("ab");
    expect(GrammaticWord.fromString("aAb").toString()).toEqual("aAb");
    expect(GrammaticWord.fromString("BQ_(4)a").toString()).toEqual("BQ_(4)a");
  });
});
