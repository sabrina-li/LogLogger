const express = require("express");
const htmlRouter = express.Router();//for html routes
const Helper = require("./utils/helper");
const path = require("path");

//TODO, read from DB to show the user info

// Load index page
htmlRouter.get("/", function (req, res) {
    //Home page for web
    console.log(Helper.cardsData());
    res.render("index",{
        loginout:"Login",
        cards:Helper.cardsData()
    });
});

htmlRouter.get("/login", function (req, res) {
    //if already logged in, redirect to user page instead of login/signup page
    if (req.isAuthenticated()) {
        return res.redirect("/user");
    }
    //get all flash messages
    const authFlashArray = req.flash("auth");
    let flashMessage;
    for (i=0;i<authFlashArray.length;i++){
        if (authFlashArray[i].length > 0){
            flashMessage = authFlashArray[i];
        }
    }
    // res.render("login",{
    //     loginout:"Login",
    //     errorMessage:flashMessage
    // });
    res.sendFile(path.join(__dirname,"/../views/login.html"));
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
        loginout:"Logout"
    });
});

module.exports = htmlRouter;