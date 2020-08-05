import React from "react";
import Registration from "./register.js";
import { HashRouter, Route } from "react-router-dom";
import Login from "./login.js";
import ResetPassword from "./resetpassword.js";
import ProfilePic from "./profilepic.js";

export default function Welcome() {
    return (
        <div>
            <h1>Welcome to</h1>
            <img src="/images/cookie_monster_sad.png" alt="big image" />
            {/* <Registration /> */}
            <HashRouter>
                <div id="res_login">
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/resetpassword" component={ResetPassword} />
                    <Route path="/user" component={ProfilePic} />
                </div>
            </HashRouter>
        </div>
    );
}
