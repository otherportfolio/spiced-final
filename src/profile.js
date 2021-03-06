import React from "react";
import BioEditor from "./bio.js";
import ProfilePic from "./profilepic.js";
import Uploader from "./uploader.js";
import AppFeed from "./feed.js";

//Todo ////////////////////// PART V /////////////////////

export default function Profile(props) {
    console.log("props in Profile:", props);
    return (
        <React.Fragment>
            <ProfilePic
                toggleModal={(e) => {
                    props.toggleModal(e);
                }}
                url={props.url}
            />
            <div className="presentational">
                <img
                    className="profile_pic"
                    onClick={() => {
                        props.toggleModal();
                    }}
                    src={props.url}
                    alt={props.first}
                />
                {props.uploaderIsVisible && <Uploader url={props.url} />}
            </div>

            <div className="profile">
                <div className="user_profile">
                    <div className="user_infos">
                        <img src={props.url} />{" "}
                        <h3>
                            HI there! I‘m <br></br> {props.first} {props.last}
                            <br></br>
                            {props.bio}
                        </h3>
                        <BioEditor bio={props.bio} />
                    </div>
                    {/* <AppFeed /> */}
                </div>

                {/*  //! app.js knows the user's first and last name, so to acess it
                // ! we use props, and pass them to the argument * then give
                //! inside the Component the props that we need, ex:{" "} */}
            </div>
        </React.Fragment>
    );
}
