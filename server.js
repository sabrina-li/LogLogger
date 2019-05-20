require("dotenv").config();
var express = require("express");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var session = require("express-session");
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
//passport and session middleware
app.use(passport.initialize());
app.use(session({ secret: "temporary secret" }));
app.use(passport.session());

//Passport 'local' strategy configuration
passport.use(new LocalStrategy(
    function (username, password, done) {
        db.User.findOne({ username: username }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: "Incorrect username." });
            }
            if (!user.verifyPassword(password)) {
                return done(null, false, { message: "Incorrect password." });
            }
            return done(null, user);
        });
    }
));

//Error handler function
function errHandler(err) {
    console.error("There was an error performing the operation");
    console.log(err);
    console.log(err.code);
    return console.error(err.message);
}

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./routes/authRoutes")(app, passport, db);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
} else if (!process.env.NODE_ENV) {
    syncOptions.force = true;
    syncOptions.match = /_development$/;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
    app.listen(PORT, function () {
        console.log(
            "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
            PORT,
            PORT
        );
    });
});

module.exports = app;
