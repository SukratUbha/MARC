// A variety of functions which create/modify Courses in the database.
// The functions take in req/res (request/response) because they respond to
// API endpoints (routes).



// TODO: sync() the database when needed.
// TODO:   ----- Check security for EVERY endpoint -------





// User  is a CLASS definition.
const User= global.db.courses;         //see /models/index.js. It builds this. We could very well require the modules/index.js file, but no - we create the database models in server.js on startup.
const Op = require("sequelize").Op;

exports.login = (req, res) => {
    res.send("hello. im not asking for password right now.")
    // Validate request
   /* stuff deleted from course.controller.js
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
   */
  };

// Retrieve all Courses from the database.
exports.getUserDetails = (req, res) => {
    res.send("probably some json with the users name & stuff");
/* stuff deleted from course.controller.js
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
    */
};
exports.setUserDetails = (req, res) => {
   res.send("i should probably update the correct local DB object. remember server sets object IDs if they dont exist yet.");
};

exports.logout = (req, res) => {
    res.send("gtfo");
/*
    stuff deleted from course.controller.js
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
*/
};