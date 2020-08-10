import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";

export default function Logo() {
    return (
        <div className="header_logo">
            {/* <h1>it worked!!</h1> */}
            <div className="nav-bar">
                <BrowserRouter>
                    <Link to="/">
                        <p>Profile</p>
                    </Link>
                    <Link to="/findusers">
                        <p>Find friends</p>
                    </Link>
                    <Link to="/logout">
                        <p>Logout</p>
                    </Link>
                </BrowserRouter>
            </div>
            <img className="logo" src="/images/default.png" alt="big image" />
        </div>
    );
}
// ReactDOM.render(<Logo />, document.querySelector("main"));
