const moment = require("moment");

class Helper {
    static convertTime(body){
        let dateTime = moment();
        if(body.date && body.hour && body.ampm){
            dateTime = moment(body.date+ body.hour + body.ampm, "MMM DD, YYYY hh a");
        }else if(body.date){
            dateTime = moment(body.date, "MMM DD, YYYY");
        }
        return dateTime.format("YYYY-MM-DD HH:mm:ss");
    }

    static checkAuth(user){
        if(user && user.id && !isNaN(parseInt(user.id))) {//validate user ID
            return true;
            //TODO: check against DB
        }else{
            return false;//TODO  throw the stack  and proper error
        }
    }
}

module.exports = Helper;