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
  // Create a Course
  const course = {
    Course_name:req.body.Course_name, 
    CC:req.body.CC, 
    CC_email:req.body.CC_email, 
    Year: req.body.Year, 
    Deadline: req.body.Deadline,
    Hours: req.body.Hours,
    Total_student: req.body.Total_student, 
    comment_CC: req.body.comment_CC,
    comment_MC: req.body.comment_MC
  };
  console.log(course);

  // Save Course in the database
  Course.create(course)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Course."
      });
    });
  
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
exports.updateCourse = (req, res) => {
  const id = req.params.id;
  Course.update(req.body, {
    where:{id: id}
  }).then(num=>{
    if(num==1){
      res.send({
        message: 'Course with id='+id+' updated sucessfully.'
      });
    }else{
      res.send({
        message: 'Cannot update Course with id='+id
      });
    }
  }).catch((err=>{
    res.status(500).send({
        message: 'Error update Course with id='+id
    });
  }));
};

exports.loadvalue = (req, res) => {
  //naive way to create course, will cause a lot of error showing on the terminal

//   {   "firstName":"Steven", 
//     "lastName":"Kan", 
//     "email":"Steven@gmail.com", 
//     "password": null, 
//     "firstPref": 1,
//     "secondPref": 1,
//     "thirdPref": null,
//     "hours": 10.7,
//     "description": null, 
//     "pdfLocation":null 
// }
  Course.create({ Course_name:"CS373", 
                  Owner: 1, 
                  Deadline: '2021-10-28', 
                  Year: 3, 
                  Hours: 2,
                  Total_student:123, 
                  comment_CC:null,
                  comment_MC:null});

  Course.create({ Course_name:"CS101", 
                  Owner: 2,
                  Deadline: '2021-08-09', 
                  Year: 1, 
                  Hours: 1.4,
                  Total_student:500, 
                  comment_CC:null,
                  comment_MC:null});

  Course.create({ Course_name:"CS120", 
                  Owner: 3,
                  Deadline: '2021-09-09', 
                  Year: 1, 
                  Hours: 1.6,
                  Total_student:300, 
                  comment_CC:null,
                  comment_MC:null});

  Course.create({ Course_name:"CS316", 
                  Owner: 4,
                  Deadline: '2021-9-20', 
                  Year: 3, 
                  Hours: 2,
                  Total_student:150, 
                  comment_CC:null,
                  comment_MC:null});

  Course.create({ Course_name:"CS210", 
                  Owner:"Bruce", 
                  Deadline: '2021-8-20', 
                  Year: 2, 
                  Hours: 2.5,
                  Total_student:300, 
                  comment_CC:null,
                  comment_MC:null});

  Course.create({ Course_name:"CS340", 
                  Owner:"Robert", 
                  Deadline: '2021-8-20', 
                  Year: 3, 
                  Hours: 2.6,
                  Total_student:113, 
                  comment_CC:null,
                  comment_MC:null});
  res.send("Courses created")
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

exports.createCourse = (req, res) => {
  //naive way to create course, will cause a lot of error showing on the terminal
  const Cs101 = Course.create({ id:1, Course_name:"CS101", CC:"Damir", CC_email:"damir@gmail.com", Total_student:null, comment:null});
  const Cs120 = Course.create({ id:2, Course_name:"CS120", CC:"Tanya", CC_email:"tanya@gmail.com", Total_student:230, comment:null});
  const Cs130 = Course.create({ id:3, Course_name:"CS130", CC:"Bukhard", CC_email:"bukhard@gmail.com", Total_student:480, comment:null});
  res.send("3 courses created")
};
*/

exports.createAssociation = (req, res) => {

  // Validate request
  if (!(req.body.course_id&&req.body.student_id)) {
    console.log("something has happened")
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  
  // Create a Association
  const assoc = {
    course_id:req.body.course_id, 
    student_id:req.body.student_id, 
    burkhard_proposed:req.body.burkhard_proposed, 
    course_proposed: req.body.course_proposed, 
    student_proposed: req.body.student_proposed,
    course_blacklist: req.body.course_blacklist,
    burkhard_blacklist: req.body.burkhard_blacklist,
    marking_hours: req.body.marking_hours, 
    previously_enrolled:req.body.previously_enrolled,
    previously_marked:req.body.previously_marked
  };

  // Save Course in the database
  Association.create(assoc)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Association."
      });
    });
  
};

exports.getAssociation_all = (req, res) => {
  Association.findAll()
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving all associations" 
    });
  });
}

exports.getAssociation_courseid = (req, res) => {
  const id = req.params.id;

  Association.findAll({
    where: {
      course_id: id
    }}).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving association with id=" + id
      });
    });
};

exports.getAssociationRelation = (req, res) => {
  const srt = req.params.str;
  course, student = str.split("-");

  Association.findAll({
    where: {
      course_id: course,
      student_id: student
    }}).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving association with id=" + id
      });
    });
};
exports.addStudentToCourse = (req, res) => {

  // Validate request
  if (!(req.body.Course_id&&req.body.Student_id)) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  result = Association.findAll({
    where: {
      course_id:req.body.Course_id, 
      student_id:req.body.Student_id
    }})
  if(result.length != 0){
    Association.update({marking_hours: Hours}),
    {where:{
      course_id:req.body.Course_id, 
      student_id:req.body.Student_id
    }}    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while editing association."
      });
    });
  }else{
    const ass = {
      course_id:req.body.Course_id, 
      student_id:req.body.Student_id, 
      burkhard_proposed:false,
      course_proposed: false,
      student_proposed: false,
      course_blacklist: false,
      burkhard_blacklist: false,
      marking_hours:-1,
      previously_marked:-1
    };
    console.log(course);
  
    // Save association in the database
    Association.create(ass)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Association."
        });
      });
  }
};

exports.getAssociation_studentid = (req, res) => {
  const id = req.params.id;

  Association.findAll({
    where: {
      student_id: id
    }}).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving association with id=" + id
      });
    });
};

exports.getAssociation = (req, res) => {
  const id = req.params.id;

  Association.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving student with id=" + id
      });
    });
};

exports.updateAssociation = (req, res) => {
  const id = req.params.id;

  Association.update(req.body, {
    where: { id: id }
  }).then(num => {
      if (num == 1) {
        res.send({
          message: `Association with id=${id} was updated successfully.`
        });
      } else {
        res.send({
          message: `Cannot update Association with id=${id}. Maybe Association's details was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Association's Details with id=" + id
      });
    });

};