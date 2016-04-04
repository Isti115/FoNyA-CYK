/* global parseRules */

describe("scripts", () => {
  it("should parse the input", () => {
    expect(parseRules(`
      A -> a
      B -> b
    `)).toEqual([
      {"from": "A", "to": "a"},
      {"from": "B", "to": "b"}
    ]);
    expect(parseRules(`
      S -> Dd
      D -> e
    `)).toEqual([
      {"from": "S", "to": "Dd"},
      {"from": "D", "to": "e"}
    ]);
  });
});
