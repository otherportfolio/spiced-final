import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome.js";
import App from "./app.js";
//todo: //////////// REDUX BOILER PLATE /////////////////
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";

//! this middleware allow us to use reduxDevTools
//! it's creating the store
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;

if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else {
    //! using the store
    //! Provider Component gives us access to the Global Redux State
    //! store stands for the Global State
    //! therefore only the Components in App will have access to the Global State Redux
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(elem, document.querySelector("main"));
