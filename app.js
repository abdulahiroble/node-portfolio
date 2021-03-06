import express from "express";
import projectsRouter from "./routers/projects.js"
import { createPage } from "./render.js"
import session from "express-session";
import contact from "./routers/contact.js"
const app = express();
import sessionRouter from "./routers/session.js";

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(projectsRouter);
app.use(contact);
app.use(sessionRouter);

export const forside = createPage("forside/forside.html", {
    title: "Portfolio | Velkommen"
});

const contactPage = createPage("contact/contact.html");
const projectsPage = createPage("projects/projects.html");
const cvPage = createPage("cv/cv.html");
export const loginPage = createPage("login/login.html")
export const adminPage = createPage("admin/dashboard.html")
const editPage = createPage("admin/editProject.html")

app.get("/", (req, res) => {
    res.send(forside);
});

app.get("/editProject", (req, res) => {
    res.send(editPage);
});

app.get("/project", (req, res) => {
    res.send(projectsPage);
});

app.get("/login", (req, res) => {
    res.send(loginPage);
});


app.get("/contact", (req, res) => {
    res.send(contactPage);
});

app.get("/cv", (req, res) => {
    res.send(cvPage);
});

app.get("/admin", (req, res) => {
    res.send(adminPage);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
    console.log("Server is running on", PORT);
});
