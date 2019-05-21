const errHandler = require("../config/errHandler");

module.exports = function (app, passport) {
    //POST routes for login and signup
    app.post("/login", passport.authenticate("local-login", {
        successRedirect: "/user",
        failureRedirect: "/",
        failureFlash: true
    }));
    app.post("/signup", passport.authenticate("local-signup", {
        successRedirect: "/user",
        failureRedirect: "/",
        failureFlash: true
    }));
    app.get("/logout", function (req, res) {
        req.session.destroy(function (err) {
            if (!err) {
                res.redirect("/");
            } else {
                errHandler.handle(err);
            }
        });
    });
};