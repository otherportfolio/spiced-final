import React, { useState, useEffect } from "react";
import axios from "./axios_copy.js";

export default function SideMenu() {
    const [index, setIndex] = useState([]);
    useEffect(() => {
        console.log("SideMenu mounted!!");

        axios.get("/api/sidemenu").then(({ data }) => {
            console.log("results data in SideMenu:", data);

            setIndex(data);
        });
    }, []);
    return (
        <React.Fragment>
            <div>
                {index &&
                    index.map((idx, id) => {
                        return (
                            <div key={id}>
                                <div className="sidemenu_parent">
                                    <div className="sidemenu_nr">
                                        {idx.issue_nr}
                                    </div>
                                    <div className="sidemenu_month">
                                        {idx.issue_month}
                                    </div>
                                    <div className="sidemenu_title">
                                        {idx.issue_title}
                                    </div>
                                    <div className="sidemenu_index">
                                        {idx.issue_index}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </React.Fragment>
    );
}
