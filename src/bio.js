import React from "react";
import axios from "./axios_copy.js";
//here we want to conditionally render 3 things:
//app.js loads Profile, Profile renders Bio
//if the user doesn't have a Bio, add a button or default text
//or have an Editor, the user puts information and when it clicks send it changes the state
// on Click make a post request and send the new Bio
// component then knows it worked and should go back into "read" mode
// but app.js is rendering it, so app needs to be aware if the Bio was changed

class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: "read",
            value: this.props.bio,
        };
    }
    handleChange(e) {
        // this[e.target.name] = e.target.value
        this.setState({
            value: e.target.value,
        });
    }
    toggleBio() {
        this.setState({
            editMode: "edit",
        });
    }

    postBio(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append("bio", this.state.value);
        axios.post("/editbio", { bio: this.state.value }).then(({ data }) => {
            console.log("data in postBio:", data);
            // this.props.updateBio(data.data);
            if (data) {
                this.setState({
                    editMode: "read",
                });
            }
        });
    }
    editBio() {
        this.setState({
            editMode: "edit",
        });
    }

    render() {
        if (this.state.editMode === "read") {
            return (
                <React.Fragment>
                    <button onClick={() => this.toggleBio()}>Edit</button>
                </React.Fragment>
            );
        } else if (this.state.editMode === "edit") {
            return (
                <React.Fragment>
                    <textarea
                        value={this.state.value}
                        name="editbio"
                        onChange={(e) => this.handleChange(e)}
                        defaultValue={this.props.bio}
                    ></textarea>
                    <button onClick={(e) => this.postBio(e)}>Send</button>

                    {/* here in the default Value it could be the user's early Bio, do it adding props.bio */}
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <textarea
                        name="editbio"
                        onChange={(e) => this.handleChange(e)}
                        defaultValue="add Bio"
                    ></textarea>
                    <button onClick={(e) => this.editBio(e)}>Add</button>
                </React.Fragment>
            );
        }
    }
}

export default BioEditor; // import it into Profile
