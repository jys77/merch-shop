import axios from "axios";

import { ADD_TO_CART_SUCCESS, ADD_TO_CART_FAIL } from "../constants";

export const addToCartSuccess = (product, qty) => {
  return {
    type: ADD_TO_CART_SUCCESS,
    payload: {
      ...product,
      qty,
    },
  };
};

export const addToCartFail = (error) => {
  return {
    type: ADD_TO_CART_FAIL,
    payload: error,
  };
};

export const addToCart = (productId, qty) => {
  return (dispatch) => {
    axios
      .get("/api/products/" + productId)
      .then((res) => {
        const product = res.data;
        dispatch(addToCartSuccess(product, qty));
      })
      .catch((error) => {
        const errorMsg = error.msg;
        dispatch(addToCartFail(errorMsg));
      });
  };
};
