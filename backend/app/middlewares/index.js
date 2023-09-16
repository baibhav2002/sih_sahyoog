// * Imports

const validateInstitute = require("./validateInstitute");
const validateStudent = require("./validateStudent");
const authJwt = require("./authJwt");
// * Exports

module.exports = {
  validateInstitute,
  validateStudent,
  authJwt,
};
