const moment = require("moment");

class Helper {
    static convertTime(body){
        let datetime = moment();
        if(body.date && body.hour && body.ampm){
            datetime = moment(body.date+ body.hour + body.ampm, "MMM DD, YYYY hh a");
        }else if(body.date){
            datetime = moment(body.date, "MMM DD, YYYY");
        }
        return datetime.format("YYYY-MM-DD HH:mm:ss");
    }

    static checkAuth(user){
        if(user && user.id && !isNaN(parseInt(user.id))) {//validate user ID
            return parseInt(user.id);
            //TODO: check against DB
        }else{
            throw 401;//TODO  throw the stack  and proper error
        }
    }
}

module.exports = Helper;