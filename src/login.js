import React from "react";
import axios from "./axios_copy.js";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange(e) {
        // will get the prop by its name and update its value
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    submit() {
        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password,
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch(() =>
                this.setState({
                    error: true,
                })
            );
    }

    render() {
        return (
            <div>
                {this.state.error && (
                    <div className="error">
                        Oops! Something went wrong. Try again.
                    </div>
                )}

                <p>E-mail</p>
                <input onChange={(e) => this.handleChange(e)} name="email" />
                <p>Password</p>

                <input
                    onChange={(e) => this.handleChange(e)}
                    type="password"
                    name="password"
                />
                <p></p>
                <button onClick={(e) => this.submit()}>Login</button>
                <p></p>
                <Link to="/resetpassword">Reset password</Link>
            </div>
        );
    }
}

// export default ;
