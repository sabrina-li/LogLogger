"use strict";

const db = require("../models");
const express = require("express");

const apiRouter = express.Router();//for api routes
const Helper = require("./utils/helper");

//TODO: use async/await
// Get all data from current user
apiRouter.get("/alldata", (req, res, next)=> {
    const userId = Helper.checkAuth(req.user);
    if(userId){
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
        }).catch(err=>{
            next(err);
        });
    }else{
        next(401);
    }
});


//post a new stool log for user
apiRouter.post("/stool",  (req, res, next)=> {
    const userId = Helper.checkAuth(req.user);
    if(userId){
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
                }).catch(err=>{
                    next(err);
                });
            }).catch(err=>{
                next(err);
            });
        } else {
            res.status(400).send("invalid input");
        }
    }else{
        next(401);
    }
});


apiRouter.post("/water", (req, res, next)=> {
    const userId = Helper.checkAuth(req.user);
    if(userId){
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
                }).catch(err=>{
                    next(err);
                });
            }).catch(err=>{
                next(err);
            });
        }else{
            res.status(400).send("invalid input");
        }
    }else{
        next(401);
    }
});

// TODO: Delete an user by id
apiRouter.delete("/api/users/:id", function (req, res) {
    //TODO: check for authenticated or not?
    app.delete("/api/examples/:id", function (req, res) {
        db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
            res.json(dbExample);
        });
    });
});

module.exports = apiRouter;