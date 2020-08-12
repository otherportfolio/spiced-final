//! should only be ONE reducer function
//! the reducer function will NEVER be explicitly called in the code, so will never be a "reducer()"
//! this function is automatically invoked by Redux

//! Syntax: if the first Arg passed to reducer is defined, store that in the state = {}
//! this Syntax creates our state, which is initially empty

//! second Arg action: will determine which changes will be made to the state
//! this function will consist in a "collection" of "if" statements i.e.
//! if(action === "action_1"){
//! do something
//! }

//todo: ///////// REDUCER FUNCTION ////////////

export default function (state = {}, action) {
    if (action.type == "RECEIVEFRIENDSWANNABES") {
        state = { ...state, friendsWannabes: action.friendsWannabes };
    }
    if (action.type == "ACCEPTFRIENDREQUEST") {
        state = {
            ...state,
            friendsWannabes: state.friendsWannabes.filter((friend) => {
                if (friend.id == action.friends_Id) {
                    return {
                        ...friend,
                        accepted: true,
                    };
                } else {
                    return friend;
                }
            }),
        };
    }
    if (action.type == "UNFRIEND") {
        state = {
            ...state,
            friendsWannabes: state.friendsWannabes.filter((user) => {
                if (user.id != action.users_Id) {
                    return {
                        ...user,
                        accepted: false,
                    };
                }
            }),
        };
    }
    // console.log("state:", state);
    return state;
}
