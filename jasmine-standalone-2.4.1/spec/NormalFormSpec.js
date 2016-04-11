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
  
  it("should epsilon free a grammar", () => {
    expect(NormalForm.epsilonFree(GrammaticRule.listFromString(`
      S -> AbB|C
      B -> AA|AC
      C -> b|c
      A -> a|ε
    `))).toEqual(GrammaticRule.sort(GrammaticRule.listFromString(`
      S -> AbB|Ab|bB|b|C
      B -> AA|A|AC|C
      C -> b|c
      A -> a
    `)));
  });
});
