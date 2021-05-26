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
    router.post("/create", api.createCourse);

    // Retrieve all Courses
    router.get("/", api.getAllCourses);

    // Load value (testing purpose)
    router.get("/load", api.loadvalue);

    //Get all association 
    router.get("/association", api.getAssociation_all);

    // Retrive single Course association
    router.get("/association/course/:id", api.getAssociation_courseid);

    // Retrive single Course association
    router.get("/association/student/:id", api.getAssociation_studentid);

    //SPENCER ADDED: Retrieve single Course + Student association relation
    //Could someone check this? Thank you :)
    router.get("/association/relation/:course_id-student_id", api.getAssociationRelation)

    // Update Course with id
    router.put("/update/:id", api.updateCourse);

    

    //mount the router on the app
    app.use('/api/courses', router);
}