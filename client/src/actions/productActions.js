import axios from "axios";

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  CATEGORIES_SUCCESS,
  CATEGORIES_FAIL,
} from "../constants";

//Product List
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

export const fetchProductList = (category = "") => {
  return (dispatch) => {
    dispatch(productListRequest);
    axios
      .get("/api/products?category=" + category)
      .then((res) => {
        const product = res.data;
        dispatch(productListSuccess(product));
      })
      .catch((error) => {
        if (error.response) {
          const { data } = error.response;
          dispatch(productListFail(data));
        }
      });
  };
};

//Product Detail
export const ProductDetailRequest = (productId) => {
  return {
    type: PRODUCT_DETAIL_REQUEST,
    payload: productId,
  };
};

export const ProductDetailSuccess = (product) => {
  return {
    type: PRODUCT_DETAIL_SUCCESS,
    payload: product,
  };
};

export const ProductDetailFail = (error) => {
  return {
    type: PRODUCT_DETAIL_FAIL,
    payload: error,
  };
};

export const fetchProductDetail = (productId) => {
  return (dispatch) => {
    dispatch(ProductDetailRequest(productId));
    axios
      .get("/api/products/" + productId)
      .then((res) => {
        const product = res.data;
        dispatch(ProductDetailSuccess(product));
      })
      .catch((error) => {
        if (error.response) {
          const { data } = error.response;
          dispatch(ProductDetailFail(data));
        }
      });
  };
};

export const fetchCategories = () => {
  return (dispatch) => {
    axios
      .get("/api/products/all/category")
      .then((res) => {
        const categories = res.data;
        dispatch({
          type: CATEGORIES_SUCCESS,
          payload: categories,
        });
      })
      .catch((error) => {
        if (error.response) {
          const { data } = error.response;
          dispatch({
            type: CATEGORIES_FAIL,
            payload: data,
          });
        }
      });
  };
};
