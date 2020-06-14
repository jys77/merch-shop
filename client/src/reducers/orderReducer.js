import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
} from "../constants";

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

export const orderDetailsReducer = (
  state = {
    order: {
      orderItems: [],
      shipping: {},
      payment: {},
    },
  },
  action
) => {
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderPayReducer = (
  state = {
    loading: false,
    success: false,
    error: null,
    data: null,
  },
  action
) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
      };
    case ORDER_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const myOrdersReducer = (
  state = {
    orders: [],
    loading: false,
    error: {},
  },
  action
) => {
  switch (action.type) {
    case MY_ORDERS_REQUEST:
      return { loading: true };
    case MY_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case MY_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
