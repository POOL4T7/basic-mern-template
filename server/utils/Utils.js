import jwt from "jsonwebtoken";
import axios from "axios";
import asyncHandler from "express-async-handler";

export const verify_google_reCaptcha = asyncHandler(async (token, res) => {
  if (token) {
    const googleVrifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;
    const { data } = await axios.post(googleVrifyUrl);
    const { success } = data;
    if (!success) {
      res.status(400);
      throw new Error("Failed captcha verification");
    }
  } else {
    throw new Error("something goes to wrong");
  }
});

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
