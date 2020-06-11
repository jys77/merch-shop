import axios from "axios";

import { ORDER_REQUEST, ORDER_SUCCESS, ORDER_FAIL } from "../constants";

export const orderRequest = (data) => {
  return {
    type: ORDER_REQUEST,
    payload: data,
  };
};

export const orderSuccess = (newOrder) => {
  return {
    type: ORDER_SUCCESS,
    payload: newOrder,
  };
};

export const orderFail = (error) => {
  return {
    type: ORDER_FAIL,
    payload: error,
  };
};

export const createOrder = (order) => {
  return async (dispatch, getState) => {
    try {
      dispatch(orderRequest(order));
      const {
        signIn: { userInfo },
      } = getState();
      const {
        data: { data: newOrder },
      } = await axios.post("/api/orders", order, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      });
      dispatch(orderSuccess(newOrder));
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        dispatch(orderFail(data));
      }
    }
  };
};
