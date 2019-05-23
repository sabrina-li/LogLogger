// const app = require("../server");

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const db = require("../models");

chai.use(chaiHttp);
//Our parent block
describe.skip("Auth APIs", () => {
    beforeEach((done) => {
        //Create a dummy user
        db.User.create({
            username: "test",
            password: "fakepassword"
        }).then(() => {
            done();
        }).catch(err => {
            done();
        });
    });

    const newUser = {
        username: "testUser",
        password: "testPass"
    };

    it("should return 200 for signup page", (done) => {
        chai.request(app)
            .post("/signup")
            .send(newUser)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.equal(200);
                done();
            });
    });

    it("should return 200 for login page", (done) => {
        chai.request(app)
            .post("/login")
            .send(user)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.equal(200);
                done();
            });
    });


});