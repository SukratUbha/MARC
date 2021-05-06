module.exports =(app) => {

    const register = require("../controllers/register.controller.js"); //instantiating a new object
    var router = require("express").Router();       // a NEW 'Router' object. Gets globally configured to live under '/api/courses'. see blow.
    
    // Create a new Student
    router.post("/api/registerStudent", register.registerStudent)   //Saw the add to server request on register.js, this can be modified to crud to db. 
    //So, ill leave this here until further clarity under /api/registerStudent  

    // Retrieve all Students

    // Retrive single Student


    //mount the router on the app
    app.use('/api/students', router);
}