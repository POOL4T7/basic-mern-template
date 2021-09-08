import express from "express";
const router = express.Router();
import {
  userProfile,
  updateUserProfile,
  getUsersList,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

import {
  runValidation,
  protect,
  isAdmin,
} from "../middlewares/authMiddleware.js";
import { profileValidator } from "../validators/userValidators.js";

/**
 * @access("user")
 */
router.get("/profile", protect, userProfile);
router.put(
  "/profile",
  profileValidator,
  runValidation,
  protect,
  updateUserProfile
);

/**
 * @access("admin")
 */
router.get("/", protect, isAdmin, getUsersList);
router.get("/:id", protect, isAdmin, getUserById);
router.put("/:id", protect, isAdmin, updateUser);
router.put("/:id", protect, isAdmin, updateUser);
router.delete("/:id", protect, isAdmin, deleteUser);

export default router;
