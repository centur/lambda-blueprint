import { deepCopy } from "../../src";

describe("utils", () => {
  it("should deeply copy a source-object into a target-object", () => {
    const target = { a: 1, b: { x: 1, y: 2 } };
    const source = { b: { y: 3, z: 1 }, c: 1 };

    expect(deepCopy(target, source)).toEqual({ a: 1, b: { x: 1, y: 3, z: 1 }, c: 1 });
  });
});
