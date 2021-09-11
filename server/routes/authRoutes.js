const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const { authMiddleware } = require("../middlewares");
const { authvalidators } = require("../validators");

/**
 * @access("guest")
 */
router.post(
  "/signup",
  authvalidators.signupValidator,
  authMiddleware.runValidation,
  authController.registerUser
);

router.post(
  "/signin",
  authvalidators.signinValidator,
  authMiddleware.runValidation,
  authController.authUser
);

router.post("/google/user/login", authController.GoogleLogin);

module.exports = router;
