// "use strict";

const db = require("../models");
const express = require("express");

const apiRouter = express.Router();//for api routes
const Helper = require("./utils/helper");

// Get all data from current user
apiRouter.get("/alldata", (req, res, next)=> {
    try{
        const userId = Helper.checkAuth(req.user);

        db.User.findOne({
            where:{
                id:userId
            }
        }).then(function(userResult) {
            let stoolPromise = userResult.getStools();
            let waterPromise = userResult.getWaters();

            Promise.all([stoolPromise,waterPromise]).then(results=>{
                let result={};
                result.stool = results[0];
                result.water = results[1];
                res.send(result);
            });
        });
    }catch(err){
        next(err);
    }
});


//post a new stool log for user
apiRouter.post("/stool", function (req, res, next) {
    try{
        const userId = Helper.checkAuth(req.user);
        if (req.body && req.body.score && !isNaN(parseInt(req.body.score))) {
            db.User.findOne({
                where: {
                    id: userId
                }
            }).then(function (userResult) {
                userResult.createStool({
                    score: req.body.score,
                    time: Helper.convertTime(req.body),
                    comment: req.body.comment ? req.body.comment : null//TODO:sanitize the input
                }).then(stool => {
                    res.json(stool);
                });
            });
        } else {
            res.status(400).send("invalid input");
        }
    }catch(err){
        next(err);
    }
});


apiRouter.post("/water", function(req, res) {
    try{
        const userId = Helper.checkAuth(req.user);
        if(req.body && req.body.intake && !isNaN(parseInt(req.body.intake))){
            db.User.findOne({
                where:{
                    id:userId
                }
            }).then(function(userResult) {
                userResult.createWater({
                    intake:req.body.intake,
                    time:Helper.convertTime(req.body)
                }).then(water=>{
                    res.json(water);
                });
            });
        }else{
            res.status(400).send("invalid input");
        }
    }catch(err){
        next(err);
    }
});

// TODO: Delete an user by id
apiRouter.delete("/api/users/:id", function (req, res) {
    //TODO: check for authenticated or not?
    // Delete an example by id
    app.delete("/api/examples/:id", function (req, res) {

        db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
            res.json(dbExample);
        });
    });
});

module.exports = apiRouter;