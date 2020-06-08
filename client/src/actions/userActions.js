import axios from "axios";
import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../constants";
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

export const registerRequest = (email, password) => {
  return {
    type: REGISTER_REQUEST,
    payload: {
      email,
      password,
    },
  };
};

export const registerSuccess = (data) => {
  return {
    type: REGISTER_SUCCESS,
    payload: data,
  };
};

export const registerFail = (error) => {
  return {
    type: REGISTER_FAIL,
    payload: error,
  };
};

export const register = (fname, lname, email, password) => {
  return (dispatch) => {
    dispatch(registerRequest(fname, lname, email, password));
    axios
      .post("/api/users/register", { fname, lname, email, password })
      .then((res) => {
        const data = res.data;
        dispatch(registerSuccess(data));
        Cookie.set("userInfo", JSON.stringify(data));
      })
      .catch((error) => {
        const errorMsg = error.response.data;
        dispatch(registerFail(errorMsg));
      });
  };
};
