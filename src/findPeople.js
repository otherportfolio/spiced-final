import React, { useState, useEffect } from "react";
import axios from "./axios_copy.js";

export default function FindPeople() {
    const [userInput, setUserInput] = useState(" ");
    const [users, setUsers] = useState([]);
    // console.log("users:", users);
    // console.log("useState:", useState([]));
    // const returnedArray = Array.from(users);
    console.log("users:", users);

    useEffect(() => {
        console.log("FindPoeple mounted!!!");
        axios
            .get("/searchusers")
            .then(({ data }) => {
                console.log("data in findPeople:", data);
                setUsers(data.data);
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
                    setUsers(data.data);
                })
                .catch((err) => {
                    console.log("ERROR in axios GET /search/userInput:", err);
                });
        } else {
            return;
        }

        setUsers("");
    }, [userInput]);

    const handleChange = (e) => {
        setUserInput(e.target.value);
    };

    return (
        <React.Fragment>
            <div>
                <input
                    value={userInput}
                    name="search"
                    onChange={handleChange}
                />
            </div>

            <div>
                {users &&
                    users.map((user, id) => {
                        return (
                            <div key={id} className="search_user">
                                <ul>
                                    <li>
                                        {user.first} {user.last}
                                    </li>
                                </ul>
                            </div>
                        );
                    })}
            </div>
        </React.Fragment>
    );
}
