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

////////// compression - middleware ////////////
app.use(compression());

////////// express.urlencoded - middleware: parsing url ////////////////
app.use(express.urlencoded({ extended: false }));

///// express static - middleware: handling the files /////
app.use(express.static("./public"));

////////// cookie-session middleware //////////
app.use(
    cookieSession({
        secret: "all the secrets",
        keys: ["secret keys"],
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

/////////// express.json - middleware: parsing json /////////////
app.use(express.json());

////////// c-surf middleware ////////////
app.use(csurf());

////////// middleware to put c-surf in the cookie ////////////
app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

////////// handling the transpiler /////////////
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
////////// end of handling the transpiler /////////////

///// UPLOAD WITH MULTER /////////
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
// const { promises } = require("fs");
const { compare } = require("bcryptjs");

////////// BOILER PLATE FOR MULTER /////////////
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

////////// END OF BOILER PLATE FOR MULTER /////////////

//////////////////////////////////////////////////////////////////////////////////////////

///// welcome route /////
app.get("/welcome", function (req, res) {
    if (req.session.user_Id) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

/////////////// POST /registration ///////////////////
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

/////////////// GET /login ///////////////////
app.get("/login", (req, res) => {
    res.render("/login");
});

/////////////// POST /login ///////////////////
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

///////// POST resetpassword /////////////
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
                console.log("storeCode results:", results.rows[0].email);
                console.log("storeCode results:", results.rows[0].code);
                ses.sendEmail(email, code, subj).then(() => {
                    res.json({ sendEmailSuccess: true });
                });
            });
        }
    });
}); // end of post resetpassword

///////////// POST store New Password //////////////
app.post("/submitcode", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let neuCode = req.body.code;
    db.findCode(email).then((results) => {
        console.log("Results in findCode:", results.rows[0].code);
        console.log("Password in findCode:", password);
        console.log("code check:", req.body.code, results.rows[0].code);
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

///////////// GET /user //////////////

app.get("/user", (req, res) => {
    console.log("hit /user route!");
    db.getUserInfo(req.session.user_Id)
        .then((results) => {
            console.log("Results in getUserInfo:", results.rows[0]);
            // res.json({ success: true });
            res.json(results.rows[0]);
        })
        .catch((err) => {
            console.log("ERROR in GET /user:", err);
            res.json({ success: false });
        });
});

// ////////////////////////////////////////////////////
// //////////////// MULTER - UPLOAD POST //////////////////

// this bit is a middleware: "uploader.single("file")"
app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    //req.body - is the rest of our input fields: username, title, description
    // const { first, last, email, password } = req.body;
    // console.log("input:", req.body);

    //req.file - is the file that was just uploaded
    const { filename } = req.file;
    // console.log("file:", req.file);

    const url = s3Url + filename;

    //insert the title, description, username and image url into the table
    db.addPicture(req.session.user_Id, url)
        .then((results) => {
            console.log("addPicture rows[0]:", results.rows[0]);
            res.json(results.rows[0]);
        })
        .catch((err) => {
            console.log("ERROR in upload/addPicture:", err);
        });
});
// ///////////// END OF MULTER - UPLOAD ///////////////
// ////////////////////////////////////////////////////

///// redirects that guarantee that if the user is logged out the url is /welcome /////
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
