const { getId } = require("./public/get-id.plugin");
const { getAge } = require("./public/get-age.plugin");
const { buildMakePerson } = require("./js-foundation/04-factory");

const makePerson = buildMakePerson({ getIdCb: getId, getAgeCb: getAge });

const person = makePerson({ name: "John", birthdate: new Date() });

console.log(person);
