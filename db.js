const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:Hoda@localhost:5432/caper-socialnetwork"
);

module.exports.addRegister = (first, last, email, hashedPw) => {
    let q =
        "INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id";
    let params = [first, last, email, hashedPw];
    return db.query(q, params);
};

//! getting the password connected to the email
module.exports.getEmail = (email) => {
    let s = "SELECT password, email, id FROM users WHERE email = $1";
    let params = [email];
    return db.query(s, params);
};

//! storing the code
module.exports.storeCode = (email, code) => {
    let q =
        "INSERT INTO password_reset_codes (email, code) VALUES ($1, $2) RETURNING *";
    let params = [email, code];
    return db.query(q, params);
};

//! getting the code
module.exports.findCode = (email) => {
    let q =
        "SELECT * FROM password_reset_codes WHERE email = $1 AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes' ORDER BY id DESC LIMIT 1";
    let params = [email];
    // console.log("query:", params);
    return db.query(q, params);
};

//! storing new Password
module.exports.addNewPassword = (email, hashedPw) => {
    let q = "UPDATE users SET password = $2 WHERE email = $1";
    let params = [email, hashedPw];
    // console.log("query:", params);
    return db.query(q, params);
};

//! GET /user Route
module.exports.getUserInfo = (id) => {
    let q = "SELECT id, first, last, url, bio FROM users WHERE id = $1";
    let params = [id];
    // console.log("getUserInfo query:", params);
    return db.query(q, params);
};

module.exports.addPicture = function (id, url) {
    let q = "UPDATE users SET url=$2 WHERE id=$1 RETURNING *";
    let params = [id, url];
    return db.query(q, params);
};

module.exports.addBio = function (id, bio) {
    let q = "UPDATE users SET bio=$2 WHERE id=$1 RETURNING*";
    let params = [id, bio];
    return db.query(q, params);
};

//! GET /user/ + id Route
module.exports.getUsersInfo = (id) => {
    let q = "SELECT id, first, last, url, bio FROM users WHERE id = $1";
    let params = [id];
    console.log("getUsersInfo query:", params);
    return db.query(q, params);
};

//! getting the last 3 added users
module.exports.getLastAddedUsers = () => {
    let q = "SELECT * FROM users ORDER BY id DESC LIMIT 3";
    return db.query(q);
};

module.exports.searchUsers = (users) => {
    let q = `SELECT * FROM users WHERE first
            ILIKE $1
            OR last
            ILIKE $1`;
    let params = [`${users}%`];
    // console.log("searchUsers query:", params);
    return db.query(q, params);
};
//todo://///////// ROUTE /user/${viewedId} //////////////
module.exports.checkFriendship = (viewedId, viewerId) => {
    let q = `SELECT * FROM friendships 
    WHERE (sender_id=$2 AND recipient_id=$1) OR (sender_id=$1 AND recipient_id=$2)`;
    let params = [viewedId, viewerId];
    return db.query(q, params);
};

//todo://///////// GET /addfriend //////////////
//! add row
module.exports.addFriend = (sender_id, recipient_id) => {
    let q = `INSERT INTO friendships (sender_id, recipient_id) VALUES ($1, $2) RETURNING *`;
    let params = [sender_id, recipient_id];
    console.log("addFriend query:", params);
    return db.query(q, params);
};

//! update
//! accept-friend
module.exports.updateFriendship = (sender_id, recipient_id) => {
    let q = `UPDATE friendships SET accepted = true WHERE sender_id=$1 AND recipient_id=$2 RETURNING *`;
    let params = [sender_id, recipient_id];
    console.log("updateFriendship query:", params);
    return db.query(q, params);
};

//! delete row
//! unfriend
module.exports.cancelFriend = (sender_id, recipient_id) => {
    let q = `DELETE FROM friendships WHERE (sender_id=$2 AND recipient_id=$1) OR (sender_id=$1 AND recipient_id=$2)`;
    let params = [sender_id, recipient_id];
    console.log("cancelFriend query:", params);
    return db.query(q, params);
};

//! get friends & wannabe friends
module.exports.getFriendsWannabes = (id) => {
    let q = `
  SELECT users.id, first, last, url, accepted
  FROM friendships
  JOIN users
  ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
  OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
  OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)
`;
    let params = [id];
    console.log("getFriendsWannabes:", params);
    return db.query(q, params);
};

//todo://///////// CHAT //////////////

module.exports.getLastMessages = () => {
    let q = `SELECT first, last, url, sender_id, message FROM users 
    JOIN chat_messages ON users.id = chat_messages.sender_id 
    ORDER BY chat_messages.id 
    DESC LIMIT 10`;
    return db.query(q);
};

module.exports.newChatMessage = (user_Id, msg) => {
    let q = `INSERT INTO chat_messages (sender_id, message) VALUES ($1, $2) RETURNING *`;
    let params = [user_Id, msg];
    console.log("newChatMessage:", params);
    return db.query(q, params);
};

module.exports.getChatMessages = (newMessage) => {
    let q = `SELECT message, first, last, url, ts sender_id FROM users 
    JOIN chat_messages ON users.id = chat_messages.sender_id 
    WHERE chat_messages.id=$1`;
    let params = [newMessage];
    console.log("getChatMessages:", params);
    return db.query(q, params);
};

//todo://///////// FEED //////////////
module.exports.getLastPosts = (viewedId) => {
    let q = `SELECT first, last, url, sender_id, content,ts FROM users 
    JOIN feed ON users.id = feed.sender_id WHERE feed.recipient_id =$1
    ORDER BY feed.id 
    DESC LIMIT 10`;
    let params = [viewedId];
    console.log("getLastPosts:", params);
    return db.query(q, params);
};

module.exports.postToFeed = (sender_id, recipient_id, newPost) => {
    let q = `INSERT INTO feed (sender_id, recipient_id, content) VALUES ($1, $2, $3) RETURNING *`;
    let params = [sender_id, recipient_id, newPost];
    console.log("postToFeed:", params);
    return db.query(q, params);
};
