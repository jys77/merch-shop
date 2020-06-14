import {
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  CART_NUM_CHANGE,
  REMOVE_FROM_CART,
  SAVE_SHIPPING,
  CLEAN_CART,
} from "../constants";

const initialState = {
  cartItems: [],
  error: "",
  shipping: {},
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART_SUCCESS:
      const item = action.payload;
      const qty = item.qty;
      const productExists = state.cartItems.find((x) => x._id === item._id);
      if (productExists) {
        const updatedCartItems = state.cartItems.map((x) =>
          x._id !== item._id
            ? x
            : {
                ...item,
                qty:
                  x.qty + qty <= item.countInStock
                    ? x.qty + qty
                    : item.countInStock,
              }
        );
        return {
          ...state,
          cartItems: updatedCartItems,
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
    case CART_NUM_CHANGE:
      const cartItem = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.map((x) =>
          x._id === cartItem._id ? cartItem : x
        ),
      };
    case REMOVE_FROM_CART:
      const productId = action.payload;
      const updatedCartItems = state.cartItems.filter(
        (x) => x._id !== productId
      );
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    case CLEAN_CART:
      return {
        ...state,
        cartItems: [],
      };
    case SAVE_SHIPPING:
      return {
        ...state,
        shipping: action.payload,
      };

    default:
      return state;
  }
};
