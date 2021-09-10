const express = require("express");
const router = express.Router();
const {
  authUser,
  registerUser,
  GoogleLogin,
} = require("../controllers/authController.js");
const { runValidation } = require("../middlewares/authMiddleware.js");
const {
  signinValidator,
  signupValidator,
} = require("../validators/authValidators.js");

/**
 * @access("guest")
 */
router.post("/signup", signupValidator, runValidation, registerUser);
router.post("/signin", signinValidator, runValidation, authUser);
router.post("/google/user/login", GoogleLogin);

module.exports=router;
