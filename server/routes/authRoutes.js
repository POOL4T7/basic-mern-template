import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  GoogleLogin,
} from "../controllers/authController.js";
import { runValidation } from "../middlewares/authMiddleware.js";
import {
  signinValidator,
  signupValidator,
} from "../validators/authValidators.js";

/**
 * @access("guest")
 */
router.post("/signup", signupValidator, runValidation, registerUser);
router.post("/signin", signinValidator, runValidation, authUser);
router.post("/google/user/login", GoogleLogin);

export default router;
