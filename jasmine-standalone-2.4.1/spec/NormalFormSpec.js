/* global GrammaticRule NormalForm */

xdescribe("NormalForm", () => {
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
});
