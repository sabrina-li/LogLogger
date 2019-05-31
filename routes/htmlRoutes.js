const express = require("express");
const htmlRouter = express.Router();//for html routes
const Helper = require("./utils/helper");
const path = require("path");
const fs = require("fs");

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
    const divInitial = ` React.createElement("div", {
      className: "error"
    })`;
    const divError = ` React.createElement("div", {
        className: "error"
      },"${flashMessage}")`;
    const divUserExistError = ` React.createElement("div", {
        className: "error"
      },"User does not exist.")`;
    const divIncorrectPassError = ` React.createElement("div", {
        className: "error"
      },"Incorrect password.")`;

    if (flashMessage){
        fs.readFile(path.join(__dirname,"/../public/js/front_form.js"), "utf8", function(err, data) {
            if (err) {
                return console.log(err);
            }
            var result = data.toString().replace(divInitial,divError);
            fs.writeFile(path.join(__dirname,"/../public/js/front_form.js"), result, "utf8", function(err) {
                if (err) {
                    return console.log(err);
                }
                res.sendFile(path.join(__dirname,"/../views/login.html"));
                console.log("it finished writing the file");
                console.log(result);
            });
        });
    } else {
        fs.readFile(path.join(__dirname,"/../public/js/front_form.js"), "utf8", function(err, data) {
            if (err) {
                return console.log(err);
            }

            if(data.includes(divUserExistError)){
                var result = data.toString().replace(divUserExistError,divInitial);
                fs.writeFile(path.join(__dirname,"/../public/js/front_form.js"), result, "utf8", function(err) {
                    if (err) {
                        return console.log(err);
                    }
                    res.sendFile(path.join(__dirname,"/../views/login.html"));
                    console.log("it finished writing the file in the else");
                    console.log(result);
                });
            } else if (data.includes(divIncorrectPassError)){
                var result1 = data.toString().replace(divIncorrectPassError,divInitial);
                fs.writeFile(path.join(__dirname,"/../public/js/front_form.js"), result1, "utf8", function(err) {
                    if (err) {
                        return console.log(err);
                    }
                    res.sendFile(path.join(__dirname,"/../views/login.html"));
                    console.log("it finished writing the file in the else");
                    console.log(result);
                });
            } else {
                res.sendFile(path.join(__dirname,"/../views/login.html"));
            }
            
        });
        // res.sendFile(path.join(__dirname,"/../views/login.html"));
        // console.log("its in the else of html routes when sending file");
    }

    // res.sendFile(path.join(__dirname,"/../views/login.html"));
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