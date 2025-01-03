const uuid = require("uuid");

const getId = () => {
  return uuid.v4();
};

module.exports = {
  getId,
};
