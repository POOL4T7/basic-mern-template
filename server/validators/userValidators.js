const { check } = require("express-validator");

exports.profileValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
];
