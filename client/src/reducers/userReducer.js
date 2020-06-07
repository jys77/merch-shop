import { SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAIL } from "../constants";

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
