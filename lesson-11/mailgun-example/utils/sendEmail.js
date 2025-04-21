import formData from "form-data";
import Mailgun from "mailgun.js";
import "dotenv/config";

const { MAILGUN_API_KEY, MAILGUN_DOMAIN } = process.env;

const mailgun = new Mailgun(formData);

const mg = mailgun.client({ username: "api", key: MAILGUN_API_KEY });

/* 
const data = {
  to: ["goxosam266@agiuse.com"],
  subject: "Hello",
  text: "Testing some Mailgun awesomness!",
  html: "<h1>Testing some Mailgun awesomness!</h1>",
};
*/

export const sendEmail = data => {
    const email = {...data, from: "Bohdan Lyamzin bogdan.lyamzin.d@gmail.com"};
    return mg.messages.create(MAILGUN_DOMAIN, email);
}
