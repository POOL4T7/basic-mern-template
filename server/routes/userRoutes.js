import express from "express";
const router = express.Router();
import {
  userProfile,
  updateUserProfile,
} from "../controllers/userController.js";

import { runValidation, protect } from "../middlewares/authMiddleware.js";
import { profileValidator } from "../validators/userValidators.js";

router.get("/profile", protect, userProfile);
router.put(
  "/profile",
  profileValidator,
  runValidation,
  protect,
  updateUserProfile
);

export default router;
