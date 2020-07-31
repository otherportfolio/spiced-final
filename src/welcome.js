import React from "react";
import ReactDOM from "react-dom";
import Registration from "./register.js";
import { HashRouter, Route } from "react-router-dom";
import Login from "./login.js";

export default function Welcome() {
    return (
        <div>
            <h1>Welcome to</h1>
            <img src="/images/cookie_monster_sad.png" alt="big image" />
            {/* <Registration /> */}
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
