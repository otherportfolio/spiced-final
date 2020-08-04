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

//getting the password connected to the email
module.exports.getEmail = (email) => {
    let s = "SELECT password, email, id FROM users WHERE email = $1";
    let params = [email];
    return db.query(s, params);
};

//storing the code
module.exports.storeCode = (email, code) => {
    let q =
        "INSERT INTO password_reset_codes (email, code) VALUES ($1, $2) RETURNING *";
    let params = [email, code];
    return db.query(q, params);
};

//getting the code
module.exports.findCode = (email) => {
    let q =
        "SELECT * FROM password_reset_codes WHERE email = $1 AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes' ORDER BY id DESC LIMIT 1";
    let params = [email];
    // console.log("query:", params);
    return db.query(q, params);
};

//storing new Password
module.exports.addNewPassword = (email, hashedPw) => {
    let q = "UPDATE users SET password = $2 WHERE email = $1";
    let params = [email, hashedPw];
    // console.log("query:", params);
    return db.query(q, params);
};

module.exports.getUserInfo = (id) => {
    let q = "SELECT id, first, last, url FROM users WHERE id = $1";
    let params = [id];
    console.log("getUserInfo query:", params);
    return db.query(q, params);
};

module.exports.addPicture = function (id, url) {
    let q = "UPDATE users SET url=$2 WHERE id=$1 RETURNING *";
    let params = [id, url];
    return db.query(q, params);
};
