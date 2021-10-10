const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");
const { authMiddleware } = require("../middlewares");
const { uservalidators } = require("../validators");

/**
 * @access("user")
 */
router
  .route("/profile")
  .get(authMiddleware.protect, userController.userProfile)
  .post(
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

router
  .route("/:id")
  .get(
    authMiddleware.protect,
    authMiddleware.isAdmin,
    userController.getUserDetailsById
  )
  .put(
    authMiddleware.protect,
    authMiddleware.isAdmin,
    userController.updateUser
  );

module.exports = router;
