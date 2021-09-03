import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ReCaptcha = ({ recaptchaRef }) => {
  return (
    <ReCAPTCHA
      ref={recaptchaRef}
      size="invisible"
      sitekey={`${process.env.REACT_APP_RECAPTCHA_KEY}`}
    />
  );
};

export default ReCaptcha;
