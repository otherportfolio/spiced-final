import axios from "./axios_copy.js";

export async function receiveFriendsWannabes() {
    return axios.get("/friends-wannabes").then((data) => {
        console.log("data in /friends-wannabes:", data);
        return {
            type: "RECEIVEFRIENDSWANNABES",
            friendsWannabes: data.data,
        };
    });
    // .catch((err) => {
    //     console.log("ERROR in actions - GET /friends-wannabes:", err);
    // });
}

export async function acceptFriendRequest(friends_Id) {
    return axios.post("/accept-friend", { friends_Id }).then((data) => {
        console.log("data in /addfriend:", data);
        return {
            type: "ACCEPTFRIENDREQUEST",
            friends_Id: data.friends_Id,
        };
    });
    // .catch((err) => {
    //     console.log("ERROR in actions - POST /accept-friend:", err);
    // });
}

export async function unfriend(users_Id) {
    return axios.post("/unfriend", { users_Id }).then((data) => {
        console.log("data in /unfriend:", data);
        return {
            type: "UNFRIEND",
            users_Id,
        };
    });
    // .catch((err) => {
    //     console.log("ERROR in actions - POST /unfriend:", err);
    // });
}
