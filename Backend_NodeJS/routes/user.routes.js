// When a client sends request for an endpoint using HTTP request (GET, POST, PUT, DELETE), 
// setting up the routes will determine how the server responses.

module.exports =(app) => {


        //login
        // what course am i the coordinator of?
        // show my name at the top of stuff
        // am i the boss?

        const userController = require("../controllers/user.controller.js"); //instantiating a new object
        var router = require("express").Router();       // a NEW 'Router' object. Gets globally configured to live under '/api/courses'. see blow.
      
        // Login
        router.post("/login", userController.login);
      
        
        // Retrieve a single Course with id
        router.get("/logout", userController.logout);
        

        
        // Retrieve user details (my name, etc)
        router.get("/details", userController.getUserDetails);
        
        
        // Change my name & stuff.
        router.post("/details", userController.setUserDetails);
        
        //mount the router on the app
        app.use('/api/user', router);
    }