//package for generating hashed passwords
var bCrypt = require("bcrypt");
//using 'local' strategy with username and password
var LocalStrategy = require("passport-local").Strategy;

module.exports = function (passport, User) {
    //Passport 'local' strategy configuration for signup
    passport.use("local-signup", new LocalStrategy({
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
    }, function (req, usernamePreTrim, passwordPreTrim, done) {
        var username = usernamePreTrim.trim();
        var password = passwordPreTrim.trim();
        // if any fields are empty, set flash message
        if (username.length === 0) {
            return done(null, false, req.flash("auth", "Username is required."));
        }
        if (password.length === 0) {
            return done(null, false, req.flash("auth", "Password is required."));
        }
        var generateHash = function (password) {
            return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };
        User.findOne({
            where: {
                username: username
            }
        }).then(function (user) {
            //if username is already taken, set flash message
            if (user) {
                return done(null, false, req.flash("auth", "That username is already taken."));
            } else {
                var userPassword = generateHash(password);
                User.create({
                    username: username,
                    password: userPassword
                }).then(function (newUser) {
                    //set flash message for other errors
                    if (!newUser) {
                        return done(null, false, req.flash("auth", "There was an error creating User."));
                    } else {
                        return done(null, newUser);
                    }
                });
            }
        });
    }
    ));

    //Passport 'local' strategy configuration for login
    passport.use("local-login", new LocalStrategy({
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
    }, function (req, username, password, done) {
        // if any fields are empty, set flash message
        if (username.trim().length === 0) {
            return done(null, false, req.flash("auth", "Username is required."));
        }
        if (password.trim().length === 0) {
            return done(null, false, req.flash("auth", "Password is required."));
        }
        //bCrypt checks input password hash against actual password hash, returns Boolean
        //do not use native JavaScript '===' comparison because of "timing attack" vulnerability
        var checkPasswordValid = function (realPassword, inputPassword) {
            return bCrypt.compareSync(inputPassword, realPassword);
        };
        User.findOne({
            where: {
                username: username
            }
        }).then(function (user) {
            //if username or password doesn't match, set flash message
            if (!user) {
                return done(null, false, req.flash("auth", "User does not exist."));
            }
            if (!checkPasswordValid(user.password, password)) {
                return done(null, false, req.flash("auth", "Incorrect password."));
            }
            //if correct user & password, user gets logged in
            var userData = user.get();
            return done(null, userData);
            //catch errors
        }).catch(function (err) {
            console.log("Login Error: " + err);
            //set flash message for other errors
            return done(null, false, req.flash("auth", "There was an error logging in."));
        });
    }
    ));

    //serialize user cookie. Stores {id: ...} in req.session.passport.user
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    //deserialize user cookie. Stores req.user object
    passport.deserializeUser(function (id, done) {
        User.findById(id).then(function (user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });
};