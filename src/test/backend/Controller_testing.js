/*
//env variable is set to test during the test
process.env.NODE_ENV = 'test';
let Course = require("../../app/controllers/course.controller.js");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Courses', () => {
    server = require('../../server.js');

    afterEach(function (done) { // close the server when test finishes 
        server.close(done);
    });
    describe('/GET course', () => {
    it('it should GET all the books', (done) => {
        let course = {
            "title": "CS399",
            "description": "Capstone course"
        };
        let print=chai.request(server)
            .post('/api/courses')
            .send(course);
        console.log(print);
        done();
            
        
        
    });
  });
});
*/
