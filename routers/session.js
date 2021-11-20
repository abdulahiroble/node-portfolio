import express from "express";
import { adminPage, forside } from "../app.js";
const router = express.Router();

router.get("/admin", (req, res) => {
    req.session.admin = true;
    if (req.session.loggedin) {
        res.send(adminPage);
    } else {
        res.send('Please login to view this page!');
    }
    res.end();
});

router.get("/admin", (req, res) => {
    res.send({ admin: req.session.admin || false });
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.send(forside);
});


export default router;