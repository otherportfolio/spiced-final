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
                        friend.map((user, id) => {
                            return (
                                <div key={id}>
                                    <p>my friends</p>
                                    <img
                                        className="profile_pic_bigger"
                                        src={user.url}
                                    />
                                    <p>
                                        {user.first}
                                        {user.last}
                                    </p>
                                    <button
                                        onClick={() =>
                                            dispatch(unfriend(user.id))
                                        }
                                    >
                                        Cancel Friendship
                                    </button>
                                </div>
                            );
                        })}
                </div>

                <div className="notfriend">
                    {notfriend &&
                        notfriend.map((notfriend, id) => {
                            return (
                                <div key={id}>
                                    <p>my soon-to-be friends</p>
                                    <img
                                        className="profile_pic_bigger"
                                        src={notfriend.url}
                                    />
                                    <p>
                                        {notfriend.first}
                                        {notfriend.last}
                                    </p>
                                    <button
                                        onClick={() =>
                                            dispatch(
                                                acceptFriendRequest(
                                                    notfriend.id
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
