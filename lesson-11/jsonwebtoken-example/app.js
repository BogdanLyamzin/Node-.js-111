import jwt from "jsonwebtoken";
import "dotenv/config";

const {JWT_SECRET} = process.env;

const payload = {
    email: "goxosam266@agiuse.com"
};

const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "24h"
});
// console.log(token);
const decodeToken = jwt.decode(token);
// console.log(decodeToken);

try {
    const {email} = jwt.verify(token, JWT_SECRET);
    console.log(email);
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdveG9zYW0yNjZAYWdpdXNlLmNvbSIsImlhdCI6MTc0NTI2MDU5NiwiZXhwIjoxNzQ1MzQ2OTk2fQ.L8nbNkir9NCWPpWZhbrJj0o9FNfJGkckWYbNIYY2u0G";
    jwt.verify(invalidToken, JWT_SECRET);
}
catch(error) {
    console.log(error.message);
}