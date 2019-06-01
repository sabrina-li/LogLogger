const moment = require("moment");

class Helper {
    static convertTime(body) {
        let dateTime = moment();
        if (body.date && body.hour && body.ampm) {
            dateTime = moment(body.date + body.hour + body.ampm, "MMM DD, YYYY hh a");
        } else if (body.date) {
            dateTime = moment(body.date, "MMM DD, YYYY");
        }
        return dateTime.format("YYYY-MM-DD HH:mm:ss");
    }

    static checkAuth(user) {
        if (user && user.id && !isNaN(parseInt(user.id))) {//validate user ID
            return parseInt(user.id);
            //TODO: check against DB
        } else {
            return false;//TODO  throw the stack  and proper error
        }
    }

    static cardsData() {
        return [{
            title: "Stool Logger",
            content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. In cumque reiciendis quod provident quaerat laudantium consequatur officia illo recusandae. Sapiente neque dolorem, dicta voluptate error unde autem delectus at suscipit.",
            imgFile:"stool"
        },
        {
            title: "Water Intake",
            content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. In cumque reiciendis quod provident quaerat laudantium consequatur officia illo recusandae. Sapiente neque dolorem, dicta voluptate error unde autem delectus at suscipit.",
            imgFile:"water"
        }, {
            title: "Food Intake",
            content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. In cumque reiciendis quod provident quaerat laudantium consequatur officia illo recusandae. Sapiente neque dolorem, dicta voluptate error unde autem delectus at suscipit.",
            imgFile:"food"
        }
        ];
    }
}

module.exports = Helper;