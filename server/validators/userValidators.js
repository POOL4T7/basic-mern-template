import { check } from "express-validator";

export const profileValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
];
