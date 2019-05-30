const Helper = require("../utils/helper");
const db = require("../../models");

class APIController {
    static getAllDataFromUser (req, res, next){
        const userId = Helper.checkAuth(req.user);
        if(userId){
            db.User.findOne({
                where:{
                    id:userId
                }
            }).then(function(userResult) {
                let stoolPromise = userResult.getStools();
                let waterPromise = userResult.getWaters();
                let foodPromise = userResult.getFood();

                Promise.all([stoolPromise,waterPromise,foodPromise]).then(results=>{
                    let result={};
                    result.stool = results[0];
                    result.water = results[1];
                    result.food = results[2];
                    res.send(result);
                });
            }).catch(err=>{
                next(err);
            });
        }else{
            next(401);
        }
    }

    static postStoolDataForUser(req, res, next){
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
                    console.log(err);
                    next(err);
                });
            } else {
                res.status(400).send("invalid input");
            }
        }else{
            next(401);
        }
    }

    static postFoodDataForUser(req, res, next){
        const userId = Helper.checkAuth(req.user);
        if(userId){
            if (req.body && req.body.name) {
                const name = req.body.name.trim();
                db.User.findOne({
                    where: {
                        id: userId
                    }
                }).then(function (userResult) {
                    userResult.createFood({
                        name: name,
                        time: Helper.convertTime(req.body),
                        comment: req.body.comment ? req.body.comment : null
                    }).then(food => {
                        res.json(food);
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
    }

    static postWaterDataForUser(req, res, next) {
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
    }
}

module.exports = APIController;