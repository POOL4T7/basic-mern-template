import React from "react";
import GoogleLogin from "react-google-login";
import { google_login } from "../actions/authActions";
import { useDispatch } from "react-redux";

const GoogleLoginButton = ({googleButtonText}) => {
  const dispatch = useDispatch();
  const responseGoogle = async (response) => {
    if (response.tokenId) {
      dispatch(google_login(response.tokenId));
    }
  };

  return (
    <GoogleLogin
      clientId={`${process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID}`}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          className="btn btn-outline-danger btn-block"
        >
          <i className="fab fa-google pr-2"></i> {googleButtonText}
        </button>
      )}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleLoginButton;
