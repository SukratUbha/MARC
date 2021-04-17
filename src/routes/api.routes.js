module.exports =(app) => {

    const association = require("../controllers/api.controller.js"); //instantiating a new object
    var router = require("express").Router();       // a NEW 'Router' object. Gets globally configured to live under '/api/courses'. see blow.
    
    // Create a new Association
    router.post("/", association.create);

    // Retrieve all Associations
    router.get("/", association.findAll);

    //mount the router on the app
    app.use('/api/association', router);
}