const getAgePlugin = require("get-age");

const getAge = (birthdate) => {
  if (!birthdate) return new Error("Birthdate is required");

  return getAgePlugin(birthdate.getFullYear());
};

module.exports = {
  getAge,
};
