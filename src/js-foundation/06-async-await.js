const { httpClient } = require("../plugins/http-client.plugin");

async function getPokemonById(id, callback) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  const pokemon = await httpClient().get(url);

  return pokemon.name;
}

module.exports = {
  getPokemonById,
};
