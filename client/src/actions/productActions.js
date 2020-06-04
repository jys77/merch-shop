import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from "../constants";
import axios from "axios";

export const productListRequest = () => {
  return {
    type: PRODUCT_LIST_REQUEST,
  };
};

export const productListSuccess = (products) => {
  return {
    type: PRODUCT_LIST_SUCCESS,
    payload: products,
  };
};

export const productListFail = (error) => {
  return {
    type: PRODUCT_LIST_FAIL,
    payload: error,
  };
};

export const fetchProductList = () => {
  return (dispatch) => {
    dispatch(productListRequest);
    axios
      .get("/api/products")
      .then((res) => {
        const { products } = res.data;
        dispatch(productListSuccess(products));
      })
      .catch((error) => {
        const errorMsg = error.msg;
        dispatch(productListFail(errorMsg));
      });
  };
};
