import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";

export default function Logo(props) {
    console.log("props in Logo:", props);
    return (
        <div className="header_logo">
            {/* <h1>it worked!!</h1> */}
            <div className="nav-bar">
                <BrowserRouter>
                    <a href="/">
                        <p>Profile</p>
                    </a>
                    <a href="/findusers">
                        <p>Find friends</p>
                    </a>

                    {/* //! since logout isn‘t a component no need to use Link */}
                    <a href="/logout">
                        <p>Logout</p>
                    </a>

                    {/* //! added later */}
                    {/* <Link to="/"> */}
                    {/* <ProfilePic
                        first={props.first}
                        last={props.last}
                        // onClick={props.toggleModal}
                        src={props.url}
                        alt={props.first}
                        className="profile_pic"
                    /> */}
                    {/* </Link> */}
                </BrowserRouter>
            </div>
            <img className="logo" src="/images/default.png" alt="big image" />
        </div>
    );
}
// ReactDOM.render(<Logo />, document.querySelector("main"));
