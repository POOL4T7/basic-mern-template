import express from "express";
const router = express.Router();
import { authUser, registerUser } from "../controllers/userController.js";
import { runValidation } from "../middlewares/authMiddleware.js";
import {
  signinValidator,
  signupValidator,
} from "../validators/userValidators.js";

router.post("/signup", signupValidator, runValidation, registerUser);
router.post("/signin", signinValidator, runValidation, authUser);

export default router;
