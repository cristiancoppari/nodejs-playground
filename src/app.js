// const { getPokemonById } = require("./js-foundation/05-promises");
const { getPokemonById } = require("./js-foundation/06-async-await");

getPokemonById(2)
  .then((name) => {
    console.log(name);
  })
  .catch((err) => console.log("Please try again later"))
  .finally(() => console.log("finally"));

// 1. Factory
// const { getId } = require("./public/get-id.plugin");
// const { getAge } = require("./public/get-age.plugin");
// const { buildMakePerson } = require("./js-foundation/04-factory");

// const makePerson = buildMakePerson({ getIdCb: getId, getAgeCb: getAge });

// const person = makePerson({ name: "John", birthdate: new Date() });

// console.log(person);
