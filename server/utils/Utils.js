const jwt = require("jsonwebtoken");
const axios = require("axios");
const ApiError = require("./ApiError.js");

exports.verify_google_reCaptcha = async (token) => {
  if (token) {
    const googleVrifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;
    const { data } = await axios.post(googleVrifyUrl);
    const { success } = data;
    if (!success) {
      throw new ApiError(400, "Failed captcha verification");
    }
  } else {
    throw new ApiError(500, "something goes to wrong");
  }
};

exports.returnUserWithToken = (user) => {
  return {
    _id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    status: user.status,
    token: generateToken(user._id),
  };
};

exports.returnUserWithoutToken = (user) => {
  return {
    _id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    status: user.status,
  };
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
