import React from "react";
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
            editMode: "edit",
        };
    }
    render() {
        if (this.state.editMode === "read") {
            return <h1>Sanity check: I am the Bio Editor!</h1>;
        } else if (this.state.editMode === "edit") {
            return (
                <div>
                    <textarea defaultValue="hello :)"></textarea>
                    {/* here in the default Value it could be the user's early Bio, do it adding props.bio */}
                </div>
            );
        }
    }
}

export default BioEditor; // import it into Profile
