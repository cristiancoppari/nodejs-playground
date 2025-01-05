import { httpClient } from "../../src/plugins";

describe("Test in http-client.plugin.ts", () => {
  test("httpClientPlugin should return a string", async () => {
    const data = await httpClient.get("https://pokeapi.co/api/v2/pokemon/1");
    expect(typeof data.name).toBe("string");
  });

  test("httpClientPlugin should have GET, POST, PUT, DELETE methods", () => {
    expect(typeof httpClient.get).toBe("function");
    expect(typeof httpClient.post).toBe("function");
    expect(typeof httpClient.put).toBe("function");
    expect(typeof httpClient.delete).toBe("function");
  });
});
