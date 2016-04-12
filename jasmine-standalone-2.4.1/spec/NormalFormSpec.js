/* global GrammaticRule NormalForm */

describe("NormalForm", () => {
  xit("should get reachable symbols", () => {
    
  });
  
  xit("should get active symbols", () => {
    
  });
  
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
  
  xit("should get nullable symbols", () => {
    
  });
  
  it("should epsilon free a grammar", () => {
    expect(NormalForm.epsilonFree(GrammaticRule.listFromString(`
      S -> ACA
      A -> aAa|B|C
      B -> bB|b
      C -> cC|ε
    `))).toEqual(GrammaticRule.sort(GrammaticRule.listFromString(`
      S -> A|C|AC|CA|ACA|AA
      A -> aAa|aa|B|C
      B -> bB|b
      C -> c|cC
    `)));
    
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
  
  xit("should get chained symbols", () => {
    
  });
  
  it("should chain free a grammar", () => {
    expect(NormalForm.chainFree(GrammaticRule.listFromString(`
      S -> ACA
      A -> aAa|B
      B -> bB|b|C
      C -> cC|f
    `))).toEqual(GrammaticRule.sort(GrammaticRule.listFromString(`
      S -> ACA
      A -> aAa|bB|b|cC|f
      B -> bB|b|cC|f
      C -> cC|f
    `)));
    
    expect(NormalForm.chainFree(GrammaticRule.listFromString(`
      S -> ASB|B
      A -> Aa|B
      B -> b|C
      C -> a
    `))).toEqual(GrammaticRule.sort(GrammaticRule.listFromString(`
      S -> ASB|b|a
      A -> Aa|b|a
      B -> b|a
      C -> a
    `)));
  });
  
  it("should add fake non-terminals to a grammar", () => {
    expect(NormalForm.fakeNonTerminals(GrammaticRule.listFromString(`
      S -> aABC|a
      A -> aA|a
      B -> bcB|bc
      C -> cC|c
    `))).toEqual(GrammaticRule.sort(GrammaticRule.listFromString(`
      S -> Q_(a)ABC|a
      A -> Q_(a)A|a
      B -> Q_(b)Q_(c)B|Q_(b)Q_(c)
      C -> Q_(c)C|c
      Q_(a) -> a
      Q_(b) -> b
      Q_(c) -> c
    `)));
  });
});
