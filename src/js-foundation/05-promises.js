// function getPokemonById(id, callback) {
//   const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

//   return fetch(url).then((res) => {
//     res.json().then((data) => {
//       callback && callback(data.name);
//     });
//   });
// }

function getPokemonById(id, callback) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  return fetch(url)
    .then((res) => res.json())
    .then((item) => item.name);
}

module.exports = {
  getPokemonById,
};
