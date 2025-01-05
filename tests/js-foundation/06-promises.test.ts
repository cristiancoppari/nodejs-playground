import { getPokemonById } from "../../src/js-foundation/06-promises";

describe("Test in 06-promises.ts", () => {
  test("getPokemonById should return a pokemon", async () => {
    const pokemonName = await getPokemonById(1);

    expect(pokemonName).toBe("bulbasaur");
  });

  test("should throw an error if the pokemon does not exist", async () => {
    const pokemonId = 1000000000000;

    try {
      const pokemonName = await getPokemonById(pokemonId);
      expect(true).toBeFalsy();
    } catch (error) {
      expect(error).toBe(`Pokemon no existe ${pokemonId}`);
    }
  });
});
