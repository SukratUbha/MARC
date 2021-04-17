// A variety of functions which create/modify Courses in the database.
// The functions take in req/res (request/response) because they respond to
// API endpoints (routes).




//the Fields mentioned here must match the fields created in /models/Course.model.js

// TODO: sync() the database when needed.
// TODO:   ----- Check security for EVERY endpoint -------


// Course is a CLASS definition.
Association = require(__dirname+'/../models/Association.js');         //see /models/index.js. It builds this. We could very well require the modules/index.js file, but no - we create the database models in server.js on startup.
const Op = require("sequelize").Op;


exports.create = (req, res) => {
    res.send("creating association row");
  //FIND the correct marker
  //FIND the correct course

};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  Association.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving associations."
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