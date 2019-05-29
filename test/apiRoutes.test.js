process.env.NODE_ENV = "test";
const chai = require('chai');
chai.use(require('chai-datetime'));
const expect = chai.expect;

// const server = require("../server");
const db = require("../models");
const Helper = require("../routes/utils/Helper");
const APIController = require("../routes/controller/apiController");

const req1 = {
    body: {
        intake: 100,
        date: "May 01, 2019",
        hour: 5,
        ampm: "PM",
    }
};
const req2 = {
    body: {
        intake: 100,
        date: "May 31, 2019",
        hour: 3,
        ampm: "AM",
    }
};

describe("helper class for converting time and check auth", (done) => {
    it("should return AM in YYYY-MM-DD HH:mm:ss format", () => {
        expect(Helper.convertTime(req1.body)).to.equal("2019-05-01 17:00:00");
    });
    it("should return PM in 24 hour clock format", () => {
        expect(Helper.convertTime(req2.body)).to.equal("2019-05-31 03:00:00");
    });
});



describe("helper class for checking if userid is corrent", (done) => {
    let user;
    it("should return false if user undefined", () => {
        expect(Helper.checkAuth(user)).to.be.false;
    });

    it("should return false if user ID not found", () => {
        user = {
            username: "test",
            password: "asdf"
        };
        expect(Helper.checkAuth(user)).to.be.false;
    });

    it("should return false if user ID not parsable integer", () => {
        user.id = "test";
        expect(Helper.checkAuth(user)).to.be.false;
    });

    it("should return true if user ID is in right format", () => {
        user.id = "1";
        expect(Helper.checkAuth(user)).to.be.true;
    });
});




describe("helper class for checking if userid is corrent", (done) => {
    let user;
    it("should return false if user undefined", () => {
        expect(Helper.checkAuth(user)).to.be.false;
    });

    it("should return false if user ID not found", () => {
        user = {
            username: "test",
            password: "asdf"
        };
        expect(Helper.checkAuth(user)).to.be.false;
    });

    it("should return false if user ID not parsable integer", () => {
        user.id = "test";
        expect(Helper.checkAuth(user)).to.be.false;
    });

    it("should return true if user ID is in right format", () => {
        user.id = "1";
        expect(Helper.checkAuth(user)).to.be.true;
    });
});

describe("API Controller", (done) => {
    beforeEach(() => {
        // request = chai.request(server);
        return db.sequelize.sync({ force: true, match: /_test$/ });
    });

    it("should get all data from user, only stool in DB", (done) => {
        const req = {
            user: {
                id: 1
            }
        };
        const water = { id: 1,
            intake: 100,
            UserId: 1 
        };
        // const time = Date("2019-05-16T05:00:00.000Z");
        const time = new Date("2019-05-16T05:00:00.000Z");

        let next, res = {
            send: function(arg) { 
                expect(this.sendCalledWith.water[0].dataValues).to.include(water);
                expect(this.sendCalledWith.water[0].time).to.equalDate(time);
                expect(this.sendCalledWith.stool).to.have.lengthOf(0);
                done();
            }
        };

        //Create data in DB
        db.User.create({ username: "test", password: "test" }).then(newUser => {
            newUser.createWater({
                intake: 100,
                time: "05/16/2019 01:00"
            }).then(water => {
                APIController.getAllDataFromUser(req,res,next);
            });
        });
    });

    it("should POST water data to DB", (done) => {
        const req = {
            user: {
                id: 1
            },
            body:{
                score:6,
                time:"05/17/2019 14:00",
                comment:"???"
            }
        };
        // const time = Date("2019-05-16T05:00:00.000Z");
        const time = new Date("2019-05-16T05:00:00.000Z");

        let next, res = {
            json: function(arg) { 
                console.log(arg);

                // expect(this.sendCalledWith.water[0].dataValues).to.include(water);
                // expect(this.sendCalledWith.water[0].time).to.equalDate(time);
                // expect(this.sendCalledWith.stool).to.have.lengthOf(0);
                done();
            }
        };

        APIController.postStoolDataForUser(req,res,next);
    });

});


