import React from "react";
import axios from "axios";
import FriendButton from "./friendButton.js";
import Logo from "./logo.js";

class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        console.log("const id:", id);
        axios.get("/user/" + id + ".json").then(({ data }) => {
            console.log("data in otherProfile:", data);
            if (data.sameId) {
                this.props.history.push("/");
            } else {
                this.setState(
                    {
                        first: data.first,
                        last: data.last,
                        url: data.url,
                        bio: data.bio,
                    },
                    () => {
                        console.log("this.state in otherProfile:", this.state);
                    }
                );
            }
        });
    }
    render() {
        return (
            <React.Fragment>
                <div className="profile">
                    {/* <Logo /> */}
                    {/* <div className="presentational">
                        <img
                            className="profile_pic"
                            src={this.state.url}
                            alt={this.state.first}
                        />
                    </div> */}
                    <div className="user_profile">
                        <img
                            className="profile_pic_bigger"
                            src={this.state.url}
                        />
                        <div className="user_infos">
                            {" "}
                            <h3>
                                {this.state.first} {this.state.last}
                            </h3>
                            <h3>{this.state.bio}</h3>
                            <p></p>
                        </div>
                        <p></p>
                        <FriendButton viewedId={this.props.match.params.id} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default OtherProfile;
