import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  userProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { runValidation, protect } from "../middlewares/authMiddleware.js";
import {
  signinValidator,
  signupValidator,
  profileValidator,
} from "../validators/userValidators.js";

router.post("/signup", signupValidator, runValidation, registerUser);
router.post("/signin", signinValidator, runValidation, authUser);
router.get("/profile", protect, userProfile);
router.put(
  "/profile",
  profileValidator,
  runValidation,
  protect,
  updateUserProfile
);
export default router;
