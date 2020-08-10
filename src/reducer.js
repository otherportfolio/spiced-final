//todo: ///////// REDUCER FUNCTION ////////////
//! should only be ONE reducer function
//! the reducer function will NEVER be explicitly called in the code, so will never be a "reducer()"
//! this function is automatically invoked by Redux

//! Syntax: if the first Arg passed to reducer is defined, store that in the state = {}
//! so this Syntax creates our state, which is initially empty

//! second Arg action: will determine which changes will be made to the sate
export default function reducer(state = {}, action) {
    return state;
}

//! this function will consist in a "collection" of "if" statements i.e.
//! if(action === "action_1"){
//! do something
//! }
