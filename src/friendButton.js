import React, { useState, useEffect } from "react";

export function Friendbutton() {
    // will nedd to get passed the ID of the user that is potentially being befriended/defriended/accpet friendship, it will receive this from otherProfile
    //when the component mounts will make an axios.GET request and find out the relationship of the person viewing the profile and the person being viewed, depending on their relationship, the button text should be upadted in state

    //submit, when the button is clicked, we need to either make a postrequest and sedn along  the button text or depenending on the button text we make a request to specific routes, based on what the DB returns in the we want to update the button

    //if defriended the row on a DB will be deleted
    return (
        <div>
            <button> </button>
        </div>
    );
}
