import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import {
  productListReducer,
  productDetailReducer,
  sidebarToggleReducer,
} from "./reducers";

const initialState = {};

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  sidebarToggle: sidebarToggleReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const Store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
