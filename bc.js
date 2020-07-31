/////////// BYCRIPT ////////////////
//////////// hashing the password ///////////////
// the module has been required at the top
const bcrypt = require("bcryptjs");
let { genSalt, hash, compare } = bcrypt; // here let has been used because the function was later promisified
const { promisify } = require("util");

genSalt = promisify(genSalt);
hash = promisify(hash);
compare = promisify(compare);

module.exports.compare = compare;
module.exports.hash = (password) =>
    genSalt().then((salt) => hash(password, salt));
