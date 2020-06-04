import { TOGGLE_SIDEBAR } from "../constants";

const initialState = {
  show: false,
};

export const sidebarToggleReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        show: !state.show,
      };
    default:
      return state;
  }
};
