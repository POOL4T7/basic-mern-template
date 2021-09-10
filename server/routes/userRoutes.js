const express = require("express");
const router = express.Router();
const {
  userProfile,
  updateUserProfile,
  getUsersList,
  getUserById,
  updateUser,
} = require("../controllers/userController.js");

const {
  runValidation,
  protect,
  isAdmin,
} = require("../middlewares/authMiddleware.js");
const { profileValidator } = require("../validators/userValidators.js");

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

module.exports=router;
