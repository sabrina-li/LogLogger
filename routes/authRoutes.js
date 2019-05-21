const path = require("path");

module.exports = function (app, passport) {
    //POST routes for login and signup
    app.post("/login",
        passport.authenticate("local", {
            successRedirect: "/user",
            failureRedirect: "/",
            failureFlash: true
        }), function (req, res) {
            res.redirect("/user");
        }
    );
    app.post("/signup", passport.authenticate("local-signup", {
        successRedirect: "/user",
        failureRedirect: "/",
        failureFlash: true
    }));
    app.get("/logout", function(req, res) {
        req.session.destroy(function(err) {
            res.redirect("/");
        });
    });
};