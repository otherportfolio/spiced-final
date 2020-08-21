import React, { useState, useEffect } from "react";
import axios from "./axios_copy.js";

export default function AppFeed(props) {
    const [content, setUserContent] = useState("");
    const [users, setUsers] = useState([]);
    const [friendship, setFriendship] = useState(false);
    const { viewedId } = props;
    console.log("content:", content);
    console.log("users:", users);

    useEffect(() => {
        console.log("AppFeed mounted!!");
        axios.get("/friendship/" + viewedId).then(({ data }) => {
            console.log("results friendship:", data);
            if (data) {
                setFriendship(true);
                axios
                    .get("/feed/" + viewedId)
                    .then(({ data }) => {
                        console.log("DATA in getLastPosts:", data);
                        setUsers(data);
                    })
                    .catch((err) => {
                        console.log("ERROR in axios GET /feed", err);
                    });
            }
        });
    }, []);

    function handleChange(e) {
        setUserContent(e.target.value);
    }

    function newPost(e) {
        axios.post("/newpost", { content, viewedId }).then(({ data }) => {
            if (data) {
                setUsers([data, ...users]);
            }
        });
    }

    return (
        <React.Fragment>
            {/* <h3>Sanity check: AppFeed.js</h3> */}

            <div className="wallpost">
                {" "}
                {users &&
                    users.map((user, id) => {
                        return (
                            <div key={id}>
                                <img className="chat_pic" src={user.url} />
                                <h3>
                                    {user.first} {user.last} {""}
                                </h3>
                                <div className="post_content">
                                    <h3>posted at:</h3> {user.ts}
                                    <br></br> <p>{user.content}</p>
                                </div>
                            </div>
                        );
                    })}
                {friendship && (
                    <div>
                        <textarea
                            className="fetch_post"
                            value={content}
                            type="text"
                            onChange={(e) => handleChange(e)}
                        ></textarea>
                        <button
                            className="post_button"
                            onClick={(e) => newPost(e)}
                        >
                            Send
                        </button>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
}
