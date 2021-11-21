import express from "express";
import { adminPage, loginPage } from "../app.js";
import { connection } from "../database/connectMysqlDb.js";
const router = express.Router();

router.get("/projects", (req, res) => {
    connection.query('SELECT * from projects', function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    },

    )
});


router.get('/delete/:id', function (req, res) {
    const id = req.params.id;
    connection.query(`DELETE FROM projects WHERE id = ${id}`, function (error, results, fields) {
        if (error) throw err;
        res.send("project deleted");
    },

    )
})

router.post('/update', (req, res) => {
    const userId = req.body.id;
    let sql = "update users SET name='" + req.body.name + "',  email='" + req.body.email + "',  phone_no='" + req.body.phone_no + "' where id =" + userId;
    let query = connection.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});


// router.put('/updateProject', function (req, res) {
//     connection.query("UPDATE projects SET name = 'Canyon 123' WHERE id = '1'", function (error, results, fields) {
//         if (error) throw err;
//         res.send("project updated");
//     },

//     )
// })

router.post('/auth', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('/admin');
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});

router.post('/createProject', function (req, res) {
    var projectname = req.body.name;
    var category = req.body.category;
    var tech = req.body.tech;
    connection.query("INSERT INTO projects (name, category, tech) VALUES (?, ?, ?)", [projectname.toString(), category.toString(), tech.toString()], function (err, result) {
        if (err) throw err;
        console.log("New project added");
    });
    res.send(adminPage);
    res.end()
});


export default router;
