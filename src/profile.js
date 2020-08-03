import React, { Component } from "react";
import BioEditor from "./bio.js";

////////////////////// PART V /////////////////////

export default function Profile(props) {
    console.log("props:", props);
    return (
        <div>
            <h1>I am a profile pic</h1>
            {/* app.js knows the user's first and last name, so to acess it we use props, and pass them to the argument */}
            {/* then give inside the Compnent the props that we need, ex: */}
            <Component
                first={props.first}
                last={props.last}
                image={props.image}
            />
            <BioEditor />
        </div>
    );
}
