const db = require("../models");
const moment = require('moment');


const convertTime = body=>{
    let datetime = moment();
    if(body.date && body.time && body.ampm){
        datetime = moment(body.date+ body.time + body.ampm, "MMM DD, YYYY hh a");
    }else if(body.date){
        datetime = moment(body.date, "MMM DD, YYYY");
    }
    return datetime.format("YYYY-MM-DD HH:mm:ss");
};

const userId = 1;

module.exports = function(app) {
    // TODO Get all data from an user
    // Get all examples
    app.get("/api/alldata", function(req, res) {
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
    });


    //post a new stool log for user
    app.post("/api/stool", function(req, res) {
        //TODO: check for authenticated or not? if not throw error 401!

        if(req.body && req.body.score && !isNaN(parseInt(req.body.score))){
            db.User.findOne({
                where:{
                    id:userId
                }
            }).then(function(userResult) {
                userResult.createStool({
                    score:req.body.score,
                    time:convertTime(req.body),
                    comment: req.body.comment? req.body.comment:null//TODO:sanitize the input
                }).then(stool=>{
                    res.json(stool);
                });
            });
        }else{
            res.status(400).send("invalid input");
        }
    });


    app.post("/api/water", function(req, res) {
        //TODO: check for authenticated or not? if not throw error 401!
console.log(req.body);
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
    });

    // TODO: Delete an user by id
    app.delete("/api/users/:id", function(req, res) {
        //TODO: check for authenticated or not?

        // Delete an example by id
        app.delete("/api/examples/:id", function(req, res) {

            db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
                res.json(dbExample);
            });
        });
    });
};