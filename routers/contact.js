import express from "express";
const router = express.Router();
import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

// const router = require("express").Router();
// const nodemailer = require("nodemailer");
// require("dotenv").config();

router.post("/api/contact", (req, res) => {
    console.log(req.body);

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        // let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp-mail.outlook.com',                  // hostname
            service: 'outlook',                             // service name
            secureConnection: false,
            auth: {
                user: process.env.OUTLOOK_EMAIL, // generated ethereal user
                pass: process.env.OUTLOOK_PASSWORD, // generated ethereal password
            },
            tls: {
                ciphers: "SSLv3",
                rejectUnauthorized: false,
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"abdulahi 👻" <abdulahi_2610@hotmail.com>', // sender address
            to: `${req.body.email}`, // list of receivers
            subject: "Hello ✔", // Subject line
            text: `${req.body.message}`, // plain text body
            html: `${req.body.message}`, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    main().catch(console.error);

    res.send();
});

export default router;
