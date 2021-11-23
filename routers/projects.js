import express from "express";
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
        res.redirect("/admin");
    },

    )
})

router.post('/update', (req, res) => {
    const projectId = req.body.id;
    let sql = "update projects SET name='" + req.body.name + "',  category='" + req.body.category + "',  tech='" + req.body.tech + "' where id =" + projectId;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        console.log("Project updated");
        res.redirect("/admin");
    });
});


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
    var url = req.body.url;
    connection.query("INSERT INTO projects (name, category, tech, url) VALUES (?, ?, ?, ?)", [projectname.toString(), category.toString(), tech.toString(), url.toString()], function (err, result) {
        if (err) throw err;
        console.log("New project added");
    });
    res.redirect("/admin");
    res.end()
});


export default router;
