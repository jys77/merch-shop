import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../constants";

export const signInReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return {
        loading: true,
      };
    case SIGN_IN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case SIGN_IN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
