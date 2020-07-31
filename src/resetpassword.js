import React from "react";
import axios from "axios_copy.js";
import {Link} from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            step: 1, // yes the user exist, is registered
            step: 2, // after they submit the second form - they enter the correct code, the password hasn't changed and e-mails match
            step: 3,
        };
    }
render() {
    const {step} = this.state;
    if (step == 1) {
        return (
            <di></di>
        )
    } else if (step == 2) {
        return (
            <div></div>
        )
    } else {
        return (
        <div></div>
    )
    }

    }
}