import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
    receiveFriendsWannabes,
    acceptFriendRequest,
    unfriend,
} from "./actions.js";

export default function Friends() {
    const dispatch = useDispatch();

    const friend = useSelector(
        (state) =>
            state.friendsWannabes &&
            state.friendsWannabes.filter((friends) => friends.accepted == true)
    );

    const notfriend = useSelector(
        (state) =>
            state.friendsWannabes &&
            state.friendsWannabes.filter(
                (notfriend) => notfriend.accepted == false
            )
    );
    console.log("friend:", friend);
    console.log("notfriend:", notfriend);

    useEffect(() => {
        console.log("friends component did mount!");
        dispatch(receiveFriendsWannabes());
    }, []);

    return (
        <React.Fragment>
            <h3>Sanity check: friends.js</h3>
            <div id="friends">
                <div className="friend">
                    {friend &&
                        friend.map((eachFriend, id) => {
                            return (
                                <div key={id}>
                                    <img src={friend[0].url} />
                                    <p>
                                        {friend.first}
                                        {friend.last}
                                    </p>
                                    <button
                                        onClick={() =>
                                            dispatch(unfriend(friend[0].id))
                                        }
                                    >
                                        Cancel Friendship
                                    </button>
                                </div>
                            );
                        })}
                </div>
            </div>

            <div id="wannabes">
                <div className="notfriend">
                    {notfriend &&
                        notfriend.map((eachnoFriend, id) => {
                            return (
                                <div key={id}>
                                    <img src={notfriend[0].url} />
                                    <p>
                                        {notfriend.first}
                                        {notfriend.last}
                                    </p>
                                    <button
                                        onClick={() =>
                                            dispatch(
                                                acceptFriendRequest(
                                                    notfriend[0].id
                                                )
                                            )
                                        }
                                    >
                                        Accept Friendship
                                    </button>
                                </div>
                            );
                        })}
                </div>
            </div>
        </React.Fragment>
    );
}
