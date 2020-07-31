const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:Hoda@localhost:5432/social_network"
);

module.exports.addRegister = (first, last, email, hashedPw) => {
    let q =
        "INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id";
    let params = [first, last, email, hashedPw];
    return db.query(q, params);
};
