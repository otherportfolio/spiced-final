import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";
import ProfilePic from "./profilepic.js";

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

                        {/* //! since logout isn‘t a component no need to use Link */}
                        <a href="/logout">
                            <p>Logout</p>
                        </a>

                        {/* //! added later */}

                        <ProfilePic
                            toggleModal={(e) => {
                                props.toggleModal(e);
                            }}
                            url={props.url}
                        />
                        <div className="presentational">
                            <img
                                className="profile_pic"
                                onClick={() => {
                                    props.toggleModal();
                                }}
                                src={props.url}
                                alt={props.first}
                            />
                        </div>
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
