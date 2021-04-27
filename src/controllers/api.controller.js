// A variety of functions which create/modify Courses in the database.
// The functions take in req/res (request/response) because they respond to
// API endpoints (routes).




//the Fields mentioned here must match the fields created in /models/Course.model.js

// TODO: sync() the database when needed.
// TODO:   ----- Check security for EVERY endpoint -------


// Course is a CLASS definition.
Association = require(__dirname+'/../models/Association.js');         //see /models/index.js. It builds this. We could very well require the modules/index.js file, but no - we create the database models in server.js on startup.
Course = require(__dirname+'/../models/Course.js');
Student = require(__dirname+'/../models/Student.js');
Course = require(__dirname+'/../models/Course.js');
const Op = require("sequelize").Op;


exports.createCourse = (req, res) => {
  //naive way to create course, will cause a lot of error showing on the terminal
  const Cs101 = Course.create({ id:1, Course_name:"CS101", CC:"Damir", CC_email:"damir@gmail.com", Total_student:null, comment:null});
  const Cs120 = Course.create({ id:2, Course_name:"CS120", CC:"Tanya", CC_email:"tanya@gmail.com", Total_student:230, comment:null});
  const Cs130 = Course.create({ id:3, Course_name:"CS130", CC:"Bukhard", CC_email:"bukhard@gmail.com", Total_student:480, comment:null});
  res.send("3 courses created")
};

// Retrieve all Tutorials from the database.
exports.getAllCourses = (req, res) => {
  Course.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving courses."
      });
    });
};

exports.getCourse = (req, res) => {
  const id = req.params.id;

  Course.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving course with id=" + id
      });
    });
};

// Update a Course by the id in the request
exports.update_Total_Student = (req, res) => {
  const id = req.params.id;

  //set total student by default 510 change into req.body
  Course.update({Total_student: 510}, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Course was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Course with id=${id}. Maybe Course was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Course with id=" + id
      });
    });
};
/*
// Retrieve all Courses from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Course.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving courses."
      });
    });
};

// Find a single Course with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Course.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving course with id=" + id
      });
    });
};

// Update a Course by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Course.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Course was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Course with id=${id}. Maybe Course was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Course with id=" + id
      });
    });
};

// Delete a Course with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Course.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Course was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Course with id=${id}. Maybe Course was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Course with id=" + id
      });
    });
};

// Delete all Courses from the database.
exports.deleteAll = (req, res) => {
  Course.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Courses were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all courses."
      });
    });
};

// Find all published Courses
exports.findAllPublished = (req, res) => {
  Course.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving courses."
      });
    });
};
*/
exports.createCourse = (req, res) => {
  //naive way to create course, will cause a lot of error showing on the terminal
  const Cs101 = Course.create({ id:1, Course_name:"CS101", CC:"Damir", CC_email:"damir@gmail.com", Total_student:null, comment:null});
  const Cs120 = Course.create({ id:2, Course_name:"CS120", CC:"Tanya", CC_email:"tanya@gmail.com", Total_student:230, comment:null});
  const Cs130 = Course.create({ id:3, Course_name:"CS130", CC:"Bukhard", CC_email:"bukhard@gmail.com", Total_student:480, comment:null});
  res.send("3 courses created")
};

// Retrieve student with name
exports.getStudent = (req, res) => {
  const fname = req.params.fname;
  const lname = req.params.lname;
  Student.findAll({
    where: {
      [Op.and]: [
        { firstName: fname },
        { lastName: lname }
      ]
    }
  })
};
