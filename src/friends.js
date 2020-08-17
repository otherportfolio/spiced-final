import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
    receiveFriendsWannabes,
    acceptFriendRequest,
    unfriend,
} from "./actions.js";
import { Link } from "react-router-dom";

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
            {/* <h3>Sanity check: friends.js</h3> */}
            <div id="friends">
                <div>
                    {friend &&
                        friend.map((user, id) => {
                            return (
                                <div className="friend" key={id}>
                                    <Link to={`/user/${user.id}`} key={id}>
                                        <p>my friends</p>
                                        <img src={user.url} />
                                    </Link>
                                    <p>
                                        {user.first} {user.last}
                                    </p>
                                    <button
                                        onClick={() =>
                                            dispatch(unfriend(user.id))
                                        }
                                    >
                                        <p>Cancel Friendship</p>
                                    </button>
                                </div>
                            );
                        })}
                </div>

                <div>
                    {notfriend &&
                        notfriend.map((notfriend, id) => {
                            return (
                                <div className="friend" key={id}>
                                    <Link to={`/user/${notfriend.id}`} key={id}>
                                        <p>my soon-to-be friends</p>
                                        <img src={notfriend.url} />
                                    </Link>
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
                                        <p>Accept Friendship</p>
                                    </button>
                                </div>
                            );
                        })}
                </div>
            </div>
        </React.Fragment>
    );
}
