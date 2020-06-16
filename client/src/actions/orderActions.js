import axios from "axios";
import Cookie from "js-cookie";
import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
} from "../constants";

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
        signIn: { userInfo: userInfoSignIn },
      } = getState();
      const {
        register: { userInfo: userInfoRegister },
      } = getState();
      const userInfo = userInfoSignIn || userInfoRegister;
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

export const orderDetailRequest = (orderId) => {
  return {
    type: ORDER_DETAIL_REQUEST,
    payload: orderId,
  };
};

export const orderDetailSuccess = (data) => {
  return {
    type: ORDER_DETAIL_SUCCESS,
    payload: data,
  };
};

export const orderDetailFail = (error) => {
  return {
    type: ORDER_DETAIL_FAIL,
    payload: error,
  };
};

export const detailsOrder = (orderId) => {
  return async (dispatch, getState) => {
    try {
      dispatch(orderDetailRequest(orderId));
      const {
        signIn: { userInfo: userInfoSignIn },
      } = getState();
      const {
        register: { userInfo: userInfoRegister },
      } = getState();
      const userInfo = userInfoSignIn || userInfoRegister;
      const { data } = await axios.get("/api/orders/" + orderId, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      });
      dispatch(orderDetailSuccess(data));
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        dispatch(orderDetailFail(data));
      }
    }
  };
};

export const orderPayRequest = (id) => {
  return {
    type: ORDER_PAY_REQUEST,
    payload: id,
  };
};

export const orderPaySuccess = (data) => {
  return {
    type: ORDER_PAY_SUCCESS,
    payload: data,
  };
};

export const orderPayFail = (error) => {
  return {
    type: ORDER_PAY_FAIL,
    payload: error,
  };
};

export const payOrder = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(orderPayRequest(id));
      const {
        signIn: { userInfo },
      } = getState();
      const { data } = await axios.put("/api/orders/" + id + "/pay", id, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      });
      dispatch(orderPaySuccess(data));
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        dispatch(orderPayFail(data));
      }
    }
  };
};

export const myOrdersRequest = () => {
  return {
    type: MY_ORDERS_REQUEST,
  };
};

export const myOrdersSuccess = (data) => {
  return {
    type: MY_ORDERS_SUCCESS,
    payload: data,
  };
};

export const myOrdersFail = (error) => {
  return {
    type: MY_ORDERS_FAIL,
    payload: error,
  };
};

export const myOrders = () => {
  return (dispatch) => {
    dispatch(myOrdersRequest());
    const userInfo = Cookie.getJSON("userInfo");
    axios
      .get("/api/orders/mine/orders", {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      })
      .then((res) => {
        const data = res.data;
        dispatch(myOrdersSuccess(data));
      })
      .catch((error) => {
        if (error.response) {
          const { data } = error.response;
          dispatch(myOrdersFail(data));
        }
      });
  };
};
