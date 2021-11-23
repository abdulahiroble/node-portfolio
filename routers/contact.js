import express from "express";
const router = express.Router();
import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

router.post("/api/contact", (req, res) => {
    console.log(req.body);

    async function main() {

        let transporter = nodemailer.createTransport({
            host: 'smtp-mail.outlook.com',
            service: 'outlook',
            secureConnection: false,
            auth: {
                user: process.env.OUTLOOK_EMAIL,
                pass: process.env.OUTLOOK_PASSWORD,
            },
            tls: {
                ciphers: "SSLv3",
                rejectUnauthorized: false,
            },
        });

        let info = await transporter.sendMail({
            from: '"abdulahi 👻" <abdulahi_2610@hotmail.com>',
            to: `${req.body.email}`,
            subject: "Hello ✔",
            text: `${req.body.message}`,
            html: `${req.body.message}`,
        });

        console.log("Message sent: %s", info.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    main().catch(console.error);

    res.send();
});

export default router;
