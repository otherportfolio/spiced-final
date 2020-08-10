import React, { useState, useEffect } from "react";
import axios from "./axios_copy.js";

export default function FriendButton(props) {
    const [button, setButton] = useState("");
    console.log("button:", button);
    const { viewedId } = props;
    console.log("props", props);

    // will nedd to get passed the ID of the user that is potentially being befriended/defriended/accpet friendship, it will receive this from otherProfile
    //when the component mounts will make an axios.GET request and find out the relationship of the person viewing the profile and the person being viewed, depending on their relationship, the button text should be upadted in state

    useEffect(() => {
        console.log("FriendButton has mounted!");
        console.log("viewedId", viewedId);
        axios.get(`/users/${viewedId}`).then(({ data }) => {
            console.log("data in GET FriendButton:", data);
            if (data.sameId) {
                props.history.push("/");
            } else if (data) {
                setButton(data.button);
            }
        });
    }, []);

    //!submit, when the button is clicked,
    //!make a postrequest and send along the button text or
    //!depenending on the button text we make a request to specific routes,
    //!based on what the DB returns in, we want to update the button

    //!if defriended: row on DB will be deleted
    const handleChange = () => {
        axios
            .post("/addfriend", { button, viewedId })
            .then(() => {
                // console.log("button:", button);
                if (button === "Add friend") {
                    //! add row
                    setButton("cancel request");
                    // console.log("button:", button);
                } else if (button === "cancel request") {
                    //! delete row
                    setButton("Add friend");
                    // console.log("button:", button);
                } else if (button === "accept request") {
                    //! update row
                    setButton("cancel friend");
                    // console.log("button:", button);
                } else if (button === "cancel friend") {
                    //! delete row
                    setButton("Add friend");
                }
            })
            .catch((err) => {
                console.log("ERROR in POST /addfriend", err);
            });
    };
    return (
        <React.Fragment>
            <div>
                <button onClick={handleChange}>{button}</button>
            </div>
        </React.Fragment>
    );
}
