/* global parseRules Rule */

describe("scripts", () => {
  it("should parse the input", () => {
    expect(parseRules(`
      A -> a
      B -> b
    `)).toEqual([
      new Rule("A", "a"),
      new Rule("B", "b")
    ]);
    
    expect(parseRules(`
      S -> Dd
      D -> e
    `)).toEqual([
      new Rule("S", "Dd"),
      new Rule("D", "e")
    ]);
    
    expect(parseRules(`
      S -> Dd|Ba|qC
      D -> A|e
    `)).toEqual([
      new Rule("S", "Dd"),
      new Rule("S", "Ba"),
      new Rule("S", "qC"),
      new Rule("D", "A"),
      new Rule("D", "e")
    ]);
  });
});
