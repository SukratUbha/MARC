module.exports =(app) => {

    const api = require("../controllers/api.controller.js"); //instantiating a new object
    var router = require("express").Router();       // a NEW 'Router' object. Gets globally configured to live under '/api/courses'. see blow.
    
    // Create a new Student

    // Retrieve all Students

    // Retrive single Student


    //mount the router on the app
    app.use('/api/students', router);
}