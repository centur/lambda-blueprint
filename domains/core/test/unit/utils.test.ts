import { deepMerge } from "../../src";

describe("utils", () => {
  it("should deeply merge a source-object into a target-object", async () => {
    const target = { a: 1, b: { x: 1, y: 2 } };
    const source = { b: { y: 3, z: 1 }, c: 1 };

    expect(deepMerge(target, source)).toEqual({ a: 1, b: { x: 1, y: 3, z: 1 }, c: 1 });
  });
});
