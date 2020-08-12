const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./db.js");
const bc = require("./bc.js");
// const { COOKIE_SESSION } = require("./secrets.json");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
// const aws = require("aws-sdk");
const cryptoRandomString = require("crypto-random-string");
const ses = require("./ses.js");
const s3 = require("./s3.js");
const { s3Url } = require("./config");

//todo://////// compression - middleware ////////////
app.use(compression());

//todo://////// express.urlencoded - middleware: parsing url ////////////////
app.use(express.urlencoded({ extended: false }));

//todo:/// express static - middleware: handling the files /////
app.use(express.static("./public"));

//todo://////// cookie-session middleware //////////
app.use(
    cookieSession({
        secret: "all the secrets",
        keys: ["secret keys"],
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

//todo:///////// express.json - middleware: parsing json /////////////
app.use(express.json());

//todo://////// c-surf middleware ////////////
app.use(csurf());

//todo://////// middleware to put c-surf in the cookie ////////////
app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

//todo://////// handling the transpiler /////////////
if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}
//todo://////// end of handling the transpiler /////////////

//todo:/// UPLOAD WITH MULTER /////////
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
// const { promises } = require("fs");
const { compare } = require("bcryptjs");

//todo://////// BOILER PLATE FOR MULTER /////////////
const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

//todo://////// END OF BOILER PLATE FOR MULTER /////////////

//todo:////////////////////////////////////////////////////////////////////////////////////////

//todo:/// welcome route /////
app.get("/welcome", function (req, res) {
    if (req.session.user_Id) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

//todo:///////////// POST /registration ///////////////////
app.post("/register", (req, res) => {
    console.log("req.body:", req.body);

    bc.hash(req.body.password).then((hashedPw) => {
        console.log("hashedPw:", hashedPw);
        db.addRegister(req.body.first, req.body.last, req.body.email, hashedPw)
            .then((results) => {
                console.log("hashed Password:", hashedPw);
                console.log("results:", results.rows[0]);
                req.session.user_Id = results.rows[0].id;
                req.session.hasUserId = true;
                res.json({ success: true });
            })
            .catch((err) => {
                console.log("err in hash in POST REGISTRATION:", err);
                res.json({ success: false });
            });
    });
});

//todo:///////////// GET /login ///////////////////
app.get("/login", (req, res) => {
    res.render("/login");
});

//todo:///////////// POST /login ///////////////////
app.post("/login", (req, res) => {
    console.log("req.body in Login:", req.body.email);

    db.getEmail(req.body.email).then((results) => {
        console.log("Results login:", results.rows[0]);
        if (!results.rows[0].password) {
            res.json({ success: false });
        } else {
            compare(req.body.password, results.rows[0].password)
                .then((matchValue) => {
                    console.log(matchValue);
                    if (matchValue == true) {
                        req.session.hasUserId = true;
                        req.session.user_Id = results.rows[0].id;
                        req.session.email = req.body.email;
                        req.session.logged = true;
                        res.json({ success: true });
                    }
                })
                .catch((err) => {
                    console.log("ERROR in POST /Login:", err);
                    res.json({ success: false });
                });
        }
    });
});

//todo://///// POST resetpassword /////////////
app.post("/resetpassword", (req, res) => {
    const secretCode = cryptoRandomString({
        length: 6,
    });
    db.getEmail(req.body.email).then((results) => {
        console.log("Results POST resetpassword:", results.rows[0]);
        if (results.rows[0]) {
            console.log("user found!");
            let email = results.rows[0].email;
            console.log("results.rows[0]", results.rows[0]);
            let code = secretCode;
            let subj = "get the code";
            db.storeCode(email, code).then((results) => {
                // console.log("storeCode results:", results.rows[0].email);
                // console.log("storeCode results:", results.rows[0].code);
                ses.sendEmail(email, code, subj).then(() => {
                    res.json({ sendEmailSuccess: true });
                });
            });
        }
    });
}); // end of post resetpassword

//todo://///////// POST store New Password //////////////
app.post("/submitcode", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let neuCode = req.body.code;
    db.findCode(email).then((results) => {
        // console.log("Results in findCode:", results.rows[0].code);
        // console.log("Password in findCode:", password);
        // console.log("code check:", req.body.code, results.rows[0].code);
        if (req.body.code === results.rows[0].code) {
            console.log("getting here!");
            bc.hash(password)
                .then((hashedPw) => {
                    console.log("hashedPw:", hashedPw);
                    db.addNewPassword(email, hashedPw).then((results) => {
                        console.log(
                            "hashedPw after addNewPassword:",
                            results.hashedPw
                        );
                        req.session.hasNewPass = true;
                        res.json({ storePassSuccess: true });
                    });
                })
                .catch((err) => {
                    console.log("ERROR in POST store New Password:", err);
                    res.json({ storePassSuccess: false });
                });
        }
    });
}); // end of post submitcode

//todo://///////// GET /user //////////////

app.get("/user", (req, res) => {
    // console.log("hit /user route!");
    db.getUserInfo(req.session.user_Id)
        .then((results) => {
            // console.log("Results in getUserInfo:", results.rows[0]);
            // res.json({ success: true });
            res.json(results.rows[0]);
        })
        .catch((err) => {
            console.log("ERROR in GET /user:", err);
            res.json({ success: false });
        });
});

//todo://////////////// MULTER - UPLOAD POST //////////////////

//! this bit is a middleware: "uploader.single("file")"
app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    //req.body - is the rest of our input fields: username, title, description
    // const { first, last, email, password } = req.body;
    // console.log("input:", req.body);

    //req.file - is the file that was just uploaded
    const { filename } = req.file;
    // console.log("file:", req.file);

    const url = s3Url + filename;

    //!insert the title, description, username and image url into the table
    db.addPicture(req.session.user_Id, url)
        .then((results) => {
            console.log("addPicture rows[0]:", results.rows[0]);
            res.json(results.rows[0]);
        })
        .catch((err) => {
            console.log("ERROR in upload/addPicture:", err);
        });
});
//todo: ///////////// END OF MULTER - UPLOAD ///////////////

//todo://///////// GET /editbio //////////////
app.post("/editbio", (req, res) => {
    // console.log("hit /editbio route!");
    // console.log("input EditBio:", req.body);
    db.addBio(req.session.user_Id, req.body.bio)
        .then((results) => {
            // console.log("addBio rows[0]:", results.rows[0].bio);
            res.json({ data: results.rows[0].bio });
        })
        .catch((err) => {
            console.log("ERROR in editbio/addBio:", err);
        });
});

//todo://///////// GET /user/ + id //////////////
app.get("/user/:id.json", (req, res) => {
    // console.log("hit /user/ + id route!");
    console.log("req.params", req.params.id);
    // console.log("req.session", req.session.user_Id);
    if (req.params.id == req.session.user_Id) {
        res.json({ sameId: true });
    } else {
        db.getUsersInfo(req.params.id)
            .then((results) => {
                if (!results.rows[0]) {
                    // console.log(
                    //     "results from GET /user/ +id:",
                    //     results.rows[0].id
                    // );
                    res.json({ sameId: false });
                } else {
                    res.json(results.rows[0]);
                }
            })
            .catch((err) => {
                console.log("ERROR in GET /user/ + id:", err);
            });
    }
});

//todo://///////// GET /searchusers //////////////
app.get("/searchusers", (req, res) => {
    console.log("hit the /users route!");
    db.getLastAddedUsers()
        .then((results) => {
            console.log("results in GET /searchusers:", results.rows);
            res.json(results.rows);
        })
        .catch((err) => {
            console.log("ERROR in GET /searchusers:", err);
        });
});

//todo://///////// GET //search/${userInput} //////////////
app.get("/search/:userInput", (req, res) => {
    console.log("params userInput:", req.params.userInput);
    if (req.params.userInput) {
        db.searchUsers(req.params.userInput)
            .then((results) => {
                console.log(
                    "results in GET /search/${userInput}:",
                    results.rows
                );
                res.json(results.rows);
            })
            .catch((err) => {
                console.log("ERROR in GET /search/${userInput}:", err);
            });
    }
    console.log("hit the /search/:userInput route!");
});

//todo://///////// GET /user/${viewedId} //////////////
app.get("/users/:viewedId", (req, res) => {
    console.log("hit rout/users/:viewedId");
    const viewerId = req.session.user_Id;
    const viewedId = req.params.viewedId;
    console.log("req.params:", req.params.viewedId);
    // console.log("params:", typeof viewerId);
    if (req.params.viewedId == req.session.user_Id) {
        res.json({ sameId: true });
    } else {
        console.log("viewedId", viewedId);
        console.log("viewerId", viewerId);
        db.checkFriendship(viewedId, viewerId)
            .then((results) => {
                console.log(
                    "RESULTS after query checkFriendship:",
                    results.rows
                );
                //! there‘s no row
                if (results.rows.length == 0) {
                    res.json({
                        button: "Add friend",
                    });
                    //! there‘s a row && accepted is true
                } else if (results.rows && results.rows[0].accepted == true) {
                    // console.log("results.rows[0]:", results.rows[0]);

                    res.json({
                        button: "cancel friend",
                    });
                    //! there‘s a row but accepted is false
                } else if (results.rows && results.rows[0].accepted == false) {
                    console.log("results.rows:", results.rows);
                    if (req.params.viewedId == results.rows[0].sender_id) {
                        res.json({
                            button: "cancel request",
                        });
                    } else if (
                        req.params.viewedId == results.rows[0].recipient_id
                    ) {
                        res.json({
                            button: "accept request",
                        });
                    }
                }
            })
            .catch((err) => {
                console.log("ERROR in GET /search/${userInput}:", err);
            });
    }
});

//todo://///////// GET /addfriend //////////////
app.post("/addfriend", (req, res) => {
    // console.log("hit rout/addfriend!");
    const sender_id = req.session.user_Id;
    // console.log("req.session.user_Id:", req.session.user_Id);
    const recipient_id = req.body.viewedId;
    // console.log("req.body:", req.body.viewedId);
    if (req.body.button == "Add friend") {
        //! add row
        db.addFriend(sender_id, recipient_id)
            .then(() => {
                res.json({ success: true });
            })
            .catch((err) => {
                console.log("ERROR in GET /addfriend:", err);
            });
    } else if (req.body.button == "accept request") {
        //! update
        db.updateFriendship(sender_id, recipient_id)
            .then(() => {
                res.json({ accepted: true });
            })
            .catch((err) => {
                console.log("ERROR in GET /updateFriendship:", err);
            });
    } else if (req.body.button == "cancel friend") {
        //! delete row
        db.cancelFriend(sender_id, recipient_id)
            .then(() => {
                res.json({ accepted: false });
            })
            .catch((err) => {
                console.log("ERROR in GET /cancelfriend:", err);
            });
    }
});

//todo://///////// GET /friends-wannabes //////////////
app.get("/friends-wannabes", (req, res) => {
    console.log("hit /friends-wannabes route!");
    console.log("req.session.user_Id:", req.session.user_Id);
    db.getFriendsWannabes(req.session.user_Id)
        .then((results) => {
            console.log("results in GET friendswannabes:", results.rows);
            res.json(results.rows);
        })
        .catch((err) => {
            console.log("ERROR in GET /friends-wannabes:", err);
        });
});

//todo://///////// POST /accept-friend //////////////
app.post("/accept-friend", (req, res) => {
    console.log("hit /accept-friend route!");
    const sender_id = req.session.user_Id;
    const recipient_id = req.body.friends_Id;
    console.log("req.body.friends_Id:", recipient_id);
    db.updateFriendship(sender_id, recipient_id)
        .then((results) => {
            res.json(results.rows);
        })
        .catch((err) => {
            console.log("ERROR in POST /accept-friend:", err);
        });
});
//todo://///////// POST /unfriend //////////////
app.post("/unfriend", (req, res) => {
    console.log("hit /unfriend route!");
    const sender_id = req.session.user_Id;
    const recipient_id = req.body.users_Id;
    db.cancelFriend(sender_id, recipient_id)
        .then((results) => {
            res.json(results.rows);
        })
        .catch((err) => {
            console.log("ERROR in POST /unfriend:", err);
        });
});

//todo: ////////// LOGOUT ///////////////
app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

//todo://///////// GET /* //////////////

//! redirects that guarantee that if the user is logged out the url is /welcome /////
app.get("*", function (req, res) {
    if (!req.session.user_Id) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
