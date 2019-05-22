const path = require("path");

const express = require("express");
const htmlRouter = express.Router();//for api routes

//TODO, read from DB to show the user info

// Load index page
htmlRouter.get("/", function (req, res) {
    //if already logged in, redirect to user page instead of login/signup page
    if (req.user) {
        return res.redirect("/user");
    }
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

// Load example page and pass in an example by id
htmlRouter.get("/user", function (req, res, next) {
    //check for authentication before sending user page
    if (req.isAuthenticated()) {
        return next();
    }
    //redirect to login/signup page if not authenticated
    res.redirect("/");
}, function (req, res) {
    res.sendFile(path.join(__dirname, "../views/data.html"));
});

// Redirect to home page for any unmatched routes
htmlRouter.get("*", function (req, res) {
    return res.redirect("/");
});


module.exports = htmlRouter;