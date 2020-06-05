import { ADD_TO_CART_SUCCESS, ADD_TO_CART_FAIL } from "../constants";

const initialState = {
  cartItems: [],
  error: "",
};

export const cartAddReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART_SUCCESS:
      const item = action.payload;
      const qty = item.qty;
      const productExists = state.cartItems.find((x) => x._id === item._id);
      if (productExists) {
        const productIndex = state.cartItems.findIndex(
          (x) => x._id === item._id
        );
        const updatedQty =
          state.cartItems[productIndex].qty + qty <= item.countInStock
            ? state.cartItems[productIndex].qty + qty
            : item.countInStock;
        const updatedItem = {
          ...state.cartItems[productIndex],
          qty: updatedQty,
        };
        state.cartItems.splice(productIndex, 1);
        return {
          ...state,
          cartItems: [...state.cartItems, updatedItem],
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, item],
      };
    case ADD_TO_CART_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
