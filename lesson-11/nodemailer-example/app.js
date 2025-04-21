import nodemailer from "nodemailer";
import "dotenv/config";

const {UKR_NET_EMAIL, UKR_NET_PASSWORD} = process.env;

const nodemailerConfig = {
    host: "smtp.ukr.net",
    port: 465, // 25, 465, 2525
    secure: true,
    auth: {
        user: UKR_NET_EMAIL,
        pass: UKR_NET_PASSWORD,
    }
};

const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
    from: UKR_NET_EMAIL,
    to: "goxosam266@agiuse.com",
    subject: "Hello",
    text: "Hello",
    html: "<h1>Hello!</h1>"
};

transport.sendMail(email)
    .then(msg => console.log(msg))
    .catch(error => console.log(error));