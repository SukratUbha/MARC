
Association = require(__dirname+'/../models/Association.js');         //see /models/index.js. It builds this. We could very well require the modules/index.js file, but no - we create the database models in server.js on startup.
Course = require(__dirname+'/../models/Course.js');
Student = require(__dirname+'/../models/Student.js');
const Op = require("sequelize").Op;

exports.registerStudent = (req,res,cvLocation) => {
  // console.log("IN THE REGISTER STUDENT FUNCITON");  
  console.log(req.body);
  const student = {
    firstName:req.body.firstName, 
    lastName:req.body.lastName, 
    email:req.body.email, 
    student_number:req.body.studentNumber, 
    upi:req.body.UPI,
    year: req.body.Year,
    degree: req.body.degree,
    firstPref: req.body.fPref,
    secondPref: req.body.sPref,
    thirdPref: req.body.tPref,
    type:  req.body.GradType,
    tutor_training: req.body.tutorTraining,
    bh_training: req.body.Training,
    gpa: req.body.GPA,
    total_hours: req.body.hours,
    description: req.body.description, 
    courses_marked: req.body.CoursesMarked,
    // previously_marked_first: req.body.prevMarkedFirst,
    // previously_marked_second: req.body.prevMarkedSecond,
    // previously_marked_third: req.body.prevMarkedThird,
    // previously_enrolled_first: req.body.prevEnrolledFirst,
    // previously_enrolled_Second: req.body.prevEnrolledSecond,
    // previously_enrolled_Third: req.body.prevEnrolledThird,
    pdfLocation: cvLocation  
  }
  // console.log(student);
  Student.create(student)
    .then(data => {
      // res.send("OK");
      createAssociation(data.id, data.firstPref,req.body.prevEnrolledFirst, req.body.prevMarkedFirst);
      if (data.secondPref){createAssociation(data.id, data.secondPref, req.body.prevEnrolledSecond, req.body.prevMarkedSecond)};
      if (data.thirdPref){createAssociation(data.id, data.thirdPref, req.body.prevEnrolledThird, req.body.prevMarkedThird)}
      console.log(data.id)
      Promise.resolve("OK");
    })
    .catch(err => {
      // res.status(500).send({
        message:
        console.log(err);
          // err.message || "Some error occurred while registering the student."
          Promise.reject(new Error('fail'));
      });
    // });

}

exports.testregisterStudent = (req,res) =>{

  const student = {
    firstName:req.body.firstName, 
    lastName:req.body.lastName, 
    student_number:req.body.student_number, 
    upi:req.body.upi,
    email:req.body.email, 
    password: req.body.password, 
    firstPref: req.body.firstPref,
    secondPref: req.body.secondPref,
    thirdPref: req.body.thirdPref,
    total_hours: req.body.total_hours,
    description: req.body.description, 
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
function createAssociation(student_id, course_id, previously_enrolled, previously_marked){
  const association = {
    course_id: course_id, 
    student_id: student_id, 
    burkhard_proposed: 0,
    course_proposed: 0,
    student_proposed: 0,
    course_blacklist: 0,
    burkhard_blacklist: 0,
    marking_hours:0,
    previously_enrolled: previously_enrolled,
    previously_marked: previously_marked,
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

exports.updateStudent = (req, res) => {
  const id = req.params.id;

  Student.update(req.body, {
    where: { id: id }
  }).then(num => {
      if (num == 1) {
        res.send({
          message: `Student with id=${id} was updated successfully.`
        });
      } else {
        res.send({
          message: `Cannot update Student with id=${id}. Maybe Student's details was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Student's Details with id=" + id
      });
    });

};