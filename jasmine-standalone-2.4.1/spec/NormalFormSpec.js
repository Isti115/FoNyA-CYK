/* global GrammaticRule NormalForm */

describe("NormalForm", () => {
  it("should reduce a grammar", () => {
    expect(NormalForm.reduce(GrammaticRule.listFromString(`
      S -> AS|SB|a
      A -> BC|a
      B -> AB|CC|b
      C -> AB|c
    `))).toEqual(GrammaticRule.listFromString(`
      S -> AS|SB|a
      A -> BC|a
      B -> AB|CC|b
      C -> AB|c
    `));
    
    expect(NormalForm.reduce(GrammaticRule.listFromString(`
      S -> bCB|bBB|abD
      A -> ADb|bD
      C -> bBc|aCB
      D -> DD|Cb|ε
    `))).toEqual(GrammaticRule.listFromString(`
      S -> abD
      D -> DD
      D -> ε
    `));
  });
  
  xit("should epsilon free a grammar", () => {
    expect(NormalForm.epsilonFree(GrammaticRule.listFromString(`
      S -> ACA
      A -> aAa|B|C
      B -> bB|b
      C -> cC|ε
    `))).toEqual(GrammaticRule.listFromString(`
      S -> A|C|AC|CA|ACA
      A -> A|B|C
      B -> bB|b
      C -> cC|ε
    `));
  });
});
