/*
//env variable is set to test during the test
process.env.NODE_ENV = 'test';
//let Course = require("../../controllers/course.controller");

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
        require("../../controllers/database_creator.js");   //creats global.db
        require("../../models/index.js") // Create models (& thus tables)



        // Create a new user 
        const User = require('../../models/User.js');//fetch the Model definition
        const jane = User.create({ firstName: "Jane", lastName: "Doe" });
        console.log("Jane's auto-generated ID:", jane.id);
        /*
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