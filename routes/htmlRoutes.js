var db = require("../models");
const path = require("path");

//TODO, read from DB to show the uer info
module.exports = function(app) {
    // Load index page
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname,"../views/index.html"));
    });

    // Load example page and pass in an example by id
    app.get("/users/:userid", function(req, res) {
        res.sendFile(path.join(__dirname,"../views/data.html"));
    });

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });
};
