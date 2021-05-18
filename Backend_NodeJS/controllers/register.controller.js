
Association = require(__dirname+'/../models/Association.js');         //see /models/index.js. It builds this. We could very well require the modules/index.js file, but no - we create the database models in server.js on startup.
Course = require(__dirname+'/../models/Course.js');
Student = require(__dirname+'/../models/Student.js');
const Op = require("sequelize").Op;

exports.registerStudent = (req,res) => {
  console.log("IN THE REGISTER STUDENT FUNCITON");
  const fileName = req.body.firstName + req.body.lastName;
  cvLocation = __dirname + '/../Uploads/'+ fileName + ".pdf"

  const student = {
    firstName:req.body.firstName, 
    lastName:req.body.lastName, 
    email:req.body.email, 
    firstPref: req.body.fPref,
    secondPref: req.body.sPref,
    thirdPref: req.body.tPref,
    hours: req.body.hours,
    description: req.body.description, 
    pdfLocation: cvLocation  
  }
  // console.log(student);
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

// Retrieve all students from the database.
exports.getAllStudents = (req, res) => {
  Student.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving students."
      });
    });
};

exports.getStudent = (req, res) => {
  const id = req.params.id;

  Student.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving student with id=" + id
      });
    });
};