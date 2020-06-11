import { ORDER_REQUEST, ORDER_SUCCESS, ORDER_FAIL } from "../constants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_REQUEST:
      return { loading: true };
    case ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
        success: true,
      };
    case ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};
