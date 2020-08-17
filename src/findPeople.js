import React, { useState, useEffect } from "react";
import axios from "./axios_copy.js";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [userInput, setUserInput] = useState("");
    const [users, setUsers] = useState([]);

    console.log("users:", users);

    useEffect(() => {
        console.log("FindPoeple mounted!!!");
        axios
            .get("/searchusers")
            .then(({ data }) => {
                console.log("data in findPeople:", data);
                setUsers(data);
            })
            .catch((err) => {
                console.log("ERROR in axios GET /searchusers:", err);
            });
    }, []);

    useEffect(() => {
        if (userInput) {
            axios
                .get(`/search/${userInput}`)
                .then(({ data }) => {
                    console.log(userInput);
                    console.log("data in axios /search/userInput", data);
                    setUsers(data);
                })
                .catch((err) => {
                    console.log("ERROR in axios GET /search/userInput:", err);
                });
        } else {
            return setUsers([]);
        }
    }, [userInput]);

    const handleChange = (e) => {
        setUserInput(e.target.value);
    };

    return (
        <React.Fragment>
            <div className="input_field">
                <p>who else is here?</p>
                <input value={userInput} type="text" onChange={handleChange} />
            </div>
            <div className="user_search">
                {users &&
                    users.map((user, id) => {
                        return (
                            <div key={id}>
                                <Link to={`/user/${user.id}`} key={id}>
                                    <img
                                        className="profile_pic_search"
                                        src={user.url}
                                    />
                                    <p>
                                        {user.first} {user.last}
                                    </p>
                                </Link>
                            </div>
                        );
                    })}
            </div>
        </React.Fragment>
    );
}
