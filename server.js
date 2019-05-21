require("dotenv").config();
var express = require("express");
var passport = require("passport");
var session = require("express-session");
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
//passport and session middleware
app.use(session({ secret: "temporary secret" }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
require("./routes/authRoutes")(app, passport);
app.use("/api",require("./routes/apiRoutes"));
app.use("/",require("./routes/htmlRoutes"));

//import passport strategy
require("./config/passport")(passport, db.User);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb` nad `developmentdb`
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
