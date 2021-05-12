const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = global.db;

class Student extends Model {}

Student.init({
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    validate: {
        notEmpty: true
    }
  }, 
  lastName: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },

  //note:
  // the strings entered for course preference are used to keyword search through associations.
  // the source of truth for a course being on the student wish-list is the Associations table.
  // we should periodically scan for if the student's requested course now exists, then link the student
  // via the association table & set the field here to NULL
  
  firstPref: { //first preference of course_id
      type: DataTypes.INTEGER,
      validate: {
          notEmpty: true
      }
  },
  secondPref: {
      type: DataTypes.INTEGER
  },
  thirdPref: {
      type: DataTypes.INTEGER
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true
  },
  },
  hours: {
    type: DataTypes.INTEGER
  },
  description: {
    type: DataTypes.STRING
  },
  
  pdfLocation: {
      type: DataTypes.STRING
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Student', // We need to choose the model name
  timestamps: false,
  createdAt: false,
  updatedAt: false
});



// the defined model is the class itself
console.log(Student === sequelize.models.Student); // true

// so we can access this from server.js and elsewhere
module.exports = Student