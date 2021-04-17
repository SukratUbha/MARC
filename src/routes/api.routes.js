// THE API!!
// here is a document that explains what API endpoints are going to make
//
//  https://docs.google.com/document/d/1zRuxYvO3SYmXhSJvM2NTjmoMs93iyczdGUOvYj1StrI/edit?usp=sharing
// 
// note that the API is all about stuff the client wants. Whatever tables we use behind the scenes can be anything.
//

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