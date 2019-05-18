require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
//require passport for authentication
var passport = require("passport");
//require local strategy constructor
var LocalStrategy = require('passport-local').Strategy;
//require session for persistent session state via session storage
//* deprecation issues
var session = require("express-session");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(passport.initialize());
app.use(session({ secret: "stool" }));
app.use(passport.session());

//*need to add functions to serialize and deserialize users (cookie stuff)

//Passport 'local' strategy configuration
passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); };
      if (!user) { return done(null, false, { message: "Incorrect username." }); };
      if (!user.verifyPassword(password)) { return done(null, false, { message: "Incorrect password." }); };
      return done(null, user);
    });
  }
));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//default to login page for testing
// app.get("/", function (req, res) {
//   res.render("login");
// });
//example post route for login form, move this to htmlRoutes
app.post("/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  }));
//example post route for signup form
app.post("/signup", function (req, res) {
  var newUser = new User();
  newUser.username = req.body.username;
  //*generate hash for password?
  newUser.password = req.body.password;
  //*need validation to check for existing users
  console.log(name + password);
  //*need to add User model to MySQL database
  res.end();
});

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
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
