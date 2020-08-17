import React from "react";

export default function ProfilePic(props) {
    let { first, last, url, toggleModal } = props;
    //! here passing the props from App into Presentational
    //! console.log("props in ProfilePic:", props);
    url = url || "/images/default.png"; // imgUrl is = to imgUrl if it's defined if it's not (falsy) || serve "deafult.png"
    console.log("url:", url);
    //! how to get information from App and also have here the props to show
    //! Presentational is a child of App, so App must give its child the props
    return (
        <React.Fragment>
            {/* //! here I'm putting the props into the HTML so it shows on the page */}
            <div className="presentational">
                <img
                    className="profile_pic"
                    onClick={toggleModal}
                    src={url}
                    alt={first}
                />
                {/* <h3>
                    {first} {last}
                </h3> */}
            </div>
        </React.Fragment>
    );
}
