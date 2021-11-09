const express = require("express");
const app = express();

app.use(express.static("public"));

const projectsRouter = require("./routers/projects.js");

app.use(projectsRouter.router);

const { createPage } = require("./render.js");

const forside = createPage("forside/forside.html", {
    title: "Portfolio | Velkommen"
});

const contactPage = createPage("contact/contact.html");
const projectsPage = createPage("projects/projects.html");

app.get("/", (req, res) => {
    res.send(forside);
});

app.get("/projects", (req, res) => {
    res.send(projectsPage);
});


app.get("/contact", (req, res) => {
    res.send(contactPage);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
    console.log("Server is running on", PORT);
});
