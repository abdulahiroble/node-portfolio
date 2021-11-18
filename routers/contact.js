import express from "express";
const router = express.Router();
import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

router.post("/api/contact", (req, res) => {
    console.log(req.body);

    async function main() {

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

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    main().catch(console.error);

    res.send();
});

export default router;
