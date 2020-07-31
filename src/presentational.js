import React from "react";

export default function Presentational(props) {
    //here passing the props from App into Presentational
    console.log("props in Presentational:", props);
    let imgUrl = imgUrl || "/images/default.png"; // imgUrl is = to imgUrl if it's defined if it's not (falsy) || serve "deafult.png"
    console.log("imgUrl:", imgUrl);
    //how to get information from App and also have here the props to show
    // Presentational is a child of App, so App must give its child the props
    return (
        <React.Fragment>
            {/* here I'm putting the props into the HTML so it shows on the page */}
            <div onClick={this.iAmAMethodInApp}>
                I am the presentational {props.first} {props.last}{" "}
            </div>
            <img src={props.imgUrl} alt={props.first} />
        </React.Fragment>
    );
}
