import { getUUID } from "../../src/plugins";

describe("Test in get-id.plugin.ts", () => {
  test("getUUID should return a UUID", () => {
    const uuid = getUUID();
    expect(typeof uuid).toBe("string");
    expect(uuid.length).toBe(36);
  });
});
