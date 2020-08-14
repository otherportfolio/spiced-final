import axios from "./axios_copy.js";

export async function receiveFriendsWannabes() {
    return axios.get("/friends-wannabes").then((data) => {
        console.log("data in /friends-wannabes:", data);
        return {
            type: "RECEIVEFRIENDSWANNABES",
            friendsWannabes: data.data,
        };
    });
}

export async function acceptFriendRequest(friends_Id) {
    return axios.post("/accept-friend", { friends_Id }).then((data) => {
        console.log("data in /addfriend:", data);
        return {
            type: "ACCEPTFRIENDREQUEST",
            friends_Id: data.friends_Id,
        };
    });
}

export async function unfriend(users_Id) {
    return axios.post("/unfriend", { users_Id }).then((data) => {
        console.log("data in /unfriend:", data);
        return {
            type: "UNFRIEND",
            users_Id,
        };
    });
}
export async function getMessages(msgs) {
    console.log("data in actions.js /getMessages:", msgs);
    return {
        type: "GETMESSAGES",
        lastSent: msgs,
    };
}

export async function getMessage(msg) {
    console.log("data in actions.js /getMessage:", msg);
    return {
        type: "GETMESSAGE",
        newMessages: msg,
    };
}
