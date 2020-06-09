import { CATEGORIES_SUCCESS, CATEGORIES_FAIL } from "../constants";

export const categoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORIES_SUCCESS:
      return {
        categories: action.payload,
      };
    case CATEGORIES_FAIL:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};
