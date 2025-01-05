import { characters } from "../../src/js-foundation/02-destructuring";

describe("Test in 02-destructuring.ts", () => {
  test("characters should contain Flash, Superman", () => {
    expect(characters).toContain("Flash");
    expect(characters).toContain("Superman");
  });

  test("First character should be Flash", () => {
    expect(characters[0]).toBe("Flash");
  });
});
