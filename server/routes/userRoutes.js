const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");
const { authMiddleware } = require("../middlewares");
const { uservalidators } = require("../validators");

/**
 * @access("user")
 */
router.get("/profile", authMiddleware.protect, userController.userProfile);
router.put(
  "/profile",
  uservalidators.profileValidator,
  authMiddleware.runValidation,
  authMiddleware.protect,
  userController.updateUserProfile
);

/**
 * @access("admin")
 */
router.get(
  "/",
  authMiddleware.protect,
  authMiddleware.isAdmin,
  userController.getUsersList
);
router.get(
  "/:id",
  authMiddleware.protect,
  authMiddleware.isAdmin,
  userController.getUserById
);
router.put(
  "/:id",
  authMiddleware.protect,
  authMiddleware.isAdmin,
  userController.updateUser
);
router.put(
  "/:id",
  authMiddleware.protect,
  authMiddleware.isAdmin,
  userController.updateUser
);

module.exports = router;
