import React from "react";
import ReactDOM from "react-dom";
import Registration from "./register.js";

export default function Welcome() {
    return (
        <div>
            <h1>Welcome to</h1>
            <img src="/images/cookie_monster_sad.png" alt="logo" />
            <Registration />
        </div>
    );
}
ReactDOM.render(<Registration />, document.querySelector("main"));
