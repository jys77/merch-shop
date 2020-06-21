import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { GlobalStyle } from "./Global.style";
import { Store } from "./Store";

ReactDOM.render(
  <Provider store={Store}>
    <GlobalStyle />
    <App />
  </Provider>,
  document.getElementById("root")
);
