//package for generating hashed passwords
var bCrypt = require("bcrypt");
//using 'local' strategy with username and password
var LocalStrategy = require("passport-local").Strategy;

module.exports = function (passport, User) {
    //Passport 'local' strategy configuration
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
                    }).then(function(newUser) {
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

    //serialize user cookie
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    //deserialize user cookie
    passport.deserializeUser(function(id, done) {
        User.findById(id).then(function(user) {
            if (user){
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });
};