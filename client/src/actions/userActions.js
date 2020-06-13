import axios from "axios";
import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  LOG_OUT,
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
        if (error.response) {
          const { data } = error.response;
          dispatch(signInFail(data));
        }
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
        if (error.response) {
          const { data } = error.response;
          dispatch(registerFail(data));
        }
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    Cookie.remove("userInfo");
    dispatch({ type: LOG_OUT });
  };
};

export const updateRequest = ({
  userId,
  fname,
  lname,
  oldPassword,
  newPassword,
}) => {
  return {
    type: UPDATE_REQUEST,
    payload: {
      userId,
      fname,
      lname,
      oldPassword,
      newPassword,
    },
  };
};

export const updateSuccess = (data) => {
  return {
    type: UPDATE_SUCCESS,
    payload: data,
  };
};

export const updateFail = (error) => {
  return {
    type: UPDATE_FAIL,
    payload: error,
  };
};

export const update = ({ userId, fname, lname, oldPassword, newPassword }) => {
  return (dispatch, getState) => {
    const {
      signIn: { userInfo },
    } = getState();
    dispatch(updateRequest({ userId, fname, lname, oldPassword, newPassword }));
    axios
      .put(
        "/api/users/" + userId,
        { fname, lname, oldPassword, newPassword },
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      )
      .then((res) => {
        const data = res.data;
        dispatch(updateSuccess(data));
        Cookie.set("userInfo", JSON.stringify(data));
      })
      .catch((error) => {
        if (error.response) {
          const { data } = error.response;
          dispatch(updateFail(data));
        }
      });
  };
};
