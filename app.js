import express from "express";
import projectsRouter from "./routers/projects.js"
import { createPage } from "./render.js"
import contact from "./routers/contact.js"
import mysql from "mysql"
import session from "express-session";
const app = express();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'node-portfolio'
});

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(projectsRouter);
app.use(contact);

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

const forside = createPage("forside/forside.html", {
    title: "Portfolio | Velkommen"
});

const contactPage = createPage("contact/contact.html");
const projectsPage = createPage("projects/projects.html");
const cvPage = createPage("cv/cv.html");
const loginPage = createPage("login/login.html")
const adminPage = createPage("admin/dashboard.html")

app.get("/", (req, res) => {
    res.send(forside);
});

app.get("/projects", (req, res) => {
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

// app.get("/", (req, res) => {
//     res.render("index", { files });
// });

app.post('/auth', function (request, response) {
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

app.get('/admin', function (request, response) {
    if (request.session.loggedin) {
        response.send('Welcome back, ' + request.session.username + '!');
    } else {
        response.send('Please login to view this page!');
    }
    response.end();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
    console.log("Server is running on", PORT);
});
