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
                            <p>Profile</p>
                        </a>
                        <a href="/friends">
                            <p>Friends</p>
                        </a>
                        <a href="/findusers">
                            <p>Find friends</p>
                        </a>
                        <a href="/chat">
                            <p>Chatroom</p>
                        </a>

                        {/* //! since logout isn‘t a component no need to use Link */}
                        <a href="/logout">
                            <p>Logout</p>
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
