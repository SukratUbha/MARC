// THE API!!
// here is a document that explains what API endpoints are going to make
//
//  https://docs.google.com/document/d/1zRuxYvO3SYmXhSJvM2NTjmoMs93iyczdGUOvYj1StrI/edit?usp=sharing
// 
// note that the API is all about stuff the client wants. Whatever tables we use behind the scenes can be anything.
//

module.exports =(app) => {

    const api = require("../controllers/api.controller.js"); //instantiating a new object
    var router = require("express").Router();       // a NEW 'Router' object. Gets globally configured to live under '/api/courses'. see blow.
    
    // Create a new Course
    router.get("/create", api.createCourse);

    // Retrieve all Courses
    router.get("/", api.getAllCourses);

    // Retrive single Course
    router.get("/:id", api.getCourse);

    // Retrive single Course
    router.get("/update/:id", api.update_Total_Student);

    //mount the router on the app
    app.use('/api/courses', router);
}