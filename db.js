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
    let s = "SELECT password, id FROM users WHERE email = $1";
    let params = [email];
    return db.query(s, params);
};
