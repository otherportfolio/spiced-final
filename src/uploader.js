import React from "react";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return <h1>Sanity check: uploader</h1>; //should be a file select (like in the image board) which will be then sent to the server
        //send to the server, the serve to the amazon server, figure the url, serves takes the link back, puts it into the table (database) and return it to the component
        // make an axios request and should call toggleModal, but since Uploader is a child of App it cannot call function on the Parent
        //
    }
}

// export default Uploader;React.
