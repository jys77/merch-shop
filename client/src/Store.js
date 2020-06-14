import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Cookie from "js-cookie";

import {
  productListReducer,
  productDetailReducer,
  sidebarToggleReducer,
  cartReducer,
  signInReducer,
  registerReducer,
  categoryReducer,
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  userUpdateReducer,
  myOrdersReducer,
} from "./reducers";

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;
const shipping = Cookie.getJSON("shipping") || {};
const initialState = {
  cart: { cartItems, shipping },
  signIn: { userInfo },
};

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  sidebarToggle: sidebarToggleReducer,
  cart: cartReducer,
  signIn: signInReducer,
  register: registerReducer,
  categories: categoryReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  userUpdate: userUpdateReducer,
  myOrders: myOrdersReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const Store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
