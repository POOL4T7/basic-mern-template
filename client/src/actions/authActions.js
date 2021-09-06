import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_RESET,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_GOOGLE_LOGIN_REQUEST,
  USER_GOOGLE_LOGIN_SUCCESS,
  USER_GOOGLE_LOGIN_FAIL,
  USER_LOGIN_RESET,
} from "../constrants/authConstrants";
import axios from "axios";
import { Redirect } from "react-router";

export const register =
  (name, email, password, google_recaptcha_token) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
      const { data } = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
        google_recaptcha_token,
      });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      setTimeout(() => {
        dispatch({ type: USER_REGISTER_RESET });
      }, 3000);
    }
  };

export const login =
  (email, password, google_recaptcha_token) => async (dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
      const { data } = await axios.post("/api/auth/signin", {
        email,
        password,
        google_recaptcha_token,
      });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      setTimeout(() => {
        dispatch({ type: USER_LOGIN_RESET });
      }, 3000);
    }
  };

export const google_login = (tokenId) => async (dispatch) => {
  try {
    dispatch({ type: USER_GOOGLE_LOGIN_REQUEST });
    const { data } = await axios.post("/api/auth/google/user/login", {
      idToken: tokenId,
    });
    dispatch({ type: USER_GOOGLE_LOGIN_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
    Redirect("/");
  } catch (error) {
    dispatch({
      type: USER_GOOGLE_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};
