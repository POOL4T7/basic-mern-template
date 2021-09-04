import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  userProfile,
  updateUserProfile,
  GoogleLogin,
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

router.post("/google/user/login", GoogleLogin);

export default router;
