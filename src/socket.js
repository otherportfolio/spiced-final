import * as io from "socket.io-client";
import { getMessages, getMessage } from "./actions";

export let socket;
console.log("socket:", socket);

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
        socket.on("getMessages", (msgs) => {
            console.log("messages in Socket:", msgs);
            return store.dispatch(
                // 👇 result of this action: an array containing 10 chat messages should be present in the global state object.
                getMessages(msgs)
            );
        });

        socket.on("getMessage", (msg) => {
            console.log("getMessage:", msg);
            return store.dispatch(
                // 👇 result of this action: the global state object's array of messages should be replaced with a new array that contains all of the message that were in the old array plus one more.
                getMessage(msg)
            );
        });
    }
};
