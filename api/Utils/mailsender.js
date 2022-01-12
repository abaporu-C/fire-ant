require('dotenv').config();
const {USER, PASS} = process.env;
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: USER,
        pass: PASS
    },
})

module.exports = (name, email, confirmationCode) => {
    console.log("Check");
    transporter.sendMail({
        from: USER,
        to: email,
        subject: "FireAnt Tracker Account Confirmation",
        html: `<h1>Email Confirmation</h1>
               <h2>We are happy to see you join us, ${name}</h2>
               <p>Thank you for subscribing. Please confirm your email by clicking on the following link:</p>
               <a href=http://localhost:3000/confirm/${confirmationCode}>Click Here!</a>`
    }).catch(err => console.log(err))
}