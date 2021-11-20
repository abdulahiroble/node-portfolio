// import express from "express";
// const router = express.Router();
import express from "express";
import { connection } from "../app.js";
const router = express.Router();

router.get("/projects", async (req, res) => {

    // const projects = await connection.query("SELECT * from projects");

    await connection.query('SELECT * from projects', function (error, results, fields) {
        // if (results.length > 0) {
        //     // request.session.loggedin = true;
        //     // request.session.username = username;
        //     // response.redirect('/admin');
        // } else {
        //     response.send('Incorrect Username and/or Password!');
        // }
        // response.end();

        // res.send(projects)

        if (error) throw error;
        res.send(results)

    },

        // res.send(projects)


    )
});


router.post("/projects", async (req, res) => {
    const gameToCreate = req.body;

    connection.run("INSERT INTO projects ('title') VALUES (?)", [gameToCreate.title]);

    res.send(gameToCreate);
});

export default router;
