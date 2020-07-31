import React from "react";
import axios from "./axios_copy.js";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange(e) {
        // this[e.target.name] = e.target.value
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    submit() {
        axios
            .post("/register", {
                first: this.state.first,
                last: this.state.last,
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
                    <div className="error">Oops! You blew it.</div>
                )}
                <p>First Name</p>
                <input onChange={(e) => this.handleChange(e)} name="first" />
                <p>Last Name</p>
                <input onChange={(e) => this.handleChange(e)} name="last" />
                <p>E-mail</p>
                <input onChange={(e) => this.handleChange(e)} name="email" />
                <p>Password</p>

                <input
                    onChange={(e) => this.handleChange(e)}
                    type="password"
                    name="password"
                />
                <p></p>
                <button onClick={(e) => this.submit()}>Submit</button>
            </div>
        );
    }
}
