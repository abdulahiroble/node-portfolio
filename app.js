const express = require("express");
const app = express();

app.use(express.static("public"));

const { createPage } = require("./render.js");

const forside = createPage("forside/forside.html", {
    title: "Portfolio | Velkommen"
});


app.get("/", (req, res) => {
    res.send(forside);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
    console.log("Server is running on", PORT);
});
