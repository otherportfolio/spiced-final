import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Uploader from "./uploader";
import Profile from "./profile.js";
import Logo from "./logo.js";
import axios from "./axios_copy.js";
import OtherProfile from "./otherProfile.js";
import FindPeople from "./findPeople.js";
import Friends from "./friends.js";

//! here component loading the users profile picture

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false, //! setting the Uploader to true
        };
        this.toggleModal = this.toggleModal.bind(this); //! binding "this" to the function here so we can use it later in the component
        this.userPicture = this.ProfilePic.bind(this);
    }

    handleChange(e) {
        // this[e.target.name] = e.target.value
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    //! comunicate with the server as soon as the App loads
    //! here contact the server using axios. (new get route on the server "/user")
    //! "/user" should look into the cookies & check for the user_Id
    //! THEN when we get the data back we want to add it to state...
    //! to put the Data got from the Server into "this.state={}" we need to use setState
    //! setState updates the state - attention setState is asynchronous - so for the console.log
    //! add a Callback so it waits for the "this.state" update
    componentDidMount() {
        console.log("App has mounted!!");
        axios.get("/user").then(({ data }) => {
            // console.log("data in App:", data);
            if (data) {
                this.setState(
                    {
                        first: data.first,
                        last: data.last,
                        url: data.url,
                        id: data.id,
                        bio: data.bio,
                    },
                    () => {
                        // console.log("this.state:", this.state);
                    }
                );
            }
        });
    }

    //! these functions are Methods living in App that will be passed to its children (Profile, Uploader. Logo)
    ProfilePic(pic) {
        console.log("ProfilePic:", pic);
        this.setState({
            url: pic,
            uploaderIsVisible: false,
        });
    }

    toggleModal() {
        console.log("toggle Modal is running!");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    bioUpdate(bio) {
        this.setState({
            bio: bio,
        });
    }

    render() {
        return (
            //! avoiding div suits
            <React.Fragment>
                <Logo />
                {/* <h2>Sanity check: App.js</h2> */}
                {/* //! "go find this.toggleModal in the Constructor" */}
                {/* // ! a component inside App component, here Profile is a Child of App.. */}
                {/* // ! ..serving Profile component the props from App */}
                {/* //Todo ////////////////////// PART VI ///////////////////// */}
                <BrowserRouter>
                    {this.state.uploaderIsVisible && (
                        <Uploader url={this.state.url} />
                    )}
                    <div>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    id={this.state.id}
                                    first={this.state.first}
                                    last={this.state.last}
                                    url={this.state.url}
                                    bio={this.state.bio}
                                    toggleModal={(e) => {
                                        this.toggleModal(e);
                                    }}
                                    bioUpdate={(e) => {
                                        this.bioUpdate();
                                    }}
                                />
                            )}
                        />
                    </div>
                    <Route
                        path="/user/:id"
                        render={(props) => (
                            <OtherProfile
                                key={props.match.url}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    />
                    <Route path="/friends" component={Friends} />

                    <Route path="/findusers" component={FindPeople} />
                </BrowserRouter>
            </React.Fragment>
        );
    }
}

// export default App;
