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
    }
}

module.exports = APIController;