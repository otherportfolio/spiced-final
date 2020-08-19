import React from "react";
import { BrowserRouter } from "react-router-dom";

export default function Logo(props) {
    console.log("props in Logo:", props);
    return (
        <React.Fragment>
            <div className="header_logo">
                {/* <h1>it worked!!</h1> */}
                <div className="nav-bar">
                    <BrowserRouter>
                        <a href="/">
                            <h2>Profile</h2>
                        </a>
                        <a href="/friends">
                            <h2>Library</h2>
                        </a>
                        {/* //! since logout isn‘t a component no need to use Link */}
                        <a href="/logout">
                            <h2>Logout</h2>
                        </a>
                    </BrowserRouter>
                </div>
                <img
                    className="logo"
                    src="/images/default.png"
                    alt="big image"
                />
            </div>
        </React.Fragment>
    );
}
// ReactDOM.render(<Logo />, document.querySelector("main"));
