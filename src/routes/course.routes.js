// When a client sends request for an endpoint using HTTP request (GET, POST, PUT, DELETE), 
// setting up the routes will determine how the server responses.

module.exports = app => {
    const courseController = require("../controllers/course.controller.js"); //instantiating a new object
    var router = require("express").Router();       // a NEW 'Router' object. Gets globally configured to live under '/api/courses'. see blow.
  
    // Create a new Course
    router.post("/", courseController.create);
  
    // Retrieve all Courses
    router.get("/", courseController.findAll);
  
    // Retrieve all published Courses
    router.get("/published", courseController.findAllPublished);
  
    // Retrieve a single Course with id
    router.get("/:id", courseController.findOne);
  
    // Update a Course with id
    router.put("/:id", courseController.update);
  
    // Delete a Course with id
    router.delete("/:id", courseController.delete);
  
    // Delete all Courses
    router.delete("/", courseController.deleteAll);
    
    //mount the router on the app
    app.use('/api/courses', router);
}