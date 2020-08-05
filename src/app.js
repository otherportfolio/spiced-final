import React from "react";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile.js";
import Logo from "./logo.js";
import axios from "./axios_copy.js";

//here component loading the users profile picture

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false, //setting the Uploader to true
        };
        this.toggleModal = this.toggleModal.bind(this); //binding "this" to the function here so we can use it later in the component
        this.userPicture = this.ProfilePic.bind(this);
    }

    handleChange(e) {
        // this[e.target.name] = e.target.value
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    //comunicate with the server as soon as the App loads
    componentDidMount() {
        console.log("App has mounted!!");
        axios.get("/user").then(({ data }) => {
            console.log("data in App:", data);
            if (data) {
                this.setState(
                    {
                        first: data.first,
                        last: data.last,
                        url: data.url,
                        id: data.id,
                    },
                    () => {
                        console.log("this.state:", this.state);
                    }
                );
            }
        });

        //here contact the server using axios. (new get route on the server "/user")
        // "/user" should look into the cookies & check for the user_Id
        // THEN when we get the data back we want to add it to state...
        // to put the Data gotten from the Server into "this.state={}" we need to use setState
        // setState updates the state - attention setState is asynchronous - so for the console.log
        // add a Callback so it waits for the "this.state" update
    }

    //demo passing a Method to the child (Uploader)
    ProfilePic(pic) {
        console.log("ProfilePic:", pic);
        this.setState({
            url: pic,
            uploaderIsVisible: false,
        });
    }

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
                <Logo />
                {/* Demo clickhandle to show the uploader function, on Click will call toggleModal */}
                <h2
                // onClick={() => {
                //     this.toggleModal();
                // }}
                >
                    Sanity check: App.js
                </h2>
                {/* "go find this.toggleModal in the Constructor" */}
                {/* <p onClick={this.toggleModal}>Hello :)</p> */}
                {/* a component inside App component */}
                {/* here Presentational is a Child of App */}
                {/* serving Presentational component the props from App */}
                <ProfilePic
                    toggleModal={(e) => {
                        this.toggleModal(e);
                    }}
                    first={this.state.first}
                    last={this.state.last}
                    url={this.state.url}

                    // iAmAMethodInApp={this.iAmAMethodInApp} //passing the Method function here, so it becomes a props of Presentational, now Presentational can call that function
                    //we should ALSO bind this one in the Constructor OR use a Callback function
                    // we don't use "this.state" because the Method doesn't live inside "this.state"
                />
                {/* uploader is visible then show the following Component */}
                {this.state.uploaderIsVisible && (
                    <Uploader url={this.state.url} />
                )}
            </React.Fragment>
        );
    }
}

// export default App;
