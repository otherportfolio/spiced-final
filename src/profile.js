import React from "react";
import BioEditor from "./bio.js";
import ProfilePic from "./profilepic.js";
import Uploader from "./uploader.js";

////////////////////// PART V /////////////////////

export default function Profile(props) {
    console.log("props in Profile:", props);
    return (
        <React.Fragment>
            <div className="profile">
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
                <div className="user_profile">
                    <img className="profile_pic_bigger" src={props.url} />
                    <div className="user_infos">
                        {" "}
                        <h3>
                            {props.first} {props.last}
                        </h3>
                        <h3>{props.bio}</h3>
                        <BioEditor bio={props.bio} />
                    </div>
                </div>
                {/* app.js knows the user's first and last name, so to acess it we use props, and pass them to the argument */}
                {/* then give inside the Compnent the props that we need, ex: */}{" "}
            </div>
        </React.Fragment>
    );
}
