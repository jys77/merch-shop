import axios from "axios";
import { SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAIL } from "../constants";
import Cookie from "js-cookie";
export const signInRequest = (email, password) => {
  return {
    type: SIGN_IN_REQUEST,
    payload: {
      email,
      password,
    },
  };
};

export const signInSuccess = (data) => {
  return {
    type: SIGN_IN_SUCCESS,
    payload: data,
  };
};

export const signInFail = (error) => {
  return {
    type: SIGN_IN_FAIL,
    payload: error,
  };
};

export const signIn = (email, password) => {
  return (dispatch) => {
    dispatch(signInRequest(email, password));
    axios
      .post("/api/users/signin", {
        email,
        password,
      })
      .then((res) => {
        const data = res.data;
        dispatch(signInSuccess(data));
        Cookie.set("userInfo", JSON.stringify(data));
      })
      .catch((error) => {
        const errorMsg = error.response.data;
        dispatch(signInFail(errorMsg));
      });
  };
};
