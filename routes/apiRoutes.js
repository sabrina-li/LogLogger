"use strict";

const db = require("../models");
const express = require("express");

const apiRouter = express.Router();//for api routes
const APIController = require("./controller/apiController");

//TODO: use async/await
// Get all data from current user
apiRouter.get("/alldata", APIController.getAllDataFromUser);

//post a new stool log for user
apiRouter.post("/stool", APIController.postStoolDataForUser);

apiRouter.post("/food", APIController.postFoodDataForUser);

apiRouter.post("/water", APIController.postWaterDataForUser);

// TODO: Delete an user by id
apiRouter.delete("/api/users/:id", (req, res)=> {
    //TODO: check for authenticated or not?
    app.delete("/api/examples/:id", function (req, res) {
        db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
            res.json(dbExample);
        });
    });
});

module.exports = apiRouter;