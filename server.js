const express = require("express");
const path = require("path");
const session = require('express-session');

const app = express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "login.html"));
})

app.get('/*', function(req, res) {
    if (!req.session.loggedin) {

        res.redirect("/login")

    } else {

        res.sendFile(path.join(__dirname, "frontend", "index.html"));
    }
});


app.post('/auth', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    fetch("http://127.0.0.1:8000/login/")

    if (username == "allanstocco@project" && password == 123123) {

        req.session.loggedin = true;
        req.session.username = username;

        res.redirect("/dashboard");

    } else {
        res.redirect("/login")
    }
});

app.listen(process.env.PORT || 3000, () => console.log("Server running..."));