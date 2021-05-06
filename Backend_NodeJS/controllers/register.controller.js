Association = require(__dirname+'/../models/Association.js');         //see /models/index.js. It builds this. We could very well require the modules/index.js file, but no - we create the database models in server.js on startup.
Course = require(__dirname+'/../models/Course.js');
Student = require(__dirname+'/../models/Student.js');
Course = require(__dirname+'/../models/Course.js');
const Op = require("sequelize").Op;

exports.registerMarker = (req,res) =>{

const student = {
    first_name:req.body.first_name, 
    last_name:req.body.last_name, 
    email:req.body.email, 
    password: req.body.password, 
    firstPref: req.body.firstPref,
    secondPref: req.body.secondPref,
    thirdPref: req.body.thirdPref,
    Hours: req.body.hours,
    description: req.body.description, 
    pdfLocation:req.body.fileLocation,
    }

    Student.create(student)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });


  }