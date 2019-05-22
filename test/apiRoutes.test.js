const chai = require('chai');
const expect = chai.expect;

const Helper = require("../routes/utils/Helper");

const req1={
    body:{
        intake:100,
        date:"May 01, 2019",
        hour:5,
        ampm:"PM",
    }
};
const req2={
    body:{
        intake:100,
        date:"May 31, 2019",
        hour:3,
        ampm:"AM",
    }
};

describe("helper class for converting time and check auth",(done)=>{
    it("should return AM in YYYY-MM-DD HH:mm:ss format",()=>{
        expect(Helper.convertTime(req1.body)).to.equal("2019-05-01 17:00:00");
    });
    it("should return PM in 24 hour clock format",()=>{
        expect(Helper.convertTime(req2.body)).to.equal("2019-05-31 03:00:00");
    });

    
});