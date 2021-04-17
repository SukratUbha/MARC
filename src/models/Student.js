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
  firstPref: {
      type: DataTypes.STRING,
      validate: {
          notEmpty: true
      }
  },
  secondPref: {
      type: DataTypes.STRING
  },
  thirdPref: {
      type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true
  }
  },
  pdfLocation: {
      type: DataTypes.STRING
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Student' // We need to choose the model name
});

// the defined model is the class itself
console.log(Student === sequelize.models.Student); // true

// so we can access this from server.js and elsewhere
module.exports = Student