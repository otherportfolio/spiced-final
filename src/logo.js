import React from "react";
import ReactDOM from "react-dom";

export default function Logo() {
    return (
        <div>
            <h1>it worked!!</h1>
            <img
                className="logo"
                src="/images/cookie_monster_logo.png"
                alt="big image"
            />
        </div>
    );
}
// ReactDOM.render(<Logo />, document.querySelector("main"));
