import express from "express";
import { adminPage, forside } from "../app.js";
const router = express.Router();
// import mysql from "mysql"

// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'node-portfolio'
// });

// router.post('/auth', function (request, response) {
//     var username = request.body.username;
//     var password = request.body.password;
//     if (username && password) {
//         connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
//             if (results.length > 0) {
//                 request.session.loggedin = true;
//                 request.session.username = username;
//                 response.redirect('/admin');
//             } else {
//                 response.send('Incorrect Username and/or Password!');
//             }
//             response.end();
//         });
//     } else {
//         response.send('Please enter Username and Password!');
//         response.end();
//     }
// });

// router.get('/admin', function (request, response) {
//     if (request.session.loggedin) {
//         response.send('Welcome back, ' + request.session.username + '!');
//     } else {
//         response.send('Please login to view this page!');
//     }
//     response.end();
// });

// router.get("/leave", (req, res) => {
//     req.session.destroy();
//     res.send({});
// });

router.get("/admin", (req, res) => {
    // req.session.isVisiting = true;
    if (req.session.loggedin) {
        res.send(adminPage);
    } else {
        res.send('Please login to view this page!');
    }
    res.end();
});

router.get("/isVisiting", (req, res) => {
    res.send({ clientIsVisiting: req.session.isVisiting || false });
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.send(forside);
});


export default router;