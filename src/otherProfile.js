import React from "react";
import axios from "axios";
import FriendButton from "./friendButton.js";
import AppFeed from "./feed.js";

class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
        };
    }

    componentDidMount() {
        // const id = this.props.match.params.id;
        console.log("const id:", this.state.id);
        axios.get("/user/" + this.state.id + ".json").then(({ data }) => {
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
        let url = this.state.url || "images/default.png";
        console.log("url otherProfile:", url);
        return (
            <React.Fragment>
                <div className="profile">
                    <div className="user_profile">
                        <div className="user_infos">
                            <img src={url} />
                            <h3>
                                <br></br>
                                HI there! I‘m <br></br>
                                {this.state.first} {this.state.last}
                                <br></br>
                                {this.state.bio}
                            </h3>
                            <FriendButton
                                viewedId={this.props.match.params.id}
                            />
                        </div>
                        <AppFeed viewedId={this.props.match.params.id} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default OtherProfile;
