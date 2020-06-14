import axios from "axios";
import Cookie from "js-cookie";

import {
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  CART_NUM_CHANGE,
  REMOVE_FROM_CART,
  SAVE_SHIPPING,
  CLEAN_CART,
} from "../constants";

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
  return (dispatch, getState) => {
    axios
      .get("/api/products/" + productId)
      .then((res) => {
        const product = res.data;
        dispatch(addToCartSuccess(product, qty));
      })
      .catch((error) => {
        if (error.response) {
          const { data } = error.response;
          dispatch(addToCartFail(data));
        }
      });
    const {
      cart: { cartItems },
    } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
  };
};

export const cartNumChangeSuccess = (product, qty) => {
  return {
    type: CART_NUM_CHANGE,
    payload: {
      ...product,
      qty,
    },
  };
};

export const cartNumChange = (productId, qty) => {
  return (dispatch, getState) => {
    axios
      .get("/api/products/" + productId)
      .then((res) => {
        const product = res.data;
        dispatch(cartNumChangeSuccess(product, qty));
      })
      .catch((error) => {
        if (error.response) {
          const { data } = error.response;
          dispatch(addToCartFail(data));
        }
      });
    const {
      cart: { cartItems },
    } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
  };
};

export const removeFromCart = (productId) => {
  return (dispatch, getState) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: productId,
    });
    const {
      cart: { cartItems },
    } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
  };
};

export const cleanCart = () => {
  return (dispatch) => {
    Cookie.set("cartItems", []);
    dispatch({
      type: CLEAN_CART,
    });
  };
};

export const saveShipping = (data) => {
  return (dispatch, getState) => {
    dispatch({
      type: SAVE_SHIPPING,
      payload: data,
    });
    const {
      cart: { shipping },
    } = getState();
    Cookie.set("shipping", JSON.stringify(shipping));
  };
};
