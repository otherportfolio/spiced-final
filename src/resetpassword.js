import React from "react";
import axios from "./axios_copy.js";
import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1, // yes the user exist, is registered
            // step: 2, // after they submit the second form - they enter the correct code, the password hasn't changed and e-mails match
            // step: 3,
        };
    }

    handleChange(e) {
        // this[e.target.name] = e.target.value
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    submit() {
        axios
            .post("/resetpassword", {
                email: this.state.email,
            })
            .then(({ data }) => {
                if (data.sendEmailSuccess) {
                    this.setState({ step: 2 });
                } else {
                    location.replace("/");
                    this.setState({
                        error: true,
                    });
                }
            });
    }

    reset() {
        axios
            .post("/submitcode", {
                email: this.state.email,
                code: this.state.code,
                password: this.state.password,
            })
            .then(({ data }) => {
                if (data.storePassSuccess) {
                    this, this.setState({ step: 3 });
                } else {
                    location.replace("/");
                    this.setState({
                        error: true,
                    });
                }
            });
    }

    render() {
        const { step } = this.state;
        if (step == 1) {
            return (
                <div>
                    <p>E-mail</p>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="email"
                        placeholder="email"
                    />
                    <p></p>
                    <button onClick={() => this.submit()}>Submit</button>
                </div>
            );
        } else if (step == 2) {
            return (
                <div>
                    <p>Reset Password</p>
                    <p>Code</p>
                    <input onChange={(e) => this.handleChange(e)} name="code" />
                    <p></p>
                    <p>New password</p>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        type="password"
                        name="password"
                    />
                    <p></p>
                    <button onClick={() => this.reset()}>Reset</button>
                </div>
            );
        } else {
            return (
                <div>
                    <p>Reset Password</p>
                    <p>Done!</p>
                    <p>
                        <Link to="/login">Login</Link> with your new Password
                    </p>
                </div>
            );
        }
    }
}
