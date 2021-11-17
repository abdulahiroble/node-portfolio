// import express from "express";
// const router = express.Router();

// import { connection } from "../database/connectSqlite.js";

// router.get("/projects", async (req, res) => {

//     const projects = await connection.all("SELECT * from projects");

//     res.send(projects);
// });


// router.post("/projects", async (req, res) => {
//     const gameToCreate = req.body;

//     connection.run("INSERT INTO projects ('title') VALUES (?)", [gameToCreate.title]);

//     res.send(gameToCreate);
// });

// export default router;

const router = require("express").Router();

const projects = [
    { name: "Node.js Recap", category: "Node.js", technologies: ["Node.js", "Html", "CSS"] },
    { name: "Nodefolio", category: "Node.js", technologies: ["Node.js", "Html", "CSS"] },
    { name: "Adventure XP", category: "Java", technologies: ["Java", "Thymeleaf", "CSS", "MySQL"] }
];


router.get("/api/projects", (req, res) => {
    res.send({ projects });
});


module.exports = {
    router
};
