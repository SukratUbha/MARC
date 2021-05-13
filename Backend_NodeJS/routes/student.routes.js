module.exports =(app) => {

    const api = require("../controllers/api.controller.js"); //instantiating a new object
    var router = require("express").Router();       // a NEW 'Router' object. Gets globally configured to live under '/api/courses'. see blow.
    
    // Create a new student
    router.post("/create", api.createStudent);

    // Retrieve all Students
    router.get("/", api.getAllStudents);

    // Retrive single Student
    router.get("/id:id", api.getStudent);

    //create associations
    //router.get("/createass", api.createAss);

    //Get info of student
    router.get("/getinfo:id", api.getInfo);


    //mount the router on the app
    app.use('/api/student', router);
}