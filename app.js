const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");

app.use(express.static("public"));
const dirPath = path.join(__dirname, "public/pdfs");

const files = fs.readdirSync(dirPath).map(name => {
    return {
        name: path.basename(name, ".pdf"),
        url: `/pdfs/${name}`
    };
});

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(
    express.static("public", {
        setHeaders: (res, filepath) =>
            res.attachment(`pdf-express-${path.basename(filepath)}`)
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const projectsRouter = require("./routers/projects.js");
const contactRouter = require("./routers/contact.js");

app.use(projectsRouter.router);
app.use(contactRouter.router);

const { createPage } = require("./render.js");

const forside = createPage("forside/forside.html", {
    title: "Portfolio | Velkommen"
});

const contactPage = createPage("contact/contact.html");
const projectsPage = createPage("projects/projects.html");
const cvPage = createPage("cv/cv.html");
// const pdf = createPage("views/index.ejs");

app.get("/", (req, res) => {
    res.send(forside);
});

app.get("/projects", (req, res) => {
    res.send(projectsPage);
});


app.get("/contact", (req, res) => {
    res.send(contactPage);
});

app.get("/cv", (req, res) => {
    res.send(cvPage);
});

app.get("/", (req, res) => {
    res.render("index", { files });
});

app.get("/:file", (req, res) => {
    const file = files.find(f => f.name === req.params.file);
    res.render("index", { files, file });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
    console.log("Server is running on", PORT);
});
