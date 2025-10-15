const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "inframedesigninstitute@gmail.com",
        pass: "gkac hmap evud fxce",
    },
});


module.exports = { transporter }