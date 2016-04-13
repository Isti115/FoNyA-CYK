/* global GrammaticRule CYK */

describe("CYK", () => {
  it("should check the deductibility of a word", () => {
    expect(CYK.checkDeductibility(GrammaticRule.listFromString(`
      S -> AS|SB|a
      A -> BC|a
      B -> AB|CC|b
      C -> AB|c
    `), "aabbcc")).toBeTruthy();
  });
});
