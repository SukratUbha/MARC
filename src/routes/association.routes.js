module.exports =(app) => {

    const asController = require("../controllers/association.controller.js"); //instantiating a new object
    var router = require("express").Router();       // a NEW 'Router' object. Gets globally configured to live under '/api/courses'. see blow.

    
    //mount the router on the app
    app.use('/api/association', router);
}