// When a client sends request for an endpoint using HTTP request (GET, POST, PUT, DELETE), 
// setting up the routes will determine how the server responses.

module.exports = app => {
    const courses = require("../controllers/course.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Course
    router.post("/", courses.create);
  
    // Retrieve all Courses
    router.get("/", courses.findAll);
  
    // Retrieve all published Courses
    router.get("/published", courses.findAllPublished);
  
    // Retrieve a single Course with id
    router.get("/:id", courses.findOne);
  
    // Update a Course with id
    router.put("/:id", courses.update);
  
    // Delete a Course with id
    router.delete("/:id", courses.delete);
  
    // Delete all Courses
    router.delete("/", courses.deleteAll);
    
    //mount the router on the app
    app.use('/api/courses', router);
}