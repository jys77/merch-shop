import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Cookie from "js-cookie";

import {
  productListReducer,
  productDetailReducer,
  sidebarToggleReducer,
  cartReducer,
} from "./reducers";

const cartItems = Cookie.getJSON("cartItems") || [];

const initialState = {
  cart: { cartItems },
};

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  sidebarToggle: sidebarToggleReducer,
  cart: cartReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const Store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
