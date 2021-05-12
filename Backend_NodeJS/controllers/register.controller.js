Association = require(__dirname+'/../models/Association.js');         //see /models/index.js. It builds this. We could very well require the modules/index.js file, but no - we create the database models in server.js on startup.
Course = require(__dirname+'/../models/Course.js');
Student = require(__dirname+'/../models/Student.js');
const Op = require("sequelize").Op;

exports.registerStudent = (req,res) =>{

  const student = {
    firstName:req.body.firstName, 
    lastName:req.body.lastName, 
    email:req.body.email, 
    password: req.body.password, 
    firstPref: req.body.firstPref,
    secondPref: req.body.secondPref,
    thirdPref: req.body.thirdPref,
    hours: req.body.hours,
    description: req.body.location, 
    pdfLocation:req.body.location,  //need to change and add pdf location
  }
  
  Student.create(student)
    .then(data => {
      res.send(data);
      createAssociation(data.id, data.firstPref);
      if (data.secondPref){createAssociation(data.id, data.secondPref)};
      if (data.thirdPref){createAssociation(data.id, data.thirdPref)}
      console.log(data.id)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while registering the student."
      });
    });
}

//helper function 
function createAssociation(student_id, course_id){
  const association = {
    course_id: course_id, 
    student_id: student_id, 
    request: null, 
    application: null, 
    blist: null,
    marking: null
  }

  Association.create(association);
}