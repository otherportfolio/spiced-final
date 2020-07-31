import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome.js";
import App from "./app.js";

let elem;

if (location.pathname == "./welcome") {
    elem = <Welcome />;
}

ReactDOM.render(<Welcome />, document.querySelector("main"));
