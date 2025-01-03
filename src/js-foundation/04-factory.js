const buildMakePerson = ({ getIdCb, getAgeCb }) => {
  return ({ name, birthdate }) => {
    return {
      id: getIdCb(),
      name,
      birthdate,
      age: getAgeCb(birthdate),
    };
  };
};

module.exports = {
  buildMakePerson,
};
