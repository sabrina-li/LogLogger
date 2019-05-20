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



module.exports = function(app) {
    // TODO Get all data from an user
    // Get all examples
    app.get("/api/alldata", function(req, res) {
        db.Example.findAll({}).then(function(dbresult) {
            res.json(dbresult);
        });
    });


    //post a new stool log for user
    app.post("/api/stool", function(req, res) {
        //TODO: check for authenticated or not? if not throw error 401!
        const userId = 1;
        
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

    // TODO: POST new water log
    // app.post("/api/water", function(req, res) {
    //     //TODO: check for authenticated or not? if not throw error 401!
    //     const userId = 1;

    //     if(req.body && req.body.score && !isNaN(parseInt(req.body.score))){
    //         db.User.findOne({
    //             where:{
    //                 id:userId
    //             }
    //         }).then(function(userResult) {
    //             userResult.createStool({
    //                 score:req.body.score,
    //                 comment: req.body.comment? req.body.comment:null//TODO:sanitize the input
    //             }).then(stool=>{
    //                 res.json(stool);
    //             });
    //         });
    //     }else{
    //         res.status(400).send("invalid input");
    //     }
    // });

    // TODO: Delete an user by id
    app.delete("/api/users/:id", function(req, res) {
        //TODO: check for authenticated or not?

    // Delete an example by id
    app.delete("/api/examples/:id", function(req, res) {

        db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
            res.json(dbExample);
        });
    });
};

