const path = require("path");

//TODO, read from DB to show the user info
module.exports = function (app) {
    // Load index page
    app.get("/", function (req, res) {
        //if already logged in, redirect to user page instead of login/signup page
        if (req.user) {
            return res.redirect("/user");
        }
        //get all flash messages
        const authFlashArray = req.flash("auth");
        let flashMessage;
        for (i=0;i<authFlashArray.length;i++){
            if (authFlashArray[i].length > 0){
                flashMessage = authFlashArray[i];
            }
        }
        if (flashMessage){
            console.log(flashMessage);
        }
        res.sendFile(path.join(__dirname, "../views/index.html"));
    });

    // Load example page and pass in an example by id
    app.get("/user", function (req, res, next) {
        //check for authentication before sending user page
        if (req.isAuthenticated()) {
            return next();
        }
        //redirect to login/signup page if not authenticated
        res.redirect("/");
    }, function (req, res) {
        res.sendFile(path.join(__dirname, "../views/data.html"));
    });

    // Render 404 page for any unmatched routes
    app.get("*", function (req, res) {
        res.render("404");
    });
};
