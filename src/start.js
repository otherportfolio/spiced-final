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
import { init } from "./socket.js";

//! this middleware allow us to use reduxDevTools
//! it's creating the store
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

//todo: //////////// SOCKET.IO ///////////////
let isLoggeidIn = location.pathname != "/welcome";

let elem;

if (isLoggeidIn) {
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
    init(store);
} else {
    elem = <Welcome />;
    //! using the store
    //! Provider Component gives us access to the Global Redux State
    //! store stands for the Global State
    //! therefore only the Components in App will have access to the Global State Redux
}

ReactDOM.render(elem, document.querySelector("main"));
