/////// requiring sdk ///////
const aws = require("aws-sdk");

///// check if we're on heroku ///////
let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-west-1",
});

exports.sendEmail = (to, text, subj) => {
    return ses
        .sendEmail({
            Source: "Bloom Throne <bloom.throne@spicedling.email>",
            Destination: {
                ToAddresses: [to],
            },
            Message: {
                Body: {
                    Text: {
                        Data: text,
                    },
                },
                Subject: {
                    Data: subj,
                },
            },
        })
        .promise();
};
