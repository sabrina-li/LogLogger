process.env.NODE_ENV = "test";
let app = require("../server");

let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);
//Our parent block
describe("Auth APIs", () => {
    // beforeEach((done) => { 
    //     //TODO Before each test empty the database     
    // });

    describe("POST /signup new user", () => {
        it("should create a user in db", (done) => {
            let user = {
                username: "test",
                password: "test"
            };
            chai.request(app)
                .post("/signup")
                .send(user)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res.status).to.equal(200);
                    done();
                });
        });
    });

});