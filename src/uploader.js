import React from "react";
import axios from "./axios_copy.js";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange(e) {
        // this[e.target.name] = e.target.value
        this.setState({
            file: e.target.files[0],
        });
    }

    upload(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append("file", this.state.file);
        axios.post("/upload", formData).then(({ data }) => {
            if (data) {
                this.setState(
                    {
                        url: data.url,
                    },
                    () => {
                        console.log("this.state in Uploader:", this.state);
                    }
                );
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <h1>Sanity check: uploader</h1>
                <div className="upload">
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="file"
                        type="file"
                        accept="image/*"
                    />
                    <button onClick={(e) => this.upload(e)}>Upload</button>
                </div>
            </React.Fragment>
        ); //should be a file select (like in the image board) which will be then sent to the server
        //send to the server, the server to the amazon server, figure the url, serves takes the link back, puts it into the table (database) and return it to the component
        // make an axios request and should call toggleModal, but since Uploader is a child of App it cannot call function on the Parent
        //
    }
}

// export default Uploader;React.
