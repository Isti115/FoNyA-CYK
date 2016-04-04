/* global hello */

describe("scripts", () => {
  it("should say hello", () => {
    expect(hello()).toEqual("Hello World!");
  });
});
