const db = require("../models");
const moment = require("moment");

const express = require('express');
const apiRouter = express.Router();//for api routes


const convertTime = body=>{
    console.log(body);
    let datetime = moment();
    if(body.date && body.hour && body.ampm){
        datetime = moment(body.date+ body.hour + body.ampm, "MMM DD, YYYY hh a");
    }else if(body.date){
        datetime = moment(body.date, "MMM DD, YYYY");
    }
    return datetime.format("YYYY-MM-DD HH:mm:ss");
};

const checkAuth = user=>{
    if(user && user.id && !isNaN(parseInt(user.id))) {//validate user ID
        return parseInt(user.id);
        //TODO: check against DB
    }else{
        throw 401;//TODO  throw the stack  and proper error
    }
};

// Get all data from current user
apiRouter.get("/alldata", (req, res, next)=> {
    console.log("here");
    try{
        const userId = checkAuth(req.user);

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
        const userId = checkAuth(req.user);
        if (req.body && req.body.score && !isNaN(parseInt(req.body.score))) {
            db.User.findOne({
                where: {
                    id: userId
                }
            }).then(function (userResult) {
                userResult.createStool({
                    score: req.body.score,
                    time: convertTime(req.body),
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
        const userId = checkAuth(req.user);
        if(req.body && req.body.intake && !isNaN(parseInt(req.body.intake))){
            db.User.findOne({
                where:{
                    id:userId
                }
            }).then(function(userResult) {
                userResult.createWater({
                    intake:req.body.intake,
                    time:convertTime(req.body)
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