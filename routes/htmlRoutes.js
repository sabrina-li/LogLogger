const express = require("express");
const htmlRouter = express.Router();//for html routes
const Helper = require("./utils/helper");

//TODO, read from DB to show the user info

// Load index page
htmlRouter.get("/", function (req, res) {
    //Home page for web
    // console.log(Helper.cardsData());
    res.render("index",{
        loggedIn:false,
        cards:Helper.cardsData()
    });
});

htmlRouter.get("/login", function (req, res) {
    //if already logged in, redirect to user page instead of login/signup page
    if (req.isAuthenticated()) {
        return res.redirect("/user");
    }
    //get all flash messages
    const flashMessage = req.flash("auth")[0];
    res.render("login",{
        loggedIn:true,
        errorMessage:flashMessage
    });
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
    res.render("data",{
        loggedIn:false
    });
});

module.exports = htmlRouter;