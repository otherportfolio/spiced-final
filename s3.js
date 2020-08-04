const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
//here testing if we are in heroku or not
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

///// S3 BOILER PLATE ///////
//creates an S3 client: s3 is a constructor
const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

//middleware function to run after multer: when multer calls next this should run
exports.upload = function (req, res, next) {
    //here "file" refers to the MUlter middleware in the "index.js"
    if (!req.file) {
        console.log("Multer failed...");
        return res.sendStatus(500);
    }

    const { filename, mimetype, size, path } = req.file;
    // here all propertie‘s names must be capitalized
    const promise = s3
        .putObject({
            Bucket: "spicedling", //bucket name
            ACL: "public-read", // are the files public or not
            Key: filename, // keys are then names of files in a bucket
            Body: fs.createReadStream(path), //sending to the amazon server
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise()
        .then(() => {
            console.log("Promise:", promise);
            next();
            fs.unlink(path, () => {});
            console.log("it worked!!");
        })
        .catch((err) => {
            // uh oh
            console.log("ERROR in exports.upload:", err);
            res.sendStatus(500);
        });
};
