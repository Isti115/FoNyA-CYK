/* global GrammaticSymbol GrammaticRule CYK */

describe("CYK", () => {
  it("should check the deductibility of a word", () => {
    expect(CYK.checkDeductibility(GrammaticRule.listFromString(`
      S -> AS|SB|a
      A -> BC|a
      B -> AB|CC|b
      C -> AB|c
    `), new GrammaticSymbol("S"), "aabbcc")).toBeTruthy();
    
    expect(CYK.checkDeductibility(GrammaticRule.listFromString(`
      S -> AB|CD
      A -> AA|CS|a
      B -> BB|DS|b
      C -> DA|CB|a
      D -> DD|b
    `), new GrammaticSymbol("S"), "aabba")).toBeFalsy();
  });
});
