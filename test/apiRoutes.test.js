const chai = require('chai');
const expect = chai.expect;

const {apitRoutes} = require("../routes/apiRoutes");


describe("get /api/alldata from a user",(done)=>{
    it("should return both water and stool data",()=>{
        let app;
        apitRoutes(app);
        console.log(app);
    });
});