import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import burgerBuilderReducer from "./store/reducers/burgerBuilder";
import authReducer from "./store/reducers/auth";
import ordersReducer from "./store/reducers/orders";
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from "redux-thunk";

const reducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  auth : authReducer,
  orders : ordersReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
