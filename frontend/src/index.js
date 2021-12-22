import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { applyMiddleware, compose, createStore } from "redux";
import reducer from "./store/reducers/auth";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhances(applyMiddleware(thunk)));
const app = (
  <Provider store={store}>
    <App />
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));
