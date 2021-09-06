import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_RESET,
  USER_GOOGLE_LOGIN_REQUEST,
  USER_GOOGLE_LOGIN_SUCCESS,
  USER_GOOGLE_LOGIN_FAIL,
  USER_LOGIN_RESET,
} from "../constrants/authConstrants";

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_REGISTER_RESET:
      return { loading: false, error: null };
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGIN_RESET:
      return { loading: false, error: null };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const googleLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_GOOGLE_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_GOOGLE_LOGIN_SUCCESS:
      return { loading: false, success: true };
    case USER_GOOGLE_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
