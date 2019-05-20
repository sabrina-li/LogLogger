module.exports = function (app, passport, db) {
    //POST routes for login and signup
    app.post("/login",
        passport.authenticate("local", {
            successRedirect: "/data",
            failureRedirect: "/index",
            failureFlash: true
        }));
    app.post("/signup", function (req, res) {
        db.User.create({
            username: req.body.username,
            password: req.body.password
        }, function (err, user) {
            if (err) {
                return errHandler(err);
            }
            return res.json({
                id: user.id,
                message: "User created"
            });
        });
        res.end();
    });
};