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
            return true;
            //TODO: check against DB
        } else {
            return false;//TODO  throw the stack  and proper error
        }
    }

    static cardsData() {
        return [{
            title: "Stool Logger",
            content: "Keep track of the frequency and quality of your stools! Pay close attention to any changes and make sure to note any unusual smells, colors, or other qualities.",
            imgFile:"stool"
        },
        {
            title: "Water Intake",
            content: "Ever wonder why you get constipated? Water content may be a big part of the issue! Track your daily water intake to watch for any patterns.",
            imgFile:"water"
        }, {
            title: "Food Intake",
            content: "Eat something that smelled a bit off? Something too spicy? Now you can see exactly how your meals and snacks are affecting your bowel movements!",
            imgFile:"food"
        }
        ];
    }
}

module.exports = Helper;