//import React, {Component, Fragment} from "react";
import React from "react";
import Presentational from "./presentational";
import Uploader from "./uploader";
import Profile from "./profile.js";

//here component loading the users profile picture

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //setting the Uploader to true
            uploaderIsVisible: false,
        };
        this.toggleModal = this.toggleModal.bind(this); //binding "this" to the function here so we can use it later in the component
        this.iAmAMethodInApp = this.iAmAMethodInApp.bind(this);
    }

    //comunicate with the server as soon as the App loads
    componentDidMount() {
        console.log("App has mounted!!");
        //here contact the server using axios. (new get route on the server "/user")
        // "/user" should look into the cookies & check for the user_Id
        // THEN when we get the data back we want to add it to state...
        // to put the Data got from the Server into "this.state={}" we need to use setState
        // setState updates the state - attention setState is asynchronous - so for the console.log
        // add a Callback so it waits for the "this.state" update
        this.setState(
            {
                first: "Pete",
                last: "Anderson",
            },
            () => {
                console.log("this.state:", this.state);
            }
        );
    }

    //demo passing a Method to the child (Uploader)
    iAmAMethodInApp() {}

    //this here work as a Method on the class
    toggleModal() {
        console.log("toggle Modal is running!");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    render() {
        return (
            //avoiding div suits
            <React.Fragment>
                {/* Demo clickhandle to show the uploader function, on Click will call toggleModal */}
                <h1
                    onClick={() => {
                        this.toggleModal();
                    }}
                >
                    Sanity check: App.js
                </h1>
                {/* "go find this.toggleModal in the Constructor" */}
                <p onClick={this.toggleModal}>Hello :)</p>
                {/* a component inside App component */}
                {/* here Presentational is a Child of App */}
                {/* serving Presentational component the props from App */}
                <Presentational
                    first={this.state.first}
                    last={this.state.last}
                    iAmAMethodInApp={this.iAmAMethodInApp} //passing the Method function here, so it becomes a props of Presentational, now Presentational can call that function
                    //we should ALSO bind this one in the Constructor OR use a Callback function
                    // we don't use "this.state" because the Method doesn't live inside "this.state"
                />
                {/* is uploader is visible then show the following Component */}
                {this.state.uploaderIsVisible && <Uploader />}
            </React.Fragment>
        );
    }
}

// export default App;
