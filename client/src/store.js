import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userRegisterReducer,
  userLoginReducer,
  googleLoginReducer,
} from "./reducers/authReducers";

import {
  userDetailsReducer,
  userListReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userGoogleLogin: googleLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userProfileUpdate: userUpdateProfileReducer,
  userList: userListReducer,
  userUpdate: userUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
