const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fetch = require('node-fetch');





const app = express();

app.use(cookieParser());
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        cookies: {
            maxAge: 1000 * 60 * 60,
            secure: false
        },
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));



app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "login.html"));
})

app.get('/*', function (req, res) {
    if (!req.session.loggedin) {

        res.redirect("/login")

    } else {

        res.sendFile(path.join(__dirname, "frontend", "index.html"));

    }
});


app.post('/auth', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    fetch("http://127.0.0.1:8000/signin", {
        method: 'post',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
            //"X-CSRFToken": cookies.get("csrftoken"),
        },
        credentials: "same-origin",
        body: JSON.stringify({
            "email": username,
            "password": password,
        }),
    }).then(resp => resp)
        .then(response => {
            if (response.status === 202) {


                req.session.loggedin = true;
                req.session.username = username;
                req.session.password = password;

                res.redirect("/dashboard");

            } else {
                res.redirect("/login")
            }
        })
})



app.listen(process.env.PORT || 3000, () => console.log("Server running..."));