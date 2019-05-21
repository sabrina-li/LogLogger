//package for generating hashed passwords
var bCrypt = require("bcrypt");
//using 'local' strategy with username and password
var LocalStrategy = require("passport-local").Strategy;

module.exports = function (passport, User) {
    //Passport 'local' strategy configuration for signup
    passport.use("local-signup", new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true
        },
        function (req, username, password, done) {
            var generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
            User.findOne({
                where: {
                    username: username
                }
            }).then(function (user) {
                if (user) {
                    return done(null, false, {
                        message: "That username is already taken."
                    });
                } else {
                    var userPassword = generateHash(password);
                    User.create({
                        username: username,
                        password: userPassword
                    }).then(function (newUser) {
                        if (!newUser) {
                            return done(null, false);
                        } else {
                            return done(null, newUser);
                        }
                    });
                }
            });
        }
    ));

    //Passport 'local' strategy configuration for login
    passport.use("local-login", new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true
        },
        function (req, username, password, done) {
            //bCrypt checks input password hash against actual password
            //do not use native JavaScript '===' comparison because of "timing attack" vulnerability
            var checkPasswordValid = function (realPassword, inputPassword) {
                return bCrypt.compareSync(inputPassword, realPassword);
            };
            User.findOne({
                where: {
                    username: username
                }
            }).then(function (user) {
                if (!user) {
                    return done(null, false, {
                        message: "User does not exist."
                    });
                }
                if (!checkPasswordValid(user.password, password)) {
                    return done(null, false, {
                        message: "Incorrect password."
                    });
                }
                //if correct user & password
                var userData = user.get();
                return done(null, userData);
            }).catch(function (err) {
                console.log("Login Error: " + err);
                return done(null, false, {
                    message: "There was an error logging in."
                });
            });
        }
    ));

    //serialize user cookie
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    //deserialize user cookie
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