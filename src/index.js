import "./styles/index.scss";

import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import App from "./scripts/components/app/app";
import reducer from "./scripts/store/reducer";
import {pullCurrencyRates} from "./scripts/middlewares/thunk";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
);

Promise.resolve(store.dispatch(pullCurrencyRates()))
  .then(() => {
    ReactDOM.render(
        (
          <Provider store={store}>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </Provider>
        ),
        document.getElementById(`root`)
    );
  });
