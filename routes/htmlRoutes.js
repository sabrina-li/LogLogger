const express = require("express");
const htmlRouter = express.Router();//for api routes

//TODO, read from DB to show the user info

// Load index page
htmlRouter.get("/", function (req, res) {
    //if already logged in, redirect to user page instead of login/signup page
    if (req.isAuthenticated()) {
        return res.redirect("/user");
    }
    //render index, sending failure flash message if there is one
    res.render("index", { errorMessage: req.flash("auth")[0] });
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
    res.render("data");
});

module.exports = htmlRouter;