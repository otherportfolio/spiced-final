import React, { useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "./socket.js";

export default function chatMessages() {
    const [message, setMessage] = useState("");
    console.log("message:", message);
    const chat = useSelector((state) => state.getMessages);
    console.log("chat:", chat);

    // useEffect(() => {
    //     console.log("ChatMessage did mount!");
    // }, [chat]);

    return (
        <React.Fragment>
            <div className="chat_parent">
                <h1>Sanity check: Chat.js!</h1>
                <div>
                    {chat &&
                        chat.map((user, id) => {
                            return (
                                <div className="message_board" key={id}>
                                    <img className="chat_pic" src={user.url} />
                                    {/* <p>
                                        {user.first} {""}
                                        {user.last} :
                                    </p> */}
                                    <p className="message_bubble">
                                        {user.first} {""}
                                        {user.last} : {user.message}
                                    </p>
                                </div>
                            );
                        })}
                </div>

                <div className="chat">
                    <textarea
                        className="chat_textarea"
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    <button onClick={() => socket.emit("getMessage", message)}>
                        Send
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
}
